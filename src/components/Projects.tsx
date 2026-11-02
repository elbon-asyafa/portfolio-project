import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { copy, useLanguage } from "@/contexts/LanguageContext";

type ProjectVisual = { heading: string; items: { icon: string; label: string; value: string }[] };
type ProjectImage = { src: string; l: string; icon: string; bg: string };

const P: { id:number; tag:string; title:string; link?:string; desc:string; detail:string; tech:string[]; imgs?:ProjectImage[]; visual?:ProjectVisual }[] = [
  {id:1,tag:"Network Infrastructure",title:"Multi-Room LAN/WLAN Distribution",desc:"Implemented full LAN/WLAN across 8+ rooms — cable routing, access point installation, and DHCP validation to ensure reliable connectivity at every endpoint.",detail:"Designed cable paths through walls and ceilings, placed APs to eliminate dead zones, and verified the topology with ping tests and DHCP lease inspection on MikroTik.",tech:["MikroTik","Cat5e Cabling","Access Points","DHCP","Winbox"],imgs:[{src:"/images/projects/network/1.webp",l:"AP Setup",icon:"📡",bg:"rgba(74,100,144,0.15)"},{src:"/images/projects/network/2.webp",l:"Cable Routing",icon:"🔌",bg:"rgba(74,100,144,0.10)"},{src:"/images/projects/network/3.webp",l:"Configuration",icon:"⚙️",bg:"rgba(110,136,176,0.12)"}]},
  {id:2,tag:"Winbox & Troubleshooting",title:"Connectivity Fault Resolution",desc:"Structured troubleshooting using Winbox, ping testing, and DHCP checks to identify and resolve live connectivity issues affecting multiple endpoints.",detail:"Layered OSI approach: physical link → DHCP lease → routing table → application layer. Fast root cause isolation to prevent recurrence.",tech:["Winbox","Ping & Tracert","DHCP Debug","MikroTik","OSI Model"],imgs:[{src:"/images/projects/troubleshooting/1.webp",l:"Winbox UI",icon:"🖥️",bg:"rgba(74,100,144,0.15)"},{src:"/images/projects/troubleshooting/2.webp",l:"Ping Test",icon:"⚡",bg:"rgba(74,100,144,0.10)"},{src:"/images/projects/troubleshooting/3.webp",l:"DHCP Check",icon:"🔍",bg:"rgba(110,136,176,0.12)"}]},
  {id:3,tag:"Independent · 2024–2026 · Web Development",title:"RuzStore — E-Commerce",link:"https://ruzstore.rf.gd",desc:"Co-built and hosted a responsive online stationery store using HTML, CSS, and JavaScript, with product discovery and a WhatsApp-based checkout flow.",detail:"Includes product search and filters, wishlist, shopping cart, checkout through WhatsApp, a live review system, and email notifications.",tech:["HTML","CSS","JavaScript","WhatsApp Checkout","JSONBin","Formspree","InfinityFree"],imgs:[{src:"/images/projects/web/1.webp",l:"Homepage",icon:"🛒",bg:"rgba(242,224,208,0.35)"},{src:"/images/projects/web/2.webp",l:"Products",icon:"🖊️",bg:"rgba(242,224,208,0.25)"},{src:"/images/projects/web/3.webp",l:"Reviews",icon:"⭐",bg:"rgba(212,184,152,0.25)"}]},
  {id:4,tag:"Independent · 2024–2026 · Automation & AI",title:"Automation & Gemini Assistants",desc:"Built a multi-user WhatsApp automation bot and integrated a Gemini-powered interactive assistant into a web project.",detail:"The WhatsApp bot tracks finances and to-dos in Google Sheets, schedules reminders and alarms, processes receipts with AI, downloads media, and accepts natural-language commands. The web project adds a separate Gemini assistant for interactive, natural-language help.",tech:["WhatsApp Automation","Google Sheets","Gemini AI","Receipt Processing","Web Integration","Reminders"],visual:{heading:"Automation + AI",items:[{icon:"🧾",label:"WhatsApp bot",value:"Receipt logged to expenses"},{icon:"✅",label:"Task tracker",value:"Synced with Google Sheets"},{icon:"✦",label:"Gemini web assistant",value:"Interactive natural-language help"}]}},
];

