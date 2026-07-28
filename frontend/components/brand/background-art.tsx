'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function BackgroundArt() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // GSAP Animation for Background Art & Canvas
  useGSAP(() => {
    // 1. Smooth Floating SVG Lines & Botanical Art
    gsap.to('.art-line', {
      y: -25,
      rotation: 2,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.4,
    });

    gsap.to('.art-aura-1', {
      x: 30,
      y: -20,
      scale: 1.1,
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    gsap.to('.art-aura-2', {
      x: -40,
      y: 30,
      scale: 1.15,
      duration: 16,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, { scope: containerRef });

  // Interactive Particle Flow Field Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Create 35 subtle ambient particles
    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.3 + 0.1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 132, 132, ${p.alpha})`; // Deep Teal tint
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden select-none">
      {/* Interactive Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40" />

      {/* Soft Petrichor Sage & Teal Aura Blur Layers */}
      <div className="art-aura-1 absolute top-[-10%] left-[-10%] w-[55vw] h-[55vw] rounded-full bg-[oklch(0.90_0.025_142)]/50 blur-[130px]" />
      <div className="art-aura-2 absolute bottom-[-10%] right-[-10%] w-[65vw] h-[65vw] rounded-full bg-[oklch(0.88_0.03_145)]/40 blur-[150px]" />
      <div className="absolute top-[35%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-[oklch(0.55_0.12_195)]/8 blur-[110px]" />

      {/* High-Fashion Botanical Line Art & Monsoon Rain Graphic */}
      <svg
        ref={svgRef}
        className="absolute top-8 right-0 w-[60vw] max-w-[900px] h-auto text-[oklch(0.58_0.14_145)] opacity-25"
        viewBox="0 0 900 1100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Rain Lines Group */}
        <g stroke="currentColor" strokeWidth="0.85" strokeDasharray="5 10" opacity="0.65" className="art-line">
          <line x1="120" y1="0" x2="60" y2="1100" />
          <line x1="280" y1="0" x2="220" y2="1100" />
          <line x1="440" y1="0" x2="380" y2="1100" />
          <line x1="600" y1="0" x2="540" y2="1100" />
          <line x1="760" y1="0" x2="700" y2="1100" />
        </g>

        {/* High-Fashion Organic Botanical Silhouette Art */}
        <g className="art-line">
          <path
            d="M 400 980 C 360 750 500 550 440 330 C 400 200 270 130 210 60"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          <path
            d="M 440 330 C 550 270 640 350 690 300 C 720 270 690 190 610 220 C 530 240 460 300 440 330 Z"
            stroke="currentColor"
            strokeWidth="1.25"
            fill="currentColor"
            fillOpacity="0.05"
          />
          <path
            d="M 460 560 C 300 510 210 590 160 540 C 130 490 180 430 270 460 C 360 490 430 530 460 560 Z"
            stroke="currentColor"
            strokeWidth="1.25"
            fill="currentColor"
            fillOpacity="0.05"
          />
          <path
            d="M 410 780 C 580 730 670 810 730 750 C 770 710 720 640 620 670 C 520 700 440 750 410 780 Z"
            stroke="currentColor"
            strokeWidth="1.25"
            fill="currentColor"
            fillOpacity="0.05"
          />
        </g>
      </svg>
    </div>
  );
}
