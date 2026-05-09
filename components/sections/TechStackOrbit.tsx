"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { LensHeading } from "@/components/ui/LensHeading";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const STACK = ["Next.js", "React", "Tailwind CSS", "GSAP"];

export function TechStackOrbit() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const nodes = gsap.utils.toArray<HTMLElement>(".orbit-node-desktop");

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        nodes.forEach((node, index) => {
          gsap.to(node, {
            rotate: 360,
            transformOrigin: "50% 50%",
            duration: 11 + index * 1.2,
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
              duration: 0.5,
              ease: "power3.out",
              scrollTrigger: {
                trigger: node,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });

        return () => {};
      });

      mm.add("(max-width: 767px)", () => {
        const mobileNodes = gsap.utils.toArray<HTMLElement>(".orbit-node-mobile");
        mobileNodes.forEach((node, index) => {
          gsap.fromTo(
            node,
            { opacity: 0, y: 12 },
            {
              opacity: 1,
              y: 0,
              duration: 0.45,
              delay: index * 0.06,
              ease: "power3.out",
              scrollTrigger: {
                trigger: node,
                start: "top 92%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
        return () => {};
      });

      return () => mm.revert();
    },
    { scope },
  );

  const radiusMd = 150;

  return (
    <div
      ref={scope}
      className="relative mt-10 overflow-hidden px-4 pb-[clamp(14vh,18vw,22vh)] pt-4 sm:px-10 lg:px-16"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_20%_20%,rgba(147,180,255,0.14),transparent_42%),radial-gradient(circle_at_80%_72%,rgba(37,99,235,0.14),transparent_40%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/65 via-black/35 to-black/65"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.16em] text-[#93b4ff]">Tech Stack Orbit</p>
        <LensHeading
          text="Interactive Technical Core."
          className="mt-4 text-[clamp(1.65rem,5vw,4.4rem)] font-semibold leading-[0.98] tracking-[-0.01em] text-white"
        />

        <ul className="mt-10 flex flex-col gap-3 md:hidden">
          {STACK.map((item) => (
            <li
              key={item}
              data-cursor="expand"
              className="orbit-node-mobile rounded-2xl border border-white/25 bg-[#0c0d12]/92 px-4 py-3 text-center text-xs font-medium uppercase tracking-[0.12em] text-white/90 backdrop-blur-sm"
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="relative z-10 mt-14 hidden min-h-[min(48vh,420px)] w-full items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-[#0a0a0c]/55 shadow-[inset_0_0_80px_rgba(0,0,0,0.35)] backdrop-blur-[2px] sm:rounded-[2rem] md:flex">
          <div className="absolute h-[min(38vw,420px)] w-[min(38vw,420px)] rounded-full border border-white/10" />
          <div className="absolute h-[min(28vw,300px)] w-[min(28vw,300px)] rounded-full border border-white/10" />

          {STACK.map((item, index) => {
            const angle = (index / STACK.length) * Math.PI * 2;
            const x = Math.cos(angle) * radiusMd;
            const y = Math.sin(angle) * radiusMd;

            return (
              <div
                key={item}
                data-cursor="expand"
                className="orbit-node-desktop absolute rounded-full border border-white/25 bg-[#0c0d12]/92 px-5 py-2 text-sm uppercase tracking-[0.1em] text-white/90 backdrop-blur-sm"
                style={{ transform: `translate(${x}px, ${y}px)` }}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
