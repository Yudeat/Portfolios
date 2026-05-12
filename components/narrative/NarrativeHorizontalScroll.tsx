"use client";

import { useRef } from "react";
import { LensHeading } from "@/components/ui/LensHeading";
import { NARRATIVE_PROJECTS } from "@/lib/narrativeProcessData";
import { useNarrativeHorizontalScroll } from "@/hooks/useNarrativeHorizontalScroll";
import { NarrativeProcessCard } from "@/components/narrative/NarrativeProcessCard";

export function NarrativeHorizontalScroll() {
  const narrativeContainerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useNarrativeHorizontalScroll(narrativeContainerRef, trackRef);

  return (
    <section
      ref={narrativeContainerRef}
      className="narrative-container relative border-y border-white/10 bg-[#070707] px-4 py-12 sm:px-8 md:h-screen md:overflow-hidden md:px-10 md:py-10 lg:px-16"
    >
      
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] hidden h-[min(28vh,200px)] bg-gradient-to-b from-transparent via-[#050505]/40 to-[#050505]/92 md:block"
        aria-hidden
      />

      <div className="relative z-10 mb-8 md:mb-10">
        <p className="text-xs uppercase tracking-[0.18em] text-[#3f7cff]">The Narrative Process</p>
        <LensHeading
          text="Case Studies - The Core."
          className="mt-4 text-[clamp(1.5rem,5.5vw,4rem)] font-semibold uppercase leading-[0.98] tracking-[-0.01em]"
        />
      </div>

      <div
        ref={trackRef}
        className="relative z-10 flex w-full flex-col gap-8 will-change-transform md:h-[65vh] md:w-max md:flex-row md:flex-nowrap md:gap-6"
      >
        {NARRATIVE_PROJECTS.map((project) => (
          <NarrativeProcessCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