const PROJECTS_ID: Record<number, { tag: string; title: string; desc: string; detail: string }> = {
  1: { tag:"Infrastruktur Jaringan", title:"Distribusi LAN/WLAN Multi-Ruangan", desc:"Membangun jaringan LAN/WLAN di lebih dari 8 ruangan, mencakup penarikan kabel, pemasangan access point, dan validasi DHCP.", detail:"Merancang jalur kabel, menempatkan access point untuk mengurangi area tanpa sinyal, lalu memverifikasi koneksi melalui ping dan pemeriksaan DHCP lease MikroTik." },
  2: { tag:"Winbox & Pemecahan Masalah", title:"Penanganan Gangguan Koneksi", desc:"Melakukan troubleshooting terstruktur dengan Winbox, pengujian ping, dan pemeriksaan DHCP untuk menemukan serta mengatasi gangguan koneksi.", detail:"Mengikuti tahapan OSI: koneksi fisik → DHCP lease → routing → aplikasi. Pemeriksaan berlapis membantu menemukan akar masalah dan mencegah gangguan berulang." },
  3: { tag:"Proyek Mandiri · 2024–2026 · Web", title:"RuzStore — E-Commerce", desc:"Bersama rekan, membangun dan meng-host toko alat tulis responsif dengan HTML, CSS, dan JavaScript, termasuk pencarian produk dan checkout melalui WhatsApp.", detail:"Fitur mencakup pencarian dan filter produk, wishlist, keranjang belanja, checkout WhatsApp, ulasan langsung, dan notifikasi email." },
  4: { tag:"Proyek Mandiri · 2024–2026 · Otomasi & AI", title:"Otomasi & Asisten Gemini", desc:"Membangun bot otomasi WhatsApp multi-user dan mengintegrasikan asisten interaktif berbasis Gemini ke dalam proyek web.", detail:"Bot WhatsApp mencatat keuangan dan to-do ke Google Sheets, mengatur pengingat dan alarm, memproses struk dengan AI, mengunduh media, serta menerima perintah bahasa natural. Proyek web memiliki asisten Gemini terpisah untuk bantuan interaktif." },
};

type LightboxImg = { src: string; label: string; icon: string; bg: string };

