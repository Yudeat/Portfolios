"use client";

import Image from "next/image";
import { forwardRef, useRef } from "react";
import { useNavMenu } from "@/components/providers/NavMenuProvider";
import { LanyardBadge } from "@/components/ui/LanyardBadge";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PIN_SCROLL_PX = 4000;

const IDCard = forwardRef<HTMLDivElement>(function IDCard(_, ref) {
  return (
    <div
      ref={ref}
      className="pointer-events-none absolute left-1/2 top-[38%] z-[10] w-[min(88vw,300px)] -translate-x-1/2 -translate-y-1/2 sm:top-[40%] sm:w-[min(80vw,340px)]"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/20 bg-[#0a0a0a]/80 shadow-[0_24px_80px_rgba(0,0,0,0.55)] ring-1 ring-white/10 backdrop-blur-sm">
        <Image
          src="/images/hero-narrative-clocks.jpg"
          alt=""
          fill
          sizes="(max-width:640px) 88vw, 340px"
          className="object-cover object-center"
          priority
        />
      </div>
    </div>
  );
});

const MainHeading = forwardRef<HTMLHeadingElement>(function MainHeading(_, ref) {
  return (
    <h2
      ref={ref}
      className="pointer-events-none absolute inset-x-8 bottom-[18vh] z-[11] text-center text-[clamp(1.85rem,6vw,3rem)] font-semibold tracking-[-0.04em] text-white [text-shadow:0_2px_40px_rgba(0,0,0,0.55)] sm:inset-x-12 lg:inset-x-20"
    >
      Make It Last
    </h2>
  );
});

const DescriptionText = forwardRef<HTMLDivElement>(function DescriptionText(_, ref) {
  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-[14] flex items-center justify-center px-8 sm:px-12 lg:px-16"
    >
      <p className="max-w-xl text-balance text-center text-[clamp(1.05rem,3.1vw,1.35rem)] font-light leading-[1.7] text-white/92 [text-shadow:0_2px_28px_rgba(0,0,0,0.7)]">
        Unforgettable memories are not stored — they are rebuilt every time we return to them. What we keep is the
        feeling, not the frame.
      </p>
    </div>
  );
});

function RevealImage() {
  return (
    <div className="relative aspect-square w-[min(72vw,280px)] sm:w-[min(64vw,320px)]">
      <Image
        src="/images/hero-narrative-sketch.jpg"
        alt=""
        fill
        sizes="(max-width:640px) 72vw, 320px"
        className="object-contain object-center"
        priority={false}
      />
    </div>
  );
}

