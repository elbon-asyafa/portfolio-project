import { scrollToTop } from "@/components/ScrollToTop";
import { useState, useEffect } from "react";

const NAV = [
  { label:"About",      href:"#about" },
  { label:"Projects",   href:"#projects" },
  { label:"Experience", href:"#experience" },
  { label:"Skills",     href:"#skills" },
  { label:"Contact",    href:"#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active,   setActive]   = useState("");
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(`#${e.target.id}`); }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV.forEach(({ href }) => { const el = document.querySelector(href); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const go = (href: string) => {
    const was = open; setOpen(false);
    setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior:"smooth" }), was ? 300 : 0);
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none">
        <div
          className="pointer-events-auto mt-3 w-[calc(100%-1.5rem)] sm:w-[calc(100%-4rem)] max-w-2xl
                     flex items-center justify-between px-4 py-2 rounded-2xl transition-all duration-500"
          style={{
            background: scrolled ? "rgba(255,255,255,0.58)" : "rgba(255,255,255,0.48)",
            backdropFilter:        "blur(28px) saturate(2.0) brightness(1.12)",
            WebkitBackdropFilter:  "blur(28px) saturate(2.0) brightness(1.12)",
            borderTop:    "1px solid rgba(255,255,255,0.98)",
            borderLeft:   "1px solid rgba(255,255,255,0.68)",
            borderRight:  "1px solid rgba(255,255,255,0.38)",
            borderBottom: "1px solid rgba(255,255,255,0.22)",
            boxShadow: scrolled
              ? "0 12px 48px rgba(74,100,144,0.20), 0 4px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,1.0), inset 0 -1px 0 rgba(255,255,255,0.35)"
              : "0 8px 32px rgba(74,100,144,0.12), 0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,1.0)",
          }}
        >
          {/* Logo */}
          <button onClick={() => scrollToTop()}
            className="font-display text-lg leading-none shrink-0 hover:opacity-70 transition-opacity"
            style={{ color:"var(--primary)" }}>
            Elbon<span style={{ color:"var(--accent)" }}>.</span>
          </button>

          {/* Desktop nav — centered */}
          <nav className="hidden md:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
            {NAV.map(({ label, href }) => {
              const on = active === href;
              return (
                <button key={href} onClick={() => go(href)}
                  className="relative px-3 py-1.5 text-[13px] font-medium rounded-xl transition-all duration-200"
                  style={{ color: on ? "var(--primary)" : "var(--text-2)" }}>
                  <span className="absolute inset-0 rounded-xl transition-all duration-200"
                    style={{
                      background: on ? "rgba(74,100,144,0.14)" : "transparent",
                      borderTop:  on ? "1px solid rgba(255,255,255,0.70)" : "1px solid transparent",
                      borderLeft: on ? "1px solid rgba(255,255,255,0.40)" : "1px solid transparent",
                    }} />
                  <span className="relative z-10">{label}</span>
                  {on && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ background:"var(--primary)" }} />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right side — Available badge (desktop) + hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Available pill — visible on desktop only */}
            <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full"
              style={{
                background:   "rgba(107,196,107,0.18)",
                border:       "1px solid rgba(107,196,107,0.35)",
                backdropFilter: "blur(8px)",
              }}>
              <span className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background:"#4ade80" }} />
              <span className="text-[11px] font-medium" style={{ color:"#2d7d2d" }}>Available</span>
            </div>

            {/* Hamburger — mobile */}
            <button onClick={() => setOpen(!open)} aria-label="Menu"
              className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-[5px] rounded-xl"
              style={{ background:"rgba(255,255,255,0.18)" }}>
              {[0,1,2].map(i => (
                <span key={i} className="rounded-full transition-all duration-300"
                  style={{
                    display:"block", height:"1.5px",
                    width: i === 1 ? "13px" : "17px",
                    background:"var(--text-2)",
                    transform: open
                      ? (i===0 ? "rotate(45deg) translateY(6.5px)" : i===2 ? "rotate(-45deg) translateY(-6.5px)" : "scaleX(0)")
                      : "none",
                    opacity: open && i===1 ? 0 : 1,
                  }} />
              ))}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <div className="fixed inset-0 z-40 md:hidden"
        style={{ opacity:open?1:0, pointerEvents:open?"auto":"none", transition:"opacity 0.28s ease" }}>
        <div className="absolute inset-0"
          style={{ background:"rgba(220,210,200,0.88)", backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)" }}
          onClick={() => setOpen(false)} />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-8">
          {NAV.map(({ label, href }, i) => (
            <button key={href} onClick={() => go(href)}
              className="font-display w-full text-center py-3 px-6 rounded-2xl text-4xl transition-colors duration-200"
              style={{
                color: active===href ? "var(--primary)" : "var(--text-1)",
                opacity: open?1:0,
                transform: open?"translateY(0)":"translateY(14px)",
                transition:`color 0.2s, opacity 0.35s ease ${i*55}ms, transform 0.45s cubic-bezier(0.34,1.4,0.64,1) ${i*55}ms`,
              }}>
              {label}
            </button>
          ))}
          {/* Available badge — mobile menu */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{ background:"rgba(107,196,107,0.18)", border:"1px solid rgba(107,196,107,0.35)", opacity:open?1:0, transition:`opacity 0.4s ease ${NAV.length*55+60}ms` }}>
            <span className="w-2 h-2 rounded-full pulse-dot" style={{ background:"#4ade80" }} />
            <span className="text-sm font-medium" style={{ color:"#2d7d2d" }}>Available for projects</span>
          </div>
        </div>
      </div>
    </>
  );
}