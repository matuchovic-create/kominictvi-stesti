export default function About() {
  return (
    <section
      id="o-nas"
      style={{
        background: "#111111",
        padding: "8rem 3rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: -200,
          top: -200,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(232,101,10,0.06), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "6rem",
          alignItems: "center",
          maxWidth: 1200,
          margin: "0 auto",
        }}
        className="about-grid"
      >
        <div className="reveal">
          <div
            className="section-eyebrow-line"
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
            O nás
          </div>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 300,
              lineHeight: 1.1,
              color: "#f5f0eb",
            }}
          >
            Kominictví
            <br />
            jako{" "}
            <em
              style={{
                fontStyle: "italic",
                background: "linear-gradient(135deg, #E8650A, #FF8C42)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              umění
            </em>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-syne), sans-serif",
              fontSize: "0.95rem",
              lineHeight: 1.9,
              color: "#bbbbbb",
              marginTop: "2rem",
            }}
          >
            Jsme rodinná firma s více než 15 lety zkušeností v oboru komínového
            servisu. Každou práci přistupujeme s maximální precizností,
            profesionalitou a péčí o detail, která nás odlišuje od průměru.
          </p>
          <p
            style={{
              fontFamily: "var(--font-syne), sans-serif",
              fontSize: "0.95rem",
              lineHeight: 1.9,
              color: "#bbbbbb",
              marginTop: "1rem",
            }}
          >
            Spojujeme tradiční řemeslné dovednosti s nejmodernějšími
            technologiemi a diagnostickými metodami. Váš komín je v nejlepších
            rukou.
          </p>
          <div
            style={{
              marginTop: "3rem",
              display: "flex",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            {[
              { num: "100%", label: "spokojených zákazníků" },
              { num: "5★", label: "průměrné hodnocení" },
            ].map((s) => (
              <div key={s.num}>
                <div
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "2.5rem",
                    color: "#E8650A",
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-syne), sans-serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.3em",
                    color: "#888",
                    textTransform: "uppercase" as const,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="reveal reveal-delay-2"
          style={{
            position: "relative",
            height: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Animated rings */}
          {[
            { size: 400, color: "rgba(232,101,10,0.08)", dur: "25s", rev: false },
            { size: 300, color: "rgba(232,101,10,0.12)", dur: "18s", rev: true },
            { size: 220, color: "rgba(232,101,10,0.2)", dur: "12s", rev: false },
          ].map((r, i) => (
            <div
              key={i}
              className={r.rev ? "rotate-slow-reverse" : "rotate-slow"}
              style={
                {
                  position: "absolute",
                  width: r.size,
                  height: r.size,
                  borderRadius: "50%",
                  border: `1px solid ${r.color}`,
                  "--dur": r.dur,
                } as React.CSSProperties
              }
            />
          ))}

          {/* Center */}
          <div
            style={{
              width: 200,
              height: 200,
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, rgba(232,101,10,0.2), rgba(201,169,110,0.1))",
              border: "1px solid rgba(232,101,10,0.3)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              position: "relative",
              zIndex: 2,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display), serif",
                fontSize: "3rem",
                fontWeight: 600,
                color: "#E8650A",
              }}
            >
              ČSN
            </div>
            <div
              style={{
                fontFamily: "var(--font-syne), sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.3em",
                color: "#888",
                textTransform: "uppercase" as const,
              }}
            >
              Certifikováno
            </div>
          </div>

          {/* Floating badges */}
          {[
            {
              top: 60,
              right: 30,
              num: "Praha",
              sub: "& okolí 50km",
              dur: "7s",
              delay: "0s",
            },
            {
              bottom: 80,
              left: 20,
              num: "24/7",
              sub: "Pohotovost",
              dur: "9s",
              delay: "2s",
            },
          ].map((b, i) => (
            <div
              key={i}
              className="glass-stat float-card"
              style={
                {
                  position: "absolute",
                  top: b.top,
                  bottom: b.bottom,
                  right: b.right,
                  left: b.left,
                  "--dur": b.dur,
                  "--delay": b.delay,
                  padding: "1rem 1.5rem",
                  textAlign: "center",
                } as React.CSSProperties
              }
            >
              <div
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "1.5rem",
                  color: "#E8650A",
                }}
              >
                {b.num}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-syne), sans-serif",
                  fontSize: "0.6rem",
                  color: "#888",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase" as const,
                }}
              >
                {b.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
}
