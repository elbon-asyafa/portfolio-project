import { useEffect, useRef } from "react";
import { copy, useLanguage } from "@/contexts/LanguageContext";

const traits = [
  { icon:"🌐", title:"Network Setup",      desc:"Deploying LAN/WLAN infrastructure for homes, schools, and small offices." },
  { icon:"🔍", title:"Fault Diagnosis",    desc:"Layered troubleshooting from physical Layer 1 checks to Layer 3 routing." },
  { icon:"📡", title:"MikroTik & Winbox",  desc:"Configuring routers, DHCP servers, and access points via MikroTik ecosystem." },
  { icon:"🤝", title:"Teaching & Support", desc:"Breaking down complex technical concepts for non-technical users." },
];

export default function About() {
  const { language } = useLanguage();
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
    <section id="about" ref={ref} className="relative pt-24 pb-10">
      <div className="sp sp-inner">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: Text */}
          <div className="reveal">

            {/* Mobile-only profile photo */}
            <div className="lg:hidden flex justify-center mb-8">
              <div className="relative w-full rounded-[2rem] overflow-hidden flex-shrink-0"
                style={{
                  aspectRatio: "3/4",
                  border: "1.5px solid rgba(255,255,255,0.60)",
                  boxShadow: "0 8px 40px rgba(74,100,144,0.18), inset 0 1px 0 rgba(255,255,255,0.70)",
                  background: "rgba(74,100,144,0.10)",
                }}>
                <div className="absolute inset-0 flex items-center justify-center text-7xl opacity-30 select-none">👤</div>
                <img loading="lazy" decoding="async"
                  src="/images/profile/1.webp"
                  alt="Elbon Aminalloh"
                  className="absolute inset-0 w-full h-full object-cover z-10"
                  onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
            </div>
            <h2 className="font-mono text-xs tracking-[0.2em] mb-4" style={{ color: "var(--text-3)" }}>{copy(language, "ABOUT ME", "TENTANG SAYA")}</h2>
            <h3 className="font-display text-4xl sm:text-5xl mb-3 leading-[1.1] tracking-tight" style={{ color: "var(--text-1)" }}>
              {copy(language, "Who I Am", "Siapa Saya")}
            </h3>
            <p className="font-mono text-xs tracking-widest mb-8 uppercase" style={{ color: "var(--primary)", opacity: 0.75 }}>
              Elbon Aminalloh Asyafa Lubis Prasetyo
            </p>

            <div className="space-y-6 text-base sm:text-lg leading-relaxed" style={{ color: "var(--text-2)" }}>
              {(language === "id" ? [
                "Saya Elbon, teknisi jaringan dari Rajeg, Banten. Saya lulusan Teknik Komputer dan Jaringan SMK Yaspih Rajeg, meraih peringkat pertama di kelas selama dua semester berturut-turut, serta mendapatkan sertifikat PKL dan UKK.",
                "Di sekolah, saya membangun infrastruktur LAN/WLAN di lebih dari 8 ruangan menggunakan MikroTik dan Winbox. Saya juga menjadi asesor UKK, membimbing dan menilai siswa lain. Saat PKL di PT. Mekarsari Digital Teknologi, saya menangani instalasi FTTH, penyambungan fiber optik, serta konfigurasi ONT/ODP.",
                "Saya juga ikut membangun RuzStore, situs e-commerce dengan HTML, CSS, dan JavaScript. Di luar bidang teknologi, saya pernah bekerja sebagai barista dan kru banquet, serta menjadi publisis English Club.",
              ] : [
                "I'm Elbon — a network technician from Rajeg, Banten. I graduated from SMK Yaspih Rajeg (TKJ), ranked 1st in class for two consecutive semesters, and earned both PKL and UKK certifications.",
                "At school, I deployed full LAN/WLAN infrastructure across 8+ rooms using MikroTik and Winbox, and served as a UKK Assessor — mentoring and evaluating peers at teacher-level standard. For my PKL, I worked at PT. Mekarsari Digital Teknologi handling FTTH deployment, fiber optic splicing, and ONT/ODP configuration.",
                "I also co-built Ruz Store, a functional e-commerce site using plain HTML, CSS, and JavaScript. Outside tech, I've worked as a barista, banquet crew, and English Club publicist.",
              ]).map((t,i) => (
                <p key={i}>{t}</p>
              ))}
            </div>

            <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-btn text-sm"
              style={{ color:"var(--text-2)" }}>
              <span>📍</span> {copy(language, "Rajeg, Banten, Indonesia", "Rajeg, Banten, Indonesia")}
            </div>

            {/* Traits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
              {traits.map(t => (
                <div key={t.title} className="reveal glass-card p-5 rounded-2xl">
                  <div className="text-2xl mb-3">{t.icon}</div>
                  <h3 className="font-medium text-sm mb-1.5" style={{ color:"var(--text-1)" }}>{language === "id" ? ({ "Network Setup":"Instalasi Jaringan", "Fault Diagnosis":"Diagnosis Gangguan", "MikroTik & Winbox":"MikroTik & Winbox", "Teaching & Support":"Mengajar & Dukungan" } as Record<string,string>)[t.title] : t.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color:"var(--text-3)" }}>{language === "id" ? ({ "Deploying LAN/WLAN infrastructure for homes, schools, and small offices.":"Membangun infrastruktur LAN/WLAN untuk rumah, sekolah, dan kantor kecil.", "Layered troubleshooting from physical Layer 1 checks to Layer 3 routing.":"Menelusuri gangguan secara bertahap, dari pemeriksaan fisik hingga routing Layer 3.", "Configuring routers, DHCP servers, and access points via MikroTik ecosystem.":"Mengonfigurasi router, server DHCP, dan access point dengan ekosistem MikroTik.", "Breaking down complex technical concepts for non-technical users.":"Menjelaskan konsep teknis yang kompleks dengan bahasa yang mudah dipahami." } as Record<string,string>)[t.desc] : t.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Profile photo + highlight cards */}
          <div className="hidden lg:flex flex-col gap-6 items-center mt-4">

            {/* Profile photo */}
            <div className="reveal w-full flex justify-center">
              <div className="relative w-88 xl:w-96 rounded-[2.5rem] overflow-hidden flex-shrink-0"
                style={{
                  aspectRatio: "3/4",
                  border: "1.5px solid rgba(255,255,255,0.60)",
                  boxShadow: "0 8px 40px rgba(74,100,144,0.18), inset 0 1px 0 rgba(255,255,255,0.70)",
                  background: "rgba(74,100,144,0.10)",
                }}>
                {/* Emoji fallback */}
                <div className="absolute inset-0 flex items-center justify-center text-7xl opacity-30 select-none">👤</div>
                <img loading="lazy" decoding="async"
                  src="/images/profile/1.webp"
                  alt="Elbon Aminalloh"
                  className="absolute inset-0 w-full h-full object-cover z-10"
                  onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
            </div>

            {/* Highlight cards */}
            <div className="reveal glass-card w-full p-8 rounded-[2rem]">
              <h4 className="font-display text-2xl mb-3" style={{ color: "var(--text-1)" }}>{copy(language, "Problem Solving First", "Mengutamakan Pemecahan Masalah")}</h4>
              <p className="text-sm opacity-80" style={{ color: "var(--text-2)" }}>{copy(language, "I don't just set up networks; I identify bottlenecks, map out structured cabling, and build robust DHCP/WLAN configurations that last.", "Saya tidak hanya memasang jaringan; saya mencari sumber hambatan, merancang jalur kabel, dan membangun konfigurasi DHCP/WLAN yang andal.")}</p>
            </div>

            <div className="reveal glass-card w-full p-8 rounded-[2rem]">
              <h4 className="font-display text-2xl mb-3" style={{ color: "var(--text-1)" }}>{copy(language, "End-to-End Delivery", "Pengerjaan Menyeluruh")}</h4>
              <p className="text-sm opacity-80" style={{ color: "var(--text-2)" }}>{copy(language, "From climbing ladders and pulling Cat5e cables to typing out MikroTik firewall rules, I enjoy handling the entire stack of IT infrastructure.", "Mulai dari menarik kabel Cat5e hingga mengatur firewall MikroTik, saya senang menangani berbagai tahap infrastruktur TI.")}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
