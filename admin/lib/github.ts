import 'server-only';

// Thin wrapper over the GitHub Contents API for the student-side repo.
// The token never leaves the server.

function env(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var ${name}`);
  return v;
}

const API = 'https://api.github.com';

export class ConflictError extends Error {
  constructor() {
    super('This post changed since you opened it. Reload the page and try again.');
  }
}

export class GitHubError extends Error {}

async function gh(path: string, init?: RequestInit): Promise<Response> {
  const res = await fetch(`${API}/repos/${env('GITHUB_REPO')}/contents/${path}`, {
    ...init,
    cache: 'no-store',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${env('GITHUB_TOKEN')}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
    },
  });
  return res;
}

async function fail(res: Response, action: string): Promise<never> {
  if (res.status === 409) throw new ConflictError();
  let detail = '';
  try {
    detail = ((await res.json()) as { message?: string }).message ?? '';
  } catch {}
  if (res.status === 401) throw new GitHubError('GitHub rejected the token (expired or revoked). Update GITHUB_TOKEN.');
  if (res.status === 403) throw new GitHubError(`GitHub refused to ${action}: ${detail || 'permission denied or rate limited'}.`);
  throw new GitHubError(`GitHub failed to ${action} (${res.status}${detail ? `: ${detail}` : ''}).`);
}

const branch = () => env('GITHUB_BRANCH');

export async function getFile(path: string): Promise<{ text: string; sha: string } | null> {
  const res = await gh(`${path}?ref=${encodeURIComponent(branch())}`);
  if (res.status === 404) return null;
  if (!res.ok) await fail(res, 'read file');
  const data = (await res.json()) as { content: string; sha: string };
  return { text: Buffer.from(data.content, 'base64').toString('utf8'), sha: data.sha };
}

/** Create (sha undefined) or update (sha = current blob sha) a file. Returns the new sha. */
export async function putFile(path: string, content: Buffer | string, message: string, sha?: string): Promise<string> {
  const body = {
    message,
    branch: branch(),
    content: (typeof content === 'string' ? Buffer.from(content, 'utf8') : content).toString('base64'),
    ...(sha ? { sha } : {}),
  };
  const res = await gh(path, { method: 'PUT', body: JSON.stringify(body) });
  // 422 on create means the file already exists.
  if (res.status === 422 && !sha) throw new GitHubError('A file with this name already exists. Choose a different slug.');
  if (!res.ok) await fail(res, 'save file');
  const data = (await res.json()) as { content: { sha: string } };
  return data.content.sha;
}

/**
 * Reads every file in a directory in ONE GraphQL request (instead of one REST call per file).
 * Returns text files only; binary files come back with text null and are skipped.
 */
export async function readDirTexts(dir: string): Promise<Array<{ name: string; text: string; sha: string }>> {
  const [owner, name] = env('GITHUB_REPO').split('/');
  const res = await fetch(`${API}/graphql`, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${env('GITHUB_TOKEN')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `query($owner: String!, $name: String!, $expr: String!) {
        repository(owner: $owner, name: $name) {
          object(expression: $expr) {
            ... on Tree { entries { name type object { ... on Blob { oid text } } } }
          }
        }
      }`,
      variables: { owner, name, expr: `${branch()}:${dir}` },
    }),
  });
  if (!res.ok) await fail(res, 'list posts');
  const json = (await res.json()) as {
    errors?: Array<{ message: string }>;
    data?: {
      repository: {
        object: { entries: Array<{ name: string; type: string; object: { oid: string; text: string | null } | null }> } | null;
      } | null;
    };
  };
  if (json.errors?.length) throw new GitHubError(`GitHub failed to list posts: ${json.errors[0].message}`);
  const entries = json.data?.repository?.object?.entries ?? [];
  return entries
    .filter((e) => e.type === 'blob' && e.object?.text != null)
    .map((e) => ({ name: e.name, text: e.object!.text!, sha: e.object!.oid }));
}

export async function deleteFile(path: string, sha: string, message: string): Promise<void> {
  const res = await gh(path, { method: 'DELETE', body: JSON.stringify({ message, sha, branch: branch() }) });
  if (res.status === 404) return;
  if (!res.ok) await fail(res, 'delete file');
}
