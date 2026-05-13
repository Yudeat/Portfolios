"use client";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export const SITE_SCROLL_DURATION = 1.18;
export const SITE_SCROLL_EASE = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function SmoothScrollProvider({ children }: PropsWithChildren) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const instance = new Lenis({
      smoothWheel: true,
      /** Lets wheel chain to real overflow regions (hero about panel, project slides, etc.). */
      allowNestedScroll: true,
      /** Slightly higher lerp + wheelMultiplier = less “heavy” travel (esp. long hero pin). */
      lerp: 0.078,
      wheelMultiplier: 0.92,
      /** Smooth vertical momentum on touch devices while staying synced with GSAP. */
      syncTouch: true,
      syncTouchLerp: 0.085,
      touchMultiplier: 0.95,
    });

    const onScroll = () => ScrollTrigger.update();
    instance.on("scroll", onScroll);

    const ticker = (time: number) => {
      instance.raf(time * 1000);
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const scroller = document.documentElement;
    ScrollTrigger.scrollerProxy(scroller, {
      scrollTop(value?: number) {
        if (typeof value === "number") {
          instance.scrollTo(value, { immediate: true });
        }
        return instance.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
          right: window.innerWidth,
          bottom: window.innerHeight,
        };
      },
      pinType: scroller.style.transform ? "transform" : "fixed",
    });

    queueMicrotask(() => {
      setLenis(instance);
      ScrollTrigger.refresh();
      const hash = typeof window !== "undefined" ? window.location.hash : "";
      if (hash && document.querySelector(hash)) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            instance.scrollTo(hash, {
              force: true,
              duration: SITE_SCROLL_DURATION,
              easing: SITE_SCROLL_EASE,
            });
            ScrollTrigger.refresh();
          });
        });
      }
    });

    return () => {
      instance.off("scroll", onScroll);
      gsap.ticker.remove(ticker);
      ScrollTrigger.scrollerProxy(scroller);
      instance.destroy();
      queueMicrotask(() => {
        setLenis(null);
        ScrollTrigger.refresh();
      });
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}
