"use client";

const services = [
  { name: "Kontrola komínů", desc: "Odborná vizuální i kamerová kontrola dle platných norem ČSN. Detailní protokol o stavu průduchu.", icon: "M24 8A16 16 0 1 0 24 40A16 16 0 0 0 24 8ZM24 32a8 8 0 1 1 0-16 8 8 0 0 1 0 16ZM18 5l1.5 3M30 5l-1.5 3M6 18l3 1.5M39 18l-3 1.5" },
  { name: "Čištění komínů", desc: "Profesionální odstranění sazí, dehtu a usazenin. Maximální průchodnost a bezpečnost provozu.", icon: "M24 8v6M16 40c0-8 4-16 8-16s8 8 8 16M20 12c-5 2-8 8-8 14M28 12c5 2 8 8 8 14" },
  { name: "Revize komínů", desc: "Vydání revizní zprávy — povinný dokument pro pojišťovny a stavební úřady. Do 48 hodin.", icon: "M14 6h20a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2ZM18 16h12M18 22h12M18 28h7M32 30a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM30 27l1.5 1.5L34 25" },
  { name: "Vložkování", desc: "Instalace nerezových nebo flexibilních vložek. Moderní řešení pro bezpečný a efektivní odvod spalin.", icon: "M22 4h4v36h-4zM16 12c-4 2-6 7-6 11s2 9 6 11M32 12c4 2 6 7 6 11s-2 9-6 11M18 40h12" },
  { name: "Frézování", desc: "Mechanické frézování zatvrdlých nánosů. Účinná metoda pro obnovení průchodnosti průduchu.", icon: "M24 8a16 16 0 1 0 0 32A16 16 0 0 0 24 8ZM10 24h28M24 10v28M17 17l14 14M31 17L17 31" },
  { name: "Kontroly spotřebičů", desc: "Odborná revize plynových kotlů, krbů a kamen. Bezpečnost vašeho topení nade vše.", icon: "M10 16h28v20a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2zM20 16v-4a4 4 0 0 1 8 0v4M24 24a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM24 30v4" },
  { name: "Pohotovost 24/7", desc: "Nonstop havarijní servis. Zpětný hovor do 15 minut, výjezd do 2 hodin v oblasti Praha.", icon: "M12 22c0-7 5-13 12-13s12 6 12 13c0 5-3 9-7 11l-1 6H20l-1-6c-4-2-7-6-7-11ZM20 38h8M24 8v-4M8 22H4M44 22h-4M11 11L8 8M37 11l3-3" },
  { name: "Pravidelný servis", desc: "Smluvní servisní plán pro bytové domy, hotely a firmy. Plánované návštěvy bez starostí.", icon: "M8 36V16l16-8 16 8v20M8 36h32M18 36v-8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8" },
];

