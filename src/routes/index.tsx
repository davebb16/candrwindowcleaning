import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '@/components/Hero'
import { WhatWeDo } from '@/components/WhatWeDo'
import { WhyChooseUs } from '@/components/WhyChooseUs'
import { QuoteForm } from '@/components/QuoteForm'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <main>
      <Hero />
      <WhatWeDo />
      <WhyChooseUs />
      <QuoteForm />
    </main>
  )
}
