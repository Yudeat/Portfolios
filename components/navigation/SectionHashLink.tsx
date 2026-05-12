"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { SITE_SCROLL_DURATION, SITE_SCROLL_EASE, useLenis } from "@/components/providers/SmoothScrollProvider";

type SectionHashLinkProps = Omit<ComponentProps<typeof Link>, "onClick" | "scroll"> & {
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  /**
   * Runs before overlay `onClick` (e.g. close menu). Not prefixed with `on*` so it never reaches `<a>`.
   */
  beforeNavigate?: () => void;
};

/** Keys that must never reach `next/link` → `<a>` (React rejects unknown `on*` handlers on DOM). */
const BLOCK_FROM_LINK = new Set(["onNavigateComplete", "onBeforeNavigate"]);

function linkPropsWithoutCustomKeys<T extends Record<string, unknown>>(rest: T): T {
  const out = { ...rest };
  for (const key of BLOCK_FROM_LINK) {
    delete out[key];
  }
  return out;
}

/**
 * In-app section links must go through Lenis so smooth scroll + ScrollTrigger stay in sync.
 * Uses `force: true` so navigation still works while Lenis is temporarily stopped (e.g. split menu closing).
 */
export function SectionHashLink(props: SectionHashLinkProps & { onNavigateComplete?: unknown }) {
  const { href, onClick, beforeNavigate, onNavigateComplete: _legacy, ...rest } = props;
  void _legacy;
  const linkRest = linkPropsWithoutCustomKeys(rest as Record<string, unknown>) as typeof rest;
  const lenis = useLenis();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (typeof href !== "string") {
      onClick?.(e);
      return;
    }

    const { pathname, search } =
      typeof window !== "undefined"
        ? window.location
        : { pathname: "", search: "" };
    const onHome = pathname === "/" || pathname === "";

    if (!onHome || !lenis) {
      onClick?.(e);
      return;
    }

    let hash: string | null = null;
    if (href.startsWith("/#")) {
      const id = href.slice(2);
      if (id) hash = `#${id}`;
    } else if (href === "/") {
      hash = "#hero";
    }

    if (!hash) {
      onClick?.(e);
      return;
    }

    const el = document.querySelector(hash);
    if (!el) {
      onClick?.(e);
      return;
    }

    e.preventDefault();
    beforeNavigate?.();
    onClick?.(e);
    lenis.scrollTo(hash, {
      force: true,
      duration: SITE_SCROLL_DURATION,
      easing: SITE_SCROLL_EASE,
    });
    window.history.replaceState(null, "", `${pathname}${search}${hash}`);
  };

  return <Link href={href} scroll={false} onClick={handleClick} {...linkRest} />;
}
