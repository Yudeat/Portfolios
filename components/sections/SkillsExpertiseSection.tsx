"use client";

import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { useLenis } from "@/components/providers/SmoothScrollProvider";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type SkillDef = { id: string; label: string };

const SKILLS_LIGHT: SkillDef[] = [
  { id: "next", label: "Next.js" },
  { id: "typescript", label: "TypeScript" },
  { id: "three", label: "Three.js" },
  { id: "gsap", label: "GSAP" },
  { id: "figma", label: "Figma" },
  { id: "uiux", label: "UI/UX" },
  { id: "responsive", label: "Responsive" },
  { id: "react", label: "React" },
];

const SKILLS_DARK: SkillDef[] = [
  { id: "git", label: "Git" },
  { id: "docker", label: "Docker" },
  { id: "webgl", label: "WebGL" },
  { id: "mongo", label: "MongoDB" },
  { id: "rest", label: "REST API" },
  { id: "cicd", label: "CI/CD" },
  { id: "webpack", label: "Webpack" },
  { id: "node", label: "Node.js" },
];

type CoreCard = { id: string; title: string; subtitle: string; index: number };

const CORE_TECHNOLOGIES: CoreCard[] = [
  { id: "react", title: "React", subtitle: "5+ YEARS", index: 1 },
  { id: "three", title: "Three.js", subtitle: "3D EXPERT", index: 2 },
  { id: "next", title: "Next.js", subtitle: "FRAMEWORK", index: 3 },
  { id: "gsap", title: "GSAP", subtitle: "ANIMATIONS", index: 4 },
  { id: "typescript", title: "TypeScript", subtitle: "TYPE-SAFE", index: 5 },
  { id: "nodeRack", title: "Node.js", subtitle: "BACKEND", index: 6 },
];

const SOFT_SKILLS: CoreCard[] = [
  { id: "leadership", title: "Leadership", subtitle: "TEAM LEAD", index: 1 },
  { id: "communication", title: "Communication", subtitle: "CLEAR & EFFECTIVE", index: 2 },
  { id: "problem", title: "Problem Solving", subtitle: "CREATIVE SOLUTIONS", index: 3 },
  { id: "adaptability", title: "Adaptability", subtitle: "FAST LEARNER", index: 4 },
  { id: "collaboration", title: "Collaboration", subtitle: "TEAM PLAYER", index: 5 },
  { id: "creativity", title: "Creativity", subtitle: "INNOVATIVE", index: 6 },
];

const STATS = [
  { value: "15+", line: "TECHNOLOGIES", sub: "MASTERED" },
  { value: "500+", line: "COMMITS", sub: "THIS YEAR" },
  { value: "50+", line: "PROJECTS", sub: "DELIVERED" },
  { value: "100%", line: "PERFORMANCE", sub: "DRIVEN" },
];

function ExpertiseCardIcon({ id, className }: { id: string; className?: string }) {
  const c = className ?? "h-5 w-5";
  switch (id) {
    case "react":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" />
        </svg>
      );
    case "three":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 4l7 4v8l-7 4-7-4V8l7-4Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
          <path d="M12 4v8l7 4M12 12L5 16" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
        </svg>
      );
    case "next":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M8 8h8v8H8V8Z" stroke="currentColor" strokeWidth="1.4" />
          <path d="M8 4h8M8 16h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "gsap":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M13 3L4 14h7l-1 7 9-11h-7l1-7Z" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" />
        </svg>
      );
    case "typescript":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 9h6M5 13h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M15 7v10l4-2.5L15 7Z" fill="currentColor" />
        </svg>
      );
    case "nodeRack":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="5" y="5" width="14" height="5" rx="1" stroke="currentColor" strokeWidth="1.25" />
          <circle cx="9" cy="7.5" r="1" fill="currentColor" />
          <circle cx="15" cy="7.5" r="1" fill="currentColor" />
          <rect x="5" y="12" width="14" height="5" rx="1" stroke="currentColor" strokeWidth="1.25" />
          <circle cx="9" cy="14.5" r="1" fill="currentColor" />
          <circle cx="15" cy="14.5" r="1" fill="currentColor" />
        </svg>
      );
    case "leadership":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.35" />
          <path d="M6 20v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
          <circle cx="17" cy="7" r="1.5" fill="currentColor" />
        </svg>
      );
    case "communication":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M6 9a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3h-4l-4 3v-3H9a3 3 0 0 1-3-3V9Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "problem":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 5c-2 2.5-3.5 5-3.5 7.5a3.5 3.5 0 0 0 7 0C15.5 10 14 7.5 12 5Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path d="M9 14h6M10 17h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "adaptability":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.25" />
          <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      );
    case "collaboration":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M8 11c-1.5 0-3 1-3 3v2h4M16 11c1.5 0 3 1 3 3v2h-4M12 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M9 16h6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        </svg>
      );
    case "creativity":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 4a5 5 0 0 0-2 9.5V19h4v-5.5A5 5 0 0 0 12 4Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path d="M10 19h4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.35" />
        </svg>
      );
  }
}

