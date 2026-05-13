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

/** `portfolio/public/images/pradeep-headshot-left.png` → served as `/images/...`. */
const HEADSHOT_LEFT = "/images/pradeep-headshot-left.png";

const ABOUT_LEAD =
  "Software engineer building exceptional digital experiences, from polished interfaces through production-grade machine learning.";

const ABOUT_BODY =
  "Hello, I'm Pradeep Chaudhary. I'm a full-stack developer and ML engineer with over two years of experience building end-to-end intelligent applications. I bridge the gap between complex machine learning research and functional, user-centric products. My expertise lies in architecting scalable React/Next.js frontends, robust Node.js/Python backends, and integrating custom ML models that solve real-world problems. I don't just build models — I build the infrastructure that makes them useful.";

/** Short blurbs under the Instagram CTA */
const INSTA_CAPTION_BLURB =
  "Three years of experience. 5 projects shipped across storefronts, internal tools, and analytics surfaces. Comfortable owning features end to end, with AWS, Docker, and CI/CD friendly habits baked in.";

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="18" height="18" aria-hidden fill="currentColor">
      <path d="M12 7.2A4.8 4.8 0 1 0 16.8 12 4.81 4.81 0 0 0 12 7.2Zm0 7.9A3.1 3.1 0 1 1 15.1 12 3.11 3.11 0 0 1 12 15.1ZM16.3 5.5a1.12 1.12 0 1 1-1.12 1.12 1.12 1.12 0 0 1 1.12-1.12Zm3.4 1.14A6.31 6.31 0 0 0 18.4 4a6.27 6.27 0 0 0-4.24-.26A4 4 0 0 0 12 3.65a4 4 0 0 0-2.16.09A6.27 6.27 0 0 0 5.6 4 6.14 6.14 0 0 0 4 5.64a6.31 6.31 0 0 0-.26 4.24A4 4 0 0 0 3.65 12a4 4 0 0 0 .09 2.16A6.31 6.31 0 0 0 4 18.4a6.27 6.27 0 0 0 1.64 1.62 6.31 6.31 0 0 0 4.24.26A4 4 0 0 0 12 20.35a4 4 0 0 0 2.16-.09 6.31 6.31 0 0 0 4.24-.26A6.14 6.14 0 0 0 20 18.4a6.31 6.31 0 0 0 .26-4.24A4 4 0 0 0 20.35 12a4 4 0 0 0-.09-2.16A6.36 6.36 0 0 0 19.7 6.64ZM17.87 17a4.48 4.48 0 0 1-2.52 2.52 9.88 9.88 0 0 1-3.35.19A55.5 55.5 0 0 1 12 19.8a55.5 55.5 0 0 1-3-.09 4.48 4.48 0 0 1-2.52-2.52 9.88 9.88 0 0 1-.19-3.35A55.5 55.5 0 0 1 4.2 12a55.5 55.5 0 0 1 .09-3 4.48 4.48 0 0 1 2.52-2.52 9.88 9.88 0 0 1 3.35-.19A55.5 55.5 0 0 1 12 4.2a55.5 55.5 0 0 1 3 .09 4.48 4.48 0 0 1 2.52 2.52 9.88 9.88 0 0 1 .19 3.35A55.5 55.5 0 0 1 19.8 12a55.5 55.5 0 0 1-.09 3 4.64 4.64 0 0 1-1.84 2Z" />
    </svg>
  );
}

/**
 * About panel (hero overlay) — headshot, “Pradeep” landmark, About copy, 3D Instagram frame.
 */
