import { LensHeading } from "@/components/ui/LensHeading";

export function Philosophy() {
  return (
    <section className="px-6 py-[24vh] sm:px-10 lg:px-16">
      <p className="text-xs uppercase tracking-[0.16em] text-[#3f7cff]">Philosophy</p>
      <LensHeading
        text="Product Thinking with Lens-Focused Clarity."
        className="mt-4 max-w-4xl text-[clamp(2rem,4.8vw,4.8rem)] font-semibold leading-[0.98] tracking-[-0.01em]"
      />
      <p className="mt-8 max-w-3xl text-[clamp(1.05rem,1.35vw,1.4rem)] leading-relaxed text-white/72">
        I bridge the gap between raw code and emotional sincerity through product thinking. Every interface is designed
        as a narrative system: technically rigorous at the architecture layer, and deeply human in the moments that
        guide attention, trust, and momentum.
      </p>
    </section>
  );
}
