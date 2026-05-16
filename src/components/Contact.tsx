"use client";
import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = () => {
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); setTimeout(() => setSent(false), 4000); }, 1500);
  };

  const contacts = [
    { label: "Telefon", value: "+420 773 000 000", href: "tel:+420773000000", icon: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.95 9.61a19.79 19.79 0 0 1-3.07-8.68A2 2 0 0 1 2.86 1h3a2 2 0 0 1 2 1.72A12 12 0 0 0 9.13 6.5a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12 12 0 0 0 2.78.65A2 2 0 0 1 22 16.92Z" },
    { label: "E-mail", value: "info@kominictvi-stesti.cz", href: "mailto:info@kominictvi-stesti.cz", icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2ZM22 6l-10 7L2 6" },
    { label: "Oblast", value: "Praha & okolí do 50 km", href: undefined, icon: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0ZM12 10a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" },
    { label: "Provoz", value: "Po–Pá: 7:00–18:00", href: undefined, icon: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM12 6v6l4 2" },
  ];

  return (
    <section id="kontakt" style={{ background: "var(--anthracite)", padding: "9rem clamp(1.5rem,5vw,5rem)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="reveal" style={{ marginBottom: "5rem" }}>
          <div className="section-label" style={{ marginBottom: "1.5rem" }}>Kontakt</div>
          <h2 className="display-title" style={{ fontSize: "clamp(2.8rem,5vw,5rem)" }}>
            Pojďme<br /><em>spolupracovat</em>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "7rem", alignItems: "start" }} className="contact-grid">
          {/* Info */}
          <div className="reveal reveal-delay-1">
            {contacts.map(item => (
              <div key={item.label} style={{ display: "flex", gap: "1.5rem", marginBottom: "2.5rem", alignItems: "flex-start" }}>
                <div style={{ width: 40, height: 40, minWidth: 40, border: "1px solid rgba(232,101,10,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg viewBox="0 0 24 24" style={{ width: 16, height: 16, stroke: "var(--ember)", fill: "none", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" }}>
                    {item.icon.split("M").filter(Boolean).map((d,j) => <path key={j} d={"M"+d} />)}
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-ui)", fontSize: "0.58rem", letterSpacing: "0.38em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "0.3rem" }}>{item.label}</div>
                  {item.href
                    ? <a href={item.href} style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.15rem", fontWeight: 400, color: "var(--text-primary)", textDecoration: "none", transition: "color 0.3s" }} onMouseOver={e => (e.target as HTMLElement).style.color = "var(--ember)"} onMouseOut={e => (e.target as HTMLElement).style.color = "var(--text-primary)"}>{item.value}</a>
                    : <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.15rem", fontWeight: 400, color: "var(--text-primary)" }}>{item.value}</div>
                  }
                </div>
              </div>
            ))}
            {/* Emergency */}
            <div style={{ marginTop: "1rem", padding: "1.8rem 2rem", background: "linear-gradient(135deg,rgba(232,101,10,0.08),rgba(232,101,10,0.03))", border: "1px solid rgba(232,101,10,0.2)" }}>
              <div style={{ fontFamily: "var(--font-ui)", fontSize: "0.58rem", letterSpacing: "0.4em", color: "var(--ember)", textTransform: "uppercase", marginBottom: "0.6rem" }}>Pohotovostní linka 24/7</div>
              <a href="tel:+420773000000" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.8rem", fontWeight: 500, color: "var(--text-primary)", textDecoration: "none" }}>+420 773 000 000</a>
              <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.5rem", lineHeight: 1.7, fontWeight: 300 }}>Havárie, nebezpečné situace — výjezd do 2 hodin.</p>
            </div>
          </div>

          {/* Form */}
          <div className="reveal reveal-delay-2" style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            <div className="form-group-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
              <input type="text" className="form-input" placeholder="Vaše jméno" />
              <input type="tel" className="form-input" placeholder="Telefon" />
            </div>
            <input type="email" className="form-input" placeholder="E-mailová adresa" />
            <select className="form-input form-select">
              <option value="" disabled>Vyberte službu</option>
              {["Kontrola komínu","Čištění komínu","Revize komínu","Vložkování","Frézování","Kontrola spotřebičů","Pohotovost","Pravidelný servis"].map(s => <option key={s}>{s}</option>)}
            </select>
            <textarea className="form-textarea form-input" placeholder="Popište situaci nebo dotaz..." />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
              <button onClick={handleSubmit} className="btn-primary" style={{ opacity: sending ? 0.7 : 1, background: sent ? "#1a6a1a" : undefined }}>
                <span>{sent ? "✓ Odesláno" : sending ? "Odesíláme…" : "Odeslat poptávku →"}</span>
              </button>
              <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.68rem", color: "var(--text-muted)", fontWeight: 300 }}>Odpovídáme do 15 minut</p>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){.contact-grid{grid-template-columns:1fr!important;gap:3rem!important}}`}</style>
    </section>
  );
}
