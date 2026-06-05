import { useEffect, useRef } from "react";

const PRIMARY = [
  {
    p: "Jan 2025 — Mar 2025",
    r: "Field Technician Intern (PKL)",
    o: "PT. Mekarsari Digital Teknologi",
    l: "Tangerang, Banten",
    d: "Handled end-to-end Fiber to the Home (FTTH) deployment, including fiber optic splicing (fusion splicing) and optical network maintenance. Configured and provisioned ONT (Optical Network Terminal) and home routers to ensure stable internet connectivity for clients. Assisted in designing and pulling new fiber optic cables to deploy ODP (Optical Distribution Pack) lines for network expansion.",
    t: ["FTTH","Fiber Optic Splicing","ONT/ODP","Network Config","PKL"]
  },
  {
    p: "Jul 2024 — Jun 2026",
    r: "Vocational Teacher Assistant & UKK Assessor",
    o: "Vocational Dept. (TKJ) – SMK Yaspih Rajeg",
    l: "Tangerang, Banten",
    d: "Selected as a student assessor to evaluate and grade peers during the Vocational Competency Exam (UKK), operating at the same technical standard as vocational teachers. Assisted vocational teachers in managing laboratory practices, troubleshooting network issues, and mentoring lower-class students in computer network subjects for 2 years. Demonstrated advanced technical proficiency in configuring routers, switches, and managing network infrastructure.",
    t: ["UKK Assessor","Lab Management","Troubleshooting","Mentoring","Routing & Switching"]
  },
];

const SUPPORT = [
  {
    p: "Jul 2025 — Jun 2026",
    r: "Public Relations & Publicist",
    o: "English Club – SMK Yaspih Rajeg",
    d: "Actively promoted club programs and successfully recruited new members through persuasive communication and targeted outreach.",
    t: ["Public Relations","Communication"]
  },
  {
    p: "2025",
    r: "Barista",
    o: "Barempat",
    d: "Prepared beverages consistently in a high-volume environment. Sharpened customer interaction and process discipline.",
    t: ["Customer Service","Consistency"]
  },
  {
    p: "2025",
    r: "Banquet Crew",
    o: "PT. Pakons Prime",
    d: "Coordinated setup and service for large-scale events. Built teamwork habits under tight timelines.",
    t: ["Teamwork","Event Ops"]
  },
];

const ACHIEVEMENTS = [
  { icon: "🏆", label: "Ranked 1st in Class", sub: "2 consecutive semesters · Avg 87.5/100" },
  { icon: "📋", label: "Certified PKL", sub: "Field Industrial Training" },
  { icon: "🎓", label: "Certified UKK", sub: "Vocational Competency Exam" },
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

        {/* Core Roles + Supporting side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          <div className="lg:col-span-2">
            <p className="font-mono text-xs uppercase tracking-widest mb-8" style={{ color:"var(--secondary)" }}>Core Roles</p>
            <div className="relative">
              <div className="absolute left-[4px] top-2 bottom-0 w-px" style={{ background:"linear-gradient(to bottom,var(--primary),transparent)" }} />
              <div className="space-y-10">
                {PRIMARY.map((e) => (
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

          {/* Supporting only */}
          <div>
            <p className="font-mono text-xs uppercase tracking-widest mb-8" style={{ color:"var(--secondary)" }}>Supporting</p>
            <div className="space-y-4">
              {SUPPORT.map((e) => (
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
            </div>
          </div>
        </div>

        {/* Achievements — full width below */}
        <div className="reveal">
          <p className="font-mono text-xs uppercase tracking-widest mb-5" style={{ color:"var(--secondary)" }}>Achievements</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {ACHIEVEMENTS.map(a => (
              <div key={a.label} className="glass-card p-5 rounded-2xl flex items-center gap-4">
                <span className="text-3xl shrink-0">{a.icon}</span>
                <div>
                  <p className="font-medium text-sm" style={{ color:"var(--text-1)" }}>{a.label}</p>
                  <p className="font-mono text-[10px] mt-0.5" style={{ color:"var(--text-3)" }}>{a.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}