"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mx = useRef(0);
  const my = useRef(0);
  const rx = useRef(0);
  const ry = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.current = e.clientX;
      my.current = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    const animate = () => {
      rx.current += (mx.current - rx.current) * 0.12;
      ry.current += (my.current - ry.current) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${rx.current}px`;
        ringRef.current.style.top = `${ry.current}px`;
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
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor hidden md:block" />
      <div ref={ringRef} className="cursor-ring hidden md:block" />
    </>
  );
}
