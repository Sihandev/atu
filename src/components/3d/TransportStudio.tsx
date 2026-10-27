"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, OrbitControls, Environment, Lightformer, ContactShadows, Sparkles, useTexture } from "@react-three/drei";
import { createContext, Suspense, useContext, useMemo, useRef } from "react";
import * as THREE from "three";

const Motion = createContext(false);
const SPEED = 2.4;

/* ---------- shared geometry ---------- */
function extrude(shape: THREE.Shape, depth: number, bevel = .04) {
  const geometry = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 4, curveSegments: 28 });
  geometry.translate(0, 0, -depth / 2);
  geometry.computeVertexNormals();
  return geometry;
}
type CarKind = "sedan" | "suv";
const CAR_SPECS = {
  sedan: { wheel: .21, wheelX: .64, track: .37, roof: [.58, -.19, .865] as const, pillar: -.17, belt: .565, nose: .4, tail: .47 },
  suv: { wheel: .24, wheelX: .62, track: .37, roof: [1.02, -.34, 1.065] as const, pillar: -.2, belt: .675, nose: .5, tail: .58 },
};
function carBodyShape(kind: CarKind) {
  const s = new THREE.Shape();
  if (kind === "sedan") {
    s.moveTo(-1, .27);
    s.lineTo(-1.01, .42);
    s.quadraticCurveTo(-1, .52, -.9, .54);
    s.lineTo(-.62, .56);
    s.lineTo(.4, .56);
    s.quadraticCurveTo(.8, .53, .96, .46);
    s.quadraticCurveTo(1.04, .42, 1.04, .32);
    s.lineTo(1.02, .25);
    s.quadraticCurveTo(1.01, .21, .94, .21);
    s.absarc(.64, .21, .3, 0, Math.PI, false);
    s.lineTo(-.34, .21);
    s.absarc(-.64, .21, .3, 0, Math.PI, false);
    s.quadraticCurveTo(-1, .21, -1, .27);
  } else {
    s.moveTo(-1, .3);
    s.lineTo(-1.01, .56);
    s.quadraticCurveTo(-1, .66, -.9, .67);
    s.lineTo(.45, .67);
    s.quadraticCurveTo(.86, .64, .98, .56);
    s.quadraticCurveTo(1.04, .5, 1.04, .38);
    s.lineTo(1.02, .28);
    s.quadraticCurveTo(1.01, .24, .95, .24);
    s.absarc(.62, .24, .33, 0, Math.PI, false);
    s.lineTo(-.29, .24);
    s.absarc(-.62, .24, .33, 0, Math.PI, false);
    s.quadraticCurveTo(-1, .24, -1, .3);
  }
  return s;
}
function carGlassShape(kind: CarKind) {
  const s = new THREE.Shape();
  if (kind === "sedan") {
    s.moveTo(-.8, .54);
    s.quadraticCurveTo(-.64, .75, -.44, .8);
    s.lineTo(.04, .81);
    s.quadraticCurveTo(.2, .8, .3, .72);
    s.lineTo(.5, .55);
    s.lineTo(-.8, .54);
  } else {
    s.moveTo(-.93, .65);
    s.lineTo(-.88, .96);
    s.quadraticCurveTo(-.86, 1.01, -.78, 1.01);
    s.lineTo(.12, 1.01);
    s.quadraticCurveTo(.22, 1.0, .28, .94);
    s.lineTo(.52, .66);
    s.lineTo(-.93, .65);
  }
  return s;
}
function cabShape() {
  const s = new THREE.Shape();
  s.moveTo(2.45, .44);
  s.lineTo(2.45, 2.02);
  s.quadraticCurveTo(2.45, 2.14, 2.6, 2.14);
  s.lineTo(3.3, 2.14);
  s.quadraticCurveTo(3.43, 2.13, 3.47, 2.0);
  s.lineTo(3.72, 1.36);
  s.lineTo(3.98, 1.27);
  s.quadraticCurveTo(4.08, 1.23, 4.08, 1.1);
  s.lineTo(4.08, .54);
  s.quadraticCurveTo(4.08, .44, 3.98, .44);
  s.lineTo(3.72, .44);
  s.absarc(3.22, .44, .5, 0, Math.PI, false);
  s.lineTo(2.45, .44);
  return s;
}

