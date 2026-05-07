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
    <div className="relative overflow-hidden px-4 pb-0 pt-[max(12vh,4rem)] sm:px-10 sm:pt-[22vh] lg:px-16">
      <div
        className="pointer-events-none absolute inset-0 -z-20 bg-[url('/images/lab-playground-bg.png')] bg-cover bg-center bg-no-repeat"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#050505]/65 via-[#050505]/45 to-[#050505]/72"
        aria-hidden
      />

      <div className="relative">
        <p className="text-xs uppercase tracking-[0.16em] text-[#93b4ff]">Lab / Playground</p>
        <LensHeading
          text="Rapid-Fire Experiments."
          className="mt-4 text-[clamp(2rem,4.3vw,4.4rem)] font-semibold leading-[0.98] tracking-[-0.01em] text-white"
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {LAB_ITEMS.map((item) => (
            <article
              key={item.title}
              data-cursor="expand"
              className="rounded-3xl border border-white/20 bg-[#0a0a0c]/72 p-5 shadow-[0_0_70px_rgba(0,0,0,0.45)] backdrop-blur-[2px] sm:p-7"
            >
              <h3 className="text-xl font-semibold tracking-[-0.01em] sm:text-2xl">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-white/80">{item.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
