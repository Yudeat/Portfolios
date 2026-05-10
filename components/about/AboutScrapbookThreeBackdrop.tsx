"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";

import { AboutTechWireframeFloaters } from "@/components/about/AboutTechWireframeFloaters";
import { RetroComputer3D } from "@/components/about/RetroComputer3D";

/**
 * WebGL backdrop: tech-themed wireframes (chip, servers, network) + retro PC.
 */
export function AboutScrapbookThreeBackdrop() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 min-h-[220vh] w-full overflow-hidden" aria-hidden>
      <Canvas
        className="!absolute inset-0 h-full w-full touch-none"
        camera={{ position: [-0.55, 0.2, 10], fov: 42, near: 0.1, far: 60 }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "low-power",
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <ambientLight intensity={0.58} />
        <directionalLight position={[8, 12, 10]} intensity={0.55} color="#ffffff" />
        <directionalLight position={[-4, 4, -2]} intensity={0.2} color="#e8e8ff" />
        <AboutTechWireframeFloaters reducedMotion={reducedMotion} />
        <RetroComputer3D reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
