# CLAUDE.md – Project Guidelines

Read this fully at the start of every session.
You are working in the **C&R Window Cleaners** site — a React + Vite + TypeScript project. Follow these rules strictly.

## Sales Positioning (Copy Guardrails)
The site's angle: **C&R is the highest-quality window cleaning service in the Kansas City metro, at a fair price.** Every section should reinforce quality + fair price + KC locality — that's why "Kansas City" / "KC metro" appears in the hero, `WhatWeDo`, and `WhyChooseUs` copy (`<title>` and meta description too, in `index.html`).
- **Never invent unverifiable claims** when writing or editing copy: no fabricated review counts, "#1 in KC" / "top-rated" claims, awards, licensing/insurance/bonding status, or specific guarantee policies (e.g. "we re-clean free if you're not satisfied") unless the user has explicitly confirmed it's true. Those are factual/legal claims about the business, not copywriting choices — get sign-off first, same way `.env` credentials need the user to provide them.
- Subjective superlatives tied to the stated angle ("the highest standard," "spotless, no exceptions") are fine — that's the agreed positioning, not a claim needing external proof.
- `WhyChooseUs.tsx`'s proof points (quality standard / pricing transparency / local-KC / longevity via included seal+track cleaning) are the place to slot in a real guarantee, credentials, or stats once the user provides them.

## Stack & Tools
- React 19+ (hooks only)
- Vite 8+ for dev/build
- TypeScript (strict, no `any`)
- Tailwind CSS v4 (utility-first + `cn` from `@/lib/utils`)
  - Tailwind is loaded via the `@tailwindcss/vite` plugin (not PostCSS), CSS-first config — there is no `tailwind.config.ts`
  - Animation support via `tw-animate-css`
