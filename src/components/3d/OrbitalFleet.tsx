"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, RoundedBox } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

type CarProps = {
  color: string;
  position: [number, number, number];
  scale?: number;
  phase?: number;
};

function Car({ color, position, scale = 1, phase = 0 }: CarProps) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.65 + phase) * 0.045;
  });

  return (
    <group ref={group} position={position} scale={scale}>
      <RoundedBox args={[2.25, 0.48, 0.95]} radius={0.18} smoothness={4} castShadow>
        <meshPhysicalMaterial color={color} metalness={0.7} roughness={0.2} clearcoat={1} clearcoatRoughness={0.12} />
      </RoundedBox>
      <RoundedBox args={[1.18, 0.38, 0.82]} radius={0.16} smoothness={4} position={[-0.1, 0.36, 0]} castShadow>
        <meshPhysicalMaterial color={color} metalness={0.65} roughness={0.18} clearcoat={1} />
      </RoundedBox>
      <mesh position={[-0.12, 0.39, 0.42]}>
        <boxGeometry args={[0.78, 0.22, 0.02]} />
        <meshPhysicalMaterial color="#0b1220" roughness={0.08} transmission={0.18} />
      </mesh>
      {[-0.72, 0.72].map((x) =>
        [-0.5, 0.5].map((z) => (
          <group key={`${x}-${z}`} position={[x, -0.29, z * 0.82]} rotation={[Math.PI / 2, 0, 0]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.24, 0.24, 0.18, 24]} />
              <meshStandardMaterial color="#101114" metalness={0.4} roughness={0.55} />
            </mesh>
            <mesh position={[0, 0.1, 0]}>
              <cylinderGeometry args={[0.11, 0.11, 0.19, 16]} />
              <meshStandardMaterial color="#cbd1d8" metalness={0.95} roughness={0.18} />
            </mesh>
          </group>
        )),
      )}
      <mesh position={[-1.12, 0, 0]}>
        <boxGeometry args={[0.03, 0.12, 0.62]} />
        <meshStandardMaterial color="#e7efff" emissive="#d9e7ff" emissiveIntensity={0.7} />
      </mesh>
      <mesh position={[1.12, 0, 0]}>
        <boxGeometry args={[0.03, 0.1, 0.58]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.7} />
      </mesh>
    </group>
  );
}

function Carrier() {
  const rig = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!rig.current) return;
    rig.current.rotation.y = -0.3 + Math.sin(clock.elapsedTime * 0.28) * 0.025;
  });

  const cobalt = "#1557e8";
  const steel = "#1d2735";

  return (
    <group ref={rig} position={[0.7, -0.7, 0]} rotation={[0.02, -0.3, 0]}>
      <group position={[1.9, -0.1, 0]}>
        <RoundedBox args={[2.1, 1.3, 1.55]} radius={0.18} smoothness={4} castShadow>
          <meshPhysicalMaterial color={cobalt} metalness={0.7} roughness={0.24} clearcoat={1} />
        </RoundedBox>
        <RoundedBox args={[0.72, 0.58, 1.42]} radius={0.1} smoothness={3} position={[-0.46, 0.28, 0]}>
          <meshPhysicalMaterial color="#101827" roughness={0.08} transmission={0.12} />
        </RoundedBox>
      </group>

      <RoundedBox args={[5.8, 0.28, 1.6]} radius={0.08} smoothness={3} position={[-0.65, -0.57, 0]} castShadow>
        <meshStandardMaterial color={steel} metalness={0.85} roughness={0.32} />
      </RoundedBox>
      <RoundedBox args={[5.5, 0.12, 1.5]} radius={0.04} smoothness={2} position={[-0.95, 0.52, 0]} castShadow>
        <meshStandardMaterial color={cobalt} metalness={0.75} roughness={0.28} />
      </RoundedBox>

      {[-3.25, -1.85, -0.45, 0.95].map((x) => (
        <group key={x}>
          {[-0.72, 0.72].map((z) => (
            <mesh key={z} position={[x, -0.78, z]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.38, 0.38, 0.25, 28]} />
              <meshStandardMaterial color="#111318" metalness={0.45} roughness={0.5} />
            </mesh>
          ))}
        </group>
      ))}

      {[-3.35, -1.75, -0.15, 1.15].map((x) => (
        <group key={`frame-${x}`}>
          <mesh position={[x, 0.02, -0.72]}>
            <boxGeometry args={[0.11, 1.1, 0.11]} />
            <meshStandardMaterial color={cobalt} metalness={0.78} roughness={0.3} />
          </mesh>
          <mesh position={[x, 0.02, 0.72]}>
            <boxGeometry args={[0.11, 1.1, 0.11]} />
            <meshStandardMaterial color={cobalt} metalness={0.78} roughness={0.3} />
          </mesh>
        </group>
      ))}

      <Car color="#f4f0e8" position={[-2.5, -0.18, 0]} scale={0.68} phase={0.5} />
      <Car color="#10141d" position={[-0.85, -0.18, 0]} scale={0.68} phase={1.5} />
      <Car color="#aeb7c4" position={[-2.3, 0.9, 0]} scale={0.68} phase={2.5} />
    </group>
  );
}

