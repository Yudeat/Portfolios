"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";

import { TypewriterText } from "@/components/ui/TypewriterText";

const AboutScrapbookThreeBackdrop = dynamic(
  () =>
    import("@/components/about/AboutScrapbookThreeBackdrop").then((m) => ({
      default: m.AboutScrapbookThreeBackdrop,
    })),
  { ssr: false, loading: () => null },
);

/** Golden-hour profile inside the Instagram-style card (avatar + main square). */
const PROFILE_PHOTO = "/images/pradeep-profile.png";

/** Office / professional medium shot (left collage). */
const HEADSHOT_LEFT = "/images/pradeep-headshot-left.png";

const ABOUT_LEAD =
  "Software engineer building exceptional digital experiences, from polished interfaces through production-grade machine learning.";

const ABOUT_BODY =
  "Hello, I'm Pradeep Chaudhary. I am a dedicated Software Engineer with a passion for creating exceptional digital experiences that feel fast, trustworthy, and easy to revisit.";

const ABOUT_BODY_MORE =
  "I bring three years of professional experience and have shipped 5 projects so far: everything from MVPs and product iterations to dashboards and integrations. My journey has equipped me with skills across the whole lifecycle: prototyping and UI polish, scalable APIs and data modeling, experimentation, observability, and shipping models safely alongside product teams. I like turning fuzzy requirements into milestones, documenting trade-offs, and leaving codebases easier for the next engineer to extend.";

const STACK_ROWS = [
  {
    title: "Frontend",
    body: "React, Next.js, Tailwind CSS, and GSAP for responsive layouts, design systems thinking, performance budgets, and motion that reinforces the story rather than distracting from it.",
  },
  {
    title: "Backend",
    body: "Node.js, Python with Django or FastAPI, PostgreSQL and MongoDB, plus pragmatic API design: validation, versioning, queues or background workers when workloads grow.",
  },
  {
    title: "AI / ML",
    body: "Predictive modeling, natural language processing, and clear data visualization so stakeholders can interpret results, not stare at unexplained charts.",
  },
] as const;

const ABOUT_CLOSING =
  "I believe technology should be invisible: so seamless that people only notice how straightforward their task has become. I have completed 5 projects, from e-commerce platforms and internal tools to AI-powered analytics dashboards, and I stay current with industry patterns and cloud fundamentals on AWS and with Docker-driven workflows.";

/** Short blurbs under the Instagram CTA */
const INSTA_CAPTION_BLURB =
  "Three years of experience. 5 projects shipped across storefronts, internal tools, and analytics surfaces. Comfortable owning features end to end, with AWS, Docker, and CI-friendly habits baked in.";

const FEED_IMAGES = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200&h=200&fit=crop&q=80",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200&h=200&fit=crop&q=80",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=200&h=200&fit=crop&q=80",
] as const;

const SKILLS = [
  { pct: "100%", label: "Full-stack lifecycle" },
  { pct: "95%", label: "Frontend engineering" },
  { pct: "92%", label: "Backend & data" },
  { pct: "88%", label: "AI, ML, visualization" },
] as const;

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="18" height="18" aria-hidden fill="currentColor">
      <path d="M12 7.2A4.8 4.8 0 1 0 16.8 12 4.81 4.81 0 0 0 12 7.2Zm0 7.9A3.1 3.1 0 1 1 15.1 12 3.11 3.11 0 0 1 12 15.1ZM16.3 5.5a1.12 1.12 0 1 1-1.12 1.12 1.12 1.12 0 0 1 1.12-1.12Zm3.4 1.14A6.31 6.31 0 0 0 18.4 4a6.27 6.27 0 0 0-4.24-.26A4 4 0 0 0 12 3.65a4 4 0 0 0-2.16.09A6.27 6.27 0 0 0 5.6 4 6.14 6.14 0 0 0 4 5.64a6.31 6.31 0 0 0-.26 4.24A4 4 0 0 0 3.65 12a4 4 0 0 0 .09 2.16A6.31 6.31 0 0 0 4 18.4a6.27 6.27 0 0 0 1.64 1.62 6.31 6.31 0 0 0 4.24.26A4 4 0 0 0 12 20.35a4 4 0 0 0 2.16-.09 6.31 6.31 0 0 0 4.24-.26A6.14 6.14 0 0 0 20 18.4a6.31 6.31 0 0 0 .26-4.24A4 4 0 0 0 20.35 12a4 4 0 0 0-.09-2.16A6.36 6.36 0 0 0 19.7 6.64ZM17.87 17a4.48 4.48 0 0 1-2.52 2.52 9.88 9.88 0 0 1-3.35.19A55.5 55.5 0 0 1 12 19.8a55.5 55.5 0 0 1-3-.09 4.48 4.48 0 0 1-2.52-2.52 9.88 9.88 0 0 1-.19-3.35A55.5 55.5 0 0 1 4.2 12a55.5 55.5 0 0 1 .09-3 4.48 4.48 0 0 1 2.52-2.52 9.88 9.88 0 0 1 3.35-.19A55.5 55.5 0 0 1 12 4.2a55.5 55.5 0 0 1 3 .09 4.48 4.48 0 0 1 2.52 2.52 9.88 9.88 0 0 1 .19 3.35A55.5 55.5 0 0 1 19.8 12a55.5 55.5 0 0 1-.09 3 4.64 4.64 0 0 1-1.84 2Z" />
    </svg>
  );
}

