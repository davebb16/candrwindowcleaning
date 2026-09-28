import { Building2, Home, BuildingComplex, Store } from 'lucide-react'
import commercialImage from '@/assets/images/whatwedo-commercial.jpg'
import residentialImage from '@/assets/images/whatwedo-residential.jpg'
import apartmentsImage from '@/assets/images/whatwedo-apartments.jpg'
import storefrontsImage from '@/assets/images/whatwedo-storefronts.jpg'

const services = [
  {
    number: '01',
    label: 'Commercial',
    icon: Building2,
    image: commercialImage,
    description:
      'Office buildings and multi-story exteriors. We work around your hours so business never skips a beat.',
  },
  {
    number: '02',
    label: 'Residential',
    icon: Home,
    image: residentialImage,
    description:
      'Every window, sill, and screen — inside and out — for a spotless, streak-free finish you can see from the curb.',
  },
  {
    number: '03',
    label: 'Apartments',
    icon: BuildingComplex,
    image: apartmentsImage,
    description:
      'Scheduled service for property managers and complexes, keeping every unit and common area looking its best.',
  },
  {
    number: '04',
    label: 'Storefronts',
    icon: Store,
    image: storefrontsImage,
    description:
      'Crystal-clear glass that draws customers in. Regular visits keep your first impression spotless, every time.',
  },
]

export function WhatWeDo() {
  return (
    <section className="bg-grid bg-gray-100 px-6 py-20 md:px-10 md:py-28 lg:px-16 dark:bg-background">
      <div className="mx-auto max-w-8xl">
        <p className="font-serif text-3xl uppercase sm:text-4xl">
          What We Do
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          From single-family homes to multi-story storefronts across the
          Kansas City metro, every property gets the same standard:
          spotless, streak-free glass — without a price tag to match.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ number, label, icon: Icon, image, description }) => (
            <div
              key={label}
              className="overflow-hidden rounded-2xl border border-border bg-background"
            >
              <img
                src={image}
                alt={`${label} window cleaning`}
                className="aspect-[4/3] w-full object-cover"
              />

              <div className="p-8">
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-muted">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <span className="font-serif text-4xl text-foreground/10">
                    {number}
                  </span>
                </div>
                <p className="mt-6 text-lg font-semibold">{label}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
