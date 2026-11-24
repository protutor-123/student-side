import 'server-only';

/**
 * Base URL used by the editor preview to show images already committed to the repo
 * (they are not on the live site until Vercel finishes redeploying).
 * Works because student-side is a public repo.
 */
export function imageBaseUrl(): string {
  const repo = process.env.GITHUB_REPO ?? '';
  const branch = process.env.GITHUB_BRANCH ?? 'master';
  return `https://raw.githubusercontent.com/${repo}/${branch}/public`;
}