function ExpertiseSkillCard({ item }: { item: CoreCard }) {
  return (
    <article className="relative flex min-h-[11.5rem] flex-col border border-neutral-900 bg-neutral-100 p-4 text-neutral-900 sm:min-h-[12.5rem] sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center border border-neutral-900 bg-white sm:size-12">
          <ExpertiseCardIcon id={item.id} />
        </div>
        <span className="font-mono text-sm tabular-nums text-neutral-500 sm:text-base">
          {String(item.index).padStart(2, "0")}
        </span>
      </div>
      <div className="mt-6 flex flex-1 flex-col justify-end sm:mt-8">
        <h3 className="text-2xl font-bold leading-tight tracking-[-0.02em] sm:text-[1.75rem]">{item.title}</h3>
        <p className="mt-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-600 sm:text-[11px] sm:tracking-[0.22em]">
          {item.subtitle}
        </p>
      </div>
    </article>
  );
}

function SkillGlyph({ id, className }: { id: string; className?: string }) {
  const c = className ?? "h-[18px] w-[18px] shrink-0";
  switch (id) {
    case "next":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M8 8h8v8H8V8Z" stroke="currentColor" strokeWidth="1.4" />
          <path d="M8 4h8M8 16h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "typescript":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 9h6M5 13h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M15 7v10l4-2.5L15 7Z" fill="currentColor" />
        </svg>
      );
    case "three":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 4l7 4v8l-7 4-7-4V8l7-4Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
          <path d="M12 4v8l7 4M12 12L5 16" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
        </svg>
      );
    case "gsap":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M13 3L4 14h7l-1 7 9-11h-7l1-7Z" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" />
        </svg>
      );
    case "figma":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="9" cy="8" r="3.25" stroke="currentColor" strokeWidth="1.25" />
          <path d="M12.25 8a3.25 3.25 0 1 1 3.25 3.25H9" stroke="currentColor" strokeWidth="1.25" />
          <path d="M12.25 14.5a3.25 3.25 0 1 1-3.25 3.25" stroke="currentColor" strokeWidth="1.25" />
        </svg>
      );
    case "uiux":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 5c-2.5 3-4 5.5-4 8a4 4 0 0 0 8 0c0-2.5-1.5-5-4-8Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="14" r="1.2" fill="currentColor" />
        </svg>
      );
    case "responsive":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="7" y="5" width="10" height="14" rx="2" stroke="currentColor" strokeWidth="1.35" />
          <path d="M10 18h4" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
        </svg>
      );
    case "react":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" />
        </svg>
      );
    case "git":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="8" cy="8" r="2.25" stroke="currentColor" strokeWidth="1.35" />
          <circle cx="16" cy="16" r="2.25" stroke="currentColor" strokeWidth="1.35" />
          <path d="M9.6 9.6l4.8 4.8M14 8v4M8 14h4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        </svg>
      );
    case "docker":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="5" y="10" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
          <rect x="10" y="10" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
          <rect x="15" y="10" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
          <rect x="7.5" y="6" width="9" height="3" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
    case "webgl":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        </svg>
      );
    case "mongo":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <ellipse cx="12" cy="7" rx="5" ry="3" stroke="currentColor" strokeWidth="1.25" />
          <path d="M7 7v7c0 2.5 2.2 4.5 5 4.5s5-2 5-4.5V7" stroke="currentColor" strokeWidth="1.25" />
        </svg>
      );
    case "rest":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.25" />
          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        </svg>
      );
    case "cicd":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M14.5 6.5L18 10l-8 8-6-6 3.5-3.5"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M10 18h8" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
        </svg>
      );
    case "webpack":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="6" y="6" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.35" />
          <path d="M9 9h6v6H9V9Z" stroke="currentColor" strokeWidth="1.1" />
        </svg>
      );
    case "node":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 4l7 4v8l-7 4-7-4V8l7-4Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
          <path d="M12 8v8" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.35" />
        </svg>
      );
  }
}

