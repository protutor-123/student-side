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

export type RepoFile = { path: string; name: string; sha: string };

export async function listDir(dir: string): Promise<RepoFile[]> {
  const res = await gh(`${dir}?ref=${encodeURIComponent(branch())}`);
  if (res.status === 404) return [];
  if (!res.ok) await fail(res, 'list files');
  const items = (await res.json()) as Array<RepoFile & { type: string }>;
  return items.filter((i) => i.type === 'file').map(({ path, name, sha }) => ({ path, name, sha }));
}

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

export async function deleteFile(path: string, sha: string, message: string): Promise<void> {
  const res = await gh(path, { method: 'DELETE', body: JSON.stringify({ message, sha, branch: branch() }) });
  if (res.status === 404) return;
  if (!res.ok) await fail(res, 'delete file');
}
