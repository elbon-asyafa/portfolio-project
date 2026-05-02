// Utility: resets both visual scroll AND inertia target
// Import and call scrollToTop() instead of window.scrollTo({top:0})
export function scrollToTop() {
  // Dispatch custom event that layout.tsx inertia loop listens to
  window.dispatchEvent(new CustomEvent("reset-scroll-target"));
  window.scrollTo({ top: 0 });
}
