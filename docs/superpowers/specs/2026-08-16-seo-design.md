# SEO Design — proTutor360 Landing Page

## Context

`proTutor360` is a single-page Next.js app (`app/page.tsx`) — one route (`/`), with in-page anchor sections (`#boards`, `#get-started`, `#how-we-work`, `#about`, `#results`). There is currently no metadata beyond a basic `title`/`description` in `app/layout.tsx`, and no `robots.txt`, `sitemap.xml`, or structured data.

- Production domain: `https://protutor360.com`
- Target market: UAE (Dubai/Abu Dhabi/Sharjah — online tutoring, no physical branch)
- Boards covered (from `app/data/boards.ts`): IB, IGCSE, CBSE, ICSE, VIC, IFC
- No social profiles yet — social meta/`sameAs` omitted, to be added later
- No physical business address — generic `EducationalOrganization` schema, not `LocalBusiness`
- Scope: on-page + technical SEO only. Performance/Core Web Vitals work is explicitly out of scope for this pass.

## Goals

1. Every page load emits correct, keyword-relevant `<head>` metadata (title, description, OG, Twitter card, canonical).
2. Search engines can discover and correctly index the single route via `robots.txt` + `sitemap.xml`.
3. Search engines can understand the business via `EducationalOrganization` JSON-LD structured data.
4. Heading structure is semantically correct (single `h1`, logical `h2`/`h3` nesting) — audit only, fix if broken.

## Non-goals

- Core Web Vitals / performance optimization (images, fonts, lazy-loading) — separate future pass.
- Multi-route sitemap generation, `generateMetadata`, or per-route metadata — not applicable, single route.
- Social card testing against live handles — no social profiles exist yet.
- Analytics/Search Console verification tags — not requested.

## Design

### 1. Root metadata — `app/layout.tsx`

Replace the current minimal `Metadata` export with an expanded object:

- `metadataBase: new URL('https://protutor360.com')`
- `title`: `"proTutor360 | Online Tutoring in UAE for IB, IGCSE, CBSE & More"`
- `description`: keyword-rich, UAE-targeted, mentions personalized 1-on-1 tutoring and the boards covered
- `keywords`: array covering board + geography combinations (e.g. `online tutoring UAE`, `IB tutors Dubai`, `IGCSE tutoring Abu Dhabi`, `CBSE tutors UAE`, `ICSE online tuition`, `home tutors Dubai`)
- `openGraph`: `title`, `description`, `url: '/'`, `siteName: 'proTutor360'`, `locale: 'en_AE'`, `type: 'website'`, `images: ['/hero-illustration.jpg']` (existing asset, reused as placeholder — not cropped to 1200×630, noted as a follow-up)
- `twitter`: `card: 'summary_large_image'`, same title/description/image; no `site`/`creator` handle (none exist yet)
- `robots`: `{ index: true, follow: true }`
- `alternates.canonical: '/'`

### 2. `app/robots.ts`

Generate (not static `.txt`) so it can reference `metadataBase` indirectly via an absolute sitemap URL:

```ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://protutor360.com/sitemap.xml',
  };
}
```

### 3. `app/sitemap.ts`

Single entry — the in-page anchors are not separate crawlable documents and must not be listed as their own URLs:

```ts
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://protutor360.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
```

### 4. Structured data — JSON-LD in `app/layout.tsx`

One `<script type="application/ld+json">` rendered in `<body>` (or `<head>` via the metadata `other` field is not needed — a plain script tag in the layout body is sufficient and is the standard Next.js pattern):

```json
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "proTutor360",
  "url": "https://protutor360.com",
  "description": "Personalized 1-on-1 online tutoring for students in the UAE across IB, IGCSE, CBSE, ICSE and more.",
  "areaServed": {
    "@type": "Country",
    "name": "United Arab Emirates"
  }
}
```

No `logo`, `sameAs`, or `address` fields — no logo asset or social profiles exist yet, and no physical address is applicable to an online-only tutoring business.

### 5. Semantic heading audit

Read through `Hero.tsx`, `ServiceCards.tsx`, `BoardsSubjects.tsx`, `WhyChooseUs.tsx`, `ResultsComparison.tsx`, `HowWeWork.tsx`, `About.tsx`, `Footer.tsx` to confirm exactly one `h1` (in `Hero`) and that all section headers use `h2` (with `h3` only for sub-groups, e.g. inside `BoardsSubjects`' board panel). Fix any section using the wrong heading level or skipping a level.

## Testing

- `npx tsc --noEmit` — type safety for the new `sitemap.ts`/`robots.ts`/layout changes.
- `npm run build` — confirms `sitemap.xml` and `robots.txt` are generated without errors.
- Manual view-source check of the built `<head>` for title/description/OG/Twitter tags and the JSON-LD script.
- Eyeball the JSON-LD against schema.org's `EducationalOrganization` shape (no live URL yet to run through Google's Rich Results Test).

## Follow-ups (explicitly deferred)

- Replace `hero-illustration.jpg` with a purpose-built 1200×630 OG image.
- Add social profile links once they exist (`sameAs`, `twitter:site`).
- Core Web Vitals / performance pass (separate spec).
- Google Search Console verification once domain is live.
