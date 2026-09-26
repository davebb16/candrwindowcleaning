import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '@/components/Hero'
import { QuoteForm } from '@/components/QuoteForm'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <main>
      <Hero />
      <QuoteForm />
    </main>
  )
}
