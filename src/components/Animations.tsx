import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SplitTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  wordClassName?: string;
}

export function SplitTextReveal({
  text,
  className = '',
  delay = 0,
  as: Tag = 'p',
  wordClassName = '',
}: SplitTextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const words = el.querySelectorAll('[data-word]');
    if (words.length === 0) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      gsap.set(words, { opacity: 1, y: 0, rotationX: 0, filter: 'blur(0px)' });
      return;
    }

    gsap.set(words, { opacity: 0, y: 30, rotationX: -30, filter: 'blur(6px)' });
    gsap.to(words, {
      opacity: 1,
      y: 0,
      rotationX: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.06,
      delay,
      scrollTrigger: {
        trigger: el,
        start: 'top 82%',
        toggleActions: 'play none none none',
      },
    });
  }, [delay]);

  const words = text.split(' ');

  return (
    <Tag
      ref={ref as never}
      className={className}
      style={{ perspective: '400px' }}
    >
      {words.map((word, i) => (
        <span key={i} data-word className={`inline-block ${wordClassName}`}>
          {word}
          {i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Tag>
  );
}

interface CosmicLabelProps {
  children: ReactNode;
  className?: string;
}

export function CosmicLabel({ children, className = '' }: CosmicLabelProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 font-mono text-[10px] tracking-[0.22em] uppercase text-accent ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-twinkle" />
      {children}
    </span>
  );
}

interface OrbitalRingProps {
  className?: string;
  size?: number;
  rotation?: number;
  opacity?: number;
  reverse?: boolean;
}

export function OrbitalRing({
  className = '',
  size = 300,
  rotation = 0,
  opacity = 0.1,
  reverse = false,
}: OrbitalRingProps) {
  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        opacity,
        transform: `rotate(${rotation}deg)`,
      }}
      aria-hidden="true"
    >
      <div
        className={`w-full h-full rounded-full border border-accent ${reverse ? 'animate-orbit-reverse' : 'animate-orbit'}`}
        style={{ borderStyle: 'dashed', borderWidth: '0.5px' }}
      />
    </div>
  );
}
