const ITEMS = [
  { text:"MikroTik RouterOS", icon:"📡" },{ text:"LAN / WLAN Setup", icon:"🌐" },
  { text:"DHCP Configuration", icon:"⚙️" },{ text:"Winbox Diagnostics", icon:"🔍" },
  { text:"Cat5e / Cat6 Cabling", icon:"🔌" },{ text:"Fault Isolation (OSI)", icon:"🛠️" },
  { text:"HTML · CSS · JavaScript", icon:"💻" },{ text:"Ruz Store Website", icon:"🛒" },
  { text:"SMKS Yaspih Rajeg", icon:"🏫" },{ text:"TKJ — Network Engineering", icon:"🎓" },
];
const TRACK = [...ITEMS,...ITEMS];

export default function MarqueeBar() {
  return (
    <div className="relative w-full overflow-hidden py-3 select-none"
      style={{ borderTop:"1px solid var(--lg-border-bot)", borderBottom:"1px solid var(--lg-border-bot)", background:"var(--lg-bg-card)", backdropFilter:"blur(6px)", WebkitBackdropFilter:"blur(6px)" }}>
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background:"linear-gradient(to right,var(--bg),transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background:"linear-gradient(to left,var(--bg),transparent)" }} />
      <style>{`@keyframes mq{from{transform:translateX(0)}to{transform:translateX(-50%)}}.mq{display:flex;width:max-content;animation:mq 32s linear infinite}.mq:hover{animation-play-state:paused}`}</style>
      <div className="mq">
        {TRACK.map((item,i) => (
          <div key={i} className="flex items-center gap-2 mx-5 text-sm whitespace-nowrap group cursor-default" style={{ color:"var(--text-3)" }}>
            <span className="transition-transform duration-200 group-hover:scale-125 group-hover:-translate-y-0.5 inline-block">{item.icon}</span>
            <span className="transition-colors duration-200 group-hover:text-[var(--primary)]">{item.text}</span>
            <span className="ml-4 w-1 h-1 rounded-full inline-block" style={{ background:"rgba(74,100,144,0.25)" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
