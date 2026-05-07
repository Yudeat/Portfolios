"use client";

import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Horizontal narrative scrub for md+.
 *
 * UX / perf notes (intentional tradeoffs):
 * - `end` is derived from `scrollWidth - clientWidth` so pin duration tracks real travel. A fixed `+=3000`
 *   (or any magic number) will either strand users in empty scroll or cut the scrub early — that reads as a “dead zone”.
 * - The old full-viewport black overlay ramped in the final 22% of scrub progress. That stacked on top of Lab’s own
 *   SectionWrap fade and read as a black hole. Bridge is now a static bottom gradient only.
 * - Per-card `filter: blur()` on large text blocks is expensive during scrub; blur is limited to the card shell phase.
 * - `invalidateOnRefresh` + ResizeObserver keeps measurements honest when fonts/images shift width.
 */
export function useNarrativeHorizontalScroll(
  containerRef: RefObject<HTMLElement | null>,
  trackRef: RefObject<HTMLElement | null>,
) {
  useGSAP(
    () => {
      const main = containerRef.current;
      const track = trackRef.current;
      if (!main || !track) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(main.querySelectorAll("[data-narrative-card]"));

        const getTravel = () => Math.max(8, track.scrollWidth - main.clientWidth);

        gsap.set(track, { x: 0, force3D: true });

        const horizontalTween = gsap.fromTo(
          track,
          { x: 0 },
          {
            x: () => -getTravel(),
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: main,
              start: "top top",
              end: () => `+=${getTravel()}`,
              scrub: 0.65,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          },
        );

        cards.forEach((card) => {
          const head = card.querySelector(".narrative-card__head");
          const blocks = card.querySelectorAll<HTMLElement>(".narrative-block");

          gsap
            .timeline({
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalTween,
                start: "left 55%",
                end: "right 45%",
                toggleActions: "play none none reverse",
              },
            })
            .fromTo(
              card,
              { scale: 0.94, opacity: 0.55, filter: "blur(6px)" },
              { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.38, ease: "power2.out" },
            )
            .fromTo(
              head,
              { opacity: 0, y: 14 },
              { opacity: 1, y: 0, duration: 0.32, ease: "power2.out" },
              "-=0.22",
            )
            .fromTo(
              blocks,
              { opacity: 0, y: 18 },
              {
                opacity: 1,
                y: 0,
                duration: 0.34,
                stagger: 0.09,
                ease: "power2.out",
              },
              "-=0.18",
            );
        });

        const ro = new ResizeObserver(() => {
          ScrollTrigger.refresh();
        });
        ro.observe(main);
        ro.observe(track);

        const onLoad = () => ScrollTrigger.refresh();
        window.addEventListener("load", onLoad);
        const t = window.setTimeout(() => ScrollTrigger.refresh(), 120);

        return () => {
          ro.disconnect();
          window.removeEventListener("load", onLoad);
          window.clearTimeout(t);
        };
      });

      return () => mm.revert();
    },
    { scope: containerRef },
  );
}
