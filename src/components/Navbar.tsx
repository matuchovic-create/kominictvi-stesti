"use client";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      // Track active section
      const sections = ["hero","o-nas","sluzby","reference","galerie","kontakt"];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu open
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

  const mobileNavItems = [
    { href: "#hero",      label: "Domů",    icon: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" },
    { href: "#sluzby",    label: "Služby",  icon: "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" },
    { href: "#kontakt",   label: "Kontakt", icon: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.95 9.61a19.79 19.79 0 0 1-3.07-8.68A2 2 0 0 1 2.86 1h3a2 2 0 0 1 2 1.72A12 12 0 0 0 9.13 6.5a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12 12 0 0 0 2.78.65A2 2 0 0 1 22 16.92Z", isCall: true },
    { href: "#galerie",   label: "Galerie", icon: "M4 16l4.586-4.586a2 2 0 0 1 2.828 0L16 16m-2-2 1.586-1.586a2 2 0 0 1 2.828 0L20 14m-6-6h.01M6 20h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" },
    { href: "#",          label: "Menu",    icon: "M4 6h16M4 12h16M4 18h16", isMenu: true },
  ];

  return (
    <>
      {/* ─── DESKTOP NAV ─── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: scrolled ? "0.9rem clamp(1.5rem,4vw,4rem)" : "1.6rem clamp(1.5rem,4vw,4rem)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
        background: scrolled ? "rgba(8,8,8,0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
      }}>
        <a href="#hero" style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: "2px" }}>
          <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.15rem", fontWeight: 400, letterSpacing: "0.2em", color: "var(--text-primary)", lineHeight: 1 }}>
            KOMINICTVÍ <span style={{ color: "var(--ember)" }}>ŠTĚSTÍ</span>
          </span>
          <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.52rem", letterSpacing: "0.4em", color: "var(--text-muted)", textTransform: "uppercase" }}>
            Tomáš Baran
          </span>
        </a>

        {/* Desktop links */}
        <ul style={{ display: "flex", gap: "2.8rem", listStyle: "none", alignItems: "center" }} className="hidden md:flex">
          {links.map(l => (
            <li key={l.href}><a href={l.href} className="nav-link">{l.label}</a></li>
          ))}
        </ul>

        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }} className="hidden md:flex">
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

        {/* Mobile top bar — logo only, no hamburger (bottom nav handles it) */}
        <a href="tel:+420778098717"
          className="md:hidden"
          style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            background: "var(--ember)", color: "#fff",
            padding: "0.55rem 1rem",
            fontFamily: "var(--font-ui)", fontSize: "0.65rem",
            letterSpacing: "0.1em", textDecoration: "none",
            borderRadius: "2px",
          }}
        >
          <svg viewBox="0 0 24 24" style={{ width: 13, height: 13, stroke: "#fff", fill: "none", strokeWidth: 2 }}>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.95 9.61a19.79 19.79 0 0 1-3.07-8.68A2 2 0 0 1 2.86 1h3a2 2 0 0 1 2 1.72A12 12 0 0 0 9.13 6.5a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12 12 0 0 0 2.78.65A2 2 0 0 1 22 16.92Z"/>
          </svg>
          Zavolat
        </a>
      </nav>

      {/* ─── MOBILE BOTTOM NAV ─── */}
      <div
        className="md:hidden"
        style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1000,
          background: "rgba(8,8,8,0.97)",
          backdropFilter: "blur(24px)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        {mobileNavItems.map((item, i) => {
          const sectionId = item.href.replace("#", "");
          const isActive = activeSection === sectionId || (item.isMenu && menuOpen);
          return (
            <button
              key={i}
              onClick={() => {
                if (item.isMenu) {
                  setMenuOpen(m => !m);
                } else if (item.isCall) {
                  window.location.href = item.href;
                } else {
                  setMenuOpen(false);
                  const el = document.querySelector(item.href);
                  el?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              style={{
                flex: 1, display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                gap: "4px", padding: "0.65rem 0.25rem",
                background: "none", border: "none", cursor: "pointer",
                color: isActive ? "var(--ember)" : "var(--text-muted)",
                transition: "color 0.2s",
                position: "relative",
              }}
            >
              {/* Active indicator */}
              {isActive && (
                <div style={{
                  position: "absolute", top: 0, left: "50%",
                  transform: "translateX(-50%)",
                  width: 24, height: 1,
                  background: "var(--ember)",
                  boxShadow: "0 0 6px var(--ember)",
                }} />
              )}
              {/* Call button special styling */}
              {item.isCall ? (
                <div style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: "var(--ember)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginTop: "-18px",
                  boxShadow: "0 0 20px rgba(232,101,10,0.5)",
                  border: "2px solid rgba(8,8,8,0.8)",
                }}>
                  <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, stroke: "#fff", fill: "none", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }}>
                    <path d={item.icon} />
                  </svg>
                </div>
              ) : (
                <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, stroke: "currentColor", fill: "none", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" }}>
                  <path d={item.icon} />
                </svg>
              )}
              <span style={{
                fontFamily: "var(--font-ui)", fontSize: "0.55rem",
                letterSpacing: "0.05em",
                marginTop: item.isCall ? "6px" : "0",
              }}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* ─── MOBILE FULLSCREEN MENU ─── */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 999,
        background: "#080808",
        display: "flex", flexDirection: "column",
        opacity: menuOpen ? 1 : 0,
        visibility: menuOpen ? "visible" : "hidden",
        transition: "opacity 0.35s cubic-bezier(0.16,1,0.3,1), visibility 0.35s",
        pointerEvents: menuOpen ? "auto" : "none",
      }}>
        {/* Header */}
        <div style={{
          padding: "1.2rem 1.5rem",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div>
            <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.1rem", fontWeight: 400, letterSpacing: "0.2em", color: "var(--text-primary)" }}>
              KOMINICTVÍ <span style={{ color: "var(--ember)" }}>ŠTĚSTÍ</span>
            </div>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: "0.5rem", letterSpacing: "0.4em", color: "var(--text-muted)", textTransform: "uppercase", marginTop: "2px" }}>
              Tomáš Baran
            </div>
          </div>
          <button onClick={() => setMenuOpen(false)} style={{ background: "none", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-primary)", padding: "0.5rem 0.8rem", cursor: "pointer", fontFamily: "var(--font-ui)", fontSize: "0.65rem", letterSpacing: "0.1em" }}>
            Zavřít ✕
          </button>
        </div>

        {/* Nav links */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "2rem 1.5rem" }}>
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(2rem, 8vw, 3rem)",
                fontWeight: 300,
                color: activeSection === l.href.replace("#","") ? "var(--ember)" : "var(--text-primary)",
                textDecoration: "none",
                letterSpacing: "0.04em",
                padding: "0.8rem 0",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateX(0)" : "translateX(-20px)",
                transition: `opacity 0.4s ${0.05 * i}s ease, transform 0.4s ${0.05 * i}s cubic-bezier(0.16,1,0.3,1), color 0.3s`,
              }}
            >
              {l.label}
              <span style={{ fontSize: "1rem", color: "var(--ember)", opacity: 0.5 }}>→</span>
            </a>
          ))}
        </div>

        {/* Bottom contact info */}
        <div style={{
          padding: "1.5rem",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom) + 60px)",
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            <a href="tel:+420778098717" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.5rem", fontWeight: 400, color: "var(--ember)", textDecoration: "none", letterSpacing: "0.05em" }}>
              +420 778 098 717
            </a>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.65rem", color: "var(--text-muted)", letterSpacing: "0.15em" }}>
              Mladá Boleslav — Středočeský & Liberecký kraj
            </span>
          </div>
          <a href="#kontakt" onClick={() => setMenuOpen(false)} className="btn-primary" style={{ display: "inline-block", marginTop: "1.5rem", width: "100%", textAlign: "center" }}>
            <span>Objednat kontrolu →</span>
          </a>
        </div>
      </div>

      {/* Bottom nav spacer — prevents content going behind bottom nav on mobile */}
      <div className="md:hidden" style={{ height: "calc(60px + env(safe-area-inset-bottom))" }} id="bottom-nav-spacer" />
    </>
  );
}
