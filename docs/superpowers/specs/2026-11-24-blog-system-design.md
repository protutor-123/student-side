# Blog System + Publishing Dashboard — Design

Date: 2026-11-24

## Goal
Add a blog to the public site and a separate, password-protected dashboard for writing and publishing posts. Minimal setup, $0 running cost, no database.

## Architecture
- **Storage:** Markdown files in this repo (`protutor-123/student-side`). No database.
- **Admin app:** separate Next.js project `blog-admin` (own repo, own Vercel project). Reads/writes post files via the GitHub Contents API using a fine-grained token scoped to `student-side` (Contents: read/write). Token lives only in the admin app's server env.
- **Publish flow:** admin commits to `master` → Vercel rebuilds student-side → post live in ~1–2 min.

## Content format (student-side)
- Post: `content/blog/<slug>.md`, frontmatter:
  - `title` (string), `excerpt` (string), `date` (YYYY-MM-DD), `cover` (path under `/blog/...` or empty), `tags` (string[]), `status` (`draft` | `published`).
- Images: `public/blog/<slug>/<name>.webp`, resized client-side to max 1600px wide, WebP.
- Slug: lowercase `a-z0-9-`, derived from title, editable until first save.
- Drafts live in the repo but are never built or listed by the public site.

## Public site (student-side)
- `app/lib/blog.ts`: reads `content/blog`, parses frontmatter (`gray-matter`), renders Markdown (`marked`), returns published posts sorted newest first.
- `/blog`: list of published posts (cover, title, date, excerpt, tags).
- `/blog/[slug]`: full post, `generateStaticParams` over published posts, `dynamicParams = false` (unknown/draft slugs 404).
- SEO: per-post `generateMetadata` (title, description, canonical, Open Graph image = cover), `BlogPosting` JSON-LD, posts + `/blog` in `sitemap.ts`.
- "Blog" link in navbar and footer.
- Fully static.

## Admin app (`blog-admin`)
- **Auth:** single `ADMIN_PASSWORD` env var. Login server action compares in constant time, sets an HttpOnly, Secure, SameSite=Lax cookie holding a JWT signed (HS256, `jose`) with `SESSION_SECRET`, 7-day expiry. Failed login waits ~1s. `proxy.ts` redirects unauthenticated requests to `/login`; every server action re-verifies the session (proxy is only an optimistic check).
- **Pages:**
  - `/login`
  - `/` — all posts (title, status, date) with Edit / Delete, "New post".
  - `/new`, `/edit/[slug]` — title, slug, excerpt, date, tags (comma-separated), cover upload, Markdown textarea + live preview, inline image upload (inserts Markdown), buttons: Save draft / Publish / Unpublish.
- **GitHub layer (`lib/github.ts`):** list, get (content + sha), put (create/update with sha), delete. Updates send the file's `sha`; a 409/422 mismatch surfaces as "This post changed since you opened it — reload."
- **Delete:** removes the `.md` file (images left in place; harmless).
- **Env:** `ADMIN_PASSWORD`, `SESSION_SECRET`, `GITHUB_TOKEN`, `GITHUB_REPO=protutor-123/student-side`, `GITHUB_BRANCH=master`, `SITE_URL`.
- Not indexed: `robots` disallow all + `noindex` metadata.

## Error handling
- GitHub API failures → readable message in the editor; form contents kept.
- Invalid frontmatter in a file → public site skips the post at build and logs a warning rather than failing the build.

## Testing
- Build student-side with a sample published post and a draft; verify draft absent from `/blog`, sitemap and static params.
- Admin: build + manual run with real token: login, create draft, publish, edit, unpublish, delete.

## Out of scope
Comments, multiple authors, scheduled publishing, search, rich-text editor, revision history beyond git.
