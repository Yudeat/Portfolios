"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Experience stack — Skiper 16–style sticky cards + scroll-scrubbed scale,
 * implemented with GSAP ScrollTrigger (Lenis-compatible site scroll).
 */

const STATS = [
  { value: "1+", label: "Years experience" },
  { value: "5+", label: "Projects shipped" },
  { value: "3", label: "Roles" },
] as const;

/** Newest first — matches LinkedIn experience order. */
const ROLES = [
  {
    index: "01",
    status: "Active",
    dates: "Oct 2025 — Apr 2026",
    title: "Senior Web Developer",
    company: "theorigintech · Full-time",
    location: "Tinkune Marg, Kathmandu · On-site",
    description:
      "Full-time senior role building and shipping web products — React.js frontends, Node.js services, and close collaboration with the team on-site in Kathmandu.",
    achievements: [
      "Led feature delivery across the React.js and Node.js stack",
      "Worked on-site with engineers on architecture, reviews, and releases",
      "Shipped production-ready UI and API work for client-facing products",
    ],
    tags: ["Node.js", "React.js", "TypeScript", "REST API"],
  },
  {
    index: "02",
    dates: "Sep 2025 — Nov 2025",
    title: "Back End Developer",
    company: "Frontbase Inc · Internship",
    location: "On-site",
    description:
      "Backend-focused internship — APIs, data flows, and server-side logic with an emphasis on reliable, maintainable Node.js services.",
    achievements: [
      "Built and maintained backend services and API endpoints",
      "Debugged data and integration issues across the stack",
      "Collaborated with the team on backend patterns and code quality",
    ],
    tags: ["Node.js", "Backend", "REST API", "PostgreSQL"],
  },
  {
    index: "03",
    dates: "Jun 2025 — Sep 2025",
    title: "Full-stack Developer",
    company: "Webpoint Solutions, LLC · Internship",
    location: "On-site",
    description:
      "Full-stack internship — React.js interfaces, Node.js backends, and on-site delivery with the engineering team on client projects.",
    achievements: [
      "Shipped React.js UI and Node.js features for active client work",
      "Collaborated on-site on integration, testing, and releases",
      "Grew full-stack skills across the JavaScript product stack",
    ],
    tags: ["Node.js", "React.js", "TypeScript", "REST API", "PostgreSQL"],
  },
] as const;

/** Maps scroll progress 0→1 to scale, mirroring Framer `useTransform(..., { clamp: true })`. */
function cardScale(progress: number, rangeStart: number, rangeEnd: number, targetScale: number) {
  if (rangeEnd - rangeStart < 1e-6) {
    return progress >= rangeEnd ? targetScale : 1;
  }
  if (progress <= rangeStart) return 1;
  if (progress >= rangeEnd) return targetScale;
  const t = (progress - rangeStart) / (rangeEnd - rangeStart);
  return 1 + (targetScale - 1) * t;
}

function IconBuilding({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 20V9l8-4 8 4v11M9 20v-5h6v5"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPin({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s7-4.35 7-10a7 7 0 1 0-14 0c0 5.65 7 10 7 10Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="2" stroke="currentColor" strokeWidth="1.35" />
    </svg>
  );
}

