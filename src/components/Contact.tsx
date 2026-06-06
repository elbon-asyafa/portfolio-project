import { useEffect, useRef, useState } from "react";

const LINKS = [
  { icon:"📸", label:"Instagram", val:"@asyworst",                        href:"https://instagram.com/asyworst",                              tint:"rgba(240,80,100,0.25)" },
  { icon:"👔", label:"LinkedIn",  val:"Elbon Aminalloh",   href:"https://www.linkedin.com/in/elbonaminalloh",                   tint:"rgba(74,100,144,0.25)" },
  { icon:"✉️", label:"Email",     val:"elbonaminalloh@gmail.com",         href:"mailto:elbonaminalloh@gmail.com",                             tint:"rgba(242,224,208,0.35)" },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [cp, setCp] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        ref.current?.querySelectorAll(".reveal").forEach((el,i) => setTimeout(()=>el.classList.add("in"), i*100));
        obs.disconnect();
      }
    }, { threshold:0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="contact" ref={ref} className="relative py-24">
      <div className="sp sp-inner">
        <div className="max-w-2xl mx-auto text-center">
          <div className="reveal mb-10">
            <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color:"var(--primary)" }}>Let&apos;s Connect</p>
            <h2 className="font-display leading-tight mb-4" style={{ fontSize:"clamp(1.8rem,5vw,3rem)", color:"var(--text-1)" }}>
              Have a network problem?{" "}
              <span className="gradient-text">I&apos;ve got it.</span>
            </h2>
            <p className="leading-relaxed" style={{ color:"var(--text-2)" }}>
              Need a full network setup, troubleshooting support, or just want to talk infrastructure — I&apos;m ready.
            </p>
          </div>

          <div className="reveal grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {LINKS.map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                className="glass-card group flex flex-col items-center gap-3 p-6 rounded-2xl">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300"
                  style={{ background:l.tint, borderTop:"1px solid rgba(255,255,255,0.70)", borderLeft:"1px solid rgba(255,255,255,0.45)", borderRight:"1px solid rgba(255,255,255,0.22)", borderBottom:"1px solid rgba(255,255,255,0.12)", boxShadow:"inset 0 1px 0 rgba(255,255,255,0.65)" }}>
                  {l.icon}
                </div>
                <div>
                  <p className="font-medium text-sm" style={{ color:"var(--text-1)" }}>{l.label}</p>
                  <p className="font-mono text-xs" style={{ color:"var(--text-3)" }}>{l.val}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="reveal flex flex-col items-center gap-4">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => { navigator.clipboard.writeText("elbonaminalloh@gmail.com"); setCp(true); setTimeout(()=>setCp(false),2000); }}
                className="glass-btn inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono"
                style={{ color:"var(--text-2)" }}>
                {cp ? "✓ Copied!" : "📋 Copy email"}
              </button>
              <a
                href="mailto:elbonaminalloh@gmail.com"
                className="glass-btn inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono"
                style={{ color:"var(--text-2)" }}>
                ✉️ Send email
              </a>
            </div>
            {/* CV Download */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <a
                href="/cv/Resume_Elbon_Aminalloh.pdf"
                download="Resume_Elbon_Aminalloh.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-mono transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background:   "rgba(255,255,255,0.18)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  borderTop:    "1px solid rgba(255,255,255,0.75)",
                  borderLeft:   "1px solid rgba(255,255,255,0.45)",
                  borderRight:  "1px solid rgba(255,255,255,0.22)",
                  borderBottom: "1px solid rgba(255,255,255,0.10)",
                  boxShadow:    "0 4px 14px rgba(74,100,144,0.12), inset 0 1px 0 rgba(255,255,255,0.80)",
                  color: "var(--text-2)",
                }}>
                <span>📄</span> Get in Touch (Resume)
              </a>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{ background:"rgba(107,196,107,0.15)", border:"1px solid rgba(107,196,107,0.30)" }}>
              <span className="w-2 h-2 rounded-full pulse-dot" style={{ background:"#6bc46b" }} />
              <span className="text-xs" style={{ color:"#4a9e4a" }}>Available for new projects</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}