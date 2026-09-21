import Navbar from "@/components/Navbar";
import LoadingScreen from "@/components/LoadingScreen";
import { useInertiaScroll } from "@/hooks/useInertiaScroll";
import WindowPopups from "@/components/WindowPopups";
import AIButton from "@/components/AIButton";
import Hero, { GalleryStrip } from "@/components/Hero";
import MarqueeBar from "@/components/MarqueeBar";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import { useLayoutEffect } from "react";

export default function App() {
  useInertiaScroll();

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
    window.dispatchEvent(new CustomEvent("reset-scroll-target"));
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Static mesh gradient preserves the original palette. */}
      <div className="mesh-bg" aria-hidden="true" />

      <LoadingScreen />
      <Navbar />

      <main className="portfolio-main">
        <Hero />
        <div id="portfolio-content" className="content-sheet">
        <div className="sp sp-inner content-gallery"><GalleryStrip /></div>
        <MarqueeBar />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Contact />


      <footer className="relative z-10 py-8" style={{ borderTop:"1px solid rgba(255,255,255,0.22)" }}>
        <div className="sp sp-inner flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-display text-lg" style={{ color:"var(--primary)" }}>Elbon.</span>
          <p className="text-sm text-center" style={{ color:"var(--text-3)" }}>
            &copy; {new Date().getFullYear()} Elbon Aminalloh Asyafa Lubis Prasetyo
          </p>
          <button onClick={() => { window.dispatchEvent(new CustomEvent("reset-scroll-target")); window.scrollTo({top:0}); }}
            className="text-xs hover:opacity-70 transition-opacity" style={{ color:"var(--text-3)" }}>
            Top &uarr;
          </button>
        </div>
      </footer>
        </div>
      </main>

      {/* ── Dock: always centered bottom ── */}
      <div className="fixed bottom-3 left-0 right-0 z-[500] flex items-end justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto">
          <WindowPopups inline />
        </div>
      </div>
      {/* AI button: always fixed bottom-right */}
      <AIButton />
    </>
  );
}
