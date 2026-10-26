import { useEffect, useRef, useState } from "react";
import { useMobileScrollLock } from "@/hooks/useMobileScrollLock";

const NAV = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
const MENU = [
  ...NAV.slice(0, 3),
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  NAV[3],
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#hero");
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  const scrollHome = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.dispatchEvent(new CustomEvent("reset-scroll-target"));
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActive("#hero");
    setOpen(false);
  };

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(`#${entry.target.id}`); });
    }, { rootMargin: "-20% 0px -60% 0px" });
    MENU.forEach(({ href }) => { const el = document.querySelector(href); if (el) observer.observe(el); });
    return () => { window.removeEventListener("scroll", update); observer.disconnect(); };
  }, []);

  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
      if (event.key === "Tab" && window.matchMedia("(max-width: 640px)").matches) {
        const controls = Array.from(header.current?.querySelectorAll<HTMLElement>('a[href], button') ?? [])
          .filter(element => element.tabIndex >= 0 && element.getClientRects().length > 0 && getComputedStyle(element).visibility !== "hidden");
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("keydown", escape);
    document.addEventListener("pointerdown", outside);
    return () => { document.removeEventListener("keydown", escape); document.removeEventListener("pointerdown", outside); };
  }, [open]);

  useMobileScrollLock(open);

  return (
    <header ref={header} className={`portfolio-header${scrolled ? " is-scrolled" : ""}${open ? " menu-is-open" : ""}`}>
      <div className="portfolio-nav">
        <div className="nav-brand-group nav-glass">
          <nav className="nav-links" aria-label="Main navigation">
            {NAV.map(({ label, href }) => <a key={href} href={href} onClick={label === "Home" ? scrollHome : undefined} aria-current={active === href ? "location" : undefined}>{label}</a>)}
          </nav>
          <a href="#hero" className="nav-mobile-home" onClick={scrollHome} aria-label="Elbon Asyafa — Home">Elbon.</a>
        </div>
        <div className="nav-tools nav-glass">
          <div className="nav-socials">
            <a href="https://instagram.com/asyworst" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/elbonaminalloh" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="5" r="2"/><path d="M3.5 9h3v12h-3zM10 9h3v1.6c1-1.5 2.2-1.9 3.7-1.9 3 0 4.3 1.9 4.3 5.1V21h-3v-6.7c0-1.9-.6-2.8-2.1-2.8-1.7 0-2.9 1.1-2.9 3V21h-3z"/></svg>
            </a>
            <a href="mailto:elbonaminalloh@gmail.com" aria-label="Email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="m3 6 9 7 9-7"/></svg>
            </a>
          </div>
          <button ref={toggle} className="nav-toggle" onClick={() => setOpen(value => !value)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="portfolio-menu">
            <span className="hamburger-lines" aria-hidden="true"><span /><span /><span /></span>
          </button>
        </div>
      </div>
      <nav id="portfolio-menu" className={`nav-dropdown${open ? " is-open" : ""}`} aria-hidden={!open} aria-label="All sections" onBlur={event => {
        if (!header.current?.contains(event.relatedTarget)) setOpen(false);
      }}>
        <div className="nav-menu-heading"><span>Explore</span><span>Elbon.</span></div>
        {MENU.map(({ label, href }, index) => (
          <a key={href} href={href} tabIndex={open ? 0 : -1}
            style={{ transitionDelay: open ? `${index * 24}ms` : "0ms" }}
            onClick={event => {
              if (href === "#hero") scrollHome(event);
              setOpen(false);
              toggle.current?.focus();
            }} aria-current={active === href ? "location" : undefined}>
            <span className="nav-menu-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <span className="nav-menu-label">{label}</span>
            <svg className="nav-menu-arrow" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 10h10m-4-4 4 4-4 4" /></svg>
          </a>
        ))}
      </nav>
    </header>
  );
}
