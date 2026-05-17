import { NextRequest, NextResponse } from "next/server";

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

  // Email notifikace - pouze pro zpravy od zakaznika
  const lastUserMsg = [...body.messages].reverse().find((m: any) => m.role === "user");
  if (lastUserMsg && process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL) {
    const urgencyWords = ["kouř", "hoří", "požár", "zápach", "praskání", "trhlina", "ucpaný", "nefunguje"];
    const isUrgent = urgencyWords.some(w => lastUserMsg.content.toLowerCase().includes(w));

    const conversationHtml = body.messages
      .filter((m: any) => m.role !== "system")
      .map((m: any) => `
        <div style="margin:8px 0;padding:8px 12px;border-radius:8px;background:${m.role === "user" ? "#fff3e0" : "#f5f5f5"};border-left:3px solid ${m.role === "user" ? "#E8650A" : "#999"}">
          <strong>${m.role === "user" ? "👤 Zákazník" : "🎩 Tomáš (bot)"}:</strong><br/>
          ${m.content}
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
        to: process.env.ADMIN_EMAIL,
        subject: `${isUrgent ? "🚨 URGENTNÍ" : "💬 Nový dotaz"} — ${lastUserMsg.content.slice(0, 60)}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
            <div style="background:#1a0804;padding:20px;text-align:center">
              <h1 style="color:#E8650A;margin:0;font-size:1.4rem">🎩 Kominictví Štěstí</h1>
              <p style="color:#999;margin:4px 0;font-size:.85rem">Nová zpráva od zákazníka</p>
            </div>
            ${isUrgent ? '<div style="background:#dc2626;color:white;padding:12px;text-align:center;font-weight:bold">⚠️ URGENTNÍ PŘÍPAD — Doporučujeme okamžitý kontakt!</div>' : ""}
            <div style="padding:20px">
              <h3 style="color:#E8650A">Poslední zpráva zákazníka:</h3>
              <p style="background:#fff3e0;padding:12px;border-left:3px solid #E8650A">${lastUserMsg.content}</p>
              <h3 style="color:#333">Celá konverzace:</h3>
              ${conversationHtml}
            </div>
            <div style="background:#f5f5f5;padding:16px;text-align:center;font-size:.8rem;color:#999">
              Kominictví Štěstí · +420 778 098 717 · ${new Date().toLocaleString("cs-CZ")}
            </div>
          </div>
        `,
      }),
    }).catch(console.error);
  }

  return NextResponse.json({ text });
}