/* ---------- materials ---------- */
const glass = new THREE.MeshPhysicalMaterial({ color: "#0b1622", metalness: .2, roughness: .05, clearcoat: 1, envMapIntensity: 2.2 });
const chrome = new THREE.MeshStandardMaterial({ color: "#e6edf3", metalness: 1, roughness: .16 });
const steel = new THREE.MeshStandardMaterial({ color: "#8d9aa8", metalness: .85, roughness: .32 });
const rubber = new THREE.MeshStandardMaterial({ color: "#1b2027", roughness: .9 });
const rimDark = new THREE.MeshStandardMaterial({ color: "#2a313a", metalness: .7, roughness: .5 });
const piano = new THREE.MeshPhysicalMaterial({ color: "#07090d", metalness: .3, roughness: .25, clearcoat: 1 });
const dark = new THREE.MeshStandardMaterial({ color: "#151d27", metalness: .5, roughness: .45 });
const headlight = new THREE.MeshStandardMaterial({ color: "#ffffff", emissive: "#cfe8ff", emissiveIntensity: 3, toneMapped: false });
const taillight = new THREE.MeshStandardMaterial({ color: "#ff2b44", emissive: "#ff2b44", emissiveIntensity: 2.4, toneMapped: false });
const amber = new THREE.MeshStandardMaterial({ color: "#ffb347", emissive: "#ff9a1f", emissiveIntensity: 2, toneMapped: false });

const tyreCache = new Map<string, THREE.LatheGeometry>();
function tyreGeometry(size: number, width: number) {
  const key = `${size}-${width}`;
  if (!tyreCache.has(key)) {
    const h = width / 2, inner = size * .66;
    const profile = [
      [inner, -h * .9], [size * .86, -h], [size * .96, -h * .9], [size, -h * .55],
      [size, h * .55], [size * .96, h * .9], [size * .86, h], [inner, h * .9],
    ].map(([x, y]) => new THREE.Vector2(x, y));
    tyreCache.set(key, new THREE.LatheGeometry(profile, 40));
  }
  return tyreCache.get(key)!;
}

function Wheel({ x, z, size = .22, width = size * .68, fixed = false }: { x: number; z: number; size?: number; width?: number; fixed?: boolean }) {
  const spin = useRef<THREE.Group>(null);
  const moving = useContext(Motion);
  useFrame((_, delta) => { if (moving && !fixed && spin.current) spin.current.rotation.y -= (delta * SPEED) / size; });
  const rim = size * .66, face = width * .36;
  return <group position={[x, size, z]} rotation={[Math.PI / 2, 0, 0]}>
    <group ref={spin}>
      <mesh geometry={tyreGeometry(size, width)} material={rubber} />
      <mesh material={dark}><cylinderGeometry args={[rim, rim, width * .7, 32]} /></mesh>
      {[1, -1].map(side => <group key={side} position={[0, side * face, 0]}>
        <mesh material={rimDark} position={[0, side * .002, 0]}><cylinderGeometry args={[rim * .96, rim * .96, .004, 32]} /></mesh>
        <mesh material={chrome} rotation={[Math.PI / 2, 0, 0]} position={[0, side * .006, 0]}><torusGeometry args={[rim * .97, size * .035, 8, 40]} /></mesh>
        {[0, 1, 2, 3, 4].map(i => {
          const a = i * Math.PI * 2 / 5;
          return <mesh key={i} material={chrome} position={[Math.cos(a) * rim * .48, side * .01, Math.sin(a) * rim * .48]} rotation={[0, -a, 0]}><boxGeometry args={[rim * .82, .012, size * .13]} /></mesh>;
        })}
        <mesh material={chrome} position={[0, side * .016, 0]}><cylinderGeometry args={[size * .17, size * .2, .02, 20]} /></mesh>
        <mesh material={dark} position={[0, side * .027, 0]}><cylinderGeometry args={[size * .08, size * .08, .004, 16]} /></mesh>
      </group>)}
    </group>
  </group>;
}

