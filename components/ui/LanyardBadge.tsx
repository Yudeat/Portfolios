"use client";

import type { KeyboardEvent, RefObject } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import gsap from "gsap";
import Draggable from "gsap/Draggable";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(Draggable, useGSAP, ScrollTrigger);

export type LanyardBadgeProps = {
  /** When set, badge is only visible while this element intersects the viewport (e.g. hero `<section>` ref). */
  bindToHero?: RefObject<HTMLElement | null>;
  /** Invoked when the badge is tapped (no drag gesture with Draggable, or plain click fallback). */
  onMenuClick?: () => void;
};

const LANYARD_PROFILE_SRC = "/images/lanyard-profile.png";

/** Badge top-edge attach points inset from corners (fraction of width). */
const BADGE_TOP_INSET_FR = 0.17;

function quadRopeD(ax: number, ay: number, bx: number, by: number) {
  const dx = bx - ax;
  const dy = by - ay;
  const len = Math.hypot(dx, dy) || 1;
  const midX = ax + dx * 0.5;
  const midY = ay + dy * 0.5 + Math.min(len * 0.11, 56);
  const d = `M ${ax.toFixed(2)} ${ay.toFixed(2)} Q ${midX.toFixed(2)} ${midY.toFixed(2)} ${bx.toFixed(2)} ${by.toFixed(2)}`;
  return { d, len };
}

