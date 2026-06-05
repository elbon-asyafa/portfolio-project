import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import WindowPopups from "@/components/WindowPopups";
import AIButton from "@/components/AIButton";
import Hero from "@/components/Hero";
import MarqueeBar from "@/components/MarqueeBar";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function App() {
  useEffect(() => {
    /* Inertia scroll — desktop only */
    const isTouch = 'ontouchstart' in window;
    if (isTouch) return;
    let cur = window.scrollY, tgt = window.scrollY, raf: number;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      tgt = Math.max(0, Math.min(tgt + e.deltaY * 1.15, document.body.scrollHeight - window.innerHeight));
    };
    const loop = () => {
      const d = tgt - cur;
      if (Math.abs(d) > 1.0) { cur += d * 0.15; window.scrollTo(0, cur); }
      raf = requestAnimationFrame(loop);
    };
    // Reset inertia target when scroll-to-top is called
    const onResetTarget = () => { tgt = 0; cur = 0; };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("reset-scroll-target", onResetTarget);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("reset-scroll-target", onResetTarget);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Animated mesh gradient background */}
      <div className="mesh-bg" aria-hidden="true" />

      {/* Glass overlay — amplifies glass depth */}
      <div className="glass-overlay" aria-hidden="true" />

      <CustomCursor />
      <LoadingScreen />
      <Navbar />

      <main className="relative z-10 page-in">
        <Hero />
        <MarqueeBar />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>

      <footer className="relative z-10 py-8" style={{ borderTop:"1px solid rgba(255,255,255,0.22)" }}>
        <div className="sp sp-inner flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-display text-lg" style={{ color:"var(--primary)" }}>Elbon.</span>
          <p className="text-sm text-center" style={{ color:"var(--text-3)" }}>
            &copy; {new Date().getFullYear()} Elbon Aminalloh Asyafa Lubis Prasetyo &middot; TKJ &middot; SMKS Yaspih Rajeg
          </p>
          <button onClick={() => { window.dispatchEvent(new CustomEvent("reset-scroll-target")); window.scrollTo({top:0}); }}
            className="text-xs hover:opacity-70 transition-opacity" style={{ color:"var(--text-3)" }}>
            Top &uarr;
          </button>
        </div>
      </footer>

      {/* ── Bottom bar: Dock (mobile: + AI Button inline) ── */}
      <div className="fixed bottom-3 left-0 right-0 z-[500] flex items-end justify-center gap-3 px-4 pointer-events-none">
        <div className="pointer-events-auto">
          <WindowPopups inline />
        </div>
        {/* AI inline only on mobile, hidden md+ (desktop uses its own fixed position) */}
        <div className="pointer-events-auto shrink-0 md:hidden">
          <AIButton inline />
        </div>
      </div>
      {/* AI standalone on desktop */}
      <div className="hidden md:block">
        <AIButton />
      </div>
    </>
  );
}