const bodyCache = new Map<CarKind, { body: THREE.ExtrudeGeometry; glass: THREE.ExtrudeGeometry }>();
function carGeometry(kind: CarKind) {
  if (!bodyCache.has(kind)) bodyCache.set(kind, { body: extrude(carBodyShape(kind), .74, .06), glass: extrude(carGlassShape(kind), .6, .05) });
  return bodyCache.get(kind)!;
}

function Car({ position, color, kind = "sedan", rotation = 0 }: { position: [number, number, number]; color: string; kind?: CarKind; rotation?: number }) {
  const { body, glass: cabin } = carGeometry(kind);
  const spec = CAR_SPECS[kind];
  const paint = useMemo(() => new THREE.MeshPhysicalMaterial({ color, metalness: .6, roughness: .2, clearcoat: 1, clearcoatRoughness: .05 }), [color]);
  const [roofLength, roofX, roofY] = spec.roof;
  return <group position={position} rotation={[0, 0, rotation]} scale={.95}>
    <mesh geometry={body} material={paint} />
    <mesh geometry={cabin} material={glass} />
    <RoundedBox args={[roofLength, .05, .74]} radius={.024} smoothness={3} position={[roofX, roofY, 0]} material={paint} />
    {kind === "suv" && [-.3, .3].map(z => <mesh key={z} material={chrome} position={[roofX, roofY + .045, z]}><boxGeometry args={[roofLength * .85, .025, .03]} /></mesh>)}
    {/* B-pillar + chrome belt line */}
    <mesh material={piano} position={[spec.pillar, (spec.belt + roofY) / 2, 0]}><boxGeometry args={[.05, roofY - spec.belt - .03, .715]} /></mesh>
    <mesh material={chrome} position={[-.15, spec.belt + .012, 0]}><boxGeometry args={[1.2, .012, .73]} /></mesh>
    {[-1, 1].map(side => <group key={side}>
      {/* side skirt, door handles, mirror */}
      <mesh material={piano} position={[0, spec.wheel + .035, side * .405]}><boxGeometry args={[spec.wheelX * 2 - spec.wheel * 2.8, .06, .04]} /></mesh>
      {[-.4, .17].map(x => <mesh key={x} material={chrome} position={[x, spec.belt - .07, side * .432]}><boxGeometry args={[.09, .018, .012]} /></mesh>)}
      <RoundedBox args={[.1, .06, .08]} radius={.02} smoothness={2} position={[spec.nose - .08, spec.belt + .04, side * .43]} material={paint} />
      {/* wheel-arch liners */}
      {[-spec.wheelX, spec.wheelX].map(x => <mesh key={x} material={piano} position={[x, spec.wheel, side * .3]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[spec.wheel * 1.12, spec.wheel * 1.12, .12, 24, 1, true, Math.PI / 2, Math.PI]} /></mesh>)}
      <mesh material={headlight} position={[1.08, spec.nose, side * .3]} rotation={[0, side * .25, 0]}><boxGeometry args={[.025, .04, .2]} /></mesh>
    </group>)}
    <mesh material={piano} position={[1.095, spec.nose - .1, 0]}><boxGeometry args={[.02, kind === "sedan" ? .07 : .12, .5]} /></mesh>
    <mesh material={taillight} position={[-1.065, spec.tail, 0]}><boxGeometry args={[.02, .035, .78]} /></mesh>
    {[-spec.wheelX, spec.wheelX].flatMap(x => [-spec.track, spec.track].map(z => <Wheel key={`${x}${z}`} x={x} z={z} size={spec.wheel} width={.15} fixed />))}
  </group>;
}

