import { scrollToTop } from "@/components/ScrollToTop";
import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

/* ── Window contents ── */
function CertContent() {
  return (
    <div className="space-y-3">
      <div className="text-center p-4 rounded-2xl" style={{ background:"rgba(255,255,255,0.22)", border:"1px solid rgba(255,255,255,0.40)" }}>
        <div className="text-3xl mb-2">🎓</div>
        <h3 className="font-display text-sm" style={{ color:"var(--text-1)" }}>Elbon Aminalloh Asyafa Lubis Prasetyo</h3>
        <p className="font-mono text-xs mt-1" style={{ color:"var(--text-3)" }}>SMKS Yaspih Rajeg · TKJ</p>
      </div>
      {[
        { l:"School",    v:"SMKS Yaspih Rajeg" },
        { l:"Major",     v:"Teknik Komputer & Jaringan" },
        { l:"Location",  v:"Rajeg, Banten" },
        { l:"Instagram", v:"@asyworst" },
        { l:"LinkedIn",    v:"elbonaminalloh" },
      ].map(r => (
        <div key={r.l} className="flex justify-between py-1.5" style={{ borderBottom:"1px solid rgba(255,255,255,0.20)" }}>
          <span className="font-mono text-xs" style={{ color:"var(--text-3)" }}>{r.l}</span>
          <span className="text-xs font-medium" style={{ color:"var(--text-1)" }}>{r.v}</span>
        </div>
      ))}
    </div>
  );
}

