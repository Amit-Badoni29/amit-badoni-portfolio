import { ArrowUpRight, BriefcaseBusiness, Building2, MapPin } from 'lucide-react';
import { experience } from '@/lib/data';

export function Experience() {
  return (
    <section
      id="experience"
      data-pin-scroll
      className="relative border-t border-base overflow-hidden"
      style={{ height: '100vh' }}
    >
      {/* Cosmic journey background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/4 w-2 h-2 rounded-full bg-accent/30 blur-[1px] animate-twinkle" />
        <div className="absolute top-1/3 left-1/2 w-1.5 h-1.5 rounded-full bg-accent-2/20 blur-[1px] animate-twinkle" style={{ animationDelay: '1s' }} />
        <div className="absolute top-2/3 left-3/4 w-1 h-1 rounded-full bg-accent/20 animate-twinkle" style={{ animationDelay: '2s' }} />
      </div>

      {/* Sticky heading row */}
      <div className="sticky top-0 z-20 h-20 flex items-center justify-between px-5 sm:px-8 glass border-b border-base">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent">03</span>
          <span className="h-px w-8 bg-accent/50" />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-secondary">Where I've been</span>
        </div>
        <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight">Experience</h2>
        {/* Cosmic trajectory progress bar */}
        <div className="hidden sm:flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent/40" />
          <div className="w-32 h-px bg-border overflow-hidden">
            <div data-pin-bar className="h-full bg-gradient-to-r from-accent to-accent-2 origin-left" style={{ transform: 'scaleX(0)' }} />
          </div>
          <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_var(--color-primary-glow)]" />
        </div>
      </div>

      {/* Horizontal track */}
      <div
        data-pin-track
        className="flex items-center h-[calc(100vh-5rem)] pl-5 sm:pl-8 pr-[20vw] gap-6 sm:gap-8"
        style={{ width: 'max-content' }}
      >
        {experience.map((item, index) => (
          <article
            key={item.company}
            className="group relative flex flex-col justify-between w-[80vw] sm:w-[440px] h-[calc(100vh-8rem)] bg-elevated/80 backdrop-blur-sm border border-base hover:border-accent/40 transition-colors duration-500 p-8 sm:p-10"
          >
            {/* Orbit number watermark */}
            <span className="absolute top-6 right-6 font-display text-7xl font-semibold text-primary/[0.04] leading-none">
              0{index + 1}
            </span>

            {/* Celestial marker */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-accent/30 bg-base flex items-center justify-center" aria-hidden="true">
              <div className="w-2 h-2 rounded-full bg-accent animate-twinkle" />
            </div>

            <div>
              <div className="flex items-center gap-2 font-mono text-[10px] tracking-wider uppercase text-accent mb-6">
                <span className="w-2 h-2 rounded-full bg-accent" />
                ORBIT 0{index + 1} · {item.period}
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold group-hover:text-accent transition-colors duration-300">
                {item.role}
              </h3>
              <div className="mt-3 flex items-center gap-4 text-sm">
                <span className="inline-flex items-center gap-1.5 text-accent">
                  <Building2 size={14} /> {item.company}
                </span>
                <span className="inline-flex items-center gap-1.5 text-secondary">
                  <MapPin size={14} /> {item.location}
                </span>
              </div>
            </div>

            <ul className="space-y-4">
              {item.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-secondary">
                  <span className="text-accent mt-2 w-1 h-1 rounded-full bg-accent shrink-0" />
                  {point}
                </li>
              ))}
            </ul>

            {/* Bottom accent line */}
            <div className="h-px w-full bg-border mt-8">
              <div className="h-full w-0 group-hover:w-full bg-accent transition-all duration-700" />
            </div>
          </article>
        ))}

        {/* End card */}
        <div className="flex flex-col items-center justify-center w-[60vw] sm:w-[300px] h-[calc(100vh-8rem)] shrink-0">
          <BriefcaseBusiness size={28} strokeWidth={1.2} className="text-accent mb-4" />
          <p className="font-display text-lg font-semibold text-primary text-center">Open to new opportunities</p>
          <a
            href="#contact"
            className="mt-4 inline-flex items-center gap-2 text-sm text-accent link-underline"
          >
            Let's talk <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
