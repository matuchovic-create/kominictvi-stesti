export default function Footer() {
  const year = new Date().getFullYear();
  const services = ["Kontrola komínů","Čištění komínů","Revize komínů","Vložkování","Frézování","Pohotovost 24/7"];
  const nav = [{ l:"O nás",h:"#o-nas"},{l:"Naše služby",h:"#sluzby"},{l:"Proč právě my",h:"#proc-my"},{l:"Reference",h:"#reference"},{l:"Galerie",h:"#galerie"},{l:"Kontakt",h:"#kontakt"}];

  const linkStyle = { fontFamily: "var(--font-ui)", fontSize: "0.78rem", color: "var(--text-muted)", textDecoration: "none", transition: "color 0.3s", display: "block", marginBottom: "0.7rem" };

  return (
    <footer style={{ background: "var(--black)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "5rem clamp(1.5rem,5vw,5rem) 3rem" }}>
        {/* Top */}
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: "4rem", paddingBottom: "4rem", borderBottom: "1px solid rgba(255,255,255,0.05)", flexWrap: "wrap" }} className="footer-grid">
          <div>
            <a href="#hero" style={{ textDecoration: "none", display: "block", marginBottom: "1.2rem" }}>
              <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.3rem", fontWeight: 400, letterSpacing: "0.15em", color: "var(--text-primary)" }}>
                KOMINICTVÍ <span style={{ color: "var(--ember)" }}>ŠTĚSTÍ</span>
              </div>
              <div style={{ fontFamily: "var(--font-ui)", fontSize: "0.5rem", letterSpacing: "0.45em", color: "var(--text-muted)", textTransform: "uppercase", marginTop: "2px" }}>Praha & okolí</div>
            </a>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.78rem", lineHeight: 1.8, color: "var(--text-muted)", fontWeight: 300, maxWidth: 260 }}>
              Prémiový komínový servis s tradicí, certifikací a vášní pro dokonalost.
            </p>
            <div style={{ display: "flex", gap: "0.7rem", marginTop: "1.8rem" }}>
              {["M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z","M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37ZM2 2h20v20H2z"].map((p, i) => (
                <div key={i} style={{ width: 32, height: 32, border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "border-color 0.3s" }}
                  onMouseOver={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(232,101,10,0.4)"}
                  onMouseOut={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"}
                >
                  <svg viewBox="0 0 24 24" style={{ width: 13, height: 13, stroke: "var(--text-muted)", fill: "none", strokeWidth: 1.5 }}>
                    <path d={p} />
                    {i === 1 && <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></>}
                  </svg>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: "0.58rem", letterSpacing: "0.4em", color: "var(--ember)", textTransform: "uppercase", marginBottom: "1.5rem" }}>Navigace</div>
            {nav.map(item => <a key={item.h} href={item.h} style={linkStyle} onMouseOver={e => (e.target as HTMLElement).style.color = "var(--text-primary)"} onMouseOut={e => (e.target as HTMLElement).style.color = "var(--text-muted)"}>{item.l}</a>)}
          </div>

          <div>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: "0.58rem", letterSpacing: "0.4em", color: "var(--ember)", textTransform: "uppercase", marginBottom: "1.5rem" }}>Služby</div>
            {services.map(s => <a key={s} href="#sluzby" style={linkStyle} onMouseOver={e => (e.target as HTMLElement).style.color = "var(--text-primary)"} onMouseOut={e => (e.target as HTMLElement).style.color = "var(--text-muted)"}>{s}</a>)}
          </div>

          <div>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: "0.58rem", letterSpacing: "0.4em", color: "var(--ember)", textTransform: "uppercase", marginBottom: "1.5rem" }}>Kontakt</div>
            {[
              { t: "+420 773 000 000", h: "tel:+420773000000" },
              { t: "info@kominictvi-stesti.cz", h: "mailto:info@kominictvi-stesti.cz" },
              { t: "Praha & okolí 50 km" },
              { t: "Po–Pá: 7:00–18:00" },
            ].map((item, i) => item.h
              ? <a key={i} href={item.h} style={linkStyle} onMouseOver={e => (e.target as HTMLElement).style.color = "var(--text-primary)"} onMouseOut={e => (e.target as HTMLElement).style.color = "var(--text-muted)"}>{item.t}</a>
              : <p key={i} style={{ ...linkStyle, cursor: "default" }}>{item.t}</p>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.68rem", color: "var(--text-muted)" }}>
            © {year} Kominictví Štěstí. Všechna práva vyhrazena.
          </p>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.68rem", color: "rgba(232,101,10,0.5)" }}>
            Certifikovaný komínový servis Praha
          </p>
        </div>
      </div>
      <style>{`@media(max-width:900px){.footer-grid{grid-template-columns:1fr 1fr!important;gap:2.5rem!important}} @media(max-width:500px){.footer-grid{grid-template-columns:1fr!important}}`}</style>
    </footer>
  );
}
