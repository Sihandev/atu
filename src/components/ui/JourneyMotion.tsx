"use client";
import { useEffect } from "react";
export function JourneyMotion(){
  useEffect(()=>{if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
    const elements=document.querySelectorAll('.section-heading,.fleet-showcase,.care-grid,.route-editorial,.process-grid article,.faq-editorial,.express-final');
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.animate([{opacity:0,transform:'translateY(28px)'},{opacity:1,transform:'translateY(0)'}],{duration:750,easing:'cubic-bezier(.16,1,.3,1)',fill:'both'});observer.unobserve(entry.target);}}),{threshold:.12});elements.forEach(el=>observer.observe(el));return()=>observer.disconnect();
  },[]);return null;
}