function PhotosContent() {
  const cats = [
    { label:"Profile", slots:[
      { src:"/images/profile/1.webp", l:"Profile Photo" },
    ]},
    { label:"Network Installation", slots:[
      { src:"/images/projects/network/1.webp", l:"AP Setup" },
      { src:"/images/projects/network/2.webp", l:"Cabling" },
      { src:"/images/projects/network/3.webp", l:"Config" },
    ]},
    { label:"Winbox & Troubleshooting", slots:[
      { src:"/images/projects/troubleshooting/1.webp", l:"Winbox" },
      { src:"/images/projects/troubleshooting/2.webp", l:"Ping Test" },
      { src:"/images/projects/troubleshooting/3.webp", l:"Fault Check" },
    ]},
    { label:"Ruz Stationary Website", slots:[
      { src:"/images/projects/web/1.webp", l:"Homepage" },
      { src:"/images/projects/web/2.webp", l:"Products" },
      { src:"/images/projects/web/3.webp", l:"Reviews" },
    ]},
  ];
  return (
    <div className="space-y-4">
      {cats.map(cat => (
        <div key={cat.label}>
          <p className="font-mono text-[10px] uppercase tracking-widest mb-2" style={{ color:"var(--primary)" }}>{cat.label}</p>
          <div className="grid grid-cols-3 gap-1.5">
            {cat.slots.map((s, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden group img-zoom"
                style={{ background:"rgba(255,255,255,0.22)", border:"1px solid rgba(255,255,255,0.50)" }}>
                <div className="absolute inset-0 flex items-center justify-center text-lg opacity-20">📷</div>
                <img src={s.src} alt={s.l} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover z-10"
                  onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-1.5"
                  style={{ background:"linear-gradient(to top,rgba(0,0,0,0.40),transparent)" }}>
                  <span className="font-mono text-[8px] text-white">{s.l}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function SkillsContent() {
  const skills = [
    { n:"MikroTik / Winbox", v:85 },
    { n:"LAN / WLAN Setup",  v:90 },
    { n:"DHCP Config",       v:88 },
    { n:"Troubleshooting",   v:86 },
    { n:"HTML/CSS/JS",       v:72 },
  ];
  return (
    <div className="space-y-4">
      <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color:"var(--primary)" }}>Skill Overview</p>
      {skills.map(s => (
        <div key={s.n}>
          <div className="flex justify-between mb-1">
            <span className="text-xs" style={{ color:"var(--text-1)" }}>{s.n}</span>
            <span className="font-mono text-[10px]" style={{ color:"var(--primary)" }}>{s.v}%</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background:"rgba(74,100,144,0.15)" }}>
            <div className="h-full rounded-full" style={{ width:`${s.v}%`, background:"linear-gradient(90deg,var(--primary),var(--secondary))" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function ContactContent() {
  const [cp, setCp] = useState(false);
  const links = [
    { icon:"📸", label:"Instagram", val:"@asyworst",        href:"https://instagram.com/asyworst" },
    { icon:"👔", label:"LinkedIn",  val:"elbonaminalloh",        href:"https://www.linkedin.com/in/elbonaminalloh" },
    { icon:"✉️", label:"Email",     val:"elbonaminalloh@gmail.com",href:"mailto:elbonaminalloh@gmail.com" },
  ];
  return (
    <div className="space-y-1">
      {links.map(c => (
        <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-3 p-2.5 rounded-xl transition-all duration-200 group"
          style={{ border:"1px solid transparent" }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.20)")}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
          <span className="text-xl w-8 text-center">{c.icon}</span>
          <div className="flex-1 min-w-0">
            <p className="font-mono text-[10px]" style={{ color:"var(--text-3)" }}>{c.label}</p>
            <p className="text-xs font-medium truncate group-hover:text-[var(--primary)] transition-colors" style={{ color:"var(--text-1)" }}>{c.val}</p>
          </div>
          <span className="text-xs opacity-40">↗</span>
        </a>
      ))}
      <button
        onClick={() => { navigator.clipboard.writeText("elbonaminalloh@gmail.com"); setCp(true); setTimeout(() => setCp(false), 2000); }}
        className="w-full py-2 mt-2 rounded-xl text-xs font-mono transition-all duration-200 active:scale-95"
        style={{
          background:   "rgba(255,255,255,0.20)",
          borderTop:    "1px solid rgba(255,255,255,0.70)",
          borderLeft:   "1px solid rgba(255,255,255,0.42)",
          borderRight:  "1px solid rgba(255,255,255,0.22)",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
          color: "var(--primary)",
        }}>
        {cp ? "✓ Copied!" : "📋 Copy Email"}
      </button>
    </div>
  );
}

/* ── Window definitions — use emoji directly, NOT html entities ── */
const WINDOWS_DEF = [
  { id:"about",   title:"About Elbon", icon:"🎓" },
  { id:"photos",  title:"Gallery",     icon:"📷" },
  { id:"skills",  title:"Skills",      icon:"⚡" },
  { id:"contact", title:"Contact",     icon:"✉️" },
];

const CONTENTS: Record<string, React.ReactNode> = {
  about:   <CertContent />,
  photos:  <PhotosContent />,
  skills:  <SkillsContent />,
  contact: <ContactContent />,
};

interface Win { id:string; title:string; icon:string; visible:boolean; x:number; y:number; z:number; }
let ZZ = 400;

/* ── Draggable window / mobile bottom sheet ── */
function WinPanel({ win, onClose, onFocus }: { win:Win; onClose:(id:string)=>void; onFocus:(id:string)=>void }) {
  const [pos,  setPos]  = useState({ x:win.x, y:win.y });
  const posRef = useRef({ x:win.x, y:win.y });
  const drag   = useRef({ on:false, ox:0, oy:0 });
  const [isTouch, setIsTouch] = useState(false);
  const [sheetOffset, setSheetOffset] = useState(0);
  const sheetDrag = useRef({ on:false, startY:0, offsetY:0 });
  const [isClosing, setIsClosing] = useState(false);
  const closeTimer = useRef<number>();

  useEffect(() => {
    const query = window.matchMedia("(max-width: 640px)");
    const update = () => setIsTouch(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const onBarPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (isTouch || e.button !== 0 || (e.target as HTMLElement).closest("button,a")) return;
    drag.current = { on:true, ox:e.clientX-posRef.current.x, oy:e.clientY-posRef.current.y };
    onFocus(win.id);
    e.currentTarget.setPointerCapture(e.pointerId);
    e.preventDefault();
  }, [win.id, onFocus, isTouch]);

  const onBarPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.on) return;
    const x = e.clientX - drag.current.ox;
    const y = Math.max(0, e.clientY - drag.current.oy);
    posRef.current = { x, y };
    setPos({ x, y });
  };

  const requestClose = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    closeTimer.current = window.setTimeout(() => onClose(win.id), 240);
  }, [isClosing, onClose, win.id]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const onBarPointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.on) return;
    if (e.clientY >= window.innerHeight - 88) requestClose();
    drag.current.on = false;
  };

  const onSheetPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") return;
    sheetDrag.current = { on:true, startY:e.clientY, offsetY:0 };
    e.currentTarget.setPointerCapture(e.pointerId);
    onFocus(win.id);
  };

  const onSheetPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!sheetDrag.current.on) return;
    const offsetY = Math.max(0, e.clientY - sheetDrag.current.startY);
    sheetDrag.current.offsetY = offsetY;
    setSheetOffset(offsetY);
  };

  const onSheetPointerEnd = () => {
    if (!sheetDrag.current.on) return;
    const shouldClose = sheetDrag.current.offsetY > 110;
    sheetDrag.current.on = false;
    setSheetOffset(0);
    if (shouldClose) requestClose();
  };

  const closeFromControl = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    requestClose();
  };

  if (!win.visible) return null;

  const glass: React.CSSProperties = { borderBottom: isTouch ? "none" : undefined };

  if (isTouch) {
    return (
      <div className="glass-pill fixed inset-x-0 bottom-0 z-[600] flex flex-col rounded-t-3xl overflow-hidden select-none"
        style={{ ...glass, maxHeight:"80vh", animation:"sheetUp 0.30s cubic-bezier(0.34,1.2,0.64,1) both", transform:isClosing ? "translateY(100%)" : `translateY(${sheetOffset}px)`, opacity:isClosing ? 0 : 1, transition: isClosing ? "transform 0.24s ease, opacity 0.2s ease" : sheetDrag.current.on ? "none" : "transform 0.2s ease" }}>
        {/* Drag handle */}
        <div className="flex justify-center py-4" style={{ touchAction:"none" }}
          onPointerDown={onSheetPointerDown} onPointerMove={onSheetPointerMove} onPointerUp={onSheetPointerEnd} onPointerCancel={onSheetPointerEnd}>
          <div className="w-10 h-1 rounded-full" style={{ background:"rgba(74,100,144,0.28)" }} />
        </div>
        {/* Title */}
        <div className="flex items-center px-5 pb-3 pt-1" style={{ borderBottom:"1px solid rgba(255,255,255,0.28)" }}>
          <span className="text-lg mr-2">{win.icon}</span>
          <span className="font-medium text-sm flex-1" style={{ color:"var(--text-1)" }}>{win.title}</span>
          <button onPointerDown={e => e.stopPropagation()} onClick={closeFromControl} className="w-10 h-10 rounded-xl flex items-center justify-center text-xl hover:opacity-70 transition-opacity"
            style={{ background:"rgba(255,255,255,0.25)", color:"var(--text-2)" }}>✕</button>
        </div>
        <div className="overflow-y-auto p-4" style={{ WebkitOverflowScrolling:"touch", maxHeight:"65vh" }}>
          {CONTENTS[win.id]}
        </div>
      </div>
    );
  }

  /* Desktop draggable window */
  return (
    <div className="fixed select-none" onMouseDown={() => { if (!isClosing) onFocus(win.id); }}
      style={{ left:pos.x, top:pos.y, zIndex:win.z, width:"clamp(270px,85vw,360px)", animation:isClosing ? "winClose 0.24s ease forwards" : "winPop 0.28s cubic-bezier(0.34,1.4,0.64,1) both" }}>
      <div className="glass-pill rounded-2xl overflow-hidden" style={glass}>
        {/* Traffic lights + title */}
        <div className="window-titlebar flex items-center gap-2 px-4 py-2.5 cursor-grab active:cursor-grabbing"
          style={{ borderBottom:"1px solid rgba(255,255,255,0.28)", background:"rgba(255,255,255,0.10)", touchAction:"none" }}
          onPointerDown={onBarPointerDown}
          onPointerMove={onBarPointerMove}
          onPointerUp={onBarPointerEnd}
          onPointerCancel={onBarPointerEnd}>
          <div className="flex gap-1.5 shrink-0">
            <button onPointerDown={e => e.stopPropagation()} onClick={closeFromControl} className="hidden">
              <span className="opacity-0 group-hover:opacity-100 text-[6px] font-bold text-red-900">✕</span>
            </button>
            <div className="hidden" />
            <div className="hidden" />
          </div>
          <span className="flex-1 text-center text-xs font-medium pointer-events-none truncate" style={{ color:"var(--text-2)" }}>
            {win.icon} {win.title}
          </span>
          <button onPointerDown={e => e.stopPropagation()} onClick={closeFromControl}
            className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center text-base hover:opacity-70 transition-opacity"
            style={{ background:"rgba(255,255,255,0.22)", color:"var(--text-2)" }}>✕</button>
        </div>
        <div className="p-4 overflow-y-auto" style={{ maxHeight:"60vh" }}>
          {CONTENTS[win.id]}
        </div>
      </div>
    </div>
  );
}

/* ── Dock icon ── */
function DockIcon({ icon, title, active, onClick }: { icon:string; title:string; active:boolean; onClick?:()=>void }) {
  const [tip, setTip] = useState(false);
  return (
    <div className="relative flex flex-col items-center">
      {/* Tooltip */}
      <div className="absolute -top-9 left-1/2 pointer-events-none hidden sm:block"
        style={{ transform:`translateX(-50%) translateY(${tip?0:4}px)`, opacity:tip?1:0, transition:"all 0.18s ease" }}>
        <span className="whitespace-nowrap font-mono text-[10px] px-2.5 py-1 rounded-lg block"
          style={{ background:"rgba(30,38,64,0.88)", color:"#fff", border:"1px solid rgba(255,255,255,0.15)" }}>
          {title}
        </span>
      </div>
      <button onClick={onClick}
        onMouseEnter={() => setTip(true)}
        onMouseLeave={() => setTip(false)}
        aria-label={title}
        className="glass-btn w-9 h-9 sm:w-11 sm:h-11 rounded-[12px] flex items-center justify-center text-lg transition-all duration-200 active:scale-95"
        style={{
          backgroundColor: active ? "rgba(74,100,144,0.18)" : undefined,
          boxShadow: active
            ? "0 0 0 2px rgba(74,100,144,0.35), var(--lg-sh-lg), var(--lg-in)"
            : "var(--glass-edge), var(--glass-shadow)",
        }}>
        {icon}
      </button>
      <div className="w-1 h-1 rounded-full mt-1 transition-all duration-200"
        style={{ background: active ? "var(--primary)" : "transparent" }} />
    </div>
  );
}

/* ── Mobile backdrop ── */
function Backdrop({ show, onClick }: { show:boolean; onClick:()=>void }) {
  return (
    <div className="fixed inset-0 z-[399]"
      style={{ background:"rgba(30,38,64,0.28)", opacity:show?1:0, pointerEvents:show?"auto":"none", transition:"opacity 0.22s ease" }}
      onClick={onClick} />
  );
}

/* ── Main ── */
export default function WindowPopups({ inline = false }: { inline?: boolean }) {
  const [wins, setWins] = useState<Win[]>(
    WINDOWS_DEF.map((w, i) => ({ ...w, visible:false, x:60+i*40, y:90+i*30, z:400 }))
  );
  const [show,       setShow]       = useState(false);
  const [isTouch,    setIsTouch]    = useState(false);
  const [dockHidden, setDockHidden] = useState(true);
  const [dockManuallyOpen, setDockManuallyOpen] = useState(false);


  useEffect(() => {
    const query = window.matchMedia("(max-width: 640px)");
    const updatePointer = () => setIsTouch(query.matches);
    updatePointer();
    query.addEventListener("change", updatePointer);
    const t = setTimeout(() => setShow(true), 2600);
    let contentStart = 0;
    const onScroll = () => {
      const pageBottom = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) - window.innerHeight;
      const shouldAutoHide = window.scrollY < contentStart || window.scrollY >= pageBottom - 64;
      setDockHidden(shouldAutoHide && !dockManuallyOpen);
      if (!shouldAutoHide) setDockManuallyOpen(false);
    };
    const measure = () => {
      const content = document.getElementById("portfolio-content");
      contentStart = content ? Math.max(0, content.offsetTop - 100) : Infinity;
      onScroll();
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    const observer = new ResizeObserver(measure);
    const hero = document.getElementById("hero");
    if (hero) observer.observe(hero);
    return () => {
      clearTimeout(t);
      observer.disconnect();
      query.removeEventListener("change", updatePointer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, [dockManuallyOpen]);

  const anyOpen = wins.some(w => w.visible);

  const focus = useCallback((id: string) => {
    ZZ += 1; const z = ZZ;
    setWins(p => p.map(w => w.id === id ? { ...w, z } : w));
  }, []);

  const toggle = useCallback((id: string) => {
    setWins(p => {
      const win = p.find(w => w.id === id);
      if (!win) return p;
      if (!win.visible) {
        ZZ += 1; const z = ZZ;
        // On mobile: close others
        return p.map(w => ({
          ...w,
          visible: w.id === id ? true : (isTouch ? false : w.visible),
          z: w.id === id ? z : w.z,
        }));
      }
      return p.map(w => w.id === id ? { ...w, visible:false } : w);
    });
  }, [isTouch]);

  const close    = useCallback((id: string) => setWins(p => p.map(w => w.id === id ? { ...w, visible:false } : w)), []);
  const closeAll = useCallback(() => setWins(p => p.map(w => ({ ...w, visible:false }))), []);

  return (
    <>
      <style>{`
        @keyframes winPop  { from{opacity:0;transform:scale(0.88) translateY(14px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes winClose { to{opacity:0;transform:scale(0.96) translateY(24px)} }
        @keyframes sheetUp { from{opacity:0;transform:translateY(100%)} to{opacity:1;transform:translateY(0)} }
        @keyframes dockUp  { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      {createPortal(
        <>
          <Backdrop show={isTouch && anyOpen} onClick={closeAll} />
          {wins.map(w => (
            <WinPanel key={w.id} win={w} onClose={close} onFocus={focus} />
          ))}
        </>,
        document.body,
      )}

      <button
        type="button"
        aria-label="Show dock"
        onClick={() => { setDockManuallyOpen(true); setDockHidden(false); }}
        className="dock-reveal glass-btn fixed bottom-3 left-1/2 z-[501] -translate-x-1/2 rounded-full px-3 py-1.5 text-xs tracking-[0.28em]"
        style={{
          opacity: show && dockHidden ? 1 : 0,
          visibility: show && dockHidden ? "visible" : "hidden",
          pointerEvents: show && dockHidden ? "auto" : "none",
          transition: "opacity 0.2s ease, visibility 0s linear 0.2s",
        }}
      >•••</button>

      {/* ── Liquid Glass Dock ── */}
      <div aria-hidden={!show || dockHidden} className={inline ? "portfolio-dock" : "portfolio-dock fixed bottom-1 left-0 right-0 z-[500] flex justify-center pointer-events-none"}
        style={{
          opacity: show && !dockHidden ? 1 : 0,
          visibility: show && !dockHidden ? "visible" : "hidden",
          transform: dockHidden ? "translateY(120px)" : "translateY(0)",
          transition: dockHidden
            ? "transform 0.32s ease, opacity 0.2s ease, visibility 0s linear 0.32s"
            : "transform 0.42s cubic-bezier(0.22,1,0.36,1), opacity 0.25s ease, visibility 0s",
          pointerEvents: !show || dockHidden ? "none" : undefined,
        }}>
        <div className="pointer-events-auto" style={{ position: "relative", isolation: "isolate" }}>
        <div className="glass-pill relative flex items-end gap-1.5 px-3 py-2.5 rounded-[22px]">
          {wins.map(w => (
            <DockIcon key={w.id} icon={w.icon} title={w.title} active={w.visible} onClick={() => toggle(w.id)} />
          ))}

          <div className="w-px h-7 mx-1 self-center rounded-full" style={{ background:"rgba(255,255,255,0.40)" }} />

          {/* Back to top */}
          <DockIcon icon="🚀" title="Back to Top" active={false} onClick={() => scrollToTop()} />
        </div>
        </div>
      </div>

    </>
  );
}
