import { useEffect } from "react";

let locks = 0;
let restoreScroll: (() => void) | undefined;

function lockPageScroll() {
  if (locks++ === 0) {
    const elements = [document.documentElement, document.body];
    const previous = elements.map(element => ({
      overflow: element.style.overflow,
      overscrollBehavior: element.style.overscrollBehavior,
    }));
    window.dispatchEvent(new CustomEvent("reset-scroll-target"));
    elements.forEach(element => {
      element.style.overflow = "hidden";
      element.style.overscrollBehavior = "none";
    });
    restoreScroll = () => elements.forEach((element, index) => {
      element.style.overflow = previous[index].overflow;
      element.style.overscrollBehavior = previous[index].overscrollBehavior;
    });
  }
  return () => {
    if (--locks === 0) {
      restoreScroll?.();
      restoreScroll = undefined;
    }
  };
}

export function useMobileScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const mobile = window.matchMedia("(max-width: 640px)");
    let release: (() => void) | undefined;
    const update = () => {
      if (mobile.matches && !release) release = lockPageScroll();
      else if (!mobile.matches && release) {
        release();
        release = undefined;
      }
    };
    update();
    mobile.addEventListener("change", update);
    return () => {
      mobile.removeEventListener("change", update);
      release?.();
    };
  }, [active]);
}
