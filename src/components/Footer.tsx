export default function Footer() {
  const year = new Date().getFullYear();
  const services = ["Čištění komínů","Revize komínů","Opravy komínů","Vložkování","Rekonstrukce","Spalinové cesty"];
  const nav = [{l:"O nás",h:"#o-nas"},{l:"Naše služby",h:"#sluzby"},{l:"Proč právě my",h:"#proc-my"},{l:"Reference",h:"#reference"},{l:"Galerie",h:"#galerie"},{l:"Kontakt",h:"#kontakt"}];
  const linkStyle = { fontFamily: "var(--font-ui)", fontSize: "0.78rem", color: "var(--text-muted)", textDecoration: "none", transition: "color 0.3s", display: "block", marginBottom: "0.7rem" };

  return (
    <footer style={{ background: "var(--black)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "5rem clamp(1.5rem,5vw,5rem) 3rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: "4rem", paddingBottom: "4rem", borderBottom: "1px solid rgba(255,255,255,0.05)" }} className="footer-grid">
          <div>
            <a href="#hero" style={{ textDecoration: "none", display: "block", marginBottom: "1.2rem" }}>
              <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.3rem", fontWeight: 400, letterSpacing: "0.15em", color: "var(--text-primary)" }}>
                KOMINICTVÍ <span style={{ color: "var(--ember)" }}>ŠTĚSTÍ</span>
              </div>
              <div style={{ fontFamily: "var(--font-ui)", fontSize: "0.5rem", letterSpacing: "0.45em", color: "var(--text-muted)", textTransform: "uppercase", marginTop: "2px" }}>Tomáš Baran</div>
            </a>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.78rem", lineHeight: 1.8, color: "var(--text-muted)", fontWeight: 300, maxWidth: 260 }}>
              Profesionální kominické služby pro váš bezpečný domov. Středočeský a Liberecký kraj.
            </p>
            <div style={{ marginTop: "1.5rem", padding: "1rem 1.2rem", border: "1px solid rgba(232,101,10,0.15)", background: "rgba(232,101,10,0.04)" }}>
              <div style={{ fontFamily: "var(--font-ui)", fontSize: "0.52rem", letterSpacing: "0.35em", color: "var(--ember)", textTransform: "uppercase", marginBottom: "0.3rem" }}>Člen MKS</div>
              <div style={{ fontFamily: "var(--font-ui)", fontSize: "0.72rem", color: "var(--text-secondary)" }}>Moravské kominické společenstvo</div>
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
              { t: "+420 778 098 717", h: "tel:+420778098717" },
              { t: "Kominicektom@email.cz", h: "mailto:Kominicektom@email.cz" },
              { t: "Mladá Boleslav" },
              { t: "Střed. & Liberecký kraj" },
              { t: "Po–Pá: 7:00–18:00" },
            ].map((item, i) => item.h
              ? <a key={i} href={item.h} style={linkStyle} onMouseOver={e => (e.target as HTMLElement).style.color = "var(--text-primary)"} onMouseOut={e => (e.target as HTMLElement).style.color = "var(--text-muted)"}>{item.t}</a>
              : <p key={i} style={{ ...linkStyle, cursor: "default" }}>{item.t}</p>
            )}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.68rem", color: "var(--text-muted)" }}>© {year} Kominictví Štěstí — Tomáš Baran. Všechna práva vyhrazena.</p>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.68rem", color: "rgba(232,101,10,0.5)" }}>Středočeský & Liberecký kraj</p>
        </div>
      </div>
      <style>{`@media(max-width:900px){.footer-grid{grid-template-columns:1fr 1fr!important;gap:2.5rem!important}} @media(max-width:500px){.footer-grid{grid-template-columns:1fr!important}}`}</style>
    </footer>
  );
}
