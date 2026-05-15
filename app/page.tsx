import { Hero } from "@/components/sections/Hero";
import { SkillsExpertiseSection } from "@/components/sections/SkillsExpertiseSection";
import { SelectedWorkProjects } from "@/components/sections/SelectedWorkProjects";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { StackCard } from "@/components/layout/StackCard";

export default function Home() {
  return (
    <div className="w-full overflow-x-clip">
      <main className="min-w-0 w-full bg-white">
        <Hero />

      {/** Pull up over hero; min-h-0 avoids a forced 100dvh white gutter below Selected work. */}
      <StackCard
        id="projects"
        stackIndex={1}
        className="scroll-mt-20 bg-white pt-px -mt-[100dvh]"
        minHeightClass="min-h-0"
      >
        <SelectedWorkProjects />
      </StackCard>

      {/** Sticky stack over Selected work (same pull-up pattern as projects over hero). */}
      <StackCard
        id="how-it-works"
        stackIndex={2}
        className="scroll-mt-20 bg-white pt-px -mt-[100dvh]"
        minHeightClass="min-h-0"
      >
        <HowItWorks />
      </StackCard>

      <StackCard
        id="work"
        stackIndex={3}
        sticky={false}
        className="scroll-mt-20 bg-[#060606]"
        minHeightClass="min-h-0"
      >
        <SkillsExpertiseSection />
      </StackCard>

      {/* Inner section uses its own sticky card stack — outer shell must stay `relative` or nested stickies break. */}
      <StackCard id="experience" stackIndex={4} sticky={false} className="scroll-mt-20 bg-white">
        <ExperienceSection />
      </StackCard>

      <StackCard id="contact" stackIndex={5} className="scroll-mt-20 bg-white">
        <SiteFooter />
      </StackCard>
      </main>
    </div>
  );
}
