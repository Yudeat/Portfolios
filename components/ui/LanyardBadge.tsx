"use client";

import type { KeyboardEvent } from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import Draggable from "gsap/Draggable";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(Draggable, ScrollTrigger);

export type LanyardBadgeProps = {
  onMenuClick?: () => void;
};

const LANYARD_PROFILE_SRC = "/images/lanyard-profile.png";

/** Badge top-edge attach points inset from corners (fraction of width). */
const BADGE_TOP_INSET_FR = 0.17;

function cx(...parts: (string | boolean | undefined | null)[]): string {
  return parts.filter(Boolean).join(" ");
}

function quadRopeD(ax: number, ay: number, bx: number, by: number) {
  const dx = bx - ax;
  const dy = by - ay;
  const len = Math.hypot(dx, dy) || 1;
  const midX = ax + dx * 0.5;
  const midY = ay + dy * 0.5 + Math.min(len * 0.11, 56);
  const d = `M ${ax.toFixed(2)} ${ay.toFixed(2)} Q ${midX.toFixed(2)} ${midY.toFixed(2)} ${bx.toFixed(2)} ${by.toFixed(2)}`;
  return { d, len };
}

/** In-hero ID badge + rope lines; renders inline (relative to parent). Visibility is gated by Hero’s innovation container. */
export function LanyardBadge({ onMenuClick }: LanyardBadgeProps = {}) {
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
  const onMenuClickRef = useRef(onMenuClick);

  useEffect(() => {
    onMenuClickRef.current = onMenuClick;
  }, [onMenuClick]);

  /** Map viewport rects to coords relative to `rootRef` layout box */
  function rectsRelativeToRoot() {
    const root = rootRef.current;
    if (!root) return null;
    const rr = root.getBoundingClientRect();
    if (!rr.width && !rr.height) return null;
    const dx = rr.left;
    const dy = rr.top;
    return {
      rr,
      toLocal: (b: DOMRect) => ({
        left: b.left - dx,
        top: b.top - dy,
        right: b.right - dx,
        bottom: b.bottom - dy,
        width: b.width,
        height: b.height,
      }),
    };
  }

  useLayoutEffect(() => {
    const root = rootRef.current;
    const anchorL = anchorLeftRef.current;
    const anchorR = anchorRightRef.current;
    const pathL = pathLeftRef.current;
    const pathR = pathRightRef.current;
    const badge = dragTargetRef.current;
    if (!root || !anchorL || !anchorR || !pathL || !pathR || !badge) return;

    let restLenL = 160;
    let restLenR = 160;
    let snapTween: gsap.core.Tween | null = null;
    let dragInstance: Draggable | undefined;
    let tilt = 0;
    let dragActive = false;

    const measureRestLength = () => {
      const ctx = rectsRelativeToRoot();
      if (!ctx) return;

      const { toLocal } = ctx;
      if (anchorL.offsetParent === null) return;

      const al = toLocal(anchorL.getBoundingClientRect());
      const ar = toLocal(anchorR.getBoundingClientRect());
      const b = toLocal(badge.getBoundingClientRect());
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
      const ctx = rectsRelativeToRoot();
      if (!ctx) return;
      const { toLocal } = ctx;

      if (anchorL.offsetParent === null || window.matchMedia("(max-width: 639px)").matches) {
        pathL.setAttribute("d", "");
        pathR.setAttribute("d", "");
        return;
      }

      const al = toLocal(anchorL.getBoundingClientRect());
      const ar = toLocal(anchorR.getBoundingClientRect());
      const b = toLocal(badge.getBoundingClientRect());
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

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    const onResize = () => {
      if (!dragActive) measureRestLength();
      drawRope();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", onResize);

    const ro = new ResizeObserver(() => {
      if (!dragActive) measureRestLength();
      drawRope();
      ScrollTrigger.refresh();
    });
    ro.observe(root);

    const rafBoot = requestAnimationFrame(() => {
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
                onMenuClickRef.current?.();
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
      })[0] as Draggable | undefined;
    }

    return () => {
      cancelAnimationFrame(rafBoot);
      gsap.ticker.remove(ropeTick);
      snapTween?.kill();
      dragInstance?.kill();
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, [onMenuClick]);

  return (
    <aside
      ref={rootRef}
      className="pointer-events-none relative h-full w-full overflow-visible select-none"
      aria-label="Predeep Chaudary, Full-Stack Developer"
    >
      <div
        ref={anchorLeftRef}
        aria-hidden
        className="pointer-events-none absolute left-[10%] top-3 hidden size-px select-none opacity-0 sm:block lg:left-[14%]"
      />
      <div
        ref={anchorRightRef}
        aria-hidden
        className="pointer-events-none absolute right-[10%] top-3 hidden size-px select-none opacity-0 sm:block lg:right-[14%]"
      />

      <svg className="pointer-events-none absolute inset-0 z-[1] hidden h-full w-full sm:block" aria-hidden>
        <g stroke="rgba(255,255,255,0.4)" strokeLinecap="round" strokeLinejoin="round">
          <path ref={pathLeftRef} fill="none" />
          <path ref={pathRightRef} fill="none" />
        </g>
      </svg>

      <div className="pointer-events-none absolute inset-0 z-[2] flex items-end justify-end pb-0 pr-0">
        <div
          ref={dragTargetRef}
          onClick={
            useTapMenu && onMenuClick
              ? () => {
                  onMenuClickRef.current?.();
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
                    onMenuClickRef.current?.();
                  }
                },
              }
            : {})}
          className={cx(
            "group pointer-events-auto flex w-full max-w-[min(340px,90vw)] cursor-grab touch-none flex-col overflow-hidden rounded-xl border border-white/35 bg-white/20 shadow-[0_28px_56px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.4)] will-change-transform backdrop-blur-md active:cursor-grabbing motion-reduce:cursor-default [&:active]:select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/85 focus-visible:ring-offset-2 focus-visible:ring-offset-[#E32119] sm:max-w-[360px]",
          )}
        >
          <div className="relative aspect-[1/1.59] w-full overflow-hidden bg-white/10">
            <Image
              src={LANYARD_PROFILE_SRC}
              alt=""
              fill
              sizes="(max-width: 640px) 90vw, 360px"
              className="object-cover object-[center_18%] grayscale transition-[filter] duration-[480ms] ease-out group-hover:grayscale-0 motion-reduce:grayscale-0 motion-reduce:transition-none"
              priority
              draggable={false}
            />
          </div>
          <div className="border-t border-white/25 px-4 py-3 text-center">
            <p className="text-[11px] font-medium uppercase leading-snug tracking-[0.14em] text-white/80">
              Predeep Chaudary
            </p>
            <p className="mt-1 text-[12px] leading-snug text-white/92">
              Full-Stack Developer, Data Analyst, ML Engineer
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
