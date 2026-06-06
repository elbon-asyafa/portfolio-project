import { useState, useRef, useEffect } from "react";

interface Msg { role: "user" | "assistant"; content: string; time: string; }

const SUGGESTIONS = [
  "Who is Elbon?",
  "What is MikroTik?",
  "About the network project",
  "How does DHCP work?",
];

function Dots() {
  return (
    <div className="flex gap-1 items-center py-0.5">
      {[0, 1, 2].map(i => (
        <div key={i} className="w-1.5 h-1.5 rounded-full animate-bounce"
          style={{ background: "var(--primary)", opacity: 0.7, animationDelay: `${i * 160}ms`, animationDuration: "0.9s" }} />
      ))}
    </div>
  );
}

export default function AIButton() {
  const [open,    setOpen]    = useState(false);
  const [msgs,    setMsgs]    = useState<Msg[]>([{
    role: "assistant",
    content: "Hi! I'm Elbon's AI assistant. Ask me anything — about Elbon, networking, tech, or any topic!",
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  }]);
  const [input,   setInput]   = useState("");
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);
  const endRef   = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 350);
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, loading]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    setError(null);
    const t = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg: Msg = { role: "user", content: text.trim(), time: t };
    setMsgs(p => [...p, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY;
      if (!GEMINI_KEY) throw new Error("API key belum diisi. Buat file .env.local dan isi VITE_GEMINI_API_KEY");
      
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${GEMINI_KEY}`;
      const history = [...msgs, userMsg].map(m => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

      const sys = `You are a helpful AI assistant on Elbon's portfolio website. 
About Elbon: Full name Elbon Aminalloh Asyafa Lubis Prasetyo. School: SMKS Yaspih Rajeg, major TKJ. Skills: MikroTik RouterOS, LAN/WLAN setup, DHCP. You can answer ANY question freely. Keep answers concise.`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: sys }] },
          contents: history,
          generationConfig: { temperature: 0.8, maxOutputTokens: 512 },
        }),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || `Error ${res.status}`);
      
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, could not generate a response.";
      setMsgs(p => [...p, {
        role: "assistant",
        content: reply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }]);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Connection error");
    } finally {
      setLoading(false);
    }
  };

  // glass styles handled by CSS class glass-pill

  return (
    <>
      {/* ── Chat panel ── */}
      <div
        className="glass-pill fixed z-[7999] flex flex-col rounded-3xl overflow-hidden"
        onWheel={e => e.stopPropagation()}
        onTouchMove={e => e.stopPropagation()}
        style={{
          /* Position: sits above the toggle button */
          bottom: "5.2rem",
          right: "1rem",
          width: "min(90vw, 360px)",
          maxHeight: "min(65vh, 480px)",
          opacity:       open ? 1 : 0,
          transform:     open ? "translateY(0) scale(1)" : "translateY(12px) scale(0.96)",
          pointerEvents: open ? "auto" : "none",
          transition:    "opacity 0.25s ease, transform 0.28s cubic-bezier(0.34,1.4,0.64,1)",
        }}
      >
        {/* Header bar */}
        <div className="flex items-center gap-3 px-4 py-3 shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.28)", background: "rgba(255,255,255,0.10)" }}>
          <div className="relative shrink-0">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-display text-sm"
              style={{ background: "linear-gradient(135deg,var(--primary),var(--secondary))" }}>G</div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400"
              style={{ border: "2.5px solid rgba(255,255,255,0.85)" }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm" style={{ color: "var(--text-1)" }}>AI Assistant</p>
            <p className="font-mono text-[10px] text-green-600">Online &middot; Gemini</p>
          </div>
          <button onClick={() => setOpen(false)} aria-label="Close chat"
            className="w-7 h-7 shrink-0 rounded-xl flex items-center justify-center text-xl leading-none hover:opacity-70 active:scale-90 transition-all"
            style={{ background: "rgba(255,255,255,0.25)", color: "var(--text-2)" }}>
            &times;
          </button>
        </div>

        {/* Message list */}
        <div
          className="flex-1 overflow-y-auto px-3 py-3 space-y-3"
          style={{ WebkitOverflowScrolling: "touch", overscrollBehavior: "contain" }}
          onWheel={e => {
            // Prevent wheel from propagating to the page inertia scroll
            e.stopPropagation();
          }}
        >
          {msgs.map((m, i) => (
            <div key={i} className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              {m.role === "assistant" && (
                <div className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-white text-[10px] mt-0.5"
                  style={{ background: "linear-gradient(135deg,var(--primary),var(--secondary))" }}>G</div>
              )}
              <div className={`flex flex-col gap-0.5 ${m.role === "user" ? "items-end" : "items-start"} max-w-[85%]`}>
                <div className={m.role === "user" ? "bubble-user" : "bubble-ai"}>{m.content}</div>
                <span className="font-mono text-[9px] px-1" style={{ color: "var(--text-3)" }}>{m.time}</span>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-white text-[10px] mt-0.5"
                style={{ background: "linear-gradient(135deg,var(--primary),var(--secondary))" }}>G</div>
              <div className="bubble-ai"><Dots /></div>
            </div>
          )}
          {error && (
            <div className="px-3 py-2 rounded-xl text-xs font-mono"
              style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.22)", color: "#b91c1c" }}>
              {error}
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Suggestion chips */}
        {msgs.length <= 2 && (
          <div className="px-3 pb-2 flex flex-wrap gap-1.5 shrink-0">
            {SUGGESTIONS.map(s => (
              <button key={s} onClick={() => send(s)} disabled={loading}
                className="text-[11px] px-2.5 py-1 rounded-full active:scale-95 transition-all duration-150 disabled:opacity-40"
                style={{
                  background:   "rgba(255,255,255,0.30)",
                  borderTop:    "1px solid rgba(255,255,255,0.80)",
                  borderLeft:   "1px solid rgba(255,255,255,0.50)",
                  borderRight:  "1px solid rgba(255,255,255,0.26)",
                  borderBottom: "1px solid rgba(255,255,255,0.14)",
                  color: "var(--text-2)",
                  fontFamily: "inherit",
                }}>
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input row */}
        <div className="px-3 pb-3 pt-1 shrink-0">
          <div className="flex gap-2 items-center px-3 py-2.5 rounded-xl"
            style={{
              background:   "rgba(255,255,255,0.35)",
              borderTop:    "1px solid rgba(255,255,255,0.85)",
              borderLeft:   "1px solid rgba(255,255,255,0.52)",
              borderRight:  "1px solid rgba(255,255,255,0.28)",
              borderBottom: "1px solid rgba(255,255,255,0.14)",
            }}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
              placeholder="Ask anything..."
              disabled={loading}
              className="flex-1 bg-transparent text-sm outline-none disabled:opacity-50 min-w-0"
              style={{ color: "var(--text-1)", fontFamily: "inherit" }}
            />
            <button
              onClick={() => send(input)}
              disabled={loading || !input.trim()}
              aria-label="Send"
              className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center disabled:opacity-40 active:scale-90 transition-all"
              style={{
                background:   "rgba(74,100,144,0.50)",
                borderTop:    "1px solid rgba(255,255,255,0.70)",
                borderLeft:   "1px solid rgba(255,255,255,0.45)",
                borderRight:  "1px solid rgba(255,255,255,0.22)",
                borderBottom: "1px solid rgba(255,255,255,0.12)",
                boxShadow:    "0 4px 12px rgba(74,100,144,0.25), inset 0 1px 0 rgba(255,255,255,0.50)",
                color:        "white",
              }}>
              <svg className="w-3.5 h-3.5 rotate-90" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-7 7m7-7l7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Floating toggle button ── */}
      <button
        onClick={() => setOpen(p => !p)}
        aria-label={open ? "Close AI" : "Open AI Assistant"}
        className="glass-pill fixed z-[8000] active:scale-95 transition-all duration-[250ms] flex items-center justify-center"
        style={{
          bottom: "1.25rem",
          right:  "1.25rem",
          width:  "48px",
          height: "48px",
          borderRadius: "50%",
          background: open ? "rgba(74,100,144,0.22)" : "var(--lg-bg)",
        }}
      >
        <span className="text-xl leading-none" style={{ color: open ? "var(--primary)" : "var(--primary)" }}>
          {open ? "\u00d7" : "\u2726"}
        </span>
      </button>
    </>
  );
}