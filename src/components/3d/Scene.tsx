"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, PresentationControls, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

// A procedural, stylized box representing a package or a stylized truck component
function StylizedPackage() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle floating rotation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Main Body */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[3, 1.5, 1.5]} />
          <meshStandardMaterial color="#2563eb" roughness={0.2} metalness={0.1} />
        </mesh>

        {/* Detail: Cabin/Front */}
        <mesh position={[1.5, -0.25, 0]} castShadow>
          <boxGeometry args={[1, 1, 1.5]} />
          <meshStandardMaterial color="#1e3a8a" roughness={0.3} metalness={0.1} />
        </mesh>

        {/* Wheels placeholder */}
        {[-1, 1].map((x) => (
          <group key={x}>
            <mesh position={[x, -0.75, 0.8]} castShadow>
              <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
              <meshStandardMaterial color="#0f172a" roughness={0.8} />
            </mesh>
            <mesh position={[x, -0.75, -0.8]} castShadow>
              <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
              <meshStandardMaterial color="#0f172a" roughness={0.8} />
            </mesh>
          </group>
        ))}
      </Float>
    </group>
  );
}

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [5, 3, 5], fov: 45 }}
      dpr={[1, 2]} // Support for high-dpi screens but capped for performance
      gl={{ antialias: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

      <PresentationControls
        global
        rotation={[0, 0.3, 0]}
        polar={[-0.2, 0.2]}
        azimuth={[-Math.PI / 4, Math.PI / 4]}
      >
        <StylizedPackage />
      </PresentationControls>

      <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />

      {/* Studio lighting environment */}
      <Environment preset="city" />
    </Canvas>
  );
}
