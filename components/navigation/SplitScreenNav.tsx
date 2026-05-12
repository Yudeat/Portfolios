"use client";

import { useEffect, useId, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import { SectionHashLink } from "@/components/navigation/SectionHashLink";

gsap.registerPlugin(ScrollTrigger);

type NavLinkItem = {
  href: string;
  label: string;
  count?: number;
};

const MENU_LINKS: NavLinkItem[] = [
  { href: "/#hero", label: "Home" },
  { href: "/#philosophy", label: "Philosophy", count: 1 },
  { href: "/#how-it-works", label: "How it works", count: 4 },
  { href: "/#work", label: "Work", count: 3 },
  { href: "/#contact", label: "Contact", count: 1 },
];

export function SplitScreenNav({
  isOpen,
  onClose,
  onOpen,
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}) {
  const lenis = useLenis();

  const titleId = useId();
  const backdropRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const initializedRef = useRef(false);
  const lenisRef = useRef(lenis);
  const wasMenuOpenRef = useRef(false);
  /**
   * When true, finishing the panel close animation must skip an immediate `ScrollTrigger.refresh()`
   * (Hero pin + Lenis settle after ~950ms programmatic scroll — mid-flight refresh snaps back to landing).
   * We refresh once afterward with a bounded delay instead.
   */
  const deferPanelScrollTriggerRefreshRef = useRef(false);
  const deferredPanelRefreshTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  /** Open: focus close control. Closing: yield focus back to Menu so nothing stays focused inside `aria-hidden`. */
  useLayoutEffect(() => {
    const wasOpen = wasMenuOpenRef.current;
    wasMenuOpenRef.current = isOpen;

    if (isOpen) {
      closeBtnRef.current?.focus({ preventScroll: true });
      return;
    }
    if (wasOpen) {
      menuToggleRef.current?.focus({ preventScroll: true });
    }
  }, [isOpen]);

  /** Unmount-only: do not tie to [lenis] — lenis identity changes would wrongly re-enable ST while menu is open. */
  useEffect(() => {
    return () => {
      ScrollTrigger.enable();
      lenisRef.current?.start();
      ScrollTrigger.refresh();
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    const panel = panelRef.current;
    const backdrop = backdropRef.current;
    if (!panel || !backdrop) return;

    const linkEls = gsap.utils.toArray<HTMLElement>(
      panel.querySelectorAll("[data-split-nav-link]"),
    );

    tlRef.current?.kill();
    tlRef.current = null;

    if (!initializedRef.current) {
      gsap.set(panel, { xPercent: 100 });
      gsap.set(backdrop, { opacity: 0 });
      gsap.set(linkEls, { y: 20, opacity: 0 });
      initializedRef.current = true;
      if (!isOpen) return;
    }

    if (isOpen) {
      lenis?.stop();
      ScrollTrigger.disable(false, false);

      gsap.set(linkEls, { y: 20, opacity: 0 });

      const tl = gsap.timeline();
      tl.to(backdrop, { opacity: 1, duration: 0.42, ease: "power2.out" }, 0);
      tl.fromTo(panel, { xPercent: 100 }, { xPercent: 0, duration: 0.52, ease: "power3.out" }, 0.06);
      tl.to(
        linkEls,
        {
          y: 0,
          opacity: 1,
          duration: 0.44,
          stagger: 0.05,
          ease: "power3.out",
        },
        0.12,
      );

      tlRef.current = tl;
      return () => {
        tl.kill();
      };
    }

    const restoreScroll = () => {
      if (deferredPanelRefreshTimeoutRef.current) {
        clearTimeout(deferredPanelRefreshTimeoutRef.current);
        deferredPanelRefreshTimeoutRef.current = null;
      }
      ScrollTrigger.enable();
      lenis?.start();
      const deferRefresh = deferPanelScrollTriggerRefreshRef.current;
      deferPanelScrollTriggerRefreshRef.current = false;
      if (deferRefresh) {
        deferredPanelRefreshTimeoutRef.current = setTimeout(() => {
          deferredPanelRefreshTimeoutRef.current = null;
          ScrollTrigger.refresh();
        }, 1050);
        return;
      }
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      });
    };

    const tl = gsap.timeline({
      onComplete: restoreScroll,
      onInterrupt: restoreScroll,
    });

    tl.to(panel, { xPercent: 100, duration: 0.44, ease: "power3.inOut" }, 0);
    tl.to(backdrop, { opacity: 0, duration: 0.32, ease: "power2.in" }, 0.05);
    tl.set(linkEls, { opacity: 0, y: 16 }, ">");

    tlRef.current = tl;
    return () => {
      tl.kill();
    };
  }, [isOpen, lenis]);

  useEffect(() => {
    return () => {
      if (deferredPanelRefreshTimeoutRef.current) {
        clearTimeout(deferredPanelRefreshTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[8500] min-w-0">
      <button
        ref={menuToggleRef}
        type="button"
        onClick={onOpen}
        className="pointer-events-auto fixed right-[max(1rem,env(safe-area-inset-right))] top-[max(1rem,env(safe-area-inset-top))] z-[1] text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/72 transition-colors hover:text-white sm:right-8 sm:top-4 sm:text-[0.72rem] sm:tracking-[0.22em] md:right-28 lg:right-36 xl:right-40"
      >
        Menu
      </button>

      <div
        className={`absolute inset-0 min-h-0 min-w-0 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <button
          ref={backdropRef}
          type="button"
          aria-label="Close navigation"
          disabled={!isOpen}
          onClick={onClose}
          className="absolute inset-0 z-0 cursor-pointer border-none bg-black/60 backdrop-blur-md transition-[background-color] hover:bg-black/65 motion-reduce:backdrop-blur-sm sm:bg-black/55 sm:hover:bg-black/60"
        />

        <aside
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          {...(!isOpen ? { "aria-hidden": true as const } : {})}
          className="absolute inset-y-0 right-0 z-[2] flex h-full min-h-0 w-full min-w-0 max-w-[100vw] flex-col overflow-y-auto overflow-x-hidden bg-[#050505] px-4 py-6 shadow-[-12px_0_48px_rgba(0,0,0,0.45)] sm:max-w-[min(100vw,26rem)] sm:px-7 sm:py-9 md:max-w-[min(100vw,28rem)] md:px-8 md:py-10 lg:max-w-[min(100vw,34rem)] xl:max-w-[min(100vw,36rem)]"
        >
          <div className="flex shrink-0 items-start justify-between gap-3 border-b border-white/10 pb-5 sm:pb-6">
            <p id={titleId} className="text-[11px] font-medium uppercase tracking-[0.26em] text-white/42">
              Menu
            </p>
            <button
              ref={closeBtnRef}
              type="button"
              aria-label="Close menu"
              onClick={onClose}
              className="flex size-10 shrink-0 items-center justify-center rounded-[10px] border border-white/25 text-lg font-light text-white/90 transition-[background-color,color] hover:bg-white/10 hover:text-white sm:size-11 sm:text-xl"
            >
              ×
            </button>
          </div>

          <nav
            className="flex min-h-0 flex-1 flex-col gap-0 border-b border-white/10 py-8 sm:py-10"
            aria-label="Primary"
          >
            {MENU_LINKS.map((item) => (
              <SectionHashLink
                key={item.href + item.label}
                href={item.href}
                data-split-nav-link
                beforeNavigate={() => {
                  deferPanelScrollTriggerRefreshRef.current = true;
                }}
                onClick={onClose}
                className="split-nav-link group flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1 py-3.5 text-[clamp(1.2rem,5.2vw,2.85rem)] font-semibold uppercase leading-[1.05] tracking-[-0.02em] text-white no-underline sm:gap-3 sm:py-4 sm:leading-none sm:text-[clamp(1.35rem,3.6vw,2.75rem)] md:text-[clamp(1.45rem,3.2vw,2.85rem)]"
              >
                <span>{item.label}</span>
                {typeof item.count === "number" && (
                  <span className="text-[0.68em] font-medium text-white/42 transition-colors group-hover:text-white/72 sm:text-[0.72em]">
                    [{item.count}]
                  </span>
                )}
                <span
                  aria-hidden
                  className="ml-auto hidden shrink-0 text-white/40 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0.5 group-hover:opacity-100 group-hover:text-[#93b4ff] min-[380px]:inline-flex"
                >
                  →
                </span>
              </SectionHashLink>
            ))}
          </nav>

          <section className="border-b border-white/10 py-8 sm:py-10">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/42 sm:text-[11px] sm:tracking-[0.26em]">
              Let&apos;s talk
            </p>
            <Link
              href="mailto:predeep@example.com"
              onClick={onClose}
              className="split-nav-contact group mt-3 block min-w-0 break-words text-[clamp(0.95rem,3.8vw,1.55rem)] font-semibold uppercase tracking-[0.06em] text-white underline decoration-white/35 decoration-2 underline-offset-[0.35em] transition-all hover:text-[#93b4ff] hover:decoration-[#93b4ff] sm:mt-4 sm:tracking-[0.08em] sm:text-[clamp(1.05rem,2.2vw,1.65rem)] sm:underline-offset-8"
            >
              predeep@example.com
              <span className="inline-block pl-2 text-white/50 transition-colors group-hover:text-[#93b4ff]" aria-hidden>
                +
              </span>
            </Link>
          </section>

          <footer className="mt-auto flex shrink-0 flex-col gap-5 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-6 sm:gap-6 sm:pt-8">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/42 sm:text-[11px] sm:tracking-[0.26em]">
                Socials
              </p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-3 sm:mt-4 sm:gap-5">
                {[
                  { href: "https://linkedin.com", label: "LinkedIn" },
                  { href: "https://github.com", label: "GitHub" },
                  { href: "https://instagram.com", label: "Instagram" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold uppercase tracking-[0.12em] text-white/70 underline-offset-4 transition-colors hover:text-white sm:text-sm sm:tracking-[0.14em]"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 text-[10px] uppercase tracking-[0.12em] text-white/52 min-[400px]:flex-row min-[400px]:flex-wrap min-[400px]:items-center min-[400px]:gap-x-4 min-[400px]:gap-y-2 sm:gap-x-6 sm:text-[11px] sm:tracking-[0.14em]">
              <a href="#" className="transition-colors hover:text-white">
                Privacy Policy ↗
              </a>
              <a href="#" className="transition-colors hover:text-white">
                Terms of Service ↗
              </a>
              <span className="ml-auto text-white/40">© {new Date().getFullYear()}</span>
            </div>
          </footer>
        </aside>
      </div>
    </div>
  );
}
