import { Building2, Home, BuildingComplex, Store } from 'lucide-react'

const services = [
  { label: 'Commercial', icon: Building2 },
  { label: 'Residential', icon: Home },
  { label: 'Apartments', icon: BuildingComplex },
  { label: 'Storefronts', icon: Store },
]

export function WhatWeDo() {
  return (
    <section className="bg-background px-6 py-20 md:px-10 md:py-28 lg:px-16">
      <div className="mx-auto max-w-8xl">
        <p className="font-serif text-3xl uppercase sm:text-4xl">
          What We Do
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          From single-family homes to multi-story storefronts, we bring the
          same careful, streak-free finish to every kind of property.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-8 sm:gap-10 md:grid-cols-4">
          {services.map(({ label, icon: Icon }) => (
            <div key={label} className="flex flex-col items-center gap-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border">
                <Icon className="h-7 w-7" strokeWidth={1.5} />
              </div>
              <p className="text-sm font-medium tracking-wide uppercase">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