function RouteOrbit() {
  const lineRef = useRef<THREE.Mesh>(null);
  const particle = useRef<THREE.Mesh>(null);

  const { geometry, curve } = useMemo(() => {
    const curveValue = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(-5.5, -2.1, -1.8),
        new THREE.Vector3(-2.8, 1.9, -2.4),
        new THREE.Vector3(1.5, 2.45, -2),
        new THREE.Vector3(5.2, -0.6, -1.5),
      ],
      false,
      "catmullrom",
      0.35,
    );
    return {
      curve: curveValue,
      geometry: new THREE.TubeGeometry(curveValue, 96, 0.025, 8, false),
    };
  }, []);

  useFrame(({ clock }) => {
    if (lineRef.current) lineRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.18) * 0.02;
    if (particle.current) {
      const point = curve.getPoint((clock.elapsedTime * 0.065) % 1);
      particle.current.position.copy(point);
    }
  });

  return (
    <group>
      <mesh ref={lineRef} geometry={geometry}>
        <meshBasicMaterial color="#165dff" transparent opacity={0.5} />
      </mesh>
      <mesh ref={particle}>
        <sphereGeometry args={[0.11, 16, 16]} />
        <meshBasicMaterial color="#67a0ff" />
        <pointLight color="#2868ff" intensity={2.4} distance={2.8} />
      </mesh>
    </group>
  );
}

function CameraRig() {
  const { camera, pointer } = useThree();
  const cameraRef = useRef(camera);

  useFrame(() => {
    const activeCamera = cameraRef.current;
    const targetX = 7.4 + pointer.x * 0.35;
    const targetY = 3.3 + pointer.y * 0.18;
    activeCamera.position.x = THREE.MathUtils.lerp(activeCamera.position.x, targetX, 0.035);
    activeCamera.position.y = THREE.MathUtils.lerp(activeCamera.position.y, targetY, 0.035);
    activeCamera.lookAt(0, -0.1, 0);
  });
  return null;
}

function Scene() {
  return (
    <>
      <fog attach="fog" args={["#f5f0e7", 10, 18]} />
      <ambientLight intensity={1.35} />
      <directionalLight position={[4, 8, 6]} intensity={3.4} color="#fff2df" castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-5, 2, -4]} intensity={2.2} color="#3a6cff" />
      <pointLight position={[2, 1, 4]} intensity={2.2} color="#ffffff" />
      <RouteOrbit />
      <Carrier />
      <ContactShadows position={[0, -1.55, 0]} opacity={0.32} scale={12} blur={2.6} far={5} color="#41506b" />
      <CameraRig />
    </>
  );
}

export function OrbitalFleet() {
  return (
    <div className="relative h-full min-h-[430px] w-full overflow-hidden">
      <Canvas
        shadows
        dpr={[1, 1.6]}
        camera={{ position: [7.4, 3.3, 8.8], fov: 36 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ position: "relative", opacity: 0, pointerEvents: "none" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      <div className="pointer-events-none absolute left-[8%] top-[17%] rounded-full border border-blue-600/25 bg-white/55 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-blue-800 backdrop-blur-md">
        Jakarta / JKT
      </div>
      <div className="pointer-events-none absolute bottom-[19%] right-[5%] rounded-full border border-blue-600/25 bg-white/55 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-blue-800 backdrop-blur-md">
        Makassar / MKS
      </div>
    </div>
  );
}
