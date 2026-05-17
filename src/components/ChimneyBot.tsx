"use client";
import { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `Jsi Tomáš, virtuální asistent Kominictví Štěstí. Jsi přátelský, odborný kominík s cylindrem a sazeemi na tváři. 
Odpovídáš stručně a přátelsky v češtině. Pomáháš zákazníkům s otázkami o:
- Čištění a revizi komínů
- Cenách a termínech (říkáš že cenu sdělíme po prohlídce, výjezd do 48h, havarijní do 2h)
- Oblasti působení: Praha, Liberec a okolí, Středočeský kraj
- Kontaktu: +420 778 098 717, Kominictvi@email.cz
- Certifikaci MKS (Moravské kominické společenstvo)
Vždy se představíš jako Tomáš z Kominictví Štěstí. Odpovědi max 2-3 věty. Zakončuj přátelsky.`;

export default function ChimneyBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{role: string, content: string}[]>([
    { role: "assistant", content: "Čau! Jsem Tomáš 🎩 Váš virtuální kominík. Jak vám mohu pomoci?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [pulse, setPulse] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 4000);
    return () => clearTimeout(t);
  }, []);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 300,
          system: SYSTEM_PROMPT,
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Omlouvám se, zkuste to prosím znovu.";
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Omlouvám se, něco se pokazilo. Zavolejte nám na +420 778 098 717." }]);
    }
    setLoading(false);
  };

  return (
    <>
      <style>{`
        @keyframes botPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(232,101,10,0.4); }
          50% { box-shadow: 0 0 0 12px rgba(232,101,10,0); }
        }
        @keyframes botBounce {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes msgIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes typing {
          0%,100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .bot-btn {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1a0a04, #2a1008);
          border: 2px solid rgba(232,101,10,0.5);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          transition: all 0.3s ease;
          animation: botBounce 3s ease-in-out infinite;
        }
        .bot-btn:hover {
          border-color: rgba(232,101,10,0.9);
          box-shadow: 0 0 30px rgba(232,101,10,0.3);
          transform: scale(1.08) !important;
          animation: none;
        }
        .bot-btn.pulse {
          animation: botPulse 1.5s ease-in-out infinite, botBounce 3s ease-in-out infinite;
        }
        .bot-window {
          position: fixed;
          bottom: 7rem;
          right: 2rem;
          width: 340px;
          height: 480px;
          background: #0a0604;
          border: 1px solid rgba(232,101,10,0.3);
          box-shadow: 0 20px 60px rgba(0,0,0,0.8), 0 0 40px rgba(232,101,10,0.08);
          z-index: 9998;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transform-origin: bottom right;
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .bot-msg {
          animation: msgIn 0.3s ease forwards;
          max-width: 85%;
          padding: 0.7rem 1rem;
          border-radius: 12px;
          font-family: -apple-system, sans-serif;
          font-size: 0.82rem;
          line-height: 1.5;
          margin-bottom: 0.5rem;
        }
        .bot-msg.assistant {
          background: rgba(232,101,10,0.12);
          border: 1px solid rgba(232,101,10,0.2);
          color: rgba(255,255,255,0.85);
          align-self: flex-start;
        }
        .bot-msg.user {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.75);
          align-self: flex-end;
        }
        .typing-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(232,101,10,0.7);
          animation: typing 1s ease-in-out infinite;
          display: inline-block;
        }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
      `}</style>

      {/* Chat button */}
      <button className={`bot-btn${pulse ? " pulse" : ""}`} onClick={() => { setOpen(o => !o); setPulse(false); }}>
        <svg width="38" height="38" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cylindr */}
          <rect x="22" y="18" width="36" height="22" rx="2" fill="#111" stroke="#E8650A" strokeWidth="1.5"/>
          <ellipse cx="40" cy="40" rx="20" ry="5" fill="#1a0a04" stroke="#E8650A" strokeWidth="1.5"/>
          <ellipse cx="40" cy="18" rx="18" ry="4" fill="#222" stroke="#E8650A" strokeWidth="1"/>
          {/* Brim */}
          <ellipse cx="40" cy="40" rx="26" ry="6" fill="none" stroke="#E8650A" strokeWidth="1.5"/>
          {/* Oblicej */}
          <ellipse cx="40" cy="54" rx="14" ry="12" fill="#C9A96E"/>
          {/* Saze */}
          <ellipse cx="34" cy="52" rx="3" ry="2" fill="#2a1a08" opacity="0.6"/>
          <ellipse cx="46" cy="56" rx="2" ry="1.5" fill="#2a1a08" opacity="0.5"/>
          {/* Oci */}
          <circle cx="36" cy="51" r="2" fill="#1a0a04"/>
          <circle cx="44" cy="51" r="2" fill="#1a0a04"/>
          <circle cx="36.7" cy="50.3" r="0.7" fill="white" opacity="0.8"/>
          <circle cx="44.7" cy="50.3" r="0.7" fill="white" opacity="0.8"/>
          {/* Usmev */}
          <path d="M35 56 Q40 60 45 56" stroke="#1a0a04" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          {/* Komin kartac */}
          <line x1="54" y1="62" x2="62" y2="72" stroke="#3a2010" strokeWidth="2.5" strokeLinecap="round"/>
          <ellipse cx="60" cy="71" rx="5" ry="4" fill="#2a1408" opacity="0.8"/>
        </svg>
      </button>

      {/* Chat window */}
      {open && (
        <div className="bot-window">
          {/* Header */}
          <div style={{
            padding: "1rem 1.2rem",
            background: "linear-gradient(135deg, #1a0804, #0a0402)",
            borderBottom: "1px solid rgba(232,101,10,0.2)",
            display: "flex", alignItems: "center", gap: "0.8rem",
          }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#0a0402", border: "1.5px solid rgba(232,101,10,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.2rem" }}>🎩</span>
            </div>
            <div>
              <div style={{ fontFamily: "Georgia,serif", fontSize: "0.9rem", color: "#fff", fontWeight: 300 }}>Tomáš — Kominík</div>
              <div style={{ fontFamily: "sans-serif", fontSize: "0.58rem", letterSpacing: "0.15em", color: "rgba(232,101,10,0.8)", textTransform: "uppercase" }}>● Online</div>
            </div>
            <button onClick={() => setOpen(false)} style={{ marginLeft: "auto", background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: "1.2rem", padding: 0 }}>×</button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            {messages.map((m, i) => (
              <div key={i} className={`bot-msg ${m.role}`}>{m.content}</div>
            ))}
            {loading && (
              <div className="bot-msg assistant" style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick replies */}
          <div style={{ padding: "0.5rem 1rem", display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            {["Cena čištění?", "Rychlý výjezd?", "Revizní zpráva?"].map(q => (
              <button key={q} onClick={() => { setInput(q); }} style={{
                background: "rgba(232,101,10,0.08)", border: "1px solid rgba(232,101,10,0.2)",
                color: "rgba(232,101,10,0.8)", fontFamily: "sans-serif", fontSize: "0.62rem",
                padding: "0.3rem 0.6rem", cursor: "pointer", letterSpacing: "0.05em",
                transition: "all 0.2s ease",
              }}
              onMouseOver={e => (e.currentTarget.style.background = "rgba(232,101,10,0.18)")}
              onMouseOut={e => (e.currentTarget.style.background = "rgba(232,101,10,0.08)")}
              >{q}</button>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: "0.8rem", borderTop: "1px solid rgba(232,101,10,0.15)", display: "flex", gap: "0.5rem" }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Napište dotaz..."
              style={{
                flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(232,101,10,0.2)",
                color: "white", fontFamily: "sans-serif", fontSize: "0.82rem", padding: "0.6rem 0.8rem",
                outline: "none", borderRadius: "4px",
              }}
            />
            <button onClick={send} disabled={loading} style={{
              background: loading ? "rgba(232,101,10,0.3)" : "rgba(232,101,10,0.9)",
              border: "none", color: "white", padding: "0.6rem 1rem", cursor: loading ? "default" : "pointer",
              fontFamily: "sans-serif", fontSize: "0.75rem", letterSpacing: "0.1em",
              borderRadius: "4px", transition: "all 0.2s ease",
            }}>→</button>
          </div>
        </div>
      )}
    </>
  );
}
