"use client";
import { useEffect, useState } from "react";
export default function LoadingScreen() {
  const [phase, setPhase] = useState<"in"|"out"|"gone">("in");
  useEffect(() => {
    const t1=setTimeout(()=>setPhase("out"),1700);
    const t2=setTimeout(()=>setPhase("gone"),2350);
    return()=>{clearTimeout(t1);clearTimeout(t2);};
  },[]);
  if (phase==="gone") return null;
  return (
    <div aria-hidden="true" style={{position:"fixed",inset:0,zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg,#EDD8C4 0%,#D4C4B8 35%,#A8B8D0 65%,#8BA4C8 100%)",transition:"opacity 0.55s ease",opacity:phase==="out"?0:1,pointerEvents:phase==="out"?"none":"auto"}}>
      <div style={{position:"absolute",width:300,height:300,borderRadius:"50%",top:"15%",left:"5%",background:"radial-gradient(circle,rgba(242,224,208,0.55),transparent 70%)",filter:"blur(60px)"}}/>
      <div style={{position:"absolute",width:250,height:250,borderRadius:"50%",bottom:"15%",right:"5%",background:"radial-gradient(circle,rgba(110,136,176,0.50),transparent 70%)",filter:"blur(60px)"}}/>
      <div style={{position:"relative",display:"flex",flexDirection:"column",alignItems:"center",gap:18}}>
        <div style={{position:"relative",animation:"ls_pulse 2s ease-in-out infinite"}}>
          <div style={{position:"absolute",inset:-4,borderRadius:20,border:"1px solid rgba(255,255,255,0.60)",animation:"ls_ring 2s ease-out infinite"}}/>
          <div style={{width:68,height:68,borderRadius:18,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(255,255,255,0.35)",backdropFilter:"blur(20px)",borderTop:"1px solid rgba(255,255,255,0.90)",borderLeft:"1px solid rgba(255,255,255,0.58)",borderRight:"1px solid rgba(255,255,255,0.32)",borderBottom:"1px solid rgba(255,255,255,0.16)",boxShadow:"0 8px 32px rgba(74,100,144,0.18),inset 0 1px 0 rgba(255,255,255,0.92)"}}>
            <span style={{fontFamily:"'DM Serif Display',serif",fontSize:28,color:"#4A6490"}}>E</span>
          </div>
        </div>
        <div style={{textAlign:"center"}}>
          <p style={{fontFamily:"'DM Serif Display',serif",fontSize:20,color:"#1E2640",animation:"ls_fadeup 0.7s ease 0.25s both",margin:0}}>Elbon</p>
          <p style={{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"#7080A8",letterSpacing:"0.18em",textTransform:"uppercase",animation:"ls_fadeup 0.7s ease 0.4s both",margin:"4px 0 0"}}>Network Technician</p>
        </div>
        <div style={{width:120,height:2,borderRadius:999,overflow:"hidden",background:"rgba(74,100,144,0.15)",animation:"ls_fadeup 0.5s ease 0.35s both"}}>
          <div style={{height:"100%",borderRadius:999,background:"linear-gradient(90deg,#F2E0D0,#C89878,#6E88B0,#4A6490)",backgroundSize:"300% 100%",animation:"ls_bar 1.55s ease 0.1s forwards,ls_shift 1.4s linear 0.1s infinite"}}/>
        </div>
      </div>
      <style>{`@keyframes ls_pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}@keyframes ls_ring{0%{transform:scale(1);opacity:.7}100%{transform:scale(1.9);opacity:0}}@keyframes ls_fadeup{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}@keyframes ls_bar{from{width:0}to{width:100%}}@keyframes ls_shift{0%{background-position:300% 0}100%{background-position:-300% 0}}`}</style>
    </div>
  );
}
