type CaseStudy = {
  title: string;
  challenge: string;
  strategy: string;
  result: string;
};

const CASE_STUDIES: CaseStudy[] = [
  {
    title: "Pulse Commerce Rebuild",
    challenge:
      "The client had a 40% bounce rate and a legacy system that couldn't handle traffic spikes.",
    strategy:
      "We re-architected the UI using a headless CMS to prioritize speed and mobile-first accessibility.",
    result: "Launched in 4 months. 60% increase in load speed and a 25% lift in user retention.",
  },
  {
    title: "Nexa Insights Platform",
    challenge:
      "The product experience was fragmented across regions, causing inconsistent conversions and support overload.",
    strategy:
      "We created a unified design system and rebuilt key funnels with modular, localized content controls.",
    result: "Cut support tickets by 32% and improved checkout completion by 19% in the first quarter.",
  },
];

export function CaseStudies() {
  return (
    <section className="px-6 py-[22vh] sm:px-10 lg:px-16">
      <p className="text-xs uppercase tracking-[0.18em] text-[#3f7cff]">Case Studies</p>
      <h2 className="mt-4 text-[clamp(2rem,4.5vw,4.5rem)] font-semibold uppercase leading-[0.98] tracking-[-0.012em]">
        Solution-Driven Outcomes
      </h2>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {CASE_STUDIES.map((project, index) => (
          <article key={`${project.title}-${index}`} className="rounded-3xl border border-white/15 bg-white/[0.02] p-8">
            <p className="text-xs uppercase tracking-[0.14em] text-white/50">Project Title</p>
            <h3 className="mt-2 text-3xl font-semibold tracking-[-0.01em]">{project.title}</h3>

            <div className="mt-8 space-y-6 text-white/80">
              <p>
                <span className="block text-sm uppercase tracking-[0.12em] text-white/45">The Challenge</span>
                {project.challenge}
              </p>
              <p>
                <span className="block text-sm uppercase tracking-[0.12em] text-white/45">The Strategy</span>
                {project.strategy}
              </p>
              <p>
                <span className="block text-sm uppercase tracking-[0.12em] text-white/45">The Result</span>
                {project.result}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
