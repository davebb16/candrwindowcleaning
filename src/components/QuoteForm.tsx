import { useState, type FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { Button } from '@/components/ui/button'
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
        <p className="font-serif text-3xl uppercase sm:text-4xl">
          Get a Quote
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Tell us a bit about your property and what you'd like cleaned —
          we'll get back to you with a free, no-obligation quote.
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
              <Label htmlFor="from_name">Name</Label>
              <Input id="from_name" name="from_name" type="text" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="from_email">Email</Label>
              <Input
                id="from_email"
                name="from_email"
                type="email"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone (optional)</Label>
            <Input id="phone" name="phone" type="tel" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Property type, number of windows, and any details that would help us quote accurately."
            />
          </div>

          <Button type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Sending…' : 'Send Request'}
          </Button>

          {status === 'success' && (
            <p className="text-sm text-emerald-600" role="status">
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
