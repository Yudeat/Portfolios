import type { ReactNode } from "react";

const STEPS = [
  {
    id: "idea",
    title: "01 / IDEA",
    body: "We meet with your team to discover requirements, outline milestones, and define the strategic technical architecture.",
    accent: false,
    icon: (
      <svg className="mx-auto size-11 text-[#101116]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
        <path d="M9 18h6M10 22h4" />
      </svg>
    ),
  },
  {
    id: "design",
    title: "02 / DESIGN",
    body: "We translate specifications into polished UI prototypes, establishing visual systems, typography, and responsive component mockups.",
    accent: false,
    icon: (
      <svg className="mx-auto size-11 text-[#101116]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="m12 3-1.912 5.886H3.882l5.053 3.671L7.023 18.44 12 14.77l4.977 3.671-1.912-5.883 5.053-3.671h-6.206L12 3Z" />
      </svg>
    ),
  },
  {
    id: "web-dev",
    title: "03 / WEB DEV",
    body: "We write clean code following semantic accessibility and performance metrics, building layout components and modern APIs.",
    accent: false,
    icon: (
      <svg className="mx-auto size-11 text-[#101116]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="m18 16 4-4-4-4M6 8l-4 4 4 4M14.5 4l-5 16" />
      </svg>
    ),
  },
  {
    id: "launch",
    title: "04 / LAUNCH",
    body: "We push production builds live, verify performance standards, and complete detailed codebase handovers and operations training.",
    accent: true,
    icon: (
      <svg className="mx-auto size-11 text-emerald-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M4.5 16.5c-1.5 1.26-2.5 3.19-2.5 5.5s1 4.24 2.5 5.5M19.5 16.5c1.5 1.26 2.5 3.19 2.5 5.5s-1 4.24-2.5 5.5" />
        <path d="m12 2 3 5h-6l3-5ZM12 7v10M9 17h6" />
      </svg>
    ),
  },
] as const;

function StepFrame({ accent, children }: { accent: boolean; children: ReactNode }) {
  const line = accent ? "border-emerald-700/35" : "border-[#101116]/15";
  return (
    <div className="relative px-6 py-12 sm:px-8 sm:py-14 bg-transparent transition-colors duration-200">
      <span className={`pointer-events-none absolute left-0 top-0 h-6 w-6 border-l border-t ${line}`} aria-hidden />
      <span className={`pointer-events-none absolute right-0 top-0 h-6 w-6 border-r border-t ${line}`} aria-hidden />
      <span className={`pointer-events-none absolute bottom-0 left-0 h-6 w-6 border-b border-l ${line}`} aria-hidden />
      <span className={`pointer-events-none absolute bottom-0 right-0 h-6 w-6 border-b border-r ${line}`} aria-hidden />
      {children}
    </div>
  );
}

export function HowItWorks() {
  return (
    <section
      className="flex min-h-screen flex-col justify-center bg-white px-4 py-16 text-[#101116] sm:px-10 sm:py-24 lg:px-16"
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto w-full max-w-7xl text-center">
        <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.3em] text-emerald-700">
          Process Workflow
        </p>
        <h2
          id="how-it-works-heading"
          className="mt-4 text-balance font-sans text-[clamp(2.25rem,6vw,4.5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.03em] text-[#101116]"
        >
          From idea to launch
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-pretty font-mono text-[0.68rem] font-semibold uppercase leading-relaxed tracking-[0.22em] text-[#101116]/50 sm:text-xs">
          A predictable, transparent delivery framework
        </p>
      </div>

      <div className="mx-auto mt-14 grid w-full max-w-7xl gap-8 sm:mt-16 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-6 xl:gap-8">
        {STEPS.map((step) => (
          <StepFrame key={step.id} accent={step.accent}>
            <div className="flex h-full flex-col items-center text-center">
              <div className="mb-6 flex h-12 items-center justify-center" aria-hidden="true">
                {step.icon}
              </div>
              <h3
                className={`font-sans text-xs font-bold uppercase tracking-[0.2em] sm:text-sm ${
                  step.accent ? "text-emerald-700" : "text-[#101116]"
                }`}
              >
                {step.title}
              </h3>
              <p
                className={`mt-4 max-w-[18rem] text-pretty text-xs leading-[1.65] sm:text-[0.875rem] ${
                  step.accent ? "text-neutral-800" : "text-[#101116]/70"
                }`}
              >
                {step.body}
              </p>
            </div>
          </StepFrame>
        ))}
      </div>
    </section>
  );
}