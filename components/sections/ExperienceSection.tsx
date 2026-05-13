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
  { value: "4+", label: "Years experience" },
  { value: "30+", label: "Projects delivered" },
  { value: "6", label: "Companies" },
] as const;

const ROLES = [
  {
    index: "01",
    status: "Active",
    dates: "2021 — Present",
    title: "Freelance Web Designer",
    company: "Self-employed",
    location: "Remote",
    description:
      "Independent product and marketing sites for small teams — from concept through launch, performance, and handoff.",
    achievements: [
      "Delivered 15+ landing pages and marketing sites",
      "Built websites for restaurants, law firms, and local businesses",
      "Achieved an average ~12.5% traffic lift on redesign scopes",
      "Developed a personal OS-style portfolio to showcase craft",
    ],
    tags: ["Next.js", "Tailwind CSS", "GSAP", "Lenis"],
  },
  {
    index: "02",
    status: "Active",
    dates: "March 2023 — Present",
    title: "Pedagogical Tutor",
    company: "École O'clock",
    location: "Remote",
    description:
      "Hands-on mentoring for full-time web development cohorts — code reviews, live debugging, and curriculum feedback.",
    achievements: [
      "Mentored 50+ students across JavaScript and React tracks",
      "Developed custom exercises and walkthrough materials",
      "Helped raise cohort success and completion metrics by ~15%",
    ],
    tags: ["TypeScript", "React", "Node.js", "Mentoring"],
  },
  {
    index: "03",
    dates: "March 2022 — March 2023",
    title: "Alumni Pedagogical Tutor",
    company: "École O'clock",
    location: "France",
    description:
      "Post-bootcamp support for alumni re-entering the job market — portfolio reviews, interview prep, and technical refreshers.",
    achievements: [
      "Supported 30+ alumni through career transitions",
      "Created focused React.js workshops and recap sessions",
    ],
    tags: ["React", "Mentoring", "Workshops"],
  },
  {
    index: "04",
    dates: "Nov 2021 — March 2022",
    title: "Freelance Developer",
    company: "Self-employed",
    location: "France",
    description:
      "Short-contract builds and teaching — full-stack features, security-minded frontends, and tailored JS training.",
    achievements: [
      "Built a cybersecurity awareness platform with React and Node.js",
      "Delivered custom JavaScript courses for client teams",
      "Full-stack work with PostgreSQL and Sequelize",
    ],
    tags: ["React", "Node.js", "PostgreSQL", "Sequelize"],
  },
  {
    index: "05",
    dates: "May 2021 — Nov 2021",
    title: "Developer Designer",
    company: "AMELIANO SAS",
    location: "France",
    description:
      "Product implementation for a mobility marketplace — payments, dashboards, and end-user flows in production.",
    achievements: [
      "Built MyMaka platform connecting users with taxi fleets",
      "Integrated Adyen for card payments and payouts",
      "Shipped features with Vue.js, Node.js, and PostgreSQL",
    ],
    tags: ["Vue.js", "Node.js", "PostgreSQL", "Adyen"],
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
        top: `calc(-5vh + ${i * 22 + 280}px)`,
      }}
      className="relative -top-1/4 flex h-[min(52vh,420px)] w-[min(94vw,640px)] max-w-full origin-top flex-col overflow-hidden rounded-[2rem] border border-white/12 bg-[#0a0a0a] shadow-[0_48px_120px_-32px_rgba(0,0,0,0.9)] will-change-transform sm:h-[min(56vh,480px)] sm:w-[min(92vw,720px)] sm:rounded-[2.25rem] lg:h-[min(58vh,520px)] lg:w-[min(88vw,800px)]"
    >
      <span
        className="pointer-events-none absolute right-3 top-2 select-none font-hero-serif text-[clamp(3rem,16vw,6rem)] font-semibold leading-none text-white/[0.08] sm:right-5 sm:top-3"
        aria-hidden
      >
        {entry.index}
      </span>

      <div className="relative z-10 flex h-full min-h-0 flex-col overflow-y-auto px-4 py-4 sm:px-6 sm:py-5 lg:px-7 lg:py-6">
        {"status" in entry && entry.status ? (
          <p className="mb-1.5 inline-flex w-fit border border-white/35 px-2 py-1 font-mono text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-white/85 sm:text-[0.58rem]">
            {entry.status}
          </p>
        ) : null}
        <p className="font-mono text-[0.58rem] font-medium uppercase tracking-[0.2em] text-white/50 sm:text-[0.6rem]">{entry.dates}</p>
        <h3 className="mt-1.5 line-clamp-2 font-sans text-lg font-bold leading-snug tracking-tight text-white sm:text-xl lg:line-clamp-3 lg:text-2xl">
          {entry.title}
        </h3>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-white/60 sm:text-xs">
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
        <p className="mt-3 line-clamp-3 text-pretty text-xs leading-relaxed text-white/65 sm:mt-3.5 sm:text-sm lg:line-clamp-4">
          {entry.description}
        </p>
        <ul className="mt-3 min-h-0 flex-1 space-y-2 sm:space-y-2.5">
          {preview.map((line) => (
            <li key={line} className="flex gap-2 text-xs leading-relaxed text-white/78 sm:text-[0.9375rem]">
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
    <section className="relative bg-black text-white" aria-labelledby="experience-heading">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.2] [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:40px_40px]"
        aria-hidden
      />

      <div className="relative z-[1] mx-auto w-full max-w-[1400px] px-4 pb-6 pt-8 sm:px-8 sm:pb-8 sm:pt-10 lg:px-12">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center">
          <div className="flex w-full items-center justify-center gap-4 sm:gap-6">
            <span className="h-px min-w-[2.5rem] flex-1 bg-white/35 sm:min-w-[4rem]" aria-hidden />
            <p className="shrink-0 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.35em] text-white/85">
              Career path
            </p>
            <span className="h-px min-w-[2.5rem] flex-1 bg-white/35 sm:min-w-[4rem]" aria-hidden />
          </div>

          <div className="relative mt-5 flex items-start justify-center gap-3 sm:mt-6 sm:gap-4">
            <span
              className="mt-1.5 inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center border border-white/75 sm:mt-2 sm:h-4 sm:w-4"
              aria-hidden
            >
              <span className="h-1 w-1 rounded-full bg-white sm:h-1.5 sm:w-1.5" />
            </span>
            <h2
              id="experience-heading"
              className="font-hero-serif text-[clamp(2.5rem,8vw,4.5rem)] font-semibold uppercase leading-[0.95] tracking-[0.02em]"
            >
              Experience
            </h2>
          </div>

          <p className="mx-auto mt-3 max-w-xl text-center text-pretty text-sm leading-relaxed text-white/72 sm:mt-4 sm:text-base">
            A journey of continuous learning, innovation, and impactful contributions
          </p>

          <div className="mx-auto mt-6 grid w-full max-w-3xl grid-cols-3 gap-5 sm:mt-8 sm:gap-8">
            {STATS.map((row) => (
              <div key={row.label} className="flex flex-col items-center text-center">
                <p className="font-hero-serif text-[clamp(1.5rem,4.5vw,2.25rem)] font-semibold tabular-nums tracking-tight text-white">
                  {row.value}
                </p>
                <span className="mt-2 h-px w-full max-w-[4.5rem] bg-white/40 sm:mt-3 sm:max-w-[5.5rem]" aria-hidden />
                <p className="mt-2 max-w-[9rem] font-mono text-[0.5rem] font-semibold uppercase leading-snug tracking-[0.18em] text-white/60 sm:text-[0.55rem] sm:tracking-[0.2em]">
                  {row.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skiper-style scroll track: matches sample `main` padding + stacked `sticky top-0` rows */}
      <div
        ref={stackRef}
        className="relative mx-auto flex w-full max-w-[1400px] flex-col items-center justify-center overflow-visible pb-[28vh] pt-[18vh] sm:pb-[36vh] sm:pt-[22vh] md:pb-[40vh] md:pt-[24vh]"
      >
        <div className="pointer-events-none absolute left-1/2 top-[5%] z-[2] grid -translate-x-1/2 content-start justify-items-center gap-3 text-center sm:top-[6%]">
          <span className="relative max-w-[14ch] text-[10px] font-medium uppercase leading-snug tracking-[0.26em] text-white/40 after:absolute after:left-1/2 after:top-full after:mt-1.5 after:h-10 after:w-px after:-translate-x-1/2 after:bg-gradient-to-b after:from-white/35 after:to-transparent after:content-[''] sm:text-xs sm:tracking-[0.28em]">
            Scroll down to see card stack
          </span>
        </div>

        {ROLES.map((entry, i) => {
          const targetScale = Math.max(0.5, 1 - (total - i - 1) * 0.1);
          const range: [number, number] = [i * 0.25, 1];

          return (
            <div
              key={entry.index}
              className="sticky top-0 flex min-h-[72svh] w-full items-center justify-center py-3 sm:min-h-[78svh] sm:py-4"
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
