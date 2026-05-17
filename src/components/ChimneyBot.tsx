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

const BotAvatar = ({ size = 56, onClick }: { size?: number; onClick?: () => void }) => (
  <svg width={size} height={size} viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg"
    onClick={onClick} style={{ cursor: "pointer", display: "block" }}>
    <style>{`
      @keyframes cbBreathe{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.03)}}
      @keyframes cbBlink{0%,88%,100%{transform:scaleY(0)}95%{transform:scaleY(1)}}
      @keyframes cbEyeMove{0%,100%{transform:translateX(0)}25%{transform:translateX(2px)}75%{transform:translateX(-2px)}}
      @keyframes cbFlame1{0%,100%{transform:scaleY(1) skewX(-2deg);opacity:.9}33%{transform:scaleY(1.15) skewX(2deg);opacity:1}66%{transform:scaleY(.9);opacity:.8}}
      @keyframes cbFlame2{0%,100%{transform:scaleY(1) skewX(1deg)}50%{transform:scaleY(1.2) skewX(-2deg)}}
      @keyframes cbEmber{0%{transform:translate(0,0);opacity:1}100%{transform:translate(var(--ex),var(--ey));opacity:0}}
      @keyframes cbHat{0%,100%{transform:rotate(0deg)}30%{transform:rotate(-2deg)}70%{transform:rotate(1.5deg)}}
      .cb-breathe{animation:cbBreathe 3s ease-in-out infinite;transform-origin:40px 80px}
      .cb-hat{animation:cbHat 4s ease-in-out infinite;transform-origin:40px 38px}
      .cb-flame-a{transform-origin:40px 12px;animation:cbFlame1 .5s ease-in-out infinite}
      .cb-flame-b{transform-origin:40px 12px;animation:cbFlame2 .6s .1s ease-in-out infinite}
      .cb-eye-l{animation:cbEyeMove 4s ease-in-out infinite}
      .cb-eye-r{animation:cbEyeMove 4s ease-in-out infinite reverse}
      .cb-lid-l{transform-origin:34px 54px;animation:cbBlink 4s ease-in-out infinite}
      .cb-lid-r{transform-origin:46px 54px;animation:cbBlink 4s ease-in-out infinite}
      .cb-em1{--ex:8px;--ey:-15px;animation:cbEmber 1.4s .2s ease-out infinite}
      .cb-em2{--ex:-6px;--ey:-20px;animation:cbEmber 1.7s .7s ease-out infinite}
      .cb-em3{--ex:12px;--ey:-12px;animation:cbEmber 1.2s 1s ease-out infinite}
    `}</style>

    <g className="cb-breathe">
      {/* Flames */}
      <path className="cb-flame-a" d="M37,12 Q35,4 40,0 Q45,4 43,12Z" fill="#FF4500" opacity=".95"/>
      <path className="cb-flame-b" d="M38,12 Q37,6 40,3 Q43,6 42,12Z" fill="#FFD166" opacity=".9"/>
      <path d="M39,12 Q39,8 40,6 Q41,8 41,12Z" fill="#fff" opacity=".7"/>
      {/* Embers */}
      <circle className="cb-em1" cx="40" cy="10" r="1.5" fill="#FF8C42"/>
      <circle className="cb-em2" cx="40" cy="10" r="1" fill="#FFD166"/>
      <circle className="cb-em3" cx="40" cy="10" r="1.2" fill="#FF4500"/>
      {/* Hat */}
      <g className="cb-hat">
        <rect x="24" y="12" width="32" height="22" rx="2" fill="#0d0d0d" stroke="#2a2a2a" strokeWidth=".5"/>
        <rect x="20" y="33" width="40" height="6" rx="1" fill="#111" stroke="#2a2a2a" strokeWidth=".5"/>
        <rect x="24" y="28" width="32" height="4" fill="#E8650A" opacity=".75"/>
        <rect x="24" y="29" width="32" height="1" fill="#FFD166" opacity=".4"/>
      </g>
      {/* Head */}
      <ellipse cx="40" cy="58" rx="17" ry="16" fill="#C9A96E"/>
      {/* Soot */}
      <ellipse cx="33" cy="56" rx="3.5" ry="2.5" fill="#1a0a04" opacity=".5"/>
      <ellipse cx="48" cy="60" rx="2.5" ry="2" fill="#1a0a04" opacity=".4"/>
      {/* Eye whites */}
      <ellipse cx="34" cy="54" rx="5" ry="5.5" fill="white"/>
      <ellipse cx="46" cy="54" rx="5" ry="5.5" fill="white"/>
      {/* Iris L */}
      <g className="cb-eye-l">
        <circle cx="34" cy="54" r="3.2" fill="#4a2010"/>
        <circle cx="34" cy="54" r="2" fill="#1a0804"/>
        <circle cx="35.2" cy="52.8" r=".9" fill="white" opacity=".9"/>
      </g>
      {/* Iris R */}
      <g className="cb-eye-r">
        <circle cx="46" cy="54" r="3.2" fill="#4a2010"/>
        <circle cx="46" cy="54" r="2" fill="#1a0804"/>
        <circle cx="47.2" cy="52.8" r=".9" fill="white" opacity=".9"/>
      </g>
      {/* Eyelids */}
      <ellipse className="cb-lid-l" cx="34" cy="54" rx="5.2" ry="5.7" fill="#C9A96E"/>
      <ellipse className="cb-lid-r" cx="46" cy="54" rx="5.2" ry="5.7" fill="#C9A96E"/>
      {/* Brows */}
      <path d="M29 48.5 Q34 46.5 39 48.5" stroke="#5a3010" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M43 48.5 Q46 46.5 51 48.5" stroke="#5a3010" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Nose */}
      <ellipse cx="40" cy="59" rx="2.5" ry="2" fill="#b8956a"/>
      {/* Smile */}
      <path d="M34 64 Q40 69 46 64" stroke="#5a3010" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M36 64.5 Q40 67.5 44 64.5" fill="white" opacity=".8"/>
      {/* Body */}
      <path d="M23,74 Q24,68 40,66 Q56,68 57,74 L60,95 Q40,98 20,95 Z" fill="#0d0d0d"/>
      <path d="M40,66 L35,75 L30,66" fill="#1a1a1a"/>
      <path d="M40,66 L45,75 L50,66" fill="#1a1a1a"/>
      <circle cx="40" cy="76" r="1.5" fill="#E8650A" opacity=".8"/>
      <circle cx="40" cy="82" r="1.5" fill="#E8650A" opacity=".6"/>
      <circle cx="40" cy="88" r="1.5" fill="#E8650A" opacity=".4"/>
    </g>
  </svg>
);

