import { Hero } from "@/components/sections/Hero";
import { NarrativeHorizontalScroll } from "@/components/narrative/NarrativeHorizontalScroll";
import { Philosophy } from "@/components/sections/Philosophy";
import { LabPlayground } from "@/components/sections/LabPlayground";
import { TechStackOrbit } from "@/components/sections/TechStackOrbit";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { StackCard } from "@/components/layout/StackCard";

export default function Home() {
  return (
    <main className="min-w-0 overflow-x-clip bg-[#050505]">
      <Hero />

      <StackCard id="philosophy" stackIndex={1} className="bg-[#050505]">
        <Philosophy />
      </StackCard>

      <StackCard id="work" stackIndex={2} className="bg-[#070707]">
        <NarrativeHorizontalScroll />
      </StackCard>

      <StackCard id="lab" stackIndex={3} className="bg-[#050505]">
        <section
          aria-label="Lab playground and tech stack"
          className="pt-[max(10vh,3rem)] pb-[max(8vh,2.5rem)] sm:pt-[14vh] sm:pb-[12vh]"
        >
          <LabPlayground />
          <TechStackOrbit />
        </section>
      </StackCard>

      <StackCard id="contact" stackIndex={4} className="bg-[#050505]">
        <SiteFooter />
      </StackCard>
    </main>
  );
}
