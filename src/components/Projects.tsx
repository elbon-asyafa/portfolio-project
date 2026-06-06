import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";

const P: { id:number; tag:string; title:string; link?:string; desc:string; detail:string; tech:string[]; imgs:{src:string;l:string;icon:string;bg:string}[] }[] = [
  {id:1,tag:"Network Infrastructure",title:"Multi-Room LAN/WLAN Distribution",desc:"Implemented full LAN/WLAN across 8+ rooms — cable routing, access point installation, and DHCP validation to ensure reliable connectivity at every endpoint.",detail:"Designed cable paths through walls and ceilings, placed APs to eliminate dead zones, and verified the topology with ping tests and DHCP lease inspection on MikroTik.",tech:["MikroTik","Cat5e Cabling","Access Points","DHCP","Winbox"],imgs:[{src:"/images/projects/network/1.webp",l:"AP Setup",icon:"📡",bg:"rgba(74,100,144,0.15)"},{src:"/images/projects/network/2.webp",l:"Cable Routing",icon:"🔌",bg:"rgba(74,100,144,0.10)"},{src:"/images/projects/network/3.webp",l:"Configuration",icon:"⚙️",bg:"rgba(110,136,176,0.12)"}]},
  {id:2,tag:"Winbox & Troubleshooting",title:"Connectivity Fault Resolution",desc:"Structured troubleshooting using Winbox, ping testing, and DHCP checks to identify and resolve live connectivity issues affecting multiple endpoints.",detail:"Layered OSI approach: physical link → DHCP lease → routing table → application layer. Fast root cause isolation to prevent recurrence.",tech:["Winbox","Ping & Tracert","DHCP Debug","MikroTik","OSI Model"],imgs:[{src:"/images/projects/troubleshooting/1.webp",l:"Winbox UI",icon:"🖥️",bg:"rgba(74,100,144,0.15)"},{src:"/images/projects/troubleshooting/2.webp",l:"Ping Test",icon:"⚡",bg:"rgba(74,100,144,0.10)"},{src:"/images/projects/troubleshooting/3.webp",l:"DHCP Check",icon:"🔍",bg:"rgba(110,136,176,0.12)"}]},
  {id:3,tag:"Web Development",title:"Ruz Store — E-Commerce",link:"https://ruzstore.rf.gd",desc:"Built a full online stationery store with a friend (Haeru Rizky) using plain HTML, CSS, and JavaScript. Hosted on InfinityFree.",detail:"Features: live review system via JSONBin, email notifications via Formspree, wishlist drawer, product photos with emoji fallback, loading screen, social media integration.",tech:["HTML","CSS","JavaScript","JSONBin","Formspree","InfinityFree"],imgs:[{src:"/images/projects/web/1.webp",l:"Homepage",icon:"🛒",bg:"rgba(242,224,208,0.35)"},{src:"/images/projects/web/2.webp",l:"Products",icon:"🖊️",bg:"rgba(242,224,208,0.25)"},{src:"/images/projects/web/3.webp",l:"Reviews",icon:"⭐",bg:"rgba(212,184,152,0.25)"}]},
];

type LightboxImg = { src: string; label: string; icon: string; bg: string };

