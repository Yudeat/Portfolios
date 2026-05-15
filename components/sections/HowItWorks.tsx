import type { ReactNode } from "react";

const STEPS = [
  {
    id: "idea",
    title: "IDEA",
    body: "We meet with your team to learn more about your project idea and goals.",
    accent: false,
    icon: (
      <svg className="mx-auto size-12 text-[#101116]" viewBox="0 0 48 48" fill="none" aria-hidden>
        <path
          d="M24 10a8 8 0 0 0-4 14.9V28h8v-3.1A8 8 0 0 0 24 10Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M20 32h8M22 36h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "design",
    title: "DESIGN",
    body: "We will design a mockup or prototype of your website and present it for feedback.",
    accent: false,
    icon: (
      <svg className="mx-auto size-12 text-[#101116]" viewBox="0 0 48 48" fill="none" aria-hidden>
        <path
          d="M16 24c0-4.5 3.6-8.2 8-8.2 1.2 0 2.4.3 3.4.8M32 24c0 4.5-3.6 8.2-8 8.2-1.2 0-2.4-.3-3.4-.8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M20 18.5c1.8-1.2 3.9-1.9 6.2-1.9 5.5 0 10 4 10 9s-4.5 9-10 9-10-4-10-9c0-2.4.9-4.6 2.4-6.3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "web-dev",
    title: "WEB DEV",
    body: "When the project is completed, we schedule a walkthrough and training so your team is confident operating it.",
    accent: false,
    icon: (
      <svg className="mx-auto size-12 text-[#101116]" viewBox="0 0 48 48" fill="none" aria-hidden>
        <rect x="10" y="14" width="28" height="22" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 20h28" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="15" cy="17" r="1.2" fill="currentColor" />
        <circle cx="19" cy="17" r="1.2" fill="currentColor" />
        <path d="M16 28l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "launch",
    title: "LAUNCH",
    body: "We develop and launch using best practices and standards — performance, accessibility, and reliability included.",
    accent: true,
    icon: (
      <svg className="mx-auto size-12 text-emerald-600" viewBox="0 0 48 48" fill="none" aria-hidden>
        <path
          d="M14 12h20l-2 8h-16l-2-8Zm2 8 1.5 18h15L32 20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M18 38h12M24 38v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path
          d="M22 12V8h4v4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
] as const;

function StepFrame({ accent, children }: { accent: boolean; children: ReactNode }) {
  const line = accent ? "border-emerald-600/45" : "border-[#101116]/22";
  return (
    <div className="relative px-5 py-10 sm:px-8 sm:py-12">
      <span className={`pointer-events-none absolute left-2 top-2 h-7 w-7 border-l border-t ${line}`} aria-hidden />
      <span className={`pointer-events-none absolute right-2 top-2 h-7 w-7 border-r border-t ${line}`} aria-hidden />
      <span className={`pointer-events-none absolute bottom-2 left-2 h-7 w-7 border-b border-l ${line}`} aria-hidden />
      <span className={`pointer-events-none absolute bottom-2 right-2 h-7 w-7 border-b border-r ${line}`} aria-hidden />
      {children}
    </div>
  );
}

export function HowItWorks() {
  return (
    <section
      className="flex min-h-[100dvh] flex-col justify-center bg-white px-4 py-12 text-[#101116] sm:px-10 sm:py-16 lg:px-16"
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto w-full max-w-7xl text-center">
        <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-emerald-600">
          How it works
        </p>
        <h2
          id="how-it-works-heading"
          className="mt-4 text-balance font-sans text-[clamp(2rem,5.5vw,4.25rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-[#101116]"
        >
          From idea to launch
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-pretty font-mono text-[0.65rem] font-medium uppercase leading-relaxed tracking-[0.2em] text-[#101116]/55 sm:text-xs">
          Crafting your next-gen digital success path
        </p>
      </div>

      <div className="mx-auto mt-10 grid w-full max-w-7xl gap-8 sm:mt-12 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-6 xl:gap-8">
        {STEPS.map((step) => (
          <StepFrame key={step.id} accent={step.accent}>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6">{step.icon}</div>
              <h3
                className={`font-sans text-sm font-bold uppercase tracking-[0.18em] sm:text-base ${
                  step.accent ? "text-emerald-600" : "text-[#101116]"
                }`}
              >
                {step.title}
              </h3>
              <p
                className={`mt-4 max-w-[17rem] text-pretty text-sm leading-relaxed sm:text-[0.95rem] ${
                  step.accent ? "text-emerald-700/90" : "text-[#101116]/68"
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
