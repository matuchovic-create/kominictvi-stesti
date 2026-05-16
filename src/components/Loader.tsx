"use client";
import { useEffect, useState, useRef } from "react";

export default function Loader() {
  const [phase, setPhase] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  // Stars canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5,
      twinkle: Math.random() * Math.PI * 2,
      speed: 0.01 + Math.random() * 0.02,
    }));

    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;
      stars.forEach(s => {
        s.twinkle += s.speed;
        const alpha = 0.3 + Math.sin(s.twinkle) * 0.4;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
      });
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Phase timeline
  useEffect(() => {
    const start = Date.now();
    const dur = 4200;
    let raf: number;
    const tick = () => {
      const p = Math.min(100, Math.round(((Date.now() - start) / dur) * 100));
      setProgress(p);
      if (p < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Phase 0: stars — phase 1: zoom starts (0.4s) — phase 2: planet visible (1.2s)
    // phase 3: house zoom (2.2s) — phase 4: chimney close (3.2s) — fadeout (4.5s)
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => setPhase(3), 2200);
    const t4 = setTimeout(() => setPhase(4), 3200);
    const t5 = setTimeout(() => setFadeOut(true), 4500);
    const t6 = setTimeout(() => setHidden(true), 5300);

    return () => {
      cancelAnimationFrame(raf);
      [t1,t2,t3,t4,t5,t6].forEach(clearTimeout);
    };
  }, []);

  if (hidden) return null;

  // Zoom scale based on phase
  const sceneScale = phase >= 3 ? (phase >= 4 ? 8 : 3.5) : (phase >= 2 ? 1.8 : 1);
  const sceneY = phase >= 4 ? "-12%" : phase >= 3 ? "-5%" : "0%";

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "#020408",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      overflow: "hidden",
      opacity: fadeOut ? 0 : 1,
      transition: fadeOut ? "opacity 0.8s cubic-bezier(0.4,0,0.2,1)" : "none",
    }}>

      {/* Stars canvas */}
      <canvas ref={canvasRef} style={{
        position: "absolute", inset: 0, zIndex: 0,
        opacity: phase >= 3 ? 0 : 1,
        transition: "opacity 1.5s ease",
      }} />

      {/* Sky gradient — appears on zoom in */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(180deg, #020408 0%, #0a0508 40%, #1a0a05 70%, #2a1005 100%)",
        opacity: phase >= 3 ? 1 : 0,
        transition: "opacity 1.5s ease",
      }} />

      {/* Ember atmosphere glow */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", zIndex: 2,
        background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(232,101,10,0.18) 0%, transparent 70%)",
        opacity: phase >= 4 ? 1 : 0,
        transition: "opacity 1s ease",
      }} />

      {/* ── MAIN SCENE ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 3,
        display: "flex", alignItems: "center", justifyContent: "center",
        transform: `scale(${sceneScale}) translateY(${sceneY})`,
        transition: phase >= 4
          ? "transform 1.2s cubic-bezier(0.16,1,0.3,1)"
          : phase >= 3
          ? "transform 1.4s cubic-bezier(0.16,1,0.3,1)"
          : "transform 1.8s cubic-bezier(0.2,0,0,1)",
        transformOrigin: "50% 55%",
      }}>

        {/* Planet / Earth */}
        <div style={{
          position: "absolute",
          width: 180, height: 180,
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 35%, #1a4a6a, #0d2a3a 50%, #061520)",
          boxShadow: "inset -20px -10px 40px rgba(0,0,0,0.8), 0 0 60px rgba(20,80,120,0.3), 0 0 120px rgba(20,60,100,0.15)",
          opacity: phase >= 2 ? 1 : 0,
          transition: "opacity 1.2s ease",
        }}>
          {/* Continent shapes */}
          <div style={{ position: "absolute", top: "28%", left: "20%", width: "35%", height: "25%", borderRadius: "40% 60% 55% 45%", background: "rgba(40,120,40,0.4)", transform: "rotate(-15deg)" }} />
          <div style={{ position: "absolute", top: "45%", left: "50%", width: "25%", height: "20%", borderRadius: "50%", background: "rgba(40,100,30,0.35)" }} />
          <div style={{ position: "absolute", top: "15%", left: "55%", width: "20%", height: "15%", borderRadius: "40% 60% 50% 50%", background: "rgba(50,110,35,0.3)", transform: "rotate(20deg)" }} />
          {/* Atmosphere rim */}
          <div style={{ position: "absolute", inset: -4, borderRadius: "50%", boxShadow: "inset 0 0 20px rgba(100,160,255,0.15), 0 0 30px rgba(100,160,255,0.1)" }} />
        </div>

        {/* ── HOUSE WITH CHIMNEY ── */}
        <svg
          viewBox="0 0 340 280"
          style={{
            width: "min(340px, 90vw)",
            height: "auto",
            opacity: phase >= 3 ? 1 : 0,
            transition: "opacity 0.8s ease",
            filter: phase >= 4 ? "drop-shadow(0 0 30px rgba(232,101,10,0.4))" : "none",
          }}
        >
          {/* Night sky background in scene */}
          <rect x="0" y="0" width="340" height="280" fill="transparent"/>

          {/* Ground / snow */}
          <ellipse cx="170" cy="268" rx="160" ry="14" fill="rgba(255,255,255,0.06)"/>

          {/* ── MAIN HOUSE ── */}
          {/* House body */}
          <rect x="60" y="148" width="180" height="110" fill="#1a1008" rx="1"/>
          {/* Brick texture */}
          {[0,1,2,3,4,5].map(row => (
            [0,1,2,3].map(col => (
              <rect key={`${row}-${col}`}
                x={64 + col * 44 + (row % 2) * 22}
                y={152 + row * 18}
                width={38} height={14}
                fill={`rgba(232,101,10,${0.06 + (row + col) % 3 * 0.02})`}
                rx="0.5"
              />
            ))
          ))}

          {/* Roof */}
          <polygon points="48,150 170,72 292,150" fill="#120c06"/>
          <polygon points="48,150 170,72 292,150" fill="none" stroke="rgba(232,101,10,0.15)" strokeWidth="1"/>
          {/* Roof tiles hint */}
          {[0,1,2,3,4].map(i => (
            <line key={i} x1={80 + i * 45} y1={150 - i * 14} x2={135 + i * 30} y2={72 + i * 20} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
          ))}

          {/* ── CHIMNEY ── */}
          {/* Chimney body */}
          <rect x="188" y="80" width="32" height="75" fill="#1e1208" rx="1"/>
          {/* Chimney bricks */}
          <rect x="190" y="84" width="12" height="6" fill="rgba(232,101,10,0.3)" rx="0.3"/>
          <rect x="205" y="84" width="12" height="6" fill="rgba(232,101,10,0.2)" rx="0.3"/>
          <rect x="192" y="94" width="12" height="6" fill="rgba(232,101,10,0.25)" rx="0.3"/>
          <rect x="207" y="94" width="10" height="6" fill="rgba(232,101,10,0.18)" rx="0.3"/>
          <rect x="190" y="104" width="11" height="6" fill="rgba(232,101,10,0.22)" rx="0.3"/>
          <rect x="204" y="104" width="13" height="6" fill="rgba(232,101,10,0.15)" rx="0.3"/>
          <rect x="191" y="114" width="12" height="6" fill="rgba(232,101,10,0.2)" rx="0.3"/>
          <rect x="206" y="114" width="11" height="6" fill="rgba(232,101,10,0.16)" rx="0.3"/>
          {/* Chimney cap */}
          <rect x="184" y="74" width="40" height="9" fill="#261808" rx="1"/>
          <rect x="186" y="63" width="14" height="13" fill="#1e1208" rx="1"/>
          <rect x="208" y="63" width="14" height="13" fill="#1e1208" rx="1"/>

          {/* ── WINDOWS ── */}
          {/* Left window */}
          <rect x="75" y="168" width="44" height="36" fill="#0a0808" rx="1"/>
          <rect x="77" y="170" width="19" height="32" fill="rgba(255,180,60,0.08)" rx="0.5"/>
          <rect x="98" y="170" width="19" height="32" fill="rgba(255,180,60,0.05)" rx="0.5"/>
          {/* Warm light in left window */}
          <rect x="77" y="170" width="19" height="32" fill={phase >= 4 ? "rgba(255,140,30,0.18)" : "rgba(255,140,30,0.04)"} rx="0.5" style={{ transition: "fill 1s ease" }}/>
          {/* Right window */}
          <rect x="181" y="168" width="44" height="36" fill="#0a0808" rx="1"/>
          <rect x="183" y="170" width="19" height="32" fill="rgba(255,180,60,0.06)" rx="0.5"/>
          <rect x="204" y="170" width="19" height="32" fill="rgba(255,180,60,0.04)" rx="0.5"/>

          {/* Door */}
          <rect x="143" y="210" width="34" height="48" fill="#0d0906" rx="1"/>
          <rect x="148" y="215" width="10" height="12" fill="rgba(255,255,255,0.03)" rx="0.5"/>
          <rect x="162" y="215" width="10" height="12" fill="rgba(255,255,255,0.03)" rx="0.5"/>
          <circle cx="177" cy="236" r="2" fill="rgba(201,169,110,0.4)"/>

          {/* ── SMOKE from chimney ── */}
          {phase >= 4 && [
            { cx: 198, baseY: 60, r: 5, delay: "0s", dur: "3s", drift: -8 },
            { cx: 204, baseY: 60, r: 7, delay: "0.8s", dur: "3.5s", drift: 6 },
            { cx: 196, baseY: 60, r: 4, delay: "1.6s", dur: "2.8s", drift: -12 },
            { cx: 206, baseY: 60, r: 9, delay: "0.4s", dur: "4s", drift: 10 },
          ].map((s, i) => (
            <circle key={i} cx={s.cx} cy={s.baseY} r={s.r}
              fill="rgba(140,140,140,0.12)"
              style={{
                animation: `svgSmoke ${s.dur} ease-in infinite`,
                animationDelay: s.delay,
              } as React.CSSProperties}
            />
          ))}

          {/* Ember glow above chimney */}
          {phase >= 4 && (
            <>
              <ellipse cx="204" cy="66" rx="14" ry="8" fill="rgba(232,101,10,0.3)" style={{ animation: "loaderGlow 2s ease-in-out infinite" } as React.CSSProperties}/>
              <ellipse cx="204" cy="66" rx="7" ry="4" fill="rgba(255,140,66,0.5)" style={{ animation: "loaderGlow 1.4s ease-in-out infinite reverse" } as React.CSSProperties}/>
            </>
          )}

          {/* Ember sparks */}
          {phase >= 4 && [
            { x: 200, y: 55, delay: "0s", dur: "2s" },
            { x: 208, y: 52, delay: "0.7s", dur: "2.5s" },
            { x: 196, y: 58, delay: "1.3s", dur: "1.8s" },
          ].map((e, i) => (
            <circle key={i} cx={e.x} cy={e.y} r="1.5" fill="#E8650A"
              style={{
                animation: `sparkFloat ${e.dur} ease-out infinite`,
                animationDelay: e.delay,
                filter: "url(#emberGlow)",
              } as React.CSSProperties}
            />
          ))}

          {/* Tree left */}
          <polygon points="28,200 45,145 62,200" fill="#0a1205" opacity="0.8"/>
          <polygon points="22,210 45,155 68,210" fill="#0d1508" opacity="0.6"/>
          {/* Tree right */}
          <polygon points="268,200 285,145 302,200" fill="#0a1205" opacity="0.7"/>
          <polygon points="265,210 285,155 305,210" fill="#0d1508" opacity="0.5"/>

          <defs>
            <filter id="emberGlow">
              <feGaussianBlur stdDeviation="1" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
        </svg>
      </div>

      {/* ── HUD OVERLAY ── */}
      {/* Corner frames */}
      {[
        { top: 20, left: 20, rotate: "0deg" },
        { top: 20, right: 20, rotate: "90deg" },
        { bottom: 20, right: 20, rotate: "180deg" },
        { bottom: 20, left: 20, rotate: "270deg" },
      ].map((pos, i) => (
        <div key={i} style={{
          position: "absolute", ...pos, width: 32, height: 32, zIndex: 10,
          opacity: phase >= 1 ? 0.5 : 0,
          transition: `opacity 0.5s ${i * 0.1}s ease`,
          transform: `rotate(${pos.rotate})`,
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: 14, height: 1.5, background: "#E8650A" }} />
          <div style={{ position: "absolute", top: 0, left: 0, width: 1.5, height: 14, background: "#E8650A" }} />
        </div>
      ))}

      {/* Phase label top */}
      <div style={{
        position: "absolute", top: 28, left: "50%", transform: "translateX(-50%)",
        zIndex: 10, textAlign: "center",
        opacity: phase >= 1 ? 1 : 0,
        transition: "opacity 0.6s ease",
      }}>
        <div style={{
          fontFamily: "var(--font-ui, 'DM Sans', sans-serif)",
          fontSize: "0.52rem", letterSpacing: "0.5em",
          color: "rgba(232,101,10,0.6)", textTransform: "uppercase",
        }}>
          {phase <= 1 && "▸ Inicializace systému"}
          {phase === 2 && "▸ Přibližování k cíli"}
          {phase === 3 && "▸ Detekce objektu"}
          {phase >= 4 && "▸ Komín identifikován"}
        </div>
      </div>

      {/* Bottom HUD */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10,
        padding: "0 1.5rem 2rem",
        opacity: phase >= 1 ? 1 : 0,
        transition: "opacity 0.6s 0.3s ease",
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "1.2rem" }}>
          <div style={{
            fontFamily: "var(--font-cormorant, 'Cormorant Garamond', serif)",
            fontSize: "clamp(1.3rem, 4vw, 2rem)",
            fontWeight: 300, letterSpacing: "0.28em", lineHeight: 1,
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}>
            <span style={{ color: "#F2EDE8" }}>KOMINICTVÍ </span>
            <span style={{ background: "linear-gradient(135deg,#E8650A,#FF8C42,#C9A96E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>ŠTĚSTÍ</span>
          </div>
          <div style={{
            fontFamily: "var(--font-ui, sans-serif)",
            fontSize: "0.52rem", letterSpacing: "0.45em",
            color: "rgba(232,101,10,0.55)", textTransform: "uppercase",
            marginTop: "0.3rem",
            opacity: phase >= 3 ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}>
            Tomáš Baran — Mladá Boleslav
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ maxWidth: 300, margin: "0 auto", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <div style={{ height: 1, background: "rgba(255,255,255,0.06)", position: "relative", overflow: "hidden" }}>
            <div style={{
              position: "absolute", left: 0, top: 0, bottom: 0,
              width: `${progress}%`,
              background: "linear-gradient(90deg, #E8650A, #FF8C42)",
              boxShadow: "0 0 10px rgba(232,101,10,0.8)",
              transition: "width 0.1s linear",
            }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "var(--font-ui,sans-serif)", fontSize: "0.5rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>
              {phase >= 4 ? "✓ Připraveno" : "Načítání..."}
            </span>
            <span style={{ fontFamily: "var(--font-ui,sans-serif)", fontSize: "0.5rem", letterSpacing: "0.2em", color: "rgba(232,101,10,0.5)" }}>{progress}%</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes svgSmoke {
          0% { transform: translateY(0) scale(0.5); opacity: 0.5; }
          50% { opacity: 0.3; }
          100% { transform: translateY(-50px) translateX(8px) scale(4); opacity: 0; }
        }
        @keyframes loaderGlow {
          0%,100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        @keyframes sparkFloat {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-30px) translateX(5px) scale(0.3); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
