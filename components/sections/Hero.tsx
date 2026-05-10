"use client";

import { forwardRef, useRef, useState } from "react";
import { useNavMenu } from "@/components/providers/NavMenuProvider";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import { LanyardBadge } from "@/components/ui/LanyardBadge";
import { HeroAboutScrapbook } from "@/components/sections/HeroAboutScrapbook";
import { HeroExperiences } from "@/components/sections/HeroExperiences";
import { HeroLandingAmbient } from "@/components/sections/HeroLandingAmbient";
import { TypewriterText } from "@/components/ui/TypewriterText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const LANDING_HEADLINE_LEAD = "Engineering Scalable Digital Products Through ";
const LANDING_HEADLINE_FOCUS = "Full-Stack Innovation";
const LANDING_SUB =
  "High-performance systems and user-centric storytelling designed to convert intent into outcomes.";

/** Long pin so intro + 3 experience “beats” + exit each get enough scroll distance. */
const PIN_SCROLL_PX = 10_500;

/** Left peek per layer for the three in-hero “cards” (ambient → landing → about), right-aligned deck. */
const HERO_DECK_STEP_REM = 3.25;

/** About scrapbook slides over editorial landing (scrub timeline beats). */
const PHILOSOPHY_CARD_START = 14;
const PHILOSOPHY_CARD_DURATION = 26;

/** Crossfade About → Experiences (same scroll window so landing does not flash through). */
const PHIL_PAGE_EXIT_START = 74;
const PHIL_PAGE_EXIT_DURATION = 22;

/**
 * Timeline “time” bounds for the pinned hero scrub (see useGSAP).
 * While time is in [EXPERIENCE_PAGE_ZONE_START, EXPERIENCE_PAGE_ZONE_END), scrolling advances ML → Web → Manager (equal thirds).
 * After that, experiences exit and the document continues to the sections below.
 */
const EXPERIENCE_PAGE_ZONE_START = 96;
const EXPERIENCE_PAGE_ZONE_END = 210;

