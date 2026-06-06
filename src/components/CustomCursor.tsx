import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible,  setVisible]  = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);
  const pos  = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf  = useRef<number>(0);

  useEffect(() => {
    // Only on desktop pointer devices
    if (!window.matchMedia("(pointer: fine)").matches) return;

    document.documentElement.style.cursor = "none";

    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
      }
      setVisible(true);
    };

    const loop = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.13;
      ring.current.y += (pos.current.y - ring.current.y) * 0.13;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px,${ring.current.y}px)`;
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    const checkHover = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setHovering(!!el.closest("a,button,[role=button],input,textarea,label,[data-hover]"));
    };

    const down = () => setClicking(true);
    const up   = () => setClicking(false);
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move,      { passive: true });
    window.addEventListener("mousemove", checkHover,{ passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup",   up);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    return () => {
      cancelAnimationFrame(raf.current);
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousemove", checkHover);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup",   up);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, []);

  /* Dot size */
  const dotSize  = clicking ? 6  : hovering ? 10 : 8;
  const ringSize = clicking ? 24 : hovering ? 44 : 34;

  return createPortal(
    <>
      {/* ── Inner dot — solid, high contrast ── */}
      <div
        ref={dotRef}
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          zIndex:        99999,
          pointerEvents: "none",
          width:         dotSize,
          height:        dotSize,
          borderRadius:  "50%",
          /* White dot with dark shadow — visible on ANY background */
          background:    hovering ? "#1E2640" : "#ffffff",
          boxShadow:     hovering
            ? "0 0 0 2px rgba(255,255,255,0.90)"
            : "0 0 0 1.5px rgba(30,38,64,0.70)",
          marginLeft:    -(dotSize / 2),
          marginTop:     -(dotSize / 2),
          opacity:       visible ? 1 : 0,
          transition:    "width 0.15s, height 0.15s, background 0.18s, box-shadow 0.18s, opacity 0.2s, margin 0.15s",
          willChange:    "transform",
          transform:     "translate(0px,0px)",
        }}
      />

      {/* ── Outer ring — clearly visible, no blend-mode tricks ── */}
      <div
        ref={ringRef}
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          zIndex:        99998,
          pointerEvents: "none",
          width:         ringSize,
          height:        ringSize,
          borderRadius:  "50%",
          /* Thick border — white + dark outline so it pops on any bg */
          border:        hovering
            ? "2.5px solid rgba(30,38,64,0.80)"
            : "2px solid rgba(255,255,255,0.90)",
          boxShadow:     hovering
            ? "0 0 0 1px rgba(255,255,255,0.60)"
            : "0 0 0 1px rgba(30,38,64,0.35)",
          background:    hovering ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.06)",
          marginLeft:    -(ringSize / 2),
          marginTop:     -(ringSize / 2),
          opacity:       visible ? 1 : 0,
          transition:    "width 0.28s cubic-bezier(0.34,1.4,0.64,1), height 0.28s cubic-bezier(0.34,1.4,0.64,1), border 0.18s, box-shadow 0.18s, background 0.18s, opacity 0.2s, margin 0.28s cubic-bezier(0.34,1.4,0.64,1)",
          willChange:    "transform",
          transform:     "translate(0px,0px)",
        }}
      />
    </>,
    document.body
  );
}