function Lightbox({ img, onClose, onPrev, onNext }: {
  img: LightboxImg; onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", handler);
    // Lock scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = prev;
    };
  }, [onClose, onPrev, onNext]);

  const content = (
    // z-[99999] — above everything
    <div className="fixed inset-0" style={{ zIndex: 99999 }}>

      {/* Layer 1: dark blur backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(0,0,0,0.70)",
          backdropFilter: "blur(16px) saturate(0.6)",
          WebkitBackdropFilter: "blur(16px) saturate(0.6)",
          cursor: "zoom-out",
        }}
        onClick={onClose}
      />

      {/* Layer 2: nav buttons */}
      <button
        onClick={e => { e.stopPropagation(); onPrev(); }}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl flex items-center justify-center text-2xl text-white/80 hover:text-white transition-all hover:scale-110 active:scale-95"
        style={{ background: "rgba(255,255,255,0.13)", border: "1px solid rgba(255,255,255,0.22)", zIndex: 2, cursor: "pointer" }}>
        ‹
      </button>
      <button
        onClick={e => { e.stopPropagation(); onNext(); }}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl flex items-center justify-center text-2xl text-white/80 hover:text-white transition-all hover:scale-110 active:scale-95"
        style={{ background: "rgba(255,255,255,0.13)", border: "1px solid rgba(255,255,255,0.22)", zIndex: 2, cursor: "pointer" }}>
        ›
      </button>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-2xl flex items-center justify-center text-lg text-white/80 hover:text-white transition-all hover:scale-110 active:scale-95"
        style={{ background: "rgba(255,255,255,0.13)", border: "1px solid rgba(255,255,255,0.22)", zIndex: 2, cursor: "pointer" }}>
        ✕
      </button>

      {/* Layer 3: image centred — handles cursor + click-to-close for the surrounding area */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-16 gap-3"
        style={{ zIndex: 2, cursor: "zoom-out" }}
        onClick={onClose}
      >
        {/* image wrapper blocks zoom-out cursor and click propagation */}
        <div
          className="relative rounded-2xl flex items-center justify-center"
          style={{ maxWidth: "88vw", maxHeight: "80vh", background: img.bg, cursor: "default", overflow: "hidden" }}
          onClick={e => e.stopPropagation()}
        >
          <div className="absolute inset-0 flex items-center justify-center text-7xl opacity-20 select-none pointer-events-none">
            {img.icon}
          </div>
          <img
            src={img.src}
            alt={img.label}
            className="relative z-10 max-w-[88vw] max-h-[80vh] w-auto h-auto object-contain block"
            style={{ borderRadius: "1rem", cursor: "default" }}
            onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        </div>
        <span className="font-mono text-xs text-white/60 select-none" onClick={e => e.stopPropagation()}>{img.label}</span>
      </div>
    </div>
  );

  // Portal to <body> so nothing in the DOM tree can clip or stacking-context-trap it
  return createPortal(content, document.body);
}

