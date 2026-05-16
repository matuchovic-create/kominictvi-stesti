"use client";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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
        padding: scrolled ? "0.9rem 1.5rem" : "1.4rem 1.5rem",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
        background: scrolled ? "rgba(8,8,8,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
      }}>

        {/* Logo */}
        <a href="#hero" style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: "2px", zIndex: 1001 }}>
          <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.1rem", fontWeight: 400, letterSpacing: "0.2em", color: "var(--text-primary)", lineHeight: 1 }}>
            KOMINICTVÍ <span style={{ color: "var(--ember)" }}>ŠTĚSTÍ</span><svg width="18" height="18" viewBox="0 0 80 80" style={{ display: "inline-block", verticalAlign: "middle", marginLeft: "5px" }}><defs><radialGradient id="nl1" cx="35%" cy="35%" r="75%"><stop offset="0%" stopColor="#bbf7d0"/><stop offset="35%" stopColor="#4ade80"/><stop offset="70%" stopColor="#16a34a"/><stop offset="100%" stopColor="#14532d"/></radialGradient><radialGradient id="nl2" cx="65%" cy="35%" r="75%"><stop offset="0%" stopColor="#86efac"/><stop offset="35%" stopColor="#22c55e"/><stop offset="70%" stopColor="#15803d"/><stop offset="100%" stopColor="#14532d"/></radialGradient><radialGradient id="nl3" cx="35%" cy="65%" r="75%"><stop offset="0%" stopColor="#86efac"/><stop offset="35%" stopColor="#22c55e"/><stop offset="70%" stopColor="#166534"/><stop offset="100%" stopColor="#052e16"/></radialGradient><radialGradient id="nl4" cx="65%" cy="65%" r="75%"><stop offset="0%" stopColor="#bbf7d0"/><stop offset="35%" stopColor="#4ade80"/><stop offset="70%" stopColor="#16a34a"/><stop offset="100%" stopColor="#052e16"/></radialGradient><radialGradient id="nc" cx="35%" cy="35%" r="80%"><stop offset="0%" stopColor="#86efac"/><stop offset="100%" stopColor="#14532d"/></radialGradient></defs><style>{"@keyframes nb{0%,100%{transform:rotate(-2deg) scale(1)}50%{transform:rotate(2deg) scale(1.04)}}"}</style><g style={{transformOrigin:"40px 40px",animation:"nb 4.5s ease-in-out infinite"}}><g transform="translate(40,40) rotate(-45)"><path d="M0,0 C1,-2 2,-12 0,-16 C-3,-20 -10,-19 -14,-15 C-17,-12 -16,-6 -12,-3 C-9,-1 3,2 0,0 Z" fill="url(#nl1)"/><path d="M0,0 C-2,-3 -7,-9 -11,-13" stroke="#166534" strokeWidth="0.4" fill="none" opacity="0.6"/></g><g transform="translate(40,40) rotate(45)"><path d="M0,0 C1,-2 2,-12 0,-16 C-3,-20 -10,-19 -14,-15 C-17,-12 -16,-6 -12,-3 C-9,-1 3,2 0,0 Z" fill="url(#nl2)"/><path d="M0,0 C-2,-3 -7,-9 -11,-13" stroke="#166534" strokeWidth="0.4" fill="none" opacity="0.6"/></g><g transform="translate(40,40) rotate(-135)"><path d="M0,0 C1,-2 2,-12 0,-16 C-3,-20 -10,-19 -14,-15 C-17,-12 -16,-6 -12,-3 C-9,-1 3,2 0,0 Z" fill="url(#nl3)"/><path d="M0,0 C-2,-3 -7,-9 -11,-13" stroke="#166534" strokeWidth="0.4" fill="none" opacity="0.6"/></g><g transform="translate(40,40) rotate(135)"><path d="M0,0 C1,-2 2,-12 0,-16 C-3,-20 -10,-19 -14,-15 C-17,-12 -16,-6 -12,-3 C-9,-1 3,2 0,0 Z" fill="url(#nl4)"/><path d="M0,0 C-2,-3 -7,-9 -11,-13" stroke="#166534" strokeWidth="0.4" fill="none" opacity="0.6"/></g><circle cx="40" cy="40" r="4" fill="#052e16"/><circle cx="40" cy="40" r="2.5" fill="url(#nc)"/><circle cx="39" cy="39" r="1" fill="#bbf7d0" opacity="0.9"/></g></svg> <svg width="16" height="16" viewBox="0 0 24 24" style={{ display: "inline-block", verticalAlign: "middle", marginLeft: "4px" }}><g transform="translate(12,12)"><circle cx="0" cy="-5" r="5" fill="#2d8a2d"/><circle cx="5" cy="0" r="5" fill="#2d8a2d"/><circle cx="-5" cy="0" r="5" fill="#2d8a2d"/><circle cx="0" cy="5" r="5" fill="#2d8a2d"/><circle cx="0" cy="0" r="3" fill="#38a838"/><circle cx="-1" cy="-6" r="2" fill="#3cb83c" opacity="0.5"/><circle cx="6" cy="-1" r="2" fill="#3cb83c" opacity="0.5"/><circle cx="-6" cy="1" r="2" fill="#3cb83c" opacity="0.5"/><circle cx="0" cy="6" r="2" fill="#3cb83c" opacity="0.5"/></g></svg>
          </span>
          <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.5rem", letterSpacing: "0.4em", color: "var(--text-muted)", textTransform: "uppercase" }}>
            Tomáš Baran
          </span>
        </a>

        {/* Desktop links — hidden on mobile */}
        {!isMobile && (
          <ul style={{ display: "flex", gap: "2.8rem", listStyle: "none", alignItems: "center" }}>
            {links.map(l => (
              <li key={l.href}><a href={l.href} className="nav-link">{l.label}</a></li>
            ))}
          </ul>
        )}

        {/* Desktop CTA — hidden on mobile */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          </div>
        )}

        {/* Hamburger — mobile only */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(m => !m)}
            aria-label="Menu"
            style={{
              background: "none", border: "none", cursor: "pointer",
              padding: "0.5rem", zIndex: 1001,
              display: "flex", flexDirection: "column", justifyContent: "center",
              gap: "6px", width: 40, height: 40,
            }}
          >
            <span style={{
              display: "block", width: 26, height: 1.5,
              background: menuOpen ? "var(--ember)" : "var(--text-primary)",
              transformOrigin: "center",
              transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), background 0.3s",
              transform: menuOpen ? "translateY(7.5px) rotate(45deg)" : "none",
            }} />
            <span style={{
              display: "block", width: 26, height: 1.5,
              background: "var(--text-primary)",
              transition: "opacity 0.25s, transform 0.35s",
              opacity: menuOpen ? 0 : 1,
              transform: menuOpen ? "scaleX(0)" : "none",
            }} />
            <span style={{
              display: "block", width: 26, height: 1.5,
              background: menuOpen ? "var(--ember)" : "var(--text-primary)",
              transformOrigin: "center",
              transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), background 0.3s",
              transform: menuOpen ? "translateY(-7.5px) rotate(-45deg)" : "none",
            }} />
          </button>
        )}
      </nav>

      {/* Fullscreen mobile menu */}
      {isMobile && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 998,
          background: "#080808",
          display: "flex", flexDirection: "column",
          opacity: menuOpen ? 1 : 0,
          visibility: menuOpen ? "visible" : "hidden",
          transition: "opacity 0.4s cubic-bezier(0.16,1,0.3,1), visibility 0.4s",
        }}>
          {/* Ember top line */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(232,101,10,0.6), transparent)" }} />
          {/* Ambient glow */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(232,101,10,0.08) 0%, transparent 70%)" }} />

          {/* Nav links */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "5rem 2rem 2rem" }}>
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(2rem, 10vw, 3.2rem)",
                  fontWeight: 300,
                  color: "var(--text-primary)",
                  textDecoration: "none",
                  letterSpacing: "0.03em",
                  lineHeight: 1.2,
                  padding: "0.8rem 0",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateX(0)" : "translateX(-20px)",
                  transition: `opacity 0.4s ${0.07 * i + 0.1}s ease, transform 0.4s ${0.07 * i + 0.1}s cubic-bezier(0.16,1,0.3,1)`,
                }}
              >
                <span>{l.label}</span>
                <span style={{ fontSize: "1.1rem", color: "var(--ember)", opacity: 0.7 }}>→</span>
              </a>
            ))}
          </div>

          {/* Bottom contact */}
          <div style={{
            padding: "1.5rem 2rem",
            paddingBottom: "calc(2rem + env(safe-area-inset-bottom))",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.45s 0.38s ease, transform 0.45s 0.38s cubic-bezier(0.16,1,0.3,1)",
          }}>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: "0.62rem", color: "var(--text-muted)", letterSpacing: "0.2em", marginBottom: "1.5rem" }}>
              Mladá Boleslav — Po–Pá 7:00–18:00
            </div>
            <a href="#kontakt" onClick={() => setMenuOpen(false)} className="btn-primary" style={{ display: "block", textAlign: "center", width: "100%" }}>
              <span>Objednat kontrolu →</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
