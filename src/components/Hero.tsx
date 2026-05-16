"use client";

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        height: "100vh",
        minHeight: 700,
        position: "relative",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse 60% 80% at 70% 60%, rgba(232,101,10,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 40% 60% at 80% 40%, rgba(201,169,110,0.06) 0%, transparent 50%),
            radial-gradient(ellipse 80% 100% at 50% 100%, rgba(232,101,10,0.08) 0%, transparent 60%),
            linear-gradient(160deg, #0a0a0a 0%, #111111 40%, #0d0d0d 100%)
          `,
        }}
      />

      {/* Chimney SVG art */}
      <svg
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "50%",
          opacity: 0.15,
          pointerEvents: "none",
        }}
        viewBox="0 0 600 800"
        preserveAspectRatio="xMaxYMax meet"
      >
        <rect x="200" y="100" width="80" height="600" fill="rgba(255,255,255,0.03)" rx="2" />
        <rect x="160" y="80" width="160" height="40" fill="rgba(255,255,255,0.04)" rx="2" />
        <rect x="220" y="60" width="40" height="30" fill="rgba(255,255,255,0.05)" rx="2" />
        <rect x="190" y="300" width="30" height="8" fill="rgba(232,101,10,0.15)" rx="1" />
        <rect x="260" y="320" width="30" height="8" fill="rgba(232,101,10,0.1)" rx="1" />
        <rect x="190" y="420" width="30" height="8" fill="rgba(232,101,10,0.12)" rx="1" />
        <rect x="260" y="440" width="30" height="8" fill="rgba(232,101,10,0.08)" rx="1" />
        <ellipse cx="240" cy="65" rx="60" ry="30" fill="rgba(232,101,10,0.15)" />
        <ellipse cx="240" cy="65" rx="30" ry="15" fill="rgba(232,101,10,0.2)" />
      </svg>

      {/* Smoke particles */}
      <div style={{ position: "absolute", right: "20%", bottom: 0, width: 200, pointerEvents: "none" }}>
        {[
          { dur: "9s", delay: "0s", drift: "40px", size: 80, left: 50 },
          { dur: "12s", delay: "3s", drift: "-30px", size: 120, left: 30 },
          { dur: "8s", delay: "6s", drift: "60px", size: 60, left: 70 },
          { dur: "10s", delay: "1s", drift: "-50px", size: 100, left: 40 },
        ].map((p, i) => (
          <div
            key={i}
            className="smoke-particle"
            style={
              {
                "--dur": p.dur,
                "--delay": p.delay,
                "--drift": p.drift,
                width: p.size,
                height: p.size,
                left: p.left,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Ember particles */}
      <div style={{ position: "absolute", right: "20%", bottom: 0, width: 200, pointerEvents: "none" }}>
        {[
          { dur: "4s", delay: "0s", drift: "30px", size: 3, left: 60 },
          { dur: "5s", delay: "1s", drift: "-20px", size: 2, left: 80 },
          { dur: "3.5s", delay: "2s", drift: "50px", size: 4, left: 40 },
          { dur: "6s", delay: "0.5s", drift: "-40px", size: 2, left: 100 },
          { dur: "4.5s", delay: "3s", drift: "20px", size: 3, left: 20 },
        ].map((p, i) => (
          <div
            key={i}
            className="ember-particle"
            style={
              {
                "--dur": p.dur,
                "--delay": p.delay,
                "--drift": p.drift,
                width: p.size,
                height: p.size,
                left: p.left,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "0 3rem",
          maxWidth: 800,
          marginTop: "6rem",
        }}
      >
        <div
          className="eyebrow-line"
          style={{
            fontFamily: "var(--font-syne), sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.5em",
            color: "#E8650A",
            textTransform: "uppercase",
            marginBottom: "2rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            opacity: 0,
            animation: "revealUp 1s 2.5s cubic-bezier(0.16,1,0.3,1) forwards",
          }}
        >
          Certifikovaný komínový servis — Praha & okolí
        </div>

        <h1
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(3.5rem, 7vw, 7rem)",
            fontWeight: 300,
            lineHeight: 1.0,
            letterSpacing: "-0.01em",
            opacity: 0,
            animation: "revealUp 1.2s 2.7s cubic-bezier(0.16,1,0.3,1) forwards",
          }}
        >
          Bezpečnost,
          <br />
          která{" "}
          <em
            style={{
              fontStyle: "italic",
              background:
                "linear-gradient(135deg, #E8650A 0%, #FF8C42 50%, #C9A96E 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            hoří
          </em>
          <br />
          vášní
        </h1>

        <p
          style={{
            fontFamily: "var(--font-syne), sans-serif",
            fontSize: "0.9rem",
            lineHeight: 1.8,
            color: "#bbbbbb",
            marginTop: "2rem",
            maxWidth: 500,
            opacity: 0,
            animation: "revealUp 1s 3s cubic-bezier(0.16,1,0.3,1) forwards",
          }}
        >
          Prémiový komínový servis s přesností švýcarských hodinářů. Každý
          komín je pro nás dílem — čistý, bezpečný, perfektní.
        </p>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginTop: "3rem",
            flexWrap: "wrap",
            opacity: 0,
            animation: "revealUp 1s 3.2s cubic-bezier(0.16,1,0.3,1) forwards",
          }}
        >
          <a href="#kontakt" className="btn-primary">
            Objednat kontrolu
          </a>
          <a href="tel:+420773000000" className="btn-secondary">
            Zavolat ihned
          </a>
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          position: "absolute",
          bottom: "4rem",
          right: "4rem",
          display: "flex",
          gap: "3rem",
          zIndex: 2,
          opacity: 0,
          animation: "revealUp 1s 3.5s cubic-bezier(0.16,1,0.3,1) forwards",
        }}
        className="hidden md:flex"
      >
        {[
          { num: "15+", label: "let zkušeností", dur: "7s", delay: "0s" },
          { num: "800+", label: "spokojených klientů", dur: "6s", delay: "1s" },
          { num: "24/7", label: "pohotovostní servis", dur: "8s", delay: "0.5s" },
        ].map((s, i) => (
          <div
            key={i}
            className="glass-stat float-card"
            style={
              {
                "--dur": s.dur,
                "--delay": s.delay,
                padding: "1.5rem 2rem",
                textAlign: "right",
              } as React.CSSProperties
            }
          >
            <span
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "2.5rem",
                fontWeight: 600,
                color: "#E8650A",
                lineHeight: 1,
                display: "block",
              }}
            >
              {s.num}
            </span>
            <span
              style={{
                fontFamily: "var(--font-syne), sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.3em",
                color: "#888",
                textTransform: "uppercase",
                marginTop: "0.3rem",
                display: "block",
              }}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "3rem",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          fontFamily: "var(--font-syne), sans-serif",
          fontSize: "0.6rem",
          letterSpacing: "0.4em",
          color: "#888",
          textTransform: "uppercase",
          opacity: 0,
          animation: "revealUp 1s 4s forwards",
        }}
        className="hidden md:flex"
      >
        <div
          style={{
            width: 50,
            height: 1,
            background: "#888",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div className="scroll-line-inner" />
        </div>
        Scrollovat dolů
      </div>
    </section>
  );
}
