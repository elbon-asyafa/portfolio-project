import { useEffect, useRef } from "react";
import CertificateCards from "@/components/Certificates";
import { copy, useLanguage } from "@/contexts/LanguageContext";

const PRIMARY = [
  {
    p: "2024 — 2026",
    r: "Independent Digital Projects",
    o: "Web Development, Automation & AI",
    l: "",
    d: "Built responsive business and portfolio websites, including RuzStore with product search, filters, wishlist, cart, and WhatsApp checkout. Also developed a multi-user WhatsApp bot for finance and to-do tracking with Google Sheets, reminders, AI receipt processing, and media downloads, and integrated a Gemini-powered interactive assistant into a web project.",
    t: ["Web Development","WhatsApp Automation","Google Sheets","Gemini AI","AI Integration"]
  },
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
  { icon: "🏆", label: "Ranked 1st in Class", sub: "2 consecutive semesters · Avg 85.5/100" },
  { icon: "📋", label: "Certified PKL", sub: "Field Industrial Training" },
  { icon: "🎓", label: "Certified UKK", sub: "Vocational Competency Exam" },
];

const PRIMARY_ID = [
  { ...PRIMARY[0], r:"Proyek Digital Mandiri", o:"Pengembangan Web, Otomasi & AI", d:"Membangun situs bisnis dan portofolio responsif, termasuk RuzStore dengan pencarian produk, filter, wishlist, keranjang, dan checkout WhatsApp. Mengembangkan bot WhatsApp multi-user untuk pencatatan keuangan dan to-do dengan Google Sheets, pengingat, pemrosesan struk berbasis AI, dan unduh media, serta mengintegrasikan asisten interaktif Gemini ke proyek web.", t:["Pengembangan Web","Otomasi WhatsApp","Google Sheets","Gemini AI","Integrasi AI"] },
  { ...PRIMARY[1], p:"Jan 2025 — Mar 2025", r:"Teknisi Lapangan (PKL)", d:"Menangani instalasi Fiber to the Home (FTTH), penyambungan fiber optik, dan pemeliharaan jaringan optik. Mengonfigurasi ONT dan router pelanggan agar koneksi internet stabil, serta membantu penarikan kabel untuk perluasan jaringan ODP.", t:["FTTH","Penyambungan Fiber Optik","Konfigurasi ONT/ODP","Konfigurasi Jaringan","PKL"] },
  { ...PRIMARY[2], p:"Jul 2024 — Jun 2026", r:"Asisten Guru Kejuruan & Asesor UKK", o:"Jurusan TKJ – SMK Yaspih Rajeg", d:"Dipilih sebagai asesor siswa untuk mengevaluasi peserta Uji Kompetensi Keahlian (UKK). Membantu guru mengelola praktik laboratorium, menangani masalah jaringan, dan membimbing adik kelas selama dua tahun.", t:["Asesor UKK","Pengelolaan Lab","Troubleshooting","Mentoring","Routing & Switching"] },
];

const SUPPORT_ID = [
  { ...SUPPORT[0], p:"Jul 2025 — Jun 2026", r:"Hubungan Masyarakat & Publisis", o:"English Club – SMK Yaspih Rajeg", d:"Mempromosikan program klub dan merekrut anggota baru melalui komunikasi persuasif dan pendekatan yang terarah.", t:["Hubungan Masyarakat","Komunikasi"] },
  { ...SUPPORT[1], r:"Barista", d:"Menyiapkan minuman secara konsisten di lingkungan kerja yang sibuk, sekaligus mengasah pelayanan pelanggan dan kedisiplinan proses." },
  { ...SUPPORT[2], r:"Kru Banquet", d:"Mengoordinasikan persiapan dan pelayanan acara berskala besar serta membangun kebiasaan kerja tim dengan tenggat yang ketat.", t:["Kerja Tim","Operasional Acara"] },
];

const ACHIEVEMENTS_ID = [
  { icon:"🏆", label:"Peringkat 1 di Kelas", sub:"2 semester berturut-turut · Rata-rata 85,5/100" },
  { icon:"📋", label:"Sertifikat PKL", sub:"Praktik Kerja Lapangan" },
  { icon:"🎓", label:"Sertifikat UKK", sub:"Uji Kompetensi Keahlian" },
];

