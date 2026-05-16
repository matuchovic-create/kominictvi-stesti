"use client";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#o-nas", label: "O nás" },
    { href: "#sluzby", label: "Služby" },
    { href: "#reference", label: "Reference" },
    { href: "#galerie", label: "Galerie" },
    { href: "#kontakt", label: "Kontakt" },
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
        <a href="#hero" style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: "2px" }}>
          <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.15rem", fontWeight: 400, letterSpacing: "0.2em", color: "var(--text-primary)", lineHeight: 1 }}>
            KOMINICTVÍ <span style={{ color: "var(--ember)" }}>ŠTĚSTÍ</span>
          </span>
          <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.52rem", letterSpacing: "0.4em", color: "var(--text-muted)", textTransform: "uppercase" }}>
            Praha & okolí
          </span>
        </a>

        {/* Desktop links */}
        <ul style={{ display: "flex", gap: "2.8rem", listStyle: "none", alignItems: "center" }} className="hidden md:flex">
          {links.map((l) => (
            <li key={l.href}><a href={l.href} className="nav-link">{l.label}</a></li>
          ))}
        </ul>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }} className="hidden md:flex">
          <a href="tel:+420773000000" style={{ fontFamily: "var(--font-ui)", fontSize: "0.75rem", color: "var(--text-secondary)", textDecoration: "none", letterSpacing: "0.05em", transition: "color 0.3s" }}
            onMouseOver={e => (e.target as HTMLElement).style.color = "var(--text-primary)"}
            onMouseOut={e => (e.target as HTMLElement).style.color = "var(--text-secondary)"}
          >
            +420 773 000 000
          </a>
          <a href="#kontakt" className="btn-primary" style={{ padding: "0.6rem 1.4rem", fontSize: "0.6rem" }}>
            <span>Objednat</span>
          </a>
        </div>

        {/* Mobile burger */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: "0.4rem", display: "flex", flexDirection: "column", gap: "6px" }}>
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: "block", width: 22, height: 1,
              background: "var(--text-primary)", transition: "all 0.3s",
              transform: menuOpen && i === 0 ? "translateY(7px) rotate(45deg)" : menuOpen && i === 2 ? "translateY(-7px) rotate(-45deg)" : menuOpen && i === 1 ? "scaleX(0)" : "none",
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 999,
          background: "#080808",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2rem",
        }}>
          <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "none", border: "none", color: "var(--text-primary)", fontSize: "1.2rem", cursor: "pointer" }}>✕</button>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.2rem", fontWeight: 300, color: "var(--text-primary)", textDecoration: "none", letterSpacing: "0.05em" }}
              onMouseOver={e => (e.target as HTMLElement).style.color = "var(--ember)"}
              onMouseOut={e => (e.target as HTMLElement).style.color = "var(--text-primary)"}
            >{l.label}</a>
          ))}
          <a href="tel:+420773000000" style={{ marginTop: "1rem", fontFamily: "var(--font-ui)", fontSize: "1rem", color: "var(--ember)", textDecoration: "none" }}>+420 773 000 000</a>
        </div>
      )}
    </>
  );
}
