export default function Footer() {
  const services = ["Kontrola komínů","Čištění komínů","Revize komínů","Vložkování","Frézování","Pohotovost 24/7"];
  const nav = ["O nás","Naše služby","Proč právě my","Reference","Galerie","Kontakt"];
  const anchors = ["#o-nas","#sluzby","#proc-my","#reference","#galerie","#kontakt"];

  return (
    <footer style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "4rem 3rem 2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", maxWidth: 1200, margin: "0 auto 3rem", paddingBottom: "3rem", borderBottom: "1px solid rgba(255,255,255,0.06)", flexWrap: "wrap", gap: "3rem" }}>

        <div style={{ maxWidth: 300 }}>
          <a href="#hero" style={{ fontFamily: "var(--font-cormorant),serif", fontSize: "1.6rem", fontWeight: 300, letterSpacing: "0.1em", color: "#f5f0eb", marginBottom: "1rem", display: "block", textDecoration: "none" }}>
            KOMINICTVÍ <span style={{ color: "#E8650A" }}>ŠTĚSTÍ</span>
          </a>
          <p style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: "0.75rem", lineHeight: 1.8, color: "#888" }}>
            Prémiový komínový servis s tradicí, certifikací a vášní pro dokonalost. Praha a okolí do 50 km.
          </p>
          <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
            {[
              <svg key="fb" width="16" height="16" viewBox="0 0 24 24" style={{ stroke: "#888", fill: "none", strokeWidth: 1.5 }}><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>,
              <svg key="ig" width="16" height="16" viewBox="0 0 24 24" style={{ stroke: "#888", fill: "none", strokeWidth: 1.5 }}><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>,
            ].map((icon, i) => (
              <div key={i} style={{ width: 36, height: 36, border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.3s" }}
                onMouseOver={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#E8650A")}
                onMouseOut={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)")}
              >{icon}</div>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: "0.6rem", letterSpacing: "0.4em", color: "#E8650A", textTransform: "uppercase" as const, marginBottom: "1.5rem" }}>Navigace</h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            {nav.map((label, i) => (
              <li key={label}><a href={anchors[i]} style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: "0.8rem", color: "#888", textDecoration: "none", transition: "color 0.3s" }} onMouseOver={(e) => ((e.target as HTMLElement).style.color = "#f5f0eb")} onMouseOut={(e) => ((e.target as HTMLElement).style.color = "#888")}>{label}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: "0.6rem", letterSpacing: "0.4em", color: "#E8650A", textTransform: "uppercase" as const, marginBottom: "1.5rem" }}>Služby</h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            {services.map((s) => (
              <li key={s}><a href="#sluzby" style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: "0.8rem", color: "#888", textDecoration: "none", transition: "color 0.3s" }} onMouseOver={(e) => ((e.target as HTMLElement).style.color = "#f5f0eb")} onMouseOut={(e) => ((e.target as HTMLElement).style.color = "#888")}>{s}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: "0.6rem", letterSpacing: "0.4em", color: "#E8650A", textTransform: "uppercase" as const, marginBottom: "1.5rem" }}>Kontakt</h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            {[
              { label: "+420 773 000 000", href: "tel:+420773000000" },
              { label: "info@kominictvi-stesti.cz", href: "mailto:info@kominictvi-stesti.cz" },
              { label: "Praha & okolí 50 km", href: undefined },
              { label: "Po–Pá: 7:00–18:00", href: undefined },
              { label: "www.kominictvi-stesti.cz", href: "https://www.kominictvi-stesti.cz" },
            ].map((item) => (
              <li key={item.label}>
                {item.href ? (
                  <a href={item.href} style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: "0.8rem", color: "#888", textDecoration: "none", transition: "color 0.3s" }} onMouseOver={(e) => ((e.target as HTMLElement).style.color = "#f5f0eb")} onMouseOut={(e) => ((e.target as HTMLElement).style.color = "#888")}>{item.label}</a>
                ) : (
                  <span style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: "0.8rem", color: "#888" }}>{item.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 1200, margin: "0 auto", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: "0.7rem", color: "#888" }}>
          © 2024 Kominictví Štěstí. Všechna práva vyhrazena.
        </div>
        <div style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: "0.7rem", color: "#E8650A" }}>
          Certifikovaný komínový servis Praha
        </div>
      </div>
    </footer>
  );
}
