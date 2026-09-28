const reasons = [
  
  
  
  {
    title: 'Built to last, not just shine',
    description:
      'Every visit includes seal and track cleaning, so your windows don’t only look better, they also last longer.',
  },
  {
    title: 'Locally owned in KC',
    description:
      'Proudly serving homes and businesses across the entire Kansas City metro.',
  },
  {
    title: 'Fair, upfront pricing',
    description:
      'You get a clear quote before we start — no hidden fees, no surprise upsells.',
  },
  {
    title: 'Spotless, no exceptions',
    description:
      "If it's not streak-free, we're not done. That's the standard on every job, every time.",
  },
]

export function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden px-6 py-20 bg-background border border-border text-white md:px-10 md:py-28 lg:px-16">

      <div className="relative mx-auto max-w-8xl text-center">
        <p className="text-xs tracking-[0.3em] text-white/60 uppercase">
          Why Choose Us
        </p>
        <p className="mx-auto mt-6 max-w-3xl font-serif text-3xl leading-snug sm:text-4xl md:text-5xl">
          You shouldn't have to choose between spotless and affordable.
          With C&R, you don't.
        </p>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-10 text-left sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
          {reasons.map(({ title, description }) => (
            <div key={title}>
              <p className="font-serif text-lg">{title}</p>
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
