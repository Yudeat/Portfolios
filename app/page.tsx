import { Hero } from "@/components/sections/Hero";
import { SectionWrap } from "@/components/layout/SectionWrap";
import { NarrativeHorizontalScroll } from "@/components/narrative/NarrativeHorizontalScroll";
import { Philosophy } from "@/components/sections/Philosophy";
import { LabPlayground } from "@/components/sections/LabPlayground";
import { TechStackOrbit } from "@/components/sections/TechStackOrbit";
import { SiteFooter } from "@/components/sections/SiteFooter";

export default function Home() {
  return (
    <main className="min-w-0 overflow-x-clip">
      <Hero />
      <div id="philosophy">
        <SectionWrap
          className="py-[max(8vh,3rem)] sm:py-[12vh]"
          start="top bottom"
          end="top 62%"
        >
          <Philosophy />
        </SectionWrap>
      </div>
      <div id="work">
        <NarrativeHorizontalScroll />
      </div>
      <div id="lab" className="bg-[#050505]">
        <SectionWrap
          aria-label="Lab playground and tech stack"
          className="bg-[#050505] pt-[max(10vh,3rem)] pb-[max(8vh,2.5rem)] sm:pt-[14vh] sm:pb-[12vh]"
          start="top bottom"
          end="top 56%"
        >
          <LabPlayground />
          <TechStackOrbit />
        </SectionWrap>
      </div>
      <div id="contact">
        <SiteFooter />
      </div>
    </main>
  );
}
