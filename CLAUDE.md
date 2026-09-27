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
<!-- Fill this section in once branding is established -->
- **Primary brand colors**: (define as CSS vars in `App.css`, map in `@theme inline`)
  <!-- Example:
  - Brand Blue: `#3b82f6` → `bg-brand`, `text-brand`, `border-brand`
  - Dark: `#0f172a` → `bg-dark`, `text-dark`, `border-dark`
  -->
- **Button patterns**:
  <!-- Example:
  - Primary CTA: `bg-brand text-white font-semibold hover:bg-brand/90`
  - Secondary CTA: `bg-dark text-white border border-white/20 hover:bg-dark/80`
  -->
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
| `WhatWeDo.tsx` | "What We Do" section (light bg, `bg-grid`) below the hero. Heading + a 4-card grid (Commercial, Residential, Apartments, Storefronts) — each card has a `bg-blue-500` photo placeholder on top (see Pending Photo Assets), then an icon badge, a faint numbered watermark (01–04), a title, and a short description. |
| `WhyChooseUs.tsx` | "Why Choose Us" section (dark, photo background — currently a `bg-blue-500` placeholder, see Pending Photo Assets) — large `font-serif` reframe statement, centered, plus a 4-column row of short proof points (quality standard, pricing transparency, local/KC, longevity via included seal+track cleaning). |
| `QuoteForm.tsx` | "Get a Quote" section at the bottom of the homepage, `id="quote"` (scroll target for the hero's links). Name/email/phone/message fields + honeypot anti-spam field, submits via EmailJS (see Stack & Tools). |
| `Footer.tsx` | Site-wide footer, rendered in `__root.tsx` below `<Outlet />` (appears on every page). No background of its own — just a `border-t`, so it blends with whatever section it follows. Dynamic copyright year + "C and R Window Cleaning, LLC", Facebook/Instagram icon buttons on the right — hand-drawn inline SVGs (`lucide-react` dropped brand/social icons from its set), hrefs are still placeholder `#` and need real social URLs. |

### shadcn Primitives (`/src/components/ui/`)
`button` · `input` · `textarea` · `label`

## Image Assets (`/src/assets/images/`)
- Import images as ES modules: `import img from "@/assets/images/file.webp"`
- `hero.jpg` — homepage hero background (storefront glass exterior), used in `Hero.tsx`. Source is 1600×1200 (605KB, JPEG). At full-bleed `object-cover` this is fine on typical laptop/desktop widths, especially since the hero applies a heavy dark overlay for text legibility — but on very large/4K monitors (~2560px+ CSS width) it will be upscaled 1.6–2.4x and can look soft in brighter/detailed areas (sky, glass highlights). Swap in a higher-res version (2400–3200px+ wide, ideally closer to 16:9 to reduce top/bottom cropping) if/when one becomes available — same `import` + filename, no code changes needed.
- `logo.svg` — the "CR" monogram, used in `Hero.tsx`'s nav. Shapes have no explicit `fill`, so they default to solid black (SVG spec default) — for a dark background it's rendered with Tailwind's `invert` filter class (`className="invert"`) to flip it white. If it's ever placed on a light background, drop the `invert` class instead.
- `hero-logo.png` — full logo lockup (CR monogram + "WINDOW CLEANERS"), pre-colored white on a transparent background. Used as the large mark in the hero. No filter needed — only use it on dark backgrounds, since it's baked white.

### Pending Photo Assets
The user has real job/property photos coming. Until they arrive, these 5 spots are solid `bg-blue-500` placeholder boxes with an uppercase label (e.g. "PHOTO: COMMERCIAL") so they're unmistakable in the browser:
- `WhatWeDo.tsx` — one per card (Commercial, Residential, Apartments, Storefronts), `aspect-[4/3]` at the top of each card, above the icon/title/description.
- `WhyChooseUs.tsx` — one full-bleed section background, behind the dark overlay + text (same layered pattern as `Hero.tsx`: background layer, then a legibility overlay, then `relative` content).

When photos are provided: replace each placeholder `<div>` with an `<img>` using the classes already noted in the `{/* TODO */}` comment right above each one, add the file to `src/assets/images/`, import it, and drop the `aria-hidden` div. Keep the overlay div(s) — they're still needed for text contrast over a real photo, same as the hero.

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
