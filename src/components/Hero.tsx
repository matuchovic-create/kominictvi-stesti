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
      alignItems: "center",
      overflow: "hidden",
      paddingTop: "80px",
      paddingBottom: isMobile ? "2rem" : "140px",
    }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/hero-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center 30%" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(5,5,5,0.88) 0%, rgba(5,5,5,0.65) 45%, rgba(5,5,5,0.2) 100%)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(0deg, #080808 0%, transparent 100%)", pointerEvents: "none" }} />

      <div style={{
        position: "relative", zIndex: 2,
        padding: isMobile ? "0 1.5rem" : "0 clamp(1.5rem, 5vw, 5rem)",
        width: "100%",
        maxWidth: isMobile ? "100%" : 760,
      }}>
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
            {isMobile ? "Certifikovaný servis" : "Certifikovaný servis — Praha, Liberec & okolí"}
          </span>
        </div>

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

        <div style={{
          width: 40, height: 1,
          background: "linear-gradient(90deg, var(--ember), transparent)",
          margin: isMobile ? "1.5rem 0" : "2.5rem 0",
          opacity: 0, animation: "revealUp 1s 2.9s cubic-bezier(0.16,1,0.3,1) forwards",
        }} />

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
      </div>

      {!isMobile && (
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 2,
          borderTop: "1px solid rgba(232,101,10,0.3)",
          background: "linear-gradient(0deg, rgba(5,5,5,0.96) 0%, rgba(5,5,5,0.72) 100%)",
          backdropFilter: "blur(12px)",
          display: "flex",
          opacity: 0, animation: "revealUp 1s 3.6s cubic-bezier(0.16,1,0.3,1) forwards",
        }}>
          {[
            { num: "15+", label: "LET ZKUŠENOSTÍ" },
            { num: "800+", label: "SPOKOJENÝCH KLIENTŮ" },
            { num: "24/7", label: "POHOTOVOSTNÍ SERVIS" },
            { num: "100%", label: "CERTIFIKOVANÉ PRÁCE" },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, padding: "1.8rem 2.2rem", borderRight: i < 3 ? "1px solid rgba(232,101,10,0.18)" : "none", display: "flex", alignItems: "center", gap: "1.6rem", background: i % 2 === 0 ? "rgba(232,101,10,0.05)" : "transparent" }}>
              <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.8rem", fontWeight: 700, color: "#FF8C42", lineHeight: 1, flexShrink: 0, textShadow: "0 0 24px rgba(232,101,10,0.6)" }}>{s.num}</span>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.65rem", letterSpacing: "0.22em", color: "rgba(255,255,255,0.85)", textTransform: "uppercase", lineHeight: 1.5, fontWeight: 600 }}>{s.label}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
