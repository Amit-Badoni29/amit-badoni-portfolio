import { ArrowUpRight, MapPin, Code2, Server, Database } from 'lucide-react';
import { personal } from '@/lib/data';
import { SectionHeading } from './SectionHeading';
import { OrbitalRing } from './Animations';

const focusAreas = [
  { icon: Code2, label: 'Frontend', desc: 'React, Next.js, Tailwind' },
  { icon: Server, label: 'Backend', desc: 'Node, Express, REST APIs' },
  { icon: Database, label: 'Database', desc: 'PostgreSQL, MongoDB, Prisma' },
];

export function About() {
  return (
    <section id="about" className="relative py-28 sm:py-36 border-t border-base">
      {/* Decorative orbital ring */}
      <OrbitalRing className="top-20 right-[-100px]" size={400} rotation={20} opacity={0.06} />

      {/* Small moon glow */}
      <div className="absolute top-32 right-[10%] w-3 h-3 rounded-full bg-accent/40 blur-[2px] animate-twinkle" aria-hidden="true" />

      <div className="mx-auto max-w-content px-5 sm:px-8 relative z-10">
        <SectionHeading eyebrow="A little about me" title="The person behind the code." number="01" />

        <div className="grid lg:grid-cols-[1fr_0.85fr] gap-12 lg:gap-20 items-start">
          {/* Left — text content */}
          <div className="min-w-0">
            <p
              data-reveal-words
              className="font-display text-2xl sm:text-3xl leading-snug text-primary max-w-2xl"
              style={{ perspective: '400px' }}
            >
              I don't just write code — I translate ideas into reliable digital experiences that people enjoy using.
            </p>

            <div data-reveal-slide-left className="opacity-0 mt-8 max-w-xl">
              <p className="text-secondary leading-relaxed">{personal.summary}</p>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <span className="inline-flex items-center gap-2 text-sm text-secondary">
                  <MapPin size={15} className="text-accent" />
                  {personal.location}
                </span>
                <a href={`mailto:${personal.email}`} className="inline-flex items-center gap-1.5 text-sm text-accent link-underline">
                  Get in touch <ArrowUpRight size={14} />
                </a>
              </div>
            </div>

            {/* Focus areas */}
            <div data-reveal-stagger className="mt-10 grid grid-cols-3 gap-3">
              {focusAreas.map((area) => (
                <div
                  data-stagger-item
                  key={area.label}
                  className="group flex flex-col items-center text-center p-4 border border-base hover:border-accent/40 transition-colors duration-300"
                >
                  <area.icon size={20} strokeWidth={1.3} className="text-accent group-hover:scale-110 transition-transform duration-300" />
                  <span className="mt-3 font-display text-sm font-semibold">{area.label}</span>
                  <span className="mt-1 font-mono text-[8px] text-secondary leading-tight">{area.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — image with mission viewport frame */}
          <div data-img-reveal className="relative aspect-[4/3] overflow-hidden rounded-sm bg-surface group lg:mt-2">
            <img
              src="https://images.pexels.com/photos/33572895/pexels-photo-33572895.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
              alt="Amit's developer workspace"
              className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-700"
            />
            <div className="absolute inset-0 img-overlay" />
            {/* Scanning line */}
            <div className="absolute inset-x-0 top-0 h-px bg-accent/40 animate-scan" aria-hidden="true" />
            {/* HUD coordinates */}
            <div className="absolute top-4 left-4 font-mono text-[9px] tracking-wider text-accent/60">
              LAT 28.5355° N
              <br />
              LON 77.3910° E
            </div>
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <span className="font-mono text-[10px] tracking-wider text-white/70">CURRENTLY IN</span>
              <span className="font-display text-white text-lg">Noida, India</span>
            </div>
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-accent/60" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-accent/60" />
          </div>
        </div>
      </div>
    </section>
  );
}
