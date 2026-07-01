"use client";
import { useState, useEffect } from "react";

export function WhyUs() {
  const items = [
    { num: "01", title: "Certifikace a normy", text: "Pracujeme výhradně dle platných ČSN a EU norem. Všechny práce jsou doloženy řádnou revizní dokumentací." },
    { num: "02", title: "Špičková technika", text: "Kamerové systémy, digitální diagnostika a moderní frézky pro přesnou analýzu stavu každého komínu." },
    { num: "03", title: "Transparentní ceny", text: "Cenová nabídka vždy předem, bez skrytých poplatků. Žádná překvapení na faktuře — to je náš závazek." },
    { num: "04", title: "Pojistná záruka", text: "Veškeré práce jsou plně pojištěny. Vaše zájmy jsou chráněny v každé situaci. Pracujeme odpovědně." },
    { num: "05", title: "Rychlý výjezd", text: "Standardní termín do 48 hodin. Havarijní výjezd do 2 hodin od zavolání. Jsme vždy připraveni." },
    { num: "06", title: "Osobní přístup", text: "Každý klient je pro nás výjimečný. Jasná komunikace, sledování zakázky a follow-up po dokončení." },
  ];
  return (
    <section id="proc-my" style={{ background: "#000", padding: "9rem clamp(1.5rem,5vw,5rem)", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4.5rem", flexWrap: "wrap", gap: "2rem" }}>
          <div className="reveal">
            <div className="section-label" style={{ marginBottom: "1.5rem" }}>Naše silné stránky</div>
            <h2 className="display-title" style={{ fontSize: "clamp(2.8rem,5vw,5rem)" }}>
              Proč nás volí<br /><em>stovky</em> zákazníků
            </h2>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "rgba(232,101,10,0.08)" }} className="why-grid-inner">
          {items.map((item, i) => (
            <div key={item.num} className={`why-card glow-card reveal reveal-delay-${(i%3)+1}`}>
              <div className="why-num">{item.num}</div>
              <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.4rem", fontWeight: 400, color: "var(--text-primary)", marginBottom: "1rem" }}>{item.title}</div>
              <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.8rem", lineHeight: 1.85, color: "var(--text-secondary)", fontWeight: 300 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media(max-width:900px){.why-grid-inner{grid-template-columns:1fr!important}}
        @keyframes glowSweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        @keyframes numPulse {
          0%,100% { opacity: 0.15; }
          50% { opacity: 0.55; text-shadow: 0 0 30px rgba(232,101,10,0.6); }
        }
        .glow-card {
          position: relative;
          background: #080808 !important;
          border: 1px solid rgba(232,101,10,0.15) !important;
          padding: 2.5rem !important;
          transition: all 0.4s ease;
          overflow: hidden;
        }
        .glow-card:hover {
          border-color: rgba(232,101,10,0.5) !important;
          background: rgba(232,101,10,0.04) !important;
          transform: translateY(-4px);
          box-shadow: 0 0 40px rgba(232,101,10,0.1), inset 0 0 30px rgba(232,101,10,0.04);
        }
        .glow-card::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(232,101,10,0.8), transparent);
          transform: translateX(-100%);
          animation: glowSweep 3s ease-in-out infinite;
        }
        .glow-card:nth-child(2)::before { animation-delay: -0.5s; }
        .glow-card:nth-child(3)::before { animation-delay: -1s; }
        .glow-card:nth-child(4)::before { animation-delay: -1.5s; }
        .glow-card:nth-child(5)::before { animation-delay: -2s; }
        .glow-card:nth-child(6)::before { animation-delay: -2.5s; }
        .why-num {
          font-family: var(--font-cormorant);
          font-size: 3rem;
          font-weight: 300;
          color: rgba(232,101,10,0.2);
          line-height: 1;
          margin-bottom: 1.5rem;
          animation: numPulse 3s ease-in-out infinite;
        }
        .glow-card:nth-child(2) .why-num { animation-delay: -0.5s; }
        .glow-card:nth-child(3) .why-num { animation-delay: -1s; }
        .glow-card:nth-child(4) .why-num { animation-delay: -1.5s; }
        .glow-card:nth-child(5) .why-num { animation-delay: -2s; }
        .glow-card:nth-child(6) .why-num { animation-delay: -2.5s; }
      `}</style>
    </section>
  );
}

export function Steps() {
  const steps = [
    { num: "1", title: "Kontaktujte nás", text: "Zavolejte, napište nebo vyplňte formulář. Odpovídáme do 15 minut v pracovní době, u pohotovosti okamžitě." },
    { num: "2", title: "Prohlídka a nabídka", text: "Přijedeme v domluvený čas, prověříme situaci a sdělíme vám jasné doporučení s cenovou nabídkou předem." },
    { num: "3", title: "Odborné provedení", text: "Certified technici provedou veškeré práce precizně a čistě. Pracovní prostor vždy dokonale uklidíme." },
    { num: "4", title: "Dokumentace a klid", text: "Předáme kompletní dokumentaci a revizní zprávy. Váš komín je bezpečný na roky dopředu." },
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
  { text: "Absolutně perfektní servis. Přijeli přesně, pracovali profesionálně a vše po sobě uklidili. Revizní zprávu jsme dostali do druhého dne. Doporučuji všem!", author: "Ing. Martin Kovář", location: "Praha 6 — Rodinný dům" },
  { text: "Využíváme Kominictví Štěstí pro náš bytový dům již čtvrtým rokem. Vždy spolehliví, vždy kvalitní práce. Cena odpovídá špičkové kvalitě.", author: "Jana Nováková", location: "Praha 2 — Bytový dům" },
  { text: "Urgentní oprava po nálezu trhlin v komínu. Přijeli do hodiny a vyřešili vše okamžitě. Díky nim jsem mohl dál topit bez obav. Profesionálové!", author: "Tomáš Blažek", location: "Beroun — Chalupa" },
  { text: "Konečně kominík, který přijde přesně a pracuje precizně. Sousedi se mě ptají, kdo čistil komín — vždy odkazuji na Kominictví Štěstí.", author: "Petra Horáčková", location: "Praha-západ — Rodinný dům" },
  { text: "Vložkování komínu na jedničku. Skvělá práce, skvělý přístup, výborná komunikace. Pojišťovna byla nadšena z dokumentace.", author: "Radek Mašek", location: "Kladno — Novostavba" },
  { text: "Pravidelný smluvní servis pro náš hotel. Vždy bez komplikací, vždy dle termínu. Dokumentace na perfektní úrovni. Absolutní spolehlivost.", author: "Miroslav Šimánek", location: "Průhonice — Hotel" },
];

export function Reviews() {
  return (
    <section id="reference" style={{ background: "#000", padding: "9rem clamp(1.5rem,5vw,5rem)" }}>
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
            <div key={i} className={`review-card reveal reveal-delay-${(i%3)+1}`} style={{ background: "#000" }}>
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

const TOTAL_PHOTOS = 46;
const gallery = Array.from({ length: TOTAL_PHOTOS }, (_, i) => ({
  src: `/gallery/photo-${i + 1}.jpg`,
}));
// Curated opening rhythm: wide, normal, normal | normal, normal, normal | wide, normal, normal
const FEATURED_COUNT = 9;
const spanPattern = [true, false, false, false, false, false, true, false, false];

function ZoomIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  );
}

function GalleryTile({ index, wide, onOpen }: { index: number; wide?: boolean; onOpen: (i: number) => void }) {
  return (
    <div className="gallery-item" style={{ gridColumn: wide ? "span 2" : "span 1" }} onClick={() => onOpen(index)}>
      <div className="gallery-inner-wrap" style={{ paddingBottom: wide ? "44%" : "68%" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${gallery[index].src}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="gallery-overlay" style={{ alignItems: "center", justifyContent: "center" }}>
          <ZoomIcon />
        </div>
      </div>
    </div>
  );
}

export function Gallery() {
  const [showAll, setShowAll] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    if (lightbox === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((v) => (v === null ? v : (v + 1) % TOTAL_PHOTOS));
      if (e.key === "ArrowLeft") setLightbox((v) => (v === null ? v : (v - 1 + TOTAL_PHOTOS) % TOTAL_PHOTOS));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

  return (
    <section id="galerie" style={{ background: "#000" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "9rem clamp(1.5rem,5vw,5rem) 3rem" }}>
        <div className="reveal" style={{ marginBottom: "3rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            <div className="section-label" style={{ marginBottom: "1.5rem" }}>Naše práce</div>
            <h2 className="display-title" style={{ fontSize: "clamp(2.8rem,5vw,5rem)" }}>
              Realizované<br /><em>projekty</em>
            </h2>
          </div>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: "0.68rem", letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase", paddingBottom: "0.6rem" }}>
            {TOTAL_PHOTOS} fotografií z realizací
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }} className="gal-grid">
        {spanPattern.map((wide, i) => (
          <GalleryTile key={i} index={i} wide={wide} onOpen={setLightbox} />
        ))}
      </div>

      {showAll && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 2, marginTop: 2 }} className="gal-grid-all">
          {gallery.slice(FEATURED_COUNT).map((_, i) => (
            <GalleryTile key={i + FEATURED_COUNT} index={i + FEATURED_COUNT} onOpen={setLightbox} />
          ))}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "center", padding: "3.5rem clamp(1.5rem,5vw,5rem) 1rem" }}>
        <button className="btn-ghost" onClick={() => setShowAll((v) => !v)} style={{ background: "transparent" }}>
          <span>{showAll ? "Zobrazit méně" : `Zobrazit všech ${TOTAL_PHOTOS} fotografií`}</span>
        </button>
      </div>

      {lightbox !== null && (
        <div className="lightbox-backdrop" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Zavřít">✕</button>
          <button
            className="lightbox-arrow lightbox-arrow-left"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + TOTAL_PHOTOS) % TOTAL_PHOTOS); }}
            aria-label="Předchozí"
          >‹</button>
          <img
            src={gallery[lightbox].src}
            alt={`Realizace ${lightbox + 1}`}
            className="lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="lightbox-arrow lightbox-arrow-right"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % TOTAL_PHOTOS); }}
            aria-label="Další"
          >›</button>
          <div className="lightbox-counter">{lightbox + 1} / {TOTAL_PHOTOS}</div>
        </div>
      )}

      <style>{`
        @media(max-width:700px){
          .gal-grid, .gal-grid-all { grid-template-columns: 1fr!important; }
          .gal-grid .gallery-item, .gal-grid-all .gallery-item { grid-column: span 1!important; }
          .gal-grid .gallery-inner-wrap { padding-bottom: 68%!important; }
        }
        @media(max-width:900px) and (min-width:701px){
          .gal-grid-all { grid-template-columns: repeat(2,1fr)!important; }
        }
        .lightbox-backdrop {
          position: fixed; inset: 0; z-index: 10000;
          background: rgba(4,2,1,0.94);
          display: flex; align-items: center; justify-content: center;
          animation: lbFadeIn 0.25s ease;
        }
        @keyframes lbFadeIn { from{opacity:0} to{opacity:1} }
        .lightbox-img {
          max-width: min(88vw, 1200px); max-height: 86vh;
          object-fit: contain;
          box-shadow: 0 30px 80px rgba(0,0,0,0.6);
          border: 1px solid rgba(232,101,10,0.15);
        }
        .lightbox-close, .lightbox-arrow {
          position: absolute; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.12); color: var(--text-primary);
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: all 0.25s;
        }
        .lightbox-close:hover, .lightbox-arrow:hover { border-color: var(--ember); color: var(--ember); background: rgba(232,101,10,0.08); }
        .lightbox-close { top: 1.5rem; right: 1.5rem; width: 44px; height: 44px; font-size: 1rem; border-radius: 50%; }
        .lightbox-arrow { top: 50%; transform: translateY(-50%); width: 52px; height: 52px; font-size: 1.8rem; border-radius: 50%; }
        .lightbox-arrow-left { left: 1.5rem; }
        .lightbox-arrow-right { right: 1.5rem; }
        .lightbox-counter {
          position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%);
          font-family: var(--font-ui); font-size: 0.68rem; letter-spacing: 0.2em;
          color: var(--text-muted); text-transform: uppercase;
        }
        @media(max-width:700px){
          .lightbox-arrow { width: 40px; height: 40px; font-size: 1.4rem; }
          .lightbox-arrow-left { left: 0.6rem; } .lightbox-arrow-right { right: 0.6rem; }
          .lightbox-close { top: 0.8rem; right: 0.8rem; }
        }
      `}</style>
    </section>
  );
}

export function Certs() {
  const certs = [
    { label: "ČSN EN 15287\nCertifikace", path: "M24 4l4 8h8l-6 5 2 8-8-5-8 5 2-8-6-5h8ZM24 24a8 8 0 1 0 0 16 8 8 0 0 0 0-16ZM21 32l2 2 5-5" },
    { label: "Živnostenský\nlist ČR", path: "M8 12h32v24a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2zM8 20h32M17 12v-5M31 12v-5" },
    { label: "Pojistná\nodpovědnost", path: "M24 4C14 4 6 12 6 22s8 18 18 18 18-8 18-18S34 4 24 4ZM17 22l5 5 9-9" },
    { label: "ISO 9001\nKvalita", path: "M24 4l3 7h7l-6 4 2 7-6-4-6 4 2-7-6-4h7ZM24 32a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM20 41l3 3 6-6" },
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
