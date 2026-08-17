import { useEffect, useRef } from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { gsap } from 'gsap';
import { projects, personal } from '@/lib/data';
import { SectionHeading } from './SectionHeading';
import { OrbitalRing } from './Animations';

export function Projects() {
  return (
    <section id="projects" className="relative py-28 sm:py-36 border-t border-base bg-surface/30 overflow-hidden">
      {/* Decorative planet glow */}
      <div className="absolute top-40 right-[5%] w-[300px] h-[300px] rounded-full bg-accent-2/5 blur-[100px] pointer-events-none" aria-hidden="true" />
      <OrbitalRing className="top-40 right-[15%]" size={250} opacity={0.05} />

      <div className="mx-auto max-w-content px-5 sm:px-8 relative z-10">
        <SectionHeading eyebrow="Selected work" title="Things I've built." number="04" />

        <div className="flex flex-col gap-24 sm:gap-32">
          {projects.map((project, index) => {
            const isReversed = index % 2 === 1;
            return (
              <ProjectCard key={project.name} project={project} index={index} isReversed={isReversed} />
            );
          })}
        </div>

        <div data-reveal className="opacity-0 mt-16 flex justify-center">
          <a href={personal.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-secondary hover:text-accent transition-colors link-underline">
            See more on GitHub <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: (typeof projects)[number];
  index: number;
  isReversed: boolean;
}

function ProjectCard({ project, index, isReversed }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const xTo = gsap.quickTo(card, 'rotationY', { duration: 0.4, ease: 'power3' });
    const yTo = gsap.quickTo(card, 'rotationX', { duration: 0.4, ease: 'power3' });

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const px = cx / rect.width - 0.5;
      const py = cy / rect.height - 0.5;
      xTo(px * 6);
      yTo(-py * 6);
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);

    return () => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <article
      ref={cardRef}
      data-project-card
      className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${isReversed ? 'lg:[direction:rtl]' : ''}`}
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      {/* Image side */}
      <div className={`relative aspect-[16/11] overflow-hidden bg-surface group [direction:ltr]`} style={{ transformStyle: 'preserve-3d' }}>
        <img
          data-project-img
          src={project.image}
          alt={`${project.name} project preview`}
          className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-overlay/30 group-hover:bg-transparent transition-colors duration-500" />
        {/* Star particles */}
        <div className="absolute top-8 right-12 w-1 h-1 rounded-full bg-accent/50 animate-twinkle" aria-hidden="true" />
        <div className="absolute bottom-12 left-8 w-1 h-1 rounded-full bg-accent/40 animate-twinkle" style={{ animationDelay: '1.5s' }} aria-hidden="true" />
        <div className="absolute top-1/3 left-1/4 w-0.5 h-0.5 rounded-full bg-white/30 animate-twinkle" style={{ animationDelay: '0.8s' }} aria-hidden="true" />
        <div className="absolute top-5 left-5 font-display text-6xl sm:text-7xl font-semibold text-white/20 leading-none">
          0{index + 1}
        </div>
        <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ArrowUpRight size={18} />
        </div>
        {/* Corner accents */}
        <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-accent/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-accent/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content side */}
      <div className="[direction:ltr]" style={{ transformStyle: 'preserve-3d' }}>
        <p className="font-mono text-[10px] tracking-widest text-accent uppercase">{project.subtitle}</p>
        <h3 className="mt-3 font-display text-3xl sm:text-4xl font-semibold leading-tight">{project.name}</h3>

        <ul className="mt-6 space-y-3">
          {project.points.map((point) => (
            <li key={point} className="flex gap-3 text-sm leading-relaxed text-secondary">
              <span className="text-accent mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
              {point}
            </li>
          ))}
        </ul>

        <div className="mt-7 pt-5 border-t border-base flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span key={tech} className="font-mono text-[10px] text-secondary border border-base px-2.5 py-1 rounded-full group-hover:border-accent/30 transition-colors duration-300">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
