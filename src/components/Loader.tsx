"use client";
import { useEffect, useState } from "react";

export default function Loader() {
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [particles, setParticles] = useState<{x:number,y:number,size:number,dur:number,delay:number,drift:number}[]>([]);

  useEffect(() => {
    // Generate particles once on client
    setParticles(Array.from({length: 18}, (_, i) => ({
      x: 30 + Math.sin(i * 0.7) * 40,
      y: 40 + Math.cos(i * 0.5) * 30,
      size: 2 + (i % 3),
      dur: 3 + (i % 4),
      delay: i * 0.2,
      drift: -30 + (i % 5) * 15,
    })));

    const start = Date.now();
    const totalDur = 3800;
    let raf: number;
    const tick = () => {
      const p = Math.min(100, Math.round(((Date.now() - start) / totalDur) * 100));
      setProgress(p);
      if (p < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 900);
    const t3 = setTimeout(() => setPhase(3), 1800);
    const t4 = setTimeout(() => setPhase(4), 2800);
    const t5 = setTimeout(() => setFadeOut(true), 3900);
    const t6 = setTimeout(() => setHidden(true), 4700);

    return () => {
      cancelAnimationFrame(raf);
      [t1,t2,t3,t4,t5,t6].forEach(clearTimeout);
    };
  }, []);

  if (hidden) return null;

  const circumference = 2 * Math.PI * 54;
  const strokeDash = circumference - (progress / 100) * circumference;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      backgroundImage: "url('/hero-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center 30%",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      opacity: fadeOut ? 0 : 1,
      transition: fadeOut ? "opacity 0.8s cubic-bezier(0.4,0,0.2,1)" : "none",
      overflow: "hidden",
    }}>

      {/* ── SCANLINE TEXTURE ── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
        opacity: 0.4,
      }} />

      {/* ── RADIAL EMBER BACKGROUND ── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 70% 60% at 50% 60%, rgba(232,101,10,0.14) 0%, transparent 70%)",
        opacity: phase >= 2 ? 1 : 0,
        transition: "opacity 2s ease",
      }} />

      {/* ── CORNER ACCENTS ── */}
      {[
        { top: 24, left: 24, rotate: "0deg" },
        { top: 24, right: 24, rotate: "90deg" },
        { bottom: 24, right: 24, rotate: "180deg" },
        { bottom: 24, left: 24, rotate: "270deg" },
      ].map((pos, i) => (
        <div key={i} style={{
          position: "absolute", ...pos, width: 40, height: 40,
          opacity: phase >= 1 ? 0.4 : 0,
          transition: `opacity 0.6s ${i * 0.1}s ease`,
          transform: `rotate(${pos.rotate})`,
          pointerEvents: "none",
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: 16, height: 1, background: "var(--ember, #E8650A)" }} />
          <div style={{ position: "absolute", top: 0, left: 0, width: 1, height: 16, background: "var(--ember, #E8650A)" }} />
        </div>
      ))}

      {/* ── HORIZONTAL SCAN LINE ── */}
      <div style={{
        position: "absolute", left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent 0%, rgba(232,101,10,0.6) 20%, rgba(255,140,66,0.8) 50%, rgba(232,101,10,0.6) 80%, transparent 100%)",
        animation: phase >= 1 ? "scanLine 3s ease-in-out infinite" : "none",
        opacity: phase >= 1 ? 1 : 0,
        pointerEvents: "none", zIndex: 2,
      }} />

      {/* ── MAIN CONTENT ── */}
      <div style={{ position: "relative", zIndex: 3, display: "flex", flexDirection: "column", alignItems: "center", gap: "2.5rem" }}>

        {/* ── CHIMNEY + CIRCLE PROGRESS ── */}
        <div style={{ position: "relative", width: 140, height: 140, display: "flex", alignItems: "center", justifyContent: "center" }}>

          {/* Outer glow ring */}
          <div style={{
            position: "absolute", inset: -8, borderRadius: "50%",
            background: `conic-gradient(rgba(232,101,10,${phase >= 2 ? 0.15 : 0}) ${progress * 3.6}deg, transparent ${progress * 3.6}deg)`,
            transition: "background 0.1s",
            filter: "blur(8px)",
          }} />

          {/* SVG Progress circle */}
          <svg width="140" height="140" style={{ position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)" }}>
            {/* Track */}
            <circle cx="70" cy="70" r="54" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            {/* Progress */}
            <circle
              cx="70" cy="70" r="54" fill="none"
              stroke="url(#emberGrad)" strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDash}
              style={{ transition: "stroke-dashoffset 0.1s linear" }}
            />
            <defs>
              <linearGradient id="emberGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E8650A" />
                <stop offset="50%" stopColor="#FF8C42" />
                <stop offset="100%" stopColor="#C9A96E" />
              </linearGradient>
            </defs>
          </svg>

          {/* Inner circle */}
          <div style={{
            width: 100, height: 100, borderRadius: "50%",
            background: "rgba(10,10,10,0.95)",
            border: "1px solid rgba(232,101,10,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative", overflow: "hidden",
          }}>
            {/* Chimney SVG */}
            <svg width="44" height="76" viewBox="0 0 44 76" fill="none" style={{
              opacity: phase >= 1 ? 1 : 0,
              transform: phase >= 1 ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)",
            }}>
              {/* Body */}
              <rect x="13" y="18" width="18" height="54" fill="rgba(255,255,255,0.07)" rx="0.5"/>
              {/* Cap */}
              <rect x="7" y="12" width="30" height="8" fill="rgba(255,255,255,0.09)" rx="0.5"/>
              {/* Tops */}
              <rect x="10" y="4" width="9" height="10" fill="rgba(255,255,255,0.07)" rx="0.5"/>
              <rect x="25" y="4" width="9" height="10" fill="rgba(255,255,255,0.07)" rx="0.5"/>
              {/* Bricks */}
              <rect x="13" y="28" width="6" height="3" fill="rgba(232,101,10,0.4)" rx="0.3"/>
              <rect x="22" y="28" width="6" height="3" fill="rgba(232,101,10,0.3)" rx="0.3"/>
              <rect x="15" y="36" width="6" height="3" fill="rgba(232,101,10,0.35)" rx="0.3"/>
              <rect x="24" y="36" width="5" height="3" fill="rgba(232,101,10,0.25)" rx="0.3"/>
              {/* Ember glow */}
              {phase >= 2 && (
                <ellipse cx="22" cy="6" rx="8" ry="4" fill="rgba(232,101,10,0.5)" style={{ animation: "loaderGlow 1.8s ease-in-out infinite" }}/>
              )}
            </svg>

            {/* Smoke from chimney */}
            {phase >= 2 && particles.slice(0, 6).map((p, i) => (
              <div key={i} style={{
                position: "absolute",
                left: `${42 + (i % 3 - 1) * 8}%`,
                top: "10%",
                width: p.size + 2, height: p.size + 2,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(180,180,180,0.3), transparent)",
                animation: `loaderSmoke ${p.dur}s ease-in infinite`,
                animationDelay: `${p.delay}s`,
                "--drift": `${p.drift * 0.3}px`,
              } as React.CSSProperties} />
            ))}
          </div>

          {/* Ember sparks orbiting */}
          {phase >= 3 && particles.slice(0, 8).map((p, i) => {
            const angle = (i / 8) * 360 + (phase * 20);
            const radius = 62 + (i % 3) * 4;
            const x = 70 + radius * Math.cos((angle * Math.PI) / 180);
            const y = 70 + radius * Math.sin((angle * Math.PI) / 180);
            return (
              <div key={i} style={{
                position: "absolute",
                left: x, top: y,
                width: p.size, height: p.size,
                borderRadius: "50%",
                background: "#E8650A",
                boxShadow: `0 0 ${p.size * 3}px #E8650A`,
                transform: "translate(-50%, -50%)",
                animation: `emberOrbit 4s ${p.delay}s linear infinite`,
                opacity: 0.7,
              }} />
            );
          })}
        </div>

        {/* ── LOGO ── */}
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
          <div style={{
            fontFamily: "var(--font-cormorant, 'Cormorant Garamond', serif)",
            fontSize: "clamp(1.4rem, 5vw, 2.2rem)",
            fontWeight: 300,
            letterSpacing: "0.3em",
            lineHeight: 1,
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.8s 0.2s ease, transform 0.8s 0.2s cubic-bezier(0.16,1,0.3,1)",
          }}>
            <span style={{ color: "#F2EDE8" }}>KOMINICTVÍ</span>
            {" "}
            <span style={{
              background: "linear-gradient(135deg, #E8650A, #FF8C42, #C9A96E)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>ŠTĚSTÍ</span>
          </div>

          {/* Animated divider */}
          <div style={{
            width: phase >= 2 ? "120px" : "0px",
            height: 1,
            background: "linear-gradient(90deg, transparent, #E8650A, transparent)",
            transition: "width 0.8s 0.3s cubic-bezier(0.16,1,0.3,1)",
          }} />

          <div style={{
            fontFamily: "var(--font-ui, 'DM Sans', sans-serif)",
            fontSize: "0.58rem",
            letterSpacing: "0.5em",
            color: "rgba(232,101,10,0.65)",
            textTransform: "uppercase",
            opacity: phase >= 2 ? 1 : 0,
            transition: "opacity 0.6s 0.5s ease",
          }}>
            Tomáš Baran — Mladá Boleslav
          </div>
        </div>

        {/* ── PROGRESS BAR ── */}
        <div style={{ width: "min(280px, 75vw)", display: "flex", flexDirection: "column", gap: "0.6rem", opacity: phase >= 1 ? 1 : 0, transition: "opacity 0.6s 0.4s ease" }}>

          {/* Status text */}
          <div style={{
            display: "flex", justifyContent: "space-between",
            fontFamily: "var(--font-ui, sans-serif)",
            fontSize: "0.55rem", letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}>
            <span style={{ color: "#E8650A", opacity: 0.8 }}>
              {phase === 0 && "Inicializace"}
              {phase === 1 && "Zapalujeme oheň…"}
              {phase === 2 && "Kontrolujeme komín…"}
              {phase === 3 && "Připravujeme servis…"}
              {phase >= 4 && "✓ Vše připraveno"}
            </span>
            <span style={{ color: "rgba(255,255,255,0.25)" }}>{progress}%</span>
          </div>

          {/* Bar track */}
          <div style={{ height: 1, background: "rgba(255,255,255,0.06)", position: "relative", overflow: "hidden" }}>
            {/* Fill */}
            <div style={{
              position: "absolute", left: 0, top: 0, bottom: 0,
              width: `${progress}%`,
              background: "linear-gradient(90deg, #E8650A, #FF8C42)",
              transition: "width 0.1s linear",
              boxShadow: "0 0 12px rgba(232,101,10,0.7), 0 0 4px rgba(255,140,66,0.5)",
            }} />
            {/* Shimmer */}
            <div style={{
              position: "absolute", top: 0, bottom: 0, width: "30%",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
              left: `${progress - 15}%`,
              opacity: progress > 5 && progress < 95 ? 1 : 0,
              transition: "left 0.1s linear",
            }} />
          </div>

          {/* Dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "0.2rem" }}>
            {[0,1,2,3].map(i => (
              <div key={i} style={{
                width: 4, height: 4, borderRadius: "50%",
                background: phase > i ? "#E8650A" : "rgba(255,255,255,0.1)",
                boxShadow: phase > i ? "0 0 6px #E8650A" : "none",
                transition: "background 0.4s, box-shadow 0.4s",
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM TAGLINE ── */}
      <div style={{
        position: "absolute", bottom: "2rem",
        fontFamily: "var(--font-ui, sans-serif)",
        fontSize: "0.5rem", letterSpacing: "0.5em",
        color: "rgba(255,255,255,0.1)", textTransform: "uppercase",
        opacity: phase >= 3 ? 1 : 0,
        transition: "opacity 1s ease",
        zIndex: 3,
      }}>
        Certifikované kominické služby — Středočeský & Liberecký kraj
      </div>

      {/* ── FLOATING EMBERS ── */}
      {phase >= 2 && particles.map((p, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${p.x}%`, bottom: "0",
          width: p.size, height: p.size,
          borderRadius: "50%",
          background: "#E8650A",
          boxShadow: `0 0 ${p.size * 4}px #E8650A`,
          animation: `loaderEmberFloat ${p.dur}s ease-out infinite`,
          animationDelay: `${p.delay}s`,
          "--drift": `${p.drift}px`,
          opacity: 0,
          pointerEvents: "none",
          zIndex: 2,
        } as React.CSSProperties} />
      ))}

      <style>{`
        @keyframes scanLine {
          0% { top: -2px; opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { top: 100vh; opacity: 0; }
        }
        @keyframes loaderSmoke {
          0% { transform: translateY(0) scale(0.3); opacity: 0.5; }
          50% { opacity: 0.2; }
          100% { transform: translateY(-90px) translateX(var(--drift)) scale(3); opacity: 0; }
        }
        @keyframes loaderEmberFloat {
          0% { transform: translateY(0) scale(1); opacity: 0.9; }
          100% { transform: translateY(-100vh) translateX(var(--drift)) scale(0.2); opacity: 0; }
        }
        @keyframes loaderGlow {
          0%,100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes emberOrbit {
          0% { opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