const EXPERIENCES_EXIT_START = 210;
const EXPERIENCES_EXIT_DURATION = 22;

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
        className="pointer-events-auto flex cursor-pointer flex-col items-center gap-2 rounded-xl py-2 text-white outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-white/90 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
      >
        <span className="font-sans text-[0.5625rem] font-medium uppercase tracking-[0.52em] sm:text-[0.625rem] sm:tracking-[0.62em]">
          Scroll down
        </span>
        <span className="animate-hero-scroll-hint-bounce inline-flex text-white" aria-hidden>
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
  /** 0 lead → 1 focus phrase → 2 headline done → 3 body typed */
  const [landingTextStep, setLandingTextStep] = useState(0);
  /** Drives HeroExperiences deck: 0 ML → 1 Web → 2 Manager (synced to scroll in pinned hero). */
  const [experiencePage, setExperiencePage] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const ambientRef = useRef<HTMLDivElement>(null);
  const landingInnovationRef = useRef<HTMLDivElement>(null);
  const philosophyPageRef = useRef<HTMLDivElement>(null);
  const experiencesPageRef = useRef<HTMLDivElement>(null);
  const lanyardContainerRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const scrollRoot = pinWrapRef.current;
      const ambient = ambientRef.current;
      const landingInnovation = landingInnovationRef.current;
      const philosophyPage = philosophyPageRef.current;
      const experiencesPage = experiencesPageRef.current;
      const lanyardContainer = lanyardContainerRef.current;
      const scrollCue = scrollCueRef.current;

      if (
        !scrollRoot ||
        !ambient ||
        !landingInnovation ||
        !philosophyPage ||
        !experiencesPage ||
        !lanyardContainer ||
        !scrollCue
      ) {
        return;
      }

      gsap.set(ambient, { autoAlpha: 1 });
      gsap.set(landingInnovation, { autoAlpha: 1 });
      gsap.set(lanyardContainer, { autoAlpha: 1 });
      gsap.set(philosophyPage, { x: "100%", autoAlpha: 1, force3D: true });
      gsap.set(experiencesPage, { autoAlpha: 0, x: "0%", force3D: true });
      gsap.set(scrollCue, { autoAlpha: 1 });

      let tl: gsap.core.Timeline;
      let lastExpPage = -1;

      const syncExperiencePageFromTimeline = () => {
        const time = tl.time();
        let next: 0 | 1 | 2 = 0;
        if (time < PHIL_PAGE_EXIT_START) {
          next = 0;
        } else if (time < EXPERIENCE_PAGE_ZONE_START) {
          next = 0;
        } else if (time >= EXPERIENCE_PAGE_ZONE_START && time < EXPERIENCE_PAGE_ZONE_END) {
          const span = EXPERIENCE_PAGE_ZONE_END - EXPERIENCE_PAGE_ZONE_START;
          const u = span > 0 ? (time - EXPERIENCE_PAGE_ZONE_START) / span : 0;
          next = Math.min(2, Math.max(0, Math.floor(u * 3))) as 0 | 1 | 2;
        } else {
          next = 2;
        }
        if (next !== lastExpPage) {
          lastExpPage = next;
          setExperiencePage(next);
        }
      };

      tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: scrollRoot,
          start: "top top",
          end: `+=${PIN_SCROLL_PX}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
          /** Scrubbed timelines often skip `timeline` onUpdate; ScrollTrigger is authoritative. */
          onUpdate: syncExperiencePageFromTimeline,
        },
      });

      tl.to(scrollCue, { autoAlpha: 0, duration: 22 }, 16);

      tl.fromTo(
        philosophyPage,
        { x: "100%" },
        { x: "0%", duration: PHILOSOPHY_CARD_DURATION },
        PHILOSOPHY_CARD_START,
      );

      tl.to(
        philosophyPage,
        { autoAlpha: 0, x: "100%", duration: PHIL_PAGE_EXIT_DURATION },
        PHIL_PAGE_EXIT_START,
      );

      tl.fromTo(
        experiencesPage,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: PHIL_PAGE_EXIT_DURATION },
        PHIL_PAGE_EXIT_START,
      );

      tl.to(
        experiencesPage,
        { autoAlpha: 0, x: "100%", duration: EXPERIENCES_EXIT_DURATION },
        EXPERIENCES_EXIT_START,
      );

      /** Hide landing + ambient during Experiences exit so the editorial hero does not reappear before #philosophy. */
      tl.to(ambient, { autoAlpha: 0, duration: EXPERIENCES_EXIT_DURATION }, EXPERIENCES_EXIT_START);
      tl.to(landingInnovation, { autoAlpha: 0, duration: EXPERIENCES_EXIT_DURATION }, EXPERIENCES_EXIT_START);

      syncExperiencePageFromTimeline();
    },
    { revertOnUpdate: true },
  );

  return (
    <section id="hero" ref={sectionRef} className="relative z-0 min-h-[100dvh] overflow-hidden bg-[#050505]">
      <div ref={pinWrapRef} className="relative h-screen min-h-[100dvh] w-full min-w-0 overflow-hidden">
        {/* Card 1 — full-bleed ambient (back of deck) */}
        <div ref={ambientRef} className="absolute inset-0 z-[4]">
          <HeroLandingAmbient />
        </div>

        {/* Card 2 — editorial + lanyard: right-aligned strip so ambient peeks from the left */}
        <div
          ref={landingInnovationRef}
          className="pointer-events-none absolute inset-y-0 right-0 z-[14] flex min-h-0 min-w-0 flex-col justify-end overflow-x-clip rounded-l-[1.25rem] border-l border-white/[0.09] shadow-[-22px_0_44px_-8px_rgba(0,0,0,0.42)] sm:rounded-l-3xl"
          style={{
            width: `calc(100% - ${HERO_DECK_STEP_REM}rem)`,
          }}
        >
          <div className="flex min-h-0 w-full flex-col justify-end px-8 pb-[max(10vh,2.75rem)] pt-[max(36%,180px)] sm:px-10 lg:px-16 lg:pb-[max(12vh,3rem)]">
            <div className="pointer-events-none mx-auto flex w-full max-w-7xl flex-col items-stretch gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
              <div className="max-w-[42rem] text-left">
              <h1 className="font-hero-serif text-balance text-[clamp(1.65rem,6.2vw,3.95rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-white sm:text-[clamp(1.75rem,6.5vw,4.85rem)] sm:leading-[1.02]">
                {landingTextStep === 0 ? (
                  <TypewriterText
                    as="span"
                    text={LANDING_HEADLINE_LEAD}
                    className="inline"
                    charDelayMs={16}
                    onComplete={() => setLandingTextStep(1)}
                  />
                ) : (
                  <span>{LANDING_HEADLINE_LEAD}</span>
                )}
                {landingTextStep === 1 ? (
                  <TypewriterText
                    as="span"
                    text={LANDING_HEADLINE_FOCUS}
                    className="inline bg-gradient-to-r from-white via-neutral-100 to-sky-300 bg-clip-text text-transparent"
                    charDelayMs={18}
                    startDelayMs={40}
                    onComplete={() => setLandingTextStep(2)}
                  />
                ) : landingTextStep >= 2 ? (
                  <span className="inline bg-gradient-to-r from-white via-neutral-100 to-sky-300 bg-clip-text text-transparent">
                    {LANDING_HEADLINE_FOCUS}
                  </span>
                ) : null}
                {landingTextStep >= 2 ? "." : null}
              </h1>
              {landingTextStep === 2 ? (
                <TypewriterText
                  as="p"
                  text={LANDING_SUB}
                  className="mt-6 max-w-[34rem] text-[clamp(0.95rem,1.55vw,1.2rem)] font-light leading-relaxed text-white/88 sm:mt-8"
                  charDelayMs={12}
                  onComplete={() => setLandingTextStep(3)}
                />
              ) : landingTextStep >= 3 ? (
                <p className="mt-6 max-w-[34rem] text-[clamp(0.95rem,1.55vw,1.2rem)] font-light leading-relaxed text-white/88 sm:mt-8">
                  {LANDING_SUB}
                </p>
              ) : null}
              </div>
              <div
                ref={lanyardContainerRef}
                className="pointer-events-auto relative mx-auto h-[min(360px,44svh)] w-full max-w-[300px] shrink-0 sm:max-w-[320px] lg:mx-0 lg:h-[min(480px,calc(100svh-11rem))] lg:max-w-[360px] lg:self-stretch"
              >
                <LanyardBadge onMenuClick={open} />
              </div>
            </div>
          </div>
        </div>

        {/* Experiences sits under About (z-22) until crossfade; pointer-events hit About first while it is visible */}
        <div
          ref={experiencesPageRef}
          className="pointer-events-auto absolute inset-0 z-[20] flex min-h-0 flex-col overflow-hidden bg-[#8B004A] will-change-transform"
        >
          <HeroExperiences pageIndex={experiencePage} />
        </div>

        {/* Card 3 — about scrapbook: narrowest layer, slides in from the right */}
        <div
          ref={philosophyPageRef}
          className="pointer-events-auto absolute inset-y-0 right-0 z-[22] flex h-full min-h-0 min-w-0 flex-col overflow-y-auto overscroll-contain rounded-l-[1.25rem] border-l border-black/[0.06] bg-white shadow-[-28px_0_60px_-12px_rgba(0,0,0,0.38)] will-change-transform sm:rounded-l-3xl"
          style={{
            width: `calc(100% - ${2 * HERO_DECK_STEP_REM}rem)`,
          }}
        >
          <HeroAboutScrapbook />
        </div>

        <ScrollDownCue ref={scrollCueRef} />
      </div>
    </section>
  );
}
