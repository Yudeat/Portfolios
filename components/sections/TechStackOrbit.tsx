"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { LensHeading } from "@/components/ui/LensHeading";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const STACK = ["Next.js", "React", "Tailwind CSS", "GSAP"];

export function TechStackOrbit() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const nodes = gsap.utils.toArray<HTMLElement>(".orbit-node");

      nodes.forEach((node, index) => {
        gsap.to(node, {
          rotate: 360,
          transformOrigin: "50% 50%",
          duration: 16 + index * 1.8,
          repeat: -1,
          ease: "none",
        });

        gsap.fromTo(
          node,
          { opacity: 0, scale: 0.86, filter: "blur(8px)" },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: node,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    },
    { scope },
  );

  return (
    <section ref={scope} className="px-6 py-[24vh] sm:px-10 lg:px-16">
      <p className="text-xs uppercase tracking-[0.16em] text-[#3f7cff]">Tech Stack Orbit</p>
      <LensHeading
        text="Interactive Technical Core."
        className="mt-4 text-[clamp(2rem,4.3vw,4.4rem)] font-semibold leading-[0.98] tracking-[-0.01em]"
      />

      <div className="relative mt-14 flex min-h-[48vh] items-center justify-center overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.015]">
        <div className="absolute h-[38vw] w-[38vw] max-h-[420px] max-w-[420px] rounded-full border border-white/10" />
        <div className="absolute h-[28vw] w-[28vw] max-h-[300px] max-w-[300px] rounded-full border border-white/10" />

        {STACK.map((item, index) => {
          const angle = (index / STACK.length) * Math.PI * 2;
          const x = Math.cos(angle) * 150;
          const y = Math.sin(angle) * 150;

          return (
            <div
              key={item}
              data-cursor="expand"
              className="orbit-node absolute rounded-full border border-white/20 bg-[#0c0d12] px-5 py-2 text-sm uppercase tracking-[0.1em] text-white/90"
              style={{ transform: `translate(${x}px, ${y}px)` }}
            >
              {item}
            </div>
          );
        })}
      </div>
    </section>
  );
}
