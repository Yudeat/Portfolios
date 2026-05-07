import type { NarrativeProject } from "@/lib/narrativeProcessData";

export function NarrativeProcessCard({ project }: { project: NarrativeProject }) {
  return (
    <article
      data-cursor="expand"
      data-narrative-card
      className="narrative-card flex w-full min-w-0 flex-col justify-between gap-6 rounded-2xl border border-white/15 bg-white/[0.035] p-5 shadow-[0_0_90px_rgba(25,40,95,0.22)] sm:rounded-3xl sm:p-8 md:h-full md:w-[min(90vw,520px)] md:max-w-xl md:flex-shrink-0"
    >
      <header className="narrative-card__head">
        <p className="narrative-step text-xs uppercase tracking-[0.14em] text-white/50">Step {project.id}</p>
        <h3 className="narrative-title mt-3 text-xl font-semibold uppercase leading-tight tracking-[-0.01em] sm:text-2xl md:text-3xl">
          {project.title}
        </h3>
      </header>
      <div className="narrative-copy max-w-[58ch] space-y-3 text-sm text-white/76 sm:space-y-4 sm:text-base">
        <p className="narrative-block leading-relaxed" data-narrative-block="challenge">
          <span className="mb-1 block text-xs uppercase tracking-[0.12em] text-white/50">Challenge</span>
          {project.challenge}
        </p>
        <p className="narrative-block leading-relaxed" data-narrative-block="strategy">
          <span className="mb-1 block text-xs uppercase tracking-[0.12em] text-white/50">Strategy</span>
          {project.strategy}
        </p>
        <p className="narrative-block leading-relaxed" data-narrative-block="result">
          <span className="mb-1 block text-xs uppercase tracking-[0.12em] text-white/50">Result</span>
          {project.result}
        </p>
      </div>
    </article>
  );
}
