"use client";
import { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `Jsi Tomáš, virtuální asistent Kominictví Štěstí. Jsi přátelský, odborný kominík s cylindrem a sazeemi na tváři. 
Odpovídáš stručně a přátelsky v češtině. Pomáháš zákazníkům s otázkami o:
- Čištění a revizi komínů
- Cenách a termínech (říkáš že cenu sdělíme po prohlídce, výjezd do 48h, havarijní do 2h)
- Oblasti působení: Praha, Liberec a okolí, Středočeský kraj
- Kontaktu: +420 778 098 717, Kominictvi@email.cz
- Certifikaci MKS (Moravské kominické společenstvo)
Když uživatel nahraje fotku komínu, popiš stav komínu na základě obrázku a doporuč postup.
Vždy se představíš jako Tomáš z Kominictví Štěstí. Odpovědi max 2-3 věty. Zakončuj přátelsky.`;

const THANK_WORDS = ["díky", "děkuji", "děkuju", "super", "skvělý", "výborně", "perfektní", "paráda", "thank"];

type Mood = "happy" | "sad" | "thinking" | "dancing" | "back";

const BotAvatar = ({ size = 56, eyeX = 0, eyeY = 0, mood = "happy" }: { size?: number; eyeX?: number; eyeY?: number; mood?: Mood }) => {
  const ex = Math.max(-2, Math.min(2, eyeX));
  const ey = Math.max(-1.5, Math.min(1.5, eyeY));
  const isBack = mood === "back";
  const isDancing = mood === "dancing";

  return (
    <svg width={size} height={size} viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <style>{`
        @keyframes cbBreathe{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.03)}}
        @keyframes cbBlink{0%,88%,94%,100%{transform:scaleY(0)}91%{transform:scaleY(1)}}
        @keyframes cbFlame1{0%,100%{transform:scaleY(1) skewX(-2deg);opacity:.9}33%{transform:scaleY(1.15) skewX(2deg);opacity:1}66%{transform:scaleY(.9);opacity:.8}}
        @keyframes cbFlame2{0%,100%{transform:scaleY(1) skewX(1deg)}50%{transform:scaleY(1.2) skewX(-2deg)}}
        @keyframes cbEmber{0%{transform:translate(0,0);opacity:1}100%{transform:translate(var(--ex),var(--ey));opacity:0}}
        @keyframes cbHat{0%,100%{transform:rotate(0deg)}30%{transform:rotate(-2deg)}70%{transform:rotate(1.5deg)}}
        @keyframes cbDance{0%{transform:rotate(-15deg) translateY(0)}25%{transform:rotate(15deg) translateY(-4px)}50%{transform:rotate(-10deg) translateY(0)}75%{transform:rotate(10deg) translateY(-4px)}100%{transform:rotate(-15deg) translateY(0)}}
        @keyframes cbArmL{0%,100%{transform:rotate(0deg)}50%{transform:rotate(-40deg)}}
        @keyframes cbArmR{0%,100%{transform:rotate(0deg)}50%{transform:rotate(40deg)}}
        .cb-breathe{animation:cbBreathe 3s ease-in-out infinite;transform-origin:40px 80px}
        .cb-dance{animation:cbDance .5s ease-in-out infinite;transform-origin:40px 80px}
        .cb-hat{animation:cbHat 4s ease-in-out infinite;transform-origin:40px 38px}
        .cb-flame-a{transform-origin:40px 12px;animation:cbFlame1 .5s ease-in-out infinite}
        .cb-flame-b{transform-origin:40px 12px;animation:cbFlame2 .6s .1s ease-in-out infinite}
        .cb-lid-l{transform-origin:34px 54px;animation:cbBlink 5s ease-in-out infinite}
        .cb-lid-r{transform-origin:46px 54px;animation:cbBlink 5s ease-in-out infinite}
        .cb-em1{--ex:8px;--ey:-15px;animation:cbEmber 1.4s .2s ease-out infinite}
        .cb-em2{--ex:-6px;--ey:-20px;animation:cbEmber 1.7s .7s ease-out infinite}
        .cb-em3{--ex:12px;--ey:-12px;animation:cbEmber 1.2s 1s ease-out infinite}
        .cb-arm-l{transform-origin:28px 70px;animation:cbArmL .5s ease-in-out infinite}
        .cb-arm-r{transform-origin:52px 70px;animation:cbArmR .5s ease-in-out infinite}
      `}</style>

      {isBack ? (
        // Back view
        <g>
          <path className="cb-flame-a" d="M37,12 Q35,4 40,0 Q45,4 43,12Z" fill="#FF4500" opacity=".95"/>
          <rect x="24" y="12" width="32" height="22" rx="2" fill="#0d0d0d" stroke="#2a2a2a" strokeWidth=".5"/>
          <rect x="20" y="33" width="40" height="6" rx="1" fill="#111"/>
          <rect x="24" y="28" width="32" height="4" fill="#E8650A" opacity=".75"/>
          <ellipse cx="40" cy="58" rx="17" ry="16" fill="#8a6a3e"/>
          <ellipse cx="40" cy="54" rx="6" ry="8" fill="#6a4a2e" opacity=".5"/>
          <path d="M23,74 Q24,68 40,66 Q56,68 57,74 L60,95 Q40,98 20,95 Z" fill="#0d0d0d"/>
          <path d="M35,68 L35,90" stroke="#1a1a1a" strokeWidth="1"/>
          <path d="M45,68 L45,90" stroke="#1a1a1a" strokeWidth="1"/>
          <text x="40" y="82" textAnchor="middle" fontSize="8" fill="#E8650A" opacity=".6">KŠ</text>
        </g>
      ) : (
        <g className={isDancing ? "cb-dance" : "cb-breathe"}>
          <path className="cb-flame-a" d="M37,12 Q35,4 40,0 Q45,4 43,12Z" fill="#FF4500" opacity=".95"/>
          <path className="cb-flame-b" d="M38,12 Q37,6 40,3 Q43,6 42,12Z" fill="#FFD166" opacity=".9"/>
          <path d="M39,12 Q39,8 40,6 Q41,8 41,12Z" fill="#fff" opacity=".7"/>
          <circle className="cb-em1" cx="40" cy="10" r="1.5" fill="#FF8C42"/>
          <circle className="cb-em2" cx="40" cy="10" r="1" fill="#FFD166"/>
          <circle className="cb-em3" cx="40" cy="10" r="1.2" fill="#FF4500"/>
          <g className="cb-hat">
            <rect x="24" y="12" width="32" height="22" rx="2" fill="#0d0d0d" stroke="#2a2a2a" strokeWidth=".5"/>
            <rect x="20" y="33" width="40" height="6" rx="1" fill="#111" stroke="#2a2a2a" strokeWidth=".5"/>
            <rect x="24" y="28" width="32" height="4" fill="#E8650A" opacity=".75"/>
            <rect x="24" y="29" width="32" height="1" fill="#FFD166" opacity=".4"/>
          </g>
          <ellipse cx="40" cy="58" rx="17" ry="16" fill="#C9A96E"/>
          <ellipse cx="33" cy="56" rx="3.5" ry="2.5" fill="#1a0a04" opacity=".5"/>
          <ellipse cx="48" cy="60" rx="2.5" ry="2" fill="#1a0a04" opacity=".4"/>
          <ellipse cx="34" cy="54" rx="5" ry="5.5" fill="white"/>
          <ellipse cx="46" cy="54" rx="5" ry="5.5" fill="white"/>
          <circle cx={34 + ex} cy={54 + ey} r="3.2" fill="#4a2010"/>
          <circle cx={34 + ex} cy={54 + ey} r="2" fill="#1a0804"/>
          <circle cx={35.2 + ex} cy={52.8 + ey} r=".9" fill="white" opacity=".9"/>
          <circle cx={46 + ex} cy={54 + ey} r="3.2" fill="#4a2010"/>
          <circle cx={46 + ex} cy={54 + ey} r="2" fill="#1a0804"/>
          <circle cx={47.2 + ex} cy={52.8 + ey} r=".9" fill="white" opacity=".9"/>
          <ellipse className="cb-lid-l" cx="34" cy="54" rx="5.2" ry="5.7" fill="#C9A96E"/>
          <ellipse className="cb-lid-r" cx="46" cy="54" rx="5.2" ry="5.7" fill="#C9A96E"/>
          <path d="M29 48.5 Q34 46.5 39 48.5" stroke="#5a3010" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <path d="M43 48.5 Q46 46.5 51 48.5" stroke="#5a3010" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <ellipse cx="40" cy="59" rx="2.5" ry="2" fill="#b8956a"/>
          {mood === "dancing" && <path d="M33 63 Q40 70 47 63" stroke="#5a3010" strokeWidth="2" fill="none" strokeLinecap="round"/>}
          {mood === "dancing" && <path d="M35 63.5 Q40 68 45 63.5" fill="#FFD166" opacity=".9"/>}
          {mood === "happy" && <path d="M34 64 Q40 69 46 64" stroke="#5a3010" strokeWidth="1.5" fill="none" strokeLinecap="round"/>}
          {mood === "happy" && <path d="M36 64.5 Q40 67.5 44 64.5" fill="white" opacity=".8"/>}
          {mood === "sad" && <><path d="M34 67 Q40 63 46 67" stroke="#5a3010" strokeWidth="1.5" fill="none" strokeLinecap="round"/><path d="M44 50 Q46 54 45 57" stroke="#8ab4f8" strokeWidth="1" fill="none" opacity=".7"/></>}
          {mood === "thinking" && <path d="M35 65 Q40 65 45 65" stroke="#5a3010" strokeWidth="1.5" fill="none" strokeLinecap="round"/>}
          <path d="M23,74 Q24,68 40,66 Q56,68 57,74 L60,95 Q40,98 20,95 Z" fill="#0d0d0d"/>
          {isDancing ? (
            <>
              <g className="cb-arm-l"><path d="M28,70 Q18,60 14,55" stroke="#0d0d0d" strokeWidth="7" fill="none" strokeLinecap="round"/></g>
              <g className="cb-arm-r"><path d="M52,70 Q62,60 66,55" stroke="#0d0d0d" strokeWidth="7" fill="none" strokeLinecap="round"/></g>
            </>
          ) : (
            <>
              <path d="M40,66 L35,75 L30,66" fill="#1a1a1a"/>
              <path d="M40,66 L45,75 L50,66" fill="#1a1a1a"/>
            </>
          )}
          <circle cx="40" cy="76" r="1.5" fill="#E8650A" opacity=".8"/>
          <circle cx="40" cy="82" r="1.5" fill="#E8650A" opacity=".6"/>
          <circle cx="40" cy="88" r="1.5" fill="#E8650A" opacity=".4"/>
        </g>
      )}
    </svg>
  );
};

// Confetti canvas
const ConfettiCanvas = ({ active }: { active: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = 350; canvas.height = 520;
    const particles: any[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: 175, y: 400,
        vx: (Math.random() - 0.5) * 12,
        vy: -(Math.random() * 14 + 4),
        color: ["#FF4500","#FF8C42","#FFD166","#E8650A","#fff","#22c55e"][Math.floor(Math.random()*6)],
        size: Math.random() * 5 + 2,
        life: 1, decay: Math.random() * 0.02 + 0.01,
        rot: Math.random() * 360, rotV: (Math.random()-0.5)*10,
      });
    }
    let raf: number;
    const animate = () => {
      ctx.clearRect(0,0,350,520);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.4;
        p.vx *= 0.98; p.life -= p.decay; p.rot += p.rotV;
        ctx.save(); ctx.globalAlpha = Math.max(0, p.life);
        ctx.translate(p.x, p.y); ctx.rotate(p.rot * Math.PI/180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size*1.5);
        ctx.restore();
      });
      if (particles.some(p => p.life > 0)) raf = requestAnimationFrame(animate);
      else ctx.clearRect(0,0,350,520);
    };
    animate();
    return () => cancelAnimationFrame(raf);
  }, [active]);
  return <canvas ref={canvasRef} style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:10 }}/>;
};

