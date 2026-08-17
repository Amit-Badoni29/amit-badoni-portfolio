import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

function isMobile() {
  return typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nebulaRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = prefersReducedMotion();
    const mobile = isMobile();

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = width + 'px';
      canvas!.style.height = height + 'px';
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    const farStarCount = mobile ? 120 : 250;
    const midStarCount = mobile ? 60 : 120;
    const particleCount = mobile ? 20 : 50;

    const farStars: Star[] = [];
    const midStars: Star[] = [];
    const particles: Particle[] = [];

    for (let i = 0; i < farStarCount; i++) {
      farStars.push({
        x: Math.random() * width,
        y: Math.random() * height * 3,
        z: 0.3,
        size: Math.random() * 0.8 + 0.3,
        opacity: Math.random() * 0.4 + 0.1,
        twinkleSpeed: Math.random() * 0.002 + 0.0005,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }
    for (let i = 0; i < midStarCount; i++) {
      midStars.push({
        x: Math.random() * width,
        y: Math.random() * height * 3,
        z: 0.6,
        size: Math.random() * 1.2 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        twinkleSpeed: Math.random() * 0.003 + 0.001,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.1,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let scrollOffset = 0;
    let time = 0;
    let animationId: number;
    let isVisible = true;
    let cleanupMouse: (() => void) | undefined;

    if (!reduced) {
      const onMouseMove = (e: MouseEvent) => {
        targetMouseX = (e.clientX / width - 0.5) * 2;
        targetMouseY = (e.clientY / height - 0.5) * 2;
      };
      window.addEventListener('mousemove', onMouseMove);

      const onScroll = () => {
        scrollOffset = window.scrollY;
      };
      window.addEventListener('scroll', onScroll, { passive: true });

      const onVisibility = () => {
        isVisible = !document.hidden;
      };
      document.addEventListener('visibilitychange', onVisibility);

      cleanupMouse = () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('scroll', onScroll);
        document.removeEventListener('visibilitychange', onVisibility);
      };
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);

      if (!isVisible) {
        animationId = requestAnimationFrame(draw);
        return;
      }

      time += reduced ? 0 : 0.016;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const scrollParallax = scrollOffset * 0.3;

      // Far stars
      for (const star of farStars) {
        const twinkle = reduced ? star.opacity : star.opacity * (0.6 + 0.4 * Math.sin(time * star.twinkleSpeed * 60 + star.twinkleOffset));
        const px = star.x + mouseX * 8 * star.z;
        const py = ((star.y - scrollParallax * star.z) % (height * 3) + height * 3) % (height * 3);
        const drawY = py - scrollOffset * 0.1;
        if (drawY > -10 && drawY < height + 10) {
          ctx!.beginPath();
          ctx!.arc(px, drawY, star.size, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(200, 220, 255, ${twinkle})`;
          ctx!.fill();
        }
      }

      // Mid stars
      for (const star of midStars) {
        const twinkle = reduced ? star.opacity : star.opacity * (0.5 + 0.5 * Math.sin(time * star.twinkleSpeed * 60 + star.twinkleOffset));
        const px = star.x + mouseX * 15 * star.z;
        const py = ((star.y - scrollParallax * star.z * 1.5) % (height * 3) + height * 3) % (height * 3);
        const drawY = py - scrollOffset * 0.15;
        if (drawY > -10 && drawY < height + 10) {
          ctx!.beginPath();
          ctx!.arc(px, drawY, star.size, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(180, 210, 255, ${twinkle})`;
          ctx!.fill();
          if (star.size > 1) {
            ctx!.beginPath();
            ctx!.arc(px, drawY, star.size * 2.5, 0, Math.PI * 2);
            ctx!.fillStyle = `rgba(100, 200, 255, ${twinkle * 0.08})`;
            ctx!.fill();
          }
        }
      }

      // Foreground particles
      if (!reduced) {
        for (const p of particles) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          const px = p.x + mouseX * 25;
          const py = p.y - scrollOffset * 0.2;
          const drawY = ((py % height) + height) % height;
          ctx!.beginPath();
          ctx!.arc(px, drawY, p.size, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(100, 255, 218, ${p.opacity})`;
          ctx!.fill();
        }
      }

      animationId = requestAnimationFrame(draw);
    }
    draw();

    // Nebula parallax via GSAP
    let nebulaTween: gsap.core.Tween | undefined;
    if (!reduced && nebulaRef.current) {
      nebulaTween = gsap.to(nebulaRef.current, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });
    }

    const onResize = () => {
      resize();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
      if (cleanupMouse) cleanupMouse();
      if (nebulaTween) nebulaTween.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Deep space gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, #0B1022 0%, #070B1A 35%, #050816 70%, #02030A 100%)',
        }}
      />

      {/* Nebula clouds */}
      <div ref={nebulaRef} className="absolute inset-0">
        <div
          className="absolute top-[10%] left-[5%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.12] animate-nebula-drift"
          style={{ background: 'radial-gradient(circle, #4338CA, transparent 70%)' }}
        />
        <div
          className="absolute top-[40%] right-[0%] w-[500px] h-[500px] rounded-full blur-[100px] opacity-[0.08] animate-nebula-drift"
          style={{ background: 'radial-gradient(circle, #7C3AED, transparent 70%)', animationDelay: '-10s' }}
        />
        <div
          className="absolute bottom-[5%] left-[30%] w-[550px] h-[550px] rounded-full blur-[110px] opacity-[0.07] animate-nebula-drift"
          style={{ background: 'radial-gradient(circle, #0EA5E9, transparent 70%)', animationDelay: '-20s' }}
        />
        <div
          className="absolute top-[60%] left-[10%] w-[400px] h-[400px] rounded-full blur-[90px] opacity-[0.05] animate-nebula-drift"
          style={{ background: 'radial-gradient(circle, #06B6D4, transparent 70%)', animationDelay: '-5s' }}
        />
      </div>

      {/* Canvas star field + particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
