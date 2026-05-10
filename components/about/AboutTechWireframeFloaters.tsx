"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const ACCENT = "#2563eb";
const ACCENT_SOFT = "#64748b";

const mat = (color: string, opacity: number) => ({
  color,
  wireframe: true,
  transparent: true,
  opacity,
  depthWrite: false as const,
});

type FloatingGroupProps = {
  reducedMotion: boolean;
  position: [number, number, number];
  scale: number;
  spin: [number, number, number];
  floatAmp: number;
  floatPhase: number;
  children: React.ReactNode;
};

/** Shared drift + spin for grouped tech models */
function FloatingTechGroup({
  reducedMotion,
  position,
  scale,
  spin,
  floatAmp,
  floatPhase,
  children,
}: FloatingGroupProps) {
  const ref = useRef<THREE.Group>(null);
  const baseY = position[1];
  const baseX = position[0];

  useFrame((state, delta) => {
    const g = ref.current;
    if (!g || reducedMotion) return;
    g.rotation.x += delta * spin[0];
    g.rotation.y += delta * spin[1];
    g.rotation.z += delta * spin[2];
    const t = state.clock.elapsedTime;
    g.position.y = baseY + Math.sin(t * 0.55 + floatPhase) * floatAmp;
    g.position.x = baseX + Math.cos(t * 0.28 + floatPhase * 0.5) * floatAmp * 0.35;
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      {children}
    </group>
  );
}

/** PCB + die + edge “pins” — reads as CPU / chip */
function MicrochipWireframe({ color, opacity }: { color: string; opacity: number }) {
  const m = mat(color, opacity);
  const pinScale = 0.14;
  const pinY = -0.05;
  const pins: [number, number, number][] = [
    [-0.72, pinY, -0.38],
    [-0.72, pinY, 0],
    [-0.72, pinY, 0.38],
    [0.72, pinY, -0.38],
    [0.72, pinY, 0],
    [0.72, pinY, 0.38],
    [0, pinY, -0.48],
    [-0.36, pinY, -0.48],
    [0.36, pinY, -0.48],
    [0, pinY, 0.48],
    [-0.36, pinY, 0.48],
    [0.36, pinY, 0.48],
  ];
  return (
    <group rotation={[0.2, 0.45, 0.08]}>
      <mesh>
        <boxGeometry args={[1.65, 0.1, 1.15]} />
        <meshBasicMaterial {...m} />
      </mesh>
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[0.52, 0.08, 0.52]} />
        <meshBasicMaterial {...m} />
      </mesh>
      {pins.map((p, i) => (
        <mesh key={i} position={p} scale={pinScale}>
          <boxGeometry args={[1, 0.35, 1]} />
          <meshBasicMaterial {...m} />
        </mesh>
      ))}
    </group>
  );
}

/** Stacked blades — reads as servers / cloud infra */
function ServerStackWireframe({ color, opacity }: { color: string; opacity: number }) {
  const m = mat(color, opacity);
  return (
    <group rotation={[0.08, -0.35, 0]}>
      {[-0.34, 0, 0.34].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <boxGeometry args={[1.15, 0.26, 0.92]} />
          <meshBasicMaterial {...m} />
        </mesh>
      ))}
    </group>
  );
}

/** Hub node + orbit ring — reads as network / API graph */
function NetworkNodeWireframe({ color, opacity }: { color: string; opacity: number }) {
  const m = mat(color, opacity);
  return (
    <group>
      <mesh rotation={[0.35, 0.5, 0.15]}>
        <octahedronGeometry args={[0.58, 0]} />
        <meshBasicMaterial {...m} />
      </mesh>
      <mesh rotation={[Math.PI / 2.2, 0.4, 0]}>
        <torusGeometry args={[1.02, 0.028, 10, 52]} />
        <meshBasicMaterial {...m} />
      </mesh>
      <mesh rotation={[0, 0.8, Math.PI / 4]}>
        <torusGeometry args={[0.72, 0.022, 8, 40]} />
        <meshBasicMaterial {...mat(color, opacity * 0.85)} />
      </mesh>
    </group>
  );
}

/**
 * Three tech metaphors: silicon, infrastructure, connectivity — wireframe, low-oxygen blend.
 */
export function AboutTechWireframeFloaters({ reducedMotion }: { reducedMotion: boolean }) {
  const root = useRef<THREE.Group>(null);

  useFrame((_state, delta) => {
    const g = root.current;
    if (!g || reducedMotion) return;
    g.rotation.y += delta * 0.028;
  });

  return (
    <group ref={root}>
      <FloatingTechGroup
        reducedMotion={reducedMotion}
        position={[-4.15, 0.85, -4]}
        scale={0.92}
        spin={[0.1, 0.18, 0.035]}
        floatAmp={0.22}
        floatPhase={0}
      >
        <MicrochipWireframe color={ACCENT} opacity={0.17} />
      </FloatingTechGroup>

      <FloatingTechGroup
        reducedMotion={reducedMotion}
        position={[4.35, -1.05, -3.2]}
        scale={1.02}
        spin={[0.09, -0.14, 0.06]}
        floatAmp={0.28}
        floatPhase={1.65}
      >
        <ServerStackWireframe color={ACCENT_SOFT} opacity={0.13} />
      </FloatingTechGroup>

      <FloatingTechGroup
        reducedMotion={reducedMotion}
        position={[0.4, 2.55, -6]}
        scale={0.62}
        spin={[-0.05, 0.12, -0.07]}
        floatAmp={0.18}
        floatPhase={3.05}
      >
        <NetworkNodeWireframe color={ACCENT} opacity={0.15} />
      </FloatingTechGroup>
    </group>
  );
}
