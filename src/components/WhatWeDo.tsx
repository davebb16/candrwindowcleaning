import { Building2, Home, BuildingComplex, Store } from 'lucide-react'

const services = [
  {
    number: '01',
    label: 'Commercial',
    icon: Building2,
    description:
      'Office buildings and multi-story exteriors. We work around your hours so business never skips a beat.',
  },
  {
    number: '02',
    label: 'Residential',
    icon: Home,
    description:
      'Every window, sill, and screen — inside and out — for a spotless, streak-free finish you can see from the curb.',
  },
  {
    number: '03',
    label: 'Apartments',
    icon: BuildingComplex,
    description:
      'Scheduled service for property managers and complexes, keeping every unit and common area looking its best.',
  },
  {
    number: '04',
    label: 'Storefronts',
    icon: Store,
    description:
      'Crystal-clear glass that draws customers in. Regular visits keep your first impression spotless, every time.',
  },
]

export function WhatWeDo() {
  return (
    <section className="bg-neutral-950 px-6 py-20 text-white md:px-10 md:py-28 lg:px-16">
      <div className="mx-auto max-w-8xl">
        <p className="font-serif text-3xl uppercase sm:text-4xl">
          What We Do
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60">
          From single-family homes to multi-story storefronts, we bring the
          same careful, streak-free finish to every kind of property.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ number, label, icon: Icon, description }) => (
            <div
              key={label}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-8"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/10">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <span className="font-serif text-4xl text-white/10">
                  {number}
                </span>
              </div>
              <p className="mt-6 text-lg font-semibold">{label}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
