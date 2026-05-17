"use client";
import { useState, useEffect } from "react";

const ADMIN_USER = "tomas";
const ADMIN_PASS = "kominictvi2026";

type View = "login" | "register" | "dashboard";

type Stats = {
  total: number;
  urgent: number;
  today: number;
  todayUrgent: number;
  topics: Record<string, number>;
  hourly: number[];
  lastMessages: { content: string; time: string; urgent: boolean }[];
};

const emptyStats = (): Stats => ({
  total: 0, urgent: 0, today: 0, todayUrgent: 0,
  topics: {}, hourly: Array(24).fill(0), lastMessages: [],
});

export default function Dashboard() {
  const [view, setView] = useState<View>("login");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [regUser, setRegUser] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regPass2, setRegPass2] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loggedUser, setLoggedUser] = useState("");
  const [stats, setStats] = useState<Stats>(emptyStats());
  const [time, setTime] = useState(new Date());
  const [visitors, setVisitors] = useState(3);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("dash_session");
    if (stored) { setLoggedUser(stored); setView("dashboard"); }
    const s = localStorage.getItem("bot_stats");
    if (s) setStats(JSON.parse(s));
    const iv = setInterval(() => {
      setTime(new Date());
      setVisitors(v => Math.max(1, v + Math.floor(Math.random() * 3) - 1));
      const s2 = localStorage.getItem("bot_stats");
      if (s2) setStats(JSON.parse(s2));
    }, 5000);
    return () => clearInterval(iv);
  }, []);

  const login = () => {
    if (!user || !pass) { setError("Vyplňte všechna pole"); return; }
    const users = JSON.parse(localStorage.getItem("dash_users") || "[]");
    const found = users.find((u: any) => u.username === user && u.password === pass);
    if (found || (user === ADMIN_USER && pass === ADMIN_PASS)) {
      localStorage.setItem("dash_session", user);
      setLoggedUser(user); setView("dashboard"); setError("");
    } else { setError("Nesprávné přihlašovací údaje"); setPass(""); }
  };

  const register = () => {
    if (!regUser || !regPass || !regEmail) { setError("Vyplňte všechna pole"); return; }
    if (regPass !== regPass2) { setError("Hesla se neshodují"); return; }
    if (regPass.length < 6) { setError("Heslo musí mít alespoň 6 znaků"); return; }
    const users = JSON.parse(localStorage.getItem("dash_users") || "[]");
    if (users.find((u: any) => u.username === regUser)) { setError("Uživatel již existuje"); return; }
    users.push({ username: regUser, password: regPass, email: regEmail, created: new Date().toISOString() });
    localStorage.setItem("dash_users", JSON.stringify(users));
    setSuccess("Účet vytvořen! Přihlaste se.");
    setView("login"); setError("");
    setUser(regUser); setPass(regPass);
  };

  const logout = () => {
    localStorage.removeItem("dash_session");
    setLoggedUser(""); setView("login");
    setUser(""); setPass("");
  };

  const topTopics = Object.entries(stats.topics).sort(([,a],[,b]) => b-a).slice(0, 6);
  const maxH = Math.max(...stats.hourly, 1);
  const hour = time.getHours();

  // LOGIN
  if (view === "login") return (
    <div style={{ minHeight:"100vh", background:"#000", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
      <style>{`
        @keyframes bgPulse{0%,100%{opacity:.03}50%{opacity:.07}}
        @keyframes formIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shimmer{0%{left:-100%}100%{left:200%}}
        @keyframes orbFloat{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-20px) scale(1.05)}}
        .inp{width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(232,101,10,.2);color:white;padding:.85rem 1.1rem;font-size:.88rem;outline:none;box-sizing:border-box;transition:border-color .3s ease;font-family:sans-serif}
        .inp:focus{border-color:rgba(232,101,10,.6);background:rgba(232,101,10,.04)}
        .inp::placeholder{color:rgba(255,255,255,.25)}
        .btn-main{width:100%;background:linear-gradient(135deg,#E8650A,#FF8C42);border:none;color:white;padding:.95rem;font-size:.82rem;letter-spacing:.15em;text-transform:uppercase;cursor:pointer;font-weight:700;transition:all .3s ease;position:relative;overflow:hidden}
        .btn-main::after{content:"";position:absolute;top:0;left:-100%;width:60%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent);animation:shimmer 2s ease infinite}
        .btn-main:hover{transform:translateY(-1px);box-shadow:0 8px 30px rgba(232,101,10,.4)}
        .btn-sec{background:none;border:1px solid rgba(232,101,10,.25);color:rgba(232,101,10,.7);padding:.6rem 1.2rem;cursor:pointer;font-size:.72rem;letter-spacing:.1em;transition:all .3s ease}
        .btn-sec:hover{border-color:rgba(232,101,10,.6);color:#E8650A}
      `}</style>
      
      <div style={{position:"absolute",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(232,101,10,.06),transparent 65%)",top:"50%",left:"50%",transform:"translate(-50%,-50%)",animation:"orbFloat 8s ease-in-out infinite",pointerEvents:"none"}}/>
      <div style={{position:"absolute",width:300,height:300,borderRadius:"50%",background:"radial-gradient(circle,rgba(232,101,10,.04),transparent 65%)",top:"20%",right:"15%",animation:"orbFloat 6s 2s ease-in-out infinite",pointerEvents:"none"}}/>

      <div style={{background:"linear-gradient(145deg,#0f0704,#080402)",border:"1px solid rgba(232,101,10,.2)",padding:"3rem",width:400,boxShadow:"0 30px 80px rgba(0,0,0,.9),0 0 60px rgba(232,101,10,.06)",animation:"formIn .6s ease forwards",position:"relative"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,#E8650A,#FF8C42,transparent)"}}/>
        
        <div style={{textAlign:"center",marginBottom:"2.5rem"}}>
          <div style={{fontSize:"3.5rem",marginBottom:".8rem",filter:"drop-shadow(0 0 20px rgba(232,101,10,.5))"}}>🎩</div>
          <div style={{fontFamily:"Georgia,serif",fontSize:"1.5rem",color:"#E8650A",letterSpacing:".12em",marginBottom:".3rem"}}>KOMINICTVÍ ŠTĚSTÍ</div>
          <div style={{color:"rgba(255,255,255,.3)",fontSize:".62rem",letterSpacing:".3em",textTransform:"uppercase"}}>Admin Dashboard</div>
        </div>

        {success && <div style={{background:"rgba(34,197,94,.1)",border:"1px solid rgba(34,197,94,.3)",color:"rgba(34,197,94,.9)",padding:".7rem 1rem",fontSize:".75rem",marginBottom:"1rem",textAlign:"center"}}>{success}</div>}
        {error && <div style={{background:"rgba(220,38,38,.1)",border:"1px solid rgba(220,38,38,.3)",color:"rgba(220,38,38,.9)",padding:".7rem 1rem",fontSize:".75rem",marginBottom:"1rem",textAlign:"center"}}>⚠️ {error}</div>}

        <div style={{marginBottom:"1rem"}}>
          <label style={{color:"rgba(255,255,255,.4)",fontSize:".62rem",letterSpacing:".2em",textTransform:"uppercase",display:"block",marginBottom:".4rem"}}>Uživatelské jméno</label>
          <input className="inp" value={user} onChange={e=>setUser(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()} placeholder="tomas" autoFocus/>
        </div>
        <div style={{marginBottom:"1.8rem"}}>
          <label style={{color:"rgba(255,255,255,.4)",fontSize:".62rem",letterSpacing:".2em",textTransform:"uppercase",display:"block",marginBottom:".4rem"}}>Heslo</label>
          <input className="inp" type="password" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()} placeholder="••••••••••"/>
        </div>

        <button className="btn-main" onClick={login}>Přihlásit se →</button>
        
        <div style={{textAlign:"center",marginTop:"1.5rem"}}>
          <button className="btn-sec" onClick={()=>{setView("register");setError("");setSuccess("")}}>Vytvořit nový účet</button>
        </div>
        <div style={{textAlign:"center",marginTop:"1rem",color:"rgba(255,255,255,.15)",fontSize:".6rem"}}>Přístup pouze pro administrátory</div>
      </div>
    </div>
  );

  // REGISTER
  if (view === "register") return (
    <div style={{minHeight:"100vh",background:"#000",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"}}>
      <style>{`
        @keyframes formIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shimmer{0%{left:-100%}100%{left:200%}}
        .inp{width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(232,101,10,.2);color:white;padding:.85rem 1.1rem;font-size:.88rem;outline:none;box-sizing:border-box;transition:border-color .3s ease;font-family:sans-serif}
        .inp:focus{border-color:rgba(232,101,10,.6);background:rgba(232,101,10,.04)}
        .inp::placeholder{color:rgba(255,255,255,.25)}
        .btn-main{width:100%;background:linear-gradient(135deg,#E8650A,#FF8C42);border:none;color:white;padding:.95rem;font-size:.82rem;letter-spacing:.15em;text-transform:uppercase;cursor:pointer;font-weight:700;transition:all .3s ease;position:relative;overflow:hidden}
        .btn-main::after{content:"";position:absolute;top:0;left:-100%;width:60%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent);animation:shimmer 2s ease infinite}
        .btn-main:hover{transform:translateY(-1px);box-shadow:0 8px 30px rgba(232,101,10,.4)}
        .btn-sec{background:none;border:none;color:rgba(232,101,10,.6);cursor:pointer;font-size:.75rem;text-decoration:underline}
      `}</style>
      
      <div style={{position:"absolute",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(232,101,10,.05),transparent 65%)",top:"50%",left:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none"}}/>

      <div style={{background:"linear-gradient(145deg,#0f0704,#080402)",border:"1px solid rgba(232,101,10,.2)",padding:"3rem",width:420,boxShadow:"0 30px 80px rgba(0,0,0,.9)",animation:"formIn .6s ease forwards",position:"relative"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,#E8650A,#FF8C42,transparent)"}}/>

        <div style={{textAlign:"center",marginBottom:"2rem"}}>
          <div style={{fontSize:"2.5rem",marginBottom:".5rem"}}>🔐</div>
          <div style={{fontFamily:"Georgia,serif",fontSize:"1.2rem",color:"#E8650A",letterSpacing:".1em"}}>Nový účet</div>
          <div style={{color:"rgba(255,255,255,.3)",fontSize:".6rem",letterSpacing:".2em",marginTop:".3rem"}}>KOMINICTVÍ ŠTĚSTÍ DASHBOARD</div>
        </div>

        {error && <div style={{background:"rgba(220,38,38,.1)",border:"1px solid rgba(220,38,38,.3)",color:"rgba(220,38,38,.9)",padding:".7rem",fontSize:".75rem",marginBottom:"1rem",textAlign:"center"}}>⚠️ {error}</div>}

        {[
          {label:"Uživatelské jméno",val:regUser,set:setRegUser,ph:"jan.novak",type:"text"},
          {label:"Email",val:regEmail,set:setRegEmail,ph:"jan@email.cz",type:"email"},
          {label:"Heslo (min. 6 znaků)",val:regPass,set:setRegPass,ph:"••••••••",type:"password"},
          {label:"Potvrdit heslo",val:regPass2,set:setRegPass2,ph:"••••••••",type:"password"},
        ].map((f,i) => (
          <div key={i} style={{marginBottom:"1rem"}}>
            <label style={{color:"rgba(255,255,255,.4)",fontSize:".6rem",letterSpacing:".2em",textTransform:"uppercase",display:"block",marginBottom:".4rem"}}>{f.label}</label>
            <input className="inp" type={f.type} value={f.val} onChange={e=>f.set(e.target.value)} onKeyDown={e=>e.key==="Enter"&&register()} placeholder={f.ph}/>
          </div>
        ))}

        <button className="btn-main" onClick={register} style={{marginTop:".5rem"}}>Vytvořit účet →</button>
        <div style={{textAlign:"center",marginTop:"1.2rem"}}>
          <button className="btn-sec" onClick={()=>{setView("login");setError("")}}>← Zpět na přihlášení</button>
        </div>
      </div>
    </div>
  );

  // DASHBOARD
  return (
    <div style={{minHeight:"100vh",background:"#000",fontFamily:"sans-serif",color:"white"}}>
      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
        @keyframes slideIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes glowPulse{0%,100%{box-shadow:0 0 0 0 rgba(232,101,10,0)}50%{box-shadow:0 0 20px 2px rgba(232,101,10,.15)}}
        @keyframes shimmerLine{0%{background-position:-200% 0}100%{background-position:200% 0}}
        .scard{background:linear-gradient(145deg,#0f0704,#080502);border:1px solid rgba(232,101,10,.12);padding:1.8rem;transition:all .4s ease;animation:slideIn .5s ease both;position:relative;overflow:hidden;cursor:default}
        .scard::before{content:"";position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(232,101,10,.4),transparent);background-size:200% 100%;animation:shimmerLine 3s ease infinite}
        .scard:hover{border-color:rgba(232,101,10,.35);transform:translateY(-3px);animation:glowPulse 2s ease-in-out infinite}
        .live{width:8px;height:8px;background:#22c55e;border-radius:50%;animation:pulse 1.5s ease-in-out infinite;display:inline-block}
        .urg{width:8px;height:8px;background:#dc2626;border-radius:50%;animation:pulse .8s ease-in-out infinite;display:inline-block}
        .bar{border-radius:2px 2px 0 0;transition:height .6s ease;min-height:2px}
        .mrow{padding:.9rem 1.5rem;border-bottom:1px solid rgba(255,255,255,.03);transition:all .2s ease;display:flex;align-items:center;gap:.8rem}
        .mrow:hover{background:rgba(232,101,10,.04)}
        .tag{font-size:.55rem;padding:.2rem .5rem;letter-spacing:.08em;text-transform:uppercase;border-radius:2px}
        @media(max-width:900px){.g4{grid-template-columns:1fr 1fr!important}.g2{grid-template-columns:1fr!important}}
      `}</style>

      {/* Navbar */}
      <div style={{background:"linear-gradient(90deg,#0f0704,#080402)",borderBottom:"1px solid rgba(232,101,10,.15)",padding:"0 2rem",display:"flex",alignItems:"center",justifyContent:"space-between",height:64,position:"sticky",top:0,zIndex:100}}>
        <div style={{display:"flex",alignItems:"center",gap:"1.2rem"}}>
          <span style={{fontSize:"1.8rem",filter:"drop-shadow(0 0 10px rgba(232,101,10,.5))"}}>🎩</span>
          <div>
            <div style={{fontFamily:"Georgia,serif",color:"#E8650A",fontSize:"1rem",letterSpacing:".1em"}}>KOMINICTVÍ ŠTĚSTÍ</div>
            <div style={{fontSize:".52rem",color:"rgba(255,255,255,.3)",letterSpacing:".2em",display:"flex",alignItems:"center",gap:".4rem"}}>
              <span className="live"/> LIVE · {time.toLocaleTimeString("cs-CZ")}
            </div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"2rem"}}>
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:".52rem",color:"rgba(255,255,255,.3)",letterSpacing:".12em"}}>ONLINE</div>
            <div style={{fontSize:"1.1rem",fontWeight:700,color:"#22c55e"}}>{visitors}</div>
          </div>
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:".52rem",color:"rgba(255,255,255,.3)",letterSpacing:".12em"}}>UŽIVATEL</div>
            <div style={{fontSize:".8rem",color:"#E8650A",fontWeight:600}}>{loggedUser}</div>
          </div>
          <button onClick={logout} style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",color:"rgba(255,255,255,.4)",padding:".4rem .9rem",cursor:"pointer",fontSize:".65rem",letterSpacing:".1em",transition:"all .2s"}}>
            Odhlásit
          </button>
        </div>
      </div>

      <div style={{padding:"2rem",maxWidth:1400,margin:"0 auto"}}>
        
        {/* Welcome */}
        <div style={{marginBottom:"2rem",animation:"slideIn .4s ease"}}>
          <div style={{fontFamily:"Georgia,serif",fontSize:"1.6rem",color:"white",fontWeight:300}}>
            Dobrý {hour<12?"ráno":hour<18?"den":"večer"}, <span style={{color:"#E8650A"}}>{loggedUser}</span> 👋
          </div>
          <div style={{color:"rgba(255,255,255,.35)",fontSize:".78rem",marginTop:".3rem"}}>
            {new Date().toLocaleDateString("cs-CZ",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}
          </div>
        </div>

        {/* Stats grid */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1rem",marginBottom:"2rem"}} className="g4">
          {[
            {label:"Celkem dotazů",val:stats.total,icon:"💬",color:"#E8650A",sub:"od spuštění",delay:"0s"},
            {label:"Urgentní případy",val:stats.urgent,icon:"🚨",color:"#dc2626",sub:"celkem zachyceno",delay:".1s"},
            {label:"Dotazy dnes",val:stats.today,icon:"📅",color:"#22c55e",sub:new Date().toLocaleDateString("cs-CZ"),delay:".2s"},
            {label:"Urgentní dnes",val:stats.todayUrgent,icon:"⚡",color:"#eab308",sub:"dnes",delay:".3s"},
          ].map((s,i) => (
            <div key={i} className="scard" style={{animationDelay:s.delay}} onMouseEnter={()=>setActiveCard(i)} onMouseLeave={()=>setActiveCard(null)}>
              <div style={{fontSize:"2rem",marginBottom:".8rem"}}>{s.icon}</div>
              <div style={{fontFamily:"Georgia,serif",fontSize:"2.8rem",fontWeight:300,color:s.color,lineHeight:1,transition:"transform .3s ease",transform:activeCard===i?"scale(1.05)":"scale(1)"}}>{s.val}</div>
              <div style={{fontSize:".72rem",color:"rgba(255,255,255,.6)",marginTop:".4rem",letterSpacing:".04em"}}>{s.label}</div>
              <div style={{fontSize:".58rem",color:"rgba(255,255,255,.25)",marginTop:".2rem"}}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:"1.5rem",marginBottom:"1.5rem"}} className="g2">
          
          {/* Hourly chart */}
          <div style={{background:"linear-gradient(145deg,#0f0704,#080502)",border:"1px solid rgba(232,101,10,.12)",padding:"1.8rem",animation:"slideIn .5s .2s ease both"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1.5rem"}}>
              <div style={{fontSize:".65rem",letterSpacing:".2em",color:"rgba(232,101,10,.8)",textTransform:"uppercase"}}>Aktivita podle hodiny</div>
              <div style={{fontSize:".6rem",color:"rgba(255,255,255,.25)"}}>Dnes</div>
            </div>
            <div style={{display:"flex",alignItems:"flex-end",gap:"4px",height:100,paddingBottom:2}}>
              {stats.hourly.map((v,i) => (
                <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-end",gap:3,height:"100%"}}>
                  <div className="bar" style={{
                    width:"100%",
                    height:`${Math.max(2,(v/maxH)*88)}px`,
                    background:i===hour?"linear-gradient(180deg,#FF8C42,#E8650A)":"rgba(232,101,10,.25)",
                    boxShadow:i===hour?"0 0 10px rgba(232,101,10,.5)":"none",
                  }}/>
                  {i%6===0&&<div style={{fontSize:".42rem",color:"rgba(255,255,255,.25)"}}>{i}h</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Topics */}
          <div style={{background:"linear-gradient(145deg,#0f0704,#080502)",border:"1px solid rgba(232,101,10,.12)",padding:"1.8rem",animation:"slideIn .5s .3s ease both"}}>
            <div style={{fontSize:".65rem",letterSpacing:".2em",color:"rgba(232,101,10,.8)",textTransform:"uppercase",marginBottom:"1.5rem"}}>Top témata</div>
            {topTopics.length===0 ? (
              <div style={{color:"rgba(255,255,255,.2)",fontSize:".78rem",textAlign:"center",padding:"2rem 0"}}>Zatím žádná data</div>
            ) : topTopics.map(([topic,count],i) => (
              <div key={i} style={{marginBottom:"1rem"}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:".35rem"}}>
                  <span style={{fontSize:".75rem",color:"rgba(255,255,255,.65)"}}>{topic}</span>
                  <span style={{fontSize:".75rem",color:"#E8650A",fontWeight:600}}>{count}×</span>
                </div>
                <div style={{height:3,background:"rgba(255,255,255,.05)",borderRadius:2}}>
                  <div style={{height:"100%",width:`${(count/(topTopics[0]?.[1]||1))*100}%`,background:"linear-gradient(90deg,#E8650A,#FF8C42)",borderRadius:2,transition:"width .6s ease"}}/>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div style={{background:"linear-gradient(145deg,#0f0704,#080502)",border:"1px solid rgba(232,101,10,.12)",animation:"slideIn .5s .4s ease both"}}>
          <div style={{padding:"1.3rem 1.8rem",borderBottom:"1px solid rgba(232,101,10,.08)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{fontSize:".65rem",letterSpacing:".2em",color:"rgba(232,101,10,.8)",textTransform:"uppercase"}}>Poslední zprávy zákazníků</div>
            <div style={{display:"flex",alignItems:"center",gap:".4rem",fontSize:".6rem",color:"rgba(255,255,255,.25)"}}>
              <span className="live"/> Real-time
            </div>
          </div>
          {stats.lastMessages.length===0 ? (
            <div style={{padding:"3rem",textAlign:"center",color:"rgba(255,255,255,.2)",fontSize:".85rem"}}>
              <div style={{fontSize:"2rem",marginBottom:".5rem"}}>🎩</div>
              Bot čeká na zákazníky...
            </div>
          ) : [...stats.lastMessages].reverse().slice(0,10).map((m,i) => (
            <div key={i} className="mrow">
              <span className={m.urgent?"urg":"live"} style={!m.urgent?{background:"rgba(255,255,255,.15)"}:{}}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:".82rem",color:m.urgent?"#fca5a5":"rgba(255,255,255,.75)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{m.content}</div>
                <div style={{fontSize:".58rem",color:"rgba(255,255,255,.25)",marginTop:".2rem"}}>{m.time}</div>
              </div>
              {m.urgent && <span className="tag" style={{background:"rgba(220,38,38,.12)",border:"1px solid rgba(220,38,38,.25)",color:"#dc2626"}}>Urgentní</span>}
            </div>
          ))}
        </div>

        <div style={{textAlign:"center",marginTop:"1.5rem",color:"rgba(255,255,255,.12)",fontSize:".6rem",letterSpacing:".12em"}}>
          KOMINICTVÍ ŠTĚSTÍ · ADMIN DASHBOARD · {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}
