"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

// Stylized Package
function PackageModel(props: React.ComponentProps<"group">) {
  return (
    <group {...props}>
      <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.4} />
      </mesh>
      {/* Tape */}
      <mesh position={[0, 1.01, 0]}>
        <planeGeometry args={[1, 0.2]} />
        <meshStandardMaterial color="#d97706" />
      </mesh>
    </group>
  );
}

// Stylized Truck
function TruckModel(props: React.ComponentProps<"group">) {
  return (
    <group {...props}>
      {/* Main Trailer Body */}
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 2, 1.5]} />
        <meshStandardMaterial color="#2563eb" roughness={0.2} metalness={0.1} />
      </mesh>
      {/* Detail: Cabin/Front */}
      <mesh position={[2.5, 0.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[1, 1.5, 1.5]} />
        <meshStandardMaterial color="#1e3a8a" roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Wheels */}
      {[-1.5, 1, 2.5].map((x) => (
        <group key={x}>
          <mesh position={[x, 0.25, 0.8]} castShadow>
            <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
            <meshStandardMaterial color="#0f172a" roughness={0.8} />
          </mesh>
          <mesh position={[x, 0.25, -0.8]} castShadow>
            <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
            <meshStandardMaterial color="#0f172a" roughness={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Stylized Vessel
function ShipModel(props: React.ComponentProps<"group">) {
  return (
    <group {...props}>
      {/* Hull */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[6, 1, 2]} />
        <meshStandardMaterial color="#b91c1c" roughness={0.5} />
      </mesh>
      {/* Bridge */}
      <mesh position={[-2, 1.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 1, 1.5]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.1} />
      </mesh>
      {/* Containers */}
      <mesh position={[1, 1.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.5, 1.5]} />
        <meshStandardMaterial color="#2563eb" roughness={0.2} />
      </mesh>
    </group>
  );
}

function JourneyScene() {
  const groupRef = useRef<THREE.Group>(null);
  const { camera, pointer } = useThree();
  const targetCameraPos = useRef(new THREE.Vector3(5, 3, 5));

  useFrame((state, delta) => {
    // A subtle narrative time loop
    const t = state.clock.elapsedTime;

    // Mouse parallax effect
    const parallaxX = pointer.x * 2;
    const parallaxY = pointer.y * 1;

    targetCameraPos.current.set(
      5 + parallaxX,
      3 + parallaxY,
      5
    );

    // Smoothly interpolate camera position
    camera.position.lerp(targetCameraPos.current, delta * 2);
    camera.lookAt(0, 0, 0);

    if (groupRef.current) {
      // Gentle rotation to show all angles
      groupRef.current.rotation.y = t * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <group position={[0, 0, 0]}>
          {/* We position the items in a circular or staggered layout */}
          <PackageModel position={[-2, 0, 2]} scale={0.6} />
          <TruckModel position={[0, 0, -1]} scale={0.7} />
          <ShipModel position={[3, 0, 1]} scale={0.4} />
        </group>
      </Float>
    </group>
  );
}

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [5, 3, 5], fov: 45 }}
      dpr={[1, 2]} // Capped for performance
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#3b82f6" />

      <JourneyScene />

      <ContactShadows position={[0, -0.5, 0]} opacity={0.5} scale={15} blur={2.5} far={4} />

      {/* Studio lighting environment */}
      <Environment preset="city" />
    </Canvas>
  );
}