export function HeroAboutScrapbook() {
  const [leadDone, setLeadDone] = useState(false);

  return (
    <div className="pointer-events-auto relative flex w-full shrink-0 flex-col bg-white pt-[max(0.5rem,env(safe-area-inset-top))] pb-[max(2.5rem,calc(env(safe-area-inset-bottom,0px)+2rem))]">
      <AboutScrapbookThreeBackdrop />
      <div className="pointer-events-auto relative z-[1] w-full max-w-none px-5 pb-6 pt-4 sm:px-8 sm:pb-8 sm:pt-5 md:px-10 md:pb-10 md:pt-6 lg:px-12">
        {/* Top lead — mirrors reference inset copy */}
        <div className="max-w-[22rem] text-[12px] font-medium uppercase leading-snug tracking-[0.08em] text-neutral-700 sm:max-w-[26rem] sm:text-[13px] md:text-sm md:leading-relaxed">
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

        <div
          className={`relative mt-5 flex min-h-[1px] flex-col gap-5 sm:mt-6 sm:gap-7 lg:mt-8 lg:grid lg:min-h-[min(36vh,400px)] lg:items-start lg:gap-x-4 lg:gap-y-6 xl:gap-x-6 ${
            leadDone
              ? "lg:grid-cols-[minmax(11.5rem,19rem)_minmax(0,0.45fr)_minmax(0,1fr)_auto]"
              : "lg:grid-cols-[minmax(11.5rem,19rem)_minmax(0,1.1fr)_auto]"
          }`}
        >
          {/* Left — headshot (first track needs a non-zero min or fr columns can collapse it to 0 width) */}
          <div className="relative z-[2] flex min-w-0 flex-col lg:col-start-1">
            <div className="relative z-[1] mx-auto w-[min(100%,17.5rem)] sm:w-[min(100%,21rem)] lg:mx-0 lg:w-full lg:max-w-[19rem] motion-reduce:rotate-0">
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
                  <div
                    className="pointer-events-none absolute inset-0 shadow-[inset_0_0_48px_rgba(0,0,0,0.14)]"
                    aria-hidden
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Landmark — Pradeep (typography between photo and About) */}
          {leadDone ? (
            <div className="pointer-events-none flex min-h-0 min-w-0 select-none items-center justify-center lg:col-start-2 lg:self-stretch">
              <p
                className="text-center font-black uppercase leading-none tracking-[-0.06em] text-neutral-200 max-lg:text-[clamp(2.75rem,12vw,4.5rem)] lg:text-[clamp(3.25rem,11vh,6.5rem)] lg:[writing-mode:vertical-rl]"
                aria-hidden
              >
                Pradeep
              </p>
            </div>
          ) : null}

          {/* Center — About me */}
          {leadDone ? (
            <aside className="relative z-[3] mx-auto min-w-0 w-full max-w-lg border-y border-neutral-200/90 bg-white/90 px-4 py-5 text-left shadow-sm backdrop-blur-[2px] sm:max-w-xl sm:rounded-xl sm:border sm:px-6 sm:py-6 lg:col-start-3 lg:mx-0 lg:mt-0 lg:max-w-none lg:border lg:border-neutral-200/80 lg:bg-white/95 lg:px-5 lg:py-5 lg:shadow-md xl:px-6 xl:py-6">
              <p className="text-[0.625rem] font-semibold uppercase tracking-[0.22em] text-neutral-500 sm:text-[0.6875rem]">About</p>
              <h3 className="mt-1.5 text-xl font-black uppercase tracking-tight text-black sm:mt-2 sm:text-[1.5rem] sm:leading-tight">
                About me
              </h3>
              <p className="mt-3 text-[0.875rem] leading-[1.55] text-neutral-800 text-pretty sm:mt-4 sm:text-[0.9375rem] sm:leading-[1.62]">
                {ABOUT_BODY}
              </p>
            </aside>
          ) : null}

          {/* Right — Instagram */}
          <div
            className={`mx-auto flex w-full max-w-[16rem] shrink-0 flex-col items-center gap-3 sm:max-w-[17.5rem] sm:gap-4 lg:mx-0 lg:mt-0 lg:justify-self-end ${
              leadDone ? "lg:col-start-4" : "lg:col-start-3"
            }`}
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
            <div className="w-full max-w-[16rem] text-center text-[12px] font-medium leading-snug text-neutral-600 sm:max-w-[17.5rem] sm:text-[13px] sm:leading-[1.6]">
              {leadDone ? (
                <TypewriterText
                  as="p"
                  text={INSTA_CAPTION_BLURB}
                  className="block text-pretty"
                  charDelayMs={12}
                  startDelayMs={120}
                />
              ) : null}
            </div>
          </div>

          {/* Landmark — oversized section anchor */}
          <div
            className={`pointer-events-none select-none lg:row-start-2 ${leadDone ? "lg:col-span-4" : "lg:col-span-3"}`}
          >
            <p
              className="mt-4 text-center text-[clamp(2rem,11vw,6rem)] font-black uppercase leading-[0.85] tracking-[-0.05em] text-neutral-300 sm:mt-5 sm:text-[clamp(2.5rem,12vw,8rem)] lg:mt-3 lg:pb-1 lg:text-[clamp(3rem,10vh,7rem)]"
              aria-hidden
            >
              About
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
