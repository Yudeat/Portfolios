"use client";

import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from "react";

export const SECTION_IDS = ["hero", "philosophy", "how-it-works", "work", "contact"] as const;

export type SectionId = (typeof SECTION_IDS)[number];

function isSectionId(s: string): s is SectionId {
  return (SECTION_IDS as readonly string[]).includes(s);
}

const ActiveSectionContext = createContext<SectionId>("hero");

export function useActiveSection() {
  return useContext(ActiveSectionContext);
}

export function ActiveSectionProvider({ children }: PropsWithChildren) {
  const [active, setActive] = useState<SectionId>("hero");

  useEffect(() => {
    const nodes = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (nodes.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting && e.intersectionRatio > 0.1);
        if (visible.length === 0) return;
        visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const id = visible[0].target.id;
        if (isSectionId(id)) setActive(id);
      },
      { threshold: [0, 0.08, 0.14, 0.22, 0.35], rootMargin: "-12% 0px -50% 0px" },
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  const value = useMemo(() => active, [active]);

  return <ActiveSectionContext.Provider value={value}>{children}</ActiveSectionContext.Provider>;
}
