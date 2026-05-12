"use client";

import { SectionHashLink } from "@/components/navigation/SectionHashLink";
import type { ReactNode } from "react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useActiveSection } from "@/components/providers/ActiveSectionProvider";
import { useNavMenu } from "@/components/providers/NavMenuProvider";

const DOCK_POS_STORAGE = "portfolio-dock-pos-v1";
const DRAG_THRESHOLD_PX = 6;

type DockItem = {
  id: string;
  href: string;
  label: string;
  icon: (props: { className?: string }) => ReactNode;
};

function IconHome({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 10.5L12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPhilosophy({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3a7 7 0 0 0-2 13.74V20h4v-3.26A7 7 0 0 0 12 3Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 20h6" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
    </svg>
  );
}

function IconWork({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.35" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.35" />
    </svg>
  );
}

function IconHowItWorks({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 5h6v6H5V5Zm8 0h6v6h-6V5ZM5 13h6v6H5v-6Zm8 0h6v6h-6v-6Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconContact({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.35" />
      <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconPlus({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
    </svg>
  );
}

function IconClose({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
    </svg>
  );
}

const DOCK_ITEMS: DockItem[] = [
  { id: "hero", href: "/#hero", label: "Home", icon: IconHome },
  { id: "philosophy", href: "/#philosophy", label: "Philosophy", icon: IconPhilosophy },
  { id: "how-it-works", href: "/#how-it-works", label: "How it works", icon: IconHowItWorks },
  { id: "work", href: "/#work", label: "Work", icon: IconWork },
  { id: "contact", href: "/#contact", label: "Contact", icon: IconContact },
];

const ORBIT_ANGLES = [-70, -35, 0, 35, 70] as const;
const ORBIT_RADIUS_PX = 96;

function clampDockPos(left: number, bottom: number, panelW: number, panelH: number) {
  const pad = 8;
  const maxL = Math.max(pad, window.innerWidth - panelW - pad);
  const maxB = Math.max(pad, window.innerHeight - panelH - pad);
  return {
    left: Math.min(maxL, Math.max(pad, left)),
    bottom: Math.min(maxB, Math.max(pad, bottom)),
  };
}

function readStoredDockPos(): { left: number; bottom: number } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(DOCK_POS_STORAGE);
    if (!raw) return null;
    const p = JSON.parse(raw) as { left?: number; bottom?: number };
    if (typeof p.left === "number" && typeof p.bottom === "number") return { left: p.left, bottom: p.bottom };
  } catch {
    /* ignore */
  }
  return null;
}

function SatelliteShell({
  angleDeg,
  expanded,
  index,
  children,
}: {
  angleDeg: number;
  expanded: boolean;
  index: number;
  children: ReactNode;
}) {
  const openDelay = expanded ? index * 45 : (DOCK_ITEMS.length - 1 - index) * 28;
  return (
    <div
      className="pointer-events-none absolute bottom-0 left-1/2 flex w-0 origin-bottom justify-center transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:duration-150"
      style={{
        height: `${ORBIT_RADIUS_PX}px`,
        transform: `translateX(-50%) rotate(${angleDeg}deg) scaleY(${expanded ? 1 : 0})`,
        opacity: expanded ? 1 : 0,
        transitionDelay: `${openDelay}ms`,
      }}
    >
      <div
        className={`absolute bottom-full left-1/2 mb-2 -translate-x-1/2 ${expanded ? "pointer-events-auto" : "pointer-events-none"}`}
        style={{ transform: `rotate(${-angleDeg}deg)` }}
        {...(!expanded ? { "aria-hidden": true } : {})}
      >
        {children}
      </div>
    </div>
  );
}

function SatelliteButton({
  item,
  expanded,
  isActive,
  onPick,
}: {
  item: DockItem;
  expanded: boolean;
  isActive: boolean;
  onPick: () => void;
}) {
  const Icon = item.icon;
  return (
    <SectionHashLink
      href={item.href}
      tabIndex={expanded ? undefined : -1}
      onClick={onPick}
      aria-current={isActive ? "page" : undefined}
      className={`group relative flex size-11 items-center justify-center rounded-full border bg-[#0a0a0c]/90 outline-none backdrop-blur-xl transition-[transform,colors,box-shadow] duration-200 hover:scale-105 focus-visible:ring-2 focus-visible:ring-[#3f7cff]/55 motion-reduce:transform-none sm:size-12 ${
        isActive
          ? "border-[#93b4ff]/45 text-[#93b4ff] shadow-[0_0_0_1px_rgba(147,180,255,0.35),0_0_32px_rgba(63,124,255,0.35),inset_0_1px_0_rgba(255,255,255,0.12)]"
          : "border-white/[0.12] text-white/72 shadow-[0_0_0_1px_rgba(147,180,255,0.12),0_0_28px_rgba(63,124,255,0.2),inset_0_1px_0_rgba(255,255,255,0.1)] hover:border-[#93b4ff]/35 hover:text-[#93b4ff]"
      }`}
      aria-label={item.label}
    >
      <span
        className="absolute inset-0 -z-10 rounded-full bg-gradient-to-b from-white/[0.08] to-transparent opacity-0 transition-opacity group-hover:opacity-100"
        aria-hidden
      />
      <Icon className="relative shrink-0 drop-shadow-[0_0_10px_rgba(63,124,255,0.35)]" />
    </SectionHashLink>
  );
}

export function DockMenu() {
  const { close: closeSplitNav, isOpen: splitNavOpen } = useNavMenu();
  const activeSection = useActiveSection();
  const [expanded, setExpanded] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ left: number; bottom: number } | null>(null);

  const dragRef = useRef<{
    pointerId: number;
    startClientX: number;
    startClientY: number;
    startLeft: number;
    startBottom: number;
    dragging: boolean;
  } | null>(null);
  const lastDragPosRef = useRef<{ left: number; bottom: number } | null>(null);
  const suppressHubClickRef = useRef(false);

  const collapse = useCallback(() => setExpanded(false), []);

  const onPick = useCallback(() => {
    closeSplitNav();
    collapse();
  }, [closeSplitNav, collapse]);

  const syncPosToPanel = useCallback(() => {
    const el = panelRef.current;
    if (!el) return;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    setPos((prev) => {
      if (!prev) {
        return {
          left: (window.innerWidth - w) / 2,
          bottom: Math.max(12, Math.min(96, Math.round(window.innerHeight * 0.04))),
        };
      }
      return clampDockPos(prev.left, prev.bottom, w, h);
    });
  }, []);

  useLayoutEffect(() => {
    const stored = readStoredDockPos();
    const el = panelRef.current;
    if (!el) return;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    if (stored) {
      setPos(clampDockPos(stored.left, stored.bottom, w, h));
      return;
    }
    setPos({
      left: (window.innerWidth - w) / 2,
      bottom: Math.max(12, Math.min(96, Math.round(window.innerHeight * 0.04))),
    });
  }, []);

  useEffect(() => {
    syncPosToPanel();
  }, [expanded, syncPosToPanel]);

  useEffect(() => {
    const onResize = () => syncPosToPanel();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [syncPosToPanel]);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") collapse();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded, collapse]);

  const onHubPointerDown = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      if (e.button !== 0 || !pos || !panelRef.current) return;
      suppressHubClickRef.current = false;
      dragRef.current = {
        pointerId: e.pointerId,
        startClientX: e.clientX,
        startClientY: e.clientY,
        startLeft: pos.left,
        startBottom: pos.bottom,
        dragging: false,
      };
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    [pos],
  );

  const onHubPointerMove = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    const d = dragRef.current;
    if (!d || e.pointerId !== d.pointerId || !panelRef.current) return;
    const dx = e.clientX - d.startClientX;
    const dy = e.clientY - d.startClientY;
    if (!d.dragging && Math.hypot(dx, dy) > DRAG_THRESHOLD_PX) {
      d.dragging = true;
    }
    if (!d.dragging) return;
    const el = panelRef.current;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    const nextLeft = d.startLeft + dx;
    const nextBottom = d.startBottom - dy;
    const clamped = clampDockPos(nextLeft, nextBottom, w, h);
    lastDragPosRef.current = clamped;
    setPos(clamped);
  }, []);

  const onHubPointerUp = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    const d = dragRef.current;
    if (!d || e.pointerId !== d.pointerId) return;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    const wasDragging = d.dragging;
    dragRef.current = null;
    if (wasDragging) {
      suppressHubClickRef.current = true;
      const p = lastDragPosRef.current;
      if (p) {
        try {
          localStorage.setItem(DOCK_POS_STORAGE, JSON.stringify(p));
        } catch {
          /* ignore */
        }
      }
    }
  }, []);

  if (splitNavOpen) return null;

  return (
    <>
      {expanded ? (
        <button
          type="button"
          aria-label="Close radial dock"
          className="fixed inset-0 z-[5990] cursor-default border-none bg-black/35 backdrop-blur-[2px] motion-reduce:backdrop-blur-none"
          onClick={collapse}
        />
      ) : null}

      <div
        ref={panelRef}
        className="fixed z-[6000] flex w-[min(100vw-24px,380px)] flex-col items-stretch"
        style={
          pos
            ? {
                left: pos.left,
                bottom: pos.bottom,
              }
            : {
                left: "50%",
                bottom: "max(0.65rem, env(safe-area-inset-bottom, 0px))",
                transform: "translateX(-50%)",
              }
        }
      >
        <div className="relative flex w-full flex-col items-center">
          <div
            className={`pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[min(52vw,220px)] w-[min(92vw,340px)] -translate-x-1/2 -translate-y-[20%] rounded-full bg-[radial-gradient(ellipse_at_50%_80%,rgba(63,124,255,0.38),transparent_65%)] blur-2xl transition-opacity duration-300 motion-reduce:opacity-50 ${
              expanded ? "opacity-100" : "opacity-70"
            }`}
            aria-hidden
          />

          <div className="relative mb-1 flex h-[min(38vh,200px)] w-full min-w-[200px] items-end justify-center">
            {DOCK_ITEMS.map((item, i) => (
              <SatelliteShell key={item.id} angleDeg={ORBIT_ANGLES[i]} expanded={expanded} index={i}>
                <SatelliteButton
                  item={item}
                  expanded={expanded}
                  isActive={activeSection === item.id}
                  onPick={onPick}
                />
              </SatelliteShell>
            ))}

            <div className="absolute bottom-0 left-1/2 z-20 -translate-x-1/2">
              <div
                className="absolute -inset-4 -z-10 rounded-full bg-[radial-gradient(circle_at_50%_100%,rgba(63,124,255,0.45),transparent_70%)] opacity-90 blur-xl motion-reduce:opacity-50"
                aria-hidden
              />
              <div
                className="absolute -inset-2 -z-10 rounded-full bg-gradient-to-b from-white/[0.22] via-[#93b4ff]/[0.14] to-white/[0.06] p-px shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_0_36px_rgba(63,124,255,0.25)]"
                aria-hidden
              >
                <div className="h-full w-full rounded-full bg-[#070708]/[0.9] backdrop-blur-2xl" />
              </div>
              <div className="relative rounded-full border border-white/[0.1] bg-gradient-to-b from-white/[0.1] to-transparent p-px shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
                <button
                  type="button"
                  ref={(node) => {
                    if (node) node.setAttribute("aria-expanded", expanded ? "true" : "false");
                  }}
                  onClick={() => {
                    if (suppressHubClickRef.current) {
                      suppressHubClickRef.current = false;
                      return;
                    }
                    setExpanded((v) => !v);
                  }}
                  onPointerDown={onHubPointerDown}
                  onPointerMove={onHubPointerMove}
                  onPointerUp={onHubPointerUp}
                  onPointerCancel={onHubPointerUp}
                  aria-label={
                    expanded
                      ? "Close section dock"
                      : `Open section dock (current: ${activeSection}). Drag to reposition.`
                  }
                  className="group relative flex size-[3.35rem] cursor-grab touch-none items-center justify-center rounded-full text-white/78 outline-none transition-[transform,colors,box-shadow] duration-200 hover:scale-105 hover:text-[#93b4ff] focus-visible:ring-2 focus-visible:ring-[#3f7cff]/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] active:cursor-grabbing motion-reduce:transform-none sm:size-[3.65rem]"
                >
                  <span
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-to-b from-[#3f7cff]/22 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                    aria-hidden
                  />
                  <span className="relative transition-opacity duration-200" aria-hidden>
                    {expanded ? (
                      <IconClose className="shrink-0 drop-shadow-[0_0_14px_rgba(63,124,255,0.45)]" />
                    ) : (
                      <IconPlus className="shrink-0 drop-shadow-[0_0_14px_rgba(63,124,255,0.45)]" />
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
