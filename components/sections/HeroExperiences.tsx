"use client";

import Image from "next/image";

/** Match Hero editorial deck (`Hero.tsx` HERO_DECK_STEP_REM) — left strip peeks through. */
const DECK_STEP_REM = 3.25;

const BG = "#8B004A";
const FG = "#F2EFE7";

const ROLES = [
  {
    id: "ml",
    navLabel: "ML",
    displayLines: [{ text: "ML", className: "text-[clamp(3.5rem,22vw,13rem)]" }],
    body: "ML-driven features for automation and predictive analytics—models wired into internal tools and client surfaces with clear, explainable outcomes.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=1000&fit=crop&q=80",
    imageAlt: "Abstract technology and data visualization",
  },
  {
    id: "web",
    navLabel: "Web Full Stack",
    displayLines: [
      { text: "Web Full", className: "text-[clamp(2.25rem,11vw,7.5rem)]" },
      { text: "Stack", className: "text-[clamp(2.25rem,11vw,7.5rem)]" },
    ],
    body: "High-scale apps with Next.js, NestJS, TypeScript, and Prisma—robust state, SEO, and products like CRM and school management with data integrity and UX that holds up in production.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=1000&fit=crop&q=80",
    imageAlt: "Developer working on a laptop",
  },
  {
    id: "manager",
    navLabel: "Manager",
    displayLines: [{ text: "Manager", className: "text-[clamp(2.5rem,14vw,9rem)]" }],
    body: "Leading multidisciplinary teams from architecture to deployment—reviews, docs, agile rhythm, and the main technical voice translating business goals into roadmaps and delivery.",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=1000&fit=crop&q=80",
    imageAlt: "Team collaboration",
  },
] as const;

function DeckBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1]"
      style={{
        background: `radial-gradient(ellipse 120% 80% at 50% 40%, ${BG} 0%, #5c0030 100%)`,
      }}
      aria-hidden
    />
  );
}

function Watermark({ lines }: { lines: (typeof ROLES)[number]["displayLines"] }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-[4] flex flex-col items-center justify-center px-4 pt-[10vh] opacity-[0.14]" aria-hidden>
      <div className="text-center font-sans font-black uppercase leading-[0.9] tracking-[-0.04em]" style={{ color: FG }}>
        {lines.map((line, li) => (
          <span key={li} className={`block ${line.className}`}>
            {line.text}
          </span>
        ))}
      </div>
    </div>
  );
}

type RolePageProps = {
  slideIndex: number;
  priority?: boolean;
};

function deckWidth(stackPos: number) {
  if (stackPos === 0) return "100%";
  return `calc(100% - ${stackPos * DECK_STEP_REM}rem)` as const;
}

/** One “page”: stacked right-aligned strips like Hero ambient → landing → About. */
function RoleDeckPage({ slideIndex, priority }: RolePageProps) {
  const depth = slideIndex + 1;
  const stacks = ROLES.slice(0, depth);

  return (
    <section
      className="relative h-full min-h-0 w-full shrink-0 overflow-hidden"
      style={{ color: FG }}
      aria-label={`${ROLES[slideIndex].navLabel} experience page`}
    >
      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-black/12 via-transparent to-black/22" aria-hidden />

      {stacks.map((role, stackPos) => {
        const isBack = stackPos < stacks.length - 1;
        const width = deckWidth(stackPos);
        const z = 10 + stackPos * 10;

        if (isBack) {
          return (
            <div
              key={`peek-${role.id}-${slideIndex}`}
              className="pointer-events-none absolute inset-y-0 right-0 overflow-hidden rounded-l-[1rem] border-l border-[#F2EFE7]/[0.12] shadow-[-20px_0_48px_-10px_rgba(0,0,0,0.4)] sm:rounded-l-3xl"
              style={{ width, zIndex: z }}
            >
              <DeckBackground />
              <Watermark lines={role.displayLines} />
            </div>
          );
        }

        const r = role;
        return (
          <div
            key={r.id}
            className="absolute inset-y-0 right-0 flex min-h-0 flex-col overflow-hidden overflow-y-auto rounded-l-[1rem] border-l border-[#F2EFE7]/20 shadow-[-24px_0_56px_-12px_rgba(0,0,0,0.42)] sm:rounded-l-3xl"
            style={{
              width,
              zIndex: z,
              backgroundColor: `${BG}f2`,
            }}
          >
            <Watermark lines={r.displayLines} />
            <div className="pointer-events-none absolute inset-0 z-[15] bg-gradient-to-b from-transparent via-transparent to-black/20" aria-hidden />

            <header className="relative z-[40] flex shrink-0 items-start justify-between px-5 pb-2 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-8 md:px-10">
              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-[#F2EFE7]/85 sm:text-[0.65rem]">
                Professional experience
              </span>
              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-[#F2EFE7]/55 sm:text-[0.65rem]">
                {slideIndex + 1} / {ROLES.length}
              </span>
            </header>

            <div className="relative z-[35] flex min-h-0 flex-1 flex-col px-5 pb-[max(6.5rem,env(safe-area-inset-bottom))] pt-4 sm:px-8 md:flex-row md:items-stretch md:gap-6 md:px-10 md:pb-8">
              <div className="relative z-[35] flex max-w-xl flex-1 flex-col justify-center md:max-w-[46%]">
                <p className="rounded-full border border-[#F2EFE7]/25 bg-black/15 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#F2EFE7] backdrop-blur-sm sm:text-xs">
                  {r.navLabel}
                </p>
                <p className="mt-5 text-[0.875rem] font-normal leading-[1.65] text-[#F2EFE7]/95 sm:text-[0.95rem]">{r.body}</p>
              </div>

              <div className="relative z-[35] mx-auto mt-6 w-[min(88%,20rem)] shrink-0 md:mx-0 md:mt-0 md:flex md:w-[min(48%,22rem)] md:items-center">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm shadow-[0_24px_70px_rgba(0,0,0,0.45)] ring-1 ring-[#F2EFE7]/22">
                  <Image
                    src={r.image}
                    alt={r.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 88vw, 22rem"
                    unoptimized
                    priority={priority}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" aria-hidden />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export type HeroExperiencesProps = {
  /** 0 = ML, 1 = Web Full Stack, 2 = Manager — driven by main scroll in `Hero` GSAP timeline. */
  pageIndex: number;
};

export function HeroExperiences({ pageIndex }: HeroExperiencesProps) {
  const idx = Math.min(ROLES.length - 1, Math.max(0, pageIndex));

  return (
    <div className="relative flex h-full min-h-0 w-full flex-col" style={{ backgroundColor: BG }}>
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <RoleDeckPage slideIndex={idx} priority={idx === 0} />
      </div>

      <nav
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[50] flex justify-center border-t border-[#F2EFE7]/28 px-4 py-[max(0.85rem,env(safe-area-inset-bottom))]"
        style={{ backgroundColor: `${BG}ee` }}
        aria-label="Experience sections"
      >
        <div className="flex max-w-full flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:gap-x-10 md:gap-x-14">
          {ROLES.map((r, i) => (
            <span
              key={r.id}
              className={`whitespace-nowrap text-[0.62rem] font-semibold uppercase tracking-[0.2em] transition sm:text-[0.68rem] ${
                idx === i ? "text-[#F2EFE7]" : "text-[#F2EFE7]/45"
              }`}
            >
              {r.navLabel}
            </span>
          ))}
        </div>
      </nav>
    </div>
  );
}