function SkillPill({ skill, variant }: { skill: SkillDef; variant: "light" | "dark" }) {
  const skin =
    variant === "light"
      ? "border-neutral-900 bg-white text-neutral-900 shadow-sm"
      : "border-white/45 bg-[#0a0a0a] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]";
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-2.5 rounded-md border px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] sm:px-5 sm:text-xs sm:tracking-[0.14em] ${skin}`}
    >
      <SkillGlyph id={skill.id} />
      {skill.label}
    </span>
  );
}

function MarqueeTrack({
  skills,
  variant,
  trackRef,
}: {
  skills: SkillDef[];
  variant: "light" | "dark";
  trackRef: RefObject<HTMLDivElement | null>;
}) {
  const doubled = [...skills, ...skills];
  return (
    <div className="overflow-hidden py-1.5">
      <div ref={trackRef} className="flex w-max flex-nowrap items-center gap-3 pr-3 will-change-transform sm:gap-3.5">
        {doubled.map((skill, i) => (
          <SkillPill key={`${skill.id}-${i}`} skill={skill} variant={variant} />
        ))}
      </div>
    </div>
  );
}

/**
 * Expertise intro, marquee skill rows, core tech + soft skill grids, stats strip.
 */
export function SkillsExpertiseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      lenis?.resize();
      ScrollTrigger.refresh();
    });
    return () => window.cancelAnimationFrame(id);
  }, [lenis]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const t1 = track1Ref.current;
      const t2 = track2Ref.current;
      if (!section || !t1 || !t2) return;

      const half1 = () => t1.scrollWidth / 2;
      const half2 = () => t2.scrollWidth / 2;

      gsap.set(t1, { x: 0, force3D: true });
      gsap.set(t2, { x: 0, force3D: true });

      const tween1 = gsap.to(t1, {
        x: () => -half1(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.85,
          invalidateOnRefresh: true,
        },
      });

      const tween2 = gsap.fromTo(
        t2,
        { x: () => -half2() * 0.28 },
        {
          x: () => half2() * 0.28,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.85,
            invalidateOnRefresh: true,
          },
        },
      );

      if (process.env.NODE_ENV === "development") {
        const log = (label: string, st: ScrollTrigger | null | undefined) => {
          if (!st) return;
          console.log(`[SkillsExpertiseSection] ${label}`, {
            id: st.vars.id,
            start: st.start,
            end: st.end,
            trigger: st.trigger,
          });
        };
        log("marquee row 1", tween1.scrollTrigger);
        log("marquee row 2", tween2.scrollTrigger);
      }

      const ro = new ResizeObserver(() => ScrollTrigger.refresh());
      ro.observe(section);
      ro.observe(t1);
      ro.observe(t2);

      return () => {
        ro.disconnect();
        tween1.scrollTrigger?.kill();
        tween1.kill();
        tween2.scrollTrigger?.kill();
        tween2.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col overflow-visible bg-[#060606] pb-16 pt-[clamp(4rem,14vh,8rem)] text-white sm:pb-20 sm:pt-[clamp(5rem,16vh,10rem)] lg:pb-24"
      aria-labelledby="skills-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:48px_48px]"
        aria-hidden
      />

      <div className="relative z-[1] mx-auto flex min-h-[min(64dvh,720px)] w-full max-w-3xl flex-col items-center justify-center px-4 py-6 text-center sm:max-w-4xl sm:py-8 lg:min-h-[min(72dvh,800px)] lg:px-6 lg:py-10">
        <div className="flex w-full max-w-md items-center justify-center gap-3 sm:max-w-xl sm:gap-5">
          <span className="h-px min-w-10 flex-1 bg-white/35 sm:min-w-14" aria-hidden />
          <p className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.32em] text-white/85 sm:text-[11px] sm:tracking-[0.36em]">
            Expertise
          </p>
          <span className="h-px min-w-10 flex-1 bg-white/35 sm:min-w-14" aria-hidden />
        </div>

        <h2
          id="skills-heading"
          className="font-hero-serif mt-10 flex flex-nowrap items-end justify-center gap-0 text-[clamp(3.25rem,13vw,8.75rem)] font-bold leading-[0.88] tracking-[-0.035em] text-white sm:mt-12 sm:leading-[0.9]"
        >
          <span>SK</span>
          <span className="relative inline-block px-[0.03em]">
            <span className="relative z-10">I</span>
            <span
              className="pointer-events-none absolute left-1/2 top-[55%] flex aspect-square w-[0.38em] max-h-[0.52em] -translate-x-1/2 -translate-y-1/2 items-center justify-center text-white"
              aria-hidden
            >
              <svg viewBox="0 0 16 16" className="h-full w-full" fill="none">
                <rect x="2.5" y="2.5" width="11" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.35" />
                <circle cx="8" cy="8" r="1.6" fill="currentColor" />
              </svg>
            </span>
          </span>
          <span>LLS</span>
        </h2>

        <p className="mt-8 max-w-xl text-pretty text-[clamp(0.9rem,2.1vw,1.125rem)] font-medium leading-relaxed text-white/58 sm:mt-10 sm:max-w-2xl">
          Technologies & tools mastered through years of practice and countless projects delivered
        </p>
      </div>

      <div className="relative z-[1] mt-10 w-full max-w-[100vw] sm:mt-14 lg:mt-16" aria-hidden>
        <MarqueeTrack skills={SKILLS_LIGHT} variant="light" trackRef={track1Ref} />
        <MarqueeTrack skills={SKILLS_DARK} variant="dark" trackRef={track2Ref} />
      </div>

      <div className="relative z-[1] mx-auto mt-16 w-full max-w-6xl px-4 sm:mt-20 sm:px-6 lg:px-8">
        <h3 className="text-left text-[10px] font-semibold uppercase tracking-[0.28em] text-white/65 sm:text-[11px]">
          Core technologies
        </h3>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3">
          {CORE_TECHNOLOGIES.map((item) => (
            <ExpertiseSkillCard key={item.id} item={item} />
          ))}
        </div>

        <h3 className="mt-14 text-left text-[10px] font-semibold uppercase tracking-[0.28em] text-white/65 sm:mt-16 sm:text-[11px]">
          Soft skills
        </h3>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3">
          {SOFT_SKILLS.map((item) => (
            <ExpertiseSkillCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div className="relative z-[1] mt-16 w-full border-t border-white/10 bg-black px-4 py-10 sm:mt-20 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.line}
              className="flex flex-col items-center justify-center border border-white px-2 py-6 text-center sm:px-4 sm:py-8"
            >
              <p className="text-xl font-bold tabular-nums text-white sm:text-2xl md:text-3xl">{s.value}</p>
              <p className="mt-2 font-mono text-[9px] font-semibold uppercase leading-tight tracking-[0.14em] text-white sm:text-[10px] sm:tracking-[0.16em]">
                {s.line}
              </p>
              <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.12em] text-white/55 sm:text-[9px] sm:tracking-[0.14em]">
                {s.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
