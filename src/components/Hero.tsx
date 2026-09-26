import { Menu } from 'lucide-react'

// TODO: once the real hero photo is provided, add it at src/assets/images/hero.jpg,
// import it here (`import heroImage from '@/assets/images/hero.jpg'`), and replace
// the placeholder gradient <div> below with an <img> using the same absolute/cover
// classes. See CLAUDE.md > Image Assets for the exact steps.

export function Hero() {
  return (
    <section className="relative flex min-h-screen w-full flex-col overflow-hidden bg-neutral-950">
      {/* Background photo placeholder — swap for the real hero image, see TODO above */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#3a3f47_0%,_#101114_55%,_#050506_100%)]"
      />
      {/* Legibility overlay */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent"
      />

      <nav className="relative z-20 flex items-center justify-between border-b border-white/15 px-6 py-6 md:px-10">
        <span className="font-serif text-lg tracking-[0.35em] text-white">
          C&R
        </span>
        <div className="flex items-center gap-6">
          <button
            type="button"
            className="rounded-full border border-white/40 px-5 py-2 text-xs font-medium tracking-[0.2em] text-white uppercase transition-colors duration-300 hover:bg-white hover:text-black"
          >
            Get a Quote
          </button>
          <button type="button" aria-label="Open menu" className="text-white">
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      <div className="relative z-20 mt-auto flex flex-col gap-10 px-6 pb-10 md:flex-row md:items-end md:justify-between md:px-10 md:pb-14">
        <h1 className="font-serif text-[16vw] leading-[0.82] tracking-tight text-white select-none sm:text-[13vw] md:text-[10vw] lg:text-[8vw]">
          C&R
          <br />
          Windows
        </h1>

        <div className="max-w-xs text-left text-white lg:max-w-sm">
          <p className="font-serif text-lg leading-snug uppercase sm:text-xl">
            Crystal Clear Care
            <br />
            For Every Window
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            C&R Window Cleaners brings meticulous care to every pane,
            pairing trusted craftsmanship with a spotless, streak-free
            finish — for homes and businesses that expect nothing less.
          </p>
          <p className="mt-8 text-xs tracking-[0.3em] text-white/60 uppercase">
            Scroll
          </p>
        </div>
      </div>
    </section>
  )
}
