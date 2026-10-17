# Quiet Workshop Redesign — Implementation Plan

Reference designs live in this folder (`Foundations — Quiet Workshop.png`, `Homepage*.png`, `Article case study*.png`, mascot PNGs).

## Decisions

| Topic | Decision |
| --- | --- |
| Old homepage sections (Experience, Skills, HowIThink, FocusAreas) | Move to a new `/about` page |
| Lab content | New Sanity `labItem` type + `/lab` page |
| Detail pages | One long-form template for case studies **and** articles; `/projects/[slug]` becomes a short overview linking to its case study |
| Brand | `METHUSELAH.` wordmark everywhere (`M /` only as favicon); rooster mascot only as hidden Easter eggs |
| Theme | Light only — the design system defines no dark theme |
| Accent | Lime `#B9E36A` used for fills/borders/labels on dark only — it fails contrast as text on paper |
| Contact | "Get in touch" → `/contact` page with the restyled EmailJS form; Firebase interactions kept, restyled, at the end of articles |
| Project visuals | Coded preview components keyed by project slug, falling back to the Sanity image |
| Mock-up errors | Fix the overlaps (article subtitle over title; mobile "Limitations" heading) rather than copy them |

## Design tokens

| Token | Value |
| --- | --- |
| paper (background) | `#F5F3EE` |
| ink (text) | `#20211F` |
| muted (text) | `#85847D` |
| subtle (border) | `#DCD9D0` |
| surface | `#FFFFFF` |
| code (dark surface) | `#292B28` |
| signal (accent) | `#B9E36A` |

Fonts: **Manrope** (display + reading), **IBM Plex Mono** (technical metadata / labels). Spacing: 4px rhythm (4, 8, 12, 16, 24, 32, 48, 64).

## Phases

### Phase 1 — Foundations
1. Replace the `@theme` tokens in `src/app/globals.css` with the Quiet Workshop palette, spacing and reading widths.
2. Swap Plus Jakarta Sans for Manrope + IBM Plex Mono via `next/font`.
3. Strip old-theme decoration (kanji, seigaiha pattern, Adinkra/`ghicons`).
4. Add a shared layout so Header/Footer render once; add visible focus styles.

### Phase 2 — Shared building blocks
- Eyebrow label (`01 / SELECTED WORK`), section heading, tag chip, arrow link, status dot, card, dark code panel.
- Header: wordmark + Work / Lab / Writing / About / Contact; hamburger on mobile.
- Footer: dark CTA band ("Let's build something useful.") + mono bottom bar.

### Phase 3 — Homepage
Hero → Selected Work (4 numbered rows with previews) → Lab teaser (terminal list) → featured Writing → "A little context" → CTA. Remove the scroll-spy nav.

### Phase 4 — Long-form template
1. Shared layout: breadcrumbs, title + dek, mono metadata line, "At a glance" box, sticky "In this article" contents (desktop) / inline contents (mobile), numbered sections, references, next project, related card.
2. Restyle `src/components/blog/*` renderers (pull quote, code, figure, table, CSV, mermaid) onto the tokens.
3. Case studies map their fixed sections to numbered sections; articles derive the contents list from headings.
4. `/projects/[slug]` → short overview linking to the case study.

### Phase 5 — New pages
- `/lab`: Sanity `labItem` (title, slug, status, summary, tags, link, date) + query. Honest statuses: Exploring / Prototype / Shipped / Abandoned. Schema must be deployed to the Studio.
- `/about`: bio, experience, skills, how I think.
- `/contact`: restyled form.
- Writing: restyle `/articles` and `/case-studies` listings; "Writing" nav points to `/articles`.

### Phase 6 — Mascot Easter eggs
404 page (greyscale rooster), Konami code (colour rooster), console message. Optimised images in `public/mascot/`.

### Phase 7 — Clean-up and checks
- Delete unused components (`CaseStudies.tsx`, `Articles.tsx`, blog-template leftovers, `constants.tsx`) and unused deps (next-themes, unused shadcn-style packages, `ghicons`).
- Update metadata (drop "Systems Architect").
- Compare at 1440px / 390px against the mock-ups; check contrast and keyboard navigation.
- Run `next build` plus `tsc --noEmit` (builds currently ignore TS errors).

## Notes
- No URLs are removed or renamed.
- Pages ended up as server components (better SEO, simpler code) with 5-minute revalidation; only the header, footer, contents list, comments, contact form and Easter eggs run client-side.

## Status (all phases implemented)

Follow-ups that need you:
- **Deploy the `labItem` schema** (`src/lib/sanity/schemas/labItem.ts`) to your Studio, then add lab items. The Studio isn't in this repo and the Sanity MCP account here has no access to project `orwj4dpz`. Until items exist, `/lab` shows an honest empty state and the homepage lab block shows the mock-up's folder list.
- **Selected work** is curated in `src/lib/featured.ts` (`FEATURED_PROJECT_IDS`). Versa-Learn, Bogosort_AI and Nix aren't in Sanity; their coded previews activate automatically if added with those titles.
- **Project → case study links**: no field links them, so rows say "View project". The project page links an article whose title names the project ("Related writing").
- `next.config.ts` still has `ignoreBuildErrors: true`; app code type-checks cleanly, but the Sanity schema files import `sanity`, which isn't installed here.
- Pre-existing lint errors remain in `src/lib/types.ts`, `mermaid-block.tsx`, `firebase/interactions.ts`, `sanity/lib/client.ts` and the schemas.
