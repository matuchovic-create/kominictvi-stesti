export function WhyUs() {
  const items = [
    { num: "01", title: "Certifikace a normy", text: "Pracujeme výhradně podle platných českých a evropských norem. Všechny práce jsou doloženy řádnou dokumentací a revizní zprávou." },
    { num: "02", title: "Špičková technika", text: "Disponujeme nejmodernějšími kamerovými systémy, frézkami a diagnostickými nástroji pro přesnou analýzu stavu komínů." },
    { num: "03", title: "Transparentní ceny", text: "Jasné ceny bez skrytých poplatků. Nabídku dostanete vždy předem. Žádná překvapení na faktuře — slibujeme." },
    { num: "04", title: "Pojistná záruka", text: "Naše práce jsou plně pojištěny. V případě jakékoliv škody jsou vaše zájmy plně chráněny. Pracujeme odpovědně." },
    { num: "05", title: "Rychlý příjezd", text: "Standardní termín do 48 hodin od objednávky. Pohotovostní výjezd do 2 hodin. Jsme vždy připraveni." },
    { num: "06", title: "Zákaznická péče", text: "Každý klient je pro nás výjimečný. Poskytujeme osobní přístup, jasnou komunikaci a follow-up po každé zakázce." },
  ];

  return (
    <section id="proc-my" style={{ background: "#1a1a1a", padding: "8rem 3rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="section-eyebrow-line reveal" style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: "0.65rem", letterSpacing: "0.5em", color: "#E8650A", textTransform: "uppercase" as const, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
          Naše silné stránky
        </div>
        <h2 className="reveal reveal-delay-1" style={{ fontFamily: "var(--font-cormorant),serif", fontSize: "clamp(2.5rem,5vw,4.5rem)", fontWeight: 300, lineHeight: 1.1, color: "#f5f0eb" }}>
          Proč nás volí<br /><em style={{ fontStyle: "italic", color: "#E8650A" }}>stovky</em> zákazníků
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2rem", marginTop: "4rem" }} className="why-grid">
          {items.map((item, i) => (
            <div key={item.num} className={`why-card reveal reveal-delay-${(i % 3) + 1}`}>
              <div style={{ fontFamily: "var(--font-cormorant),serif", fontSize: "3.5rem", fontWeight: 300, color: "rgba(232,101,10,0.2)", lineHeight: 1, marginBottom: "1.5rem" }}>{item.num}</div>
              <div style={{ fontFamily: "var(--font-cormorant),serif", fontSize: "1.5rem", fontWeight: 400, color: "#f5f0eb", marginBottom: "1rem" }}>{item.title}</div>
              <p style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: "0.8rem", lineHeight: 1.9, color: "#888" }}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){.why-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

export function Steps() {
  const steps = [
    { num: "1", title: "Kontaktujte nás", text: "Zavolejte, napište nebo vyplňte formulář. Odpovídáme do 15 minut v pracovní době, u pohotovosti ihned." },
    { num: "2", title: "Prohlídka a nabídka", text: "Domluvíme se na termínu prohlídky. Přijedeme přesně, prověříme situaci a sdělíme vám jasné doporučení a cenovou nabídku." },
    { num: "3", title: "Odborné provedení prací", text: "Naši certified technici provedou veškeré práce precizně, čistě a v domluvený čas. Pracovní prostor vždy dokonale uklidíme." },
    { num: "4", title: "Dokumentace a klid", text: "Předáme vám kompletní dokumentaci, revizní zprávy a doporučení. Váš komín je bezpečný — a vy máte klid na roky dopředu." },
  ];

  return (
    <section id="postup" style={{ background: "#0a0a0a", padding: "8rem 3rem" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div className="section-eyebrow-line reveal" style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: "0.65rem", letterSpacing: "0.5em", color: "#E8650A", textTransform: "uppercase" as const, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
          Postup spolupráce
        </div>
        <h2 className="reveal reveal-delay-1" style={{ fontFamily: "var(--font-cormorant),serif", fontSize: "clamp(2.5rem,5vw,4.5rem)", fontWeight: 300, lineHeight: 1.1, color: "#f5f0eb" }}>
          Jednoduše,<br />rychle a <em style={{ fontStyle: "italic", color: "#E8650A" }}>bezpečně</em>
        </h2>
        <div style={{ marginTop: "4rem", position: "relative" }}>
          <div style={{ position: "absolute", left: 24, top: 0, bottom: 0, width: 1, background: "linear-gradient(180deg, #E8650A, transparent)" }} />
          {steps.map((s, i) => (
            <div key={s.num} className="step-item" style={{ display: "flex", gap: "3rem", paddingBottom: "4rem", transitionDelay: `${i * 0.15}s` }}>
              <div style={{ width: 48, height: 48, minWidth: 48, borderRadius: "50%", border: "1px solid rgba(232,101,10,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-cormorant),serif", fontSize: "1rem", color: "#E8650A", background: "#0a0a0a", zIndex: 1 }}>{s.num}</div>
              <div style={{ paddingTop: "0.5rem" }}>
                <div style={{ fontFamily: "var(--font-cormorant),serif", fontSize: "1.5rem", fontWeight: 400, color: "#f5f0eb", marginBottom: "0.8rem" }}>{s.title}</div>
                <p style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: "0.8rem", lineHeight: 1.9, color: "#888" }}>{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const reviews = [
  { text: "Absolutně perfektní servis. Přijeli přesně, pracovali profesionálně a vše po sobě uklidili. Revizní zprávu jsme dostali do druhého dne. Doporučuji všem!", author: "Ing. Martin Kovář", location: "Praha 6 — Rodinný dům" },
  { text: "Využíváme Kominictví Štěstí pro náš bytový dům již čtvrtým rokem. Vždy spolehliví, vždy kvalitní práce. Cena odpovídá špičkové kvalitě. Vynikající!", author: "Jana Nováková", location: "Praha 2 — Bytový dům" },
  { text: "Potřeboval jsem urgentní opravu po nálezu trhlin v komínu. Přijeli do hodiny a vyřešili vše okamžitě. Díky nim jsem mohl dál topit bez obav. Profesionálové!", author: "Tomáš Blažek", location: "Beroun — Chalupa" },
  { text: "Konečně kominík, který přijde přesně a pracuje precizně. Sousedi se mě ptají, kdo nám čistil komín — vždy odkazuji na Kominictví Štěstí. Skvělá firma.", author: "Petra Horáčková", location: "Praha-západ — Rodinný dům" },
  { text: "Vložkování komínu bylo provedeno na jedničku. Skvělá práce, skvělý přístup, výborná komunikace. Pojišťovna byla nadšena z dokumentace. Moc děkuji!", author: "Radek Mašek", location: "Kladno — Novostavba" },
  { text: "Využíváme pravidelný smluvní servis pro náš hotel. Vždy bez komplikací, vždy dle termínu. Dokumentace na perfektní úrovni. Oceňuji absolutní spolehlivost.", author: "Miroslav Šimánek", location: "Průhonice — Hotel" },
];

export function Reviews() {
  return (
    <section id="reference" style={{ background: "#111111", padding: "8rem 3rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="section-eyebrow-line reveal" style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: "0.65rem", letterSpacing: "0.5em", color: "#E8650A", textTransform: "uppercase" as const, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
          Reference klientů
        </div>
        <h2 className="reveal reveal-delay-1" style={{ fontFamily: "var(--font-cormorant),serif", fontSize: "clamp(2.5rem,5vw,4.5rem)", fontWeight: 300, lineHeight: 1.1, color: "#f5f0eb" }}>
          Co říkají<br />naši <em style={{ fontStyle: "italic", color: "#E8650A" }}>zákazníci</em>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem", marginTop: "4rem" }} className="reviews-grid">
          {reviews.map((r, i) => (
            <div key={i} className={`review-card reveal reveal-delay-${(i % 3) + 1}`}>
              <div style={{ fontFamily: "var(--font-cormorant),serif", fontSize: "4rem", fontWeight: 300, color: "rgba(232,101,10,0.1)", lineHeight: 1, position: "absolute", top: "2rem", right: "2rem" }}>"</div>
              <div style={{ display: "flex", gap: 4, marginBottom: "1.5rem" }}>
                {Array(5).fill(0).map((_, j) => (
                  <div key={j} style={{ width: 12, height: 12, background: "#E8650A", clipPath: "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)" }} />
                ))}
              </div>
              <p style={{ fontFamily: "var(--font-cormorant),serif", fontStyle: "italic", fontSize: "1.05rem", lineHeight: 1.8, color: "#bbbbbb", marginBottom: "2rem" }}>{r.text}</p>
              <div style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em", color: "#E8650A", textTransform: "uppercase" as const }}>{r.author}</div>
              <div style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: "0.65rem", color: "#888", marginTop: "0.3rem" }}>{r.location}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){.reviews-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

const galleryItems = [
  { label: "Vložkování nerezové — Praha 5", bg: "linear-gradient(135deg,rgba(232,101,10,0.15),rgba(100,60,10,0.3))", span: true },
  { label: "Kamerová revize — Bytový dům Praha 2", bg: "linear-gradient(135deg,rgba(20,40,20,0.8),rgba(10,30,40,0.9))", span: false },
  { label: "Čištění komínu — Rodinný dům Říčany", bg: "linear-gradient(135deg,rgba(40,10,10,0.8),rgba(60,20,10,0.7))", span: false },
  { label: "Kontrola kotlů — Hotel Průhonice", bg: "linear-gradient(135deg,rgba(10,15,30,0.9),rgba(15,10,30,0.8))", span: false },
  { label: "Revizní zpráva — Novostavba Kladno", bg: "linear-gradient(135deg,rgba(20,30,10,0.8),rgba(10,20,15,0.9))", span: false },
];

export function Gallery() {
  return (
    <section id="galerie" style={{ background: "#111111", paddingBottom: 0 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "8rem 3rem 3rem" }}>
        <div className="section-eyebrow-line reveal" style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: "0.65rem", letterSpacing: "0.5em", color: "#E8650A", textTransform: "uppercase" as const, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
          Naše práce
        </div>
        <h2 className="reveal reveal-delay-1" style={{ fontFamily: "var(--font-cormorant),serif", fontSize: "clamp(2.5rem,5vw,4.5rem)", fontWeight: 300, lineHeight: 1.1, color: "#f5f0eb" }}>
          Fotogalerie<br />realizovaných <em style={{ fontStyle: "italic", color: "#E8650A" }}>projektů</em>
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2, marginTop: 0 }} className="gallery-master-grid">
        {galleryItems.map((item, i) => (
          <div key={i} className="gallery-item" style={{ gridColumn: item.span ? "span 2" : "span 1" }}>
            <div className="gallery-placeholder" style={{ paddingBottom: item.span ? "45%" : "70%", background: item.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div className="gallery-overlay">
                <div style={{ fontFamily: "var(--font-cormorant),serif", fontSize: "1.2rem", color: "#f5f0eb", textAlign: "center", padding: "1rem" }}>{item.label}</div>
              </div>
              <svg width="48" height="48" viewBox="0 0 48 48" style={{ stroke: "rgba(232,101,10,0.4)", fill: "none", strokeWidth: 1.2, position: "absolute" }}>
                <rect x="16" y="8" width="16" height="32" rx="2" /><rect x="12" y="6" width="24" height="6" rx="1" /><rect x="20" y="4" width="8" height="5" rx="1" />
              </svg>
            </div>
          </div>
        ))}
      </div>
      <style>{`@media(max-width:700px){.gallery-master-grid{grid-template-columns:1fr!important} .gallery-item{grid-column:span 1!important}}`}</style>
    </section>
  );
}

export function Certs() {
  const certs = [
    { label: "ČSN EN 15287\nCertifikace", icon: <svg viewBox="0 0 48 48" style={{ width: 48, height: 48, stroke: "#E8650A", fill: "none", strokeWidth: 1.2 }}><path d="M24 4l4 8h8l-6 5 2 8-8-5-8 5 2-8-6-5h8z" /><circle cx="24" cy="32" r="10" /><path d="M20 32l3 3 6-6" /></svg> },
    { label: "Živnostenský\nlist ČR", icon: <svg viewBox="0 0 48 48" style={{ width: 48, height: 48, stroke: "#E8650A", fill: "none", strokeWidth: 1.2 }}><rect x="8" y="12" width="32" height="24" rx="2" /><path d="M8 20h32M16 12v-4M32 12v-4" /><circle cx="24" cy="30" r="4" /></svg> },
    { label: "Pojistná\nodpovědnost", icon: <svg viewBox="0 0 48 48" style={{ width: 48, height: 48, stroke: "#E8650A", fill: "none", strokeWidth: 1.2 }}><path d="M24 6C14 6 6 14 6 24s8 18 18 18 18-8 18-18S34 6 24 6z" /><path d="M16 24l6 6 10-12" /></svg> },
    { label: "ISO 9001\nKvalita", icon: <svg viewBox="0 0 48 48" style={{ width: 48, height: 48, stroke: "#E8650A", fill: "none", strokeWidth: 1.2 }}><path d="M24 4l3 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1z" /><circle cx="24" cy="34" r="8" /><path d="M21 34l2 2 4-4" /></svg> },
    { label: "Revizní technik\noprávnění", icon: <svg viewBox="0 0 48 48" style={{ width: 48, height: 48, stroke: "#E8650A", fill: "none", strokeWidth: 1.2 }}><rect x="10" y="8" width="28" height="32" rx="2" /><path d="M16 16h16M16 22h16M16 28h10" /><path d="M30 26l6 6-2 2-6-6" /></svg> },
  ];

  return (
    <section id="certifikace" style={{ background: "#0a0a0a", padding: "8rem 3rem", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
        <div className="section-eyebrow-line reveal" style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: "0.65rem", letterSpacing: "0.5em", color: "#E8650A", textTransform: "uppercase" as const, marginBottom: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
          Naše certifikace
        </div>
        <h2 className="reveal reveal-delay-1" style={{ fontFamily: "var(--font-cormorant),serif", fontSize: "clamp(2.5rem,5vw,4.5rem)", fontWeight: 300, lineHeight: 1.1, color: "#f5f0eb" }}>
          Kvalita<br />ověřená <em style={{ fontStyle: "italic", color: "#E8650A" }}>certifikáty</em>
        </h2>
        <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap", justifyContent: "center", maxWidth: 1000, margin: "4rem auto 0" }}>
          {certs.map((c, i) => (
            <div key={i} className={`cert-badge reveal reveal-delay-${(i % 3) + 1}`}>
              <div>{c.icon}</div>
              <div style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: "0.65rem", letterSpacing: "0.25em", color: "#888", textTransform: "uppercase" as const, textAlign: "center", whiteSpace: "pre-line" }}>{c.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
