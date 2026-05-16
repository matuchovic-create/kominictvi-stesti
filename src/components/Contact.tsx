"use client";
import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = () => {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => setSent(false), 4000);
    }, 1500);
  };

  const PhoneIcon = () => (
    <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, stroke: "#E8650A", fill: "none", strokeWidth: 1.5 }}>
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.95 9.61a19.79 19.79 0 01-3.07-8.68A2 2 0 012.86 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
  const MailIcon = () => (
    <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, stroke: "#E8650A", fill: "none", strokeWidth: 1.5 }}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
    </svg>
  );
  const PinIcon = () => (
    <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, stroke: "#E8650A", fill: "none", strokeWidth: 1.5 }}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
  const ClockIcon = () => (
    <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, stroke: "#E8650A", fill: "none", strokeWidth: 1.5 }}>
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );

  const contactItems = [
    { icon: <PhoneIcon />, label: "Telefon", value: "+420 773 000 000", href: "tel:+420773000000" },
    { icon: <MailIcon />, label: "E-mail", value: "info@kominictvi-stesti.cz", href: "mailto:info@kominictvi-stesti.cz" },
    { icon: <PinIcon />, label: "Adresa", value: "Praha & okolí do 50 km", href: undefined },
    { icon: <ClockIcon />, label: "Pracovní doba", value: "Po–Pá: 7:00–18:00", href: undefined },
  ];

  return (
    <section id="kontakt" style={{ background: "#1a1a1a", padding: "8rem 3rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="section-eyebrow-line reveal" style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: "0.65rem", letterSpacing: "0.5em", color: "#E8650A", textTransform: "uppercase" as const, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
          Kontakt
        </div>
        <h2 className="reveal reveal-delay-1" style={{ fontFamily: "var(--font-cormorant),serif", fontSize: "clamp(2.5rem,5vw,4.5rem)", fontWeight: 300, lineHeight: 1.1, color: "#f5f0eb" }}>
          Pojďme<br /><em style={{ fontStyle: "italic", color: "#E8650A" }}>spolupracovat</em>
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", marginTop: "4rem", alignItems: "start" }} className="contact-grid">
          {/* Info */}
          <div className="reveal reveal-delay-1">
            {contactItems.map((item) => (
              <div key={item.label} style={{ display: "flex", gap: "2rem", marginBottom: "2.5rem", alignItems: "flex-start" }}>
                <div style={{ width: 44, height: 44, minWidth: 44, border: "1px solid rgba(232,101,10,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: "0.6rem", letterSpacing: "0.3em", color: "#888", textTransform: "uppercase" as const, marginBottom: "0.4rem" }}>{item.label}</div>
                  {item.href ? (
                    <a href={item.href} style={{ fontFamily: "var(--font-cormorant),serif", fontSize: "1.2rem", fontWeight: 400, color: "#f5f0eb", textDecoration: "none" }}>{item.value}</a>
                  ) : (
                    <div style={{ fontFamily: "var(--font-cormorant),serif", fontSize: "1.2rem", fontWeight: 400, color: "#f5f0eb" }}>{item.value}</div>
                  )}
                </div>
              </div>
            ))}
            <div style={{ padding: "2rem", marginTop: "2rem", background: "linear-gradient(135deg,rgba(232,101,10,0.1),rgba(232,101,10,0.05))", border: "1px solid rgba(232,101,10,0.3)" }}>
              <div style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: "0.6rem", letterSpacing: "0.4em", color: "#E8650A", textTransform: "uppercase" as const, marginBottom: "0.5rem" }}>🔥 Pohotovostní linka 24/7</div>
              <a href="tel:+420773000000" style={{ fontFamily: "var(--font-cormorant),serif", fontSize: "2rem", fontWeight: 600, color: "#f5f0eb", textDecoration: "none" }}>+420 773 000 000</a>
              <p style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: "0.75rem", color: "#888", marginTop: "0.5rem" }}>Havárie, nebezpečné situace — voláme zpět do 15 minut, výjezd do 2 hodin.</p>
            </div>
          </div>

          {/* Form */}
          <div className="reveal reveal-delay-2" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <input type="text" className="form-input" placeholder="Vaše jméno" />
              <input type="tel" className="form-input" placeholder="Telefon" />
            </div>
            <input type="email" className="form-input" placeholder="E-mailová adresa" />
            <select className="form-input form-select">
              <option value="" disabled>Vyberte službu</option>
              {["Kontrola komínu","Čištění komínu","Revize komínu","Vložkování","Frézování","Kontrola spotřebičů","Pohotovost","Pravidelný servis"].map(s => <option key={s}>{s}</option>)}
            </select>
            <textarea className="form-textarea" placeholder="Popište situaci nebo dotaz..." style={{ minHeight: 140, resize: "none", width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "#f5f0eb", padding: "1.2rem", fontFamily: "var(--font-syne),sans-serif", fontSize: "0.85rem", outline: "none" }} />
            <button
              onClick={handleSubmit}
              style={{
                background: sent ? "#2a7a2a" : "#E8650A",
                color: "#f5f0eb",
                border: "none",
                padding: "1.2rem 3rem",
                fontFamily: "var(--font-syne),sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase" as const,
                cursor: "pointer",
                transition: "all 0.4s",
                alignSelf: "flex-start",
                opacity: sending ? 0.7 : 1,
              }}
            >
              {sent ? "✓ Poptávka odeslána" : sending ? "Odesíláme..." : "Odeslat poptávku →"}
            </button>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){.contact-grid{grid-template-columns:1fr!important;gap:3rem!important}}`}</style>
    </section>
  );
}
