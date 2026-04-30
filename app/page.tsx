import { Hero } from "@/components/sections/Hero";
import { SectionWrap } from "@/components/layout/SectionWrap";
import { ProcessPinned } from "@/components/sections/ProcessPinned";
import { Philosophy } from "@/components/sections/Philosophy";
import { LabPlayground } from "@/components/sections/LabPlayground";
import { TechStackOrbit } from "@/components/sections/TechStackOrbit";
import { SiteFooter } from "@/components/sections/SiteFooter";

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <Hero />
      <SectionWrap className="py-[12vh]" start="top bottom" end="top 62%">
        <Philosophy />
      </SectionWrap>
      <div id="work">
        <ProcessPinned />
      </div>
      <SectionWrap className="py-[14vh]" start="top bottom" end="top 58%">
        <LabPlayground />
      </SectionWrap>
      <SectionWrap className="py-[12vh]" start="top bottom" end="top 60%">
        <TechStackOrbit />
      </SectionWrap>
      <div id="contact">
        <SiteFooter />
      </div>
    </main>
  );
}
