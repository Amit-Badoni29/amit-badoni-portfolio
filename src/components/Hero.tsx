import { useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight, Github, Linkedin } from 'lucide-react';
import { gsap } from 'gsap';
import { personal } from '@/lib/data';
import { HeroPlanet } from './HeroPlanet';
import { OrbitalRing } from './Animations';

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 2.8 });
      tl.fromTo('[data-hero-label]', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
        .fromTo('[data-hero-title]', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.4')
        .fromTo('[data-hero-copy]', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
        .fromTo('[data-hero-actions]', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
        .fromTo('[data-hero-side]', { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5');
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} id="top" className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden">
      {/* 3D Planet — positioned behind content, right side */}
      <HeroPlanet className="top-1/2 right-0 -translate-y-1/2 translate-x-[20%] w-[600px] h-[600px] sm:w-[700px] sm:h-[700px] lg:w-[800px] lg:h-[800px] opacity-90 hidden sm:block" />

      {/* Decorative orbital rings */}
      <OrbitalRing className="top-1/2 right-[10%] -translate-y-1/2" size={500} rotation={15} opacity={0.08} />
      <OrbitalRing className="top-1/2 right-[5%] -translate-y-1/2" size={700} rotation={-10} opacity={0.05} reverse />

      {/* Ambient glow */}
      <div className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-content px-5 sm:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-[1fr_300px] gap-12 lg:gap-24 items-end">
          <div>
            <div data-hero-label className="opacity-0 flex items-center gap-3 mb-8">
              <span className="w-8 h-px bg-accent" />
              <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-accent">{personal.title}</span>
            </div>
            <h1 data-hero-title className="opacity-0 font-display font-semibold text-[clamp(3.4rem,8vw,7.8rem)] leading-[0.93] tracking-[-0.065em] max-w-5xl">
              Building digital<br />
              <span className="text-secondary">experiences that</span><br />
              <span className="gradient-text">scale.</span>
            </h1>
            <p data-hero-copy className="opacity-0 mt-9 max-w-xl text-base leading-relaxed text-secondary">
              {personal.summary}
            </p>
            <div data-hero-actions className="opacity-0 mt-9 flex flex-wrap items-center gap-5">
              <a href="#projects" className="group inline-flex items-center gap-3 bg-accent text-on-accent px-6 py-3.5 rounded-full font-medium text-sm hover:shadow-[0_0_30px_var(--color-primary-glow)] transition-shadow">
                View my work
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a href="#contact" className="text-sm text-secondary hover:text-accent transition-colors link-underline">Let's talk</a>
            </div>
          </div>

          <div data-hero-side className="opacity-0 hidden lg:flex flex-col items-end gap-10 pb-2">
            <div className="font-mono text-[10px] text-secondary tracking-widest rotate-90 origin-right translate-y-10">SCROLL TO EXPLORE</div>
            <div className="h-24 w-px bg-gradient-to-b from-accent/70 to-transparent" />
            <div className="flex items-center gap-3">
              <a href={personal.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-secondary hover:text-accent transition-colors"><Github size={17} strokeWidth={1.5} /></a>
              <a href={personal.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-secondary hover:text-accent transition-colors"><Linkedin size={17} strokeWidth={1.5} /></a>
            </div>
          </div>
        </div>

        <a href="#about" className="absolute hidden sm:flex bottom-[-4rem] left-5 sm:left-8 items-center gap-3 text-secondary hover:text-accent transition-colors">
          <span className="font-mono text-[10px] tracking-widest uppercase">Scroll down</span>
          <ArrowDown size={14} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
}
