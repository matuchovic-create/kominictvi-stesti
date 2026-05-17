"use client";
import { useEffect, useRef, useState } from "react";

function CountUp({ target, suffix = "" }: { target: number | string; suffix?: string }) {
  const [val, setVal] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (typeof target === "string") { setVal(target); return; }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const dur = 1800;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setVal(Math.floor(ease * target).toString());
          if (p < 1) requestAnimationFrame(tick);
          else setVal(target.toString());
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  return <div ref={ref}>{val}{suffix}</div>;
}

export default function About() {
  return (
    <section id="o-nas" style={{ background: "var(--carbon)", padding: "9rem clamp(1.5rem,5vw,5rem)", position: "relative", overflow: "hidden" }}>
      <style>{`
        @keyframes aboutGlow {
          0%,100% { box-shadow: 0 0 20px rgba(232,101,10,0.15), inset 0 0 20px rgba(232,101,10,0.05); }
          50%      { box-shadow: 0 0 50px rgba(232,101,10,0.35), inset 0 0 40px rgba(232,101,10,0.12); }
        }
        @keyframes emberDrift {
          0%   { transform: translateY(0px) translateX(0px) scale(1); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.6; }
          100% { transform: translateY(-120px) translateX(30px) scale(0.3); opacity: 0; }
        }
        @keyframes emberDrift2 {
          0%   { transform: translateY(0px) translateX(0px) scale(1); opacity: 0; }
          10%  { opacity: 0.8; }
          90%  { opacity: 0.4; }
          100% { transform: translateY(-90px) translateX(-25px) scale(0.2); opacity: 0; }
        }
        @keyframes statPulse {
          0%,100% { text-shadow: 0 0 8px rgba(232,101,10,0.4); }
          50%      { text-shadow: 0 0 20px rgba(232,101,10,0.9), 0 0 40px rgba(232,101,10,0.4); }
        }
        @keyframes lineExpand {
          from { width: 0; opacity: 0; }
          to   { width: 48px; opacity: 1; }
        }
        @keyframes titleReveal {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .about-stat-num { animation: statPulse 2.5s ease-in-out infinite; }
        .about-glow-ring { animation: aboutGlow 3s ease-in-out infinite; }
        .ember-1 { position: absolute; width: 4px; height: 4px; border-radius: 50%; background: #FF8C42; animation: emberDrift 3s 0.5s ease-out infinite; }
        .ember-2 { position: absolute; width: 3px; height: 3px; border-radius: 50%; background: #E8650A; animation: emberDrift2 3.5s 1.2s ease-out infinite; }
        .ember-3 { position: absolute; width: 2px; height: 2px; border-radius: 50%; background: #FFD166; animation: emberDrift 2.8s 2s ease-out infinite; }
        .ember-4 { position: absolute; width: 3px; height: 3px; border-radius: 50%; background: #FF4500; animation: emberDrift2 4s 0.8s ease-out infinite; }
        .ember-5 { position: absolute; width: 2px; height: 2px; border-radius: 50%; background: #FF8C42; animation: emberDrift 3.2s 1.8s ease-out infinite; }
        @media(max-width:900px){.about-grid{grid-template-columns:1fr!important;gap:3rem!important}}
      `}</style>

      {/* Background glow */}
      <div style={{ position: "absolute", right: -100, top: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,101,10,0.06), transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", left: -50, bottom: -50, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,101,10,0.04), transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7rem", alignItems: "center" }} className="about-grid">

          <div className="reveal">
            <div className="section-label" style={{ marginBottom: "1.8rem" }}>O nás</div>
            <h2 className="display-title" style={{ fontSize: "clamp(2.8rem,5vw,5rem)", marginBottom: "1.5rem" }}>
              Kominictví<br />jako <em>umění</em>
            </h2>
            <div style={{ width: 48, height: 1, background: "linear-gradient(90deg, var(--ember), transparent)", marginBottom: "2rem", animation: "lineExpand 1s 0.5s ease-out both" }} />
            <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.9rem", lineHeight: 1.9, color: "var(--text-secondary)", fontWeight: 300 }}>
              Jsme Kominictví Štěstí — Tomáš Baran. Specializujeme se na komplexní služby v oblasti komínů a kouřovodů, včetně jejich čištění, revizí a oprav. Přinášíme štěstí našim zákazníkům tím, že se staráme o jejich bezpečí a pohodlí.
            </p>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.9rem", lineHeight: 1.9, color: "var(--text-secondary)", fontWeight: 300, marginTop: "1rem" }}>
              Působíme po celém Středočeském a Libereckém kraji. Jsme hrdými členy Moravského kominického společenstva — zárukou odbornosti, kvality a dodržování legislativních požadavků.
            </p>

            <div style={{ display: "flex", gap: "3rem", marginTop: "3.5rem", paddingTop: "2.5rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              {[
                { num: 100, suffix: "%", label: "spokojených zákazníků" },
                { num: "5★", suffix: "", label: "hodnocení Google" },
                { num: "MKS", suffix: "", label: "člen společenstva" }
              ].map((s, i) => (
                <div key={i} style={{ position: "relative" }}>
                  <div className="about-stat-num" style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.2rem", fontWeight: 500, color: "var(--ember)", lineHeight: 1 }}>
                    {typeof s.num === "number"
                      ? <CountUp target={s.num} suffix={s.suffix} />
                      : s.num}
                  </div>
                  <div style={{ fontFamily: "var(--font-ui)", fontSize: "0.6rem", letterSpacing: "0.25em", color: "var(--text-muted)", textTransform: "uppercase", marginTop: "0.4rem" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal reveal-delay-2" style={{ position: "relative", height: 480, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {[
              { size: 420, color: "rgba(232,101,10,0.05)", dur: "30s", rev: false },
              { size: 310, color: "rgba(232,101,10,0.09)", dur: "20s", rev: true },
              { size: 210, color: "rgba(232,101,10,0.14)", dur: "13s", rev: false },
            ].map((r, i) => (
              <div key={i} className={r.rev ? "rotate-slow-reverse" : "rotate-slow"}
                style={{ position: "absolute", width: r.size, height: r.size, borderRadius: "50%", border: `1px solid ${r.color}`, "--dur": r.dur } as React.CSSProperties}
              />
            ))}

            {/* Ember particles */}
            <div className="ember-1" style={{ bottom: "35%", left: "45%" }} />
            <div className="ember-2" style={{ bottom: "38%", left: "52%" }} />
            <div className="ember-3" style={{ bottom: "33%", left: "48%" }} />
            <div className="ember-4" style={{ bottom: "40%", left: "42%" }} />
            <div className="ember-5" style={{ bottom: "36%", left: "55%" }} />

            {/* MKS center */}
            <div className="about-glow-ring" style={{ width: 180, height: 180, borderRadius: "50%", background: "linear-gradient(135deg, rgba(232,101,10,0.18), rgba(201,169,110,0.08))", border: "1px solid rgba(232,101,10,0.35)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", zIndex: 2 }}>
              <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.3rem", fontWeight: 600, color: "var(--ember)", lineHeight: 1.2, textShadow: "0 0 15px rgba(232,101,10,0.6)" }}>MKS</div>
              <div style={{ fontFamily: "var(--font-ui)", fontSize: "0.48rem", letterSpacing: "0.2em", color: "var(--text-muted)", textTransform: "uppercase", marginTop: "0.4rem", padding: "0 1rem" }}>Člen kominického společenstva</div>
            </div>

            {[
              { label: "Mladá Boleslav", sub: "& Liberecký kraj", top: 55, right: 28, dur: "7s", delay: "0s" },
              { label: "24/7", sub: "Pohotovost", bottom: 70, left: 15, dur: "9s", delay: "2s" },
            ].map((b, i) => (
              <div key={i} className="float-card"
                style={{ position: "absolute", top: b.top, bottom: b.bottom, right: b.right, left: b.left, "--dur": b.dur, "--delay": b.delay, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(20px)", padding: "1rem 1.5rem", textAlign: "center" } as React.CSSProperties}
              >
                <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.2rem", fontWeight: 500, color: "var(--ember)" }}>{b.label}</div>
                <div style={{ fontFamily: "var(--font-ui)", fontSize: "0.52rem", letterSpacing: "0.2em", color: "var(--text-muted)", textTransform: "uppercase", marginTop: "0.2rem" }}>{b.sub}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
