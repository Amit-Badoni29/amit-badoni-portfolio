import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useReveal() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Basic fade-up reveal */
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      });

      /* Staggered children */
      gsap.utils.toArray<HTMLElement>('[data-reveal-stagger]').forEach((parent) => {
        const children = parent.querySelectorAll('[data-stagger-item]');
        gsap.fromTo(
          children,
          { opacity: 0, y: 30, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: { trigger: parent, start: 'top 80%', toggleActions: 'play none none none' },
          }
        );
      });

      /* Word-by-word stagger — splits text content into word spans */
      gsap.utils.toArray<HTMLElement>('[data-reveal-words]').forEach((el) => {
        const text = el.textContent ?? '';
        const words = text.split(' ');
        el.innerHTML = words
          .map(
            (w) =>
              `<span class="inline-block align-baseline" style="opacity:0;transform:translateY(40px) rotateX(-40deg)">${w}</span>`
          )
          .join(' ');
        const spans = el.querySelectorAll('span');
        gsap.to(spans, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.05,
          scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' },
        });
      });

      /* Slide from left */
      gsap.utils.toArray<HTMLElement>('[data-reveal-slide-left]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      });

      /* Slide from right */
      gsap.utils.toArray<HTMLElement>('[data-reveal-slide-right]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: 60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      });

      /* Expand from center — clip-path opens outward */
      gsap.utils.toArray<HTMLElement>('[data-reveal-expand]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, clipPath: 'inset(45% 45% 45% 45%)' },
          {
            opacity: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      });

      /* Line draw X */
      gsap.utils.toArray<HTMLElement>('[data-line-draw-x]').forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
          }
        );
      });

      /* Line draw Y — scrubbed with scroll */
      gsap.utils.toArray<HTMLElement>('[data-line-draw-y]').forEach((el) => {
        const parent = el.closest('[data-timeline]');
        gsap.fromTo(
          el,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: parent ?? el, start: 'top 70%', end: 'bottom 60%', scrub: 0.8 },
          }
        );
      });

      /* About — image clip reveal with inner image zoom */
      gsap.utils.toArray<HTMLElement>('[data-img-reveal]').forEach((el) => {
        const img = el.querySelector('img');
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none none' },
        });
        tl.fromTo(el, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.3, ease: 'power4.inOut' });
        if (img) tl.fromTo(img, { scale: 1.3 }, { scale: 1, duration: 1.3, ease: 'power3.out' }, 0);
      });

      /* Experience — horizontal pin scroll */
      gsap.utils.toArray<HTMLElement>('[data-pin-scroll]').forEach((section) => {
        const track = section.querySelector('[data-pin-track]');
        const bar = section.querySelector('[data-pin-bar]');
        if (!track) return;

        const getScrollAmount = () => track.scrollWidth - window.innerWidth;

        const tween = gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${getScrollAmount()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        if (bar) {
          gsap.to(bar, {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: () => `+=${getScrollAmount()}`,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
        }

        return () => {
          tween.kill();
        };
      });

      /* Projects — sticky scroll image parallax */
      gsap.utils.toArray<HTMLElement>('[data-project-img]').forEach((img) => {
        gsap.fromTo(
          img,
          { y: -40 },
          {
            y: 40,
            ease: 'none',
            scrollTrigger: {
              trigger: img,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      });

      /* Projects — card reveal with stagger and blur */
      gsap.utils.toArray<HTMLElement>('[data-project-card]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 80, filter: 'blur(8px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);
}
