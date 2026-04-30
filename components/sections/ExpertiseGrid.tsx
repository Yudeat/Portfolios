const EXPERTISE = [
  {
    title: "Full-Stack Product Engineering",
    description: "Building end-to-end web systems with scalable architecture, secure APIs, and maintainable code.",
  },
  {
    title: "Data Analytics",
    description: "Turning product and user data into actionable insights for growth, retention, and performance.",
  },
  {
    title: "Machine Learning Integration",
    description: "Designing practical ML-driven features that improve decision-making and user personalization.",
  },
  {
    title: "Performance-First Frontend",
    description: "Crafting fast, fluid interfaces with Next.js and GSAP for measurable UX impact.",
  },
];

export function ExpertiseGrid() {
  return (
    <section className="px-6 py-[22vh] sm:px-10 lg:px-16">
      <p className="text-xs uppercase tracking-[0.18em] text-[#3f7cff]">Expertise</p>
      <h2 className="mt-4 text-[clamp(2rem,4vw,4rem)] font-semibold uppercase leading-[0.95]">
        Outcomes Over Outputs
      </h2>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {EXPERTISE.map((item) => (
          <article key={item.title} className="rounded-2xl border border-white/15 bg-white/[0.02] p-7">
            <h3 className="text-2xl font-semibold tracking-[-0.008em]">{item.title}</h3>
            <p className="mt-4 leading-relaxed text-white/72">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
