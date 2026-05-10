"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const YELLOW = "#ffde00";
const YELLOW_EMISSIVE = "#ffea00";
const INK = "#0a0a0a";

const halftoneVertex = /* glsl */ `
varying vec3 vNormal;
varying vec2 vUv;
void main() {
  vNormal = normalize(normalMatrix * normal);
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const halftoneFragment = /* glsl */ `
precision highp float;
uniform vec3 uInk;
varying vec3 vNormal;
varying vec2 vUv;

void main() {
  vec3 lightDir = normalize(vec3(0.45, 0.9, 0.4));
  float nDot = max(dot(normalize(vNormal), lightDir), 0.0);
  float tone = nDot * 0.72 + 0.28;
  vec2 grid = vUv * 96.0;
  vec2 cell = fract(grid) - 0.5;
  float dist = length(cell);
  float radius = (1.0 - tone) * 0.46 + 0.05;
  float edge = 0.04;
  float dotMask = 1.0 - smoothstep(radius - edge, radius + edge, dist);
  vec3 paper = vec3(0.94, 0.95, 0.97);
  float inkAmt = min(dotMask * tone * 1.35, 1.0);
  vec3 col = mix(paper, uInk, inkAmt);
  gl_FragColor = vec4(col, 1.0);
}
`;

function useHalftoneMaterials(count: number) {
  return useMemo(() => {
    const base = new THREE.ShaderMaterial({
      uniforms: {
        uInk: { value: new THREE.Color(INK) },
      },
      vertexShader: halftoneVertex,
      fragmentShader: halftoneFragment,
      side: THREE.DoubleSide,
    });
    return Array.from({ length: count }, (_, i) => (i === 0 ? base : base.clone()));
  }, [count]);
}

function LightningMesh({
  reducedMotion,
  position,
  rotation,
  scale,
}: {
  reducedMotion: boolean;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0.08, 0.18);
    shape.lineTo(0.02, 0.18);
    shape.lineTo(0.12, 0.45);
    shape.lineTo(0.05, 0.45);
    shape.lineTo(0.14, 0.72);
    shape.lineTo(0.06, 0.72);
    shape.lineTo(0.15, 1.0);
    shape.lineTo(0, 1.0);
    shape.lineTo(-0.06, 0.45);
    shape.lineTo(0.02, 0.45);
    shape.lineTo(-0.1, 0);
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }, []);

  useFrame((state) => {
    const m = meshRef.current;
    if (!m || reducedMotion) return;
    const t = state.clock.elapsedTime;
    const mat = m.material;
    if (Array.isArray(mat)) return;
    const basic = mat as THREE.MeshBasicMaterial;
    basic.opacity = 0.55 + Math.sin(t * 6.2 + position[0]) * 0.25;
    m.rotation.z = Math.sin(t * 2.1) * 0.08;
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale ?? 1} geometry={geo} renderOrder={2}>
      <meshBasicMaterial
        color={YELLOW}
        transparent
        opacity={0.65}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/**
 * Low-poly vintage computer: halftone body, yellow emissive screen, yellow sparks.
 */
export function RetroComputer3D({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const screenMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const [htBase, htBezel, htInner] = useHalftoneMaterials(3);

  useFrame((state) => {
    const g = groupRef.current;
    if (g && !reducedMotion) {
      const t = state.clock.elapsedTime;
      g.rotation.y = 0.38 + Math.sin(t * 0.35) * 0.04;
      g.position.y = 0.95 + Math.sin(t * 0.5) * 0.06;
    }
    const sm = screenMatRef.current;
    if (sm && !reducedMotion) {
      const t = state.clock.elapsedTime;
      sm.emissiveIntensity = 0.95 + Math.sin(t * 4.2) * 0.14 + Math.sin(t * 11.3) * 0.05;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[-3.35, 0.95, 2.15]}
      scale={0.78}
      rotation={[0.1, 0.38, -0.06]}
      renderOrder={3}
    >
      {/* Keyboard base */}
      <mesh position={[0, -0.05, 0.18]} castShadow material={htBase}>
        <boxGeometry args={[2.35, 0.32, 1.45]} />
      </mesh>

      {/* Monitor housing */}
      <mesh position={[0, 0.92, -0.02]} castShadow material={htBezel}>
        <boxGeometry args={[1.95, 1.48, 0.5]} />
      </mesh>

      {/* Inner bezel (slightly recessed look) */}
      <mesh position={[0, 0.92, 0.22]} castShadow material={htInner}>
        <boxGeometry args={[1.72, 1.28, 0.12]} />
      </mesh>

      {/* Yellow screen */}
      <mesh position={[0, 0.92, 0.29]}>
        <planeGeometry args={[1.55, 1.08]} />
        <meshStandardMaterial
          ref={screenMatRef}
          color={YELLOW}
          emissive={YELLOW_EMISSIVE}
          emissiveIntensity={0.95}
          roughness={0.4}
          metalness={0.05}
        />
      </mesh>

      {/* Large spark — bottom left */}
      <LightningMesh reducedMotion={reducedMotion} position={[-1.35, -0.35, 0.5]} scale={0.85} />

      {/* Sparks near top of monitor */}
      <LightningMesh
        reducedMotion={reducedMotion}
        position={[1.05, 1.75, 0.35]}
        rotation={[0, 0, 0.9]}
        scale={0.45}
      />
      <LightningMesh
        reducedMotion={reducedMotion}
        position={[1.25, 1.68, 0.42]}
        rotation={[0, -0.18, 0.65]}
        scale={0.38}
      />
    </group>
  );
}