export default function ChimneyBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{role:string,content:string,rating?:number,image?:string}[]>([
    { role:"assistant", content:"Čau! Jsem Tomáš, váš virtuální kominík 🎩 Jak vám mohu pomoci?" },
    { role:"assistant", content:"💡 Tip: Popište mi problém s komínem (kouř, zápach, praskání...) a já okamžitě vyhodnotím jak je situace urgentní a co dělat dál." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [eyePos, setEyePos] = useState({x:0,y:0});
  const [mood, setMood] = useState<Mood>("happy");
  const [showBubble, setShowBubble] = useState(false);
  const [hasNotif, setHasNotif] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const [confetti, setConfetti] = useState(false);
  const [weather, setWeather] = useState<string>("");
  const [urgency, setUrgency] = useState(0);
  const [showUrgent, setShowUrgent] = useState(false);
  const [proactiveSent, setProactiveSent] = useState<string[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  

  // Eye tracking
  useEffect(() => {
    const h = (e: MouseEvent) => {
      const btn = btnRef.current;
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      const dx = (e.clientX - (r.left+r.width/2)) / window.innerWidth * 4;
      const dy = (e.clientY - (r.top+r.height/2)) / window.innerHeight * 3;
      setEyePos({ x: Math.max(-2,Math.min(2,dx)), y: Math.max(-1.5,Math.min(1.5,dy)) });
    };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  // Proactive bubble
  useEffect(() => {
    const t = setTimeout(() => { if (!open) { setShowBubble(true); setHasNotif(true); } }, 12000);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    if (!showBubble) return;
    const t = setTimeout(() => setShowBubble(false), 8000);
    return () => clearTimeout(t);
  }, [showBubble]);

  // Weather
  useEffect(() => {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=50.08&longitude=14.44&current=temperature_2m,weathercode&timezone=Europe/Prague")
      .then(r => r.json())
      .then(d => {
        const temp = d.current?.temperature_2m;
        const code = d.current?.weathercode;
        if (temp !== undefined) {
          let msg = "";
          if (temp < 2) msg = `❄️ Dnes je ${temp}°C — mráz! Ideální čas zkontrolovat komín před topnou sezonou.`;
          else if (code >= 61) msg = `🌧️ Venku prší (${temp}°C). Věděli jste, že vlhkost zrychluje usazování sazí?`;
          else if (temp > 25) msg = `☀️ Krásné počasí! (${temp}°C) Ideální čas na revizi komínu před zimou.`;
          else msg = `🌡️ Aktuálně ${temp}°C v Praze. Plánujete topnou sezonu? Rádi pomůžeme!`;
          setWeather(msg);
        }
      }).catch(() => {});
  }, []);

  // Proactive scroll tracking
  useEffect(() => {
    const sections: {[key: string]: string} = {
      "sluzby": "Vidím že vás zajímají naše služby 👀 Tento měsíc máme akci na čištění komínu — zavolejte pro speciální cenu!",
      "reference": "Rádi vidím že si čtete reference 😊 800+ spokojených zákazníků mluví za nás. Mohu vám poradit?",
      "galerie": "Prohlížíte si naši práci? Rádi uděláme revizi i vašeho komínu — výjezd do 48 hodin!",
      "o-nas": "Chcete vědět více o nás? Jsme certifikovaní členové MKS. Mám odpovědět na vaše otázky?",
    };
    const timers: {[key: string]: ReturnType<typeof setTimeout>} = {};
    const observers: IntersectionObserver[] = [];

    Object.entries(sections).forEach(([id, msg]) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          timers[id] = setTimeout(() => {
            setProactiveSent(prev => {
              if (prev.includes(id)) return prev;
              setMessages(m => [...m, { role: "assistant", content: msg }]);
              if (!open) { setHasNotif(true); setShowBubble(true); }
              return [...prev, id];
            });
          }, 30000);
        } else {
          clearTimeout(timers[id]);
        }
      }, { threshold: 0.3 });
      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      Object.values(timers).forEach(clearTimeout);
      observers.forEach(o => o.disconnect());
    };
  }, [open]);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages, streamingText]);

  const handleOpen = () => {
    setOpen(true);
    setHasNotif(false);
    setShowBubble(false);
    setConfetti(true);
    setTimeout(() => setConfetti(false), 3000);
    if (weather) {
      setTimeout(() => {
        setMessages(prev => [...prev, { role:"assistant", content: weather }]);
      }, 1200);
    }
  };

  const handleClose = () => {
    setMood("back");
    setTimeout(() => { setOpen(false); setMood("happy"); }, 800);
  };

  

  const send = async () => {
    if (!input.trim() || loading) return;
    const isThank = THANK_WORDS.some(w => input.toLowerCase().includes(w));
    const userMsg = { role:"user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setMood("thinking");
    setStreamingText("");
    try {
      const groqMsgs = [
        { role: "system", content: SYSTEM_PROMPT },
        ...[...messages, userMsg].map(m=>({role:m.role,content:m.content}))
      ];
      const res = await fetch("/api/chat", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ messages: groqMsgs }),
      });
      const data = await res.json();
      const reply = data.text || "Omlouvám se, zkuste to prosím znovu.";
      
      // Urgency detection
      const urgencyWords: {[key: string]: number} = {
        "požár": 10, "hoří": 10, "oheň": 10, "kouř": 8, "kouří": 8,
        "zápach": 7, "smrad": 7, "praskání": 7, "praskání v komíně": 7,
        "trhlina": 7, "prasklina": 7, "ucpaný": 6, "ucpán": 6,
        "nefunguje": 5, "problém": 4, "divný": 4,
      };
      const msgLower = input.toLowerCase();
      let maxUrgency = 0;
      Object.entries(urgencyWords).forEach(([word, val]) => {
        if (msgLower.includes(word)) maxUrgency = Math.max(maxUrgency, val);
      });
      if (maxUrgency > 0) {
        setUrgency(maxUrgency);
        if (maxUrgency >= 8) setShowUrgent(true);
      }

      setLoading(false);
      if (isThank) { setMood("dancing"); setTimeout(() => setMood("happy"), 3000); }
      else setMood("happy");
      let i = 0;
      const iv = setInterval(() => {
        i += 2; setStreamingText(reply.slice(0,i));
        if (i >= reply.length) { clearInterval(iv); setStreamingText(""); setMessages(prev=>[...prev,{role:"assistant",content:reply}]); }
      }, 18);
    } catch {
      setLoading(false); setMood("sad");
      setMessages(prev=>[...prev,{role:"assistant",content:"Zavolejte nám na +420 778 098 717."}]);
      setTimeout(()=>setMood("happy"),2000);
    }
  };

  const rate = (idx:number,val:number) => setMessages(prev=>prev.map((m,i)=>i===idx?{...m,rating:val}:m));

  return (
    <>
      <style>{`
        @keyframes botPulse{0%,100%{box-shadow:0 0 0 0 rgba(232,101,10,.5)}50%{box-shadow:0 0 0 14px rgba(232,101,10,0)}}
        @keyframes msgIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes bubbleIn{from{opacity:0;transform:translateY(10px) scale(.95)}to{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes typingDot{0%,100%{opacity:.3;transform:translateY(0)}50%{opacity:1;transform:translateY(-3px)}}
        @keyframes notifPop{0%{transform:scale(0)}60%{transform:scale(1.2)}100%{transform:scale(1)}}
        .bot-btn{position:fixed;bottom:2rem;right:2rem;z-index:9999;width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,#1a0804,#0a0402);border:2px solid rgba(232,101,10,.6);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .3s ease;animation:botPulse 2.5s ease-in-out 3}
        .bot-btn:hover{border-color:#E8650A;box-shadow:0 0 30px rgba(232,101,10,.4);transform:scale(1.08)}
        .notif{position:absolute;top:-3px;right:-3px;width:18px;height:18px;background:#E8650A;border-radius:50%;border:2px solid #000;animation:notifPop .3s ease;display:flex;align-items:center;justify-content:center;font-size:.55rem;color:white;font-weight:700}
        .pbubble{position:fixed;bottom:7.5rem;right:5.5rem;background:#1a0804;border:1px solid rgba(232,101,10,.4);padding:.8rem 1rem;max-width:190px;font-family:sans-serif;font-size:.78rem;color:rgba(255,255,255,.85);animation:bubbleIn .4s ease;z-index:9997;cursor:pointer;box-shadow:0 8px 30px rgba(0,0,0,.5);line-height:1.5}
        .pbubble::after{content:"";position:absolute;right:-8px;bottom:20px;width:0;height:0;border-left:8px solid rgba(232,101,10,.4);border-top:6px solid transparent;border-bottom:6px solid transparent}
        .bwin{position:fixed;bottom:7.5rem;right:2rem;width:350px;height:520px;background:#080604;border:1px solid rgba(232,101,10,.3);box-shadow:0 20px 60px rgba(0,0,0,.9),0 0 40px rgba(232,101,10,.06);z-index:9998;display:flex;flex-direction:column;overflow:hidden}
        .bmsg{animation:msgIn .3s ease forwards;max-width:88%;padding:.7rem 1rem;font-family:-apple-system,sans-serif;font-size:.82rem;line-height:1.55;margin-bottom:.3rem}
        .bmsg.assistant{background:rgba(232,101,10,.1);border:1px solid rgba(232,101,10,.18);color:rgba(255,255,255,.88);align-self:flex-start;border-radius:0 12px 12px 12px}
        .bmsg.user{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.78);align-self:flex-end;border-radius:12px 0 12px 12px}
        .td{width:6px;height:6px;border-radius:50%;background:rgba(232,101,10,.8);display:inline-block;animation:typingDot 1s ease-in-out infinite}
        .td:nth-child(2){animation-delay:.2s}.td:nth-child(3){animation-delay:.4s}
        .qb{background:rgba(232,101,10,.08);border:1px solid rgba(232,101,10,.2);color:rgba(232,101,10,.85);font-family:sans-serif;font-size:.58rem;padding:.3rem .6rem;cursor:pointer;letter-spacing:.04em;transition:all .2s ease}
        .qb:hover{background:rgba(232,101,10,.2)}
        .rb{background:none;border:none;cursor:pointer;font-size:.9rem;opacity:.4;transition:all .2s ease;padding:0 2px}
        .rb:hover{opacity:1;transform:scale(1.2)}.rb.on{opacity:1}
        .ci{flex:1;background:rgba(255,255,255,.05);border:1px solid rgba(232,101,10,.2);color:white;font-family:sans-serif;font-size:.82rem;padding:.6rem .8rem;outline:none}
        .ci:focus{border-color:rgba(232,101,10,.5)}
        .sb{background:rgba(232,101,10,.9);border:none;color:white;padding:.6rem 1rem;cursor:pointer;font-size:.85rem;transition:background .2s}
        .sb:hover{background:#E8650A}.sb:disabled{background:rgba(232,101,10,.3);cursor:default}
        .cb{flex:1;background:rgba(34,197,94,.12);border:1px solid rgba(34,197,94,.3);color:rgba(34,197,94,.9);font-family:sans-serif;font-size:.62rem;padding:.5rem;cursor:pointer;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;display:flex;align-items:center;justify-content:center;gap:.4rem;transition:all .2s}
        .cb:hover{background:rgba(34,197,94,.22)}
        .ob{flex:1;background:rgba(232,101,10,.1);border:1px solid rgba(232,101,10,.3);color:rgba(232,101,10,.9);font-family:sans-serif;font-size:.62rem;padding:.5rem;cursor:pointer;letter-spacing:.06em;text-transform:uppercase;transition:all .2s}
        .ob:hover{background:rgba(232,101,10,.22)}
        .fb{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.6);font-family:sans-serif;font-size:.62rem;padding:.5rem .8rem;cursor:pointer;letter-spacing:.06em;transition:all .2s}
        .fb:hover{background:rgba(255,255,255,.12)}
        .mwrap{flex:1;overflow-y:auto;padding:1rem;display:flex;flex-direction:column}
        .mwrap::-webkit-scrollbar{width:4px}.mwrap::-webkit-scrollbar-thumb{background:rgba(232,101,10,.2);border-radius:2px}
        @keyframes urgentPulse{0%,100%{box-shadow:0 0 0 0 rgba(220,38,38,0.4)}50%{box-shadow:0 0 0 8px rgba(220,38,38,0)}}
      `}</style>

      {showBubble && !open && (
        <div className="pbubble" onClick={handleOpen}>
          👋 Potřebujete poradit s komínem? Jsem tu pro vás!
        </div>
      )}

      <div ref={btnRef} className="bot-btn" onClick={() => open ? handleClose() : handleOpen()} style={{position:"fixed",bottom:"2rem",right:"2rem"}}>
        <BotAvatar size={52} eyeX={eyePos.x} eyeY={eyePos.y} mood={mood}/>
        {hasNotif && <div className="notif">1</div>}
      </div>

      {open && (
        <div className="bwin">
          <ConfettiCanvas active={confetti}/>

          {/* Header */}
          <div style={{padding:".9rem 1.2rem",background:"linear-gradient(135deg,#1a0804,#0a0402)",borderBottom:"1px solid rgba(232,101,10,.2)",display:"flex",alignItems:"center",gap:".7rem"}}>
            <div style={{width:40,height:40,borderRadius:"50%",background:"#0a0402",border:"1.5px solid rgba(232,101,10,.5)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <BotAvatar size={34} eyeX={eyePos.x} eyeY={eyePos.y} mood={mood}/>
            </div>
            <div>
              <div style={{fontFamily:"Georgia,serif",fontSize:".88rem",color:"#fff",fontWeight:300}}>Tomáš — Virtuální kominík</div>
              <div style={{fontFamily:"sans-serif",fontSize:".52rem",letterSpacing:".15em",color:"rgba(34,197,94,.9)",textTransform:"uppercase"}}>● Online · Kominictví Štěstí</div>
            </div>
            <button onClick={handleClose} style={{marginLeft:"auto",background:"none",border:"none",color:"rgba(255,255,255,.4)",cursor:"pointer",fontSize:"1.3rem",padding:0,lineHeight:1}}>×</button>
          </div>

          {/* Urgency bar */}
          {urgency > 0 && (
            <div style={{padding:".4rem .8rem",background:urgency>=8?"rgba(220,38,38,0.15)":urgency>=5?"rgba(234,179,8,0.1)":"rgba(34,197,94,0.08)",borderBottom:`1px solid ${urgency>=8?"rgba(220,38,38,0.4)":urgency>=5?"rgba(234,179,8,0.3)":"rgba(34,197,94,0.2)"}`,display:"flex",alignItems:"center",gap:".6rem"}}>
              <div style={{flex:1,height:4,background:"rgba(255,255,255,0.1)",borderRadius:2,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${urgency*10}%`,background:urgency>=8?"#dc2626":urgency>=5?"#eab308":"#22c55e",borderRadius:2,transition:"width .5s ease"}}/>
              </div>
              <span style={{fontFamily:"sans-serif",fontSize:".58rem",color:urgency>=8?"rgba(220,38,38,0.9)":urgency>=5?"rgba(234,179,8,0.9)":"rgba(34,197,94,0.9)",letterSpacing:".08em",textTransform:"uppercase",whiteSpace:"nowrap"}}>
                {urgency>=8?"⚠️ URGENTNÍ":urgency>=5?"⚡ Středně naléhavé":"✓ Běžný dotaz"}
              </span>
            </div>
          )}

          {/* URGENT CALL banner */}
          {showUrgent && (
            <div style={{margin:".5rem",background:"rgba(220,38,38,0.15)",border:"1px solid rgba(220,38,38,0.5)",padding:".8rem 1rem",textAlign:"center",animation:"urgentPulse 1s ease-in-out infinite"}}>
              <div style={{fontFamily:"sans-serif",fontSize:".7rem",fontWeight:700,color:"rgba(220,38,38,0.95)",letterSpacing:".1em",textTransform:"uppercase",marginBottom:".4rem"}}>⚠️ ZAVOLEJTE IHNED</div>
              <a href="tel:+420778098717" style={{display:"block",background:"rgba(220,38,38,0.9)",color:"white",fontFamily:"sans-serif",fontSize:".8rem",padding:".5rem",textDecoration:"none",letterSpacing:".05em",fontWeight:600}}>
                📞 +420 778 098 717
              </a>
              <button onClick={()=>setShowUrgent(false)} style={{marginTop:".4rem",background:"none",border:"none",color:"rgba(255,255,255,.3)",cursor:"pointer",fontSize:".65rem"}}>zavřít</button>
            </div>
          )}

          {/* Messages */}
          <div className="mwrap">
            {messages.map((m,i) => (
              <div key={i} style={{display:"flex",flexDirection:"column",alignItems:m.role==="user"?"flex-end":"flex-start",marginBottom:".5rem"}}>
                {m.image && <img src={m.image} alt="upload" style={{maxWidth:140,borderRadius:8,marginBottom:4,border:"1px solid rgba(232,101,10,.3)"}}/>}
                <div className={`bmsg ${m.role}`}>{m.content}</div>
                {m.role==="assistant" && i>0 && (
                  <div style={{display:"flex",gap:2,marginLeft:4,marginTop:2}}>
                    <button className={`rb${m.rating===1?" on":""}`} onClick={()=>rate(i,1)}>👍</button>
                    <button className={`rb${m.rating===-1?" on":""}`} onClick={()=>rate(i,-1)}>👎</button>
                  </div>
                )}
              </div>
            ))}
            {loading && <div className="bmsg assistant" style={{display:"flex",gap:5,alignItems:"center"}}><span className="td"/><span className="td"/><span className="td"/></div>}
            {streamingText && <div className="bmsg assistant">{streamingText}<span style={{opacity:.5}}>▌</span></div>}
            <div ref={messagesEndRef}/>
          </div>

          {/* Action buttons */}
          <div style={{display:"flex",gap:".5rem",padding:".5rem .8rem",borderTop:"1px solid rgba(255,255,255,.04)"}}>
            <a href="tel:+420778098717" className="cb">📞 Zavolat</a>
            <button className="ob" onClick={()=>{handleClose();setTimeout(()=>document.getElementById("kontakt")?.scrollIntoView({behavior:"smooth"}),500)}}>📋 Objednat</button>
            
            
          </div>

          {/* Quick replies */}
          <div style={{padding:".4rem .8rem",display:"flex",gap:".35rem",flexWrap:"wrap"}}>
            {["Cena čištění?","Rychlý výjezd?","Revizní zpráva?","Oblast?"].map(q=>(
              <button key={q} className="qb" onClick={()=>setInput(q)}>{q}</button>
            ))}
          </div>

          {/* Input */}
          <div style={{padding:".7rem",borderTop:"1px solid rgba(232,101,10,.15)",display:"flex",gap:".5rem"}}>
            <input className="ci" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Napište dotaz..."/>
            <button className="sb" onClick={send} disabled={loading||!!streamingText}>→</button>
          </div>
        </div>
      )}
    </>
  );
}
