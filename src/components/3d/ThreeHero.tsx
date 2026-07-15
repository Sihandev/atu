"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

// Dynamically import the 3D scene so it's not SSR'd and lazy-loaded
const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => <SceneFallback />,
});

// A lightweight CSS/HTML fallback when JS is loading or reduced motion is preferred
function SceneFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-slate-50/50 rounded-2xl border border-slate-100">
      <div className="flex flex-col items-center text-slate-400">
        <Loader2 className="h-8 w-8 animate-spin mb-4" />
        <p className="text-sm font-medium">Memuat Interaktif 3D...</p>
      </div>
    </div>
  );
}

function StaticFallback() {
   return (
    <div className="flex h-full w-full items-center justify-center bg-blue-50 rounded-2xl border border-blue-100 overflow-hidden relative">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600 via-transparent to-transparent" />
      <div className="relative z-10 w-32 h-16 bg-blue-600 rounded-lg shadow-2xl rotate-[-10deg] transform hover:rotate-0 transition-transform duration-500 flex items-center justify-end pr-4">
          <div className="w-8 h-12 bg-blue-800 rounded-md shadow-inner" />
      </div>
    </div>
  );
}


export function ThreeHero() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean | null>(null);

  useEffect(() => {
    // Check initially on mount
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Setting state outside the synchronous effect body using a small timeout avoids
    // the "calling setState synchronously within an effect" warning.
    const initialMatch = mediaQuery.matches;
    setTimeout(() => {
       setPrefersReducedMotion(initialMatch);
    }, 0);

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // Avoid hydration mismatch by waiting for client side check
  if (prefersReducedMotion === null) {
     return <SceneFallback />;
  }

  return (
    <div className="relative h-[400px] lg:h-[600px] w-full rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing">
      {/* Fallback for reduced motion users or mobile extreme battery save */}
      {prefersReducedMotion ? (
        <StaticFallback />
      ) : (
        <Scene />
      )}
    </div>
  );
}
