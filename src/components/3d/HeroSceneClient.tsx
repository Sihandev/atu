"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <StaticFallback />,
});

/**
 * Shown while loading, below 1024px, and for reduced-motion.
 * Same silhouette as the 3D object so the swap is never jarring.
 */
function StaticFallback() {
  return (
    <div className="relative grid h-full w-full place-items-center" aria-hidden="true">
      <svg
        viewBox="0 0 480 260"
        className="w-full max-w-[560px]"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <g transform="translate(40 34)">
          {/* body */}
          <path
            d="M8 132 H352 Q392 132 394 110 Q396 92 372 88 L268 78 Q240 44 196 38 L112 36 Q72 38 44 76 L12 88 Q-4 94 0 112 Q2 130 8 132 Z"
            fill="#090b2b"
          />
          {/* glass */}
          <path d="M120 52 L188 52 Q222 56 244 78 L120 74 Z" fill="#eef4ff" opacity="0.14" />
          {/* oxide flank line */}
          <rect x="24" y="104" width="348" height="2" fill="#6928b4" />
          {/* wheels */}
          <circle cx="102" cy="132" r="34" fill="#151a50" />
          <circle cx="102" cy="132" r="13" fill="#eef4ff" opacity="0.16" />
          <circle cx="300" cy="132" r="34" fill="#151a50" />
          <circle cx="300" cy="132" r="13" fill="#eef4ff" opacity="0.16" />
        </g>
        {/* ground rule */}
        <rect x="0" y="200" width="480" height="1" fill="#090b2b" opacity="0.16" />
      </svg>
    </div>
  );
}

export default function HeroSceneClient() {
  const [mode, setMode] = useState<"pending" | "static" | "3d">("pending");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 1024px)");
    const decide = () => setMode(reduced.matches || !wide.matches ? "static" : "3d");
    decide();
    reduced.addEventListener("change", decide);
    wide.addEventListener("change", decide);
    return () => {
      reduced.removeEventListener("change", decide);
      wide.removeEventListener("change", decide);
    };
  }, []);

  if (mode !== "3d") return <StaticFallback />;
  return <HeroScene />;
}
