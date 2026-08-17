import { GraduationCap } from 'lucide-react';
import { education } from '@/lib/data';
import { SectionHeading } from './SectionHeading';

export function Education() {
  return (
    <section id="education" className="relative py-28 sm:py-36 border-t border-base">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <SectionHeading eyebrow="The foundation" title="Education." number="05" />
        <div className="grid md:grid-cols-2 gap-5 max-w-4xl">
          {education.map((item, index) => (
            <article
              data-reveal-expand
              key={item.degree}
              className="group relative border border-base p-7 sm:p-9 hover:border-accent/40 transition-colors duration-500"
            >
              {/* Star marker */}
              <div className="absolute top-7 right-7 w-1.5 h-1.5 rounded-full bg-accent/40 animate-twinkle" aria-hidden="true" />

              <div className="flex items-start justify-between mb-12">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border border-accent/30 flex items-center justify-center group-hover:bg-accent/10 transition-colors duration-300">
                    <GraduationCap size={22} strokeWidth={1.2} className="text-accent" />
                  </div>
                  {/* Orbital path around icon */}
                  <div className="absolute -inset-2 rounded-full border border-dashed border-accent/15 animate-spin-slow" aria-hidden="true" />
                </div>
                <span className="font-mono text-[10px] text-secondary">{item.period}</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-[9px] tracking-widest text-accent/60">FOUNDATION 0{index + 1}</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-semibold group-hover:text-accent transition-colors">{item.degree}</h3>
              <p className="mt-3 text-sm text-secondary">{item.school}</p>
              <span className="absolute bottom-5 right-6 font-mono text-[9px] tracking-widest text-secondary/50">0{index + 1}</span>
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-accent/10 to-transparent" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
