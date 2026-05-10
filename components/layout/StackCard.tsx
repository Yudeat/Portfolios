"use client";

import type { PropsWithChildren } from "react";

export type StackCardProps = PropsWithChildren<{
  id?: string;
  /** Larger index stacks visually above earlier cards (sticky + z-index). */
  stackIndex?: number;
  className?: string;
  /** Use false when the block is intentionally shorter than a full viewport card. */
  fillViewport?: boolean;
  /**
   * When set (e.g. long sections inside a sticky stack), replaces the default
   * `min-height` from `fillViewport` so scroll distance matches real content —
   * otherwise the next card can cover this one before inner content is scrolled through.
   */
  minHeightClass?: string;
}>;

const STACK_Z = [
  "",
  "z-[24]",
  "z-[36]",
  "z-[48]",
  "z-[60]",
  "z-[72]",
  "z-[84]",
] as const;

/** Sticky viewport-tall shells that overlap like stacked cards — use opaque backgrounds. */
export function StackCard({
  children,
  id,
  stackIndex = 1,
  className,
  fillViewport = true,
  minHeightClass,
}: StackCardProps) {
  const zClass = STACK_Z[stackIndex] ?? "z-[96]";
  const minH =
    minHeightClass ?? (fillViewport ? "min-h-[100dvh]" : "min-h-[min(100dvh,920px)]");
  return (
    <div
      id={id}
      className={[
        "sticky top-0 w-full shadow-[0_-28px_64px_-18px_rgba(0,0,0,0.55)]",
        minH,
        zClass,
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
