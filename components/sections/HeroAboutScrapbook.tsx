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

const PROFILE_PHOTO = "/images/pradeep-profile.png";
const HEADSHOT_LEFT = "/images/pradeep-headshot-left.png";

const ABOUT_LEAD =
  "Software engineer building exceptional digital experiences, from polished interfaces through production-grade machine learning.";

const ABOUT_BODY =
  "Hello, I'm Pradeep Chaudhary. I'm a full-stack developer and ML engineer with over two years of experience building end-to-end intelligent applications. I bridge the gap between complex machine learning research and functional, user-centric products. My expertise lies in architecting scalable React/Next.js frontends, robust Node.js/Python backends, and integrating custom ML models that solve real-world problems. I don't just build models — I build the infrastructure that makes them useful.";

const INSTA_CAPTION_BLURB =
  "Three years of experience. 5 projects shipped across storefronts, internal tools, and analytics surfaces. Comfortable owning features end to end, with AWS, Docker, and CI/CD friendly habits baked in.";

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="18" height="18" aria-hidden fill="currentColor">
      <path d="M12 7.2A4.8 4.8 0 1 0 16.8 12 4.81 4.81 0 0 0 12 7.2Zm0 7.9A3.1 3.1 0 1 1 15.1 12 3.11 3.11 0 0 1 12 15.1ZM16.3 5.5a1.12 1.12 0 1 1-1.12 1.12 1.12 1.12 0 0 1 1.12-1.12Zm3.4 1.14A6.31 6.31 0 0 0 18.4 4a6.27 6.27 0 0 0-4.24-.26A4 4 0 0 0 12 3.65a4 4 0 0 0-2.16.09A6.27 6.27 0 0 0 5.6 4 6.14 6.14 0 0 0 4 5.64a6.31 6.31 0 0 0-.26 4.24A4 4 0 0 0 3.65 12a4 4 0 0 0 .09 2.16A6.31 6.31 0 0 0 4 18.4a6.27 6.27 0 0 0 1.64 1.62 6.31 6.31 0 0 0 4.24.26A4 4 0 0 0 12 20.35a4 4 0 0 0 2.16-.09 6.31 6.31 0 0 0 4.24-.26A6.14 6.14 0 0 0 20 18.4a6.31 6.31 0 0 0 .26-4.24A4 4 0 0 0 20.35 12a4 4 0 0 0-.09-2.16A6.36 6.36 0 0 0 19.7 6.64ZM17.87 17a4.48 4.48 0 0 1-2.52 2.52 9.88 9.88 0 0 1-3.35.19A55.5 55.5 0 0 1 12 19.8a55.5 55.5 0 0 1-3-.09 4.48 4.48 0 0 1-2.52-2.52 9.88 9.88 0 0 1-.19-3.35A55.5 55.5 0 0 1 4.2 12a55.5 55.5 0 0 1 .09-3 4.48 4.48 0 0 1 2.52-2.52 9.88 9.88 0 0 1 3.35-.19A55.5 55.5 0 0 1 12 4.2a55.5 55.5 0 0 1 3 .09 4.48 4.48 0 0 1 2.52 2.52 9.88 9.88 0 0 1 .19 3.35A55.5 55.5 0 0 1 19.8 12a55.5 55.5 0 0 1-.09 3 4.64 4.64 0 0 1-1.84 2Z" />
    </svg>
  );
}

