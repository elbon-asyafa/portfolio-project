import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { copy, useLanguage } from "@/contexts/LanguageContext";

const CERTIFICATES = [
  {
    title: "Internship Certificate",
    subtitle: "Industry internship · FTTH & network operations",
    href: "/images/certification/Certification_Internship_Elbon.pdf",
    fileName: "Certification_Internship_Elbon.pdf",
    icon: "↗",
  },
  {
    title: "Competency Certificate",
    subtitle: "Vocational competency assessment · TKJ",
    href: "/images/certification/Certification_of_Competency_Elbon.pdf",
    fileName: "Certification_of_Competency_Elbon.pdf",
    icon: "✓",
  },
  {
    title: "AI Policy Certificate",
    subtitle: "AI policy and responsible use",
    href: "/images/certification/jagoai_certification_kebijakanai.pdf",
    fileName: "jagoai_certification_kebijakanai.pdf",
    icon: "✳",
  },
];

export default function CertificateCards() {
  const { language } = useLanguage();
  const displayCertificates = CERTIFICATES.map((certificate, index) => language === "id"
    ? { ...certificate, title:["Sertifikat PKL","Sertifikat Kompetensi","Sertifikat Kebijakan AI"][index], subtitle:["Praktik industri · FTTH & operasional jaringan","Uji kompetensi kejuruan · TKJ","Kebijakan AI dan penggunaan yang bertanggung jawab"][index] }
    : certificate);
  const [preview, setPreview] = useState<(typeof CERTIFICATES)[number] | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!preview) return;
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeButton.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPreview(null);
      if (event.key === "Tab") {
        const dialog = document.querySelector<HTMLElement>("[data-certificate-dialog]");
        const focusable = dialog?.querySelectorAll<HTMLElement>('a[href], button:not(:disabled), iframe, [tabindex]:not([tabindex="-1"])');
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [preview]);

  return (
    <>
      <div className="mt-8">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[.2em]" style={{ color: "var(--secondary)" }}>{copy(language, "Credentials", "Kredensial")}</p>
            <h3 className="mt-1 font-display text-2xl sm:text-3xl" style={{ color: "var(--text-1)" }}>{copy(language, "Certificates", "Sertifikat")}</h3>
          </div>
          <span className="font-mono text-[10px]" style={{ color: "var(--text-3)" }}>{copy(language, "03 DOCUMENTS", "03 DOKUMEN")}</span>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {displayCertificates.map((certificate, index) => (
            <article key={certificate.href} className="reveal glass-card group relative flex min-h-[190px] flex-col overflow-hidden rounded-2xl p-5">
              <div className="pointer-events-none absolute -right-7 -top-8 h-24 w-24 rounded-full opacity-40 transition-transform duration-300 group-hover:scale-125"
                style={{ background: "radial-gradient(circle, rgba(110,136,176,.24), transparent 70%)" }} />
              <div className="relative flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl text-lg"
                  style={{ color: "var(--primary)", background: "rgba(255,255,255,.55)", border: "1px solid rgba(255,255,255,.78)" }} aria-hidden="true">
                  {certificate.icon}
                </span>
                <span className="font-mono text-[10px] tracking-widest" style={{ color: "var(--text-3)" }}>0{index + 1} / PDF</span>
              </div>
              <h4 className="relative mt-5 font-medium text-sm" style={{ color: "var(--text-1)" }}>{certificate.title}</h4>
              <p className="relative mt-1 flex-1 text-xs leading-relaxed" style={{ color: "var(--text-3)" }}>{certificate.subtitle}</p>
              <div className="relative mt-4 flex gap-2">
                <button type="button" onClick={() => setPreview(certificate)}
                  className="glass-btn rounded-full px-3 py-1.5 text-[11px]" style={{ color: "var(--text-2)" }}>
                  {copy(language, "View certificate", "Lihat sertifikat")}
                </button>
                <a href={certificate.href} download={certificate.fileName}
                  className="glass-btn rounded-full px-3 py-1.5 text-[11px]" style={{ color: "var(--primary)" }}>
                  {copy(language, "Download", "Unduh")} ↓
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      {preview && createPortal((
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-950/75 p-0 backdrop-blur-sm sm:p-6"
          role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) setPreview(null); }}>
          <section role="dialog" data-certificate-dialog aria-modal="true" aria-labelledby="certificate-preview-title"
            className="flex h-full w-full flex-col overflow-hidden bg-slate-100 shadow-2xl sm:h-[min(92dvh,1000px)] sm:max-w-5xl sm:rounded-3xl">
            <header className="flex min-h-16 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
              <div className="min-w-0">
                <p className="font-mono text-[9px] uppercase tracking-[.16em] text-slate-400">{copy(language, "Certificate preview", "Pratinjau sertifikat")}</p>
                <h2 id="certificate-preview-title" className="truncate text-sm font-semibold text-slate-800 sm:text-base">{preview.title}</h2>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <a href={preview.href} download={preview.fileName}
                  className="rounded-full bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-200 sm:px-4">{copy(language, "Download", "Unduh")}</a>
                <button ref={closeButton} type="button" onClick={() => setPreview(null)} aria-label={copy(language, "Close preview", "Tutup pratinjau")}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-xl text-slate-600 hover:bg-slate-100">×</button>
              </div>
            </header>
            <iframe key={preview.href} src={`${preview.href}#view=FitH`} title={`${preview.title} ${copy(language, "PDF preview", "Pratinjau PDF")}`}
              className="min-h-0 w-full flex-1 border-0 bg-slate-200" />
          </section>
        </div>
      ), document.body)}
    </>
  );
}