export function Hero() {
  const { open } = useNavMenu();
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const ambientRef = useRef<HTMLDivElement>(null);
  const idCardRef = useRef<HTMLDivElement>(null);
  const mainHeadingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const whiteRevealRef = useRef<HTMLDivElement>(null);
  const revealStageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const scrollRoot = pinWrapRef.current;
      const ambient = ambientRef.current;
      const idCard = idCardRef.current;
      const mainHeading = mainHeadingRef.current;
      const description = descriptionRef.current;
      const whiteReveal = whiteRevealRef.current;
      const revealStage = revealStageRef.current;
      const headline = headlineRef.current;
      if (!scrollRoot || !sectionRef.current || !ambient || !idCard || !mainHeading || !description || !whiteReveal || !revealStage || !headline) return;

      gsap.set(ambient, { opacity: 1 });
      gsap.set(idCard, { opacity: 1, scale: 1, transformOrigin: "50% 50%", force3D: true });
      gsap.set(mainHeading, { opacity: 1, y: 0, force3D: true });
      gsap.set(description, { opacity: 0, y: 14, force3D: true });
      gsap.set(whiteReveal, { opacity: 0 });
      gsap.set(revealStage, { opacity: 0, scale: 0.96, transformOrigin: "50% 50%", force3D: true });
      gsap.set(headline, { opacity: 0, y: 28, force3D: true });

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

      // Opening: ID card + main heading out together (overlapped by description rising in).
      tl.to(idCard, { opacity: 0, scale: 0.92, duration: 18 }, 0);
      tl.to(mainHeading, { opacity: 0, y: -22, duration: 18 }, 0);
      tl.fromTo(description, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 22 }, 9);

      // White sits below description (z-order); fade description as white rises so text never sits on near-white.
      tl.to(description, { opacity: 0, y: -12, duration: 16 }, 30);
      tl.fromTo(whiteReveal, { opacity: 0 }, { opacity: 1, duration: 40 }, 34);
      tl.fromTo(revealStage, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 32 }, 38);
      tl.to(ambient, { opacity: 0, duration: 36 }, 32);

      // Portfolio block on white (final read).
      tl.fromTo(headline, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 22 }, 70);
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[100dvh] overflow-hidden border-b border-white/10 bg-[#050505]"
    >
      <div ref={pinWrapRef} data-hero-dive className="relative h-screen min-h-[100dvh] w-full min-w-0">
        <div ref={ambientRef} className="absolute inset-0 z-[4]">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <Image
              src="/images/hero-wireframe-astronaut.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-[center_32%] mix-blend-screen opacity-[0.22] max-sm:scale-[1.02] sm:scale-105 sm:object-[center_35%] sm:opacity-[0.34]"
              priority
            />
          </div>
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-[min(56vw,260px)] mix-blend-soft-light opacity-[0.12] sm:w-[min(52vw,420px)] sm:opacity-[0.18]"
            aria-hidden
          >
            <Image
              src="/images/hero-circuit-silhouette.png"
              alt=""
              fill
              sizes="(max-width:640px) 56vw, 420px"
              className="object-contain object-left"
              priority={false}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/94 via-[#050505]/58 to-[#050505]/94 max-sm:from-[#050505]/96 max-sm:via-[#050505]/62 max-sm:to-[#050505]/96 sm:from-[#050505]/88 sm:via-[#050505]/50 sm:to-[#050505]/92" />
        </div>

        {/* White sits under description + reveal so light fill never washes out mid-phase copy */}
        <div
          ref={whiteRevealRef}
          className="pointer-events-none absolute inset-0 z-[8] bg-white will-change-[opacity]"
          aria-hidden
        />

        <IDCard ref={idCardRef} />
        <MainHeading ref={mainHeadingRef} />
        <DescriptionText ref={descriptionRef} />

        <div
          ref={revealStageRef}
          className="pointer-events-none absolute inset-0 z-[18] flex flex-col items-center justify-center gap-8 px-6 pt-[max(0.5rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] will-change-[opacity,transform]"
        >
          <RevealImage />
          <div className="max-w-md text-center">
            <p className="text-[clamp(1.45rem,4.2vw,2.1rem)] font-medium tracking-[-0.03em] text-neutral-900">
              They are felt.
            </p>
            <p className="mt-3 text-sm font-light leading-relaxed text-neutral-600 sm:text-base">
              Not recalled — lived again, briefly, in the body.
            </p>
          </div>
        </div>

        <div
          ref={headlineRef}
          className="pointer-events-none absolute inset-x-0 bottom-[11vh] z-[30] max-h-[min(92dvh,calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)))] pt-[max(0.5rem,env(safe-area-inset-top))] pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] pb-[max(6.5rem,calc(env(safe-area-inset-bottom)+5.25rem))] max-sm:bottom-[max(0.5rem,env(safe-area-inset-bottom,0px))] max-sm:pb-[max(7rem,calc(env(safe-area-inset-bottom)+5.75rem))] sm:px-8 sm:pb-0 sm:pt-0 lg:px-16"
        >
          <div className="mx-auto flex h-full min-h-0 w-full max-w-7xl min-w-0 flex-col justify-end pb-1 sm:block sm:pb-0">
            <div className="relative mx-auto w-full max-w-[min(100%,22rem)] text-center min-[400px]:max-w-[min(100%,26rem)] sm:mx-0 sm:max-w-3xl sm:text-left lg:max-w-[42rem]">
              <div className="mb-5 flex flex-col items-center gap-2.5 sm:mb-8 sm:gap-3 sm:items-start">
                <span
                  className="h-px w-10 shrink-0 bg-gradient-to-r from-transparent via-[#3f7cff] to-transparent sm:w-14 sm:from-[#3f7cff] sm:to-transparent sm:opacity-90"
                  aria-hidden
                />
                <p className="text-[0.62rem] font-medium uppercase tracking-[0.22em] text-[#2563eb] sm:text-[0.72rem] sm:tracking-[0.32em]">
                  Predeep Chaudary
                </p>
                <p className="max-w-[min(100%,20rem)] text-balance text-[0.62rem] font-normal uppercase leading-snug tracking-[0.14em] text-neutral-600 sm:max-w-md sm:text-[0.68rem] sm:leading-relaxed sm:tracking-[0.18em]">
                  Full-Stack Developer — Data Analyst — ML Engineer
                </p>
              </div>

              <h1 className="text-balance text-[clamp(1.65rem,6.8vw,3.1rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-neutral-950 sm:text-[clamp(2.15rem,5.2vw,4.25rem)] sm:leading-[1.02] sm:tracking-[-0.038em] lg:text-[clamp(2.35rem,4.8vw,4.85rem)]">
                Engineering Scalable Digital Products Through{" "}
                <span className="bg-gradient-to-r from-neutral-950 via-neutral-800 to-[#2563eb] bg-clip-text text-transparent">
                  Full-Stack Innovation
                </span>
                .
              </h1>

              <div className="mx-auto mt-6 h-px max-w-[3.5rem] bg-gradient-to-r from-transparent via-neutral-300 to-transparent sm:mt-8 sm:max-w-[5rem] sm:mx-0" aria-hidden />

              <p className="mx-auto mt-6 max-w-[min(100%,22rem)] text-balance text-[0.9375rem] font-light leading-[1.58] text-neutral-600 sm:mt-8 sm:max-w-[34rem] sm:text-[clamp(1rem,1.55vw,1.2rem)] sm:leading-[1.65] sm:mx-0">
                High-performance systems, user-centric storytelling, and product architecture designed to convert intent
                into measurable outcomes.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="sr-only">
        <h2>Intro sequence</h2>
        <p>Scroll-driven hero: ID, heading, description, white reveal, and portfolio introduction.</p>
      </div>

      <LanyardBadge bindToHero={headlineRef} onMenuClick={open} />
    </section>
  );
}
