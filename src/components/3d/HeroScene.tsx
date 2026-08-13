"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

/* Palette — mirrors the CSS tokens exactly */
const INK = "#090b2b";
const INK_2 = "#151a50";
const PAPER = "#eef4ff";
const OXIDE = "#6928b4";

const EASE = 0.045; // damping for pointer follow — deliberately heavy

/**
 * Sedan silhouette as a 2D profile. Extruded with a bevel it reads as a
 * designed object rather than a crude 3D car — abstraction beats a bad model.
 */
function useCarGeometry() {
  return useMemo(() => {
    const s = new THREE.Shape();
    const floor = 0.32;

    s.moveTo(-2.1, floor);
    s.lineTo(1.95, floor);
    s.quadraticCurveTo(2.32, floor, 2.34, floor + 0.24); // front bumper
    s.quadraticCurveTo(2.36, floor + 0.42, 2.18, floor + 0.46); // bonnet nose
    s.lineTo(1.24, floor + 0.54); // bonnet
    s.quadraticCurveTo(0.92, floor + 0.56, 0.66, floor + 0.9); // windscreen
    s.lineTo(0.16, floor + 1.06);
    s.lineTo(-0.72, floor + 1.08); // roof
    s.quadraticCurveTo(-1.12, floor + 1.06, -1.38, floor + 0.72); // rear glass
    s.lineTo(-1.92, floor + 0.6); // boot
    s.quadraticCurveTo(-2.22, floor + 0.56, -2.24, floor + 0.32);
    s.quadraticCurveTo(-2.26, floor + 0.02, -2.1, floor); // rear bumper
    s.closePath();

    const geo = new THREE.ExtrudeGeometry(s, {
      depth: 1.68,
      bevelEnabled: true,
      bevelThickness: 0.09,
      bevelSize: 0.09,
      bevelSegments: 6,
      curveSegments: 24,
    });
    geo.translate(0, 0, -0.84); // centre on Z
    geo.computeVertexNormals();
    return geo;
  }, []);
}

function Wheel({ x, z }: { x: number; z: number }) {
  return (
    <mesh position={[x, 0.42, z]} rotation={[Math.PI / 2, 0, 0]} castShadow>
      <cylinderGeometry args={[0.42, 0.42, 0.17, 40]} />
      <meshStandardMaterial color={INK_2} roughness={0.75} metalness={0.1} />
    </mesh>
  );
}

function Vehicle() {
  const group = useRef<THREE.Group>(null);
  const scroll = useRef(0);
  const geometry = useCarGeometry();

  useFrame(({ clock, pointer }, delta) => {
    const g = group.current;
    if (!g) return;

    // Scroll pushes the object round a further 20°, damped.
    const progress =
      typeof window === "undefined"
        ? 0
        : Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
    scroll.current += (progress - scroll.current) * EASE;

    // Idle: a constant, slow turn. No sine float — motion must feel weighted.
    const idle = clock.elapsedTime * 0.08;
    const targetY = idle + scroll.current * 0.35 + pointer.x * 0.14;
    const targetX = 0.04 - pointer.y * 0.06 + scroll.current * 0.12;

    g.rotation.y += (targetY - g.rotation.y) * EASE * 4;
    g.rotation.x += (targetX - g.rotation.x) * EASE;
    g.position.y = -0.42 - scroll.current * 0.3;

    // keep delta referenced so frameloop stays time-based under throttling
    void delta;
  });

  return (
    <group ref={group} position={[0, -0.42, 0]} rotation={[0.04, 0.5, 0]}>
      <mesh geometry={geometry} castShadow receiveShadow>
        {/* Matte clearcoat: low roughness coat over a deep matte base */}
        <meshPhysicalMaterial
          color={INK}
          roughness={0.48}
          metalness={0.15}
          clearcoat={0.85}
          clearcoatRoughness={0.28}
          envMapIntensity={0.9}
        />
      </mesh>

      <Wheel x={1.34} z={0.86} />
      <Wheel x={1.34} z={-0.86} />
      <Wheel x={-1.3} z={0.86} />
      <Wheel x={-1.3} z={-0.86} />

      {/* A single oxide hairline along the flank — ties the object to the 2D system */}
      <mesh position={[0, 0.52, 0.855]}>
        <boxGeometry args={[3.5, 0.014, 0.01]} />
        <meshBasicMaterial color={OXIDE} />
      </mesh>
      <mesh position={[0, 0.52, -0.855]}>
        <boxGeometry args={[3.5, 0.014, 0.01]} />
        <meshBasicMaterial color={OXIDE} />
      </mesh>
    </group>
  );
}

export function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [3.6, 1.35, 5.6], fov: 34 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        {/* Studio environment built from lightformers — no HDRI fetch, no network weight */}
        <Environment resolution={256}>
          <Lightformer intensity={2.4} position={[0, 4, 2]} scale={[8, 4, 1]} color="#ffffff" />
          <Lightformer intensity={1.1} position={[-4, 2, 2]} scale={[4, 6, 1]} color={PAPER} />
          <Lightformer intensity={0.9} position={[4, 1, -2]} scale={[4, 4, 1]} color="#d8c8ff" />
        </Environment>

        <ambientLight intensity={0.5} />
        {/* Key: warm area light from upper right, long soft shadow toward camera */}
        <directionalLight position={[4.5, 6, 3]} intensity={2.2} color="#dff8ff" castShadow />
        {/* Violet rim follows the logo's express gradient. */}
        <directionalLight position={[-5, 2, -3]} intensity={1.4} color={OXIDE} />

        <Vehicle />

        <ContactShadows
          position={[0, -0.44, 0]}
          opacity={0.42}
          scale={14}
          blur={2.6}
          far={4}
          resolution={512}
          color={INK}
        />
      </Suspense>
    </Canvas>
  );
}

export default HeroScene;
