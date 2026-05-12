import { Hero } from "@/components/sections/Hero";
import { NarrativeHorizontalScroll } from "@/components/narrative/NarrativeHorizontalScroll";
import { Philosophy } from "@/components/sections/Philosophy";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { StackCard } from "@/components/layout/StackCard";

export default function Home() {
  return (
    <main className="min-w-0 overflow-x-clip bg-[#050505]">
      <Hero />

      <StackCard id="philosophy" stackIndex={1} className="scroll-mt-20 bg-[#050505]">
        <Philosophy />
      </StackCard>

      <StackCard id="work" stackIndex={2} className="scroll-mt-20 bg-[#070707]">
        <NarrativeHorizontalScroll />
      </StackCard>

      <StackCard id="contact" stackIndex={3} className="bg-white">
        <SiteFooter />
      </StackCard>
    </main>
  );
}
