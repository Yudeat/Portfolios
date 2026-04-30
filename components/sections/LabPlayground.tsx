import { LensHeading } from "@/components/ui/LensHeading";

const LAB_ITEMS = [
  {
    title: "SentinelWild",
    summary: "Wildlife early-warning network combining edge sensors and predictive alerts for communities near migration routes.",
  },
  {
    title: "Aether",
    summary: "AI-driven productivity wave frequencies that adapt work sessions to focus, recovery, and cognitive load.",
  },
  {
    title: "RapidScope",
    summary: "Realtime dashboard experiments for decision teams needing anomaly signals in under 2 seconds.",
  },
  {
    title: "PulseGrid",
    summary: "Hackathon prototype for multi-tenant event ingestion and visual trace playback.",
  },
];

export function LabPlayground() {
  return (
    <section className="px-6 py-[22vh] sm:px-10 lg:px-16">
      <p className="text-xs uppercase tracking-[0.16em] text-[#3f7cff]">Lab / Playground</p>
      <LensHeading
        text="Rapid-Fire Experiments."
        className="mt-4 text-[clamp(2rem,4.3vw,4.4rem)] font-semibold leading-[0.98] tracking-[-0.01em]"
      />

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {LAB_ITEMS.map((item) => (
          <article
            key={item.title}
            data-cursor="expand"
            className="rounded-3xl border border-white/15 bg-white/[0.02] p-7 shadow-[0_0_70px_rgba(20,34,88,0.18)]"
          >
            <h3 className="text-2xl font-semibold tracking-[-0.01em]">{item.title}</h3>
            <p className="mt-3 leading-relaxed text-white/72">{item.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
