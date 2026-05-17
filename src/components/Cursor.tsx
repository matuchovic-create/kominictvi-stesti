"use client";
import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  type: "smoke" | "ember";
  opacity: number;
  color: string;
}

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mx = useRef(0);
  const my = useRef(0);
  const rx = useRef(0);
  const ry = useRef(0);
  const particles = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const lastX = useRef(0);
  const lastY = useRef(0);

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

    const EMBER_COLORS = ["#FF8C42", "#E8650A", "#FFD166", "#FF4500", "#FFA500"];

    const spawnParticles = (x: number, y: number, speed: number) => {
      if (speed < 0.5) return;

      // Smoke particles
      const smokeCount = Math.min(Math.floor(speed * 0.6), 3);
      for (let i = 0; i < smokeCount; i++) {
        particles.current.push({
          x: x + (Math.random() - 0.5) * 6,
          y: y + (Math.random() - 0.5) * 6,
          vx: (Math.random() - 0.5) * 0.6,
          vy: -Math.random() * 1.2 - 0.4,
          life: 0,
          maxLife: 40 + Math.random() * 30,
          size: 8 + Math.random() * 14,
          type: "smoke",
          opacity: 0.18 + Math.random() * 0.12,
          color: "#888",
        });
      }

      // Ember particles
      if (Math.random() < Math.min(speed * 0.15, 0.6)) {
        const angle = Math.random() * Math.PI * 2;
        const spd = Math.random() * 3 + 1;
        particles.current.push({
          x: x + (Math.random() - 0.5) * 4,
          y: y + (Math.random() - 0.5) * 4,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd - 2,
          life: 0,
          maxLife: 20 + Math.random() * 20,
          size: 1.5 + Math.random() * 2.5,
          type: "ember",
          opacity: 1,
          color: EMBER_COLORS[Math.floor(Math.random() * EMBER_COLORS.length)],
        });
      }
    };

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - lastX.current;
      const dy = e.clientY - lastY.current;
      const speed = Math.sqrt(dx * dx + dy * dy);

      mx.current = e.clientX;
      my.current = e.clientY;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }

      spawnParticles(e.clientX, e.clientY, speed);

      lastX.current = e.clientX;
      lastY.current = e.clientY;
    };

    const animate = () => {
      // Smooth ring
      rx.current += (mx.current - rx.current) * 0.1;
      ry.current += (my.current - ry.current) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.left = `${rx.current}px`;
        ringRef.current.style.top = `${ry.current}px`;
      }

      // Draw particles
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current = particles.current.filter((p) => p.life < p.maxLife);

      for (const p of particles.current) {
        p.life++;
        const progress = p.life / p.maxLife;

        if (p.type === "smoke") {
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.98;
          p.vy *= 0.97;
          p.size += 0.4;

          const alpha = p.opacity * (1 - progress) * (progress < 0.2 ? progress / 0.2 : 1);
          ctx.beginPath();
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
          grad.addColorStop(0, `rgba(160,160,160,${alpha})`);
          grad.addColorStop(1, `rgba(80,80,80,0)`);
          ctx.fillStyle = grad;
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Ember
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.12; // gravity
          p.vx *= 0.97;

          const alpha = p.opacity * (1 - progress);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * (1 - progress * 0.5), 0, Math.PI * 2);
          ctx.fillStyle = p.color + Math.floor(alpha * 255).toString(16).padStart(2, "0");
          ctx.fill();

          // Glow
          ctx.beginPath();
          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
          glow.addColorStop(0, p.color + Math.floor(alpha * 0.6 * 255).toString(16).padStart(2, "0"));
          glow.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = glow;
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const onEnter = () => {
      cursorRef.current?.classList.add("hovered");
      ringRef.current?.classList.add("hovered");
    };
    const onLeave = () => {
      cursorRef.current?.classList.remove("hovered");
      ringRef.current?.classList.remove("hovered");
    };

    document.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(animate);

    const hoverEls = document.querySelectorAll(
      "a, button, .service-card, .why-card, .review-card, .gallery-item, .cert-badge"
    );
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 9998,
        }}
      />
      <div ref={cursorRef} className="cursor hidden md:block" />
      <div ref={ringRef} className="cursor-ring hidden md:block" />
    </>
  );
}
