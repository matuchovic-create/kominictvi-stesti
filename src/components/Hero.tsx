"use client";

export default function Hero() {
  return (
    <section id="hero" style={{ height: "100vh", minHeight: 700, position: "relative", display: "flex", alignItems: "center", overflow: "hidden" }}>

      {/* Multi-layer background */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 55% 70% at 75% 55%, rgba(232,101,10,0.10) 0%, transparent 65%), radial-gradient(ellipse 35% 50% at 85% 30%, rgba(201,169,110,0.055) 0%, transparent 55%), radial-gradient(ellipse 90% 60% at 50% 100%, rgba(232,101,10,0.06) 0%, transparent 55%), #080808" }} />

      {/* Geometric right side composition */}
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "48%", pointerEvents: "none" }}>
        {/* Large circle outline */}
        <div style={{ position: "absolute", right: "-15%", top: "50%", transform: "translateY(-50%)", width: 560, height: 560, borderRadius: "50%", border: "1px solid rgba(232,101,10,0.07)", animation: "rotateSlow 40s linear infinite" }} />
        <div style={{ position: "absolute", right: "-10%", top: "50%", transform: "translateY(-50%)", width: 420, height: 420, borderRadius: "50%", border: "1px solid rgba(232,101,10,0.1)", animation: "rotateSlow 28s linear infinite reverse" }} />
        <div style={{ position: "absolute", right: "-5%", top: "50%", transform: "translateY(-50%)", width: 300, height: 300, borderRadius: "50%", border: "1px solid rgba(232,101,10,0.14)", animation: "rotateSlow 18s linear infinite" }} />

        {/* Center glow orb */}
        <div style={{ position: "absolute", right: "12%", top: "50%", transform: "translateY(-50%)", width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,101,10,0.22) 0%, rgba(232,101,10,0.06) 50%, transparent 70%)", animation: "floatY 7s ease-in-out infinite" }} />

        {/* Chimney abstract form */}
        <svg style={{ position: "absolute", right: "8%", top: "50%", transform: "translateY(-50%)", opacity: 0.12, width: 200, height: 400 }} viewBox="0 0 200 400">
          <rect x="70" y="60" width="60" height="280" fill="rgba(255,255,255,0.8)" rx="1"/>
          <rect x="50" y="48" width="100" height="24" fill="rgba(255,255,255,0.9)" rx="1"/>
          <rect x="62" y="32" width="30" height="22" fill="white" rx="1"/>
          <rect x="108" y="32" width="30" height="22" fill="white" rx="1"/>
          <rect x="58" y="120" width="22" height="6" fill="rgba(232,101,10,0.9)" rx="1"/>
          <rect x="120" y="136" width="22" height="6" fill="rgba(232,101,10,0.7)" rx="1"/>
          <rect x="58" y="200" width="22" height="6" fill="rgba(232,101,10,0.8)" rx="1"/>
          <rect x="120" y="216" width="22" height="6" fill="rgba(232,101,10,0.6)" rx="1"/>
        </svg>

        {/* Ember glow at top of chimney */}
        <div style={{ position: "absolute", right: "calc(8% + 76px)", top: "calc(50% - 200px + 28px)", transform: "translate(50%, 0)", width: 40, height: 40, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,101,10,0.8), rgba(232,101,10,0.1) 70%, transparent)", animation: "floatY 3s ease-in-out infinite", filter: "blur(2px)" }} />
      </div>

      {/* Smoke particles */}
      <div style={{ position: "absolute", right: "calc(8% + 76px + 4%)", top: 0, bottom: 0, width: 160, pointerEvents: "none" }}>
        {[
          { dur: "10s", delay: "0s", drift: "50px", size: 70, left: 30 },
          { dur: "14s", delay: "4s",  drift: "-40px", size: 110, left: 10 },
          { dur: "9s",  delay: "7s",  drift: "70px",  size: 50, left: 60 },
          { dur: "12s", delay: "2s",  drift: "-60px", size: 90, left: 40 },
        ].map((p, i) => (
          <div key={i} className="smoke-particle" style={{ "--dur": p.dur, "--delay": p.delay, "--drift": p.drift, width: p.size, height: p.size, left: p.left } as React.CSSProperties} />
        ))}
        {[
          { dur: "4s",   delay: "0s",   drift: "30px",  size: 3, left: 50 },
          { dur: "5.5s", delay: "1.5s", drift: "-25px", size: 2, left: 70 },
          { dur: "3.5s", delay: "3s",   drift: "55px",  size: 4, left: 35 },
          { dur: "6s",   delay: "0.8s", drift: "-45px", size: 2, left: 85 },
          { dur: "4.5s", delay: "2.5s", drift: "20px",  size: 3, left: 15 },
        ].map((p, i) => (
          <div key={i} className="ember-particle" style={{ "--dur": p.dur, "--delay": p.delay, "--drift": p.drift, width: p.size, height: p.size, left: p.left } as React.CSSProperties} />
        ))}
      </div>

      {/* Horizontal rule across full width */}
      <div style={{ position: "absolute", bottom: "20%", left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 20%, rgba(232,101,10,0.08) 50%, rgba(255,255,255,0.04) 80%, transparent 100%)", pointerEvents: "none" }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, padding: "0 clamp(1.5rem, 5vw, 5rem)", maxWidth: 760, marginTop: "5rem" }}>

        {/* Eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2.5rem", opacity: 0, animation: "revealUp 1s 2.5s cubic-bezier(0.16,1,0.3,1) forwards" }}>
          <div style={{ width: 36, height: 1, background: "var(--ember)", flexShrink: 0 }} />
          <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.6rem", letterSpacing: "0.55em", color: "var(--ember)", textTransform: "uppercase" }}>
            Certifikovaný servis — Praha & okolí
          </span>
        </div>

        {/* Main headline */}
        <h1 style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontSize: "clamp(3.8rem, 7.5vw, 7.5rem)", lineHeight: 0.96, letterSpacing: "-0.02em", opacity: 0, animation: "revealUp 1.2s 2.7s cubic-bezier(0.16,1,0.3,1) forwards" }}>
          <span style={{ display: "block", color: "var(--text-primary)" }}>Bezpečnost,</span>
          <span style={{ display: "block" }}>
            která{" "}
            <em style={{ fontStyle: "italic", background: "linear-gradient(135deg, #E8650A 0%, #FF8C42 45%, #C9A96E 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>hoří</em>
          </span>
          <span style={{ display: "block", color: "var(--text-secondary)", fontWeight: 300 }}>vášní</span>
        </h1>

        {/* Divider */}
        <div style={{ width: 48, height: 1, background: "linear-gradient(90deg, var(--ember), transparent)", margin: "2.5rem 0", opacity: 0, animation: "revealUp 1s 2.9s cubic-bezier(0.16,1,0.3,1) forwards" }} />

        {/* Sub */}
        <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.95rem", lineHeight: 1.85, color: "var(--text-secondary)", maxWidth: 460, fontWeight: 300, opacity: 0, animation: "revealUp 1s 3.1s cubic-bezier(0.16,1,0.3,1) forwards" }}>
          Prémiový komínový servis s přesností švýcarských hodinářů. Každý komín je pro nás dílem — čistý, bezpečný, perfektní.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "1rem", marginTop: "3rem", flexWrap: "wrap", opacity: 0, animation: "revealUp 1s 3.3s cubic-bezier(0.16,1,0.3,1) forwards" }}>
          <a href="#kontakt" className="btn-primary"><span>Objednat kontrolu</span></a>
          <a href="tel:+420773000000" className="btn-ghost">Zavolat ihned</a>
        </div>
      </div>

      {/* Stats — horizontal bar at bottom */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 2, borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", opacity: 0, animation: "revealUp 1s 3.6s cubic-bezier(0.16,1,0.3,1) forwards" }} className="hero-stats-bar">
        {[
          { num: "15+", label: "let zkušeností" },
          { num: "800+", label: "spokojených klientů" },
          { num: "24/7", label: "pohotovostní servis" },
          { num: "100%", label: "certifikované práce" },
        ].map((s, i) => (
          <div key={i} style={{ flex: 1, padding: "1.8rem 2rem", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none", display: "flex", alignItems: "center", gap: "1.2rem", background: "rgba(255,255,255,0.01)" }}>
            <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "2rem", fontWeight: 500, color: "var(--ember)", lineHeight: 1, flexShrink: 0 }}>{s.num}</span>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.62rem", letterSpacing: "0.2em", color: "var(--text-muted)", textTransform: "uppercase", lineHeight: 1.4 }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: "6rem", left: "clamp(1.5rem, 5vw, 5rem)", zIndex: 2, display: "flex", alignItems: "center", gap: "1rem", fontFamily: "var(--font-ui)", fontSize: "0.58rem", letterSpacing: "0.45em", color: "var(--text-muted)", textTransform: "uppercase", opacity: 0, animation: "revealUp 1s 4s forwards" }} className="hidden md:flex">
        <div style={{ width: 44, height: 1, background: "rgba(255,255,255,0.12)", position: "relative", overflow: "hidden" }}>
          <div className="scroll-line-inner" />
        </div>
        Scrollovat dolů
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-stats-bar { display: grid !important; grid-template-columns: 1fr 1fr; }
          .hero-stats-bar > div:nth-child(2) { border-right: none !important; }
          .hero-stats-bar > div:nth-child(3) { border-top: 1px solid rgba(255,255,255,0.05); }
          .hero-stats-bar > div:nth-child(4) { border-top: 1px solid rgba(255,255,255,0.05); border-right: none !important; }
        }
        @media (max-width: 600px) {
          .hero-stats-bar { display: none !important; }
        }
      `}</style>
    </section>
  );
}
