"use client";
import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  life: number; maxLife: number;
  size: number;
  type: "smoke" | "ember" | "trail";
  alpha: number;
  color: string;
  rotation: number;
}

export default function Cursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<HTMLDivElement>(null);
  const mx = useRef(-200);
  const my = useRef(-200);
  const particles = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const lastX = useRef(-200);
  const lastY = useRef(-200);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const EMBER = ["#FF8C42", "#E8650A", "#FFD166", "#FF4500", "#FFAA00", "#FF6B00"];

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - lastX.current;
      const dy = e.clientY - lastY.current;
      const speed = Math.sqrt(dx * dx + dy * dy);

      mx.current = e.clientX;
      my.current = e.clientY;

      // SVG cursor follows instantly
      if (svgRef.current) {
        svgRef.current.style.left = `${e.clientX}px`;
        svgRef.current.style.top = `${e.clientY}px`;
      }

      const max = 60;
      if (particles.current.length < max) {
        // Smoke from chimney tip (offset from cursor)
        for (let i = 0; i < 2; i++) {
          particles.current.push({
            x: e.clientX - 2 + (Math.random() - 0.5) * 5,
            y: e.clientY - 28 + (Math.random() - 0.5) * 3,
            vx: (Math.random() - 0.5) * 0.8,
            vy: -Math.random() * 1.2 - 0.5,
            life: 0,
            maxLife: 45 + Math.random() * 35,
            size: 4 + Math.random() * 6,
            type: "smoke",
            alpha: 0.22,
            color: "160,160,160",
            rotation: Math.random() * Math.PI * 2,
          });
        }

        // Embers
        if (speed > 4) {
          const count = Math.min(Math.floor(speed / 4), 3);
          for (let i = 0; i < count; i++) {
            const angle = -Math.PI * 0.75 + (Math.random() - 0.5) * Math.PI * 1.2;
            const spd = Math.random() * 4 + 1.5;
            particles.current.push({
              x: e.clientX + (Math.random() - 0.5) * 8,
              y: e.clientY - 20,
              vx: Math.cos(angle) * spd,
              vy: Math.sin(angle) * spd,
              life: 0,
              maxLife: 20 + Math.random() * 25,
              size: 1.8 + Math.random() * 2.5,
              type: "ember",
              alpha: 1,
              color: EMBER[Math.floor(Math.random() * EMBER.length)],
              rotation: 0,
            });
          }
        }

        // Trail glow
        if (speed > 1.5) {
          particles.current.push({
            x: e.clientX,
            y: e.clientY,
            vx: -dx * 0.02,
            vy: -dy * 0.02,
            life: 0,
            maxLife: 12,
            size: 10 + speed * 0.5,
            type: "trail",
            alpha: 0.12,
            color: "232,101,10",
            rotation: 0,
          });
        }
      }

      lastX.current = e.clientX;
      lastY.current = e.clientY;
    };

    const animate = () => {
      frameRef.current++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const alive: Particle[] = [];

      for (const p of particles.current) {
        p.life++;
        if (p.life >= p.maxLife) continue;
        alive.push(p);

        const t = p.life / p.maxLife;

        if (p.type === "trail") {
          const a = p.alpha * (1 - t);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * (1 - t), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color},${a})`;
          ctx.fill();

        } else if (p.type === "smoke") {
          p.x += p.vx + Math.sin(p.life * 0.15) * 0.3;
          p.y += p.vy;
          p.vx *= 0.99;
          p.vy *= 0.98;
          p.size += 0.5;

          const fadeIn = t < 0.15 ? t / 0.15 : 1;
          const a = p.alpha * fadeIn * (1 - t) * 0.9;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation + p.life * 0.02);
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color},${a})`;
          ctx.fill();
          ctx.restore();

        } else if (p.type === "ember") {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.18;
          p.vx *= 0.96;

          const a = (1 - t);
          const r = p.size * (1 - t * 0.3);

          // Glow halo
          ctx.beginPath();
          ctx.arc(p.x, p.y, r * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color === "#FF8C42" ? "255,140,66" : p.color === "#E8650A" ? "232,101,10" : "255,209,102"},${a * 0.2})`;
          ctx.fill();

          // Core
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fillStyle = p.color + Math.floor(a * 255).toString(16).padStart(2, "0");
          ctx.fill();

          // Bright center
          ctx.beginPath();
          ctx.arc(p.x, p.y, r * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,200,${a * 0.8})`;
          ctx.fill();
        }
      }

      particles.current = alive;
      rafRef.current = requestAnimationFrame(animate);
    };

    const onLeave = () => {
      if (svgRef.current) svgRef.current.style.opacity = "0";
    };
    const onEnter = () => {
      if (svgRef.current) svgRef.current.style.opacity = "1";
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <style>{`
        body { cursor: none !important; }
        a, button { cursor: none !important; }
        .chimney-cursor {
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: opacity 0.2s;
        }
      `}</style>
      <canvas
        ref={canvasRef}
        style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9998 }}
      />
      <div ref={svgRef} className="chimney-cursor hidden md:block">
        <svg width="32" height="44" viewBox="0 0 32 44" fill="none">
          {/* Chimney body */}
          <rect x="9" y="18" width="14" height="22" rx="1.5" fill="#1a1a1a" stroke="#E8650A" strokeWidth="1.2"/>
          {/* Brick pattern */}
          <rect x="9" y="22" width="6" height="3" rx="0.5" fill="#2a2a2a" stroke="#333" strokeWidth="0.4"/>
          <rect x="16" y="22" width="7" height="3" rx="0.5" fill="#2a2a2a" stroke="#333" strokeWidth="0.4"/>
          <rect x="9" y="27" width="7" height="3" rx="0.5" fill="#2a2a2a" stroke="#333" strokeWidth="0.4"/>
          <rect x="17" y="27" width="6" height="3" rx="0.5" fill="#2a2a2a" stroke="#333" strokeWidth="0.4"/>
          <rect x="9" y="32" width="6" height="3" rx="0.5" fill="#2a2a2a" stroke="#333" strokeWidth="0.4"/>
          <rect x="16" y="32" width="7" height="3" rx="0.5" fill="#2a2a2a" stroke="#333" strokeWidth="0.4"/>
          {/* Cap */}
          <rect x="6" y="15" width="20" height="4" rx="1" fill="#111" stroke="#E8650A" strokeWidth="1.2"/>
          {/* Opening */}
          <rect x="13" y="10" width="6" height="6" rx="0.8" fill="#0a0a0a" stroke="#E8650A" strokeWidth="1"/>
          {/* Glow inside */}
          <ellipse cx="16" cy="15" rx="5" ry="2" fill="#E8650A" opacity="0.3"/>
          {/* Ember dot */}
          <circle cx="16" cy="13" r="1.5" fill="#FF8C42" opacity="0.8"/>
        </svg>
      </div>
    </>
  );
}
