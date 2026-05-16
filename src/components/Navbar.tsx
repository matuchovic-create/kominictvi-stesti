"use client";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const links = [
    { href: "#o-nas",     label: "O nás" },
    { href: "#sluzby",    label: "Služby" },
    { href: "#reference", label: "Reference" },
    { href: "#galerie",   label: "Galerie" },
    { href: "#kontakt",   label: "Kontakt" },
  ];

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: scrolled ? "0.9rem clamp(1.5rem,4vw,4rem)" : "1.6rem clamp(1.5rem,4vw,4rem)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
        background: scrolled ? "rgba(8,8,8,0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
      }}>

        {/* Logo */}
        <a href="#hero" style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: "2px", zIndex: 1001 }}>
          <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.15rem", fontWeight: 400, letterSpacing: "0.2em", color: menuOpen ? "var(--text-primary)" : "var(--text-primary)", lineHeight: 1 }}>
            KOMINICTVÍ <span style={{ color: "var(--ember)" }}>ŠTĚSTÍ</span>
          </span>
          <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.52rem", letterSpacing: "0.4em", color: "var(--text-muted)", textTransform: "uppercase" }}>
            Tomáš Baran
          </span>
        </a>

        {/* Desktop CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <a href="tel:+420778098717"
            style={{ fontFamily: "var(--font-ui)", fontSize: "0.75rem", color: "var(--text-secondary)", textDecoration: "none", letterSpacing: "0.05em", transition: "color 0.3s" }}
            onMouseOver={e => (e.target as HTMLElement).style.color = "var(--text-primary)"}
            onMouseOut={e => (e.target as HTMLElement).style.color = "var(--text-secondary)"}
          >
            +420 778 098 717
          </a>
          <a href="#kontakt" className="btn-primary" style={{ padding: "0.6rem 1.4rem", fontSize: "0.6rem" }}>
            <span>Objednat</span>
          </a>
        </div>

        {/* Hamburger — 3 lines, top right, ALL screens */}
        <button
          onClick={() => setMenuOpen(m => !m)}
          aria-label="Menu"
          style={{
            background: "none", border: "none", cursor: "pointer",
            padding: "0.5rem", zIndex: 1001,
            display: "flex", flexDirection: "column", justifyContent: "center",
            gap: "5px", width: 36, height: 36,
          }}
        >
          <span style={{
            display: "block", width: 24, height: 1.5, background: "var(--text-primary)",
            transformOrigin: "center",
            transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.3s",
            transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none",
          }} />
          <span style={{
            display: "block", width: 24, height: 1.5, background: "var(--text-primary)",
            transition: "opacity 0.25s, transform 0.35s",
            opacity: menuOpen ? 0 : 1,
            transform: menuOpen ? "scaleX(0)" : "none",
          }} />
          <span style={{
            display: "block", width: 24, height: 1.5, background: "var(--text-primary)",
            transformOrigin: "center",
            transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.3s",
            transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
          }} />
        </button>
      </nav>

      {/* ─── FULLSCREEN MOBILE MENU ─── */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 998,
        background: "#080808",
        display: "flex", flexDirection: "column",
        opacity: menuOpen ? 1 : 0,
        visibility: menuOpen ? "visible" : "hidden",
        transition: "opacity 0.4s cubic-bezier(0.16,1,0.3,1), visibility 0.4s",
      }}>

        {/* Ember glow top */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 1,
          background: "linear-gradient(90deg, transparent, rgba(232,101,10,0.5), transparent)",
        }} />

        {/* Ambient */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(232,101,10,0.07) 0%, transparent 70%)",
        }} />

        {/* Nav links — centered */}
        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          justifyContent: "center",
          padding: "6rem 2rem 2rem",
        }}>
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(2.2rem, 9vw, 3.5rem)",
                fontWeight: 300,
                color: "var(--text-primary)",
                textDecoration: "none",
                letterSpacing: "0.03em",
                lineHeight: 1.2,
                padding: "0.7rem 0",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.45s ${0.06 * i + 0.1}s ease, transform 0.45s ${0.06 * i + 0.1}s cubic-bezier(0.16,1,0.3,1)`,
              }}
              onMouseOver={e => (e.currentTarget as HTMLElement).style.color = "var(--ember)"}
              onMouseOut={e => (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"}
            >
              <span>{l.label}</span>
              <span style={{ fontSize: "1.2rem", color: "var(--ember)", opacity: 0.6, fontWeight: 300 }}>→</span>
            </a>
          ))}
        </div>

        {/* Bottom — contact */}
        <div style={{
          padding: "1.5rem 2rem",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom))",
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.45s 0.35s ease, transform 0.45s 0.35s cubic-bezier(0.16,1,0.3,1)",
        }}>
          <a href="tel:+420778098717" style={{
            display: "block",
            fontFamily: "var(--font-cormorant)", fontSize: "1.6rem",
            fontWeight: 400, color: "var(--ember)", textDecoration: "none",
            letterSpacing: "0.05em", marginBottom: "0.4rem",
          }}>
            +420 778 098 717
          </a>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: "0.62rem", color: "var(--text-muted)", letterSpacing: "0.2em", marginBottom: "1.5rem" }}>
            Mladá Boleslav — Po–Pá 7:00–18:00
          </div>
          <a href="#kontakt" onClick={() => setMenuOpen(false)} className="btn-primary"
            style={{ display: "block", textAlign: "center", width: "100%" }}>
            <span>Objednat kontrolu →</span>
          </a>
        </div>
      </div>
    </>
  );
}
