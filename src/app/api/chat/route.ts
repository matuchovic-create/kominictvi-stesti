import { NextRequest, NextResponse } from "next/server";

// In-memory counter (reset pri restartu - pro produkci pouzit KV)
const stats = {
  total: 0,
  urgent: 0,
  topics: {} as Record<string, number>,
  lastReset: new Date().toISOString(),
};

const URGENT_WORDS = ["kouř","hoří","požár","zápach","praskání","trhlina","ucpaný","nefunguje"];
const TOPIC_KEYWORDS: Record<string, string[]> = {
  "Čištění": ["čistit","čištění","saze","deht"],
  "Revize": ["revize","revizní","zpráva","doklad"],
  "Cena": ["cena","kolik","cenník","kolik stojí"],
  "Termín": ["termín","kdy","výjezd","přijet"],
  "Vložkování": ["vložka","vložkování","flexi"],
  "Pohotovost": ["havarijní","urgentní","okamžitě","ihned"],
};

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Groq chat
  const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: body.messages,
      max_tokens: 300,
      temperature: 0.7,
    }),
  });

  const groqData = await groqRes.json();
  const text = groqData.choices?.[0]?.message?.content || "Omlouvám se, zkuste to znovu.";

  const lastUserMsg = [...body.messages].reverse().find((m: any) => m.role === "user");

  if (lastUserMsg) {
    const msgLower = lastUserMsg.content.toLowerCase();
    const isUrgent = URGENT_WORDS.some(w => msgLower.includes(w));

    // Update stats
    stats.total++;
    if (isUrgent) stats.urgent++;
    Object.entries(TOPIC_KEYWORDS).forEach(([topic, keywords]) => {
      if (keywords.some(k => msgLower.includes(k))) {
        stats.topics[topic] = (stats.topics[topic] || 0) + 1;
      }
    });

    // Email notifikace
    if (process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL) {
      const conversationHtml = body.messages
        .filter((m: any) => m.role !== "system")
        .map((m: any) => `
          <div style="margin:8px 0;padding:8px 12px;border-radius:8px;background:${m.role === "user" ? "#fff3e0" : "#f5f5f5"};border-left:3px solid ${m.role === "user" ? "#E8650A" : "#999"}">
            <strong>${m.role === "user" ? "👤 Zákazník" : "🎩 Tomáš (bot)"}:</strong><br/>${m.content}
          </div>
        `).join("");

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Kominictví Štěstí Bot <onboarding@resend.dev>",
          to: [process.env.ADMIN_EMAIL, process.env.ADMIN_EMAIL_2].filter(Boolean) as string[],
          subject: `${isUrgent ? "🚨 URGENTNÍ" : "💬 Nový dotaz"} — ${lastUserMsg.content.slice(0, 60)}`,
          html: `
            <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
              <div style="background:#1a0804;padding:20px;text-align:center">
                <h1 style="color:#E8650A;margin:0;font-size:1.4rem">🎩 Kominictví Štěstí</h1>
                <p style="color:#999;margin:4px 0;font-size:.85rem">Nová zpráva od zákazníka</p>
              </div>
              ${isUrgent ? '<div style="background:#dc2626;color:white;padding:12px;text-align:center;font-weight:bold">⚠️ URGENTNÍ PŘÍPAD!</div>' : ""}
              <div style="padding:20px">
                <h3 style="color:#E8650A">Poslední zpráva:</h3>
                <p style="background:#fff3e0;padding:12px;border-left:3px solid #E8650A">${lastUserMsg.content}</p>
                <h3>Celá konverzace:</h3>
                ${conversationHtml}
                <hr/>
                <p style="color:#999;font-size:.8rem">📊 Statistiky dnes: ${stats.total} dotazů, ${stats.urgent} urgentních</p>
              </div>
              <div style="background:#f5f5f5;padding:16px;text-align:center;font-size:.8rem;color:#999">
                Kominictví Štěstí · +420 778 098 717 · ${new Date().toLocaleString("cs-CZ")}
              </div>
            </div>
          `,
        }),
      }).catch(console.error);
    }

    // SMS notifikace
    if (process.env.VONAGE_API_KEY && process.env.VONAGE_API_SECRET && process.env.ADMIN_PHONE) {
      const smsText = `${isUrgent ? "URGENTNI! " : ""}Bot: ${lastUserMsg.content.slice(0, 120)}`;
      const params = new URLSearchParams({
        api_key: process.env.VONAGE_API_KEY,
        api_secret: process.env.VONAGE_API_SECRET,
        to: process.env.ADMIN_PHONE,
        from: "KomStesti",
        text: smsText,
      });
      await fetch(`https://rest.nexmo.com/sms/json?${params.toString()}`).catch(console.error);
    }
  }

  return NextResponse.json({ text });
}

// Weekly report endpoint - volat pres cron
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const topTopics = Object.entries(stats.topics)
    .sort(([,a],[,b]) => b - a)
    .slice(0, 5)
    .map(([topic, count]) => `<li>${topic}: <strong>${count}x</strong></li>`)
    .join("");

  if (process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL && stats.total > 0) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Kominictví Štěstí Report <onboarding@resend.dev>",
        to: [process.env.ADMIN_EMAIL, process.env.ADMIN_EMAIL_2].filter(Boolean) as string[],
        subject: `📊 Týdenní report bota — ${stats.total} dotazů`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
            <div style="background:#1a0804;padding:24px;text-align:center">
              <h1 style="color:#E8650A;margin:0">📊 Týdenní report</h1>
              <p style="color:#999;margin:4px 0">Kominictví Štěstí — AI Bot</p>
            </div>
            <div style="padding:24px">
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:24px">
                <div style="background:#fff3e0;padding:16px;border-radius:8px;text-align:center">
                  <div style="font-size:2rem;font-weight:bold;color:#E8650A">${stats.total}</div>
                  <div style="color:#666;font-size:.85rem">Celkem dotazů</div>
                </div>
                <div style="background:#fee2e2;padding:16px;border-radius:8px;text-align:center">
                  <div style="font-size:2rem;font-weight:bold;color:#dc2626">${stats.urgent}</div>
                  <div style="color:#666;font-size:.85rem">Urgentních případů</div>
                </div>
              </div>
              <h3 style="color:#E8650A">Nejčastější témata:</h3>
              <ul style="color:#333;line-height:2">${topTopics || "<li>Žádná data</li>"}</ul>
              <p style="color:#999;font-size:.8rem">Období: od ${new Date(stats.lastReset).toLocaleDateString("cs-CZ")} do ${new Date().toLocaleDateString("cs-CZ")}</p>
            </div>
          </div>
        `,
      }),
    }).catch(console.error);

    // Reset stats
    stats.total = 0;
    stats.urgent = 0;
    stats.topics = {};
    stats.lastReset = new Date().toISOString();
  }

  return NextResponse.json({ sent: true, stats });
}
