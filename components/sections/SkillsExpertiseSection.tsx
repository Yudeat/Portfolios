"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// --- DATA DEFINITIONS ---
const SKILLS_LIGHT = [
  { id: "next", label: "Next.js" },
  { id: "typescript", label: "TypeScript" },
  { id: "three", label: "Three.js" },
  { id: "gsap", label: "GSAP" },
  { id: "figma", label: "Figma" },
  { id: "uiux", label: "UI/UX" },
  { id: "responsive", label: "Responsive" },
  { id: "react", label: "React" },
];

const SKILLS_DARK = [
  { id: "git", label: "Git" },
  { id: "docker", label: "Docker" },
  { id: "webgl", label: "WebGL" },
  { id: "mongo", label: "MongoDB" },
  { id: "rest", label: "REST API" },
  { id: "cicd", label: "CI/CD" },
  { id: "webpack", label: "Webpack" },
  { id: "node", label: "Node.js" },
];

const CORE_TECHNOLOGIES = [
  { id: "react", title: "Express.js", subtitle: "2+ YEARS", index: 1 },
  { id: "three", title: "Three.js", subtitle: "3D Animation", index: 2 },
  { id: "next", title: "React.js", subtitle: "FRAMEWORK", index: 3 },
  { id: "gsap", title: "GSAP", subtitle: "ANIMATIONS", index: 4 },
  { id: "typescript", title: "TypeScript", subtitle: "TYPE-SAFE", index: 5 },
  { id: "nodeRack", title: "Node.js", subtitle: "BACKEND", index: 6 },
];

const SOFT_SKILLS = [
  { id: "leadership", title: "Leadership", subtitle: "TEAM LEAD", index: 1 },
  { id: "communication", title: "Communication", subtitle: "EFFECTIVE", index: 2 },
  { id: "problem", title: "Problem Solving", subtitle: "SOLUTIONS", index: 3 },
  { id: "adaptability", title: "Adaptability", subtitle: "FAST LEARNER", index: 4 },
  { id: "collaboration", title: "Collaboration", subtitle: "TEAM PLAYER", index: 5 },
  { id: "creativity", title: "Creativity", subtitle: "INNOVATIVE", index: 6 },
];

const STATS = [
  { value: "15+", line: "TECHNOLOGIES", sub: "MASTERED" },
  { value: "200+", line: "COMMITS", sub: "THIS YEAR" },
  { value: "50+", line: "PROJECTS", sub: "DELIVERED" },
  { value: "100%", line: "PERFORMANCE", sub: "DRIVEN" },
];

// --- HELPER COMPONENTS ---

function SkillGlyph({ id }: { id: string }) {
  // SVG paths logic simplified for brevity - use your previous SVG switch here
  return (
    <svg className="h-[18px] w-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
       <circle cx="12" cy="12" r="9" opacity="0.3" />
    </svg>
  );
}

function MarqueeTrack({ skills, variant, trackRef }: { skills: any[], variant: "light" | "dark", trackRef: any }) {
  const skin = variant === "light" 
    ? "bg-white text-black border-black" 
    : "bg-neutral-900 text-white border-white/20";
    
  return (
    <div className="flex overflow-hidden py-2">
      <div ref={trackRef} className="flex gap-4 whitespace-nowrap px-2 will-change-transform">
        {[...skills, ...skills].map((s, i) => (
          <span key={i} className={`flex items-center gap-3 border px-6 py-3 text-xs font-bold uppercase tracking-widest rounded-lg ${skin}`}>
            <SkillGlyph id={s.id} /> {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// --- MAIN SECTION ---

export function SkillsExpertiseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const t1 = track1Ref.current;
    const t2 = track2Ref.current;
    if (!t1 || !t2) return;

    // Movement 1: Left
    gsap.to(t1, {
      x: () => -Math.round(t1.scrollWidth / 2),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

    // Movement 2: Right
    gsap.fromTo(t2, 
      { x: () => -Math.round(t2.scrollWidth / 2) },
      {
        x: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true,
        }
      }
    );

    // Dynamic Refresh on Resize
    const refresh = () => ScrollTrigger.refresh();
    const ro = new ResizeObserver(refresh);
    ro.observe(sectionRef.current!);
    return () => ro.disconnect();
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full overflow-hidden bg-black py-24 text-white"
    >
      {/* Grid Backdrop */}
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] [background-size:40px_40px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-20 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-neutral-500">Curated Stack</p>
          <h2 className="mt-4 text-[clamp(4rem,15vw,10rem)] font-black leading-none tracking-tighter">
            SKILLS
          </h2>
        </div>

        {/* Animated Marquees */}
        <div className="flex flex-col gap-6">
          <MarqueeTrack skills={SKILLS_LIGHT} variant="light" trackRef={track1Ref} />
          <MarqueeTrack skills={SKILLS_DARK} variant="dark" trackRef={track2Ref} />
        </div>

        {/* Detailed Grids */}
        <div className="mt-32 grid gap-20 lg:grid-cols-2">
          <div>
            <h3 className="mb-8 text-xs font-bold uppercase tracking-widest text-neutral-500">Development</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {CORE_TECHNOLOGIES.map(tech => (
                <div key={tech.id} className="border border-white/10 bg-neutral-900/50 p-6 backdrop-blur-sm">
                   <p className="text-3xl font-bold">{tech.title}</p>
                   <p className="mt-2 text-[10px] text-neutral-500 uppercase">{tech.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="mb-8 text-xs font-bold uppercase tracking-widest text-neutral-500">Capabilities</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {SOFT_SKILLS.map(skill => (
                <div key={skill.id} className="border border-white/10 p-6">
                   <p className="text-3xl font-bold">{skill.title}</p>
                   <p className="mt-2 text-[10px] text-neutral-500 uppercase">{skill.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="mt-32 grid grid-cols-2 gap-8 border-t border-white/10 pt-16 md:grid-cols-4">
          {STATS.map(stat => (
            <div key={stat.line} className="text-center md:text-left">
              <p className="text-4xl font-black">{stat.value}</p>
              <p className="mt-2 text-[10px] font-bold text-neutral-500 uppercase">{stat.line}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}