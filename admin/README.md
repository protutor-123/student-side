# Protutor360 Blog Admin

Password-protected dashboard for writing and publishing posts on the Protutor360 blog.

Posts are Markdown files committed to `protutor-123/student-side` (`content/blog/<slug>.md`, images in `public/blog/<slug>/`) through the GitHub API. Every save is a commit to `master`, so Vercel redeploys the site and changes go live in ~1–2 minutes. There is no database.

This app lives in the `admin/` folder of the student-side repo but is a fully separate Next.js app with its own `package.json`, deployed as its own Vercel project.

## Deploy (Vercel)

1. In Vercel: **Add New → Project**, import `protutor-123/student-side` again (a second project), and set **Root Directory** to `admin`. Framework: Next.js, other defaults fine.
2. Add environment variables (see `.env.example`):
   - `ADMIN_PASSWORD`: the login password
   - `SESSION_SECRET`: random 32+ character string
   - `GITHUB_TOKEN`: fine-grained token with access to **only** `protutor-123/student-side`, permission **Contents: Read and write**
   - `GITHUB_REPO`: `protutor-123/student-side`
   - `GITHUB_BRANCH`: `master`
   - `SITE_URL`: `https://www.protutor360.com`
3. Deploy. Optionally add a domain such as `admin.protutor360.com`.

`admin/vercel.json` makes this project skip rebuilds unless files in `admin/` changed, so publishing posts only rebuilds the public site.

When the GitHub token expires, create a new one and replace `GITHUB_TOKEN` in Vercel, then redeploy.

## Local development

```
cd admin
cp .env.example .env.local   # fill in values
npm install
npm run dev                  # http://localhost:3001
```

Note: local saves also commit to the real repo. Point `GITHUB_BRANCH` at a test branch when experimenting.

## Notes

- Drafts are committed too, but the public site never builds or lists them.
- Slugs are fixed after the first save (they are the URL).
- Images are resized to max 1600px and converted to WebP in the browser before upload.
- Deleting a post removes its Markdown file; its images remain in the repo.
