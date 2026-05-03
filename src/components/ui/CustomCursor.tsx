'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      gsap.to(dot, {
        x: mouseX - 4,
        y: mouseY - 4,
        duration: 0.08,
        ease: 'power2.out',
      });
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      gsap.set(ring, {
        x: ringX - 20,
        y: ringY - 20,
      });

      requestAnimationFrame(animate);
    };

    const onMouseEnterInteractive = () => {
      gsap.to(ring, { scale: 1.8, borderColor: '#E8C878', duration: 0.3 });
      gsap.to(dot, { scale: 0, duration: 0.2 });
    };

    const onMouseLeaveInteractive = () => {
      gsap.to(ring, { scale: 1, borderColor: '#D4A853', duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    const onMouseDown = () => {
      gsap.to(ring, { scale: 0.8, duration: 0.15 });
    };

    const onMouseUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.15 });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    const interactiveEls = document.querySelectorAll('a, button, [data-cursor]');
    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterInteractive);
      el.addEventListener('mouseleave', onMouseLeaveInteractive);
    });

    const raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#E8C878] pointer-events-none z-[9999] mix-blend-difference"
        style={{ transform: 'translate(-4px, -4px)' }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-[#D4A853] pointer-events-none z-[9998]"
        style={{
          transform: 'translate(-20px, -20px)',
          boxShadow: '0 0 10px rgba(212,168,83, 0.3)',
        }}
      />
    </>
  );
}
