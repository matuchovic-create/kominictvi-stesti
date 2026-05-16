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

export function Steps() {
  const steps = [
    { num: "1", title: "Kontaktujte nás", text: "Zavolejte na +420 778 098 717 nebo napište. Tomáš Baran vám poradí a domluvíme vhodný termín výjezdu." },
    { num: "2", title: "Prohlídka a nabídka", text: "Přijedeme přesně v domluvený čas, prověříme stav komínu a sdělíme jasné doporučení s cenovou nabídkou předem." },
    { num: "3", title: "Odborné provedení", text: "Provádíme čištění, revize, opravy i instalace s maximální pečlivostí. Po práci vždy dokonale uklidíme." },
    { num: "4", title: "Dokumentace a klid", text: "Obdržíte kompletní revizní zprávu a dokumentaci dle platných norem. Váš komín je bezpečný na roky dopředu." },
  ];
  return (
    <section id="postup" style={{ background: "var(--black)", padding: "9rem clamp(1.5rem,5vw,5rem)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div className="reveal" style={{ marginBottom: "5rem" }}>
          <div className="section-label" style={{ marginBottom: "1.5rem" }}>Postup spolupráce</div>
          <h2 className="display-title" style={{ fontSize: "clamp(2.8rem,5vw,5rem)" }}>
            Jednoduše, rychle<br />a <em>bezpečně</em>
          </h2>
        </div>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: 23, top: 0, bottom: "4rem", width: 1, background: "linear-gradient(180deg, var(--ember) 0%, rgba(232,101,10,0.1) 100%)" }} />
          {steps.map((s, i) => (
            <div key={s.num} className="step-item" style={{ display: "flex", gap: "3rem", paddingBottom: "4rem", transitionDelay: `${i*0.15}s` }}>
              <div style={{ width: 47, height: 47, minWidth: 47, borderRadius: "50%", border: "1px solid rgba(232,101,10,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-cormorant)", fontSize: "1rem", fontWeight: 500, color: "var(--ember)", background: "var(--black)", zIndex: 1 }}>{s.num}</div>
              <div style={{ paddingTop: "0.6rem" }}>
                <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.6rem", fontWeight: 400, color: "var(--text-primary)", marginBottom: "0.8rem" }}>{s.title}</div>
                <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.82rem", lineHeight: 1.9, color: "var(--text-secondary)", fontWeight: 300 }}>{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const reviews = [
  { text: "Absolutně perfektní servis. Tomáš přijel přesně, pracoval profesionálně a vše po sobě uklidil. Revizní zprávu jsem dostal do druhého dne. Vřele doporučuji!", author: "Martin K.", location: "Mladá Boleslav" },
  { text: "Využíváme Kominictví Štěstí pro náš rodinný dům již třetím rokem. Vždy spolehliví, vždy kvalitní práce za rozumnou cenu. Naprostá spokojenost.", author: "Jana N.", location: "Liberec" },
  { text: "Urgentní výjezd po nálezu trhlin v komínu. Tomáš přijel do hodiny a vyřešil vše okamžitě. Díky němu jsem mohl dál bezpečně topit. Skvělý člověk!", author: "Tomáš B.", location: "Mnichovo Hradiště" },
  { text: "Konečně kominík, který přijde přesně a pracuje precizně. Sousedé se mě ptají, koho doporučit — vždy říkám Kominictví Štěstí. TOP firma.", author: "Petra H.", location: "Mladá Boleslav" },
  { text: "Vložkování komínu bylo provedeno na jedničku. Skvělá práce, skvělý přístup. Pojišťovna byla nadšena z dokumentace. Moc děkuji za profesionální přístup!", author: "Radek M.", location: "Nymburk" },
  { text: "Pravidelný servis pro náš penzion. Vždy bez komplikací, vždy dle termínu. Dokumentace na perfektní úrovni. Oceňuji naprostou spolehlivost a poctivost.", author: "Miroslav Š.", location: "Jičín" },
];

export function Reviews() {
  return (
    <section id="reference" style={{ background: "var(--carbon)", padding: "9rem clamp(1.5rem,5vw,5rem)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "rgba(255,255,255,0.04)" }} className="reviews-inner">
          {reviews.map((r, i) => (
            <div key={i} className={`review-card reveal reveal-delay-${(i%3)+1}`} style={{ background: "var(--carbon)" }}>
              <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "3.5rem", fontWeight: 300, color: "rgba(232,101,10,0.1)", lineHeight: 1, position: "absolute", top: "1.5rem", right: "1.8rem" }}>"</div>
              <div style={{ display: "flex", gap: 3, marginBottom: "1.5rem" }}>
                {Array(5).fill(0).map((_,j) => <div key={j} style={{ width: 10, height: 10, background: "var(--ember)", clipPath: "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)" }} />)}
              </div>
              <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "1.05rem", lineHeight: 1.8, color: "var(--text-secondary)", marginBottom: "2rem" }}>{r.text}</p>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1.2rem" }}>
                <div style={{ fontFamily: "var(--font-ui)", fontSize: "0.72rem", fontWeight: 500, color: "var(--text-primary)" }}>{r.author}</div>
                <div style={{ fontFamily: "var(--font-ui)", fontSize: "0.65rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>{r.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){.reviews-inner{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

const gallery = [
  { label: "Čištění komínu — Mladá Boleslav 2024", bg: "linear-gradient(135deg,#1a0e06,#2d1a08)", span: true },
  { label: "Revize spalinových cest — Liberec", bg: "linear-gradient(135deg,#06120e,#0a1c16)", span: false },
  { label: "Oprava komínového tělesa — Mnichovo Hradiště", bg: "linear-gradient(135deg,#140808,#200e0a)", span: false },
  { label: "Vložkování nerezové — Nymburk", bg: "linear-gradient(135deg,#080a14,#0c1020)", span: false },
  { label: "Rekonstrukce komínu — Jičín 2024", bg: "linear-gradient(135deg,#0a1208,#10180a)", span: false },
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
            <div className="gallery-inner-wrap" style={{ paddingBottom: item.span ? "44%" : "68%", background: item.bg }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="40" height="40" viewBox="0 0 48 48" style={{ stroke: "rgba(232,101,10,0.3)", fill: "none", strokeWidth: 1.2 }}>
                  <rect x="16" y="8" width="16" height="32" rx="2"/><rect x="12" y="6" width="24" height="6" rx="1"/>
                </svg>
              </div>
              <div className="gallery-overlay">
                <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem", color: "#fff", letterSpacing: "0.05em" }}>{item.label}</div>
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
