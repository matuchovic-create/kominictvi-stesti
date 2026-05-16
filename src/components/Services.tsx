const services = [
  {
    name: "Kontrola komínů",
    desc: "Odborná vizuální i kamerová kontrola stavu komínového průduchu a komínového tělesa dle platných norem ČSN.",
    icon: (
      <svg viewBox="0 0 48 48" style={{ width: 48, height: 48, stroke: "#E8650A", fill: "none", strokeWidth: 1.2 }}>
        <circle cx="24" cy="24" r="16" /><path d="M24 8v4M24 36v4M8 24h4M36 24h4" /><circle cx="24" cy="24" r="6" />
      </svg>
    ),
  },
  {
    name: "Čištění komínů",
    desc: "Profesionální vyčištění komínových průduchů od sazí, dehtu a usazenin. Zárukou je maximální bezpečnost a průchodnost.",
    icon: (
      <svg viewBox="0 0 48 48" style={{ width: 48, height: 48, stroke: "#E8650A", fill: "none", strokeWidth: 1.2 }}>
        <path d="M16 40c0-8 4-16 8-16s8 8 8 16" /><path d="M12 28c0-6 5-14 12-14s12 8 12 14" /><path d="M24 14V8" /><line x1="18" y1="10" x2="24" y2="14" /><line x1="30" y1="10" x2="24" y2="14" />
      </svg>
    ),
  },
  {
    name: "Revize komínů",
    desc: "Vydání revizní zprávy komínu – povinný dokument pro pojišťovny, stavební úřady a napojení spotřebiče. Rychle a spolehlivě.",
    icon: (
      <svg viewBox="0 0 48 48" style={{ width: 48, height: 48, stroke: "#E8650A", fill: "none", strokeWidth: 1.2 }}>
        <rect x="12" y="8" width="24" height="32" rx="2" /><path d="M20 16h8M20 22h8M20 28h5" /><circle cx="32" cy="32" r="6" /><path d="M30 32l1.5 1.5L34 30" />
      </svg>
    ),
  },
  {
    name: "Vložkování",
    desc: "Instalace nerezových nebo flexibilních vložek do komínového průduchu. Moderní řešení pro bezpečný odvod spalin.",
    icon: (
      <svg viewBox="0 0 48 48" style={{ width: 48, height: 48, stroke: "#E8650A", fill: "none", strokeWidth: 1.2 }}>
        <rect x="20" y="4" width="8" height="36" rx="4" /><path d="M16 12c-4 2-6 6-6 10s2 8 6 10" /><path d="M32 12c4 2 6 6 6 10s-2 8-6 10" /><rect x="18" y="38" width="12" height="6" rx="1" />
      </svg>
    ),
  },
  {
    name: "Frézování",
    desc: "Mechanické frézování zatvrdlých nánosů dehtu a usazenin v komínovém průduchu. Účinná metoda pro těžko přístupná místa.",
    icon: (
      <svg viewBox="0 0 48 48" style={{ width: 48, height: 48, stroke: "#E8650A", fill: "none", strokeWidth: 1.2 }}>
        <circle cx="24" cy="24" r="14" /><path d="M24 10v28M10 24h28" /><circle cx="24" cy="24" r="4" fill="rgba(232,101,10,0.3)" />
      </svg>
    ),
  },
  {
    name: "Kontroly spotřebičů",
    desc: "Odborná kontrola plynových kotlů, krbů, kamen a dalších spotřebičů. Bezpečnost vašeho topení na prvním místě.",
    icon: (
      <svg viewBox="0 0 48 48" style={{ width: 48, height: 48, stroke: "#E8650A", fill: "none", strokeWidth: 1.2 }}>
        <rect x="10" y="16" width="28" height="20" rx="2" /><path d="M20 16V12a4 4 0 018 0v4" /><circle cx="24" cy="26" r="3" /><path d="M24 29v4" />
      </svg>
    ),
  },
  {
    name: "Pohotovost 24/7",
    desc: "Nonstop pohotovostní servis pro havarijní situace. Jsme tu pro vás v jakoukoliv denní i noční hodinu. Voláme zpět do 15 minut.",
    icon: (
      <svg viewBox="0 0 48 48" style={{ width: 48, height: 48, stroke: "#E8650A", fill: "none", strokeWidth: 1.2 }}>
        <path d="M24 6l3 8h8l-6.5 5 2.5 8L24 22l-7 5 2.5-8L14 14h8z" /><circle cx="24" cy="36" r="6" /><path d="M24 30v-4" />
      </svg>
    ),
  },
  {
    name: "Pravidelný servis",
    desc: "Smluvní pravidelná údržba a čištění pro bytové domy, hotely a firmy. Plánované návštěvy, žádné starosti.",
    icon: (
      <svg viewBox="0 0 48 48" style={{ width: 48, height: 48, stroke: "#E8650A", fill: "none", strokeWidth: 1.2 }}>
        <path d="M8 36V16l16-8 16 8v20" /><rect x="18" y="26" width="12" height="10" /><path d="M8 36h32" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="sluzby" style={{ background: "#0a0a0a", padding: "8rem 3rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          className="section-eyebrow-line reveal"
          style={{
            fontFamily: "var(--font-syne), sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.5em",
            color: "#E8650A",
            textTransform: "uppercase" as const,
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          Naše služby
        </div>
        <h2
          className="reveal reveal-delay-1"
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            fontWeight: 300,
            lineHeight: 1.1,
            color: "#f5f0eb",
          }}
        >
          Kompletní péče
          <br />o váš{" "}
          <em style={{ fontStyle: "italic", color: "#E8650A" }}>komín</em>
        </h2>

        <div
          className="reveal reveal-delay-2"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1px",
            marginTop: "4rem",
            background: "rgba(255,255,255,0.05)",
          }}
        >
          {services.map((s) => (
            <div key={s.name} className="service-card">
              <div style={{ marginBottom: "1.5rem" }}>{s.icon}</div>
              <div
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "1.4rem",
                  fontWeight: 400,
                  color: "#f5f0eb",
                  marginBottom: "1rem",
                }}
              >
                {s.name}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-syne), sans-serif",
                  fontSize: "0.78rem",
                  lineHeight: 1.8,
                  color: "#888",
                }}
              >
                {s.desc}
              </p>
              <div
                className="service-arrow"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginTop: "2rem",
                  fontFamily: "var(--font-syne), sans-serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.3em",
                  color: "#E8650A",
                  textTransform: "uppercase" as const,
                }}
              >
                Zjistit více →
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #sluzby .services-inner { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 600px) {
          #sluzby .services-inner { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