/* ---------- brand decals (cropped from the 1230×1278 logo artwork) ---------- */
const LOGO_SRC = "/img/kirim-mobilku-logo.jpeg";
const LOGO_CROPS = {
  full: { x: 190, y: 330, w: 880, h: 650 },
  wordmark: { x: 195, y: 795, w: 870, h: 185 },
};
function Logo({ crop, height, position, side }: { crop: keyof typeof LOGO_CROPS; height: number; position: [number, number, number]; side: 1 | -1 }) {
  const source = useTexture(LOGO_SRC);
  const { x, y, w, h } = LOGO_CROPS[crop];
  const texture = useMemo(() => {
    const t = source.clone();
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    t.repeat.set(w / 1230, h / 1278);
    t.offset.set(x / 1230, 1 - (y + h) / 1278);
    t.needsUpdate = true;
    return t;
  }, [source, x, y, w, h]);
  const width = height * w / h, pad = height * .14;
  return <group position={position} rotation={[0, side === 1 ? 0 : Math.PI, 0]}>
    <RoundedBox args={[width + pad * 2, height + pad * 2, .012]} radius={Math.min(.05, pad)} smoothness={3}><meshPhysicalMaterial color="#f7f8fa" roughness={.35} clearcoat={.6} /></RoundedBox>
    <mesh position={[0, 0, .0075]}><planeGeometry args={[width, height]} /><meshStandardMaterial map={texture} roughness={.4} /></mesh>
  </group>;
}

