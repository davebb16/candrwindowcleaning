import { useState, type FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function QuoteForm() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget

    // Honeypot — bots fill every field, real visitors never see this one
    if (new FormData(form).get('company')) {
      return
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error(
        'EmailJS is not configured — set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY (see .env.example).',
      )
      setStatus('error')
      return
    }

    setStatus('submitting')
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, {
        publicKey: PUBLIC_KEY,
      })
      setStatus('success')
      form.reset()
    } catch (error) {
      console.error('EmailJS submission failed:', error)
      setStatus('error')
    }
  }

  return (
    <section id="quote" className="bg-grid bg-background px-6 py-20 md:px-10 lg:px-16 md:py-28">
      <div className="mx-auto max-w-2xl">
        <p className="text-xs tracking-[0.3em] text-brand uppercase">
          Want to learn more?
        </p>
        <h2 className="mt-3 font-serif text-3xl uppercase sm:text-4xl">
          Explore my Options
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Tell us about your property and what you'd like cleaned. We'll
          follow up with a free, no-obligation quote — fair pricing, no
          surprises.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          {/* Honeypot field, hidden from sighted users and screen readers */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="from_name">
                Name <span className="text-brand">*</span>
              </Label>
              <Input
                id="from_name"
                name="from_name"
                type="text"
                placeholder="Jane Smith"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="from_email">
                Email <span className="text-brand">*</span>
              </Label>
              <Input
                id="from_email"
                name="from_email"
                type="email"
                placeholder="jane@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone (optional)</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="(816) 555-0123"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">
              Message <span className="text-brand">*</span>
            </Label>
            <Textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Property type, number of windows, and any details that would help us quote accurately."
            />
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="rounded-full bg-brand px-5 py-2 text-xs font-medium tracking-[0.2em] text-brand-foreground uppercase transition-colors duration-300 hover:bg-brand/85 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50"
          >
            {status === 'submitting' ? 'Sending…' : 'Get My Free Quote'}
          </button>

          {status === 'success' && (
            <p className="text-sm text-emerald-600 dark:text-emerald-400" role="status">
              Thanks — we've received your request and will be in touch
              soon.
            </p>
          )}
          {status === 'error' && (
            <p className="text-sm text-destructive" role="alert">
              Something went wrong sending your request. Please try again,
              or reach out to us directly.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
