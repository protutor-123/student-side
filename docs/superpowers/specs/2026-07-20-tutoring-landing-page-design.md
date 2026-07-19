# Tutoring Landing Page — Design Spec

Date: 2026-07-20

## Goal

Replace the default `create-next-app` scaffold with a lead-generation landing
page for a tutoring business ("proTutor"), visually and structurally modeled
on https://ascendnow.org/. The core functional piece is a lead capture form
(Student/Parent, Full Name, Email, WhatsApp Number) that writes each
submission as a row to a Google Sheet. All marketing copy is generic
placeholder text — the user will swap in real content later. No logo yet;
navbar uses a text wordmark.

## Non-goals

- No CMS / no dynamic content from a database — everything is static JSX with
  hardcoded placeholder copy.
- No authentication, no admin dashboard for viewing leads (the Google Sheet
  *is* the admin view).
- No automated test suite added (none exists in the repo today; this is a
  marketing page, verified manually — see Testing section).
- No rate limiting / CAPTCHA — a honeypot field is sufficient for a
  low-volume lead form. Can be added later if abused.

## Page structure

Single route, `app/page.tsx`, composed of section components under
`app/components/`:

1. `Navbar` — text wordmark "proTutor", nav links (Services, Results,
   About), "Get Started" button that smooth-scrolls to the lead form
   section. Mobile hamburger menu.
2. `Hero` — headline + subhead value proposition, primary CTA button
   (scrolls to form), placeholder hero image/illustration area.
3. `StatsStrip` — 5 metric tiles (e.g. "10,000+ Students Tutored",
   "95% Report Improved Grades", "Avg Score Improvement: +18%",
   "500+ Expert Tutors", "4.9/5 Average Rating"). Placeholder numbers.
4. `ServiceCards` — 3 cards: "Academic Tutoring", "Test Prep", "Skill
   Building & Enrichment", each with a short description and a few bullet
   sub-topics.
5. `ResultsComparison` — simple comparison block: "proTutor students" vs.
   "national average" across a few generic metrics (grade improvement,
   test score gains, homework completion), presented as bar-style stat
   rows (no chart library — plain divs with width percentages).
6. `HowWeWork` — numbered 4-6 step process (consultation → assessment →
   personalized plan → tutoring begins → progress tracking → ongoing
   support).
7. `Testimonials` — 3 short quote cards with placeholder name/role and
   initials avatar (no real photos).
8. `CaseStudies` — 3 cards: student name (placeholder), outcome headline,
   one-line result summary.
9. `LeadFormSection` — the CTA section containing the actual form (client
   component). This is the *only* form instance on the page; the navbar and
   hero CTAs both link here via `#get-started` anchor + smooth scroll.
10. `Footer` — multi-column placeholder links (Services, Resources, About,
    Legal), social icons (non-functional `#` hrefs), copyright line.

All components are presentational except `LeadFormSection`, which owns the
form state.

## Lead form

Fields:
- Role: Student / Parent — segmented control (two buttons, one active),
  backed by a hidden `role` input or radio group.
- Full Name — text input, required.
- Email — `type="email"`, required.
- WhatsApp Number — `type="tel"`, required, placeholder "+91 98765 43210"
  to hint country code format. No strict format enforcement beyond
  non-empty + basic digit/plus-sign pattern (international numbers vary
  too much to validate strictly).
- Hidden honeypot field (`company` or similar, visually hidden via
  `sr-only`/`display:none`, real users never fill it). If populated on
  submit, the server action silently pretends success without writing to
  the sheet.

### Data flow

```
LeadFormSection (client, 'use client')
  -> useActionState(submitLead, initialState)
  -> <form action={formAction}>
  -> submitLead server action (app/actions/submit-lead.ts, 'use server')
       - re-validate all fields server-side (never trust client)
       - if honeypot filled -> return {success: true} without writing
       - fetch(POST, GOOGLE_SHEETS_WEBHOOK_URL, form-encoded body)
           { role, fullName, email, whatsapp, timestamp }
       - wrap in try/catch
       - non-2xx or network error -> return {success: false, error: "..."}
       - 2xx -> return {success: true}
  -> client shows inline success ("Thanks — we'll reach out within 24
     hours.") or error ("Something went wrong. Please try again.") message
     below the form; on success, form fields reset.
```

`useFormStatus` (or the `pending` flag from `useActionState`) disables the
submit button and shows a spinner/label change while the action is in
flight.

### Server Action validation rules

