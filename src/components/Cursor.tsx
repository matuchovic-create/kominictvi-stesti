"use client";
import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  life: number; maxLife: number;
  size: number;
  type: "smoke" | "ember";
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

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    const COLORS = ["#FF8C42", "#E8650A", "#FFD166", "#FF4500"];

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

      if (particles.current.length < 25 && speed > 2) {
        particles.current.push({
          x: e.clientX + (Math.random() - 0.5) * 4,
          y: e.clientY + (Math.random() - 0.5) * 4,
          vx: (Math.random() - 0.5) * 0.4,
          vy: -Math.random() * 0.7 - 0.2,
          life: 0, maxLife: 28 + Math.random() * 18,
          size: 5 + Math.random() * 7,
          type: "smoke", color: "140,140,140",
        });

        if (speed > 5 && Math.random() < 0.35) {
          const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI;
          particles.current.push({
            x: e.clientX, y: e.clientY,
            vx: Math.cos(angle) * (Math.random() * 2.5 + 0.8),
            vy: Math.sin(angle) * (Math.random() * 2 + 0.5) - 1.5,
            life: 0, maxLife: 14 + Math.random() * 14,
            size: 2 + Math.random() * 2,
            type: "ember",
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
          });
        }
      }
      lastX.current = e.clientX;
      lastY.current = e.clientY;
    };

    const animate = () => {
      rx.current += (mx.current - rx.current) * 0.1;
      ry.current += (my.current - ry.current) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.left = `${rx.current}px`;
        ringRef.current.style.top = `${ry.current}px`;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const alive: Particle[] = [];
      for (const p of particles.current) {
        p.life++;
        if (p.life >= p.maxLife) continue;
        alive.push(p);
        const t = p.life / p.maxLife;

        if (p.type === "smoke") {
          p.x += p.vx; p.y += p.vy; p.size += 0.25;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color},${0.13 * (1 - t)})`;
          ctx.fill();
        } else {
          p.x += p.vx; p.y += p.vy;
          p.vy += 0.14; p.vx *= 0.96;
          const a = Math.floor((1 - t) * 220).toString(16).padStart(2, "0");
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * (1 - t * 0.4), 0, Math.PI * 2);
          ctx.fillStyle = p.color + a;
          ctx.fill();
        }
      }
      particles.current = alive;
      rafRef.current = requestAnimationFrame(animate);
    };

    const onEnter = () => { cursorRef.current?.classList.add("hovered"); ringRef.current?.classList.add("hovered"); };
    const onLeave = () => { cursorRef.current?.classList.remove("hovered"); ringRef.current?.classList.remove("hovered"); };

    document.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(animate);
    document.querySelectorAll("a, button, .service-card, .gallery-item").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9998 }} />
      <div ref={cursorRef} className="cursor hidden md:block" />
      <div ref={ringRef} className="cursor-ring hidden md:block" />
    </>
  );
}
