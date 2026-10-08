import { AnimatePresence, motion } from 'framer-motion'
import { CircleAlert, CircleCheck, LoaderCircle, Send } from 'lucide-react'
import { useId, useRef, useState, type FormEvent } from 'react'
import { site } from '@/data/site'
import { cn, isPlaceholder } from '@/lib/utils'
import { Button } from './ui/Button'

type FieldName = 'name' | 'email' | 'subject' | 'message'
type Values = Record<FieldName, string>
type Errors = Partial<Record<FieldName, string>>
type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'error'

const EMPTY: Values = { name: '', email: '', subject: '', message: '' }
const MESSAGE_MAX = 2000

function validate(values: Values): Errors {
  const errors: Errors = {}
  if (values.name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Please enter a valid email address.'
  if (values.message.trim().length < 10) errors.message = 'Please write a message of at least 10 characters.'
  if (values.message.length > MESSAGE_MAX) errors.message = `Please keep your message under ${MESSAGE_MAX} characters.`
  return errors
}

export function ContactForm() {
  const [values, setValues] = useState<Values>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const honeypotRef = useRef<HTMLInputElement>(null)

  const update = (field: FieldName, value: string) => {
    const next = { ...values, [field]: value }
    setValues(next)
    // After the first submit attempt, re-validate as the visitor fixes things.
    if (submitted) setErrors(validate(next))
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)

    // Bots fill hidden fields; quietly pretend success.
    if (honeypotRef.current?.value) {
      setStatus('sent')
      return
    }

    const found = validate(values)
    setErrors(found)
    const firstInvalid = (Object.keys(found) as FieldName[])[0]
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    const subject = values.subject.trim() || `Portfolio enquiry from ${values.name.trim()}`

    if (!isPlaceholder(site.contactFormEndpoint)) {
      setStatus('sending')
      try {
        const res = await fetch(site.contactFormEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ name: values.name, email: values.email, _subject: subject, message: values.message }),
        })
        if (!res.ok) throw new Error(`Form endpoint responded with ${res.status}`)
        setStatus('sent')
        setValues(EMPTY)
        setSubmitted(false)
      } catch {
        setErrorMessage('Something went wrong while sending. Please try again, or reach out on GitHub.')
        setStatus('error')
      }
      return
    }

    if (!isPlaceholder(site.email)) {
      const body = `${values.message}\n\n— ${values.name} (${values.email})`
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      setStatus('mailto')
      return
    }

    setErrorMessage("This form isn't connected yet. Please reach out on GitHub in the meantime.")
    setStatus('error')
  }

  const reset = () => {
    setStatus('idle')
    setValues(EMPTY)
    setErrors({})
    setSubmitted(false)
  }

  return (
    <div className="relative rounded-2xl border border-line bg-surface-strong/80 p-6 backdrop-blur sm:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {status === 'sent' || status === 'mailto' ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex min-h-[420px] flex-col items-center justify-center text-center"
            role="status"
          >
            <span className="grid size-14 place-items-center rounded-full bg-success/12 text-success">
              <CircleCheck className="size-7" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-xl font-semibold tracking-tight text-fg">
              {status === 'sent' ? 'Message sent' : 'Almost there'}
            </h3>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
              {status === 'sent'
                ? "Thanks for reaching out. I'll get back to you as soon as I can."
                : 'Your email app should have opened with the message ready. Just hit send.'}
            </p>
            <Button variant="secondary" size="sm" className="mt-7" onClick={reset}>
              Send another message
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-5"
            aria-label="Contact form"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" name="name" autoComplete="name" value={values.name} error={errors.name} onChange={update} required />
              <Field label="Email" name="email" type="email" autoComplete="email" value={values.email} error={errors.email} onChange={update} required />
            </div>
            <Field label="Subject" name="subject" value={values.subject} error={errors.subject} onChange={update} optional />
            <Field
              label="Message"
              name="message"
              multiline
              value={values.message}
              error={errors.message}
              onChange={update}
              required
              hint={`${values.message.length}/${MESSAGE_MAX}`}
            />

            {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label>
                Leave this field empty
                <input ref={honeypotRef} type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <AnimatePresence>
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  role="alert"
                  className="flex items-start gap-2.5 overflow-hidden rounded-xl border border-danger/25 bg-danger/[0.07] p-3.5 text-sm text-fg/90"
                >
                  <CircleAlert className="mt-0.5 size-4 shrink-0 text-danger" aria-hidden="true" />
                  {errorMessage}
                </motion.p>
              )}
            </AnimatePresence>

            <div className="flex flex-col-reverse items-start justify-between gap-4 pt-1 sm:flex-row sm:items-center">
              <p className="text-xs text-subtle">Your details are only used to reply to you.</p>
              <Button
                type="submit"
                size="lg"
                disabled={status === 'sending'}
                icon={status === 'sending' ? LoaderCircle : undefined}
                iconRight={status === 'sending' ? undefined : Send}
                className={cn('w-full sm:w-auto', status === 'sending' && '[&_svg]:animate-spin')}
              >
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

interface FieldProps {
  label: string
  name: FieldName
  value: string
  onChange: (name: FieldName, value: string) => void
  error?: string
  type?: string
  autoComplete?: string
  multiline?: boolean
  required?: boolean
  optional?: boolean
  hint?: string
}

function Field({ label, name, value, onChange, error, type = 'text', autoComplete, multiline, required, optional, hint }: FieldProps) {
  const id = useId()
  const errorId = `${id}-error`
  const inputClasses = cn(
    'w-full rounded-xl border bg-bg/50 px-4 py-3 text-[0.95rem] text-fg placeholder:text-subtle/70 transition-[border-color,box-shadow] duration-200 focus-visible:outline-none focus:ring-4',
    error ? 'border-danger/60 focus:border-danger focus:ring-danger/15' : 'border-line-strong focus:border-accent focus:ring-accent/15',
  )
  const shared = {
    id,
    name,
    value,
    required,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
    className: inputClasses,
  }

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <label htmlFor={id} className="text-sm font-medium text-fg">
          {label}
          {optional && <span className="ml-1.5 font-normal text-subtle">(optional)</span>}
        </label>
        {hint && <span className="font-mono text-[0.68rem] text-subtle tabular-nums">{hint}</span>}
      </div>
      {multiline ? (
        <textarea {...shared} rows={6} maxLength={MESSAGE_MAX + 200} onChange={(e) => onChange(name, e.target.value)} className={cn(inputClasses, 'resize-y')} placeholder="Tell me about the role, project or idea…" />
      ) : (
        <input {...shared} type={type} autoComplete={autoComplete} onChange={(e) => onChange(name, e.target.value)} />
      )}
      <AnimatePresence>
        {error && (
          <motion.p
            id={errorId}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1.5 text-xs text-danger"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
