"use client";
import { useState, useEffect } from "react";

const ADMIN_USER = "tomas";
const ADMIN_PASS = "kominictvi2026";
type View = "login" | "register" | "loading" | "dashboard";

type Stats = {
  total: number; urgent: number; today: number; todayUrgent: number;
  topics: Record<string, number>; hourly: number[];
  lastMessages: { content: string; time: string; urgent: boolean }[];
  lastDate?: string;
};

const empty = (): Stats => ({ total:0,urgent:0,today:0,todayUrgent:0,topics:{},hourly:Array(24).fill(0),lastMessages:[] });

const CloverSVG = () => (
  <svg width="28" height="28" viewBox="200 80 280 260">
    <defs>
      <radialGradient id="dc1" cx="35%" cy="35%" r="75%"><stop offset="0%" stopColor="#bbf7d0"/><stop offset="70%" stopColor="#16a34a"/><stop offset="100%" stopColor="#166534"/></radialGradient>
      <radialGradient id="dc2" cx="65%" cy="35%" r="75%"><stop offset="0%" stopColor="#86efac"/><stop offset="70%" stopColor="#15803d"/><stop offset="100%" stopColor="#166534"/></radialGradient>
      <radialGradient id="dc3" cx="35%" cy="65%" r="75%"><stop offset="0%" stopColor="#86efac"/><stop offset="70%" stopColor="#15803d"/><stop offset="100%" stopColor="#15803d"/></radialGradient>
      <radialGradient id="dc4" cx="65%" cy="65%" r="75%"><stop offset="0%" stopColor="#bbf7d0"/><stop offset="70%" stopColor="#16a34a"/><stop offset="100%" stopColor="#15803d"/></radialGradient>
      <radialGradient id="dcc" cx="35%" cy="35%" r="80%"><stop offset="0%" stopColor="#86efac"/><stop offset="100%" stopColor="#166534"/></radialGradient>
    </defs>
    <g transform="translate(340,200) rotate(-45)"><path d="M0,0 C4,-8 10,-52 -2,-68 C-14,-84 -44,-82 -58,-66 C-72,-50 -68,-24 -52,-12 C-38,-2 14,8 0,0 Z" fill="url(#dc1)"/></g>
    <g transform="translate(340,200) rotate(45)"><path d="M0,0 C4,-8 10,-52 -2,-68 C-14,-84 -44,-82 -58,-66 C-72,-50 -68,-24 -52,-12 C-38,-2 14,8 0,0 Z" fill="url(#dc2)"/></g>
    <g transform="translate(340,200) rotate(-135)"><path d="M0,0 C4,-8 10,-52 -2,-68 C-14,-84 -44,-82 -58,-66 C-72,-50 -68,-24 -52,-12 C-38,-2 14,8 0,0 Z" fill="url(#dc3)"/></g>
    <g transform="translate(340,200) rotate(135)"><path d="M0,0 C4,-8 10,-52 -2,-68 C-14,-84 -44,-82 -58,-66 C-72,-50 -68,-24 -52,-12 C-38,-2 14,8 0,0 Z" fill="url(#dc4)"/></g>
    <circle cx="340" cy="200" r="17" fill="#14532d"/>
    <circle cx="340" cy="200" r="11" fill="url(#dcc)"/>
    <circle cx="340" cy="200" r="6" fill="#4ade80"/>
    <circle cx="337" cy="197" r="2.8" fill="#bbf7d0" opacity="0.9"/>
  </svg>
);

