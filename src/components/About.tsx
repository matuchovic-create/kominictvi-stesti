export default function About() {
  return (
    <section id="o-nas" style={{ background: "var(--carbon)", padding: "9rem clamp(1.5rem,5vw,5rem)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", right: -100, top: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,101,10,0.05), transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7rem", alignItems: "center" }} className="about-grid">

          <div className="reveal">
            <div className="section-label" style={{ marginBottom: "1.8rem" }}>O nás</div>
            <h2 className="display-title" style={{ fontSize: "clamp(2.8rem,5vw,5rem)", marginBottom: "1.5rem" }}>
              Kominictví<br />jako <em>umění</em>
            </h2>
            <div style={{ width: 48, height: 1, background: "linear-gradient(90deg, var(--ember), transparent)", marginBottom: "2rem" }} />
            <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.9rem", lineHeight: 1.9, color: "var(--text-secondary)", fontWeight: 300 }}>
              Jsme Kominictví Štěstí — Tomáš Baran. Specializujeme se na komplexní služby v oblasti komínů a kouřovodů, včetně jejich čištění, revizí a oprav. Přinášíme štěstí našim zákazníkům tím, že se staráme o jejich bezpečí a pohodlí.
            </p>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: "0.9rem", lineHeight: 1.9, color: "var(--text-secondary)", fontWeight: 300, marginTop: "1rem" }}>
              Působíme po celém Středočeském a Libereckém kraji. Jsme hrdými členy Moravského kominického společenstva — zárukou odbornosti, kvality a dodržování legislativních požadavků.
            </p>

            <div style={{ display: "flex", gap: "3rem", marginTop: "3.5rem", paddingTop: "2.5rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              {[
                { num: "100%", label: "spokojených zákazníků" },
                { num: "5★", label: "hodnocení Google" },
                { num: "MKS", label: "člen společenstva" }
              ].map(s => (
                <div key={s.num}>
                  <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.2rem", fontWeight: 500, color: "var(--ember)", lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontFamily: "var(--font-ui)", fontSize: "0.6rem", letterSpacing: "0.25em", color: "var(--text-muted)", textTransform: "uppercase", marginTop: "0.4rem" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal reveal-delay-2" style={{ position: "relative", height: 480, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {[
              { size: 420, color: "rgba(232,101,10,0.05)", dur: "30s", rev: false },
              { size: 310, color: "rgba(232,101,10,0.09)", dur: "20s", rev: true },
              { size: 210, color: "rgba(232,101,10,0.14)", dur: "13s", rev: false },
            ].map((r, i) => (
              <div key={i} className={r.rev ? "rotate-slow-reverse" : "rotate-slow"}
                style={{ position: "absolute", width: r.size, height: r.size, borderRadius: "50%", border: `1px solid ${r.color}`, "--dur": r.dur } as React.CSSProperties}
              />
            ))}
            <div style={{ width: 180, height: 180, borderRadius: "50%", background: "linear-gradient(135deg, rgba(232,101,10,0.18), rgba(201,169,110,0.08))", border: "1px solid rgba(232,101,10,0.25)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", zIndex: 2 }}>
              <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.3rem", fontWeight: 600, color: "var(--ember)", lineHeight: 1.2 }}>MKS</div>
              <div style={{ fontFamily: "var(--font-ui)", fontSize: "0.48rem", letterSpacing: "0.2em", color: "var(--text-muted)", textTransform: "uppercase", marginTop: "0.4rem", padding: "0 1rem" }}>Člen kominického společenstva</div>
            </div>
            {[
              { label: "Mladá Boleslav", sub: "& Liberecký kraj", top: 55, right: 28, dur: "7s", delay: "0s" },
              { label: "24/7", sub: "Pohotovost", bottom: 70, left: 15, dur: "9s", delay: "2s" },
            ].map((b, i) => (
              <div key={i} className="float-card"
                style={{ position: "absolute", top: b.top, bottom: b.bottom, right: b.right, left: b.left, "--dur": b.dur, "--delay": b.delay, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(20px)", padding: "1rem 1.5rem", textAlign: "center" } as React.CSSProperties}
              >
                <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.2rem", fontWeight: 500, color: "var(--ember)" }}>{b.label}</div>
                <div style={{ fontFamily: "var(--font-ui)", fontSize: "0.52rem", letterSpacing: "0.2em", color: "var(--text-muted)", textTransform: "uppercase", marginTop: "0.2rem" }}>{b.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){.about-grid{grid-template-columns:1fr!important;gap:3rem!important}}`}</style>
    </section>
  );
}
