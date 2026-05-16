"use client";
import { useEffect, useState } from "react";

export default function Loader() {
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Progress bar animation
    const start = Date.now();
    const duration = 2800;
    const raf = requestAnimationFrame(function tick() {
      const elapsed = Date.now() - start;
      const p = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(p);
      if (p < 100) requestAnimationFrame(tick);
    });

    // Phase transitions
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1000);
    const t3 = setTimeout(() => setPhase(3), 1800);
    const t4 = setTimeout(() => setFadeOut(true), 3000);
    const t5 = setTimeout(() => setHidden(true), 3700);

    return () => {
      cancelAnimationFrame(raf);
      [t1,t2,t3,t4,t5].forEach(clearTimeout);
    };
  }, []);

  if (hidden) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9990,
      background: "#080808",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      opacity: fadeOut ? 0 : 1,
      transition: fadeOut ? "opacity 0.7s cubic-bezier(0.4,0,0.2,1)" : "none",
      overflow: "hidden",
    }}>

      {/* Background ember glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(232,101,10,0.12) 0%, transparent 70%)",
        opacity: phase >= 2 ? 1 : 0,
        transition: "opacity 1.5s ease",
      }} />

      {/* Chimney SVG illustration */}
      <div style={{
        position: "relative", marginBottom: "2.5rem",
        opacity: phase >= 1 ? 1 : 0,
        transform: phase >= 1 ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <svg width="80" height="140" viewBox="0 0 80 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Chimney body */}
          <rect x="26" y="44" width="28" height="86" fill="rgba(255,255,255,0.06)" rx="1"/>
          {/* Chimney cap */}
          <rect x="18" y="36" width="44" height="12" fill="rgba(255,255,255,0.08)" rx="1"/>
          {/* Chimney top openings */}
          <rect x="24" y="24" width="12" height="14" fill="rgba(255,255,255,0.07)" rx="1"/>
          <rect x="44" y="24" width="12" height="14" fill="rgba(255,255,255,0.07)" rx="1"/>
          {/* Brick pattern */}
          <rect x="26" y="58" width="8" height="4" fill="rgba(232,101,10,0.15)" rx="0.5"/>
          <rect x="38" y="58" width="8" height="4" fill="rgba(232,101,10,0.1)" rx="0.5"/>
          <rect x="30" y="66" width="8" height="4" fill="rgba(232,101,10,0.12)" rx="0.5"/>
          <rect x="42" y="66" width="8" height="4" fill="rgba(232,101,10,0.08)" rx="0.5"/>
          <rect x="26" y="74" width="8" height="4" fill="rgba(232,101,10,0.1)" rx="0.5"/>
          <rect x="38" y="74" width="8" height="4" fill="rgba(232,101,10,0.14)" rx="0.5"/>
          {/* Ember glow at top */}
          {phase >= 2 && (
            <ellipse cx="40" cy="28" rx="14" ry="8" fill="rgba(232,101,10,0.25)" style={{ animation: "loaderGlow 2s ease-in-out infinite" }}/>
          )}
          {phase >= 2 && (
            <ellipse cx="40" cy="28" rx="8" ry="4" fill="rgba(232,101,10,0.5)" style={{ animation: "loaderGlow 1.5s ease-in-out infinite reverse" }}/>
          )}
        </svg>

        {/* Smoke particles */}
        {phase >= 2 && [
          { x: 30, delay: "0s", dur: "2.5s", drift: "-15px", size: 18 },
          { x: 50, delay: "0.8s", dur: "3s", drift: "12px", size: 24 },
          { x: 38, delay: "1.5s", dur: "2.8s", drift: "-8px", size: 14 },
          { x: 45, delay: "0.3s", dur: "3.5s", drift: "20px", size: 20 },
        ].map((p, i) => (
          <div key={i} style={{
            position: "absolute",
            left: p.x, top: 10,
            width: p.size, height: p.size,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(160,160,160,0.25), transparent)",
            animation: `loaderSmoke ${p.dur} ease-in infinite`,
            animationDelay: p.delay,
            "--drift": p.drift,
          } as React.CSSProperties} />
        ))}

        {/* Ember sparks */}
        {phase >= 3 && [
          { x: 36, delay: "0s", dur: "1.8s", drift: "-20px" },
          { x: 44, delay: "0.6s", dur: "2.2s", drift: "18px" },
          { x: 40, delay: "1.1s", dur: "1.6s", drift: "-10px" },
        ].map((p, i) => (
          <div key={i} style={{
            position: "absolute", left: p.x, top: 18,
            width: 3, height: 3, borderRadius: "50%",
            background: "#E8650A",
            boxShadow: "0 0 6px #E8650A",
            animation: `loaderEmber ${p.dur} ease-out infinite`,
            animationDelay: p.delay,
            "--drift": p.drift,
          } as React.CSSProperties} />
        ))}
      </div>

      {/* Logo */}
      <div style={{
        opacity: phase >= 1 ? 1 : 0,
        transform: phase >= 1 ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.8s 0.2s ease, transform 0.8s 0.2s cubic-bezier(0.16,1,0.3,1)",
        textAlign: "center",
      }}>
        <div style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "clamp(1.6rem, 6vw, 2.8rem)",
          fontWeight: 300,
          letterSpacing: "0.25em",
          color: "#F2EDE8",
          lineHeight: 1,
        }}>
          KOMINICTVÍ{" "}
          <span style={{
            background: "linear-gradient(135deg, #E8650A, #FF8C42, #C9A96E)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>ŠTĚSTÍ</span>
        </div>
        <div style={{
          fontFamily: "var(--font-ui), sans-serif",
          fontSize: "0.6rem",
          letterSpacing: "0.5em",
          color: "rgba(232,101,10,0.7)",
          textTransform: "uppercase",
          marginTop: "0.6rem",
          opacity: phase >= 2 ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}>
          Tomáš Baran — Mladá Boleslav
        </div>
      </div>

      {/* Progress section */}
      <div style={{
        marginTop: "3rem", width: "min(260px, 70vw)",
        opacity: phase >= 1 ? 1 : 0,
        transition: "opacity 0.6s 0.5s ease",
      }}>
        {/* Bar */}
        <div style={{
          width: "100%", height: 1,
          background: "rgba(255,255,255,0.06)",
          position: "relative", overflow: "hidden",
          marginBottom: "0.8rem",
        }}>
          <div style={{
            position: "absolute", left: 0, top: 0, bottom: 0,
            width: `${progress}%`,
            background: "linear-gradient(90deg, #E8650A, #FF8C42)",
            transition: "width 0.1s linear",
            boxShadow: "2px 0 8px rgba(232,101,10,0.6)",
          }} />
        </div>
        {/* Labels */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          fontFamily: "var(--font-ui), sans-serif",
          fontSize: "0.55rem", letterSpacing: "0.3em",
          color: "rgba(255,255,255,0.2)", textTransform: "uppercase",
        }}>
          <span style={{ color: progress > 10 ? "rgba(232,101,10,0.6)" : "rgba(255,255,255,0.2)", transition: "color 0.3s" }}>
            {phase === 0 && "Inicializace…"}
            {phase === 1 && "Zapalujeme oheň…"}
            {phase === 2 && "Kontrolujeme komín…"}
            {phase >= 3 && "Vše připraveno"}
          </span>
          <span style={{ color: "rgba(232,101,10,0.5)" }}>{progress}%</span>
        </div>
      </div>

      {/* Bottom tagline */}
      <div style={{
        position: "absolute", bottom: "2.5rem",
        fontFamily: "var(--font-ui), sans-serif",
        fontSize: "0.52rem", letterSpacing: "0.45em",
        color: "rgba(255,255,255,0.12)", textTransform: "uppercase",
        opacity: phase >= 2 ? 1 : 0,
        transition: "opacity 0.8s ease",
      }}>
        Certifikované kominické služby
      </div>

      <style>{`
        @keyframes loaderSmoke {
          0% { transform: translateY(0) scale(0.5); opacity: 0.5; }
          50% { opacity: 0.2; }
          100% { transform: translateY(-80px) translateX(var(--drift)) scale(3); opacity: 0; }
        }
        @keyframes loaderEmber {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-60px) translateX(var(--drift)) scale(0.3); opacity: 0; }
        }
        @keyframes loaderGlow {
          0%,100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
}
