"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function InteractiveCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cursorRef.current || window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    const moveX = gsap.quickTo(cursor, "x", { duration: 0.22, ease: "power3.out" });
    const moveY = gsap.quickTo(cursor, "y", { duration: 0.22, ease: "power3.out" });

    const handleMove = (event: MouseEvent) => {
      moveX(event.clientX);
      moveY(event.clientY);
    };

    const handleOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const expandTarget = target?.closest("[data-cursor='expand']");

      gsap.to(cursor, {
        scale: expandTarget ? 2.25 : 1,
        opacity: expandTarget ? 0.95 : 0.75,
        duration: 0.28,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleOver);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[999] hidden -translate-x-1/2 -translate-y-1/2 md:block"
      aria-hidden="true"
    >
      <svg width="36" height="36" viewBox="0 0 36 36" className="drop-shadow-[0_0_18px_rgba(63,124,255,0.35)]">
        <circle cx="18" cy="18" r="11" fill="none" stroke="rgba(245,247,255,0.9)" strokeWidth="1.2" />
        <circle cx="18" cy="18" r="4" fill="rgba(63,124,255,0.75)" />
      </svg>
    </div>
  );
}
