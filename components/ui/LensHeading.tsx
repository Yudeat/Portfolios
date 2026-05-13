"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

type LensHeadingProps = {
  text: string;
  className?: string;
  /** When the heading animation should start relative to the viewport (default was too late vs hero pin). */
  scrollTriggerStart?: string;
};

export function LensHeading({ text, className, scrollTriggerStart = "top 82%" }: LensHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!headingRef.current) return;

    const split = new SplitText(headingRef.current, {
      type: "chars",
      charsClass: "split-char",
    });

    split.chars.forEach((char) => {
      const wrapper = document.createElement("span");
      wrapper.className = "split-mask";
      char.parentNode?.insertBefore(wrapper, char);
      wrapper.appendChild(char);
    });

    gsap.from(split.chars, {
      yPercent: 110,
      opacity: 0.2,
      filter: "blur(8px)",
      stagger: 0.015,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: headingRef.current,
        start: scrollTriggerStart,
        toggleActions: "play none none reverse",
      },
    });

    return () => split.revert();
  }, [scrollTriggerStart]);

  return (
    <h2 ref={headingRef} className={className}>
      {text}
    </h2>
  );
}
