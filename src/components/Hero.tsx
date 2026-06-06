import { scrollToTop } from "@/components/ScrollToTop";
import { useEffect, useRef, useState } from "react";

function LiveClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-US", { hour12:false, hour:"2-digit", minute:"2-digit", second:"2-digit" }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="font-mono text-xs" style={{ color:"var(--text-3)" }}>LOCAL &middot; {time}</span>;
}

function PhotoSlot({ src, label, icon, className, style }: {
  src:string; label:string; icon:string; className?:string; style?:React.CSSProperties;
}) {
  return (
    <div className={`relative group rounded-2xl overflow-hidden ${className ?? ""}`}
      style={{
        borderTop:    "1px solid rgba(255,255,255,0.82)",
        borderLeft:   "1px solid rgba(255,255,255,0.52)",
        borderRight:  "1px solid rgba(255,255,255,0.24)",
        borderBottom: "1px solid rgba(255,255,255,0.12)",
        boxShadow:    "0 4px 16px rgba(74,100,144,0.12), inset 0 1px 0 rgba(255,255,255,0.82)",
        background:   "rgba(255,255,255,0.20)",
        ...style,
      }}>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 backdrop-blur-[2px]"
        style={{ background:"rgba(242,224,208,0.22)" }}>
        <span className="text-2xl opacity-50">{icon}</span>
        <span className="font-mono text-[9px] text-center px-2" style={{ color:"var(--text-3)" }}>{label}</span>
      </div>
      <img src={src} alt={label} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover z-10"
        onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
      <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2"
        style={{ background:"linear-gradient(to top,rgba(0,0,0,0.35),transparent)" }}>
        <span className="font-mono text-[9px] text-white">{label}</span>
      </div>
    </div>
  );
}

const ALL_PHOTOS = [
  { src:"/images/profile/1.webp",                  label:"Profile 1",  icon:"👤" },
  { src:"/images/profile/2.webp",                  label:"Profile 2",  icon:"👤" },
  { src:"/images/projects/network/1.webp",         label:"Network 1",  icon:"📡" },
  { src:"/images/projects/network/2.webp",         label:"Network 2",  icon:"📡" },
  { src:"/images/projects/troubleshooting/1.webp", label:"Debug 1",    icon:"🖥️" },
  { src:"/images/projects/troubleshooting/2.webp", label:"Debug 2",    icon:"🖥️" },
  { src:"/images/projects/web/1.webp",             label:"Ruz Store 1",icon:"🛒" },
  { src:"/images/projects/web/2.webp",             label:"Ruz Store 2",icon:"🛒" },
];

const MOBILE_PHOTOS = [
  { src:"/images/profile/1.webp",                  label:"Profile 1",  icon:"👤" },
  { src:"/images/profile/2.webp",                  label:"Profile 2",  icon:"👤" },
  { src:"/images/profile/3.webp",                  label:"Profile 3",  icon:"👤" },
  { src:"/images/projects/network/1.webp",         label:"Network 1",  icon:"📡" },
  { src:"/images/projects/network/2.webp",         label:"Network 2",  icon:"📡" },
  { src:"/images/projects/network/3.webp",         label:"Network 3",  icon:"📡" },
  { src:"/images/projects/troubleshooting/1.webp", label:"Debug 1",    icon:"🖥️" },
  { src:"/images/projects/troubleshooting/2.webp", label:"Debug 2",    icon:"🖥️" },
  { src:"/images/projects/troubleshooting/3.webp", label:"Debug 3",    icon:"🖥️" },
  { src:"/images/projects/web/1.webp",             label:"Ruz Store 1",icon:"🛒" },
  { src:"/images/projects/web/2.webp",             label:"Ruz Store 2",icon:"🛒" },
  { src:"/images/projects/web/3.webp",             label:"Ruz Store 3",icon:"🛒" },
];

