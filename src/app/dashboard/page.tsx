"use client";
import { useState, useEffect, useCallback } from "react";

const ADMIN_USER = "tomas";
const ADMIN_PASS = "kominictvi2026";
type View = "login" | "register" | "loading" | "dashboard";
type NavTab = "overview" | "messages" | "analytics" | "settings";

interface Msg { content: string; time: string; urgent: boolean; }
interface Stats {
  total: number; urgent: number; today: number; todayUrgent: number;
  topics: Record<string, number>; hourly: number[];
  lastMessages: Msg[]; lastDate?: string;
}

const emptyStats = (): Stats => ({ total:0,urgent:0,today:0,todayUrgent:0,topics:{},hourly:Array(24).fill(0),lastMessages:[] });

export default function Dashboard() {
  const [view, setView] = useState<View>("login");
  const [tab, setTab] = useState<NavTab>("overview");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [rUser, setRUser] = useState("");
  const [rPass, setRPass] = useState("");
  const [rPass2, setRPass2] = useState("");
  const [rEmail, setREmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loggedUser, setLoggedUser] = useState("");
  const [stats, setStats] = useState<Stats>(emptyStats());
  const [time, setTime] = useState(new Date());
  const [visitors, setVisitors] = useState(3);
  const [loadPct, setLoadPct] = useState(0);
  const [loadMsg, setLoadMsg] = useState("Připojuji AI bota...");
  const [showPass, setShowPass] = useState(false);
  const [filterUrgent, setFilterUrgent] = useState(false);
  const [searchMsg, setSearchMsg] = useState("");

  const refreshStats = useCallback(() => {
    try {
      const st = localStorage.getItem("bot_stats");
      if (st) setStats(JSON.parse(st));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      const s = localStorage.getItem("dash_session");
      if (s) { setLoggedUser(s); startLoading(s); }
    } catch {}
    refreshStats();
    const iv = setInterval(() => {
      setTime(new Date());
      setVisitors(v => Math.max(1, v + (Math.random() > 0.7 ? 1 : Math.random() > 0.5 ? -1 : 0)));
      refreshStats();
    }, 5000);
    return () => clearInterval(iv);
  }, []);

  const startLoading = (u: string) => {
    setView("loading");
    setLoadPct(0);
    const msgs = ["Připojuji AI bota...","Načítám statistiky...","Kontroluji notifikace...","Vše připraveno!"];
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setLoadPct(i * 25);
      setLoadMsg(msgs[Math.min(i, msgs.length - 1)]);
      if (i >= 4) {
        clearInterval(iv);
        setTimeout(() => { setLoggedUser(u); setView("dashboard"); }, 300);
      }
    }, 600);
  };

  const login = () => {
    setError("");
    if (!user.trim() || !pass.trim()) { setError("Vyplňte všechna pole"); return; }
    try {
      const users = JSON.parse(localStorage.getItem("dash_users") || "[]");
      const found = users.find((u: any) => u.username === user && u.password === pass);
      if (found || (user === ADMIN_USER && pass === ADMIN_PASS)) {
        localStorage.setItem("dash_session", user);
        startLoading(user);
      } else {
        setError("Nesprávné přihlašovací údaje");
        setPass("");
      }
    } catch { setError("Chyba přihlášení"); }
  };

  const register = () => {
    setError("");
    if (!rUser.trim() || !rPass.trim() || !rEmail.trim()) { setError("Vyplňte všechna pole"); return; }
    if (rPass !== rPass2) { setError("Hesla se neshodují"); return; }
    if (rPass.length < 6) { setError("Heslo musí mít alespoň 6 znaků"); return; }
    try {
      const users = JSON.parse(localStorage.getItem("dash_users") || "[]");
      if (users.find((u: any) => u.username === rUser)) { setError("Uživatel již existuje"); return; }
      users.push({ username: rUser, password: rPass, email: rEmail, created: new Date().toISOString() });
      localStorage.setItem("dash_users", JSON.stringify(users));
      setSuccess("Účet vytvořen! Přihlaste se.");
      setView("login");
      setUser(rUser);
      setPass("");
      setRUser(""); setRPass(""); setRPass2(""); setREmail("");
    } catch { setError("Chyba registrace"); }
  };

  const logout = () => {
    try { localStorage.removeItem("dash_session"); } catch {}
    setLoggedUser(""); setView("login"); setUser(""); setPass(""); setError(""); setSuccess("");
  };

  const clearStats = () => {
    if (confirm("Opravdu smazat všechny statistiky?")) {
      localStorage.removeItem("bot_stats");
      setStats(emptyStats());
    }
  };

  const hour = time.getHours();
  const topTopics = Object.entries(stats.topics).sort(([,a],[,b]) => b - a).slice(0, 6);
  const maxH = Math.max(...stats.hourly, 1);
  const filteredMsgs = stats.lastMessages.filter(m =>
    (!filterUrgent || m.urgent) &&
    (!searchMsg || m.content.toLowerCase().includes(searchMsg.toLowerCase()))
  );

  const S = `
    *{box-sizing:border-box;margin:0;padding:0}
    body{cursor:default}
    .inp{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);color:#fff;padding:10px 14px;font-size:13px;outline:none;width:100%;transition:all .2s;font-family:inherit;cursor:text}
    .inp:focus{border-color:rgba(232,101,10,.5);background:rgba(232,101,10,.04)}
    .inp::placeholder{color:rgba(255,255,255,.2)}
    .inp-sm{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);color:#fff;padding:6px 10px;font-size:12px;outline:none;transition:border-color .2s;font-family:inherit;cursor:text}
    .inp-sm:focus{border-color:rgba(232,101,10,.4)}
    .inp-sm::placeholder{color:rgba(255,255,255,.2)}
    .btn-primary{background:linear-gradient(135deg,#E8650A,#FF8C42);border:none;color:#fff;padding:11px;font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;cursor:pointer;width:100%;font-family:inherit;transition:all .2s;position:relative;overflow:hidden}
    .btn-primary:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(232,101,10,.4)}
    .btn-primary:active{transform:translateY(0)}
    .btn-ghost{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.6);padding:6px 12px;font-size:11px;cursor:pointer;font-family:inherit;letter-spacing:.05em;transition:all .2s}
    .btn-ghost:hover{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.2);color:#fff}
    .btn-orange{background:rgba(232,101,10,.9);border:none;color:white;padding:6px 14px;font-size:11px;cursor:pointer;font-family:inherit;font-weight:600;letter-spacing:.08em;transition:all .2s}
    .btn-orange:hover{background:#E8650A}
    .btn-danger{background:rgba(220,38,38,.1);border:1px solid rgba(220,38,38,.3);color:rgba(220,38,38,.8);padding:6px 12px;font-size:11px;cursor:pointer;font-family:inherit;transition:all .2s}
    .btn-danger:hover{background:rgba(220,38,38,.2)}
    .btn-link{background:none;border:none;color:rgba(232,101,10,.7);cursor:pointer;font-family:inherit;font-size:12px;transition:color .2s;padding:0}
    .btn-link:hover{color:#E8650A}
    .lbl{display:block;font-size:10px;color:rgba(255,255,255,.35);margin-bottom:7px;letter-spacing:.2em;text-transform:uppercase}
    .card{background:#0a0604;border:1px solid rgba(255,255,255,.07);padding:1.4rem;position:relative;overflow:hidden;transition:border-color .2s}
    .card:hover{border-color:rgba(232,101,10,.2)}
    .card::before{content:"";position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(232,101,10,.25),transparent)}
    .nav-tab{background:none;border:none;color:rgba(255,255,255,.4);font-size:12px;padding:6px 12px;cursor:pointer;font-family:inherit;transition:all .2s;border-bottom:2px solid transparent}
    .nav-tab:hover{color:#fff;background:rgba(255,255,255,.05)}
    .nav-tab.active{color:#fff;border-bottom-color:#E8650A}
    .dot-g{width:6px;height:6px;background:#22c55e;border-radius:50%;display:inline-block;animation:pulse 2s infinite}
    .dot-r{width:6px;height:6px;background:#E8650A;border-radius:50%;display:inline-block;animation:pulse 1s infinite}
    .dot-d{width:6px;height:6px;background:rgba(255,255,255,.15);border-radius:50%;display:inline-block}
    .badge{font-size:10px;padding:2px 7px;font-weight:500;letter-spacing:.05em;display:inline-flex;align-items:center;gap:4px}
    .mrow{padding:10px 0;border-bottom:1px solid rgba(255,255,255,.05);display:flex;align-items:center;gap:10px;transition:background .15s}
    .mrow:last-child{border-bottom:none}
    .mrow:hover{background:rgba(232,101,10,.03);margin:0 -1.4rem;padding:10px 1.4rem}
    .toggle{width:36px;height:20px;background:rgba(255,255,255,.1);border:none;cursor:pointer;position:relative;transition:background .2s}
    .toggle.on{background:#E8650A}
    .toggle::after{content:"";position:absolute;width:14px;height:14px;background:#fff;border-radius:50%;top:3px;left:3px;transition:transform .2s}
    .toggle.on::after{transform:translateX(16px)}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
    @keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
    @keyframes hatBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
    @keyframes flicker{0%,100%{transform:scaleY(1) skewX(-1deg)}50%{transform:scaleY(1.1) skewX(1.5deg)}}
    @keyframes flicker2{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.15) skewX(-1deg)}}
    @keyframes barIn{from{transform:scaleY(0)}to{transform:scaleY(1)}}
    @keyframes slideUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
    @keyframes orbPulse{0%,100%{opacity:.05}50%{opacity:.1}}
    @keyframes ember{0%{transform:translate(0,0);opacity:1}100%{transform:translate(var(--ex),var(--ey));opacity:0}}
  `;

  // ===== LOGIN =====
  if (view === "login") return (
    <div style={{minHeight:"100vh",background:"#000",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif",color:"#fff"}}>
      <style>{S}</style>
      <div style={{position:"absolute",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(232,101,10,.06),transparent 65%)",top:"50%",left:"50%",transform:"translate(-50%,-50%)",animation:"orbPulse 5s ease-in-out infinite",pointerEvents:"none"}}/>
      <div style={{width:380,animation:"fadeIn .5s ease",position:"relative"}}>
        <div style={{textAlign:"center",marginBottom:32}}>
          <div style={{fontSize:"3rem",marginBottom:10,display:"block",animation:"hatBob 3s ease-in-out infinite",filter:"drop-shadow(0 0 16px rgba(232,101,10,.5))"}}>🎩</div>
          <div style={{fontFamily:"Georgia,serif",fontSize:"1.4rem",letterSpacing:".1em",marginBottom:4}}>KOMINICTVÍ <span style={{color:"#E8650A"}}>ŠTĚSTÍ</span></div>
          <div style={{fontSize:10,color:"rgba(255,255,255,.25)",letterSpacing:".3em",textTransform:"uppercase"}}>Admin Dashboard</div>
        </div>
        <div style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.08)",padding:28,position:"relative"}}>
          <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(232,101,10,.6),transparent)"}}/>
          {success && <div style={{background:"rgba(34,197,94,.08)",border:"1px solid rgba(34,197,94,.2)",color:"rgba(34,197,94,.9)",padding:"8px 12px",fontSize:12,marginBottom:12,textAlign:"center"}}>{success}</div>}
          {error && <div style={{background:"rgba(220,38,38,.08)",border:"1px solid rgba(220,38,38,.2)",color:"rgba(220,38,38,.9)",padding:"8px 12px",fontSize:12,marginBottom:12,textAlign:"center"}}>⚠️ {error}</div>}
          <div style={{marginBottom:14}}>
            <label className="lbl">Uživatelské jméno</label>
            <input className="inp" value={user} onChange={e=>setUser(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()} placeholder="tomas" autoFocus/>
          </div>
          <div style={{marginBottom:20}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7}}>
              <label className="lbl" style={{margin:0}}>Heslo</label>
              <button className="btn-link" style={{fontSize:11}} onClick={()=>{}}>Zapomenuté heslo?</button>
            </div>
            <div style={{position:"relative"}}>
              <input className="inp" type={showPass?"text":"password"} value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()} placeholder="••••••••••••"/>
              <button onClick={()=>setShowPass(!showPass)} style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:"rgba(255,255,255,.3)",cursor:"pointer",fontSize:11}}>{showPass?"skrýt":"zobrazit"}</button>
            </div>
          </div>
          <button className="btn-primary" onClick={login}>Přihlásit se →</button>
        </div>
        <p style={{textAlign:"center",marginTop:16,fontSize:12,color:"rgba(255,255,255,.25)"}}>
          Nemáte účet? <button className="btn-link" onClick={()=>{setView("register");setError("");}}>Vytvořit účet</button>
        </p>
        <div style={{textAlign:"center",marginTop:24,fontSize:10,color:"rgba(255,255,255,.1)",letterSpacing:".15em"}}>KOMINICTVÍ ŠTĚSTÍ · 2026</div>
      </div>
    </div>
  );

  // ===== REGISTER =====
  if (view === "register") return (
    <div style={{minHeight:"100vh",background:"#000",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",fontFamily:"-apple-system,sans-serif",color:"#fff"}}>
      <style>{S}</style>
      <div style={{position:"absolute",width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(232,101,10,.05),transparent 65%)",top:"50%",left:"50%",transform:"translate(-50%,-50%)",animation:"orbPulse 5s ease-in-out infinite",pointerEvents:"none"}}/>
      <div style={{width:400,animation:"fadeIn .5s ease",position:"relative"}}>
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{fontSize:"2rem",marginBottom:8}}>🔐</div>
          <div style={{fontFamily:"Georgia,serif",fontSize:"1.2rem",letterSpacing:".1em",marginBottom:4}}>NOVÝ ÚČET</div>
          <div style={{fontSize:10,color:"rgba(255,255,255,.25)",letterSpacing:".3em",textTransform:"uppercase"}}>Kominictví Štěstí</div>
        </div>
        <div style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.08)",padding:28,position:"relative"}}>
          <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(232,101,10,.6),transparent)"}}/>
          {error && <div style={{background:"rgba(220,38,38,.08)",border:"1px solid rgba(220,38,38,.2)",color:"rgba(220,38,38,.9)",padding:"8px 12px",fontSize:12,marginBottom:12,textAlign:"center"}}>⚠️ {error}</div>}
          {[
            {lbl:"Uživatelské jméno",val:rUser,set:setRUser,ph:"jan.novak",type:"text"},
            {lbl:"Email",val:rEmail,set:setREmail,ph:"jan@email.cz",type:"email"},
            {lbl:"Heslo (min. 6 znaků)",val:rPass,set:setRPass,ph:"••••••••",type:"password"},
            {lbl:"Potvrdit heslo",val:rPass2,set:setRPass2,ph:"••••••••",type:"password"},
          ].map((f,i) => (
            <div key={i} style={{marginBottom:12}}>
              <label className="lbl">{f.lbl}</label>
              <input className="inp" type={f.type} value={f.val} onChange={e=>f.set(e.target.value)} onKeyDown={e=>e.key==="Enter"&&register()} placeholder={f.ph}/>
            </div>
          ))}
          <button className="btn-primary" onClick={register} style={{marginTop:8}}>Vytvořit účet →</button>
        </div>
        <p style={{textAlign:"center",marginTop:16,fontSize:12,color:"rgba(255,255,255,.25)"}}>
          <button className="btn-link" onClick={()=>{setView("login");setError("");}}>← Zpět na přihlášení</button>
        </p>
      </div>
    </div>
  );

  // ===== LOADING =====
  if (view === "loading") return (
    <div style={{minHeight:"100vh",background:"#000",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",fontFamily:"-apple-system,sans-serif",color:"#fff"}}>
      <style>{S}</style>
      <div style={{position:"absolute",width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(232,101,10,.08),transparent 65%)",top:"50%",left:"50%",transform:"translate(-50%,-50%)",animation:"orbPulse 3s ease-in-out infinite",pointerEvents:"none"}}/>
      {[{l:"47%",ex:"-20px",ey:"-50px",c:"#FF8C42",d:"0s"},{l:"50%",ex:"15px",ey:"-60px",c:"#FFD166",d:".4s"},{l:"53%",ex:"-10px",ey:"-45px",c:"#FF4500",d:".8s"},{l:"49%",ex:"25px",ey:"-55px",c:"#FF8C42",d:"1.1s"}].map((e,i) => (
        <div key={i} style={{position:"absolute",width:3,height:3,borderRadius:"50%",bottom:"48%",left:e.l,background:e.c,["--ex" as any]:e.ex,["--ey" as any]:e.ey,animation:`ember 1.5s ${e.d} ease-out infinite`}}/>
      ))}
      <div style={{textAlign:"center",position:"relative",zIndex:2}}>
        <div style={{animation:"hatBob 2s ease-in-out infinite",display:"inline-block",marginBottom:12}}>
          <svg width="80" height="100" viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
            <path style={{transformOrigin:"40px 12px",animation:"flicker .5s ease-in-out infinite"}} d="M37,12 Q35,4 40,0 Q45,4 43,12Z" fill="#FF4500" opacity=".95"/>
            <path style={{transformOrigin:"40px 12px",animation:"flicker2 .6s .1s ease-in-out infinite"}} d="M38,12 Q37,6 40,3 Q43,6 42,12Z" fill="#FFD166" opacity=".9"/>
            <rect x="24" y="12" width="32" height="22" rx="2" fill="#0d0d0d" stroke="#2a2a2a" strokeWidth=".5"/>
            <rect x="20" y="33" width="40" height="6" rx="1" fill="#111"/>
            <rect x="24" y="28" width="32" height="4" fill="#E8650A" opacity=".8"/>
            <ellipse cx="40" cy="58" rx="17" ry="16" fill="#C9A96E"/>
            <path d="M30 54 Q34 52 38 54" stroke="#5a3010" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M42 54 Q46 52 50 54" stroke="#5a3010" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M34 64 Q40 69 46 64" stroke="#5a3010" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M23,74 Q24,68 40,66 Q56,68 57,74 L60,95 Q40,98 20,95 Z" fill="#0d0d0d"/>
            <circle cx="40" cy="76" r="1.5" fill="#E8650A" opacity=".8"/>
          </svg>
        </div>
        <div style={{fontFamily:"Georgia,serif",fontSize:"1.2rem",letterSpacing:".1em",marginBottom:4}}>KOMINICTVÍ <span style={{color:"#E8650A"}}>ŠTĚSTÍ</span></div>
        <div style={{fontSize:10,color:"rgba(255,255,255,.3)",letterSpacing:".2em",textTransform:"uppercase",marginBottom:24}}>{loadMsg}</div>
        <div style={{width:220,height:2,background:"rgba(255,255,255,.06)",margin:"0 auto 12px",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:0,left:0,height:"100%",width:`${loadPct}%`,background:"linear-gradient(90deg,#E8650A,#FF8C42)",transition:"width .5s ease"}}/>
        </div>
        <div style={{fontSize:11,color:"rgba(255,255,255,.25)"}}>{loadPct}%</div>
      </div>
    </div>
  );

  // ===== DASHBOARD =====
  return (
    <div style={{minHeight:"100vh",background:"#000",fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif",color:"#fff"}}>
      <style>{S}</style>

      {/* Topbar */}
      <div style={{borderBottom:"1px solid rgba(255,255,255,.07)",padding:"0 24px",display:"flex",alignItems:"center",justifyContent:"space-between",height:52,background:"rgba(5,2,1,.95)",position:"sticky",top:0,zIndex:100}}>
        <div style={{display:"flex",alignItems:"center",gap:16}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:"1.2rem",filter:"drop-shadow(0 0 8px rgba(232,101,10,.5))"}}>🎩</span>
            <span style={{fontFamily:"Georgia,serif",color:"#E8650A",fontSize:".85rem",letterSpacing:".08em"}}>KOMINICTVÍ ŠTĚSTÍ</span>
          </div>
          <div style={{width:1,height:16,background:"rgba(255,255,255,.08)"}}/>
          <nav style={{display:"flex"}}>
            {(["overview","messages","analytics","settings"] as NavTab[]).map(t => (
              <button key={t} className={`nav-tab${tab===t?" active":""}`} onClick={()=>setTab(t)}>
                {t==="overview"?"Overview":t==="messages"?"Zprávy":t==="analytics"?"Analytika":"Nastavení"}
              </button>
            ))}
          </nav>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:16}}>
          <div style={{display:"flex",alignItems:"center",gap:5,fontSize:11,color:"rgba(255,255,255,.35)"}}>
            <span className="dot-g"/> Live · {time.toLocaleTimeString("cs-CZ")}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:11,color:"rgba(255,255,255,.35)"}}>{loggedUser}</span>
            <div style={{width:28,height:28,borderRadius:"50%",background:"rgba(232,101,10,.12)",border:"1px solid rgba(232,101,10,.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"#E8650A",fontWeight:600,cursor:"pointer"}} onClick={logout} title="Odhlásit se">
              {loggedUser[0]?.toUpperCase() || "T"}
            </div>
          </div>
        </div>
      </div>

      <div style={{padding:24,maxWidth:1400,margin:"0 auto"}}>

        {/* ===== OVERVIEW ===== */}
        {tab === "overview" && (
          <div style={{animation:"slideUp .3s ease"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
              <div>
                <h1 style={{fontSize:20,fontWeight:600,margin:"0 0 3px",letterSpacing:"-.3px"}}>
                  {hour<12?"Dobré ráno":hour<18?"Dobrý den":"Dobrý večer"}, <span style={{color:"#E8650A"}}>{loggedUser}</span> 👋
                </h1>
                <p style={{fontSize:12,color:"rgba(255,255,255,.3)",margin:0}}>{new Date().toLocaleDateString("cs-CZ",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</p>
              </div>
              <div style={{display:"flex",gap:8}}>
                <button className="btn-ghost" onClick={refreshStats}>↻ Obnovit</button>
                <button className="btn-orange" onClick={()=>setTab("analytics")}>Analytika →</button>
              </div>
            </div>

            {/* Stats */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:1,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.06)",marginBottom:16,overflow:"hidden"}}>
              {[
                {label:"Celkem dotazů",val:stats.total,sub:"od spuštění bota",color:"#E8650A"},
                {label:"Urgentní případy",val:stats.urgent,sub:"celkem zachyceno",color:"#ff6b6b"},
                {label:"Dotazy dnes",val:stats.today,sub:"aktuální den",color:"#22c55e"},
                {label:"Návštěvníků online",val:visitors,sub:"právě na webu",color:"#60a5fa"},
              ].map((s,i) => (
                <div key={i} style={{background:"#000",padding:"18px 16px"}}>
                  <div style={{fontSize:10,color:"rgba(255,255,255,.3)",letterSpacing:".15em",textTransform:"uppercase",marginBottom:10}}>{s.label}</div>
                  <div style={{fontFamily:"Georgia,serif",fontSize:"2.2rem",fontWeight:300,color:s.color,lineHeight:1,letterSpacing:"-.5px"}}>{s.val}</div>
                  <div style={{fontSize:11,color:"rgba(255,255,255,.25)",marginTop:6}}>{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Chart + Topics */}
            <div style={{display:"grid",gridTemplateColumns:"3fr 2fr",gap:12,marginBottom:12}}>
              <div className="card">
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                  <div>
                    <div style={{fontSize:12,fontWeight:500}}>Aktivita za 24 hodin</div>
                    <div style={{fontSize:11,color:"rgba(255,255,255,.3)",marginTop:2}}>Dotazy podle hodiny — aktuální hodina zvýrazněna</div>
                  </div>
                </div>
                <div style={{display:"flex",alignItems:"flex-end",gap:3,height:80}}>
                  {stats.hourly.map((v,i) => (
                    <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-end",height:"100%"}}>
                      <div style={{width:"100%",height:`${Math.max(2,(v/maxH)*76)}px`,background:i===hour?"rgba(232,101,10,.95)":"rgba(232,101,10,.2)",borderRadius:"1px 1px 0 0",minHeight:2,transformOrigin:"bottom",animation:`barIn .4s ${i*.015}s ease both`}}/>
                    </div>
                  ))}
                </div>
                <div style={{display:"flex",justifyContent:"space-between",marginTop:8}}>
                  {["0h","4h","8h","12h","16h","20h","23h"].map(t => <span key={t} style={{fontSize:10,color:"rgba(255,255,255,.2)"}}>{t}</span>)}
                </div>
              </div>

              <div className="card">
                <div style={{fontSize:12,fontWeight:500,marginBottom:16}}>Nejčastější témata</div>
                {topTopics.length === 0 ? (
                  <div style={{color:"rgba(255,255,255,.2)",fontSize:12,textAlign:"center",padding:"20px 0"}}>Zatím žádná data</div>
                ) : topTopics.map(([t,v],i) => (
                  <div key={i} style={{marginBottom:10}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                      <span style={{fontSize:11,color:"rgba(255,255,255,.55)"}}>{t}</span>
                      <span style={{fontSize:11,color:"#E8650A",fontWeight:500}}>{v}×</span>
                    </div>
                    <div style={{height:2,background:"rgba(255,255,255,.06)"}}>
                      <div style={{height:"100%",width:`${(v/(topTopics[0]?.[1]||1))*100}%`,background:"linear-gradient(90deg,#E8650A,rgba(232,101,10,.4))"}}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status + Last msgs */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 2fr",gap:12}}>
              <div className="card">
                <div style={{fontSize:12,fontWeight:500,marginBottom:14}}>Stav systémů</div>
                {["AI Bot (Groq)","Email notifikace","SMS (Vonage)","Počasí API","Týdenní report"].map((n,i) => (
                  <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:i<4?"1px solid rgba(255,255,255,.04)":"none"}}>
                    <span style={{fontSize:11,color:"rgba(255,255,255,.5)"}}>{n}</span>
                    <span className="badge" style={{background:"rgba(34,197,94,.08)",border:"1px solid rgba(34,197,94,.2)",color:"#22c55e"}}>
                      <span className="dot-g" style={{width:4,height:4}}/>OK
                    </span>
                  </div>
                ))}
              </div>

              <div className="card" style={{padding:0}}>
                <div style={{padding:"14px 16px",borderBottom:"1px solid rgba(255,255,255,.05)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{fontSize:12,fontWeight:500}}>Poslední zprávy</div>
                  <button className="btn-link" style={{fontSize:11}} onClick={()=>setTab("messages")}>Zobrazit vše →</button>
                </div>
                <div style={{padding:"0 16px"}}>
                  {stats.lastMessages.length === 0 ? (
                    <div style={{padding:"2rem",textAlign:"center",color:"rgba(255,255,255,.2)",fontSize:12}}>🎩 Bot čeká na zákazníky...</div>
                  ) : [...stats.lastMessages].reverse().slice(0,5).map((m,i) => (
                    <div key={i} className="mrow">
                      <span className={m.urgent?"dot-r":"dot-d"}/>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:12,color:m.urgent?"rgba(255,150,150,.9)":"rgba(255,255,255,.65)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{m.content}</div>
                      </div>
                      <span style={{fontSize:10,color:"rgba(255,255,255,.25)",whiteSpace:"nowrap"}}>{m.time}</span>
                      <span className="badge" style={{background:m.urgent?"rgba(232,101,10,.08)":"rgba(255,255,255,.04)",border:`1px solid ${m.urgent?"rgba(232,101,10,.25)":"rgba(255,255,255,.08)"}`,color:m.urgent?"#E8650A":"rgba(255,255,255,.3)"}}>
                        {m.urgent?"urgent":"normal"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== MESSAGES ===== */}
        {tab === "messages" && (
          <div style={{animation:"slideUp .3s ease"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <div>
                <h1 style={{fontSize:20,fontWeight:600,margin:"0 0 3px"}}>Zprávy zákazníků</h1>
                <p style={{fontSize:12,color:"rgba(255,255,255,.3)",margin:0}}>{stats.lastMessages.length} celkem zachyceno</p>
              </div>
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <input className="inp-sm" placeholder="🔍 Hledat..." value={searchMsg} onChange={e=>setSearchMsg(e.target.value)} style={{width:200}}/>
                <button className={`btn-ghost${filterUrgent?" ":" "}`} onClick={()=>setFilterUrgent(!filterUrgent)} style={{background:filterUrgent?"rgba(232,101,10,.15)":"",borderColor:filterUrgent?"rgba(232,101,10,.4)":"",color:filterUrgent?"#E8650A":""}}>
                  🚨 Jen urgentní
                </button>
                <button className="btn-ghost" onClick={refreshStats}>↻</button>
              </div>
            </div>
            <div className="card" style={{padding:0}}>
              <div style={{padding:"12px 16px",borderBottom:"1px solid rgba(255,255,255,.05)",display:"flex",justifyContent:"space-between",fontSize:10,color:"rgba(255,255,255,.3)",letterSpacing:".1em",textTransform:"uppercase"}}>
                <span>Zpráva</span><span>Čas · Status</span>
              </div>
              {filteredMsgs.length === 0 ? (
                <div style={{padding:"3rem",textAlign:"center",color:"rgba(255,255,255,.2)",fontSize:12}}>
                  {searchMsg || filterUrgent ? "Žádné zprávy odpovídají filtru" : "🎩 Zatím žádné zprávy"}
                </div>
              ) : [...filteredMsgs].reverse().map((m,i) => (
                <div key={i} className="mrow" style={{padding:"12px 16px",margin:0}}>
                  <span className={m.urgent?"dot-r":"dot-d"}/>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,color:m.urgent?"rgba(255,150,150,.9)":"rgba(255,255,255,.75)",marginBottom:2}}>{m.content}</div>
                    <div style={{fontSize:10,color:"rgba(255,255,255,.25)"}}>{m.time}</div>
                  </div>
                  <span className="badge" style={{background:m.urgent?"rgba(232,101,10,.1)":"rgba(255,255,255,.04)",border:`1px solid ${m.urgent?"rgba(232,101,10,.3)":"rgba(255,255,255,.08)"}`,color:m.urgent?"#E8650A":"rgba(255,255,255,.3)"}}>
                    {m.urgent?"🚨 urgent":"normal"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== ANALYTICS ===== */}
        {tab === "analytics" && (
          <div style={{animation:"slideUp .3s ease"}}>
            <div style={{marginBottom:20}}>
              <h1 style={{fontSize:20,fontWeight:600,margin:"0 0 3px"}}>Analytika</h1>
              <p style={{fontSize:12,color:"rgba(255,255,255,.3)",margin:0}}>Přehled výkonu AI bota</p>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:12}}>
              {[
                {label:"Celkem dotazů",val:stats.total,icon:"💬",desc:"Všechny zachycené zprávy"},
                {label:"Urgentní případy",val:stats.urgent,icon:"🚨",desc:"Vyžadují okamžitou akci"},
                {label:"Urgentní %",val:stats.total>0?Math.round(stats.urgent/stats.total*100):0,icon:"📊",desc:"Podíl urgentních",suffix:"%"},
              ].map((s,i) => (
                <div key={i} className="card">
                  <div style={{fontSize:24,marginBottom:8}}>{s.icon}</div>
                  <div style={{fontFamily:"Georgia,serif",fontSize:"2rem",fontWeight:300,color:"#E8650A",lineHeight:1}}>{s.val}{s.suffix||""}</div>
                  <div style={{fontSize:12,color:"rgba(255,255,255,.6)",marginTop:4}}>{s.label}</div>
                  <div style={{fontSize:11,color:"rgba(255,255,255,.25)",marginTop:2}}>{s.desc}</div>
                </div>
              ))}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <div className="card">
                <div style={{fontSize:12,fontWeight:500,marginBottom:16}}>Distribuce témat</div>
                {topTopics.length === 0 ? (
                  <div style={{color:"rgba(255,255,255,.2)",fontSize:12,textAlign:"center",padding:"20px 0"}}>Žádná data</div>
                ) : topTopics.map(([t,v],i) => {
                  const pct = stats.total > 0 ? Math.round(v/stats.total*100) : 0;
                  return (
                    <div key={i} style={{marginBottom:12}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                        <span style={{fontSize:12,color:"rgba(255,255,255,.65)"}}>{t}</span>
                        <span style={{fontSize:12,color:"#E8650A"}}>{v}× ({pct}%)</span>
                      </div>
                      <div style={{height:6,background:"rgba(255,255,255,.06)",borderRadius:3}}>
                        <div style={{height:"100%",width:`${(v/(topTopics[0]?.[1]||1))*100}%`,background:"linear-gradient(90deg,#E8650A,rgba(232,101,10,.5))",borderRadius:3}}/>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="card">
                <div style={{fontSize:12,fontWeight:500,marginBottom:16}}>Aktivita podle hodiny</div>
                <div style={{display:"flex",alignItems:"flex-end",gap:3,height:100}}>
                  {stats.hourly.map((v,i) => (
                    <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-end",height:"100%",gap:3}}>
                      <div style={{width:"100%",height:`${Math.max(2,(v/maxH)*90)}px`,background:i===hour?"#E8650A":"rgba(232,101,10,.25)",borderRadius:"2px 2px 0 0",minHeight:2}}/>
                      {i%6===0&&<div style={{fontSize:9,color:"rgba(255,255,255,.2)"}}>{i}h</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== SETTINGS ===== */}
        {tab === "settings" && (
          <div style={{animation:"slideUp .3s ease"}}>
            <div style={{marginBottom:20}}>
              <h1 style={{fontSize:20,fontWeight:600,margin:"0 0 3px"}}>Nastavení</h1>
              <p style={{fontSize:12,color:"rgba(255,255,255,.3)",margin:0}}>Správa účtu a dashboardu</p>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <div className="card">
                <div style={{fontSize:12,fontWeight:500,marginBottom:16}}>Informace o účtu</div>
                {[
                  {label:"Uživatelské jméno",val:loggedUser},
                  {label:"Role",val:"Administrátor"},
                  {label:"Přihlášen",val:new Date().toLocaleString("cs-CZ")},
                ].map((r,i) => (
                  <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:i<2?"1px solid rgba(255,255,255,.04)":"none"}}>
                    <span style={{fontSize:11,color:"rgba(255,255,255,.4)"}}>{r.label}</span>
                    <span style={{fontSize:11,color:"rgba(255,255,255,.7)"}}>{r.val}</span>
                  </div>
                ))}
                <button className="btn-ghost" onClick={logout} style={{width:"100%",marginTop:16}}>Odhlásit se</button>
              </div>

              <div className="card">
                <div style={{fontSize:12,fontWeight:500,marginBottom:16}}>Správa dat</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,.4)",marginBottom:12}}>
                  Data bota jsou uložena lokálně v prohlížeči (localStorage). Pro synchronizaci mezi zařízeními je potřeba Supabase napojení.
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  <button className="btn-ghost" onClick={refreshStats} style={{width:"100%"}}>↻ Obnovit statistiky</button>
                  <button className="btn-danger" onClick={clearStats} style={{width:"100%"}}>🗑 Smazat všechna data</button>
                </div>
              </div>

              <div className="card">
                <div style={{fontSize:12,fontWeight:500,marginBottom:16}}>Systémové informace</div>
                {[
                  {label:"AI Model",val:"Llama 3.3 70B (Groq)"},
                  {label:"Email",val:"Resend API"},
                  {label:"SMS",val:"Vonage REST API"},
                  {label:"Počasí",val:"Open-Meteo"},
                  {label:"Hosting",val:"Vercel"},
                ].map((r,i) => (
                  <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:i<4?"1px solid rgba(255,255,255,.04)":"none"}}>
                    <span style={{fontSize:11,color:"rgba(255,255,255,.4)"}}>{r.label}</span>
                    <span className="badge" style={{background:"rgba(34,197,94,.08)",border:"1px solid rgba(34,197,94,.2)",color:"#22c55e",fontSize:10}}>{r.val}</span>
                  </div>
                ))}
              </div>

              <div className="card">
                <div style={{fontSize:12,fontWeight:500,marginBottom:16}}>Registrovaní uživatelé</div>
                {(() => {
                  try {
                    const users = JSON.parse(localStorage.getItem("dash_users") || "[]");
                    const allUsers = [{username:ADMIN_USER,email:"admin",created:"výchozí"},...users];
                    return allUsers.map((u:any,i:number) => (
                      <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:i<allUsers.length-1?"1px solid rgba(255,255,255,.04)":"none"}}>
                        <div>
                          <div style={{fontSize:11,color:"rgba(255,255,255,.7)"}}>{u.username}</div>
                          <div style={{fontSize:10,color:"rgba(255,255,255,.3)"}}>{u.email}</div>
                        </div>
                        <span className="badge" style={{background:"rgba(232,101,10,.08)",border:"1px solid rgba(232,101,10,.2)",color:"#E8650A",fontSize:10}}>admin</span>
                      </div>
                    ));
                  } catch { return <div style={{color:"rgba(255,255,255,.2)",fontSize:11}}>Nelze načíst uživatele</div>; }
                })()}
              </div>
            </div>
          </div>
        )}

        <div style={{textAlign:"center",marginTop:32,fontSize:10,color:"rgba(255,255,255,.1)",letterSpacing:".15em"}}>
          KOMINICTVÍ ŠTĚSTÍ · ADMIN DASHBOARD · {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}