- **shadcn/ui is the foundation for all UI**:
  - Preset: Nova (`radix-nova` style), base color: Neutral, icons: Lucide, component library: Radix (`radix-ui` package)
  - Base every component on shadcn primitives (Button, Card, Input, Dialog, etc.)
  - Add missing shadcn components via CLI: `npx shadcn@latest add [component]`
  - `cn()` in `@/lib/utils` is re-exported from the `cn` npm package (shadcn's current convention) — still import it from `@/lib/utils`, not from `cn` directly
  - Extend with `cva` (class-variance-authority) for variants when needed
  - Reuse existing custom components from `/src/components/` if they fit
  - shadcn primitives in `/src/components/ui/` may be edited when default styles conflict with the brand
- **Icons**: Lucide (`lucide-react`)
- **Fonts**: self-hosted via fontsource, both loaded in `App.css` and mapped to Tailwind's `--font-*` theme tokens
  - Body/UI: Geist Variable (`@fontsource-variable/geist`) → `font-sans` (default)
  - Display/headings: Bodoni Moda Variable (`@fontsource-variable/bodoni-moda`) → `font-serif` — used for the hero wordmark and editorial-style headings (high-contrast serif, matches the moody/luxury brand direction)
- Routing: TanStack Router (file-based in `/src/routes/`)
  - Pages/layouts in `/src/routes/`
  - Use `<Link />` for internal routes, `<a href>` for external URLs
  - Use `useNavigate`, `<Outlet />`
  - Route tree auto-generates via `@tanstack/router-plugin` as `src/routeTree.gen.ts` — don't edit this file, and don't be alarmed if it's missing before the first `dev`/`build` run
- Data: TanStack Query for all fetching, caching, mutations
  - Prefer `useQuery` / `useMutation` / `useSuspenseQuery`
  - Co-locate queries in hooks or components
- **Forms/email**: EmailJS (`@emailjs/browser`) — sends form submissions straight from the client, no backend needed
  - Config comes from env vars: `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY` — see `.env.example`. Copy it to `.env` (gitignored) and fill in real values from the EmailJS dashboard
  - The EmailJS template should reference these field names (they're the `name` attributes on the form inputs, sent via `emailjs.sendForm`): `from_name`, `from_email`, `phone`, `message`
  - If the env vars are missing, forms fail gracefully (error state shown to the user, details logged to console) rather than throwing

## Brand & Design System
- **No brand accent color currently.** The site went through a blue-accent phase (icon badges, kicker labels, footer hover, focus rings, form asterisks) and the client asked to remove it everywhere ("try removing all the blue accents") — now back to pure monochrome (black/white/gray) throughout. `--brand` / `--brand-foreground` / `--color-brand` / `--color-brand-foreground` are still defined in `App.css` (`#3b82f6`, no dark-mode override) but **intentionally unused** — nothing references `bg-brand`/`text-brand`/`border-brand` anymore, and `--ring` was decoupled back to a neutral gray (`oklch(0.708 0 0)` light / `oklch(0.556 0 0)` dark, the original shadcn defaults). Left the tokens in place (inert) rather than deleting them in case the accent gets reinstated later — don't re-wire `--ring` to `var(--brand)` or start applying `bg-brand`/`text-brand` to new components without the client asking again.
- **Button patterns**: pill CTAs use `rounded-full` + `text-xs font-medium tracking-[0.2em] uppercase` + `transition-colors duration-300`, colored with theme tokens so they auto-adapt: `bg-foreground text-background hover:bg-foreground/85` (Hero's "Get a Free Quote" nav button and QuoteForm's submit button both use this exact pattern — keep them matching if either changes). Hero's nav button happens to hard-code `bg-white text-black` instead of the tokens since the hero is always-dark regardless of site theme (see Theming) — that's intentional, not an inconsistency to "fix."
- **Section max-width**: `mx-auto max-w-8xl px-4 sm:px-6 lg:px-8` — `max-w-8xl` (88rem/1408px) is a custom size added via `--container-8xl` in `App.css`'s `@theme inline` block (Tailwind's default scale tops out at `7xl`/80rem)
- **Responsive breakpoints**: Mobile-first. `md:` for desktop nav visibility, `lg:` for layout shifts
- **CSS utility classes** (defined in `App.css` `@layer components`):
  - `.bg-grid` — faint graph-paper grid background (24px cells). Black lines at 4% opacity in light mode, white at 3% in dark mode (auto-flips, see Theming below) — no extra class needed. Applied to light/white sections (`WhatWeDo`, `QuoteForm`) alongside `bg-background`.

## Theming (Light/Dark Mode)
- Site-wide light/dark theme follows the **OS/browser `prefers-color-scheme` setting** — there is no manual toggle and no JS involved. It's pure CSS: `:root` in `App.css` holds the light palette, and `@media (prefers-color-scheme: dark) { :root { ... } }` overrides those same custom properties for dark. Since every `bg-*`/`text-*`/`border-*` token (`background`, `foreground`, `card`, `muted`, `border`, `input`, `primary`, etc.) is mapped once in `@theme inline`, any component using the semantic tokens (`bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, shadcn's `Button`/`Input`/`Textarea`/`Label`) gets dark mode for free.
- **No `.dark` class.** shadcn's generator originally wired up class-based dark mode (`@custom-variant dark (&:is(.dark *));` + a `.dark { ... }` block) for a manual toggle UI. That's been removed in favor of Tailwind v4's built-in media-query-based `dark:` variant, since this site has no theme switcher — just system-driven. If a manual toggle is ever wanted, that's the mechanism to reintroduce (see Tailwind's dark mode docs) — don't add a `.dark` class back without it, it'd be dead weight.
- **Sections that intentionally *don't* theme**: `Hero.tsx` and `WhyChooseUs.tsx` are hard-coded dark (`text-white` etc.) regardless of light/dark mode — both now sit over a background photo (Hero has one; WhyChooseUs currently has a `bg-blue-500` placeholder, see Pending Photo Assets) with a dark overlay for legibility, same pattern in both. Only `WhatWeDo`, `QuoteForm`, and `Footer` (the "default" light sections) actually invert.
- When adding new components: prefer semantic tokens (`bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-muted`, etc.) over hard-coded Tailwind colors (`bg-white`, `text-black`, `bg-gray-100`) so they theme automatically. If a hard-coded color is unavoidable (like `WhatWeDo`'s `bg-gray-100` section tint), pair it with an explicit `dark:` variant (e.g. `dark:bg-gray-950`).
- **Named gray scale: use `gray`, not `neutral` or `slate`.** Applies to any hard-coded Tailwind gray-family color (`bg-gray-950`, `dark:bg-gray-950`, etc.) — the shadcn `oklch(x 0 0)` design-system tokens (`--background`, `--foreground`, `--border`, ...) are a separate, truly-neutral (zero-chroma) system and are unaffected by this — they stay as generated.
- `:root` also sets `color-scheme: light dark;` so native browser UI (scrollbars, form control chrome) matches too.

## Project Structure
```
/src
  /assets/images/       → Image & media assets (import as modules, not URL strings)
  /components/          → Custom composed components (Navbar, HeroSection, Footer, etc.)
  /components/ui/       → shadcn primitives (editable when brand requires it)
  /routes/              → TanStack Router file-based routes
  /hooks/               → Custom hooks (queries, utils) — create as needed
  /lib/                 → Utilities (utils.ts with `cn` helper)
  /types/               → Shared TypeScript types — create as needed
  App.css               → Single CSS entry point (Tailwind, theme vars, base styles)
  main.tsx              → App entry point (imports App.css, sets up Router + QueryClient)
```
- Aliases: `@/*` → `./src/*`
- `App.css` is the sole CSS entry point imported in `main.tsx`

## Existing Components

### Custom (`/src/components/`)
| Component | Purpose |
|---|---|
| `Hero.tsx` | Full-viewport homepage hero — dark editorial style, transparent nav (logo, "Get a Quote" — no hamburger/menu button), vertically centered content with the large logo lockup on the left and intro copy + clickable scroll cue in a column on the right. Both "Get a Quote" and "Scroll" link to `#quote` (see QuoteForm). Background photo is `hero.jpg`; nav logo is `logo.svg`; main hero logo lockup is `hero-logo.png`. |
| `WhatWeDo.tsx` | "What We Do" section (light bg, `bg-grid`) below the hero. Heading + 4 items (Commercial, Residential, Apartments, Storefronts) — each has a photo on top (currently stock, see Image Assets), then an icon badge, a title, and a short description (no numbered watermark — removed per client request; don't re-add a 01–04 counter without being asked). **Responsive layout, not just a resized grid**: on mobile (`grid-cols-1`) items lose the card chrome entirely — no border/rounded corners/background, `divide-y divide-border` puts a plain horizontal rule between them instead, full width. At `sm:` and up it becomes the familiar bordered/rounded card grid (`sm:grid-cols-2 lg:grid-cols-4`, `sm:divide-y-0`). If you touch this component, keep both states working — don't collapse it back to a single unconditional card style. |
| `WhyChooseUs.tsx` | "Why Choose Us" section (dark, photo background — currently a `bg-blue-500` placeholder, see Pending Photo Assets) — large `font-serif` reframe statement, centered, plus a 4-column row of short proof points (quality standard, pricing transparency, local/KC, longevity via included seal+track cleaning). |
| `QuoteForm.tsx` | "Get a Quote" section at the bottom of the homepage, `id="quote"` (scroll target for the hero's links). Name/email/phone/message fields (all with example placeholder text — "Jane Smith", "jane@example.com", "(816) 555-0123") + honeypot anti-spam field, submits via EmailJS (see Stack & Tools). Required fields (Name, Email, Message) show a `text-muted-foreground` `*` after the label — "Phone (optional)" doesn't. **Deliberately not `text-destructive`** — the client didn't want red here, gray or blue only, and blue's currently off (see Theming). If another required field gets added, follow this pattern (`<Label>Field <span className="text-muted-foreground">*</span></Label>`). |
| `Footer.tsx` | Site-wide footer, rendered in `__root.tsx` below `<Outlet />` (appears on every page). No background of its own — just a `border-t`, so it blends with whatever section it follows. Small/muted copyright year + "C and R Window Cleaning, LLC" (`text-xs text-muted-foreground/60`, deliberately subtle), Facebook/Instagram/X/LinkedIn icon buttons on the right in **rounded-square** buttons (`rounded-lg`, not `rounded-full` — matches the `WhatWeDo` icon-badge radius) with a neutral `hover:border-foreground hover:text-foreground` (was blue-accent hover before the accent got removed, see Theming). Icons are the **actual official brand marks** (filled `fill="currentColor"` paths sourced from Simple Icons, MIT licensed — `lucide-react` dropped brand/social icons from its own set, and hand-drawn approximations weren't accurate enough, notably the X logo). If a 5th platform is ever added, pull its path from Simple Icons (`https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/<slug>.svg`) rather than hand-drawing one. hrefs are still placeholder `#` and need real social URLs. |

### shadcn Primitives (`/src/components/ui/`)
`button` · `input` · `textarea` · `label`
- `input.tsx` / `textarea.tsx` — placeholder color overridden from the shadcn default `placeholder:text-muted-foreground` to `placeholder:text-muted-foreground/50` (client asked for placeholder text to read more subtly than normal muted text). Edited directly in the primitive rather than per-instance since it should apply everywhere, not just `QuoteForm`.

## Image Assets (`/src/assets/images/`)
- Import images as ES modules: `import img from "@/assets/images/file.webp"`
- `hero.jpg` — homepage hero background (storefront glass exterior), used in `Hero.tsx`. Source is 1600×1200 (605KB, JPEG). At full-bleed `object-cover` this is fine on typical laptop/desktop widths, especially since the hero applies a heavy dark overlay for text legibility — but on very large/4K monitors (~2560px+ CSS width) it will be upscaled 1.6–2.4x and can look soft in brighter/detailed areas (sky, glass highlights). Swap in a higher-res version (2400–3200px+ wide, ideally closer to 16:9 to reduce top/bottom cropping) if/when one becomes available — same `import` + filename, no code changes needed.
- `logo.svg` — the "CR" monogram, used in `Hero.tsx`'s nav. Shapes have no explicit `fill`, so they default to solid black (SVG spec default) — for a dark background it's rendered with Tailwind's `invert` filter class (`className="invert"`) to flip it white. If it's ever placed on a light background, drop the `invert` class instead.
- `hero-logo.png` — full logo lockup (CR monogram + "WINDOW CLEANERS"), pre-colored white on a transparent background. Used as the large mark in the hero. No filter needed — only use it on dark backgrounds, since it's baked white.
- `whatwedo-commercial.jpg`, `whatwedo-residential.jpg`, `whatwedo-apartments.jpg`, `whatwedo-storefronts.jpg` — one per `WhatWeDo.tsx` card, `aspect-[4/3] object-cover` (source images don't need pre-cropping to 4:3 — `object-cover` crops at render time). **None of these are real C&R job photos yet** — stand-ins for authenticity until the user has real photos of their own work to swap in. Same import + filename pattern as `hero.jpg` if replacing (just overwrite the file at the same path — no code changes needed).
  - `whatwedo-commercial.jpg` — free Unsplash stock (Unsplash License: free for commercial use, no attribution required).
  - `whatwedo-residential.jpg`, `whatwedo-apartments.jpg` — free Unsplash stock, user-selected and provided directly (same Unsplash License terms).
  - `whatwedo-storefronts.jpg` — **user-provided from Vecteezy** (filename prefix `vecteezy_...`), not Unsplash. Vecteezy's free tier typically requires attribution unless the account has a Pro license — this hasn't been verified. Confirm the user's Vecteezy license covers attribution-free commercial use before treating this as license-clear long-term.

### Pending Photo Assets
The user has real job/property photos coming (see note above — the current `WhatWeDo` card images are stock, not real C&R work, and should be swapped out when real photos arrive). Until a real photo arrives for it, `WhyChooseUs.tsx`'s full-bleed section background is still a solid `bg-blue-500` placeholder with an uppercase label ("PHOTO: WHY CHOOSE US BACKGROUND") — same layered pattern as `Hero.tsx` (background layer, then a legibility overlay, then `relative` content). Replace the placeholder `<div>` with an `<img>` using the classes noted in the `{/* TODO */}` comment above it, add the file to `src/assets/images/`, import it, and drop the `aria-hidden` div. Keep the overlay div — still needed for text contrast over a real photo.

## Routes (`/src/routes/`)
| Route file | Path | Purpose |
|---|---|---|
| `__root.tsx` | (layout) | Root layout — wraps all pages with Navbar + Footer |
| `index.tsx` | `/` | Home / landing page |

## Rules
- Always TypeScript + responsive + accessible (ARIA where needed)
- No inline styles, no `!important`, no raw div/button soup
- Use `cn` for class merging
- Handle loading/error states properly (especially with TanStack Query)
- External links use `<a href>`, internal links use TanStack Router `<Link to>`
- Always run `npm run build` after changes to verify TypeScript + Vite pass
- For new pages from images/screenshots/designs:
  1. Analyze attached image for design, content, and structure
  2. Describe layout & map to shadcn + existing/custom components
  3. Add missing/needed shadcn components via CLI: `npx shadcn@latest add [component]`

When in doubt, ask for clarification.
Update this file as conventions, component listings, and structures evolve.