function StarRow() {
  return (
    <div className="flex gap-0.5 text-[#2563eb]" aria-label="5 out of 5">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} className="h-8 w-8 sm:h-10 sm:w-10" viewBox="0 0 24 24" aria-hidden fill="currentColor">
          <path d="M12 2l2.91 8.943h9.416l-7.623 5.539 2.91 8.943L12 19.887l-7.613 5.538 2.91-8.943L-.326 10.943h9.416L12 2z" />
        </svg>
      ))}
    </div>
  );
}

/**
 * Monochrome collage about panel (hero overlay) — layered B&W photo, oversized type, 3D social frame.
 */
export function HeroAboutScrapbook() {
  const [leadDone, setLeadDone] = useState(false);
  const [firstNameDone, setFirstNameDone] = useState(false);
  const [lastNameDone, setLastNameDone] = useState(false);
  const [lowerPhase, setLowerPhase] = useState(0);

  return (
    <div className="pointer-events-auto relative flex w-full flex-col bg-white py-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1.75rem,env(safe-area-inset-bottom))]">
      <AboutScrapbookThreeBackdrop />
      <div className="pointer-events-auto relative z-[1] mx-auto w-full max-w-6xl px-5 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-12 md:pb-24 md:pt-16">
        {/* Top lead — mirrors reference inset copy */}
        <div className="max-w-[22rem] text-[13px] font-medium uppercase leading-snug tracking-[0.08em] text-neutral-700 sm:max-w-[26rem] sm:text-sm md:leading-relaxed">
          {!leadDone ? (
            <TypewriterText
              as="p"
              text={ABOUT_LEAD}
              className="inline"
              charDelayMs={18}
              onComplete={() => setLeadDone(true)}
            />
          ) : (
            <p>{ABOUT_LEAD}</p>
          )}
        </div>

        {/* Collage lane */}
        <div className="relative mt-12 min-h-[1px] lg:mt-16 lg:min-h-[min(58vh,540px)] xl:mt-20">
          {/* Oversized headline — extra inset so giant type clears the IG card */}
          <div className="relative z-[2] max-w-[min(100%,20rem)] sm:max-w-none lg:absolute lg:left-[min(42%,340px)] lg:top-[6%] lg:translate-x-0 lg:pr-[min(12vw,7rem)] xl:left-[420px] xl:pr-[8rem]">
            {leadDone &&
              (!firstNameDone ? (
                <TypewriterText
                  as="h2"
                  text="Pradeep"
                  className="text-[clamp(3.35rem,12vw,6.85rem)] font-black leading-[0.92] tracking-[-0.045em] text-black"
                  charDelayMs={28}
                  onComplete={() => setFirstNameDone(true)}
                />
              ) : (
                <h2 className="text-[clamp(3.35rem,12vw,6.85rem)] font-black leading-[0.92] tracking-[-0.045em] text-black">
                  Pradeep
                </h2>
              ))}
            {firstNameDone &&
              (!lastNameDone ? (
                <TypewriterText
                  as="p"
                  text="Chaudhary"
                  className="mt-2 font-light uppercase tracking-[0.42em] text-neutral-900 sm:mt-3 sm:text-lg md:text-xl"
                  charDelayMs={22}
                  onComplete={() => setLastNameDone(true)}
                />
              ) : (
                <p className="mt-2 font-light uppercase tracking-[0.42em] text-neutral-900 sm:mt-3 sm:text-lg md:text-xl">
                  Chaudhary
                </p>
              ))}
          </div>

          {/* Left — executive-style headshot framing (tight crop, subdued grade, restrained frame). */}
          <div className="relative z-[1] mx-auto mt-10 w-[min(100%,17.5rem)] sm:mt-12 sm:w-[min(100%,21rem)] lg:absolute lg:left-[-2%] lg:top-[4%] lg:mx-0 lg:mt-0 lg:w-[min(42vw,22rem)] xl:w-[min(380px,24rem)] motion-reduce:rotate-0">
            <div className="-rotate-[1deg] overflow-hidden rounded-xl border border-neutral-900/95 bg-neutral-900 shadow-[0_22px_50px_-20px_rgba(0,0,0,0.45)] ring-1 ring-white/40 motion-reduce:rotate-0 lg:-rotate-[1.25deg]">
              <div className="relative aspect-[4/5] w-full bg-neutral-900">
                <Image
                  src={HEADSHOT_LEFT}
                  alt="Pradeep Chaudhary — professional headshot"
                  fill
                  sizes="(max-width: 1024px) 320px, 380px"
                  priority
                  className="object-cover object-[center_36%] brightness-[1.02] contrast-[1.05] scale-[1.12] md:scale-[1.18] motion-reduce:scale-100 motion-reduce:object-center [transform-origin:50%_40%]"
                />
                {/* Light vignette */}
                <div
                  className="pointer-events-none absolute inset-0 shadow-[inset_0_0_48px_rgba(0,0,0,0.14)]"
                  aria-hidden
                />
              </div>
            </div>
          </div>

          {/* 3D profile card */}
          <div
            className="mx-auto mt-14 flex w-full max-w-[17.5rem] flex-col items-center gap-7 sm:mt-16 sm:gap-8 lg:absolute lg:right-[-2%] lg:top-[4%] lg:mx-0 lg:mt-0 xl:right-0"
            style={{ perspective: "1100px" }}
          >
            <div
              className="relative w-full origin-center rounded-[1.75rem] border-[3px] border-black bg-white p-2 shadow-[0_28px_50px_-12px_rgba(0,0,0,0.35)] motion-reduce:transform-none lg:[transform:rotateX(10deg)_rotateY(-22deg)_rotateZ(-1deg)]"
            >
              <div className="flex items-center gap-2 border-b border-neutral-200 px-2 py-2">
                <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full border border-black">
                  <Image
                    src={PROFILE_PHOTO}
                    alt=""
                    width={96}
                    height={96}
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-bold text-black">pradeep__chy</p>
                  <p className="text-[10px] uppercase tracking-wider text-neutral-500">Portfolio</p>
                </div>
              </div>
              <div className="overflow-hidden rounded-[1.1rem]">
                <Image
                  src={PROFILE_PHOTO}
                  alt="Pradeep profile"
                  width={720}
                  height={720}
                  className="aspect-square w-full object-cover object-[50%_20%]"
                />
              </div>
            </div>

            <a
              href="https://www.instagram.com/pradeep__chy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition hover:bg-neutral-800"
            >
              <InstagramGlyph />
              <span>@pradeep__chy</span>
            </a>
            <div className="max-w-[19rem] text-center text-[13px] font-medium leading-[1.65] text-neutral-600 sm:max-w-[22rem] sm:text-sm lg:text-left">
              {lastNameDone ? (
                <TypewriterText
                  as="p"
                  text={INSTA_CAPTION_BLURB}
                  className="inline"
                  charDelayMs={12}
                  startDelayMs={120}
                />
              ) : null}
            </div>
          </div>
        </div>

        {/* Mini feed strip */}
        <div className="mt-16 flex justify-center gap-3 sm:mt-20 sm:gap-4 md:mt-24">
          {FEED_IMAGES.map((src, i) => (
            <div
              key={src}
              className="h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden border-2 border-black shadow-[4px_6px_0_0_rgba(0,0,0,0.12)] sm:h-24 sm:w-24"
            >
              <Image
                src={src}
                alt=""
                width={96}
                height={96}
                className="h-full w-full object-cover grayscale contrast-125"
                unoptimized
              />
            </div>
          ))}
        </div>

        {/* Lower band: about + metrics */}
        <div className="mt-20 border-t border-neutral-200 pt-14 sm:mt-24 sm:grid sm:grid-cols-[1fr_auto] sm:items-start sm:gap-x-12 sm:gap-y-14 sm:pt-20 md:mt-28 md:gap-x-16 md:gap-y-16 md:pt-24">
          <div className="min-w-0">
            {lastNameDone && lowerPhase === 0 ? (
              <TypewriterText
                as="h3"
                text="About me"
                className="text-2xl font-black uppercase tracking-tight text-black sm:text-3xl"
                charDelayMs={26}
                onComplete={() => setLowerPhase(1)}
              />
            ) : null}
            {lastNameDone && lowerPhase >= 1 ? (
              <h3 className="text-2xl font-black uppercase tracking-tight text-black sm:text-3xl">About me</h3>
            ) : null}

            <div className="mt-6 max-w-2xl space-y-5 text-base font-medium leading-relaxed text-neutral-800 sm:mt-8 sm:space-y-6 sm:text-lg">
              {lastNameDone && lowerPhase === 1 ? (
                <TypewriterText
                  as="p"
                  text={ABOUT_BODY}
                  className="block"
                  charDelayMs={11}
                  onComplete={() => setLowerPhase(2)}
                />
              ) : null}
              {lastNameDone && lowerPhase >= 2 ? <p>{ABOUT_BODY}</p> : null}
              {lastNameDone && lowerPhase === 2 ? (
                <TypewriterText
                  as="p"
                  text={ABOUT_BODY_MORE}
                  className="block"
                  charDelayMs={9}
                  onComplete={() => setLowerPhase(3)}
                />
              ) : null}
              {lastNameDone && lowerPhase >= 3 ? <p>{ABOUT_BODY_MORE}</p> : null}
            </div>

            {lastNameDone && lowerPhase >= 3 ? (
              <dl className="mt-10 max-w-2xl space-y-6 sm:mt-12 sm:space-y-7">
                {STACK_ROWS.map((row) => (
                  <div key={row.title}>
                    <dt className="text-sm font-bold uppercase tracking-[0.12em] text-black">{row.title}</dt>
                    <dd className="mt-2.5 text-base leading-relaxed text-neutral-700 sm:mt-3 sm:text-[1.05rem] sm:leading-[1.7]">
                      {row.body}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}

            {lastNameDone && lowerPhase === 3 ? (
              <TypewriterText
                as="p"
                text={ABOUT_CLOSING}
                className="mt-10 block max-w-2xl text-base font-medium leading-relaxed text-neutral-800 sm:mt-12 sm:text-lg sm:leading-[1.65]"
                charDelayMs={10}
                onComplete={() => setLowerPhase(4)}
              />
            ) : null}
            {lastNameDone && lowerPhase >= 4 ? (
              <p className="mt-10 max-w-2xl text-base font-medium leading-relaxed text-neutral-800 sm:mt-12 sm:text-lg sm:leading-[1.65]">
                {ABOUT_CLOSING}
              </p>
            ) : null}
          </div>

          <div className="mt-12 flex flex-wrap items-start justify-between gap-10 sm:mt-0 sm:flex-col sm:justify-start sm:gap-12 md:flex-row md:items-start md:gap-14">
            <div className="flex flex-col gap-4 sm:gap-5">
              {SKILLS.map((s) => (
                <div key={s.label} className="flex items-baseline gap-4">
                  <span className="w-12 text-right text-lg font-black tabular-nums text-black sm:text-xl">{s.pct}</span>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">{s.label}</span>
                </div>
              ))}
            </div>
            <StarRow />
          </div>
        </div>
      </div>
    </div>
  );
}