function StickyExperienceCard({
  i,
  entry,
  progress,
  range,
  targetScale,
}: {
  i: number;
  entry: (typeof ROLES)[number];
  progress: number;
  range: [number, number];
  targetScale: number;
}) {
  const scale = cardScale(progress, range[0], range[1], targetScale);
  const preview = entry.achievements.slice(0, 2);

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        top: `calc(-5vh + ${i * 26 + 320}px)`,
      }}
      className="relative -top-1/4 flex h-[min(62vh,500px)] w-[min(96vw,760px)] max-w-full origin-top flex-col overflow-hidden rounded-[2.25rem] border border-white/12 bg-[#0a0a0a] shadow-[0_48px_120px_-32px_rgba(0,0,0,0.9)] will-change-transform sm:h-[min(66vh,560px)] sm:w-[min(94vw,880px)] sm:rounded-[2.5rem] lg:h-[min(70vh,620px)] lg:w-[min(92vw,1000px)] lg:rounded-[2.75rem]"
    >
      <span
        className="pointer-events-none absolute right-4 top-3 select-none font-hero-serif text-[clamp(3.5rem,18vw,7rem)] font-semibold leading-none text-white/[0.08] sm:right-6 sm:top-4"
        aria-hidden
      >
        {entry.index}
      </span>

      <div className="relative z-10 flex h-full min-h-0 flex-col overflow-y-auto px-5 py-5 sm:px-7 sm:py-6 lg:px-9 lg:py-8">
        {"status" in entry && entry.status ? (
          <p className="mb-1.5 inline-flex w-fit border border-white/35 px-2 py-1 font-mono text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-white/85 sm:text-[0.58rem]">
            {entry.status}
          </p>
        ) : null}
        <p className="font-mono text-[0.58rem] font-medium uppercase tracking-[0.2em] text-white/50 sm:text-[0.6rem]">{entry.dates}</p>
        <h3 className="mt-2 line-clamp-2 font-sans text-xl font-bold leading-snug tracking-tight text-white sm:text-2xl lg:line-clamp-3 lg:text-3xl">
          {entry.title}
        </h3>
        <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/60 sm:text-sm">
          <span className="inline-flex min-w-0 items-center gap-1.5">
            <IconBuilding className="shrink-0 text-white/45" />
            <span className="truncate">{entry.company}</span>
          </span>
          <span className="hidden h-3 w-px bg-white/25 sm:inline" aria-hidden />
          <span className="inline-flex items-center gap-1.5">
            <IconPin className="shrink-0 text-white/45" />
            {entry.location}
          </span>
        </div>
        <p className="mt-3.5 line-clamp-3 text-pretty text-sm leading-relaxed text-white/65 sm:mt-4 sm:text-base lg:line-clamp-4">
          {entry.description}
        </p>
        <ul className="mt-3 min-h-0 flex-1 space-y-2 sm:space-y-2.5">
          {preview.map((line) => (
            <li key={line} className="flex gap-2.5 text-sm leading-relaxed text-white/78 sm:text-base">
              <span
                className="mt-0.5 inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center border border-white/35 sm:h-4 sm:w-4"
                aria-hidden
              >
                <span className="text-[9px] text-white/75 sm:text-[10px]">+</span>
              </span>
              <span className="line-clamp-2 sm:line-clamp-3">{line}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap gap-1.5 border-t border-white/10 pt-3 sm:gap-2 sm:pt-4">
          {entry.tags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="border border-white/22 px-2 py-0.5 font-mono text-[0.5rem] font-semibold uppercase tracking-[0.14em] text-white/72 sm:text-[0.55rem]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ExperienceSection() {
  const stackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const total = ROLES.length;

  useEffect(() => {
    const el = stackRef.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.45,
      onUpdate: (self) => setProgress(self.progress),
    });

    queueMicrotask(() => ScrollTrigger.refresh());

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section className="relative bg-white text-[#101116]" aria-labelledby="experience-heading">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] [background-size:40px_40px]"
        aria-hidden
      />

      <div className="relative z-[1] mx-auto w-full max-w-[1400px] px-4 pb-4 pt-6 sm:px-8 sm:pb-5 sm:pt-7 lg:px-12">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center">
          <div className="flex w-full items-center justify-center gap-4 sm:gap-6">
            <span className="h-px min-w-[2.5rem] flex-1 bg-[#101116]/25 sm:min-w-[4rem]" aria-hidden />
            <p className="shrink-0 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.35em] text-[#101116]/85">
              Career path
            </p>
            <span className="h-px min-w-[2.5rem] flex-1 bg-[#101116]/25 sm:min-w-[4rem]" aria-hidden />
          </div>

          <div className="relative mt-3 flex items-start justify-center gap-3 sm:mt-4 sm:gap-4">
            <span
              className="mt-1.5 inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center border border-[#101116]/75 sm:mt-2 sm:h-4 sm:w-4"
              aria-hidden
            >
              <span className="h-1 w-1 rounded-full bg-[#101116] sm:h-1.5 sm:w-1.5" />
            </span>
            <h2
              id="experience-heading"
              className="font-hero-serif text-[clamp(2.5rem,8vw,4.5rem)] font-semibold uppercase leading-[0.95] tracking-[0.02em]"
            >
              Experience
            </h2>
          </div>

          <p className="mx-auto mt-2 max-w-xl text-center text-pretty text-sm leading-relaxed text-[#101116]/72 sm:mt-3 sm:text-base">
            A journey of continuous learning, innovation, and impactful contributions
          </p>

          <div className="mx-auto mt-4 grid w-full max-w-3xl grid-cols-3 gap-4 sm:mt-5 sm:gap-6">
            {STATS.map((row) => (
              <div key={row.label} className="flex flex-col items-center text-center">
                <p className="font-hero-serif text-[clamp(1.5rem,4.5vw,2.25rem)] font-semibold tabular-nums tracking-tight text-[#101116]">
                  {row.value}
                </p>
                <span className="mt-1.5 h-px w-full max-w-[4.5rem] bg-[#101116]/25 sm:mt-2 sm:max-w-[5.5rem]" aria-hidden />
                <p className="mt-1.5 max-w-[9rem] font-mono text-[0.5rem] font-semibold uppercase leading-snug tracking-[0.18em] text-[#101116]/60 sm:mt-2 sm:text-[0.55rem] sm:tracking-[0.2em]">
                  {row.label}
                </p>
              </div>
            ))}
          </div>

          <p className="pointer-events-none mt-5 grid justify-items-center text-center sm:mt-6">
            <span className="relative max-w-[16ch] text-[10px] font-medium uppercase leading-snug tracking-[0.26em] text-[#101116]/40 after:absolute after:left-1/2 after:top-full after:mt-1 after:h-6 after:w-px after:-translate-x-1/2 after:bg-gradient-to-b after:from-[#101116]/25 after:to-transparent after:content-[''] sm:text-[11px] sm:tracking-[0.28em]">
              Scroll down to see card stack
            </span>
          </p>
        </div>
      </div>

      {/* Skiper-style scroll track: stacked `sticky top-0` rows */}
      <div
        ref={stackRef}
        className="relative mx-auto flex w-full max-w-[1400px] flex-col items-center justify-center overflow-visible pb-[12vh] pt-[2vh] sm:pb-[16vh] sm:pt-[3vh] md:pb-[18vh] md:pt-[4vh]"
      >
        {ROLES.map((entry, i) => {
          const targetScale = Math.max(0.5, 1 - (total - i - 1) * 0.1);
          const range: [number, number] =
            total > 1 ? [i / (total - 1), 1] : [0, 1];

          return (
            <div
              key={entry.index}
              className="sticky top-0 flex min-h-[62svh] w-full items-center justify-center py-3 sm:min-h-[66svh] sm:py-4 lg:min-h-[70svh]"
              style={{ zIndex: 10 + i }}
            >
              <StickyExperienceCard i={i} entry={entry} progress={progress} range={range} targetScale={targetScale} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
