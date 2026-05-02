"use client";
import { useEffect, useRef } from "react";

const traits = [
  { icon:"🌐", title:"Network Setup",      desc:"Deploying LAN/WLAN infrastructure for homes, schools, and small offices." },
  { icon:"🔍", title:"Fault Diagnosis",    desc:"Layered troubleshooting from physical Layer 1 checks to Layer 3 routing." },
  { icon:"📡", title:"MikroTik & Winbox",  desc:"Configuring routers, DHCP servers, and access points via MikroTik ecosystem." },
  { icon:"🤝", title:"Teaching & Support", desc:"Breaking down complex technical concepts for non-technical users." },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        ref.current?.querySelectorAll(".reveal").forEach((el,i) => setTimeout(()=>el.classList.add("in"), i*80));
        obs.disconnect();
      }
    }, { threshold:0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} className="relative py-24">
      <div className="sp sp-inner">
        <div className="reveal mb-12">
          <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color:"var(--primary)" }}>About Me</p>
          <h2 className="font-display text-3xl sm:text-4xl mb-3" style={{ color:"var(--text-1)" }}>Who I Am</h2>
          <div className="w-10 h-0.5 rounded-full" style={{ background:"linear-gradient(90deg,var(--primary),var(--secondary))" }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            {[
              "I'm Elbon, a self-driven technical problem solver with hands-on experience in real-world network infrastructure. From pulling cables and mounting access points to configuring MikroTik routers and validating DHCP assignments.",
              "Beyond networking, I've worked as an assistant teacher, a barista, and a banquet crew member — roles that built my communication, precision, and teamwork skills that now complement my technical work every day.",
              "I also built a fully-functional online stationery store (Ruz Stationary) with a friend using plain HTML, CSS, and JavaScript — proving I can ship things from scratch.",
            ].map((t,i) => (
              <p key={i} className="reveal text-base leading-relaxed" style={{ color:"var(--text-2)" }}>{t}</p>
            ))}
            <div className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full glass-btn text-sm"
              style={{ color:"var(--text-2)" }}>
              <span>📍</span> Pasarkemis, Jawa Barat, Indonesia
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {traits.map(t => (
              <div key={t.title} className="reveal glass-card p-5 rounded-2xl">
                <div className="text-2xl mb-3">{t.icon}</div>
                <h3 className="font-medium text-sm mb-1.5" style={{ color:"var(--text-1)" }}>{t.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color:"var(--text-3)" }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
