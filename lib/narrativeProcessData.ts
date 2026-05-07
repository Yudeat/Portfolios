export type NarrativeProject = {
  id: string;
  title: string;
  challenge: string;
  strategy: string;
  result: string;
};

export const NARRATIVE_PROJECTS: NarrativeProject[] = [
  {
    id: "01 - Exile (SaaS)",
    title: "Student Guidance Platform",
    challenge:
      "Students struggled with fragmented mentorship flows and unclear progression metrics across applications.",
    strategy:
      "Designed a modular guidance architecture with role-specific dashboards and adaptive journey checkpoints.",
    result: "Unified product flow improved onboarding completion by 31% and reduced drop-offs in key decision steps.",
  },
  {
    id: "02 - Kachu Kart",
    title: "Wholesale E-commerce Engine",
    challenge:
      "Traditional wholesale journeys felt static and operational tooling could not scale with SKU and vendor complexity.",
    strategy:
      "Built a Three.js hero slider experience and implemented advanced admin slices for pricing tiers and inventory logic.",
    result: "Delivered a faster, immersive buying flow with stronger admin throughput for wholesale operations.",
  },
  {
    id: "03 - Steel Wood Nepal",
    title: "Corporate Information Platform",
    challenge:
      "The brand lacked trust-signaling interaction and had no structured way to handle professional service agreements.",
    strategy:
      "Created custom GSAP narrative transitions and integrated agreement workflows inside service touchpoints.",
    result: "The site established stronger enterprise credibility and streamlined service inquiry qualification.",
  },
];
