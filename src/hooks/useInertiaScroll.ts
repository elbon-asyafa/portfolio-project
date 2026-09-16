import { useEffect } from "react";

export function useInertiaScroll() {
  useEffect(() => {
    const enabled = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    let target = window.scrollY;
    let position = target;
    let previousTime = 0;

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
      target = position = window.scrollY;
    };

    const tick = (time: number) => {
      const elapsed = previousTime ? Math.min(time - previousTime, 64) : 1000 / 60;
      previousTime = time;
      target = Math.max(0, Math.min(target, document.documentElement.scrollHeight - window.innerHeight));
      position += (target - position) * (1 - Math.pow(0.85, elapsed / (1000 / 60)));
      const settled = Math.abs(target - position) < 0.5;
      if (settled) position = target;
      window.scrollTo({ top: position, behavior: "instant" });
      if (settled) stop();
      else frame = requestAnimationFrame(tick);
    };

    const wheel = (event: WheelEvent) => {
      if (!enabled.matches || event.defaultPrevented || event.ctrlKey || event.shiftKey || !event.cancelable || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if (getComputedStyle(document.body).overflowY === "hidden") return;

      // Let nested panels and form controls handle their own wheel input.
      let element = event.target instanceof Element ? event.target : null;
      if (element?.closest("input, textarea, select, [contenteditable='true']")) return;
      while (element && element !== document.body && element !== document.documentElement) {
        if (element.scrollHeight > element.clientHeight && /auto|scroll/.test(getComputedStyle(element).overflowY)) return;
        element = element.parentElement;
      }

      event.preventDefault();
      if (!frame) target = position = window.scrollY;
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
      target = Math.max(0, Math.min(target + event.deltaY * unit * 1.15, document.documentElement.scrollHeight - window.innerHeight));
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const syncScroll = () => {
      // Navigation, scrollbar dragging, and other programmatic scrolling take priority.
      if (frame && Math.abs(window.scrollY - position) > 2) stop();
    };
    window.addEventListener("wheel", wheel, { passive: false });
    window.addEventListener("scroll", syncScroll, { passive: true });
    window.addEventListener("pointerdown", stop, { passive: true });
    window.addEventListener("keydown", stop);
    window.addEventListener("reset-scroll-target", stop);
    document.addEventListener("visibilitychange", stop);
    enabled.addEventListener("change", stop);
    return () => {
      stop();
      window.removeEventListener("wheel", wheel);
      window.removeEventListener("scroll", syncScroll);
      window.removeEventListener("pointerdown", stop);
      window.removeEventListener("keydown", stop);
      window.removeEventListener("reset-scroll-target", stop);
      document.removeEventListener("visibilitychange", stop);
      enabled.removeEventListener("change", stop);
    };
  }, []);
}