function Lightbox({ img, onClose, onPrev, onNext }: {
  img: LightboxImg; onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  const { language } = useLanguage();
  const closeButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeButton.current?.focus();
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") { e.preventDefault(); onPrev(); }
      if (e.key === "ArrowRight") { e.preventDefault(); onNext(); }
      if (e.key === "Tab") {
        const dialog = document.querySelector<HTMLElement>("[data-project-lightbox]");
        const controls = dialog?.querySelectorAll<HTMLElement>("button");
        if (!controls?.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", handler);
    // Lock scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = prev;
      previouslyFocused?.focus();
    };
  }, [onClose, onPrev, onNext]);

  const content = (
    // z-[99999] — above everything
    <div className="fixed inset-0" style={{ zIndex: 99999 }} role="dialog" data-project-lightbox aria-modal="true" aria-label={`${copy(language, "Project image preview", "Pratinjau gambar proyek")}: ${img.label}`}>

      {/* Layer 1: dark scrim keeps the full viewport free of blur */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background: "rgba(0,0,0,0.70)",
          cursor: "zoom-out",
        }}
        onClick={onClose}
      />

      {/* Layer 2: nav buttons */}
      <button
        type="button"
        onClick={e => { e.stopPropagation(); onPrev(); }}
        aria-label={copy(language, "Previous project image", "Gambar proyek sebelumnya")}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl flex items-center justify-center text-2xl text-white/80 hover:text-white transition-all hover:scale-110 active:scale-95"
        style={{ background: "rgba(255,255,255,0.13)", border: "1px solid rgba(255,255,255,0.22)", zIndex: 2, cursor: "pointer" }}>
        ‹
      </button>
      <button
        type="button"
        onClick={e => { e.stopPropagation(); onNext(); }}
        aria-label={copy(language, "Next project image", "Gambar proyek berikutnya")}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-2xl flex items-center justify-center text-2xl text-white/80 hover:text-white transition-all hover:scale-110 active:scale-95"
        style={{ background: "rgba(255,255,255,0.13)", border: "1px solid rgba(255,255,255,0.22)", zIndex: 2, cursor: "pointer" }}>
        ›
      </button>

      {/* Close button */}
      <button
        type="button"
        ref={closeButton}
        onClick={onClose}
        aria-label={copy(language, "Close image preview", "Tutup pratinjau gambar")}
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

function ImgGrid({ imgs, title }: { imgs: ProjectImage[]; title: string }) {
  const { language } = useLanguage();
  const [lightbox, setLightbox] = useState<number | null>(null);
  const open = useCallback((i: number) => setLightbox(i), []);
  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(() => setLightbox(i => i !== null ? (i - 1 + imgs.length) % imgs.length : null), [imgs.length]);
  const next = useCallback(() => setLightbox(i => i !== null ? (i + 1) % imgs.length : null), [imgs.length]);

  return (
    <>
      <div className="grid grid-cols-2 gap-2.5">
        {/* Main image */}
        <button
          type="button"
          className="col-span-2 img-zoom relative h-72 sm:h-80 rounded-2xl overflow-hidden cursor-zoom-in"
          onClick={() => open(0)}
          aria-label={`${copy(language, "View", "Lihat")} ${title}: ${imgs[0].l}`}
          aria-haspopup="dialog"
          style={{ display:"block", width:"100%", padding:0, textAlign:"left", borderTop:"1px solid rgba(255,255,255,0.80)",borderLeft:"1px solid rgba(255,255,255,0.48)",borderRight:"1px solid rgba(255,255,255,0.22)",borderBottom:"1px solid rgba(255,255,255,0.10)",boxShadow:"0 4px 16px rgba(74,100,144,0.10)",background:imgs[0].bg }}
        >
          <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center text-5xl opacity-20">{imgs[0].icon}</span>
          <img src={imgs[0].src} alt="" aria-hidden="true" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover z-10" onError={e=>{(e.target as HTMLImageElement).style.display="none";}}/>
          <span aria-hidden="true" className="absolute bottom-0 left-0 right-0 p-3 z-20" style={{background:"linear-gradient(to top,rgba(0,0,0,0.35),transparent)"}}>
            <span className="font-mono text-[9px] text-white/80">{imgs[0].l}</span>
          </span>
          <span aria-hidden="true" className="absolute top-2 right-2 z-20 w-7 h-7 rounded-xl flex items-center justify-center text-xs text-white/80" style={{ background: "rgba(0,0,0,0.30)" }}>🔍</span>
        </button>

        {/* Smaller images */}
        {imgs.slice(1).map((img, i) => (
          <button
            type="button"
            key={i}
            className="img-zoom relative h-44 sm:h-48 rounded-xl overflow-hidden cursor-zoom-in"
            onClick={() => open(i + 1)}
            aria-label={`${copy(language, "View", "Lihat")} ${title}: ${img.l}`}
            aria-haspopup="dialog"
            style={{display:"block",width:"100%",padding:0,textAlign:"left",borderTop:"1px solid rgba(255,255,255,0.75)",borderLeft:"1px solid rgba(255,255,255,0.45)",borderRight:"1px solid rgba(255,255,255,0.20)",borderBottom:"1px solid rgba(255,255,255,0.08)",boxShadow:"0 2px 10px rgba(74,100,144,0.08)",background:img.bg}}
          >
            <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center text-3xl opacity-20">{img.icon}</span>
            <img src={img.src} alt="" aria-hidden="true" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover z-10" onError={e=>{(e.target as HTMLImageElement).style.display="none";}}/>
            <span aria-hidden="true" className="absolute bottom-0 left-0 right-0 p-2 z-20" style={{background:"linear-gradient(to top,rgba(0,0,0,0.30),transparent)"}}>
              <span className="font-mono text-[9px] text-white/80">{img.l}</span>
            </span>
            <span aria-hidden="true" className="absolute top-2 right-2 z-20 w-6 h-6 rounded-lg flex items-center justify-center text-[10px] text-white/80" style={{ background: "rgba(0,0,0,0.30)" }}>🔍</span>
          </button>
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

function ProjectVisual({ visual }: { visual: ProjectVisual }) {
  const { language } = useLanguage();
  const heading = language === "id" ? "Otomasi + AI" : visual.heading;
  const visualLabels: Record<string, string> = language === "id" ? {
    "WhatsApp bot":"Bot WhatsApp", "Receipt logged to expenses":"Struk dicatat sebagai pengeluaran",
    "Task tracker":"Pelacak tugas", "Synced with Google Sheets":"Tersinkron ke Google Sheets",
    "Gemini web assistant":"Asisten Gemini di web", "Interactive natural-language help":"Bantuan interaktif dengan bahasa alami",
  } : {};
  return (
    <div className="relative flex min-h-[390px] items-center justify-center overflow-hidden rounded-[2rem] p-6 sm:min-h-[450px]"
      style={{ background:"linear-gradient(145deg,rgba(74,100,144,.14),rgba(255,255,255,.50) 52%,rgba(200,152,120,.16))", border:"1px solid rgba(255,255,255,.72)", boxShadow:"0 12px 40px rgba(74,100,144,.12), inset 0 1px 0 rgba(255,255,255,.8)" }}>
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full blur-2xl" style={{ background:"rgba(110,136,176,.16)" }} />
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white/80 p-5 shadow-xl shadow-slate-900/10 backdrop-blur-sm sm:p-7">
        <div className="mb-6 flex items-center justify-between border-b border-slate-200/80 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-lg text-blue-700">✦</span>
            <div>
              <p className="text-sm font-semibold text-slate-800">{heading}</p>
              <p className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-slate-400">{copy(language, "Independent project", "Proyek mandiri")}</p>
            </div>
          </div>
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,.13)]" />
        </div>
        <div className="space-y-3">
          {visual.items.map(item => (
            <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white/85 p-3.5 sm:p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-base">{item.icon}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-slate-700">{visualLabels[item.label] ?? item.label}</p>
                <p className="mt-1 truncate text-[10px] text-slate-400">{visualLabels[item.value] ?? item.value}</p>
              </div>
              <span className="text-xs text-slate-300" aria-hidden="true">↗</span>
            </div>
          ))}
        </div>
        <p className="mt-5 text-center font-mono text-[9px] uppercase tracking-[.2em] text-slate-400">{copy(language, "Concept preview · project features", "Ilustrasi fitur proyek")}</p>
      </div>
    </div>
  );
}

export default function Projects() {
  const { language } = useLanguage();
  const ref=useRef<HTMLElement>(null);
  useEffect(()=>{const obs=new IntersectionObserver(e=>{if(e[0].isIntersecting){ref.current?.querySelectorAll(".proj-row").forEach((el,i)=>setTimeout(()=>{(el as HTMLElement).style.opacity="1";(el as HTMLElement).style.transform="translateY(0)";},i*150));obs.disconnect();}},{threshold:0.04});if(ref.current)obs.observe(ref.current);return()=>obs.disconnect();},[]);
  return(
    <section id="projects" ref={ref} className="relative pt-10 pb-24">
      <div className="sp sp-inner">
        <div className="mb-14">
          <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{color:"var(--primary)"}}>{copy(language, "Portfolio", "Portofolio")}</p>
          <h2 className="font-display text-3xl sm:text-4xl mb-3" style={{color:"var(--text-1)"}}>{copy(language, "My Projects & Independent Builds", "Proyek & Karya Mandiri")}</h2>
          <div className="w-10 h-0.5 rounded-full" style={{background:"linear-gradient(90deg,var(--primary),var(--secondary))"}} />
        </div>
        <div className="space-y-24">
          {P.map((proj,idx)=>{
            const flip=idx%2===1;
            const content = language === "id" ? PROJECTS_ID[proj.id] : proj;
            const images = proj.imgs?.map(image => ({ ...image, l: language === "id" ? ({ "AP Setup":"Pemasangan AP", "Cable Routing":"Jalur Kabel", "Configuration":"Konfigurasi", "Winbox UI":"Tampilan Winbox", "Ping Test":"Uji Ping", "DHCP Check":"Pemeriksaan DHCP", "Homepage":"Beranda", "Products":"Produk", "Reviews":"Ulasan" } as Record<string,string>)[image.l] ?? image.l : image.l }));
            return(
              <div key={proj.id} className={`proj-row grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${flip?"lg:grid-flow-dense":""}`}
                style={{opacity:0,transform:"translateY(28px)",transition:"opacity 0.65s ease,transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94)"}}>
                <div className={`flex flex-col gap-4 ${flip?"lg:col-start-2":""}`}>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs px-3 py-1 rounded-full glass-btn" style={{color:"var(--primary)"}}>{content.tag}</span>
                    <span className="font-mono text-xs" style={{color:"var(--text-3)"}}>0{proj.id}</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl leading-snug" style={{color:"var(--text-1)"}}>{content.title}</h3>
                  <p className="leading-relaxed" style={{color:"var(--text-2)"}}>{content.desc}</p>
                  <div className="pl-4" style={{borderLeft:"2px solid rgba(74,100,144,0.25)"}}>
                    <p className="text-sm italic leading-relaxed" style={{color:"var(--text-3)"}}>{content.detail}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {proj.tech.map(t=><span key={t} className="text-xs font-mono px-2.5 py-1 rounded-lg glass-btn" style={{color:"var(--text-2)"}}>{t}</span>)}
                  </div>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono self-start glass-btn hover:scale-105 transition-transform"
                      style={{ color:"var(--primary)" }}>
                      🌐 {copy(language, "Visit site", "Kunjungi situs")} <span className="opacity-60 text-xs">↗</span>
                    </a>
                  )}
                </div>
                <div className={flip?"lg:col-start-1 lg:row-start-1":""}>
                  {images ? <ImgGrid imgs={images} title={content.title} /> : proj.visual ? <ProjectVisual visual={proj.visual} /> : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