- `fullName`: trimmed, non-empty, max 100 chars.
- `email`: trimmed, matches a basic email regex.
- `whatsapp`: trimmed, non-empty, matches `/^[+\d][\d\s-]{6,20}$/`.
- `role`: must be exactly `"student"` or `"parent"`.
- Any failure -> return `{ success: false, error: "<field-specific message>" }`
  rendered above the form. No partial-field error UI — one message is
  enough for a 4-field form.

### Environment

- `GOOGLE_SHEETS_WEBHOOK_URL` — the deployed Apps Script Web App URL.
  Read via `process.env.GOOGLE_SHEETS_WEBHOOK_URL` inside the server action
  only. Add `.env.local` (gitignored) with this value; document it in
  `.env.example`.

## Styling

- Tailwind v4 (already configured in the repo).
- Palette: navy `#0F1F3D` (headings, dark sections, footer bg), white /
  off-white `#F8F9FB` (alternating section backgrounds), accent blue
  `#2F6FED` (CTA buttons, links, active states), neutral grays for body
  text (`text-zinc-600`/`text-zinc-900` scale, consistent with the
  existing scaffold's dark-mode-aware classes — but this page is
  light-mode only, matching ascendnow's aesthetic).
- Keep the existing Geist Sans/Geist Mono fonts already wired in
  `app/layout.tsx`.
- Fully responsive: stacked single-column on mobile, grid layouts
  (2-3 col) from `sm:`/`lg:` breakpoints up. Hamburger nav below `md:`.
- No chart/icon library dependency added — use inline SVG for the handful
  of icons needed (hamburger, socials, checkmarks) to avoid new deps.

## Error handling

- Client: HTML5 `required`, `type="email"`, `type="tel"` for immediate UX
  feedback before submit.
- Server: full re-validation (see rules above); Apps Script fetch wrapped
  in try/catch; failures logged server-side via `console.error` (no PII
  beyond what's already in the request) and surfaced to the user as a
  generic retry message — never a raw error/stack trace.
- The Apps Script itself should return a small JSON body (`{status: "ok"}`)
  so the action can check `res.ok` reliably.

## Google Sheet + Apps Script setup (executed by user, not by this codebase)

1. Create a new Google Sheet. Add a header row:
   `Timestamp | Role | Full Name | Email | WhatsApp Number`
2. Extensions → Apps Script. Replace the default code with:

   ```javascript
   function doPost(e) {
     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     var params = e.parameter;
     sheet.appendRow([
       new Date(),
       params.role || '',
       params.fullName || '',
       params.email || '',
       params.whatsapp || ''
     ]);
     return ContentService
       .createTextOutput(JSON.stringify({ status: 'ok' }))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```

3. Deploy → New deployment → type **Web app**. "Execute as": **Me**.
   "Who has access": **Anyone**. Deploy, authorize the requested
   permissions.
4. Copy the resulting `/exec` URL. Put it in `.env.local`:
   `GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/XXXX/exec`
5. Redeploy the Apps Script (new deployment version) any time the script
   code changes — editing the code alone doesn't update a live deployment.

## File structure

```
app/
  page.tsx                       # assembles all sections
  actions/
    submit-lead.ts               # 'use server' — validation + sheet write
  components/
    Navbar.tsx
    Hero.tsx
    StatsStrip.tsx
    ServiceCards.tsx
    ResultsComparison.tsx
    HowWeWork.tsx
    Testimonials.tsx
    CaseStudies.tsx
    LeadFormSection.tsx          # 'use client' — form + useActionState
    Footer.tsx
.env.example                     # documents GOOGLE_SHEETS_WEBHOOK_URL
```

`app/globals.css` and `app/layout.tsx` get light edits (metadata title,
removing dark-mode classes not needed for this light-only design) but keep
their existing font setup.

## Testing / verification

No automated test framework exists in this repo and one isn't being added
for a static marketing page. Verification is manual, post-implementation:

- Fill and submit the form with valid data → confirm a new row appears in
  the connected Google Sheet with correct values.
- Submit with each field empty/invalid → confirm inline error, no sheet
  write.
- Temporarily point `GOOGLE_SHEETS_WEBHOOK_URL` at a bad URL → confirm the
  generic failure message renders instead of a crash.
- Check layout at mobile (~375px), tablet (~768px), and desktop (~1280px)
  widths — nav collapses to hamburger, cards stack/reflow correctly.
- Click navbar "Get Started" and hero CTA → confirm both scroll to the
  lead form section.
