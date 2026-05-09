"use client";

import type { PropsWithChildren } from "react";

export type StackCardProps = PropsWithChildren<{
  id?: string;
  /** Larger index stacks visually above earlier cards (sticky + z-index). */
  stackIndex?: number;
  className?: string;
  /** Use false when the block is intentionally shorter than a full viewport card. */
  fillViewport?: boolean;
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
export function StackCard({ children, id, stackIndex = 1, className, fillViewport = true }: StackCardProps) {
  const zClass = STACK_Z[stackIndex] ?? "z-[96]";
  return (
    <div
      id={id}
      className={[
        "sticky top-0 w-full overflow-x-clip shadow-[0_-28px_64px_-18px_rgba(0,0,0,0.55)]",
        fillViewport ? "min-h-[100dvh]" : "min-h-[min(100dvh,920px)]",
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
