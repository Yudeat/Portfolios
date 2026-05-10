import { Hero } from "@/components/sections/Hero";
import { NarrativeHorizontalScroll } from "@/components/narrative/NarrativeHorizontalScroll";
import { Philosophy } from "@/components/sections/Philosophy";
import { LabPlayground } from "@/components/sections/LabPlayground";
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

      <StackCard id="lab" stackIndex={3} className="scroll-mt-20 bg-[#050505]">
        <section
          aria-label="Lab playground"
          className="pb-[max(14vh,3.5rem)] pt-[max(10vh,3rem)] sm:pb-[max(18vh,4.5rem)] sm:pt-[14vh]"
        >
          <LabPlayground />
        </section>
      </StackCard>

      <StackCard id="contact" stackIndex={4} className="bg-[#020203]">
        <SiteFooter />
      </StackCard>
    </main>
  );
}