export default function Experience() {
  const { language } = useLanguage();
  const primaryRoles = language === "id" ? PRIMARY_ID : PRIMARY;
  const supportRoles = language === "id" ? SUPPORT_ID : SUPPORT;
  const achievements = language === "id" ? ACHIEVEMENTS_ID : ACHIEVEMENTS;
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
          <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color:"var(--primary)" }}>{copy(language, "Background", "Latar Belakang")}</p>
          <h2 className="font-display text-3xl sm:text-4xl mb-3" style={{ color:"var(--text-1)" }}>{copy(language, "Experience", "Pengalaman")}</h2>
          <div className="w-10 h-0.5 rounded-full" style={{ background:"linear-gradient(90deg,var(--primary),var(--secondary))" }} />
        </div>

        {/* Core Roles + Supporting side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          <div className="lg:col-span-2">
            <p className="font-mono text-xs uppercase tracking-widest mb-8" style={{ color:"var(--secondary)" }}>{copy(language, "Core Roles", "Pengalaman Utama")}</p>
            <div className="relative">
              <div className="absolute left-[4px] top-2 bottom-0 w-px" style={{ background:"linear-gradient(to bottom,var(--primary),transparent)" }} />
              <div className="space-y-10">
                {primaryRoles.map((e) => (
                  <div key={e.r} className="reveal-x pl-7 relative group">
                    <div className="timeline-dot absolute left-0 top-1.5 transition-transform duration-200 group-hover:scale-125" />
                    <p className="font-mono text-xs mb-2 tracking-wide" style={{ color:"var(--primary)" }}>{e.p}</p>
                    <h3 className="font-display text-xl mb-0.5 group-hover:text-[var(--primary)] transition-colors" style={{ color:"var(--text-1)" }}>{e.r}</h3>
                    <p className="text-sm mb-3" style={{ color:"var(--text-3)" }}>{e.o}{e.l ? ` · ${e.l}` : ""}</p>
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
            <p className="font-mono text-xs uppercase tracking-widest mb-8" style={{ color:"var(--secondary)" }}>{copy(language, "Supporting", "Pengalaman Lain")}</p>
            <div className="space-y-4">
              {supportRoles.map((e) => (
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

        {/* Achievements and certificates */}
        <div id="achievements" className="reveal rounded-[2rem] p-5 sm:p-8 lg:p-10"
          style={{ background:"linear-gradient(135deg,rgba(255,255,255,.40),rgba(255,255,255,.16))", border:"1px solid rgba(255,255,255,.62)", boxShadow:"0 18px 50px rgba(54,76,116,.10), inset 0 1px 0 rgba(255,255,255,.72)" }}>
          <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[.2em] mb-2" style={{ color:"var(--secondary)" }}>{copy(language, "Milestones & Credentials", "Pencapaian & Sertifikat")}</p>
              <h3 className="font-display text-3xl sm:text-4xl" style={{ color:"var(--text-1)" }}>{copy(language, "Achievements", "Pencapaian")}</h3>
            </div>
            <p className="max-w-md text-sm leading-relaxed" style={{ color:"var(--text-3)" }}>
              {copy(language, "A few milestones from my studies, hands-on training, and technical development.", "Beberapa pencapaian dari pendidikan, pelatihan praktik, dan pengembangan kemampuan teknis saya.")}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {achievements.map((a, index) => (
              <div key={a.label} className="glass-card flex min-h-[104px] items-center gap-4 rounded-2xl p-5"
                style={{ background:"rgba(255,255,255,.42)", borderColor:"rgba(255,255,255,.68)" }}>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl"
                  style={{ background:"linear-gradient(145deg,rgba(110,136,176,.18),rgba(200,152,120,.16))", boxShadow:"inset 0 1px 0 rgba(255,255,255,.7)" }} aria-hidden="true">{a.icon}</span>
                <div>
                  <p className="font-mono text-[9px] tracking-[.16em] mb-1" style={{ color:"var(--secondary)" }}>0{index + 1} · {copy(language, "MILESTONE", "PENCAPAIAN")}</p>
                  <p className="font-medium text-sm" style={{ color:"var(--text-1)" }}>{a.label}</p>
                  <p className="font-mono text-[10px] mt-1" style={{ color:"var(--text-3)" }}>{a.sub}</p>
                </div>
              </div>
            ))}
          </div>
          <CertificateCards />
        </div>

      </div>
    </section>
  );
}
