import { FormEvent, useState } from 'react';
import { ArrowUpRight, Check, LoaderCircle, Mail, Phone } from 'lucide-react';
import { personal } from '@/lib/data';
import { SectionHeading } from './SectionHeading';
import { OrbitalRing } from './Animations';

type FormStatus = 'idle' | 'submitting' | 'success';

export function Contact() {
  const [status, setStatus] = useState<FormStatus>('idle');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');

    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') ?? '').trim();
    const email = String(form.get('email') ?? '').trim();
    const message = String(form.get('message') ?? '').trim();

    const subject = `Portfolio Contact from ${name}`;

    const body = [
      `Hello Amit,`,
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      '',
      'Message:',
      message,
      '',
      `Sent from your portfolio website.`,
    ].join('\n');

    const mailtoUrl = `mailto:${personal.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;

    setStatus('success');
    event.currentTarget.reset();
  }

  return (
    <section
      id="contact"
      className="relative py-28 sm:py-36 border-t border-base bg-surface/30 overflow-hidden"
    >
      {/* Distant planet glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-accent/5 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <OrbitalRing
        className="bottom-10 left-1/2 -translate-x-1/2"
        size={500}
        opacity={0.05}
      />

      <div className="mx-auto max-w-content px-5 sm:px-8 relative z-10">
        <SectionHeading
          eyebrow="Have a project in mind?"
          title="Let's work together."
          number="06"
        />

        <div className="grid lg:grid-cols-[0.65fr_1fr] gap-14 lg:gap-24">
          <div data-reveal className="opacity-0">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent mb-4">
              OPEN CHANNEL
            </p>

            <p className="text-secondary leading-relaxed max-w-sm">
              Whether you have a product idea, a technical challenge, or just want
              to say hello — my inbox is always open.
            </p>

            <div className="mt-9 space-y-4">
              <a
                href={`mailto:${personal.email}`}
                className="flex items-center gap-3 text-sm text-secondary hover:text-accent transition-colors"
              >
                <Mail size={16} className="text-accent" />
                {personal.email}
              </a>

              <a
                href={`tel:${personal.phone}`}
                className="flex items-center gap-3 text-sm text-secondary hover:text-accent transition-colors"
              >
                <Phone size={16} className="text-accent" />
                {personal.phone}
              </a>
            </div>
          </div>

          <form
            data-reveal
            onSubmit={handleSubmit}
            className="opacity-0 space-y-7"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <label className="block">
                <span className="font-mono text-[10px] tracking-wider uppercase text-secondary">
                  Your name
                </span>

                <input
                  required
                  name="name"
                  type="text"
                  className="mt-3 w-full bg-transparent border-0 border-b border-base px-0 py-3 text-sm text-primary outline-none focus:border-accent transition-colors placeholder:text-secondary/50"
                  placeholder="Jane Smith"
                />
              </label>

              <label className="block">
                <span className="font-mono text-[10px] tracking-wider uppercase text-secondary">
                  Email address
                </span>

                <input
                  required
                  name="email"
                  type="email"
                  className="mt-3 w-full bg-transparent border-0 border-b border-base px-0 py-3 text-sm text-primary outline-none focus:border-accent transition-colors placeholder:text-secondary/50"
                  placeholder="jane@company.com"
                />
              </label>
            </div>

            <label className="block">
              <span className="font-mono text-[10px] tracking-wider uppercase text-secondary">
                Tell me about it
              </span>

              <textarea
                required
                name="message"
                rows={4}
                className="mt-3 w-full resize-none bg-transparent border-0 border-b border-base px-0 py-3 text-sm text-primary outline-none focus:border-accent transition-colors placeholder:text-secondary/50"
                placeholder="A few words about your project..."
              />
            </label>

            {status === 'success' ? (
              <div className="inline-flex items-center gap-2 text-accent text-sm">
                <Check size={17} />
                Your email app has been opened. I'll be in touch soon.
              </div>
            ) : (
              <button
                disabled={status === 'submitting'}
                type="submit"
                className="group inline-flex items-center gap-3 bg-accent text-on-accent px-6 py-3.5 rounded-full font-medium text-sm hover:shadow-[0_0_30px_var(--color-primary-glow)] transition-shadow disabled:opacity-60"
              >
                {status === 'submitting' ? (
                  <>
                    <LoaderCircle size={16} className="animate-spin" />
                    Opening email...
                  </>
                ) : (
                  <>
                    Send message
                    <ArrowUpRight
                      size={16}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </>
                )}
              </button>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}