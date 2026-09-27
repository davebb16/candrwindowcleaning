# CLAUDE.md – Project Guidelines

Read this fully at the start of every session.
You are working in the **C&R Window Cleaners** site — a React + Vite + TypeScript project. Follow these rules strictly.

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
  <!-- Add project-specific utility classes as they are created -->

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
| `WhatWeDo.tsx` | "What We Do" section (light bg) below the hero. Heading + a 4-item icon grid: Commercial, Residential, Apartments, Storefronts (Lucide icons). |
| `WhyChooseUs.tsx` | "Why Choose Us" section (dark bg, matches hero tone) — single large `font-serif` value-prop statement, centered. |
| `QuoteForm.tsx` | "Get a Quote" section at the bottom of the homepage, `id="quote"` (scroll target for the hero's links). Name/email/phone/message fields + honeypot anti-spam field, submits via EmailJS (see Stack & Tools). |
| `Footer.tsx` | Site-wide footer, rendered in `__root.tsx` below `<Outlet />` (appears on every page). Dark bg matching the hero. Dynamic copyright year + "C and R Window Cleaning, LLC", Facebook/Instagram icon buttons on the right — hand-drawn inline SVGs (`lucide-react` dropped brand/social icons from its set), hrefs are still placeholder `#` and need real social URLs. |

### shadcn Primitives (`/src/components/ui/`)
`button` · `input` · `textarea` · `label`

## Image Assets (`/src/assets/images/`)
- Import images as ES modules: `import img from "@/assets/images/file.webp"`
- `hero.jpg` — homepage hero background (storefront glass exterior), used in `Hero.tsx`. Source is 1600×1200 (605KB, JPEG). At full-bleed `object-cover` this is fine on typical laptop/desktop widths, especially since the hero applies a heavy dark overlay for text legibility — but on very large/4K monitors (~2560px+ CSS width) it will be upscaled 1.6–2.4x and can look soft in brighter/detailed areas (sky, glass highlights). Swap in a higher-res version (2400–3200px+ wide, ideally closer to 16:9 to reduce top/bottom cropping) if/when one becomes available — same `import` + filename, no code changes needed.
- `logo.svg` — the "CR" monogram, used in `Hero.tsx`'s nav. Shapes have no explicit `fill`, so they default to solid black (SVG spec default) — for a dark background it's rendered with Tailwind's `invert` filter class (`className="invert"`) to flip it white. If it's ever placed on a light background, drop the `invert` class instead.
- `hero-logo.png` — full logo lockup (CR monogram + "WINDOW CLEANERS"), pre-colored white on a transparent background. Used as the large mark in the hero. No filter needed — only use it on dark backgrounds, since it's baked white.

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
