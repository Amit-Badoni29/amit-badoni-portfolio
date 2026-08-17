import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const xTo = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power3' });
    const yTo = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power3' });
    const xToRing = gsap.quickTo(ring, 'x', { duration: 0.4, ease: 'power3' });
    const yToRing = gsap.quickTo(ring, 'y', { duration: 0.4, ease: 'power3' });

    const move = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);
    };

    const over = () => {
      gsap.to(ring, { scale: 1.8, borderColor: 'var(--color-primary)', duration: 0.3 });
      gsap.to(dot, { scale: 0, duration: 0.3 });
    };
    const out = () => {
      gsap.to(ring, { scale: 1, borderColor: 'var(--color-border)', duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    window.addEventListener('mousemove', move);
    const interactives = document.querySelectorAll('a, button, input, textarea, [data-cursor]');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', over);
      el.addEventListener('mouseleave', out);
    });

    return () => {
      window.removeEventListener('mousemove', move);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', over);
        el.removeEventListener('mouseleave', out);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
        style={{
          width: 36,
          height: 36,
          marginLeft: -18,
          marginTop: -18,
          borderRadius: '50%',
          border: '1.5px solid var(--color-border)',
          mixBlendMode: 'screen',
        }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
        style={{
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
          borderRadius: '50%',
          backgroundColor: 'var(--color-primary)',
          boxShadow: '0 0 12px var(--color-primary-glow)',
        }}
      />
    </>
  );
}
