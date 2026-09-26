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
- **Font**: Geist Variable, self-hosted via `@fontsource-variable/geist`
- Routing: TanStack Router (file-based in `/src/routes/`)
  - Pages/layouts in `/src/routes/`
  - Use `<Link />` for internal routes, `<a href>` for external URLs
  - Use `useNavigate`, `<Outlet />`
  - Route tree auto-generates via `@tanstack/router-plugin` as `src/routeTree.gen.ts` — don't edit this file, and don't be alarmed if it's missing before the first `dev`/`build` run
- Data: TanStack Query for all fetching, caching, mutations
  - Prefer `useQuery` / `useMutation` / `useSuspenseQuery`
  - Co-locate queries in hooks or components

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
- **Section max-width**: `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`
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
<!-- Add components here as they are built -->

### shadcn Primitives (`/src/components/ui/`)
`button`

## Image Assets (`/src/assets/images/`)
<!-- List image assets as they are added -->
- Import images as ES modules: `import img from "@/assets/images/file.webp"`

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