export function HeroAboutScrapbook() {
  const [leadDone, setLeadDone] = useState(false);

  return (
    /* overflow-hidden clips 3D perspective / transforms; w-full avoids vw-based horizontal bleed */
    <div className="pointer-events-auto relative flex w-full min-w-0 shrink-0 flex-col overflow-hidden bg-white pt-[max(0.5rem,env(safe-area-inset-top))] pb-[max(2.5rem,calc(env(safe-area-inset-bottom,0px)+2rem))]">
      <AboutScrapbookThreeBackdrop />
      
      <div className="pointer-events-auto relative z-[1] w-full max-w-none px-5 pb-6 pt-4 sm:px-8 sm:pb-8 sm:pt-5 md:px-10 md:pb-10 md:pt-6 lg:px-12">
        
        {/* Dynamic Header Box with fixed structural layout reservation */}
        <div className="min-h-[40px] max-w-[22rem] text-[12px] font-medium uppercase leading-snug tracking-[0.08em] text-neutral-700 sm:max-w-[26rem] sm:text-[13px] md:text-sm md:leading-relaxed">
          <span className={leadDone ? "hidden" : "inline"}>
            <TypewriterText
              as="span"
              text={ABOUT_LEAD}
              charDelayMs={12}
              onComplete={() => setLeadDone(true)}
            />
          </span>
          <p className={leadDone ? "block" : "sr-only"}>{ABOUT_LEAD}</p>
        </div>

        {/* Locked structural grid definitions ensure columns never warp or break your width expectations */}
        <div className="relative mt-8 grid min-h-[1px] w-full grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-[minmax(14rem,19rem)_auto_1fr_max-content] lg:items-start lg:gap-x-6">
          
          {/* Column 1: Headshot Layout Box */}
          <div className="relative z-[2] w-full max-w-[19rem] justify-self-center lg:justify-self-start">
            <div className="overflow-hidden rounded-xl border border-neutral-900 bg-neutral-900 shadow-[0_22px_50px_-20px_rgba(0,0,0,0.45)] transform -rotate-[1deg] lg:-rotate-[1.25deg]">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={HEADSHOT_LEFT}
                  alt="Pradeep Chaudhary — professional portrait"
                  fill
                  sizes="(max-width: 1024px) 280px, 320px"
                  priority
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* Column 2: Vertical Decorative Typography Signature */}
          <div className="pointer-events-none relative overflow-hidden select-none lg:self-stretch">
            <div
              className={`flex items-center justify-center transition-opacity duration-500 ${
                leadDone ? "opacity-100" : "opacity-10 lg:opacity-20"
              }`}
            >
              <p className="text-center font-black uppercase leading-none tracking-[-0.06em] text-neutral-200 text-[clamp(2.75rem,10vw,4.5rem)] lg:text-[clamp(3.25rem,10vh,5.5rem)] lg:[writing-mode:vertical-rl]" aria-hidden="true">
                Pradeep
              </p>
            </div>
          </div>

          {/* Column 3: Main Profile Text Description (Fades inside structural footprint safely) */}
          <aside 
            className={`relative z-[3] w-full bg-white px-4 py-5 border-y border-neutral-200 transition-all duration-500 sm:rounded-xl sm:border sm:px-6 sm:shadow-md lg:px-5 ${
              leadDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <p className="text-[0.625rem] font-semibold uppercase tracking-[0.22em] text-neutral-500 sm:text-[0.6875rem]">About</p>
            <h3 className="mt-1.5 text-xl font-black uppercase tracking-tight text-black sm:text-[1.5rem]">
              About me
            </h3>
            <p className="mt-3 text-[0.875rem] leading-[1.65] text-neutral-800 text-pretty">
              {ABOUT_BODY}
            </p>
          </aside>

          {/* Column 4: 3D Instagram Perspective Card Asset */}
          <div className="mx-auto flex w-full max-w-[16rem] shrink-0 flex-col items-center gap-4 overflow-hidden px-1 lg:mx-0" style={{ perspective: "1100px" }}>
            {/* Margins protect the boundaries from side leaks caused by horizontal 3D swinging lines */}
            <div className="relative w-full rounded-[1.75rem] border-[3px] border-black bg-white p-2 shadow-[0_28px_50px_-12px_rgba(0,0,0,0.35)] transform lg:mx-2 lg:[transform:rotateX(10deg)_rotateY(-18deg)_rotateZ(-1deg)]">
              <div className="flex items-center gap-2 border-b border-neutral-200 px-2 py-2">
                <div className="h-8 w-8 overflow-hidden rounded-full border border-black relative">
                  <Image src={PROFILE_PHOTO} alt="" fill className="object-cover" />
                </div>
                <div>
                  <p className="text-xs font-bold text-black">pradeep__chy</p>
                  <p className="text-[10px] uppercase tracking-wider text-neutral-500">Portfolio</p>
                </div>
              </div>
              <div className="overflow-hidden rounded-[1.1rem] relative aspect-square w-full">
                <Image src={PROFILE_PHOTO} alt="Pradeep Profile Feed Preview" fill className="object-cover" />
              </div>
            </div>

            <a
              href="https://www.instagram.com/pradeep__chy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg hover:bg-neutral-800 transition-colors"
            >
              <InstagramGlyph />
              <span>@pradeep__chy</span>
            </a>

            <div className="w-full text-center text-[12px] font-medium leading-snug text-neutral-600 min-h-[50px]">
              {leadDone ? (
                <TypewriterText as="p" text={INSTA_CAPTION_BLURB} className="text-pretty" charDelayMs={8} />
              ) : (
                <p className="sr-only">{INSTA_CAPTION_BLURB}</p>
              )}
            </div>
          </div>

        </div>

        {/* Global Bottom Section Label Backdrop Anchor */}
        <div className="pointer-events-none mt-6 w-full select-none overflow-hidden">
          <p className="text-center text-[clamp(3rem,11vw,6.5rem)] font-black uppercase leading-none tracking-[-0.05em] text-neutral-300/60" aria-hidden="true">
            About
          </p>
        </div>

      </div>
    </div>
  );
}