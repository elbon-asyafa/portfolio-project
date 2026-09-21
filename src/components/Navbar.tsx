import { useEffect, useRef, useState } from "react";

const NAV = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
const MENU = [...NAV, { label: "Experience", href: "#experience" }, { label: "Skills", href: "#skills" }];

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
    };
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("keydown", escape);
    document.addEventListener("pointerdown", outside);
    return () => { document.removeEventListener("keydown", escape); document.removeEventListener("pointerdown", outside); };
  }, [open]);

  return (
    <header ref={header} className={`portfolio-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="portfolio-nav">
        <nav className="nav-links" aria-label="Main navigation">
          {NAV.map(({ label, href }) => <a key={href} href={href} onClick={label === "Home" ? scrollHome : undefined} aria-current={active === href ? "location" : undefined}>{label}</a>)}
        </nav>
        <a href="#hero" className="nav-mobile-home" onClick={scrollHome} aria-label="Elbon Asyafa — Home">Elbon.</a>
        <div className="nav-tools">
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
      <nav id="portfolio-menu" className={`nav-dropdown glass-pill${open ? " is-open" : ""}`} aria-hidden={!open} aria-label="All sections" onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget) && event.relatedTarget !== toggle.current) setOpen(false);
      }}>
        {MENU.map(({ label, href }, index) => <a key={href} href={href} tabIndex={open ? 0 : -1} style={{ transitionDelay: open ? `${index * 28}ms` : "0ms" }} onClick={() => { setOpen(false); toggle.current?.focus(); }} aria-current={active === href ? "location" : undefined}>{label}</a>)}
      </nav>
    </header>
  );
}
