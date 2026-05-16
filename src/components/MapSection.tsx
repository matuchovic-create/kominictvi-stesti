"use client";
import { useEffect, useRef, useState } from "react";

export default function MapSection() {
  const [loaded, setLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setLoaded(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const address = "U+Kasaren+1379,+293+01+Mlada+Boleslav";
  const mapSrc = `https://maps.google.com/maps?q=${address}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div ref={sectionRef} style={{ position: "relative", background: "var(--black)" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent 0%, rgba(232,101,10,0.6) 50%, transparent 100%)", zIndex: 2 }} />
      <div style={{ position: "relative", zIndex: 3, display: "flex", justifyContent: "space-between", alignItems: "stretch", background: "rgba(8,8,8,0.96)", backdropFilter: "blur(24px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ padding: "2.5rem clamp(1.5rem,5vw,5rem)", display: "flex", alignItems: "center", gap: "2rem", flex: 1 }}>
          <div style={{ width: 52, height: 52, minWidth: 52, border: "1px solid rgba(232,101,10,0.3)", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(232,101,10,0.06)", flexShrink: 0 }}>
            <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, stroke: "var(--ember)", fill: "none", strokeWidth: 1.5 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: "0.58rem", letterSpacing: "0.45em", color: "var(--ember)", textTransform: "uppercase", marginBottom: "0.4rem" }}>Naše sídlo</div>
            <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.1rem,2vw,1.4rem)", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.3 }}>U Kasáren 1379, 293 01 Mladá Boleslav</div>
          </div>
        </div>
        <div style={{ width: 1, background: "rgba(255,255,255,0.05)", flexShrink: 0 }} />
        <div style={{ padding: "2.5rem clamp(1.5rem,3vw,3rem)", display: "flex", alignItems: "center" }}>
          <a href="https://maps.google.com/?q=U+Kasaren+1379,+293+01+Mlada+Boleslav" target="_blank" rel="noopener noreferrer" className="btn-primary"><span>Navigovat →</span></a>
        </div>
      </div>
      <div style={{ position: "relative", height: "500px", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "30%", zIndex: 2, pointerEvents: "none", background: "linear-gradient(180deg, rgba(8,8,8,0.7) 0%, transparent 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "25%", zIndex: 2, pointerEvents: "none", background: "linear-gradient(0deg, rgba(8,8,8,0.85) 0%, transparent 100%)" }} />
        <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "15%", zIndex: 2, pointerEvents: "none", background: "linear-gradient(90deg, rgba(8,8,8,0.6) 0%, transparent 100%)" }} />
        <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "15%", zIndex: 2, pointerEvents: "none", background: "linear-gradient(270deg, rgba(8,8,8,0.6) 0%, transparent 100%)" }} />
        <div style={{ position: "absolute", top: "1.5rem", right: "1.5rem", zIndex: 3, padding: "0.6rem 1rem", background: "rgba(8,8,8,0.85)", backdropFilter: "blur(16px)", border: "1px solid rgba(232,101,10,0.2)", display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--ember)", boxShadow: "0 0 8px var(--ember)", animation: "pulsePin 2s ease-in-out infinite" }} />
          <span style={{ fontFamily: "var(--font-ui)", fontSize: "0.6rem", letterSpacing: "0.3em", color: "var(--text-secondary)", textTransform: "uppercase" }}>Mladá Boleslav</span>
        </div>
        {loaded ? (
          <iframe src={mapSrc} width="100%" height="100%" style={{ border: 0, filter: "grayscale(100%) invert(92%) hue-rotate(180deg) brightness(0.85) contrast(0.95) saturate(0.3)", display: "block" }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Kominictví Štěstí — Mladá Boleslav" />
        ) : (
          <div style={{ width: "100%", height: "100%", background: "var(--carbon)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: "0.7rem", letterSpacing: "0.3em", color: "var(--text-muted)", textTransform: "uppercase" }}>Načítání mapy…</div>
          </div>
        )}
      </div>
      <div style={{ display: "flex", borderTop: "1px solid rgba(255,255,255,0.04)", background: "rgba(8,8,8,0.98)" }}>
        {[
          { icon: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.95 9.61a19.79 19.79 0 0 1-3.07-8.68A2 2 0 0 1 2.86 1h3a2 2 0 0 1 2 1.72A12 12 0 0 0 9.13 6.5a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12 12 0 0 0 2.78.65A2 2 0 0 1 22 16.92Z", label: "Telefon", value: "+420 778 098 717", href: "tel:+420778098717" },
          { icon: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM12 6v6l4 2", label: "Provoz", value: "Po–Pá 7:00–18:00", href: undefined },
          { icon: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0ZM12 10a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z", label: "Sídlo", value: "Mladá Boleslav", href: undefined },
          { icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2ZM22 6l-10 7L2 6", label: "E-mail", value: "Kominicektom@email.cz", href: "mailto:Kominicektom@email.cz" },
        ].map((item, i) => (
          <div key={i} style={{ flex: 1, padding: "1.6rem 1.5rem", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none", display: "flex", alignItems: "center", gap: "1rem", transition: "background 0.3s", cursor: "default" }} onMouseOver={e => (e.currentTarget as HTMLElement).style.background = "rgba(232,101,10,0.03)"} onMouseOut={e => (e.currentTarget as HTMLElement).style.background = "transparent"}>
            <div style={{ width: 34, height: 34, minWidth: 34, border: "1px solid rgba(232,101,10,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg viewBox="0 0 24 24" style={{ width: 14, height: 14, stroke: "var(--ember)", fill: "none", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" }}>{item.icon.split("M").filter(Boolean).map((d,j) => <path key={j} d={"M"+d} />)}</svg>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-ui)", fontSize: "0.52rem", letterSpacing: "0.38em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "0.2rem" }}>{item.label}</div>
              {item.href ? <a href={item.href} style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem", fontWeight: 400, color: "var(--text-secondary)", textDecoration: "none" }}>{item.value}</a> : <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem", fontWeight: 400, color: "var(--text-secondary)" }}>{item.value}</div>}
            </div>
          </div>
        ))}
      </div>
      <style>{`@keyframes pulsePin { 0%,100%{opacity:1;transform:scale(1);box-shadow:0 0 8px var(--ember)} 50%{opacity:0.6;transform:scale(1.4);box-shadow:0 0 16px var(--ember)} } @media(max-width:600px){.map-strip>div:nth-child(3),.map-strip>div:nth-child(4){display:none!important}}`}</style>
    </div>
  );
}
