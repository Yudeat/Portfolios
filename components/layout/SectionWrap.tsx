"use client";

import type { ComponentPropsWithoutRef } from "react";
import { PropsWithChildren, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type SectionWrapProps = PropsWithChildren<{
  className?: string;
  start?: string;
  end?: string;
}> &
  Omit<ComponentPropsWithoutRef<"section">, "children" | "className">;

export function SectionWrap({
  children,
  className,
  start = "top 92%",
  end = "top 62%",
  ...props
}: SectionWrapProps) {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!scope.current) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
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
        return () => {};
      });

      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          scope.current,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            ease: "power3.out",
            duration: 0.77,
            scrollTrigger: {
              trigger: scope.current,
              start,
              end,
              toggleActions: "play none none reverse",
            },
          },
        );
        return () => {};
      });

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section ref={scope} className={className} {...props}>
      {children}
    </section>
  );
}
