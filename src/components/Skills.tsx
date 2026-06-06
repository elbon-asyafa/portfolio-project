import { useEffect, useRef } from "react";
const G=[{cat:"Networking",icon:"🌐",s:[{n:"MikroTik/RouterOS",v:85},{n:"LAN/WLAN Setup",v:90},{n:"DHCP Config",v:88},{n:"Cable Routing",v:80}]},{cat:"Diagnostics",icon:"🔍",s:[{n:"Winbox",v:85},{n:"Ping & Tracert",v:90},{n:"Fault Isolation",v:78},{n:"ONT/ODP Config",v:80}]},{cat:"Tools",icon:"🛠️",s:[{n:"Winbox UI",v:85},{n:"Windows OS",v:88},{n:"Android Hotspot",v:75},{n:"Fiber Splicing",v:78}]},{cat:"Soft Skills",icon:"🤝",s:[{n:"Problem Solving",v:92},{n:"Communication",v:88},{n:"Teamwork",v:85},{n:"Documentation",v:75}]},{cat:"Video Editing",icon:"🎬",s:[{n:"Premiere Pro",v:70},{n:"Alight Motion",v:78},{n:"CapCut",v:82},{n:"Basic Videography",v:75}]},{cat:"Photo Editing",icon:"📸",s:[{n:"Lightroom",v:75},{n:"Snapseed",v:80},{n:"Canva",v:72},{n:"Basic Photography",v:85}]}];

function Bar({name,level}:{name:string;level:number}) {
  const r=useRef<HTMLDivElement>(null);
  useEffect(()=>{const obs=new IntersectionObserver(e=>{if(e[0].isIntersecting){setTimeout(()=>{if(r.current)r.current.style.width=`${level}%`},80);obs.disconnect();}},{threshold:0.5});if(r.current)obs.observe(r.current);return()=>obs.disconnect();},[level]);
  return(
    <div className="group space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-xs" style={{color:"var(--text-2)"}}>{name}</span>
        <span className="font-mono text-[10px] opacity-0 group-hover:opacity-100 transition-opacity" style={{color:"var(--primary)"}}>{level}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{background:"rgba(74,100,144,0.15)"}}>
        <div ref={r} className="h-full rounded-full transition-all duration-1000 ease-out" style={{width:"0%",background:"linear-gradient(90deg,var(--primary),var(--secondary))"}} />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref=useRef<HTMLElement>(null);
  useEffect(()=>{const obs=new IntersectionObserver(e=>{if(e[0].isIntersecting){ref.current?.querySelectorAll(".reveal").forEach((el,i)=>setTimeout(()=>el.classList.add("in"),i*70));obs.disconnect();}},{threshold:0.05});if(ref.current)obs.observe(ref.current);return()=>obs.disconnect();},[]);
  return(
    <section id="skills" ref={ref} className="relative py-24">
      <div className="sp sp-inner">
        <div className="reveal mb-14">
          <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{color:"var(--primary)"}}>Capabilities</p>
          <h2 className="font-display text-3xl sm:text-4xl mb-3" style={{color:"var(--text-1)"}}>Skills & Tools</h2>
          <div className="w-10 h-0.5 rounded-full" style={{background:"linear-gradient(90deg,var(--primary),var(--secondary))"}} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {G.map(g=>(
            <div key={g.cat} className="reveal glass-card p-6 rounded-2xl">
              <div className="flex items-center gap-2 mb-5"><span className="text-xl">{g.icon}</span><h3 className="font-medium text-sm" style={{color:"var(--text-1)"}}>{g.cat}</h3></div>
              <div className="space-y-4">{g.s.map(s=><Bar key={s.n} name={s.n} level={s.v}/>)}</div>
            </div>
          ))}
        </div>
        <div className="reveal mt-6 p-5 rounded-2xl glass-card">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex-1"><h4 className="font-medium text-sm mb-1" style={{color:"var(--text-1)"}}>Currently Learning</h4><p className="text-sm" style={{color:"var(--text-3)"}}>VLAN, firewall rules, and network security on MikroTik.</p></div>
            <div className="flex gap-2 flex-wrap">{["VLAN","Firewall","Network Security"].map(t=><span key={t} className="font-mono text-xs px-3 py-1 rounded-full glass-btn" style={{color:"var(--primary)"}}>{t}</span>)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}