export default function Services() {
  return (
    <section id="sluzby" style={{ background: "var(--black)", padding: "9rem clamp(1.5rem,5vw,5rem)", position: "relative", overflow: "hidden" }}>
      <style>{`
        .svc-card {
          position: relative;
          padding: 2.8rem 2rem;
          border-right: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          cursor: pointer;
          overflow: hidden;
          transition: background 0.4s ease;
        }
        .svc-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(232,101,10,0.0) 0%, rgba(232,101,10,0.0) 100%);
          transition: background 0.4s ease;
          z-index: 0;
        }
        .svc-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border: 1px solid rgba(232,101,10,0);
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
          pointer-events: none;
          z-index: 1;
        }
        .svc-card:hover::before {
          background: linear-gradient(135deg, rgba(232,101,10,0.08) 0%, rgba(201,169,110,0.03) 100%);
        }
        .svc-card:hover::after {
          border-color: rgba(232,101,10,0.4);
          box-shadow: inset 0 0 30px rgba(232,101,10,0.06), 0 0 40px rgba(232,101,10,0.08);
        }
        .svc-card-inner {
          position: relative;
          z-index: 2;
        }
        .svc-icon {
          transition: transform 0.5s cubic-bezier(0.34,1.56,0.64,1), filter 0.4s ease;
          display: block;
        }
        .svc-card:hover .svc-icon {
          transform: scale(1.18) rotate(5deg);
          filter: drop-shadow(0 0 10px rgba(232,101,10,0.8)) drop-shadow(0 0 24px rgba(232,101,10,0.4));
        }
        .svc-num {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          font-family: var(--font-cormorant);
          font-size: 3.5rem;
          font-weight: 300;
          color: rgba(232,101,10,0.06);
          line-height: 1;
          transition: color 0.4s ease, transform 0.4s ease;
          z-index: 0;
        }
        .svc-card:hover .svc-num {
          color: rgba(232,101,10,0.18);
          transform: scale(1.1) translateY(-4px);
        }
        .svc-title {
          font-family: var(--font-cormorant);
          font-size: 1.3rem;
          font-weight: 400;
          color: var(--text-primary);
          margin-bottom: 0.8rem;
          line-height: 1.2;
          transition: color 0.3s ease;
        }
        .svc-card:hover .svc-title {
          color: #fff;
        }
        .svc-desc {
          font-family: var(--font-ui);
          font-size: 0.77rem;
          line-height: 1.8;
          color: var(--text-secondary);
          font-weight: 300;
          transition: color 0.3s ease;
        }
        .svc-card:hover .svc-desc {
          color: rgba(255,255,255,0.65);
        }
        .svc-line {
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, var(--ember), transparent);
          margin: 1.2rem 0;
          transition: width 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .svc-card:hover .svc-line {
          width: 40px;
        }
        .svc-arrow {
          font-family: var(--font-ui);
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          color: var(--ember);
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .svc-card:hover .svc-arrow {
          opacity: 1;
          transform: translateY(0);
        }
        .svc-glow {
          position: absolute;
          bottom: -40px;
          left: 50%;
          transform: translateX(-50%);
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(232,101,10,0.25), transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease, bottom 0.4s ease;
          pointer-events: none;
          z-index: 0;
        }
        .svc-card:hover .svc-glow {
          opacity: 1;
          bottom: -20px;
        }
        @media(max-width:1000px){#svc-grid{grid-template-columns:repeat(2,1fr)!important}}
        @media(max-width:600px){#svc-grid{grid-template-columns:1fr!important}}
      `}</style>

      {/* Background ambient */}
      <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 800, height: 800, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,101,10,0.03), transparent 65%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4rem", flexWrap: "wrap", gap: "2rem" }}>
          <div className="reveal">
            <div className="section-label" style={{ marginBottom: "1.5rem" }}>Naše služby</div>
            <h2 className="display-title" style={{ fontSize: "clamp(2.8rem,5vw,5rem)" }}>
              Kompletní péče<br />o váš <em>komín</em>
            </h2>
          </div>
          <p className="reveal reveal-delay-2" style={{ fontFamily: "var(--font-ui)", fontSize: "0.85rem", lineHeight: 1.8, color: "var(--text-secondary)", maxWidth: 320, fontWeight: 300 }}>
            Od kontroly po vložkování — vše pod jednou střechou. Certifikovaně, spolehlivě, precizně.
          </p>
        </div>

        <div className="reveal reveal-delay-1" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", border: "1px solid rgba(255,255,255,0.05)" }} id="svc-grid">
          {services.map((s, i) => (
            <div key={s.name} className="svc-card">
              <div className="svc-num">{String(i + 1).padStart(2, "0")}</div>
              <div className="svc-glow" />
              <div className="svc-card-inner">
                <div style={{ marginBottom: "1.8rem" }}>
                  <svg viewBox="0 0 48 48" className="svc-icon" style={{ width: 36, height: 36, stroke: "var(--ember)", fill: "none", strokeWidth: 1, strokeLinecap: "round", strokeLinejoin: "round" }}>
                    {s.icon.split("M").filter(Boolean).map((d, j) => <path key={j} d={"M" + d} />)}
                  </svg>
                </div>
                <div className="svc-line" />
                <div className="svc-title">{s.name}</div>
                <p className="svc-desc">{s.desc}</p>
                <div className="svc-arrow">Zjistit více →</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
