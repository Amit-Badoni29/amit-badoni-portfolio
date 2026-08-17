import { skills, allTechnologies, floatingTechs } from '@/lib/data';
import { SectionHeading } from './SectionHeading';
import { OrbitalRing } from './Animations';

export function Skills() {
  return (
    <section
      id="skills"
      className="relative py-28 sm:py-36 border-t border-base bg-surface/30 overflow-hidden"
    >
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <SectionHeading
          eyebrow="What I work with"
          title="My toolkit."
          number="02"
        />
      </div>

      {/* Marquee strip — cosmic transmission */}
      <div
        data-reveal
        className="opacity-0 marquee-mask overflow-hidden border-y border-base py-5 mb-16"
      >
        <div className="flex w-max animate-marquee">
          {[...allTechnologies, ...allTechnologies].map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="flex items-center gap-3 px-6 font-mono text-sm text-secondary whitespace-nowrap"
            >
              {tech}
              <span className="w-1 h-1 rounded-full bg-accent/40" />
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-content px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-16 items-start">

          {/* Floating tech cloud — orbital constellation */}
          <div
            data-reveal
            className="opacity-0 relative h-[340px] sm:h-[420px] lg:h-[480px]"
          >
            {/* Orbital rings */}
            <OrbitalRing
              className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
              size={200}
              opacity={0.1}
            />

            <OrbitalRing
              className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
              size={320}
              opacity={0.06}
              reverse
            />

            {/* Floating technology labels */}
            {floatingTechs.map((tech, i) => (
              <span
                key={tech.label}
                className={`absolute z-20 font-display font-semibold text-primary hover:text-accent transition-colors duration-300 ${
                  tech.size
                } ${i % 2 === 0 ? 'animate-float' : 'animate-float-slow'}`}
                style={{
                  top: tech.top,
                  left: tech.left,
                  animationDelay: `${tech.delay}s`,
                  color: 'var(--color-text-primary)',
                }}
              >
                {tech.label}
              </span>
            ))}

            {/* Center gravitational core */}
            <div
              className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent shadow-[0_0_20px_var(--color-primary-glow)]"
              aria-hidden="true"
            />

            {/* Center glow — deliberately behind the text */}
            <div
              className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-accent/8 blur-[80px] pointer-events-none"
              aria-hidden="true"
            />
          </div>

          {/* Categorized grid */}
          <div
            data-reveal-stagger
            className="grid sm:grid-cols-2 gap-4"
          >
            {skills.map((skill, index) => (
              <div
                data-stagger-item
                key={skill.category}
                className="group relative bg-elevated border border-base p-6 sm:p-7 rounded-sm hover:border-accent/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_40px_var(--color-primary-glow)]"
              >
                {/* Hover gradient orb */}
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-accent/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative flex items-start justify-between mb-6">
                  <span className="font-mono text-[10px] text-accent">
                    0{index + 1}
                  </span>

                  <span className="w-5 h-5 border border-accent/30 rounded-full group-hover:bg-accent group-hover:border-accent transition-all duration-300 group-hover:scale-110" />
                </div>

                <h3 className="relative font-display text-lg font-semibold mb-4 group-hover:text-accent transition-colors duration-300">
                  {skill.category}
                </h3>

                <div className="relative flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="font-mono text-[10px] text-secondary border border-base rounded-full px-2.5 py-1.5 group-hover:border-accent/30 group-hover:text-primary transition-all duration-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}