function Carrier() {
  const cab = useMemo(() => extrude(cabShape(), 1.5, .06), []);
  const red = useMemo(() => new THREE.MeshPhysicalMaterial({ color: "#d9142f", metalness: .45, roughness: .2, clearcoat: 1, clearcoatRoughness: .06 }), []);
  const deck = useMemo(() => new THREE.MeshStandardMaterial({ color: "#2b3a4b", metalness: .75, roughness: .38 }), []);
  const shieldAngle = Math.atan2(.64, -.25);
  return <group position={[-.3, -.65, 0]}>
    {/* chassis */}
    <RoundedBox args={[6.9, .2, .9]} radius={.05} smoothness={2} position={[.4, .52, 0]} material={dark} />
    {/* lower deck */}
    <RoundedBox args={[5.8, .1, 1.55]} radius={.04} smoothness={2} position={[-.45, .9, 0]} material={deck} />
    {/* upper deck */}
    <RoundedBox args={[5.8, .08, 1.5]} radius={.03} smoothness={2} position={[-.45, 2.12, 0]} material={deck} />
    {[-.8, .8].map(z => <group key={z}>
      <RoundedBox args={[5.8, .11, .07]} radius={.03} smoothness={2} position={[-.45, 2.21, z]} material={red} />
      <RoundedBox args={[5.8, .09, .06]} radius={.025} smoothness={2} position={[-.45, 1.0, z]} material={red} />
      {[-3.25, -1.85, -.45, .95, 2.3].map(x => <mesh key={x} material={steel} position={[x, 1.52, z]}><boxGeometry args={[.07, 1.2, .06]} /></mesh>)}
      {[-2.5, -1.15, .25, 1.6].map(x => <mesh key={x} material={steel} position={[x, 1.52, z]} rotation={[0, 0, .78]}><boxGeometry args={[.035, 1.62, .03]} /></mesh>)}
      {/* side marker lights */}
      {[-3.1, -1.5, .1, 1.7].map(x => <mesh key={x} material={amber} position={[x, .86, z * 1.01]}><boxGeometry args={[.07, .035, .015]} /></mesh>)}
    </group>)}
    {/* rear ramps */}
    {[-.45, .45].map(z => <mesh key={z} material={steel} position={[-3.6, .72, z]} rotation={[0, 0, -.62]}><boxGeometry args={[.62, .04, .34]} /></mesh>)}
    {[-.6, .6].map(z => <mesh key={z} material={taillight} position={[-3.37, .8, z]}><boxGeometry args={[.03, .07, .22]} /></mesh>)}
    {/* cab */}
    <mesh geometry={cab} material={red} />
    <mesh material={glass} position={[3.66, 1.705, 0]} rotation={[0, 0, shieldAngle - Math.PI / 2]}><boxGeometry args={[.02, .68, 1.38]} /></mesh>
    {[-1, 1].map(side => <group key={side}>
      <mesh material={glass} position={[3.05, 1.68, side * .811]}><boxGeometry args={[.62, .52, .01]} /></mesh>
      <mesh material={dark} position={[2.6, 1.15, side * .811]}><boxGeometry args={[.02, .5, .01]} /></mesh>
      <Logo crop="full" height={.34} position={[3.04, 1.18, side * .818]} side={side as 1 | -1} />
      {/* branded side skirt between the rear axle and the cab */}
      <mesh material={dark} position={[.3, .68, side * .73]}><boxGeometry args={[2.7, .3, .03]} /></mesh>
      <Logo crop="wordmark" height={.17} position={[.3, .68, side * .75]} side={side as 1 | -1} />
      {/* mirror */}
      <mesh material={dark} position={[3.62, 1.55, side * .92]}><boxGeometry args={[.04, .04, .24]} /></mesh>
      <RoundedBox args={[.07, .32, .1]} radius={.02} smoothness={2} position={[3.6, 1.6, side * 1.05]} material={dark} />
      {/* fuel tank */}
      <mesh material={chrome} position={[2.1, .5, side * .58]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[.17, .17, .7, 24]} /></mesh>
      {/* step */}
      <mesh material={dark} position={[2.72, .5, side * .79]}><boxGeometry args={[.2, .04, .12]} /></mesh>
    </group>)}
    {/* exhaust stack */}
    <mesh material={chrome} position={[2.36, 1.7, .62]}><cylinderGeometry args={[.05, .05, 1.6, 16]} /></mesh>
    {/* grille + lights */}
    <RoundedBox args={[.05, .5, 1.0]} radius={.02} smoothness={2} position={[4.13, .86, 0]} material={dark} />
    {[0, 1, 2, 3, 4].map(i => <mesh key={i} material={chrome} position={[4.16, .66 + i * .1, 0]}><boxGeometry args={[.01, .025, .94]} /></mesh>)}
    {[-.6, .6].map(z => <mesh key={z} material={headlight} position={[4.15, .9, z]}><boxGeometry args={[.03, .12, .2]} /></mesh>)}
    <RoundedBox args={[.14, .2, 1.62]} radius={.05} smoothness={3} position={[4.12, .48, 0]} material={chrome} />
    <mesh material={amber} position={[3.2, 2.17, 0]}><boxGeometry args={[.08, .03, .6]} /></mesh>
    {/* wheels */}
    {[-2.45, -1.55, 3.22].flatMap(x => [-.66, .66].map(z => <Wheel key={`${x}${z}`} x={x} z={z} size={.4} width={x < 0 ? .34 : .28} />))}
    {/* cargo */}
    <Car position={[-1.95, .95, 0]} kind="suv" color="#eef2f6" />
    <Car position={[.75, .95, 0]} color="#16416a" />
    <Car position={[-1.95, 2.16, 0]} color="#d11a33" />
    <Car position={[.8, 2.16, 0]} kind="suv" rotation={-.04} color="#9aa6b2" />
  </group>;
}

