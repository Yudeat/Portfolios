"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { LensHeading } from "@/components/ui/LensHeading";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type ProcessStep = {
  id: string;
  title: string;
  challenge: string;
  strategy: string;
  result: string;
};

const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "01 - Exile (SaaS)",
    title: "Student Guidance Platform",
    challenge:
      "Students struggled with fragmented mentorship flows and unclear progression metrics across applications.",
    strategy:
      "Designed a modular guidance architecture with role-specific dashboards and adaptive journey checkpoints.",
    result: "Unified product flow improved onboarding completion by 31% and reduced drop-offs in key decision steps.",
  },
  {
    id: "02 - Kachu Kart",
    title: "Wholesale E-commerce Engine",
    challenge:
      "Traditional wholesale journeys felt static and operational tooling could not scale with SKU and vendor complexity.",
    strategy:
      "Built a Three.js hero slider experience and implemented advanced admin slices for pricing tiers and inventory logic.",
    result: "Delivered a faster, immersive buying flow with stronger admin throughput for wholesale operations.",
  },
  {
    id: "03 - Steel Wood Nepal",
    title: "Corporate Information Platform",
    challenge:
      "The brand lacked trust-signaling interaction and had no structured way to handle professional service agreements.",
    strategy:
      "Created custom GSAP narrative transitions and integrated agreement workflows inside service touchpoints.",
    result: "The site established stronger enterprise credibility and streamlined service inquiry qualification.",
  },
];

export function ProcessPinned() {
  const mainContainerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!mainContainerRef.current || !trackRef.current) return;

      const mainContainer = mainContainerRef.current;
      const track = trackRef.current;
      const overlay = overlayRef.current;
      const cards = gsap.utils.toArray<HTMLElement>(".process-card");

      const horizontalTween = gsap.to(track, {
        x: () => -(track.scrollWidth - mainContainer.clientWidth),
        ease: "none",
        scrollTrigger: {
          trigger: mainContainer,
          start: "top top",
          end: () => `+=${track.offsetWidth}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (!overlay) return;
            const progress = gsap.utils.clamp(0, 1, (self.progress - 0.78) / 0.22);
            gsap.set(overlay, { opacity: progress });
          },
        },
      });

      cards.forEach((card) => {
        const step = card.querySelector(".process-step");
        const title = card.querySelector(".process-title");
        const description = card.querySelector(".process-description");

        gsap
          .timeline({
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalTween,
              start: "left center",
              end: "right center",
              toggleActions: "play none none reverse",
            },
          })
          .fromTo(
            card,
            { scale: 0.9, filter: "blur(10px)", opacity: 0.72 },
            { scale: 1, filter: "blur(0px)", opacity: 1, duration: 0.64, ease: "power3.out" },
          )
          .from(
            [step, title, description],
            {
              opacity: 0,
              y: 22,
              filter: "blur(8px)",
              stagger: 0.1,
              duration: 0.58,
              ease: "power3.out",
            },
            "-=0.38",
          );
      });

      const refreshOnLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", refreshOnLoad);
      const delayedRefresh = window.setTimeout(() => ScrollTrigger.refresh(), 180);

      return () => {
        window.removeEventListener("load", refreshOnLoad);
        window.clearTimeout(delayedRefresh);
      };
    },
    { scope: mainContainerRef },
  );

  return (
    <section
      ref={mainContainerRef}
      className="relative h-screen overflow-hidden border-y border-white/10 bg-[#070707] px-6 py-10 sm:px-10 lg:px-16"
    >
      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 z-20 bg-[#050505] opacity-0"
        aria-hidden="true"
      />
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.18em] text-[#3f7cff]">The Narrative Process</p>
        <LensHeading
          text="Case Studies - The Core."
          className="mt-4 text-[clamp(1.9rem,4vw,4rem)] font-semibold uppercase leading-[0.98] tracking-[-0.01em]"
        />
      </div>

      <div ref={trackRef} className="relative z-10 flex h-[65vh] w-max gap-6 will-change-transform">
        {PROCESS_STEPS.map((step) => (
          <article
            key={step.id}
            data-cursor="expand"
            className="process-card flex w-[80vw] min-w-[400px] flex-col justify-between rounded-3xl border border-white/15 bg-white/[0.035] p-8 shadow-[0_0_90px_rgba(25,40,95,0.22)]"
          >
            <div>
              <p className="process-step text-xs uppercase tracking-[0.14em] text-white/50">Step {step.id}</p>
              <h3 className="process-title mt-3 text-3xl font-semibold uppercase leading-tight tracking-[-0.01em]">
                {step.title}
              </h3>
            </div>
            <div className="process-description max-w-[58ch] space-y-4 text-white/76">
              <p className="leading-relaxed">
                <span className="block text-xs uppercase tracking-[0.12em] text-white/50">Challenge</span>
                {step.challenge}
              </p>
              <p className="leading-relaxed">
                <span className="block text-xs uppercase tracking-[0.12em] text-white/50">Strategy</span>
                {step.strategy}
              </p>
              <p className="leading-relaxed">
                <span className="block text-xs uppercase tracking-[0.12em] text-white/50">Result</span>
                {step.result}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