function GalleryStrip() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className="relative">
      {/* Desktop: static grid */}
      <div className="hidden sm:grid gap-3" style={{ gridTemplateColumns:`repeat(${ALL_PHOTOS.length}, 1fr)` }}>
        {ALL_PHOTOS.map(p => (
          <PhotoSlot key={p.label} {...p} style={{ height:130 }} />
        ))}
      </div>
      {/* Mobile: swipe */}
      <div ref={ref} className="flex sm:hidden gap-3 overflow-x-auto pb-1"
        style={{ scrollbarWidth:"none", WebkitOverflowScrolling:"touch" } as React.CSSProperties}>
        {MOBILE_PHOTOS.map(p => (
          <PhotoSlot key={p.label} {...p} className="flex-shrink-0" style={{ width:140, height:90 }} />
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToTop();
    const items = ref.current?.querySelectorAll(".h-in");
    items?.forEach((el, i) => {
      const e = el as HTMLElement;
      e.style.animationDelay = `${i * 110 + 2100}ms`;
      e.style.animationFillMode = "both";
      e.classList.add("anim-fade-up");
    });
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center pt-16 pb-10 overflow-hidden">
      <div ref={ref} className="sp sp-inner flex flex-col gap-4">

        <div className="h-in opacity-0 flex items-center gap-4 text-xs" style={{ color:"var(--text-3)" }}>
          <span className="font-mono uppercase tracking-widest">Based in Indonesia</span>
          <span style={{ opacity:0.4 }}>|</span>
          <LiveClock />
        </div>

        <h1 className="flex flex-col">
          <span className="h-in opacity-0 overflow-hidden font-display leading-[0.90] tracking-tight uppercase"
            style={{ fontSize:"clamp(3.5rem,13vw,10rem)", color:"var(--text-1)" }}>
            ELBON
          </span>
          <span className="h-in opacity-0 overflow-hidden font-display leading-[0.90] tracking-tight uppercase mt-1"
            style={{ fontSize:"clamp(2.2rem,8.5vw,6.5rem)", WebkitTextStroke:"2px var(--text-1)", color:"transparent" }}>
            AMINALLOH
          </span>
        </h1>

        <div className="h-in opacity-0 mt-1">
          <p className="text-base sm:text-lg leading-relaxed" style={{ color:"var(--text-2)" }}>
            Network Technician &middot; Problem Solver
          </p>
          <p className="text-sm mt-0.5" style={{ color:"var(--text-3)" }}>SMKS Yaspih Rajeg &mdash; TKJ</p>
        </div>

        <div className="h-in opacity-0 flex flex-wrap gap-3 mt-1">
          <button onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior:"smooth" })}
            className="glass-btn-primary px-6 py-3 rounded-xl text-sm font-medium">
            View Projects &rarr;
          </button>
          <button onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior:"smooth" })}
            className="glass-btn px-6 py-3 rounded-xl text-sm font-medium"
            style={{ color:"var(--text-2)" }}>
            Get in Touch
          </button>
          <div className="md:hidden inline-flex items-center gap-1.5 px-3 py-2 rounded-xl"
            style={{ background:"rgba(107,196,107,0.18)", border:"1px solid rgba(107,196,107,0.35)" }}>
            <span className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background:"#4ade80" }} />
            <span className="text-xs font-medium" style={{ color:"#2d7d2d" }}>Available</span>
          </div>
        </div>

        <div className="h-in opacity-0 flex flex-wrap gap-2 -mt-1">
          <a href="/cv/CV_ATS_Elbon_Aminalloh.pdf" download="CV_ATS_Elbon_Aminalloh.pdf"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "rgba(255,255,255,0.18)", backdropFilter:"blur(10px)", WebkitBackdropFilter:"blur(10px)",
              borderTop:"1px solid rgba(255,255,255,0.75)", borderLeft:"1px solid rgba(255,255,255,0.45)",
              borderRight:"1px solid rgba(255,255,255,0.22)", borderBottom:"1px solid rgba(255,255,255,0.10)",
              boxShadow:"0 4px 14px rgba(74,100,144,0.12), inset 0 1px 0 rgba(255,255,255,0.80)",
              color:"var(--text-2)",
            }}>
            <span>📄</span> Get in Touch (Resume)
          </a>
        </div>

        <div className="h-in opacity-0 flex gap-8 pt-4 mt-1"
          style={{ borderTop:"1px solid rgba(255,255,255,0.28)" }}>
          {[{ v:"8+", l:"Rooms networked" },{ v:"3+", l:"Years experience" },{ v:"50+", l:"Issues resolved" }].map(s => (
            <div key={s.l} className="flex flex-col gap-0.5 group cursor-default">
              <span className="font-display text-2xl gradient-text group-hover:scale-110 transition-transform duration-200 inline-block origin-left">{s.v}</span>
              <span className="text-xs font-mono" style={{ color:"var(--text-3)" }}>{s.l}</span>
            </div>
          ))}
        </div>

        <div className="h-in opacity-0 mt-4">
          <p className="font-mono text-[10px] uppercase tracking-widest mb-3" style={{ color:"var(--text-3)" }}>Gallery</p>
          <GalleryStrip />
        </div>

      </div>
    </section>
  );
}