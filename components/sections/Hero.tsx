"use client";

import { forwardRef, useRef, useState } from "react";
import { useNavMenu } from "@/components/providers/NavMenuProvider";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import { LanyardBadge } from "@/components/ui/LanyardBadge";
import { HeroAboutScrapbook } from "@/components/sections/HeroAboutScrapbook";
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

/** Pin scroll distance — shorter = fewer wheel turns through the landing story. */
const PIN_SCROLL_PX = 1450;

/** Left peek per layer for the hero deck (ambient → landing; about is the top card). */
const HERO_DECK_STEP_REM = 3.25;

/** About scrapbook slides over editorial landing (scrub timeline beats). */
const PHILOSOPHY_CARD_START = 8;
const PHILOSOPHY_CARD_DURATION = 14;

/** Scroll hint fades out early so the deck motion owns the scroll. */
const SCROLL_CUE_FADE_START = 10;
const SCROLL_CUE_FADE_DURATION = 12;

/** About panel: translate first, then fade — avoids “all layers at 0 opacity” at once. */
const ABOUT_EXIT_START = 34;
const ABOUT_EXIT_MOVE_DURATION = 4;
const ABOUT_EXIT_FADE_DURATION = 2;

/** Slight lag vs about motion — landing/ambient still read while the white panel travels. */
const AMBIENT_LANDING_FADE_START = 36;
const AMBIENT_LANDING_FADE_DURATION = 6;

/** Subtle shell wash during exit (same endpoints as body bg — no hard cut to void). */
const HERO_BG_WASH_START = ABOUT_EXIT_START;
const HERO_BG_WASH_IN = 3;
const HERO_BG_WASH_OUT = 3;

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
      const shell = sectionRef.current;
      const ambient = ambientRef.current;
      const landingInnovation = landingInnovationRef.current;
      const philosophyPage = philosophyPageRef.current;
      const lanyardContainer = lanyardContainerRef.current;
      const scrollCue = scrollCueRef.current;

      if (
        !scrollRoot ||
        !shell ||
        !ambient ||
        !landingInnovation ||
        !philosophyPage ||
        !lanyardContainer ||
        !scrollCue
      ) {
        return;
      }

      gsap.set(shell, { backgroundColor: "#050505" });
      gsap.set(ambient, { autoAlpha: 1 });
      gsap.set(landingInnovation, { autoAlpha: 1 });
      gsap.set(lanyardContainer, { autoAlpha: 1 });
      gsap.set(philosophyPage, { x: "100%", autoAlpha: 1, force3D: true });
      gsap.set(scrollCue, { autoAlpha: 1 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          id: "hero-pin",
          trigger: scrollRoot,
          start: "top top",
          end: `+=${PIN_SCROLL_PX}`,
          pin: true,
          pinSpacing: true,
          /** `scrub: 1` lagged ~1s behind scroll — felt like dead air after the About layer. */
          scrub: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      tl.addLabel("scrollCueFade", SCROLL_CUE_FADE_START);
      tl.to(scrollCue, { autoAlpha: 0, duration: SCROLL_CUE_FADE_DURATION }, "scrollCueFade");

      tl.addLabel("aboutEnter", PHILOSOPHY_CARD_START);
      tl.fromTo(
        philosophyPage,
        { x: "100%" },
        { x: "0%", duration: PHILOSOPHY_CARD_DURATION, ease: "power1.out" },
        "aboutEnter",
      );


      tl.to(
        shell,
        { backgroundColor: "#0f1624", duration: HERO_BG_WASH_IN, ease: "sine.inOut" },
        HERO_BG_WASH_START,
      );
      tl.to(
        shell,
        { backgroundColor: "#050505", duration: HERO_BG_WASH_OUT, ease: "sine.inOut" },
        HERO_BG_WASH_START + HERO_BG_WASH_IN,
      );

      tl.addLabel("ambientLandingFade", AMBIENT_LANDING_FADE_START);
      tl.to(ambient, { autoAlpha: 0, duration: AMBIENT_LANDING_FADE_DURATION }, "ambientLandingFade");
      tl.to(landingInnovation, { autoAlpha: 0, duration: AMBIENT_LANDING_FADE_DURATION }, "ambientLandingFade");
      tl.to(lanyardContainer, { autoAlpha: 0, duration: AMBIENT_LANDING_FADE_DURATION * 0.85 }, "ambientLandingFade");

      return () => {};
    },
    { revertOnUpdate: true },
  );

  return (
    <section id="hero" ref={sectionRef} className="relative z-0 min-h-[100dvh] w-full min-w-0 overflow-hidden bg-[#050505]">
      <div ref={pinWrapRef} className="relative h-[100dvh] min-h-[100dvh] w-full min-w-0 overflow-hidden">
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

        {/* Card 3 — about scrapbook: full-bleed white panel (no left “deck peek” strip). */}
        <div
          ref={philosophyPageRef}
          className="pointer-events-auto absolute inset-0 z-[22] flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden bg-white will-change-transform"
        >
          <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-start overflow-hidden px-5 pb-[max(0.5rem,env(safe-area-inset-bottom,0px))] pt-3 sm:px-7 sm:pb-3 sm:pt-4 md:px-9">
            <HeroAboutScrapbook />
          </div>
        </div>

        <ScrollDownCue ref={scrollCueRef} />
      </div>
    </section>
  );
}