export default function Dashboard() {
  const [view, setView] = useState<View>("login");
  const [user, setUser] = useState(""); const [pass, setPass] = useState("");
  const [rUser, setRUser] = useState(""); const [rPass, setRPass] = useState(""); const [rPass2, setRPass2] = useState(""); const [rEmail, setREmail] = useState("");
  const [error, setError] = useState(""); const [success, setSuccess] = useState("");
  const [loggedUser, setLoggedUser] = useState("");
  const [stats, setStats] = useState<Stats>(empty());
  const [time, setTime] = useState(new Date());
  const [visitors, setVisitors] = useState(3);
  const [loadMsg, setLoadMsg] = useState("Připojuji AI bota...");
  const [loadPct, setLoadPct] = useState(0);

  useEffect(() => {
    const s = localStorage.getItem("dash_session");
    if (s) { setLoggedUser(s); startLoading(s); }
    const st = localStorage.getItem("bot_stats");
    if (st) setStats(JSON.parse(st));
    const iv = setInterval(() => {
      setTime(new Date());
      setVisitors(v => Math.max(1, v + Math.floor(Math.random()*3)-1));
      const st2 = localStorage.getItem("bot_stats");
      if (st2) setStats(JSON.parse(st2));
    }, 5000);
    return () => clearInterval(iv);
  }, []);

  const startLoading = (u: string) => {
    setView("loading"); setLoadPct(0);
    const msgs = ["Připojuji AI bota...","Načítám statistiky...","Kontroluji notifikace...","Vše připraveno!"];
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setLoadPct(i * 25);
      setLoadMsg(msgs[Math.min(i, msgs.length-1)]);
      if (i >= 4) { clearInterval(iv); setTimeout(() => { setLoggedUser(u); setView("dashboard"); }, 400); }
    }, 600);
  };

  const login = () => {
    if (!user || !pass) { setError("Vyplňte všechna pole"); return; }
    const users = JSON.parse(localStorage.getItem("dash_users") || "[]");
    const found = users.find((u: any) => u.username === user && u.password === pass);
    if (found || (user === ADMIN_USER && pass === ADMIN_PASS)) {
      localStorage.setItem("dash_session", user);
      setError(""); startLoading(user);
    } else { setError("Nesprávné přihlašovací údaje"); setPass(""); }
  };

  const register = () => {
    if (!rUser||!rPass||!rEmail) { setError("Vyplňte všechna pole"); return; }
    if (rPass !== rPass2) { setError("Hesla se neshodují"); return; }
    if (rPass.length < 6) { setError("Heslo musí mít alespoň 6 znaků"); return; }
    const users = JSON.parse(localStorage.getItem("dash_users") || "[]");
    if (users.find((u: any) => u.username === rUser)) { setError("Uživatel již existuje"); return; }
    users.push({ username: rUser, password: rPass, email: rEmail });
    localStorage.setItem("dash_users", JSON.stringify(users));
    setSuccess("Účet vytvořen!"); setView("login"); setError("");
    setUser(rUser);
  };

  const logout = () => { localStorage.removeItem("dash_session"); setLoggedUser(""); setView("login"); setUser(""); setPass(""); };

  const hour = time.getHours();
  const topTopics = Object.entries(stats.topics).sort(([,a],[,b]) => b-a).slice(0,6);
  const maxH = Math.max(...stats.hourly, 1);

  const css = `
    * { cursor: default; }
    button, a, [role="button"] { cursor: pointer; }
    input, textarea { cursor: text; }
    .inp { cursor: text; }
    .btn-p, .nav-btn, .lnk { cursor: pointer; }
    @keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
    @keyframes shimmer{0%{left:-100%}100%{left:200%}}
    @keyframes flicker{0%,100%{transform:scaleY(1) skewX(-1deg)}33%{transform:scaleY(1.1) skewX(1.5deg)}66%{transform:scaleY(.93)}}
    @keyframes flicker2{0%,100%{transform:scaleY(1) skewX(1deg)}50%{transform:scaleY(1.2) skewX(-1.5deg)}}
    @keyframes hatBob{0%,100%{transform:translateY(0) rotate(0deg)}25%{transform:translateY(-4px) rotate(-1.5deg)}75%{transform:translateY(-2px) rotate(1deg)}}
    @keyframes barIn{from{transform:scaleY(0)}to{transform:scaleY(1)}}
    @keyframes loadBar{from{width:0}to{width:var(--w)}}
    @keyframes orbPulse{0%,100%{opacity:.05}50%{opacity:.1}}
    @keyframes ember{0%{transform:translate(0,0);opacity:1}100%{transform:translate(var(--ex),var(--ey));opacity:0}}
    @keyframes smoke{0%{transform:translateY(0) scale(1);opacity:.4}100%{transform:translateY(-50px) scale(2);opacity:0}}
    @keyframes slideUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
    @keyframes shimmerLine{0%{background-position:-200% 0}100%{background-position:200% 0}}
    .inp{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);color:#fff;padding:10px 14px;font-size:13px;outline:none;width:100%;box-sizing:border-box;transition:all .2s;font-family:inherit}
    .inp:focus{border-color:rgba(232,101,10,.5);background:rgba(232,101,10,.03)}
    .inp::placeholder{color:rgba(255,255,255,.18)}
    .btn-p{background:linear-gradient(135deg,#E8650A,#FF8C42);border:none;color:#fff;padding:11px;font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;cursor:pointer;width:100%;font-family:inherit;position:relative;overflow:hidden;transition:all .2s}
    .btn-p::after{content:"";position:absolute;top:0;left:-100%;width:50%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent);animation:shimmer 2.5s ease infinite}
    .btn-p:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(232,101,10,.35)}
    .lbl{display:block;font-size:10px;color:rgba(255,255,255,.35);margin-bottom:7px;letter-spacing:.2em;text-transform:uppercase}
    .lnk{color:rgba(232,101,10,.7);cursor:pointer;transition:color .15s;background:none;border:none;font-family:inherit;font-size:12px}
    .lnk:hover{color:#E8650A}
    .dot-g{width:6px;height:6px;background:#22c55e;border-radius:50%;display:inline-block;animation:pulse 2s infinite}
    .dot-r{width:6px;height:6px;background:#E8650A;border-radius:50%;display:inline-block;animation:pulse 1s infinite}
    .dot-d{width:6px;height:6px;background:rgba(255,255,255,.15);border-radius:50%;display:inline-block}
    .dcard{background:#0a0604;border:1px solid rgba(255,255,255,.07);padding:1.4rem;position:relative;overflow:hidden;transition:border-color .2s;animation:slideUp .4s ease both}
    .dcard::before{content:"";position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(232,101,10,.3),transparent);background-size:200% 100%;animation:shimmerLine 4s ease infinite}
    .dcard:hover{border-color:rgba(232,101,10,.25)}
    .nav-btn{background:none;border:none;color:rgba(255,255,255,.4);font-size:12px;padding:6px 12px;cursor:pointer;font-family:inherit;transition:all .2s}
    .nav-btn:hover,.nav-btn.on{color:#fff;background:rgba(255,255,255,.07)}
    .mrow{padding:10px 0;border-bottom:1px solid rgba(255,255,255,.05);display:flex;align-items:center;gap:10px}
    .mrow:last-child{border-bottom:none}
    .badge{font-size:10px;padding:2px 7px;font-weight:500;letter-spacing:.05em}
    .em{position:absolute;width:3px;height:3px;border-radius:50%;animation:ember 1.5s ease-out infinite}
    .sm{position:absolute;border-radius:50%;animation:smoke ease-out infinite}
  `;

  // LOGIN
  if (view === "login") return (
    <div style={{minHeight:"100vh",background:"#000",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",fontFamily:"-apple-system,sans-serif"}}>
      <style>{css}</style>
      <div style={{position:"absolute",width:"500px",height:"500px",borderRadius:"50%",background:"radial-gradient(circle,rgba(232,101,10,.06),transparent 65%)",top:"50%",left:"50%",transform:"translate(-50%,-50%)",animation:"orbPulse 5s ease-in-out infinite",pointerEvents:"none"}}/>
      <div style={{width:380,animation:"fadeIn .5s ease",position:"relative"}}>
        <div style={{textAlign:"center",marginBottom:"32px"}}>
          <div style={{fontSize:"3rem",marginBottom:"10px",display:"block",animation:"hatBob 3s ease-in-out infinite",filter:"drop-shadow(0 0 16px rgba(232,101,10,.5))"}}>🎩</div>
          <div style={{fontFamily:"Georgia,serif",fontSize:"1.4rem",letterSpacing:".1em",marginBottom:"4px"}}>KOMINICTVÍ <span style={{color:"#E8650A"}}>ŠTĚSTÍ</span></div>
          <div style={{fontSize:"10px",color:"rgba(255,255,255,.25)",letterSpacing:".3em",textTransform:"uppercase"}}>Admin Dashboard</div>
        </div>
        <div style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.07)",padding:"28px",position:"relative"}}>
          <div style={{position:"absolute",top:0,left:0,right:0,height:"1px",background:"linear-gradient(90deg,transparent,rgba(232,101,10,.6),transparent)"}}/>
          {success && <div style={{background:"rgba(34,197,94,.08)",border:"1px solid rgba(34,197,94,.2)",color:"rgba(34,197,94,.9)",padding:".6rem",fontSize:".75rem",marginBottom:"1rem",textAlign:"center"}}>{success}</div>}
          {error && <div style={{background:"rgba(220,38,38,.08)",border:"1px solid rgba(220,38,38,.2)",color:"rgba(220,38,38,.9)",padding:".6rem",fontSize:".75rem",marginBottom:"1rem",textAlign:"center"}}>⚠️ {error}</div>}
          <div style={{marginBottom:"14px"}}><label className="lbl">Uživatelské jméno</label><input className="inp" value={user} onChange={e=>setUser(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()} placeholder="tomas" autoFocus/></div>
          <div style={{marginBottom:"20px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"7px"}}>
              <label className="lbl" style={{margin:0}}>Heslo</label>
              <button className="lnk" style={{fontSize:"11px"}}>Zapomenuté heslo?</button>
            </div>
            <input className="inp" type="password" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()} placeholder="••••••••••••"/>
          </div>
          <button className="btn-p" onClick={login}>Přihlásit se →</button>
        </div>
        <p style={{textAlign:"center",marginTop:"16px",fontSize:"12px",color:"rgba(255,255,255,.25)"}}>
          Nemáte účet? <button className="lnk" onClick={()=>{setView("register");setError("");}}>Vytvořit účet</button>
        </p>
        <div style={{textAlign:"center",marginTop:"24px",fontSize:"10px",color:"rgba(255,255,255,.1)",letterSpacing:".15em"}}>KOMINICTVÍ ŠTĚSTÍ · 2026</div>
      </div>
    </div>
  );

  // REGISTER
  if (view === "register") return (
    <div style={{minHeight:"100vh",background:"#000",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",fontFamily:"-apple-system,sans-serif"}}>
      <style>{css}</style>
      <div style={{position:"absolute",width:"400px",height:"400px",borderRadius:"50%",background:"radial-gradient(circle,rgba(232,101,10,.05),transparent 65%)",top:"50%",left:"50%",transform:"translate(-50%,-50%)",animation:"orbPulse 5s ease-in-out infinite",pointerEvents:"none"}}/>
      <div style={{width:380,animation:"fadeIn .5s ease",position:"relative"}}>
        <div style={{textAlign:"center",marginBottom:"28px"}}>
          <div style={{fontSize:"2rem",marginBottom:"8px"}}>🔐</div>
          <div style={{fontFamily:"Georgia,serif",fontSize:"1.2rem",letterSpacing:".1em",marginBottom:"4px"}}>NOVÝ ÚČET</div>
          <div style={{fontSize:"10px",color:"rgba(255,255,255,.25)",letterSpacing:".3em",textTransform:"uppercase"}}>Kominictví Štěstí</div>
        </div>
        <div style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.07)",padding:"28px",position:"relative"}}>
          <div style={{position:"absolute",top:0,left:0,right:0,height:"1px",background:"linear-gradient(90deg,transparent,rgba(232,101,10,.6),transparent)"}}/>
          {error && <div style={{background:"rgba(220,38,38,.08)",border:"1px solid rgba(220,38,38,.2)",color:"rgba(220,38,38,.9)",padding:".6rem",fontSize:".75rem",marginBottom:"1rem",textAlign:"center"}}>⚠️ {error}</div>}
          {[
            {lbl:"Uživatelské jméno",val:rUser,set:setRUser,ph:"jan.novak",type:"text"},
            {lbl:"Email",val:rEmail,set:setREmail,ph:"jan@email.cz",type:"email"},
            {lbl:"Heslo (min. 6 znaků)",val:rPass,set:setRPass,ph:"••••••••",type:"password"},
            {lbl:"Potvrdit heslo",val:rPass2,set:setRPass2,ph:"••••••••",type:"password"},
          ].map((f,i) => (
            <div key={i} style={{marginBottom:"12px"}}><label className="lbl">{f.lbl}</label><input className="inp" type={f.type} value={f.val} onChange={e=>f.set(e.target.value)} placeholder={f.ph}/></div>
          ))}
          <button className="btn-p" onClick={register} style={{marginTop:"8px"}}>Vytvořit účet →</button>
        </div>
        <p style={{textAlign:"center",marginTop:"16px",fontSize:"12px",color:"rgba(255,255,255,.25)"}}>
          <button className="lnk" onClick={()=>{setView("login");setError("");}}>← Zpět na přihlášení</button>
        </p>
      </div>
    </div>
  );

  // LOADING
  if (view === "loading") return (
    <div style={{minHeight:"100vh",background:"#000",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",fontFamily:"-apple-system,sans-serif"}}>
      <style>{css}</style>
      <div style={{position:"absolute",width:"400px",height:"400px",borderRadius:"50%",background:"radial-gradient(circle,rgba(232,101,10,.07),transparent 65%)",top:"50%",left:"50%",transform:"translate(-50%,-50%)",animation:"orbPulse 3s ease-in-out infinite",pointerEvents:"none"}}/>
      {/* Embers */}
      {[
        {l:"47%",ex:"-20px",ey:"-50px",c:"#FF8C42",d:"0s"},{l:"50%",ex:"15px",ey:"-60px",c:"#FFD166",d:".4s"},
        {l:"53%",ex:"-10px",ey:"-45px",c:"#FF4500",d:".8s"},{l:"49%",ex:"25px",ey:"-55px",c:"#FF8C42",d:"1.1s"},
      ].map((e,i) => <div key={i} className="em" style={{bottom:"48%",left:e.l,background:e.c,["--ex" as any]:e.ex,["--ey" as any]:e.ey,animationDelay:e.d}}/>)}
      {/* Smoke */}
      {[{l:"46%",s:20,d:"0s"},{l:"52%",s:16,d:"1s"},{l:"49%",s:24,d:"2s"}].map((s,i) => (
        <div key={i} className="sm" style={{bottom:"52%",left:s.l,width:s.s,height:s.s,background:"rgba(80,60,40,.25)",animationDuration:"3.5s",animationDelay:s.d}}/>
      ))}
      <div style={{textAlign:"center",position:"relative",zIndex:2}}>
        <div style={{animation:"hatBob 2s ease-in-out infinite",display:"inline-block",marginBottom:"12px"}}>
          <svg width="80" height="100" viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
            <path style={{transformOrigin:"40px 12px",animation:"flicker .5s ease-in-out infinite"}} d="M37,12 Q35,4 40,0 Q45,4 43,12Z" fill="#FF4500" opacity=".95"/>
            <path style={{transformOrigin:"40px 12px",animation:"flicker2 .6s .1s ease-in-out infinite"}} d="M38,12 Q37,6 40,3 Q43,6 42,12Z" fill="#FFD166" opacity=".9"/>
            <path d="M39,12 Q39,8 40,6 Q41,8 41,12Z" fill="#fff" opacity=".7"/>
            <rect x="24" y="12" width="32" height="22" rx="2" fill="#0d0d0d" stroke="#2a2a2a" strokeWidth=".5"/>
            <rect x="20" y="33" width="40" height="6" rx="1" fill="#111"/>
            <rect x="24" y="28" width="32" height="4" fill="#E8650A" opacity=".8"/>
            <ellipse cx="40" cy="58" rx="17" ry="16" fill="#C9A96E"/>
            <ellipse cx="33" cy="56" rx="3.5" ry="2.5" fill="#1a0a04" opacity=".5"/>
            <path d="M30 54 Q34 52 38 54" stroke="#5a3010" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M42 54 Q46 52 50 54" stroke="#5a3010" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M34 64 Q40 69 46 64" stroke="#5a3010" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M36 64.5 Q40 67.5 44 64.5" fill="white" opacity=".8"/>
            <ellipse cx="40" cy="59" rx="2.5" ry="2" fill="#b8956a"/>
            <path d="M23,74 Q24,68 40,66 Q56,68 57,74 L60,95 Q40,98 20,95 Z" fill="#0d0d0d"/>
            <circle cx="40" cy="76" r="1.5" fill="#E8650A" opacity=".8"/>
            <circle cx="40" cy="82" r="1.5" fill="#E8650A" opacity=".6"/>
          </svg>
        </div>
        <div style={{fontFamily:"Georgia,serif",fontSize:"1.2rem",letterSpacing:".1em",marginBottom:"4px"}}>KOMINICTVÍ <span style={{color:"#E8650A"}}>ŠTĚSTÍ</span></div>
        <div style={{fontSize:"10px",color:"rgba(255,255,255,.3)",letterSpacing:".2em",textTransform:"uppercase",marginBottom:"24px"}}>{loadMsg}</div>
        <div style={{width:"220px",height:"2px",background:"rgba(255,255,255,.06)",margin:"0 auto 16px",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:0,left:0,height:"100%",width:`${loadPct}%`,background:"linear-gradient(90deg,#E8650A,#FF8C42)",transition:"width .5s ease"}}/>
        </div>
        <div style={{fontSize:"10px",color:"rgba(255,255,255,.2)",letterSpacing:".1em"}}>{loadPct}%</div>
      </div>
    </div>
  );

  // DASHBOARD
  return (
    <div style={{minHeight:"100vh",background:"#000",fontFamily:"-apple-system,sans-serif",color:"#fff"}}>
      <style>{css}</style>
      {/* Topbar */}
      <div style={{borderBottom:"1px solid rgba(255,255,255,.07)",padding:"0 24px",display:"flex",alignItems:"center",justifyContent:"space-between",height:"52px",background:"rgba(255,255,255,.01)",position:"sticky",top:0,zIndex:100}}>
        <div style={{display:"flex",alignItems:"center",gap:"16px"}}>
          <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
            <span style={{fontSize:"1.2rem",filter:"drop-shadow(0 0 8px rgba(232,101,10,.5))"}}>🎩</span>
            <span style={{fontFamily:"Georgia,serif",color:"#E8650A",fontSize:".85rem",letterSpacing:".08em"}}>KOMINICTVÍ ŠTĚSTÍ</span>
          </div>
          <div style={{width:"1px",height:"16px",background:"rgba(255,255,255,.08)"}}/>
          <div style={{display:"flex",gap:"2px"}}>
            {["Overview","Zprávy","Analytika","Nastavení"].map((l,i) => (
              <button key={i} className={`nav-btn${i===0?" on":""}`}>{l}</button>
            ))}
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"16px"}}>
          <div style={{display:"flex",alignItems:"center",gap:"5px",fontSize:"11px",color:"rgba(255,255,255,.35)"}}>
            <span className="dot-g"/> Live · {time.toLocaleTimeString("cs-CZ")}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
            <span style={{fontSize:"11px",color:"rgba(255,255,255,.35)"}}>{loggedUser}</span>
            <div style={{width:"28px",height:"28px",borderRadius:"50%",background:"rgba(232,101,10,.12)",border:"1px solid rgba(232,101,10,.25)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"11px",color:"#E8650A",fontWeight:600,cursor:"pointer"}} onClick={logout}>
              {loggedUser[0]?.toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      <div style={{padding:"24px",maxWidth:"1400px",margin:"0 auto"}}>
        {/* Header */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"24px",animation:"slideUp .3s ease"}}>
          <div>
            <h1 style={{fontSize:"20px",fontWeight:600,margin:"0 0 3px",letterSpacing:"-.3px"}}>
              {hour<12?"Dobré ráno":hour<18?"Dobrý den":"Dobrý večer"}, <span style={{color:"#E8650A"}}>{loggedUser}</span> 👋
            </h1>
            <p style={{fontSize:"12px",color:"rgba(255,255,255,.3)",margin:0}}>{new Date().toLocaleDateString("cs-CZ",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</p>
          </div>
          <div style={{display:"flex",gap:"8px"}}>
            <button style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.6)",padding:"6px 12px",fontSize:"11px",cursor:"pointer",fontFamily:"inherit",letterSpacing:".05em"}}>Posledních 7 dní ▾</button>
            <button style={{background:"rgba(232,101,10,.9)",border:"none",color:"white",padding:"6px 14px",fontSize:"11px",cursor:"pointer",fontFamily:"inherit",fontWeight:600,letterSpacing:".08em"}}>Export</button>
          </div>
        </div>

        {/* Stats */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1px",background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.06)",marginBottom:"16px",overflow:"hidden"}}>
          {[
            {label:"Celkem dotazů",val:stats.total,sub:"od spuštění",color:"#E8650A",d:"0s"},
            {label:"Urgentní případy",val:stats.urgent,sub:"vyřešit ihned",color:"#ff6b6b",d:".08s"},
            {label:"Dotazy dnes",val:stats.today,sub:"aktuální den",color:"#22c55e",d:".16s"},
            {label:"Návštěvníků",val:visitors,sub:"právě online",color:"#60a5fa",d:".24s"},
          ].map((s,i) => (
            <div key={i} style={{background:"#000",padding:"18px 16px",animation:`slideUp .4s ${s.d} ease both`}}>
              <div style={{fontSize:"10px",color:"rgba(255,255,255,.3)",letterSpacing:".15em",textTransform:"uppercase",marginBottom:"10px"}}>{s.label}</div>
              <div style={{fontFamily:"Georgia,serif",fontSize:"2.4rem",fontWeight:300,color:s.color,lineHeight:1,letterSpacing:"-.5px"}}>{s.val}</div>
              <div style={{fontSize:"11px",color:"rgba(255,255,255,.25)",marginTop:"6px"}}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Chart + Topics */}
        <div style={{display:"grid",gridTemplateColumns:"3fr 2fr",gap:"12px",marginBottom:"12px"}}>
          <div className="dcard" style={{animationDelay:".2s"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px"}}>
              <div>
                <div style={{fontSize:"12px",fontWeight:500}}>Aktivita za 24 hodin</div>
                <div style={{fontSize:"11px",color:"rgba(255,255,255,.3)",marginTop:"2px"}}>Počet dotazů podle hodiny</div>
              </div>
              <div style={{display:"flex",gap:"10px",fontSize:"10px",color:"rgba(255,255,255,.3)"}}>
                <span style={{display:"flex",alignItems:"center",gap:4}}><span style={{width:8,height:2,background:"rgba(232,101,10,.8)",display:"inline-block"}}/> Dotazy</span>
                <span style={{display:"flex",alignItems:"center",gap:4}}><span style={{width:8,height:2,background:"#ff6b6b",display:"inline-block"}}/> Urgentní</span>
              </div>
            </div>
            <div style={{display:"flex",alignItems:"flex-end",gap:"3px",height:"80px"}}>
              {stats.hourly.map((v,i) => (
                <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-end",height:"100%"}}>
                  <div style={{width:"100%",height:`${Math.max(2,(v/maxH)*76)}px`,background:i===hour?"rgba(232,101,10,.9)":"rgba(232,101,10,.18)",borderRadius:"1px 1px 0 0",minHeight:"2px",transformOrigin:"bottom",animation:`barIn .4s ${i*.015}s ease both`}}/>
                </div>
              ))}
            </div>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:"8px"}}>
              {["0h","4h","8h","12h","16h","20h","23h"].map(t => <span key={t} style={{fontSize:"10px",color:"rgba(255,255,255,.2)"}}>{t}</span>)}
            </div>
          </div>

          <div className="dcard" style={{animationDelay:".28s"}}>
            <div style={{fontSize:"12px",fontWeight:500,marginBottom:"16px"}}>Nejčastější témata</div>
            {topTopics.length === 0 ? (
              <div style={{color:"rgba(255,255,255,.2)",fontSize:".78rem",textAlign:"center",padding:"1.5rem 0"}}>Zatím žádná data</div>
            ) : topTopics.map(([t,v],i) => (
              <div key={i} style={{marginBottom:"10px"}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:"4px"}}>
                  <span style={{fontSize:"11px",color:"rgba(255,255,255,.55)"}}>{t}</span>
                  <span style={{fontSize:"11px",color:"#E8650A",fontWeight:500}}>{v}×</span>
                </div>
                <div style={{height:"2px",background:"rgba(255,255,255,.06)"}}>
                  <div style={{height:"100%",width:`${(v/(topTopics[0]?.[1]||1))*100}%`,background:"linear-gradient(90deg,#E8650A,rgba(232,101,10,.4))"}}/>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status + Messages */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 2fr",gap:"12px"}}>
          <div className="dcard" style={{animationDelay:".36s"}}>
            <div style={{fontSize:"12px",fontWeight:500,marginBottom:"14px"}}>Stav systémů</div>
            {["AI Bot (Groq)","Email notifikace","SMS (Vonage)","Počasí API","Týdenní report"].map((n,i) => (
              <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:i<4?"1px solid rgba(255,255,255,.04)":"none"}}>
                <span style={{fontSize:"11px",color:"rgba(255,255,255,.5)"}}>{n}</span>
                <span className="badge" style={{background:"rgba(34,197,94,.08)",border:"1px solid rgba(34,197,94,.2)",color:"#22c55e",display:"flex",alignItems:"center",gap:4}}>
                  <span className="dot-g" style={{width:4,height:4}}/>OK
                </span>
              </div>
            ))}
          </div>

          <div className="dcard" style={{padding:0,animationDelay:".44s"}}>
            <div style={{padding:"14px 16px",borderBottom:"1px solid rgba(255,255,255,.05)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{fontSize:"12px",fontWeight:500}}>Poslední zprávy zákazníků</div>
              <div style={{display:"flex",alignItems:"center",gap:5,fontSize:"10px",color:"rgba(255,255,255,.3)"}}>
                <span className="dot-g"/>Real-time
              </div>
            </div>
            <div style={{padding:"0 16px"}}>
              {stats.lastMessages.length === 0 ? (
                <div style={{padding:"2rem",textAlign:"center",color:"rgba(255,255,255,.2)",fontSize:".8rem"}}>
                  <div style={{fontSize:"1.5rem",marginBottom:".4rem"}}>🎩</div>
                  Bot čeká na zákazníky...
                </div>
              ) : [...stats.lastMessages].reverse().slice(0,6).map((m,i) => (
                <div key={i} className="mrow">
                  <span className={m.urgent?"dot-r":"dot-d"}/>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:"12px",color:m.urgent?"rgba(255,150,150,.9)":"rgba(255,255,255,.65)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{m.content}</div>
                  </div>
                  <span style={{fontSize:"10px",color:"rgba(255,255,255,.25)",whiteSpace:"nowrap"}}>{m.time}</span>
                  <span className="badge" style={{background:m.urgent?"rgba(232,101,10,.08)":"rgba(255,255,255,.04)",border:`1px solid ${m.urgent?"rgba(232,101,10,.25)":"rgba(255,255,255,.08)"}`,color:m.urgent?"#E8650A":"rgba(255,255,255,.3)"}}>
                    {m.urgent?"urgent":"normal"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{textAlign:"center",marginTop:"1.5rem",fontSize:"10px",color:"rgba(255,255,255,.1)",letterSpacing:".15em"}}>
          KOMINICTVÍ ŠTĚSTÍ · ADMIN DASHBOARD · {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}
