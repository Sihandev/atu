"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { Pause, Play, Rotate3D } from "lucide-react";
const Studio = dynamic(()=>import("./TransportStudio"),{ssr:false,loading:()=> <Fallback />});
function Fallback(){return <Image src="/img/hero-car-carrier.jpg" alt="Armada pengangkut kendaraan" fill unoptimized className="studio-fallback"/>;}
class SceneBoundary extends Component<{children:ReactNode},{failed:boolean}>{
  state={failed:false}; static getDerivedStateFromError(){return {failed:true};}
  render(){return this.state.failed?<Fallback/>:this.props.children;}
}
export function InteractiveFleet(){
  const host=useRef<HTMLDivElement>(null);
  const [active,setActive]=useState(false);
  const [rotate,setRotate]=useState(false);
  useEffect(()=>{
    const element=host.current;
    if(!element || matchMedia("(prefers-reduced-motion: reduce)").matches)return;
    const move=(event:PointerEvent)=>{
      const bounds=element.getBoundingClientRect();
      element.style.setProperty("--spot-x",`${event.clientX-bounds.left}px`);
      element.style.setProperty("--spot-y",`${event.clientY-bounds.top}px`);
    };
    element.addEventListener("pointermove",move);
    return()=>element.removeEventListener("pointermove",move);
  },[]);
  useEffect(()=>{const media=matchMedia("(prefers-reduced-motion: reduce)"); const decide=()=>setRotate(!media.matches);decide();media.addEventListener("change",decide);const observer=new IntersectionObserver(([entry])=>setActive(entry.isIntersecting),{rootMargin:"60px"});if(host.current)observer.observe(host.current);const visibility=()=>setActive(!document.hidden && !!host.current && host.current.getBoundingClientRect().bottom>0);document.addEventListener("visibilitychange",visibility);return()=>{observer.disconnect();media.removeEventListener("change",decide);document.removeEventListener("visibilitychange",visibility);};},[]);
  return <div className="interactive-fleet" ref={host}><div className="studio-orbit orbit-one"/><div className="studio-orbit orbit-two"/><div className="studio-topline"><span><i/> ARMADA KAMI</span><span>TRUK CAR CARRIER</span></div><div className="studio-stage"><SceneBoundary><Studio active={active} rotate={rotate}/></SceneBoundary></div><div className="studio-caption"><div><Rotate3D size={16}/><span>Geser untuk memutar truk</span></div><button type="button" onClick={()=>setRotate(!rotate)} aria-label={rotate?"Jeda putaran 3D":"Putar model 3D"}>{rotate?<Pause size={15}/>:<Play size={15}/>}</button></div><div className="studio-badge"><span>DARAT + LAUT</span><strong>Satu partner.<br/>Seluruh perjalanan.</strong></div></div>;
}
