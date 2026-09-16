import { useRef } from "react";


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
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5"
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

export function GalleryStrip() {
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
  return (
    <section id="hero" className="hero-section">
      <div className="sp sp-inner hero-layout">
        <div className="hero-copy">
          <h1 className="hero-name font-display"><span>Elbon</span><span>Asyafa</span></h1>
          <p className="hero-description">Network Technician &amp; Problem Solver</p>
          <p className="hero-location">Based in Indonesia. Building connections that work.</p>
          <div className="hero-actions">
            <a href="#projects" className="glass-btn-primary rounded-full px-5 py-3 text-sm">View projects</a>
            <a href="/cv/Resume_Elbon_Aminalloh.pdf" download="Resume_Elbon_Aminalloh.pdf" className="glass-btn rounded-full px-5 py-3 text-sm">Download resume</a>
          </div>
        </div>
        <figure className="hero-portrait">
          <img src="/images/profile/hero-ascii.png" alt="Elbon Asyafa dengan separuh kiri potret bergaya ASCII biru dan putih" width="1086" height="1448" decoding="async" fetchPriority="high" />
        </figure>
      </div>
      <a className="hero-scroll-cue" href="#portfolio-content">Explore the portfolio <span aria-hidden="true">↓</span></a>
    </section>
  );
}
