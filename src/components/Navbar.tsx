"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
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
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? "1rem 3rem" : "1.5rem 3rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        transition: "all 0.4s ease",
        background: scrolled ? "rgba(10,10,10,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(232,101,10,0.1)"
          : "1px solid transparent",
      }}
    >
      <Link
        href="#hero"
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "1.4rem",
          fontWeight: 300,
          letterSpacing: "0.15em",
          color: "#f5f0eb",
          textDecoration: "none",
        }}
      >
        KOMINICTVÍ <span style={{ color: "#E8650A" }}>ŠTĚSTÍ</span>
      </Link>

      {/* Desktop links */}
      <ul
        style={{
          display: "flex",
          gap: "2.5rem",
          listStyle: "none",
        }}
        className="hidden md:flex"
      >
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} className="nav-link">
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <a
        href="tel:+420773000000"
        className="hidden md:inline-block"
        style={{
          background: "#E8650A",
          color: "#f5f0eb",
          border: "none",
          padding: "0.6rem 1.5rem",
          fontFamily: "var(--font-syne), sans-serif",
          fontSize: "0.65rem",
          letterSpacing: "0.25em",
          textTransform: "uppercase" as const,
          cursor: "pointer",
          transition: "all 0.3s",
          textDecoration: "none",
        }}
        onMouseOver={(e) =>
          ((e.target as HTMLElement).style.background = "#FF8C42")
        }
        onMouseOut={(e) =>
          ((e.target as HTMLElement).style.background = "#E8650A")
        }
      >
        Zavolat ihned
      </a>

      {/* Mobile hamburger */}
      <button
        className="md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "0.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              display: "block",
              width: 24,
              height: 1,
              background: "#f5f0eb",
              transition: "all 0.3s",
              transform:
                menuOpen && i === 0
                  ? "translateY(6px) rotate(45deg)"
                  : menuOpen && i === 2
                  ? "translateY(-6px) rotate(-45deg)"
                  : menuOpen && i === 1
                  ? "scaleX(0)"
                  : "none",
            }}
          />
        ))}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "#0a0a0a",
            zIndex: 999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2.5rem",
          }}
        >
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              background: "none",
              border: "none",
              color: "#f5f0eb",
              fontSize: "1.5rem",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "2rem",
                fontWeight: 300,
                color: "#f5f0eb",
                textDecoration: "none",
                letterSpacing: "0.1em",
                transition: "color 0.3s",
              }}
              onMouseOver={(e) =>
                ((e.target as HTMLElement).style.color = "#E8650A")
              }
              onMouseOut={(e) =>
                ((e.target as HTMLElement).style.color = "#f5f0eb")
              }
            >
              {l.label}
            </a>
          ))}
          <a
            href="tel:+420773000000"
            style={{
              background: "#E8650A",
              color: "#f5f0eb",
              padding: "1rem 2rem",
              fontFamily: "var(--font-syne), sans-serif",
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase" as const,
              textDecoration: "none",
              marginTop: "1rem",
            }}
          >
            Zavolat ihned
          </a>
        </div>
      )}
    </nav>
  );
}
