import { NextRequest, NextResponse } from "next/server";

// ================================================================
// CARA NAMBAH API KEY:
// 1. Buka file .env.local di root folder portfolio
// 2. Isi: GEMINI_API_KEY=AIzaSy...key_kamu
// 3. Save, restart: npm run dev
// Dapat key gratis di: https://aistudio.google.com/app/apikey
// ================================================================
const GEMINI_KEY = process.env.GEMINI_API_KEY || "";

// Simple in-memory rate limiter — max 1 request per 3 seconds
// Prevents double-submit or rapid re-renders hitting API repeatedly
let lastCallTime = 0;
const MIN_INTERVAL_MS = 3000;

const SYS = `You are a helpful AI assistant on Elbon's portfolio website.
About Elbon: Full name Elbon Aminalloh Asyafa Lubis Prasetyo. School: SMKS Yaspih Rajeg, major TKJ (Teknik Komputer & Jaringan / Network Engineering). Location: Pasarkemis, West Java, Indonesia. Skills: MikroTik RouterOS, LAN/WLAN setup, DHCP configuration, Winbox diagnostics, Cat5e/Cat6 cabling, network troubleshooting, HTML/CSS/JavaScript. Projects: 8+ room network installation, connectivity fault resolution, Ruz Stationary e-commerce website (HTML/CSS/JS with JSONBin and Formspree). Experience: Field Technician, Assistant Teacher, Barista, Banquet Crew. Social: Instagram @asyworst, TikTok @asyaffarn.
You can answer ANY question freely. Respond in the same language the user writes in. Keep answers concise (2-4 sentences unless more detail is asked).`;

export async function POST(req: NextRequest) {
  try {
    if (!GEMINI_KEY) {
      return NextResponse.json(
        { error: "API key belum diisi. Buka .env.local dan isi GEMINI_API_KEY, lalu restart server." },
        { status: 503 }
      );
    }

    // Server-side rate limit guard
    const now = Date.now();
    if (now - lastCallTime < MIN_INTERVAL_MS) {
      return NextResponse.json(
        { error: "Terlalu cepat. Tunggu sebentar lalu coba lagi." },
        { status: 429 }
      );
    }
    lastCallTime = now;

    const { messages } = await req.json();

    // gemini-2.0-flash-lite: 30 RPM, 1500 RPD on free tier
    // Much better than gemini-2.0-flash (5 RPM, 20 RPD)
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${GEMINI_KEY}`;

    const history = (messages as { role: string; content: string }[]).map(m => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYS }] },
        contents: history,
        generationConfig: { temperature: 0.8, maxOutputTokens: 512 },
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      const msg = err?.error?.message || `Gemini error ${res.status}`;
      if (res.status === 400) return NextResponse.json({ error: "API key tidak valid. Cek .env.local." }, { status: 400 });
      if (res.status === 429) return NextResponse.json({ error: "Rate limit Gemini tercapai. Tunggu 1 menit lalu coba." }, { status: 429 });
      return NextResponse.json({ error: msg }, { status: res.status });
    }

    const data = await res.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text
      || "Sorry, could not generate a response. Please try again.";

    return NextResponse.json({ reply });
  } catch (e: unknown) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Server error" },
      { status: 500 }
    );
  }
}
