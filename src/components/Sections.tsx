"use client";
import { useEffect, useRef, useState } from "react";

export function WhyUs() {
  const items = [
    { num: "01", title: "Člen MKS", text: "Jsme hrdými členy Moravského kominického společenstva, které dbá na vysoký standard řemesla. Zárukou odbornosti a kvality." },
    { num: "02", title: "Certifikované služby", text: "Veškeré práce provádíme dle platných ČSN norem. Revizní zprávy a dokumentace jsou vydávány řádně a včas." },
    { num: "03", title: "Zkušenosti v oboru", text: "Kominictví patří mezi nejstarší řemesla. My v něm pokračujeme s úctou k tradici a využitím moderních technologií." },
    { num: "04", title: "Pojistná odpovědnost", text: "Veškeré naše práce jsou pojištěny. V případě jakékoli škody jsou vaše zájmy plně chráněny. Pracujeme odpovědně." },
    { num: "05", title: "Rychlý výjezd", text: "Působíme po celém Středočeském a Libereckém kraji. Přijedeme rychle — svěřte svůj komín do rukou odborníků!" },
    { num: "06", title: "Komplexní přístup", text: "Od čištění přes revize až po instalaci nových komínů. Vše pod jednou střechou, s maximální péčí o zákazníka." },
  ];
  return (
    <section id="proc-my" style={{ background: "var(--anthracite)", padding: "9rem clamp(1.5rem,5vw,5rem)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4.5rem", flexWrap: "wrap", gap: "2rem" }}>
          <div className="reveal">
            <div className="section-label" style={{ marginBottom: "1.5rem" }}>Naše silné stránky</div>
            <h2 className="display-title" style={{ fontSize: "clamp(2.8rem,5vw,5rem)" }}>
              Proč nás volí<br /><em>stovky</em> zákazníků
            </h2>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "rgba(255,255,255,0.04)" }} className="why-grid-inner">
          {items.map((item, i) => (
            <div key={item.num} className={`why-card reveal reveal-delay-${(i%3)+1}`} style={{ background: "var(--anthracite)" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg,transparent,rgba(232,101,10,0.3),transparent)", opacity: 0, transition: "opacity 0.4s" }} className="why-top-line" />
              <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "3rem", fontWeight: 300, color: "rgba(232,101,10,0.15)", lineHeight: 1, marginBottom: "1.5rem" }}>{item.num}</div>
              <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.4rem", fontWeight: 400, color: "var(--text-primary)", marginBottom: "1rem" }}>{item.title}</div>
              <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.8rem", lineHeight: 1.85, color: "var(--text-secondary)", fontWeight: 300 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media(max-width:900px){.why-grid-inner{grid-template-columns:1fr!important}}
        .why-card:hover .why-top-line{opacity:1!important}
      `}</style>
    </section>
  );
}

const steps = [
  { num: "1", title: "Kontaktujte nás", text: "Zavolejte na +420 778 098 717 nebo napište. Tomáš Baran vám poradí a domluvíme vhodný termín výjezdu.", icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" },
  { num: "2", title: "Prohlídka a nabídka", text: "Přijedeme přesně v domluvený čas, prověříme stav komínu a sdělíme jasné doporučení s cenovou nabídkou předem.", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" },
  { num: "3", title: "Odborné provedení", text: "Provádíme čištění, revize, opravy i instalace s maximální pečlivostí. Po práci vždy dokonale uklidíme.", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
  { num: "4", title: "Dokumentace a klid", text: "Obdržíte kompletní revizní zprávu a dokumentaci dle platných norem. Váš komín je bezpečný na roky dopředu.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
];

function StepItem({ step, index, isVisible }: { step: typeof steps[0]; index: number; isVisible: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", gap: "3rem", paddingBottom: "4rem",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateX(0)" : "translateX(-40px)",
        transition: `opacity 0.7s ${index * 0.2}s ease, transform 0.7s ${index * 0.2}s cubic-bezier(0.16,1,0.3,1)`,
        cursor: "default",
      }}
    >
      {/* Number bubble */}
      <div style={{ position: "relative", flexShrink: 0 }}>
        <div style={{
          width: 48, height: 48, borderRadius: "50%",
          border: `1px solid ${hovered ? "rgba(232,101,10,0.9)" : "rgba(232,101,10,0.4)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-cormorant)", fontSize: "1.1rem", fontWeight: 600,
          color: "var(--ember)", background: hovered ? "rgba(232,101,10,0.12)" : "var(--black)",
          zIndex: 1, position: "relative",
          boxShadow: hovered ? "0 0 20px rgba(232,101,10,0.4), 0 0 40px rgba(232,101,10,0.2)" : "none",
          transition: "all 0.4s ease",
        }}>
          {step.num}
        </div>
        {/* Pulse ring on hover */}
        {hovered && (
          <div style={{
            position: "absolute", inset: -8, borderRadius: "50%",
            border: "1px solid rgba(232,101,10,0.3)",
            animation: "stepPulse 1s ease-out infinite",
          }} />
        )}
      </div>

      {/* Content */}
      <div style={{ paddingTop: "0.4rem", flex: 1 }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.8rem",
        }}>
          {/* Icon */}
          <div style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "scale(1) rotate(0deg)" : "scale(0.5) rotate(-20deg)",
            transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
            filter: "drop-shadow(0 0 6px rgba(232,101,10,0.6))",
          }}>
            <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, stroke: "var(--ember)", fill: "none", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" }}>
              {step.icon.split("M").filter(Boolean).map((d, j) => <path key={j} d={"M" + d} />)}
            </svg>
          </div>

          <div style={{
            fontFamily: "var(--font-cormorant)", fontSize: "1.7rem", fontWeight: 400,
            color: hovered ? "#fff" : "var(--text-primary)",
            transition: "color 0.3s ease",
            textShadow: hovered ? "0 0 30px rgba(232,101,10,0.3)" : "none",
          }}>
            {step.title}
          </div>
        </div>

        {/* Animated underline */}
        <div style={{
          height: 1,
          background: "linear-gradient(90deg, var(--ember), transparent)",
          width: hovered ? "100%" : "0%",
          transition: "width 0.5s cubic-bezier(0.16,1,0.3,1)",
          marginBottom: "0.9rem",
        }} />

        <p style={{
          fontFamily: "var(--font-ui)", fontSize: "0.85rem", lineHeight: 1.9,
          color: hovered ? "rgba(255,255,255,0.7)" : "var(--text-secondary)",
          fontWeight: 300, maxWidth: 560,
          transition: "color 0.3s ease",
        }}>
          {step.text}
        </p>

        {/* Ember sparks on hover */}
        {hovered && (
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
            {[...Array(3)].map((_, i) => (
              <div key={i} style={{
                width: 4, height: 4, borderRadius: "50%",
                background: i === 1 ? "#FFD166" : "var(--ember)",
                animation: `sparkFloat 1.2s ${i * 0.2}s ease-out infinite`,
                boxShadow: "0 0 6px rgba(232,101,10,0.8)",
              }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function Steps() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVisible(true);
        // Animate line growing
        let h = 0;
        const target = 85;
        const tick = () => {
          h = Math.min(h + 1.2, target);
          setLineHeight(h);
          if (h < target) requestAnimationFrame(tick);
        };
        setTimeout(() => requestAnimationFrame(tick), 300);
      }
    }, { threshold: 0.2 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="postup" style={{ background: "var(--black)", padding: "9rem clamp(1.5rem,5vw,5rem)", position: "relative", overflow: "hidden" }}>
      <style>{`
        @keyframes stepPulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes sparkFloat {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-16px) scale(0.3); opacity: 0; }
        }
        @keyframes lineGlow {
          0%,100% { box-shadow: 0 0 4px rgba(232,101,10,0.4); }
          50% { box-shadow: 0 0 12px rgba(232,101,10,0.8), 0 0 24px rgba(232,101,10,0.4); }
        }
        @keyframes ambientDrift {
          0% { transform: translateY(0) translateX(0) scale(1); opacity: 0.04; }
          50% { transform: translateY(-30px) translateX(15px) scale(1.1); opacity: 0.07; }
          100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.04; }
        }
      `}</style>

      {/* Ambient background blobs */}
      <div style={{ position: "absolute", left: "60%", top: "20%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,101,10,1), transparent 70%)", animation: "ambientDrift 8s ease-in-out infinite", pointerEvents: "none" }} />
      <div style={{ position: "absolute", left: "10%", bottom: "15%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,101,10,1), transparent 70%)", animation: "ambientDrift 11s 2s ease-in-out infinite", pointerEvents: "none" }} />

      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{
          marginBottom: "5rem",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}>
          <div className="section-label" style={{ marginBottom: "1.5rem" }}>Postup spolupráce</div>
          <h2 className="display-title" style={{ fontSize: "clamp(2.8rem,5vw,5rem)" }}>
            Jednoduše, rychle<br />a <em>bezpečně</em>
          </h2>
        </div>

        <div style={{ position: "relative" }}>
          {/* Animated vertical line */}
          <div style={{
            position: "absolute", left: 23, top: 0,
            width: 1,
            height: `${lineHeight}%`,
            background: "linear-gradient(180deg, #FF8C42 0%, rgba(232,101,10,0.6) 60%, rgba(232,101,10,0.1) 100%)",
            animation: lineHeight > 10 ? "lineGlow 2s ease-in-out infinite" : "none",
            transition: "height 0.05s linear",
            zIndex: 0,
          }} />

          {/* Fire dot at line top */}
          {lineHeight > 5 && (
            <div style={{
              position: "absolute", left: 19, top: `calc(${lineHeight}% - 4px)`,
              width: 8, height: 8, borderRadius: "50%",
              background: "#FF8C42",
              boxShadow: "0 0 8px #FF8C42, 0 0 16px rgba(232,101,10,0.6)",
              zIndex: 2,
              transition: "top 0.05s linear",
            }} />
          )}

          {steps.map((s, i) => (
            <StepItem key={s.num} step={s} index={i} isVisible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}


const reviews = [
  { text: "Naprostá profesionalita a spolehlivost. Tomáš přijel přesně, odvedl precizní práci a zanechal vše v naprostém pořádku. Revizní zprávu doručil hned druhý den!", author: "Martin K.", location: "Mladá Boleslav" },
  { text: "Třetím rokem využíváme služby Kominictví Štěstí. Vždy přesní, vždy spolehliví, vždy s úsměvem. Kvalita práce za férovou cenu — víc si přát nelze.", author: "Jana N.", location: "Liberec" },
  { text: "Urgentní výjezd, trhliny v komínu. Tomáš přijel do hodiny, problém vyřešil okamžitě. Díky němu jsme mohli dál bezpečně topit. Zachránce v pravém slova smyslu!", author: "Tomáš B.", location: "Mnichovo Hradiště" },
  { text: "Konečně kominík, na kterého se dá spolehnout. Přijde přesně, pracuje precizně, po sobě uklidí. Sousedé se ptají koho doporučit — jednohlasně říkám Štěstí.", author: "Petra H.", location: "Mladá Boleslav" },
  { text: "Vložkování komínu provedeno naprosto dokonale. Pojišťovna ocenila perfektní dokumentaci. Profesionální přístup od prvního kontaktu až po předání zprávy.", author: "Radek M.", location: "Nymburk" },
  { text: "Servisní smlouva pro náš penzion — nejlepší rozhodnutí. Vždy přijdou, vždy odvádí špičkovou práci. Hosté ani netuší, že za naším klidem stojí Kominictví Štěstí.", author: "Miroslav Š.", location: "Jičín" },
];

export function Reviews() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) { canvas.width = rect.width; canvas.height = rect.height; }
    };
    resize();
    window.addEventListener("resize", resize);

    const COLORS = ["#FF8C42","#E8650A","#FFD166","#FF4500"];
    const particles: any[] = [];

    const makeParticle = (type: string) => ({
      type, x: Math.random() * canvas.width, y: canvas.height + 10,
      size: type === "ember" ? Math.random() * 2.5 + 1 : Math.random() * 20 + 8,
      speedY: type === "ember" ? Math.random() * 1.2 + 0.4 : Math.random() * 0.4 + 0.15,
      speedX: (Math.random() - 0.5) * 0.6,
      life: 0, maxLife: type === "ember" ? Math.random() * 180 + 120 : Math.random() * 200 + 150,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    });

    for (let i = 0; i < 18; i++) { const p = makeParticle("ember"); p.y = Math.random() * canvas.height; p.life = Math.random() * p.maxLife; particles.push(p); }
    for (let i = 0; i < 12; i++) { const p = makeParticle("smoke"); p.y = Math.random() * canvas.height; p.life = Math.random() * p.maxLife; particles.push(p); }

    let raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.speedX + Math.sin(p.life * 0.03) * 0.3;
        p.y -= p.speedY;
        p.life++;
        if (p.life > p.maxLife || p.y < -20) {
          p.x = Math.random() * canvas.width; p.y = canvas.height + 10;
          p.size = p.type === "ember" ? Math.random() * 2.5 + 1 : Math.random() * 20 + 8;
          p.speedY = p.type === "ember" ? Math.random() * 1.2 + 0.4 : Math.random() * 0.4 + 0.15;
          p.life = 0; p.maxLife = p.type === "ember" ? Math.random() * 180 + 120 : Math.random() * 200 + 150;
          p.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        }
        const t = p.life / p.maxLife;
        if (p.type === "ember") {
          const alpha = t < 0.2 ? t / 0.2 : (1 - t);
          ctx.beginPath(); ctx.arc(p.x, p.y, p.size * (1 - t * 0.3), 0, Math.PI * 2);
          ctx.fillStyle = p.color + Math.floor(alpha * 200).toString(16).padStart(2, "0"); ctx.fill();
          ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = p.color + Math.floor(alpha * 40).toString(16).padStart(2, "0"); ctx.fill();
        } else {
          const alpha = t < 0.15 ? t / 0.15 : (1 - t);
          p.size += 0.08;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(80,40,20,${alpha * 0.12})`; ctx.fill();
        }
      }
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <section id="reference" style={{ background: "var(--carbon)", padding: "9rem clamp(1.5rem,5vw,5rem)", position: "relative", overflow: "hidden" }}>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }} />
      <style>{`
        .rev-card {
          background: rgba(12,6,3,0.88);
          border: 1px solid rgba(232,101,10,0.2);
          padding: 2.8rem;
          position: relative;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.16,1,0.3,1);
          cursor: default;
          backdrop-filter: blur(8px);
        }
        .rev-card::after {
          content: "";
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(232,101,10,0.7), transparent);
          transform: scaleX(0);
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .rev-card:hover { border-color: rgba(232,101,10,0.5); transform: translateY(-8px); box-shadow: 0 24px 60px rgba(0,0,0,0.6), 0 0 50px rgba(232,101,10,0.08); }
        .rev-card:hover::after { transform: scaleX(1); }
        .rev-text { font-family: var(--font-cormorant); font-size: 1.08rem; line-height: 1.85; color: rgba(255,255,255,0.55); font-style: italic; font-weight: 300; transition: color 0.4s ease; position: relative; z-index: 1; margin: 0 0 1.2rem; }
        .rev-card:hover .rev-text { color: rgba(255,255,255,0.85); }
        .rev-quote { font-family: var(--font-cormorant); font-size: 7rem; color: rgba(232,101,10,0.06); position: absolute; top: 0.2rem; right: 1.5rem; line-height: 1; font-weight: 300; pointer-events: none; transition: color 0.4s ease; }
        .rev-card:hover .rev-quote { color: rgba(232,101,10,0.2); }
        .rev-author { font-family: var(--font-ui); font-size: 0.8rem; font-weight: 600; color: var(--text-primary); letter-spacing: 0.05em; }
        .rev-location { font-family: var(--font-ui); font-size: 0.58rem; letter-spacing: 0.22em; color: var(--ember); text-transform: uppercase; margin-top: 0.3rem; }
        .rev-divider { height: 1px; background: linear-gradient(90deg, rgba(232,101,10,0.3), transparent); margin: 1.2rem 0; transition: background 0.4s ease; }
        .rev-card:hover .rev-divider { background: linear-gradient(90deg, rgba(232,101,10,0.7), transparent); }
        .rev-stars { display: flex; gap: 4px; margin-bottom: 1.4rem; }
        .rev-star { width: 11px; height: 11px; background: var(--ember); clip-path: polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%); transition: transform 0.3s ease, filter 0.3s ease; }
        .rev-card:hover .rev-star { filter: drop-shadow(0 0 4px rgba(232,101,10,0.9)); transform: scale(1.2); }
        @media(max-width:900px){.reviews-inner{grid-template-columns:1fr!important}}
      `}</style>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4.5rem", flexWrap: "wrap", gap: "2rem" }}>
          <div className="reveal">
            <div className="section-label" style={{ marginBottom: "1.5rem" }}>Reference klientů</div>
            <h2 className="display-title" style={{ fontSize: "clamp(2.8rem,5vw,5rem)" }}>
              Co říkají<br />naši <em>zákazníci</em>
            </h2>
          </div>
          <div className="reveal reveal-delay-2" style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1.2rem 2rem", border: "1px solid rgba(232,101,10,0.2)", background: "rgba(232,101,10,0.04)" }}>
            <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.5rem", fontWeight: 600, color: "var(--ember)" }}>5.0</div>
            <div>
              <div style={{ display: "flex", gap: 3 }}>
                {Array(5).fill(0).map((_,i) => <div key={i} style={{ width: 10, height: 10, background: "var(--ember)", clipPath: "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)" }} />)}
              </div>
              <div style={{ fontFamily: "var(--font-ui)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--text-muted)", textTransform: "uppercase", marginTop: "0.3rem" }}>Google Reviews</div>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }} className="reviews-inner">
          {reviews.map((r, i) => (
            <div key={i} className={`rev-card reveal reveal-delay-${(i%3)+1}`}>
              <div className="rev-quote">"</div>
              <div className="rev-stars">
                {Array(5).fill(0).map((_,j) => <div key={j} className="rev-star" />)}
              </div>
              <p className="rev-text">&#8220;{r.text}&#8221;</p>
              <div className="rev-divider" />
              <div className="rev-author">{r.author}</div>
              <div className="rev-location">{r.location}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


const gallery = [
  { src: "/gallery/photo-1.jpg", span: true },
  { src: "/gallery/photo-2.jpg", span: false },
  { src: "/gallery/photo-3.jpg", span: false },
  { src: "/gallery/photo-4.jpg", span: false },
  { src: "/gallery/photo-5.jpg", span: false },
  { src: "/gallery/photo-6.jpg", span: true },
  { src: "/gallery/photo-7.jpg", span: false },
  { src: "/gallery/photo-8.jpg", span: false },
  { src: "/gallery/photo-9.jpg", span: false },
  { src: "/gallery/photo-10.jpg", span: false },
  { src: "/gallery/photo-11.jpg", span: true },
  { src: "/gallery/photo-12.jpg", span: false },
  { src: "/gallery/photo-13.jpg", span: false },
  { src: "/gallery/photo-14.jpg", span: false },
  { src: "/gallery/photo-15.jpg", span: false },
  { src: "/gallery/photo-16.jpg", span: true },
  { src: "/gallery/photo-17.jpg", span: false },
  { src: "/gallery/photo-18.jpg", span: false },
  { src: "/gallery/photo-19.jpg", span: false },
  { src: "/gallery/photo-20.jpg", span: false },
  { src: "/gallery/photo-21.jpg", span: true },
  { src: "/gallery/photo-22.jpg", span: false },
  { src: "/gallery/photo-23.jpg", span: false },
  { src: "/gallery/photo-24.jpg", span: false },
  { src: "/gallery/photo-25.jpg", span: false },
  { src: "/gallery/photo-26.jpg", span: true },
  { src: "/gallery/photo-27.jpg", span: false },
  { src: "/gallery/photo-28.jpg", span: false },
  { src: "/gallery/photo-29.jpg", span: false },
  { src: "/gallery/photo-30.jpg", span: false },
  { src: "/gallery/photo-31.jpg", span: true },
  { src: "/gallery/photo-32.jpg", span: false },
];

export function Gallery() {
  return (
    <section id="galerie" style={{ background: "var(--carbon)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "9rem clamp(1.5rem,5vw,5rem) 3rem" }}>
        <div className="reveal" style={{ marginBottom: "3rem" }}>
          <div className="section-label" style={{ marginBottom: "1.5rem" }}>Naše práce</div>
          <h2 className="display-title" style={{ fontSize: "clamp(2.8rem,5vw,5rem)" }}>
            Realizované<br /><em>projekty</em>
          </h2>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }} className="gal-grid">
        {gallery.map((item, i) => (
          <div key={i} className="gallery-item" style={{ gridColumn: item.span ? "span 2" : "span 1" }}>
            <div className="gallery-inner-wrap" style={{ paddingBottom: item.span ? "44%" : "68%", background: "#111" }}>
              <img src={item.src} alt={item.src} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div className="gallery-overlay">
                <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem", color: "#fff", letterSpacing: "0.05em" }}>{""}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>{`@media(max-width:700px){.gal-grid{grid-template-columns:1fr!important} .gallery-item{grid-column:span 1!important}}`}</style>
    </section>
  );
}

export function Certs() {
  const certs = [
    { label: "Moravské kominické\nspolečenstvo", path: "M24 4l4 8h8l-6 5 2 8-8-5-8 5 2-8-6-5h8ZM24 24a8 8 0 1 0 0 16 8 8 0 0 0 0-16ZM21 32l2 2 5-5" },
    { label: "Živnostenský\nlist ČR", path: "M8 12h32v24a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2zM8 20h32M17 12v-5M31 12v-5" },
    { label: "Pojistná\nodpovědnost", path: "M24 4C14 4 6 12 6 22s8 18 18 18 18-8 18-18S34 4 24 4ZM17 22l5 5 9-9" },
    { label: "ČSN EN 13384\nNormy komínů", path: "M24 4l3 7h7l-6 4 2 7-6-4-6 4 2-7-6-4h7ZM24 32a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM20 41l3 3 6-6" },
    { label: "Revizní technik\noprávnění", path: "M10 6h28v32a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2zM17 16h14M17 22h14M17 28h8M30 25l7 7-2 2-7-7" },
  ];
  return (
    <section id="certifikace" style={{ background: "var(--black)", padding: "7rem clamp(1.5rem,5vw,5rem)", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="reveal" style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div className="section-label" style={{ justifyContent: "center", marginBottom: "1.5rem" }}>Naše certifikace</div>
          <h2 className="display-title" style={{ fontSize: "clamp(2.5rem,4vw,4rem)" }}>
            Kvalita ověřená <em>certifikáty</em>
          </h2>
        </div>
        <div style={{ display: "flex", gap: "1px", background: "rgba(255,255,255,0.04)", flexWrap: "wrap" }}>
          {certs.map((c, i) => (
            <div key={i} className={`cert-badge reveal reveal-delay-${(i%3)+1}`} style={{ flex: "1 1 160px", background: "var(--black)" }}>
              <svg viewBox="0 0 48 48" style={{ width: 40, height: 40, stroke: "var(--ember)", fill: "none", strokeWidth: 1.2, strokeLinecap: "round", strokeLinejoin: "round" }}>
                {c.path.split("M").filter(Boolean).map((d,j) => <path key={j} d={"M"+d} />)}
              </svg>
              <div style={{ fontFamily: "var(--font-ui)", fontSize: "0.62rem", letterSpacing: "0.2em", color: "var(--text-muted)", textTransform: "uppercase", textAlign: "center", whiteSpace: "pre-line", lineHeight: 1.6 }}>{c.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