function ImgGrid({ imgs, title }: { imgs: typeof P[0]["imgs"]; title: string }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const open = useCallback((i: number) => setLightbox(i), []);
  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(() => setLightbox(i => i !== null ? (i - 1 + imgs.length) % imgs.length : null), [imgs.length]);
  const next = useCallback(() => setLightbox(i => i !== null ? (i + 1) % imgs.length : null), [imgs.length]);

  return (
    <>
      <div className="grid grid-cols-2 gap-2.5">
        {/* Main image */}
        <div
          className="col-span-2 img-zoom relative h-72 sm:h-80 rounded-2xl overflow-hidden cursor-zoom-in"
          onClick={() => open(0)}
          style={{borderTop:"1px solid rgba(255,255,255,0.80)",borderLeft:"1px solid rgba(255,255,255,0.48)",borderRight:"1px solid rgba(255,255,255,0.22)",borderBottom:"1px solid rgba(255,255,255,0.10)",boxShadow:"0 4px 16px rgba(74,100,144,0.10)",background:imgs[0].bg}}
        >
          <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-20">{imgs[0].icon}</div>
          <img src={imgs[0].src} alt={`${title}-${imgs[0].l}`} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover z-10" onError={e=>{(e.target as HTMLImageElement).style.display="none";}}/>
          <div className="absolute bottom-0 left-0 right-0 p-3 z-20" style={{background:"linear-gradient(to top,rgba(0,0,0,0.35),transparent)"}}>
            <span className="font-mono text-[9px] text-white/80">{imgs[0].l}</span>
          </div>
          <div className="absolute top-2 right-2 z-20 w-7 h-7 rounded-xl flex items-center justify-center text-xs text-white/80" style={{ background: "rgba(0,0,0,0.30)" }}>🔍</div>
        </div>

        {/* Smaller images */}
        {imgs.slice(1).map((img, i) => (
          <div
            key={i}
            className="img-zoom relative h-44 sm:h-48 rounded-xl overflow-hidden cursor-zoom-in"
            onClick={() => open(i + 1)}
            style={{borderTop:"1px solid rgba(255,255,255,0.75)",borderLeft:"1px solid rgba(255,255,255,0.45)",borderRight:"1px solid rgba(255,255,255,0.20)",borderBottom:"1px solid rgba(255,255,255,0.08)",boxShadow:"0 2px 10px rgba(74,100,144,0.08)",background:img.bg}}
          >
            <div className="absolute inset-0 flex items-center justify-center text-3xl opacity-20">{img.icon}</div>
            <img src={img.src} alt={`${title}-${img.l}`} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover z-10" onError={e=>{(e.target as HTMLImageElement).style.display="none";}}/>
            <div className="absolute bottom-0 left-0 right-0 p-2 z-20" style={{background:"linear-gradient(to top,rgba(0,0,0,0.30),transparent)"}}>
              <span className="font-mono text-[9px] text-white/80">{img.l}</span>
            </div>
            <div className="absolute top-2 right-2 z-20 w-6 h-6 rounded-lg flex items-center justify-center text-[10px] text-white/80" style={{ background: "rgba(0,0,0,0.30)" }}>🔍</div>
          </div>
        ))}
      </div>

      {lightbox !== null && (
        <Lightbox
          img={{ src: imgs[lightbox].src, label: imgs[lightbox].l, icon: imgs[lightbox].icon, bg: imgs[lightbox].bg }}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  );
}

export default function Projects() {
  const ref=useRef<HTMLElement>(null);
  useEffect(()=>{const obs=new IntersectionObserver(e=>{if(e[0].isIntersecting){ref.current?.querySelectorAll(".proj-row").forEach((el,i)=>setTimeout(()=>{(el as HTMLElement).style.opacity="1";(el as HTMLElement).style.transform="translateY(0)";},i*150));obs.disconnect();}},{threshold:0.04});if(ref.current)obs.observe(ref.current);return()=>obs.disconnect();},[]);
  return(
    <section id="projects" ref={ref} className="relative pt-10 pb-24">
      <div className="sp sp-inner">
        <div className="mb-14">
          <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{color:"var(--primary)"}}>Portfolio</p>
          <h2 className="font-display text-3xl sm:text-4xl mb-3" style={{color:"var(--text-1)"}}>My Projects</h2>
          <div className="w-10 h-0.5 rounded-full" style={{background:"linear-gradient(90deg,var(--primary),var(--secondary))"}} />
        </div>
        <div className="space-y-24">
          {P.map((proj,idx)=>{
            const flip=idx%2===1;
            return(
              <div key={proj.id} className={`proj-row grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${flip?"lg:grid-flow-dense":""}`}
                style={{opacity:0,transform:"translateY(28px)",transition:"opacity 0.65s ease,transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94)"}}>
                <div className={`flex flex-col gap-4 ${flip?"lg:col-start-2":""}`}>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs px-3 py-1 rounded-full glass-btn" style={{color:"var(--primary)"}}>{proj.tag}</span>
                    <span className="font-mono text-xs" style={{color:"var(--text-3)"}}>0{proj.id}</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl leading-snug" style={{color:"var(--text-1)"}}>{proj.title}</h3>
                  <p className="leading-relaxed" style={{color:"var(--text-2)"}}>{proj.desc}</p>
                  <div className="pl-4" style={{borderLeft:"2px solid rgba(74,100,144,0.25)"}}>
                    <p className="text-sm italic leading-relaxed" style={{color:"var(--text-3)"}}>{proj.detail}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {proj.tech.map(t=><span key={t} className="text-xs font-mono px-2.5 py-1 rounded-lg glass-btn" style={{color:"var(--text-2)"}}>{t}</span>)}
                  </div>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono self-start glass-btn hover:scale-105 transition-transform"
                      style={{ color:"var(--primary)" }}>
                      🌐 Visit Site <span className="opacity-60 text-xs">↗</span>
                    </a>
                  )}
                </div>
                <div className={flip?"lg:col-start-1 lg:row-start-1":""}><ImgGrid imgs={proj.imgs} title={proj.title}/></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}