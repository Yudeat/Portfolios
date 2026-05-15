"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { useLenis } from "@/components/providers/SmoothScrollProvider";
import { SITE_GITHUB_URL } from "@/lib/site";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type ProjectSlide = {
  meta: string;
  title: string;
  description: string;
  stats: { value: string; label: string }[];
  tech: string[];
  image: string;
  imageAlt: string;
  href: string;
  codeHref?: string;
  featured?: boolean;
};

const PROJECTS: ProjectSlide[] = [
  {
    meta: "E‑commerce / Frontend / 2024",
    title: "NauloMart",
    description:
      "A full storefront experience with promo bar, search-first navigation, hero carousel, and category tiles — built for discovery, trust, and fast shopping flows on the web.",
    stats: [
      { value: "6+", label: "Top categories" },
      { value: "Live", label: "Production" },
    ],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    image: "/images/work-naulomart.png",
    imageAlt: "NauloMart homepage with hero banner, search, and shop our top categories",
    href: "https://naulomart.com",
    codeHref: "https://github.com/overOP/NauloMart-Frontend",
    featured: true,
  },
  {
    meta: "Frontend / Motion / 2024",
    title: "GTA 6 — React landing",
    description:
      "A cinematic, Vice City–inspired marketing landing built in React with GSAP-driven motion: layered hero typography, scroll cues, and polished UI beats that echo Rockstar-style presentation.",
    stats: [
      { value: "GSAP", label: "Animation core" },
      { value: "Live", label: "Vercel deploy" },
    ],
    tech: ["React", "GSAP", "JavaScript", "Vercel"],
    image: "/images/work-gta6-react.png",
    imageAlt: "GTA 6 React landing hero with illustrated character and grand theft title typography",
    href: "https://gta-6-react-js.vercel.app",
    codeHref: "https://github.com/overOP/GTA-6-React.js",
  },
  {
    meta: "Frontend / E‑commerce UI / 2024",
    title: "Amazon storefront clone",
    description:
      "High-fidelity Amazon-style marketplace UI: navigation, category grids, hero promos, and responsive product modules — a focused frontend build deployed on Vercel.",
    stats: [
      { value: "100+", label: "UI sections" },
      { value: "Live", label: "Vercel deploy" },
    ],
    tech: ["Next.js", "React", "Tailwind CSS", "Responsive"],
    image: "/images/work-amazon-clone.png",
    imageAlt: "Amazon-inspired storefront with category cards, hero banner, and product grids",
    href: "https://amazon-responsible.vercel.app/",
    codeHref: "https://github.com/overOP/Amazon-HTML",
  },
  {
    meta: "PERN stack / Social / 2024",
    title: "Socially",
    description:
      "A dark-mode social feed with auth, profiles, and posts — powered by a PERN backend and a Next.js + TypeScript client. Real-time feel via WebSockets for live updates and engagement on the feed.",
    stats: [
      { value: "WS", label: "Live updates" },
      { value: "Live", label: "Vercel deploy" },
    ],
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Express", "Node.js", "WebSockets"],
    image: "/images/work-socially-pern.png",
    imageAlt: "Socially app dark UI with welcome card, sign in, and social feed posts",
    href: "https://pern-socially-next-ts.vercel.app",
    codeHref: "https://github.com/overOP/PERN-Socially-Next.ts",
  },
  {
    meta: "Education OS / Web / 2025",
    title: "EXILE",
    description:
      "Independent education OS for global admissions and migration — clear vision, audited metrics, and a premium dark UI that sells trust without agency commissions.",
    stats: [
      { value: "3,000+", label: "Students guided" },
      { value: "48", label: "Countries reached" },
      { value: "$0", label: "Agency fees" },
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: "/images/work-exileos.png",
    imageAlt: "EXILE landing page with hero typography, metrics card, and university names",
    href: "https://exileos.com",
    codeHref: SITE_GITHUB_URL,
  },
];

function IconArrowOut({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M14 3h7v7M10 14 21 3M21 14v7H3V3h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconGithub({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 1C5.92 1 1 5.92 1 12c0 4.84 3.13 8.94 7.47 10.39.55.1.75-.23.75-.52 0-.26-.01-.94-.01-1.85-3.03.66-3.66-1.46-3.66-1.46-.5-1.26-1.22-1.6-1.22-1.6-1-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.56 1.2 3.19.92.1-.72.39-1.2.71-1.47-2.48-.28-5.08-1.24-5.08-5.52 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.42.11-2.96 0 0 .95-.3 3.12 1.16a10.9 10.9 0 0 1 5.66 0c2.17-1.46 3.12-1.16 3.12-1.16.61 1.54.23 2.68.11 2.96.72.78 1.16 1.78 1.16 3 0 4.29-2.61 5.23-5.1 5.5.4.34.76 1.02.76 2.05 0 1.48-.01 2.67-.01 3.03 0 .29.2.63.75.52A10.02 10.02 0 0 0 23 12c0-6.08-4.92-11-11-11Z" />
    </svg>
  );
}

function IconChevron({ className, dir }: { className?: string; dir: "left" | "right" }) {
  return (
    <svg className={`${className ?? ""} ${dir === "left" ? "scale-x-[-1]" : ""}`.trim()} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProjectSlideBody({ project, slideIndex }: { project: ProjectSlide; slideIndex: number }) {
  return (
    <div className="grid gap-10 pb-4 pt-10 lg:grid-cols-2 lg:gap-14 lg:pb-6 lg:pt-14 xl:gap-20">
      <div className="order-2 flex min-w-0 flex-col lg:order-1">
        <p className="inline-flex max-w-full border border-neutral-300 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-600 sm:text-[11px]">
          {project.meta}
        </p>
        <h2 className="mt-6 text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.02] tracking-[-0.03em] text-neutral-950">{project.title}</h2>
        <p className="mt-6 max-w-xl text-[0.9375rem] leading-[1.7] text-neutral-600 sm:text-[1.05rem]">{project.description}</p>

        <div className="mt-8 flex flex-wrap items-center gap-6 border-y border-neutral-200 py-6 sm:gap-8">
          {project.stats.map((s, i) => (
            <Fragment key={`${s.label}-${i}`}>
              {i > 0 ? <span className="hidden h-10 w-px shrink-0 bg-neutral-200 sm:block" aria-hidden /> : null}
              <div>
                <p className="text-xl font-bold tabular-nums text-neutral-950 sm:text-2xl">{s.value}</p>
                <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500 sm:text-[11px]">{s.label}</p>
              </div>
            </Fragment>
          ))}
        </div>

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <li key={t}>
              <span className="inline-block border border-neutral-300 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-800 sm:px-3 sm:text-[11px]">
                {t}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3 sm:mt-10">
          <a href={project.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#E32119] px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#c41d17] sm:px-6 sm:text-sm">
            View project
            <IconArrowOut className="shrink-0" />
          </a>
          {project.codeHref ? (
            <a href={project.codeHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-neutral-900/90 bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-900 transition hover:border-neutral-950 hover:bg-neutral-50 sm:px-6 sm:text-sm">
              Code
              <IconGithub className="shrink-0 opacity-90" />
            </a>
          ) : null}
        </div>
      </div>

      <div className="relative order-1 lg:order-2">
        <div className="relative aspect-[4/3] w-full overflow-hidden border border-neutral-200 bg-neutral-100 sm:aspect-[16/11] lg:aspect-[5/4] xl:aspect-[16/10]">
          <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain" priority={slideIndex === 0} />
          {project.featured ? (
            <div className="absolute right-3 top-3 flex items-center gap-1.5 bg-[#E32119] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white sm:right-4 sm:top-4 sm:px-3 sm:text-[11px]">
              <span aria-hidden>★</span> Featured
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function SelectedWorkProjects() {
  const total = PROJECTS.length;
  const lenis = useLenis();

  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const currentNumRef = useRef<HTMLSpanElement>(null);
  const triggerInstanceRef = useRef<ScrollTrigger | null>(null);

  const getScrollTriggerProgress = () => {
    if (triggerInstanceRef.current) {
      return triggerInstanceRef.current.progress;
    }
    return 0;
  };

  const navigateToProgress = (targetProgress: number) => {
    if (!triggerInstanceRef.current) return;
    const st = triggerInstanceRef.current;
    const clamped = Math.min(1, Math.max(0, targetProgress));
    const targetY = st.start + (st.end - st.start) * clamped;

    if (lenis) {
      lenis.scrollTo(targetY, { duration: 0.85 });
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  const handleStepNavigation = (direction: number) => {
    const stepSize = 1 / Math.max(1, total - 1);
    const nextProgress = getScrollTriggerProgress() + direction * stepSize;
    navigateToProgress(nextProgress);
  };

  useGSAP(
    () => {
      const pin = pinRef.current;
      const track = trackRef.current;
      const progressBar = progressBarRef.current;
      const progressText = progressTextRef.current;
      const currentNum = currentNumRef.current;
      const slides = gsap.utils.toArray<HTMLElement>("[data-project-slide]");

      if (!pin || !track || !progressBar || !progressText || !currentNum) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const calculateTravelDistance = () => Math.max(8, Math.ceil(track.scrollWidth - pin.clientWidth + 1));
        
        gsap.set(track, { x: 0 });

        // High-performance atomic UI updates without state-driven re-renders
        const updateUIElements = (progress: number) => {
          const clampedProgress = Math.min(1, Math.max(0, progress));
          const currentSlideIdx = Math.min(total - 1, Math.round(clampedProgress * (total - 1)));
          
          gsap.set(progressBar, { scaleX: clampedProgress, transformOrigin: "left center" });
          progressText.innerText = `${Math.round(clampedProgress * 100)}%`;
          currentNum.innerText = String(currentSlideIdx + 1).padStart(2, "0");

          slides.forEach((slide, idx) => {
            if (idx === currentSlideIdx) {
              slide.classList.remove("pointer-events-none");
              slide.removeAttribute("aria-hidden");
            } else {
              slide.classList.add("pointer-events-none");
              slide.setAttribute("aria-hidden", "true");
            }
          });
        };

        const horizontalTimeline = gsap.timeline({
          scrollTrigger: {
            id: "selected-work-horizontal",
            trigger: pin,
            start: "top top",
            end: () => `+=${calculateTravelDistance()}`,
            scrub: 0.55,
            pin: true,
            pinSpacing: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => updateUIElements(self.progress),
            onRefresh: (self) => updateUIElements(self.progress),
          },
        });

        horizontalTimeline.to(track, {
          x: () => -calculateTravelDistance(),
          ease: "none",
        });

        triggerInstanceRef.current = horizontalTimeline.scrollTrigger || null;

        return () => {
          if (horizontalTimeline.scrollTrigger) horizontalTimeline.scrollTrigger.kill();
          horizontalTimeline.kill();
          triggerInstanceRef.current = null;
        };
      });

      // Handle mobile vertical behavior utilizing IntersectionObserver
      mm.add("(max-width: 767px)", () => {
        if (slides.length === 0) return;

        const observerOptions = {
          root: null,
          threshold: [0.2, 0.5, 0.8],
        };

        const mobileObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
              const targetElement = entry.target as HTMLElement;
              const slideIndexAttr = targetElement.dataset.slideIndex;
              if (slideIndexAttr) {
                const activeIndex = parseInt(slideIndexAttr, 10);
                currentNum.innerText = String(activeIndex + 1).padStart(2, "0");
                
                const dynamicProgress = activeIndex / (total - 1);
                gsap.set(progressBar, { scaleX: dynamicProgress, transformOrigin: "left center" });
                progressText.innerText = `${Math.round(dynamicProgress * 100)}%`;
              }
            }
          });
        }, observerOptions);

        slides.forEach((slide) => mobileObserver.observe(slide));

        return () => mobileObserver.disconnect();
      });
    },
    { scope: containerRef, dependencies: [total] }
  );

  useEffect(() => {
    const handleKeyboardNavigation = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleStepNavigation(1);
      if (e.key === "ArrowLeft") handleStepNavigation(-1);
    };
    window.addEventListener("keydown", handleKeyboardNavigation);
    return () => window.removeEventListener("keydown", handleKeyboardNavigation);
  }, [total]);

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-white px-4 pb-8 pt-[max(3rem,8vh)] text-neutral-900 sm:px-8 sm:pb-10 sm:pt-[10vh] md:px-8 md:pb-6 md:pt-6 lg:px-16" aria-labelledby="selected-work-heading">
      <h2 id="selected-work-heading" className="sr-only">Selected work</h2>
      <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] [background-size:40px_40px]" aria-hidden />

      <div ref={pinRef} className="relative z-[1] md:flex md:min-h-0 md:flex-col md:overflow-hidden">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col px-4 pb-6 pt-[max(3rem,8vh)] md:min-h-0 md:px-8 md:pb-6 md:pt-8 lg:px-6 lg:pb-8 lg:pt-10">
          <header className="flex shrink-0 flex-wrap items-start justify-between gap-6 border-b border-neutral-200 pb-8 sm:pb-10">
            <div className="inline-flex items-center gap-2.5 border border-[#E32119] px-3 py-2 sm:px-3.5 sm:py-2.5">
              <span className="text-[#E32119]" aria-hidden>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </span>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-800 sm:text-[11px] sm:tracking-[0.22em]">Selected work</p>
            </div>

            <div className="flex items-start gap-3 sm:gap-4">
              <div className="border border-neutral-300 px-4 py-3 text-right sm:px-5 sm:py-4">
                <p className="font-mono text-2xl font-medium tabular-nums text-neutral-950 sm:text-3xl">
                  <span ref={currentNumRef}>01</span>
                  <span className="text-base font-normal text-neutral-500 sm:text-lg"> / {String(total).padStart(2, "0")}</span>
                </p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-neutral-500 sm:text-[11px]">Projects</p>
              </div>
              <button type="button" onClick={() => handleStepNavigation(1)} className="flex size-11 shrink-0 items-center justify-center border border-neutral-300 text-neutral-700 transition hover:border-neutral-400 hover:bg-neutral-50 hover:text-neutral-950 sm:size-12" aria-label="Next project">
                <IconChevron dir="right" />
              </button>
              <button type="button" onClick={() => handleStepNavigation(-1)} className="flex size-11 shrink-0 items-center justify-center border border-neutral-300 text-neutral-700 transition hover:border-neutral-400 hover:bg-neutral-50 hover:text-neutral-950 sm:size-12" aria-label="Previous project">
                <IconChevron dir="left" />
              </button>
            </div>
          </header>

          <div className="relative mt-2 min-h-[min(56vh,520px)] overflow-hidden md:min-h-0">
            <div ref={trackRef} className="flex will-change-transform max-md:flex-col max-md:gap-20 md:flex-row md:flex-nowrap">
              {PROJECTS.map((p, slideIndex) => (
                <article key={p.title} data-project-slide data-slide-index={slideIndex} className="w-full shrink-0 md:flex-[0_0_100%] md:overflow-x-hidden md:pr-1 pointer-events-none" aria-hidden="true">
                  <ProjectSlideBody project={p} slideIndex={slideIndex} />
                </article>
              ))}
            </div>
          </div>

          <div className="mt-8 shrink-0 border border-neutral-200 sm:mt-6 md:mt-4">
            <div className="flex items-center justify-between gap-3 px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500 sm:px-4 sm:text-[11px]">
              <span>Start</span>
              <span ref={progressTextRef} className="tabular-nums text-neutral-800">0%</span>
              <span>End</span>
            </div>
            <div className="h-1 w-full bg-neutral-200">
              <div ref={progressBarRef} className="h-full bg-[#E32119] w-full scale-x-0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}