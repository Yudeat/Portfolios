"use client";

import { PropsWithChildren, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type SectionWrapProps = PropsWithChildren<{
  className?: string;
  start?: string;
  end?: string;
}>;

export function SectionWrap({
  children,
  className,
  start = "top 92%",
  end = "top 62%",
}: SectionWrapProps) {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!scope.current) return;

      gsap.fromTo(
        scope.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          ease: "power3.out",
          duration: 1.1,
          scrollTrigger: {
            trigger: scope.current,
            start,
            end,
            toggleActions: "play none none reverse",
          },
        },
      );
    },
    { scope },
  );

  return (
    <section ref={scope} className={className}>
      {children}
    </section>
  );
}