export default function ChimneyBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{role: string, content: string}[]>([
    { role: "assistant", content: "Čau! Jsem Tomáš, váš virtuální kominík 🎩 Jak vám mohu pomoci?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
      setMessages(prev => [...prev, { role: "assistant", content: "Zavolejte nám na +420 778 098 717." }]);
    }
    setLoading(false);
  };

  return (
    <>
      <style>{`
        @keyframes botPulse{0%,100%{box-shadow:0 0 0 0 rgba(232,101,10,0.5)}50%{box-shadow:0 0 0 14px rgba(232,101,10,0)}}
        @keyframes msgIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes typingDot{0%,100%{opacity:.3;transform:scale(1)}50%{opacity:1;transform:scale(1.3)}}
        .bot-btn-wrap{position:fixed;bottom:2rem;right:2rem;z-index:9999;width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,#1a0804,#0a0402);border:2px solid rgba(232,101,10,0.6);display:flex;align-items:center;justify-content:center;cursor:pointer;animation:botPulse 2.5s ease-in-out infinite;transition:all .3s ease}
        .bot-btn-wrap:hover{border-color:#E8650A;box-shadow:0 0 30px rgba(232,101,10,0.4);transform:scale(1.08);animation:none}
        .bot-window{position:fixed;bottom:7.5rem;right:2rem;width:340px;height:500px;background:#080604;border:1px solid rgba(232,101,10,0.3);box-shadow:0 20px 60px rgba(0,0,0,0.9),0 0 40px rgba(232,101,10,0.08);z-index:9998;display:flex;flex-direction:column;overflow:hidden}
        .bot-msg{animation:msgIn .3s ease forwards;max-width:85%;padding:.7rem 1rem;font-family:-apple-system,sans-serif;font-size:.82rem;line-height:1.55;margin-bottom:.4rem}
        .bot-msg.assistant{background:rgba(232,101,10,0.1);border:1px solid rgba(232,101,10,0.2);color:rgba(255,255,255,.85);align-self:flex-start;border-radius:0 12px 12px 12px}
        .bot-msg.user{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.75);align-self:flex-end;border-radius:12px 0 12px 12px}
        .typing-d{width:6px;height:6px;border-radius:50%;background:rgba(232,101,10,.8);display:inline-block;animation:typingDot 1s ease-in-out infinite}
        .typing-d:nth-child(2){animation-delay:.2s}
        .typing-d:nth-child(3){animation-delay:.4s}
        .quick-btn{background:rgba(232,101,10,0.08);border:1px solid rgba(232,101,10,0.2);color:rgba(232,101,10,0.85);font-family:sans-serif;font-size:.6rem;padding:.3rem .65rem;cursor:pointer;letter-spacing:.05em;transition:all .2s ease;white-space:nowrap}
        .quick-btn:hover{background:rgba(232,101,10,0.2);border-color:rgba(232,101,10,0.5)}
        .chat-input{flex:1;background:rgba(255,255,255,0.05);border:1px solid rgba(232,101,10,0.2);color:white;font-family:sans-serif;font-size:.82rem;padding:.6rem .8rem;outline:none}
        .chat-input:focus{border-color:rgba(232,101,10,0.5)}
        .send-btn{background:rgba(232,101,10,0.9);border:none;color:white;padding:.6rem 1rem;cursor:pointer;font-size:.85rem;transition:all .2s ease}
        .send-btn:hover{background:#E8650A}
        .send-btn:disabled{background:rgba(232,101,10,0.3);cursor:default}
      `}</style>

      {/* Bot button */}
      <div className="bot-btn-wrap" onClick={() => setOpen(o => !o)}>
        <BotAvatar size={52}/>
      </div>

      {/* Chat window */}
      {open && (
        <div className="bot-window">
          {/* Header */}
          <div style={{ padding: "0.9rem 1.2rem", background: "linear-gradient(135deg,#1a0804,#0a0402)", borderBottom: "1px solid rgba(232,101,10,0.2)", display: "flex", alignItems: "center", gap: "0.7rem" }}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#0a0402", border: "1.5px solid rgba(232,101,10,0.5)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <BotAvatar size={32}/>
            </div>
            <div>
              <div style={{ fontFamily: "Georgia,serif", fontSize: "0.9rem", color: "#fff", fontWeight: 300 }}>Tomáš — Kominík</div>
              <div style={{ fontFamily: "sans-serif", fontSize: "0.55rem", letterSpacing: "0.15em", color: "rgba(232,101,10,0.9)", textTransform: "uppercase" }}>● Online · Kominictví Štěstí</div>
            </div>
            <button onClick={() => setOpen(false)} style={{ marginLeft: "auto", background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: "1.3rem", padding: 0, lineHeight: 1 }}>×</button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "1rem", display: "flex", flexDirection: "column" }}>
            {messages.map((m, i) => (
              <div key={i} className={`bot-msg ${m.role}`}>{m.content}</div>
            ))}
            {loading && (
              <div className="bot-msg assistant" style={{ display: "flex", gap: "5px", alignItems: "center", padding: ".7rem 1rem" }}>
                <span className="typing-d"/><span className="typing-d"/><span className="typing-d"/>
              </div>
            )}
            <div ref={messagesEndRef}/>
          </div>

          {/* Quick replies */}
          <div style={{ padding: "0.5rem 0.8rem", display: "flex", gap: "0.4rem", flexWrap: "wrap", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            {["Cena čištění?", "Rychlý výjezd?", "Revizní zpráva?", "Oblast působení?"].map(q => (
              <button key={q} className="quick-btn" onClick={() => setInput(q)}>{q}</button>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: "0.7rem", borderTop: "1px solid rgba(232,101,10,0.15)", display: "flex", gap: "0.5rem" }}>
            <input className="chat-input" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Napište dotaz..."/>
            <button className="send-btn" onClick={send} disabled={loading}>→</button>
          </div>
        </div>
      )}
    </>
  );
}
