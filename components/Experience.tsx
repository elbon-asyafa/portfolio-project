"use client";
import { useEffect, useRef } from "react";

const PRIMARY = [
  { p:"2022 — Present", r:"Field Technician", o:"Freelance / Project-Based", l:"West Java, Indonesia", d:"Deployed and maintained network infrastructure for residential and small business clients. End-to-end: cable routing, device configuration, DHCP setup, and post-deployment testing via Winbox.", t:["Networking","MikroTik","DHCP","Installation"] },
  { p:"2021 — 2023",    r:"Assistant Teacher", o:"Local Education Center", l:"Pasarkemis", d:"Supported lead teachers in explaining technical material to students aged 12–18. Translated complex concepts into clear, accessible explanations.", t:["Teaching","Communication","Mentoring"] },
];
const SUPPORT = [
  { p:"2020 — 2021", r:"Barista", o:"Local Café", d:"Prepared beverages to consistent quality in high-volume environments. Sharpened customer interaction skills and process discipline.", t:["Customer Service","Consistency"] },
  { p:"2019 — 2020", r:"Banquet Crew", o:"Event Services", d:"Coordinated setup and service for large-scale events. Built teamwork habits and the ability to stay composed under tight timelines.", t:["Teamwork","Event Ops"] },
];

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        ref.current?.querySelectorAll(".reveal,.reveal-x").forEach((el,i) => setTimeout(()=>el.classList.add("in"), i*100));
        obs.disconnect();
      }
    }, { threshold:0.06 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="experience" ref={ref} className="relative py-24">
      <div className="sp sp-inner">
        <div className="reveal mb-14">
          <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color:"var(--primary)" }}>Background</p>
          <h2 className="font-display text-3xl sm:text-4xl mb-3" style={{ color:"var(--text-1)" }}>Experience</h2>
          <div className="w-10 h-0.5 rounded-full" style={{ background:"linear-gradient(90deg,var(--primary),var(--secondary))" }} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <p className="font-mono text-xs uppercase tracking-widest mb-8" style={{ color:"var(--secondary)" }}>Core Roles</p>
            <div className="relative">
              <div className="absolute left-[4px] top-2 bottom-0 w-px" style={{ background:"linear-gradient(to bottom,var(--primary),transparent)" }} />
              <div className="space-y-10">
                {PRIMARY.map((e,i) => (
                  <div key={e.r} className="reveal-x pl-7 relative group">
                    <div className="timeline-dot absolute left-0 top-1.5 transition-transform duration-200 group-hover:scale-125" />
                    <p className="font-mono text-xs mb-2 tracking-wide" style={{ color:"var(--primary)" }}>{e.p}</p>
                    <h3 className="font-display text-xl mb-0.5 group-hover:text-[var(--primary)] transition-colors" style={{ color:"var(--text-1)" }}>{e.r}</h3>
                    <p className="text-sm mb-3" style={{ color:"var(--text-3)" }}>{e.o} · {e.l}</p>
                    <p className="text-sm leading-relaxed mb-3" style={{ color:"var(--text-2)" }}>{e.d}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {e.t.map(t => <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded-full glass-btn" style={{ color:"var(--primary)" }}>{t}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest mb-8" style={{ color:"var(--secondary)" }}>Supporting</p>
            <div className="space-y-4">
              {SUPPORT.map((e,i) => (
                <div key={e.r} className="reveal glass-card p-5 rounded-2xl">
                  <p className="font-mono text-[10px] mb-1" style={{ color:"var(--primary)" }}>{e.p}</p>
                  <h4 className="font-medium text-sm mb-0.5" style={{ color:"var(--text-1)" }}>{e.r}</h4>
                  <p className="text-xs mb-2" style={{ color:"var(--text-3)" }}>{e.o}</p>
                  <p className="text-xs leading-relaxed mb-3" style={{ color:"var(--text-2)" }}>{e.d}</p>
                  <div className="flex flex-wrap gap-1">
                    {e.t.map(t => <span key={t} className="font-mono text-[9px] px-2 py-0.5 rounded-full" style={{ background:"rgba(74,100,144,0.12)", color:"var(--secondary)", border:"1px solid rgba(74,100,144,0.20)" }}>{t}</span>)}
                  </div>
                </div>
              ))}
              <div className="reveal p-4 rounded-2xl text-xs italic leading-relaxed"
                style={{ background:"rgba(74,100,144,0.08)", border:"1px solid var(--lg-border-bot)", color:"var(--text-3)" }}>
                &ldquo;Service roles taught me that reliability and clear communication matter just as much in technical work as in any customer-facing job.&rdquo;
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
