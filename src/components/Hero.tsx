import { Menu } from 'lucide-react'
import heroImage from '@/assets/images/hero.jpg'
import logo from '@/assets/images/logo.svg'
import heroLogo from '@/assets/images/hero-logo.png'

export function Hero() {
  return (
    <section className="relative flex min-h-screen w-full flex-col overflow-hidden bg-neutral-950">
      <img
        src={heroImage}
        alt="C&R Window Cleaners — commercial storefront glass, freshly cleaned"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Legibility overlays — the source photo is a bright daytime shot, so it needs a fairly heavy tint */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/10"
      />

      <nav className="relative z-20 border-b border-white/15 px-6 py-6 md:px-10 lg:px-16">
        <div className="mx-auto flex max-w-8xl items-center justify-between">
          <img src={logo} alt="C&R Window Cleaners" className="h-9 w-auto invert md:h-10" />
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
        </div>
      </nav>

      <div className="relative z-20 mt-24 mb-auto px-6 py-10 md:mt-32 md:px-10 md:py-14 lg:px-16">
        <div className="mx-auto flex max-w-8xl flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <img
            src={heroLogo}
            alt="C&R Window Cleaners"
            className="w-64 select-none sm:w-80 md:w-96 lg:w-[32rem]"
          />

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
            <p className="mt-8 lg:mt-16 text-xs tracking-[0.3em] text-white/60 uppercase">
              Scroll
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