export function LanyardBadge({ bindToHero, onMenuClick }: LanyardBadgeProps = {}) {
  const [mounted, setMounted] = useState(false);
  const [useTapMenu, setUseTapMenu] = useState(false);

  useEffect(() => {
    const mqCoarse = window.matchMedia("(pointer: coarse)");
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setUseTapMenu(mqCoarse.matches || mqReduce.matches);
    };
    sync();
    mqCoarse.addEventListener("change", sync);
    mqReduce.addEventListener("change", sync);
    return () => {
      mqCoarse.removeEventListener("change", sync);
      mqReduce.removeEventListener("change", sync);
    };
  }, []);
  const rootRef = useRef<HTMLElement | null>(null);
  const anchorLeftRef = useRef<HTMLDivElement | null>(null);
  const anchorRightRef = useRef<HTMLDivElement | null>(null);
  const pathLeftRef = useRef<SVGPathElement | null>(null);
  const pathRightRef = useRef<SVGPathElement | null>(null);
  const dragTargetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useGSAP(
    () => {
      if (!mounted) return;
      const root = rootRef.current;
      const anchorL = anchorLeftRef.current;
      const anchorR = anchorRightRef.current;
      const pathL = pathLeftRef.current;
      const pathR = pathRightRef.current;
      const badge = dragTargetRef.current;
      if (!root || !anchorL || !anchorR || !pathL || !pathR || !badge) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const coarse = window.matchMedia("(pointer: coarse)").matches;

      let restLenL = 160;
      let restLenR = 160;
      let snapTween: gsap.core.Tween | null = null;
      let dragInstance: Draggable | null = null;
      let tilt = 0;
      let dragActive = false;

      const measureRestLength = () => {
        const al = anchorL.getBoundingClientRect();
        const ar = anchorR.getBoundingClientRect();
        const b = badge.getBoundingClientRect();
        const inset = Math.max(12, Math.min(b.width * BADGE_TOP_INSET_FR, 52));
        const axL = al.left + al.width / 2;
        const ayL = al.top + al.height / 2;
        const axR = ar.left + ar.width / 2;
        const ayR = ar.top + ar.height / 2;
        const bxL = b.left + inset;
        const bxR = b.right - inset;
        const byTop = b.top;

        const dL = Math.hypot(bxL - axL, byTop - ayL);
        const dR = Math.hypot(bxR - axR, byTop - ayR);
        if (dL > 8) restLenL = dL;
        if (dR > 8) restLenR = dR;
      };

      const drawRope = () => {
        const al = anchorL.getBoundingClientRect();
        const ar = anchorR.getBoundingClientRect();
        const b = badge.getBoundingClientRect();
        const inset = Math.max(12, Math.min(b.width * BADGE_TOP_INSET_FR, 52));
        const byTop = b.top;
        const bxL = b.left + inset;
        const bxR = b.right - inset;

        const axL = al.left + al.width / 2;
        const ayL = al.top + al.height / 2;
        const axR = ar.left + ar.width / 2;
        const ayR = ar.top + ar.height / 2;

        const segL = quadRopeD(axL, ayL, bxL, byTop);
        const segR = quadRopeD(axR, ayR, bxR, byTop);

        const baseW = 2.2;
        const wL = gsap.utils.clamp(0.6, baseW, baseW * (restLenL / Math.max(segL.len, restLenL * 0.72)));
        const wR = gsap.utils.clamp(0.6, baseW, baseW * (restLenR / Math.max(segR.len, restLenR * 0.72)));

        pathL.setAttribute("stroke-width", `${wL}`);
        pathL.setAttribute("d", segL.d);
        pathR.setAttribute("stroke-width", `${wR}`);
        pathR.setAttribute("d", segR.d);
      };

      const ropeTick = () => {
        drawRope();
      };

      gsap.set(badge, { transformOrigin: "50% 0%", force3D: true });

      const onResize = () => {
        if (!dragActive) measureRestLength();
        drawRope();
      };

      window.addEventListener("resize", onResize);

      requestAnimationFrame(() => {
        measureRestLength();
        drawRope();
      });

      if (!coarse && !reduceMotion) {
        dragInstance = Draggable.create(badge, {
          type: "x,y",
          inertia: false,
          allowContextMenu: true,
          ...(onMenuClick
            ? {
                onClick: () => {
                  onMenuClick();
                },
              }
            : {}),
          onPress() {
            snapTween?.kill();
            dragActive = true;
            gsap.ticker.add(ropeTick);
          },
          onDrag() {
            const self = this as Draggable;
            const target = gsap.utils.clamp(self.deltaX * 0.26, -18, 18);
            tilt += (target - tilt) * 0.42;
            gsap.set(badge, { rotation: tilt });
          },
          onRelease() {
            dragActive = false;
            gsap.ticker.remove(ropeTick);
            tilt = 0;
            snapTween?.kill();
            snapTween = gsap.to(badge, {
              x: 0,
              y: 0,
              rotation: 0,
              duration: 0.95,
              ease: "elastic.out(1, 0.34)",
              overwrite: "auto",
              onUpdate: drawRope,
              onComplete: () => {
                dragInstance?.update();
                drawRope();
              },
            });
          },
        })[0];
      }

      let visibilitySt: ScrollTrigger | undefined;
      let visRaf = 0;

      const setupHeroVisibility = () => {
        const heroEl = bindToHero?.current;
        if (bindToHero && heroEl && root) {
          visibilitySt?.kill();
          visibilitySt = ScrollTrigger.create({
            trigger: heroEl,
            start: "top bottom",
            end: "bottom top",
            onToggle: (self) => {
              gsap.to(root, {
                autoAlpha: self.isActive ? 1 : 0,
                duration: 0.28,
                ease: "power2.out",
                overwrite: "auto",
              });
            },
          });
          ScrollTrigger.refresh();
          gsap.set(root, { autoAlpha: visibilitySt.isActive ? 1 : 0 });
          requestAnimationFrame(() => {
            measureRestLength();
            drawRope();
          });
          return true;
        }
        return false;
      };

      if (bindToHero && !setupHeroVisibility()) {
        visRaf = requestAnimationFrame(setupHeroVisibility);
      }

      return () => {
        cancelAnimationFrame(visRaf);
        gsap.ticker.remove(ropeTick);
        snapTween?.kill();
        dragInstance?.kill();
        window.removeEventListener("resize", onResize);
        visibilitySt?.kill();
      };
    },
    { scope: rootRef, dependencies: [mounted, bindToHero, onMenuClick], revertOnUpdate: true },
  );

  const tree = (
    <aside
      ref={rootRef}
      className="pointer-events-none fixed inset-0 z-[8000] overflow-visible"
      aria-label="Predeep Chaudary, Full-Stack Developer"
    >
      {/* Viewport top-left / top-right hooks → badge top edge (left & right insets). */}
      <div
        ref={anchorLeftRef}
        aria-hidden
        className="pointer-events-none fixed right-[100px] top-3 size-px select-none opacity-0 sm:right-7 lg:right-[100px]"
      />
      <div
        ref={anchorRightRef}
        aria-hidden
        className="pointer-events-none fixed right-3 top-3 size-px select-none opacity-0 sm:right-[100px] lg:right-[100px]"
      />

      <svg className="pointer-events-none fixed inset-0 z-[7999] h-full w-full" aria-hidden>
        <path
          ref={pathLeftRef}
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          ref={pathRightRef}
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="pointer-events-none fixed right-[100px] top-3 z-[8001] flex flex-col items-end sm:right-7 lg:right-8">
        <div
          ref={dragTargetRef}
          onClick={
            useTapMenu && onMenuClick
              ? () => {
                  onMenuClick();
                }
              : undefined
          }
          {...(onMenuClick
            ? {
                role: "button",
                tabIndex: 0,
                "aria-label": "Open site menu (drag badge to reposition)",
                onKeyDown: (e: KeyboardEvent<HTMLDivElement>) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onMenuClick();
                  }
                },
              }
            : {})}
          className="group pointer-events-auto mt-[132px] flex w-[min(300px,58vw)] max-w-[min(340px,90vw)] cursor-grab touch-none flex-col overflow-hidden rounded-xl border border-white/35 bg-[#14161c]/95 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_28px_56px_rgba(0,0,0,0.65)] will-change-transform ring-1 ring-white/10 backdrop-blur-sm sm:mt-[140px] sm:w-[min(320px,44vw)] sm:max-w-[360px] active:cursor-grabbing motion-reduce:cursor-default [&:active]:select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3f7cff]/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
        >
          <div className="relative aspect-[1/1.59] w-full overflow-hidden bg-[#5c5f66]">
            <Image
              src={LANYARD_PROFILE_SRC}
              alt=""
              fill
              sizes="(max-width: 640px) 58vw, 360px"
              className="object-cover object-[center_18%] grayscale transition-[filter] duration-[480ms] ease-out group-hover:grayscale-0 motion-reduce:grayscale-0 motion-reduce:transition-none"
              priority
              draggable={false}
            />
          </div>
          <div className="border-t border-white/15 px-4 py-3 text-center">
            <p className="text-[11px] font-medium uppercase leading-snug tracking-[0.14em] text-white/65">
              Predeep Chaudary
            </p>
            <p className="mt-1 text-[12px] leading-snug text-white/88">
              Full-Stack Developer, Data Analyst, ML Engineer
            </p>
          </div>
        </div>
      </div>
    </aside>
  );

  if (!mounted || typeof document === "undefined") return null;
  return createPortal(tree, document.body);
}
