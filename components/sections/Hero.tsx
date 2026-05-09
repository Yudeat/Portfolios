"use client";

import { forwardRef, useRef } from "react";
import { useNavMenu } from "@/components/providers/NavMenuProvider";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import { LanyardBadge } from "@/components/ui/LanyardBadge";
import { HeroLandingAmbient } from "@/components/sections/HeroLandingAmbient";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PIN_SCROLL_PX = 4600;

/** Dark philosophy quote card slides over editorial landing (scrub timeline beats). */
const PHILOSOPHY_CARD_START = 14;
const PHILOSOPHY_CARD_DURATION = 26;

/** Unveil pinned tail before first sticky stack (`#philosophy`). */
const PHIL_PAGE_EXIT_START = 74;
const PHIL_PAGE_EXIT_DURATION = 22;

const ScrollDownCue = forwardRef<HTMLDivElement>(function ScrollDownCue(_, ref) {
  const lenis = useLenis();

  const nudgeScroll = () => {
    const delta = Math.min(Math.round(window.innerHeight * 0.28), 520);
    const target = Math.min(window.scrollY + delta, document.documentElement.scrollHeight - window.innerHeight);
    if (lenis) {
      lenis.scrollTo(target, { duration: 0.95 });
    } else {
      window.scrollTo({ top: target, behavior: "smooth" });
    }
  };

  return (
    <div
      ref={ref}
      className="absolute bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-[18] flex w-full max-w-xl -translate-x-1/2 flex-col items-center justify-end px-4 sm:bottom-[max(1.5rem,env(safe-area-inset-bottom))]"
    >
      <button
        type="button"
        aria-label="Scroll down"
        onClick={nudgeScroll}
        className="pointer-events-auto flex cursor-pointer flex-col items-center gap-2 rounded-xl py-2 text-neutral-950 outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
      >
        <span className="font-sans text-[0.5625rem] font-medium uppercase tracking-[0.52em] sm:text-[0.625rem] sm:tracking-[0.62em]">
          Scroll down
        </span>
        <span className="animate-hero-scroll-hint-bounce inline-flex text-neutral-950" aria-hidden>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 8 6 6 6-6" />
              <path d="m6 14 6 6 6-6" />
            </g>
          </svg>
        </span>
      </button>
    </div>
  );
});

export function Hero() {
  const { open } = useNavMenu();

  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const ambientRef = useRef<HTMLDivElement>(null);
  const landingInnovationRef = useRef<HTMLDivElement>(null);
  const philosophyPageRef = useRef<HTMLDivElement>(null);
  const lanyardContainerRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const scrollRoot = pinWrapRef.current;
      const ambient = ambientRef.current;
      const landingInnovation = landingInnovationRef.current;
      const philosophyPage = philosophyPageRef.current;
      const lanyardContainer = lanyardContainerRef.current;
      const scrollCue = scrollCueRef.current;

      if (!scrollRoot || !ambient || !landingInnovation || !philosophyPage || !lanyardContainer || !scrollCue) {
        return;
      }

      gsap.set(ambient, { autoAlpha: 1 });
      gsap.set(landingInnovation, { autoAlpha: 1 });
      gsap.set(lanyardContainer, { autoAlpha: 1 });
      gsap.set(philosophyPage, { y: "100%", autoAlpha: 1, force3D: true });
      gsap.set(scrollCue, { autoAlpha: 1 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: scrollRoot,
          start: "top top",
          end: `+=${PIN_SCROLL_PX}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(scrollCue, { autoAlpha: 0, duration: 22 }, 16);

      tl.fromTo(
        philosophyPage,
        { y: "100%" },
        { y: "0%", duration: PHILOSOPHY_CARD_DURATION },
        PHILOSOPHY_CARD_START,
      );

      tl.to(
        philosophyPage,
        { autoAlpha: 0, y: "-28%", duration: PHIL_PAGE_EXIT_DURATION },
        PHIL_PAGE_EXIT_START,
      );
    },
    { revertOnUpdate: true },
  );

  return (
    <section id="hero" ref={sectionRef} className="relative z-0 min-h-[100dvh] overflow-hidden bg-[#050505]">
      <div ref={pinWrapRef} className="relative h-screen min-h-[100dvh] w-full min-w-0 overflow-hidden">
        <div ref={ambientRef} className="absolute inset-0 z-[4]">
          <HeroLandingAmbient />
        </div>

        <div
          ref={landingInnovationRef}
          className="pointer-events-none absolute inset-0 z-[14] flex min-h-0 flex-col justify-end px-8 pb-[max(10vh,2.75rem)] pt-[max(36%,180px)] sm:px-10 lg:px-16 lg:pb-[max(12vh,3rem)]"
        >
          <div className="pointer-events-none mx-auto flex w-full max-w-7xl flex-col items-stretch gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div className="max-w-[42rem] text-left">
              <h1 className="font-hero-serif text-balance text-[clamp(1.65rem,6.2vw,3.95rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-neutral-950 sm:text-[clamp(1.75rem,6.5vw,4.85rem)] sm:leading-[1.02]">
                Engineering Scalable Digital Products Through{" "}
                <span className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-[#2563eb] bg-clip-text text-transparent">
                  Full-Stack Innovation
                </span>
                .
              </h1>
              <p className="mt-6 max-w-[34rem] text-[clamp(0.95rem,1.55vw,1.2rem)] font-light leading-relaxed text-neutral-950/82 sm:mt-8">
                High-performance systems and user-centric storytelling designed to convert intent into outcomes.
              </p>
            </div>
            <div
              ref={lanyardContainerRef}
              className="pointer-events-auto relative mx-auto h-[min(360px,44svh)] w-full max-w-[300px] shrink-0 sm:max-w-[320px] lg:mx-0 lg:h-[min(480px,calc(100svh-11rem))] lg:max-w-[360px] lg:self-stretch"
            >
              <LanyardBadge onMenuClick={open} />
            </div>
          </div>
        </div>

        {/* Philosophy quote — stacks over editorial */}
        <div
          ref={philosophyPageRef}
          className="pointer-events-none absolute inset-0 z-[22] flex translate-y-full flex-col bg-[#0a0a0a] shadow-[0_-36px_80px_-14px_rgba(0,0,0,0.75)] will-change-transform"
        >
          <div className="flex min-h-full flex-col items-center justify-center px-6 pb-[max(3rem,env(safe-area-inset-bottom))] pt-[max(3rem,env(safe-area-inset-top))] sm:px-12">
            <p className="max-w-xl text-balance text-center text-[clamp(1.05rem,3.1vw,1.35rem)] font-light leading-[1.7] text-white/92">
              Unforgettable memories are not stored — they are rebuilt every time we return to them.
            </p>
          </div>
        </div>

        <ScrollDownCue ref={scrollCueRef} />
      </div>
    </section>
  );
}
