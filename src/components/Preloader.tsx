import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLCanvasElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Star canvas
    const canvas = starRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const stars: { x: number; y: number; size: number; opacity: number; delay: number }[] = [];
      const count = 80;
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.3,
          opacity: 0,
          delay: Math.random() * 1.5,
        });
      }
      let animId: number;
      let t = 0;
      function drawStars() {
        if (!ctx || !canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        t += 0.016;
        stars.forEach((s) => {
          const fadeIn = reduced ? 1 : Math.min(1, Math.max(0, (t - s.delay) / 0.5));
          const twinkle = reduced ? s.opacity : 0.5 + 0.5 * Math.sin(t * 2 + s.delay * 10);
          s.opacity = fadeIn * twinkle * 0.7;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200, 220, 255, ${s.opacity})`;
          ctx.fill();
        });
        animId = requestAnimationFrame(drawStars);
      }
      drawStars();

      return () => cancelAnimationFrame(animId);
    }
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      setDone(true);
      return;
    }

    const tl = gsap.timeline();

    // Split name into letters
    const nameEl = nameRef.current;
    const roleEl = roleRef.current;
    if (nameEl) {
      const text = nameEl.textContent ?? '';
      nameEl.innerHTML = text
        .split('')
        .map(
          (c) =>
            `<span class="inline-block" style="opacity:0;transform:translateY(100%) rotateX(-90deg);filter:blur(8px)">${c === ' ' ? '&nbsp;' : c}</span>`
        )
        .join('');
    }
    const nameLetters = nameEl?.querySelectorAll('span') ?? [];
    const roleWords = roleEl?.querySelectorAll('[data-role-word]') ?? [];

    // Phase 1: Rings expand
    if (ringRef.current && ring2Ref.current) {
      tl.fromTo(
        [ringRef.current, ring2Ref.current],
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.15 },
        0.3
      );
    }

    // Phase 2: Name letters reveal
    tl.to(
      nameLetters,
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        filter: 'blur(0px)',
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.04,
      },
      0.8
    );

    // Phase 3: Role appears
    tl.to(
      roleWords,
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.08,
      },
      '-=0.2'
    );

    // Phase 4: Counter + progress bar
    const counter = { val: 0 };
    tl.to(
      counter,
      {
        val: 100,
        duration: 1.2,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (counterRef.current) counterRef.current.textContent = String(Math.round(counter.val)).padStart(3, '0');
        },
      },
      '-=0.5'
    );

    if (barRef.current) {
      tl.to(barRef.current, { scaleX: 1, duration: 1.2, ease: 'power2.inOut' }, '<');
    }

    // Phase 5: Glow pulse
    if (glowRef.current) {
      tl.to(
        glowRef.current,
        {
          opacity: 1,
          scale: 1.5,
          duration: 0.5,
          ease: 'power2.out',
        },
        '+=0.1'
      );
    }

    // Phase 6: Fade out
    tl.to(
      [ringRef.current, ring2Ref.current, nameRef.current, roleRef.current, counterRef.current?.parentElement, glowRef.current],
      {
        opacity: 0,
        scale: 1.3,
        duration: 0.5,
        ease: 'power2.in',
        stagger: 0.03,
      },
      '+=0.15'
    );

    // Phase 7: Container wipes up
    if (containerRef.current) {
      tl.to(
        containerRef.current,
        {
          yPercent: -100,
          duration: 0.7,
          ease: 'power4.inOut',
          onComplete: () => setDone(true),
        },
        '-=0.15'
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  if (done) return null;

  const roleText = 'FULL-STACK DEVELOPER';

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#02030A' }}
    >
      {/* Star canvas */}
      <canvas ref={starRef} className="absolute inset-0" aria-hidden="true" />

      {/* Glow */}
      <div
        ref={glowRef}
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(100,255,218,0.15), transparent 70%)',
          opacity: 0,
        }}
        aria-hidden="true"
      />

      {/* Orbital rings */}
      <div
        ref={ringRef}
        className="absolute w-48 h-48 sm:w-64 sm:h-64 rounded-full border border-accent/20"
        style={{ opacity: 0, scale: 0 }}
        aria-hidden="true"
      >
        <div className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-accent -translate-x-1/2" />
      </div>
      <div
        ref={ring2Ref}
        className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-accent-2/10"
        style={{ opacity: 0, scale: 0, borderStyle: 'dashed' }}
        aria-hidden="true"
      />

      {/* Name */}
      <div className="relative z-10 flex flex-col items-center gap-5 px-5">
        <h1
          ref={nameRef}
          className="font-display font-semibold text-3xl sm:text-5xl md:text-6xl tracking-tight text-primary text-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          AMIT BADONI
        </h1>

        {/* Role */}
        <p ref={roleRef} className="font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase text-accent">
          {roleText.split(' ').map((w, i) => (
            <span key={i} data-role-word className="inline-block" style={{ opacity: 0, transform: 'translateY(15px)' }}>
              {w}
              {i < roleText.split(' ').length - 1 ? '\u00A0' : ''}
            </span>
          ))}
        </p>

        {/* Counter + bar */}
        <div className="mt-4 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] uppercase text-secondary">
            <span ref={counterRef}>000</span>
            <span className="text-accent">%</span>
          </div>
          <div className="w-44 h-px bg-border overflow-hidden">
            <div ref={barRef} className="h-full bg-accent origin-left" style={{ transform: 'scaleX(0)' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