/* ---------- studio floor: faded disc, road, glow ring, pulse ---------- */
const floorVertex = `varying vec2 vPos; void main(){ vPos = position.xy; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`;
const floorFragment = `
uniform float uTime; uniform vec3 uBase; uniform vec3 uAccent; uniform vec3 uCool;
varying vec2 vPos;
void main(){
  float r = length(vPos);
  float fade = 1.0 - smoothstep(2.6, 9.0, r);
  vec3 col = uBase;
  vec2 gp = vPos * .75;
  vec2 g = abs(fract(gp - .5) - .5) / fwidth(gp);
  float grid = 1.0 - min(min(g.x, g.y), 1.0);
  col += uCool * grid * .14;
  float road = 1.0 - smoothstep(1.3, 1.5, abs(vPos.y));
  col = mix(col, vec3(.018, .024, .036), road * .8);
  float edge = 1.0 - smoothstep(.0, .03, abs(abs(vPos.y) - 1.28));
  col += vec3(.7, .76, .86) * edge * .28;
  float dash = step(.55, fract((vPos.x + uTime) / 1.5)) * (1.0 - smoothstep(.025, .05, abs(vPos.y)));
  col += vec3(1., .78, .45) * dash * .5;
  float ring = exp(-pow((r - 5.2) * 12.0, 2.0));
  float halo = exp(-pow((r - 5.2) * 2.0, 2.0));
  col += uAccent * (ring * 1.6 + halo * .22);
  float p = fract(uTime * .045);
  float pulse = exp(-pow((r - p * 8.5) * 5.0, 2.0)) * (1.0 - p);
  col += uAccent * pulse * .45;
  col += uCool * (1.0 - smoothstep(0.0, 5.0, r)) * .22;
  gl_FragColor = vec4(col, (.92 + ring * .5) * fade);
  #include <colorspace_fragment>
}`;
function Floor() {
  const material = useRef<THREE.ShaderMaterial>(null);
  const moving = useContext(Motion);
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uBase: { value: new THREE.Color("#0f1b2c") }, uAccent: { value: new THREE.Color("#ff3858") }, uCool: { value: new THREE.Color("#4b88c4") } }), []);
  useFrame((_, delta) => { if (moving && material.current) material.current.uniforms.uTime.value += delta * SPEED; });
  return <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -.652, 0]} renderOrder={-1}>
    <planeGeometry args={[19, 19]} />
    <shaderMaterial ref={material} uniforms={uniforms} vertexShader={floorVertex} fragmentShader={floorFragment} transparent depthWrite={false} toneMapped={false} />
  </mesh>;
}

function Float({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const moving = useContext(Motion);
  useFrame(({ clock }) => { if (moving && ref.current) ref.current.position.y = Math.sin(clock.elapsedTime * 9) * .006; });
  return <group ref={ref}>{children}</group>;
}

export default function TransportStudio({ active, rotate }: { active: boolean; rotate: boolean }) {
  return <Canvas frameloop={active ? (rotate ? "always" : "demand") : "never"} dpr={[1, 1.5]} camera={{ position: [11.2, 5.6, 12.2], fov: 32 }} gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }} aria-label="Model 3D truk car carrier dengan empat mobil">
    <Motion.Provider value={rotate}>
      <Suspense fallback={null}>
        <hemisphereLight args={["#cfe3ff", "#1a1020", .9]} />
        <directionalLight position={[5, 9, 4]} intensity={2.6} color="#f2f7ff" />
        <directionalLight position={[-7, 3, -5]} intensity={3.2} color="#ff5a78" />
        <spotLight position={[0, 9, 0]} angle={.55} penumbra={1} intensity={40} color="#8fc0ff" />
        <Environment resolution={256} frames={1}>
          <Lightformer form="rect" position={[0, 7, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[14, 4, 1]} intensity={2.5} />
          <Lightformer form="rect" position={[0, 2, 8]} scale={[16, 2.2, 1]} intensity={1.6} color="#dfeeff" />
          <Lightformer form="rect" position={[-8, 2, 0]} rotation={[0, Math.PI / 2, 0]} scale={[10, 3, 1]} color="#ff3d5f" intensity={2.4} />
          <Lightformer form="ring" position={[7, 3, -6]} scale={3} color="#4d9dde" intensity={3} />
        </Environment>
        <Float><Carrier /></Float>
        <Floor />
        <ContactShadows position={[0, -.645, 0]} scale={12} opacity={.75} blur={2.2} far={4} resolution={512} frames={1} color="#02060c" />
        <Sparkles count={45} scale={[13, 4.5, 9]} position={[0, 1.4, 0]} size={2.2} speed={.25} opacity={.45} color="#ff9aae" />
        <OrbitControls enableZoom={false} enablePan={false} enableDamping autoRotate={rotate} autoRotateSpeed={.4} minPolarAngle={.75} maxPolarAngle={1.32} target={[.2, .55, 0]} />
      </Suspense>
    </Motion.Provider>
  </Canvas>;
}
