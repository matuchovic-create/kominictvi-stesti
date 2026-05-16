"use client";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section id="hero" style={{
      minHeight: "100svh",
      position: "relative",
      display: "flex",
      alignItems: "flex-start",
      overflow: "hidden",
      paddingTop: isMobile ? "120px" : "140px",
      paddingBottom: 0,
    }}>

      {/* Background */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/hero-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center 30%"}} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(5,5,5,0.88) 0%, rgba(5,5,5,0.55) 45%, rgba(5,5,5,0.15) 100%)", zIndex: 0 }} />

      {/* Right side decoration — desktop only */}
      {!isMobile && (
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "48%", pointerEvents: "none" }}>
          <div style={{ position: "absolute", right: "-15%", top: "50%", transform: "translateY(-50%)", width: 560, height: 560, borderRadius: "50%", border: "1px solid rgba(232,101,10,0.07)", animation: "rotateSlow 40s linear infinite" }} />
          <div style={{ position: "absolute", right: "-10%", top: "50%", transform: "translateY(-50%)", width: 420, height: 420, borderRadius: "50%", border: "1px solid rgba(232,101,10,0.1)", animation: "rotateSlow 28s linear infinite reverse" }} />
          <div style={{ position: "absolute", right: "-5%", top: "50%", transform: "translateY(-50%)", width: 300, height: 300, borderRadius: "50%", border: "1px solid rgba(232,101,10,0.14)", animation: "rotateSlow 18s linear infinite" }} />
          <div style={{ position: "absolute", right: "12%", top: "50%", transform: "translateY(-50%)", width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,101,10,0.22) 0%, rgba(232,101,10,0.06) 50%, transparent 70%)", animation: "floatY 7s ease-in-out infinite" }} />
          {/* Smoke + embers */}
          <div style={{ position: "absolute", right: "calc(8% + 76px + 4%)", top: 0, bottom: 0, width: 160 }}>
            {[
              { dur: "10s", delay: "0s", drift: "50px", size: 70, left: 30 },
              { dur: "14s", delay: "4s",  drift: "-40px", size: 110, left: 10 },
              { dur: "9s",  delay: "7s",  drift: "70px",  size: 50, left: 60 },
            ].map((p, i) => (
              <div key={i} className="smoke-particle" style={{ "--dur": p.dur, "--delay": p.delay, "--drift": p.drift, width: p.size, height: p.size, left: p.left } as React.CSSProperties} />
            ))}
            {[
              { dur: "4s", delay: "0s", drift: "30px", size: 3, left: 50 },
              { dur: "5.5s", delay: "1.5s", drift: "-25px", size: 2, left: 70 },
              { dur: "3.5s", delay: "3s", drift: "55px", size: 4, left: 35 },
            ].map((p, i) => (
              <div key={i} className="ember-particle" style={{ "--dur": p.dur, "--delay": p.delay, "--drift": p.drift, width: p.size, height: p.size, left: p.left } as React.CSSProperties} />
            ))}
          </div>
        </div>
      )}

      {/* Mobile subtle glow only */}
      {isMobile && (
        <div style={{ position: "absolute", right: "-30%", top: "20%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,101,10,0.08), transparent 70%)", pointerEvents: "none" }} />
      )}

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 2,
        padding: isMobile ? "0 1.5rem" : "0 clamp(1.5rem, 5vw, 5rem)",
        width: "100%",
        maxWidth: isMobile ? "100%" : 760,
      }}>

        {/* Eyebrow */}
        <div style={{
          display: "flex", alignItems: "center", gap: "0.8rem",
          marginBottom: isMobile ? "1.5rem" : "2.5rem",
          opacity: 0, animation: "revealUp 1s 2.5s cubic-bezier(0.16,1,0.3,1) forwards",
        }}>
          <div style={{ width: 28, height: 1, background: "var(--ember)", flexShrink: 0 }} />
          <span style={{
            fontFamily: "var(--font-ui)", fontSize: isMobile ? "0.52rem" : "0.6rem",
            letterSpacing: isMobile ? "0.3em" : "0.55em",
            color: "var(--ember)", textTransform: "uppercase",
          }}>
            {isMobile ? "Certifikovaný servis" : "Certifikovaný servis — Praha & okolí"}
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: "var(--font-cormorant)", fontWeight: 300,
          fontSize: isMobile ? "clamp(3rem, 13vw, 4.5rem)" : "clamp(3.8rem, 7.5vw, 7.5rem)",
          lineHeight: 1.0, letterSpacing: "-0.02em",
          opacity: 0, animation: "revealUp 1.2s 2.7s cubic-bezier(0.16,1,0.3,1) forwards",
        }}>
          <span style={{ display: "block", color: "var(--text-primary)" }}>Bezpečnost,</span>
          <span style={{ display: "block" }}>
            která{" "}
            <em style={{ fontStyle: "italic", background: "linear-gradient(135deg, #E8650A 0%, #FF8C42 45%, #C9A96E 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>hoří</em>
          </span>
          <span style={{ display: "block", color: "var(--text-primary)", fontWeight: 300, opacity: 0.5 }}>vášní</span>
        </h1>

        {/* Divider */}
        <div style={{
          width: 40, height: 1,
          background: "linear-gradient(90deg, var(--ember), transparent)",
          margin: isMobile ? "1.5rem 0" : "2.5rem 0",
          opacity: 0, animation: "revealUp 1s 2.9s cubic-bezier(0.16,1,0.3,1) forwards",
        }} />

        {/* Sub */}
        <p style={{
          fontFamily: "var(--font-ui)",
          fontSize: isMobile ? "0.88rem" : "0.95rem",
          lineHeight: 1.85, color: "var(--text-secondary)",
          maxWidth: isMobile ? "100%" : 460,
          fontWeight: 300,
          opacity: 0, animation: "revealUp 1s 3.1s cubic-bezier(0.16,1,0.3,1) forwards",
        }}>
          Prémiový komínový servis s přesností švýcarských hodinářů. Každý komín je pro nás dílem — čistý, bezpečný, perfektní.
        </p>

        {/* CTAs */}
        <div style={{
          display: "flex", gap: "0.8rem",
          marginTop: isMobile ? "2rem" : "3rem",
          flexDirection: isMobile ? "column" : "row",
          opacity: 0, animation: "revealUp 1s 3.3s cubic-bezier(0.16,1,0.3,1) forwards",
        }}>
          <a href="#kontakt" className="btn-primary" style={{ textAlign: "center" }}>
            <span>Objednat kontrolu</span>
          </a>
          <a href="tel:+420778098717" className="btn-ghost" style={{ textAlign: "center" }}>
            Zavolat ihned
          </a>
        </div>

        {/* Stats — mobile horizontal strip */}
        {isMobile && (
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "1px", marginTop: "2.5rem",
            background: "rgba(255,255,255,0.04)",
            opacity: 0, animation: "revealUp 1s 3.6s cubic-bezier(0.16,1,0.3,1) forwards",
          }}>
            {[
              { num: "15+", label: "let zkušeností" },
              { num: "800+", label: "spokojených klientů" },
              { num: "24/7", label: "pohotovost" },
              { num: "100%", label: "certifikováno" },
            ].map((s, i) => (
              <div key={i} style={{ padding: "1.2rem", background: "rgba(255,255,255,0.01)" }}>
                <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.6rem", fontWeight: 500, color: "var(--ember)", lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontFamily: "var(--font-ui)", fontSize: "0.58rem", letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase", marginTop: "0.3rem" }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stats bar — desktop only */}
      {!isMobile && (
        <div style={{
          position: "relative", zIndex: 2,
          borderTop: "1px solid rgba(232,101,10,0.3)", background: "rgba(5,5,5,0.95)", backdropFilter: "blur(10px)",
          display: "flex",
          opacity: 0, animation: "revealUp 1s 3.6s cubic-bezier(0.16,1,0.3,1) forwards",
        }}>
          {[
            { num: "15+", label: "let zkušeností" },
            { num: "800+", label: "spokojených klientů" },
            { num: "24/7", label: "pohotovostní servis" },
            { num: "100%", label: "certifikované práce" },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, padding: "1.8rem 2rem", borderRight: i < 3 ? "1px solid rgba(232,101,10,0.2)" : "none", display: "flex", alignItems: "center", gap: "1.4rem", background: i % 2 === 0 ? "rgba(232,101,10,0.06)" : "transparent" }}>
              <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.8rem", fontWeight: 700, color: "#FF8C42", lineHeight: 1, flexShrink: 0, textShadow: "0 0 24px rgba(232,101,10,0.7)" }}>{s.num}</span>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.65rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.85)", textTransform: "uppercase", lineHeight: 1.4, fontWeight: 600 }}>{s.label}</span>
            </div>
          ))}
        </div>
      )}

    </section>
  );
}
