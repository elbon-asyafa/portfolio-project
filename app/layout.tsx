"use client";
import "./globals.css";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import WindowPopups from "@/components/WindowPopups";
import AIButton from "@/components/AIButton";

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
      if (Math.abs(d) > 0.4) { cur += d * 0.10; window.scrollTo(0, cur); }
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Elbon — Network Technician</title>
        <meta name="description" content="Portfolio of Elbon Aminalloh Asyafa Lubis Prasetyo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {/* Animated mesh gradient background */}
        <div className="mesh-bg" aria-hidden="true" />

        {/* Glass overlay — amplifies glass depth */}
        <div className="glass-overlay" aria-hidden="true" />

        <CustomCursor />
        <LoadingScreen />
        <Navbar />

        <main className="relative z-10 page-in">{children}</main>

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

        <AIButton />
        <WindowPopups />
      </body>
    </html>
  );
}
