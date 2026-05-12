"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "@/components/providers/SmoothScrollProvider";

const STORAGE_KEY = "predeep:first-load-screen:v1";
const LOAD_DURATION_MS = 4000;
const EXIT_DELAY_MS = 180;
const EXIT_DURATION_MS = 950;

type LoadPhase = "loading" | "exiting" | "hidden";

function unlockDocumentScroll() {
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
}

function hasSeenLoader() {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function rememberLoader() {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, "true");
  } catch {
    // Storage can be disabled; the animation should still complete normally.
  }
}

function Dove({ className = "" }: { className?: string }) {
  return (
    <span className={`preloader-dove absolute block text-[#fffaf0] drop-shadow-[0_8px_16px_rgba(255,244,214,0.24)] ${className}`} aria-hidden>
      <svg viewBox="0 0 120 78" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path className="preloader-dove-wing-left" d="M57 37C44 23 31 11 7 5c7 22 20 37 41 43l9-11Z" fill="currentColor" />
        <path className="preloader-dove-wing-right" d="M61 36c16-15 31-25 54-27-8 20-22 33-45 38l-9-11Z" fill="currentColor" />
        <path d="M43 41c12-10 33-10 45 0-9 14-28 23-46 18-9-3-17-10-24-18 9 3 18 3 25 0Z" fill="currentColor" />
        <path d="M82 38c8-8 17-11 27-9-5 6-12 10-22 12l-5-3Z" fill="currentColor" />
        <path d="M37 54c-6 4-14 7-24 9 7-8 14-13 22-16l2 7Z" fill="currentColor" />
      </svg>
    </span>
  );
}

export function FirstLoadScreen() {
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  const [phase, setPhase] = useState<LoadPhase>("loading");
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  useEffect(() => {
    if (phase === "hidden") {
      unlockDocumentScroll();
      lenis?.start();
      return;
    }

    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      unlockDocumentScroll();
      lenis?.start();
    };
  }, [lenis, phase]);

  useEffect(() => {
    if (hasSeenLoader()) {
      const frameId = requestAnimationFrame(() => setPhase("hidden"));
      return () => cancelAnimationFrame(frameId);
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animationFrame = 0;
    let exitTimer = 0;
    let hideTimer = 0;

    const finish = () => {
      rememberLoader();
      unlockDocumentScroll();
      lenisRef.current?.start();
      setPhase("hidden");
      window.requestAnimationFrame(() => window.dispatchEvent(new Event("resize")));
    };

    if (reducedMotion) {
      const frameId = requestAnimationFrame(finish);
      return () => {
        cancelAnimationFrame(frameId);
        unlockDocumentScroll();
        lenisRef.current?.start();
      };
    }

    const startedAt = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startedAt;
      const t = Math.min(1, elapsed / LOAD_DURATION_MS);

      setProgress(Math.min(100, Math.floor(1 + t * 99)));

      if (t < 1) {
        animationFrame = requestAnimationFrame(tick);
        return;
      }

      rememberLoader();
      exitTimer = window.setTimeout(() => setPhase("exiting"), EXIT_DELAY_MS);
      hideTimer = window.setTimeout(finish, EXIT_DELAY_MS + EXIT_DURATION_MS);
    };

    animationFrame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
      unlockDocumentScroll();
      lenisRef.current?.start();
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      className={`preloader-root fixed inset-0 z-[9999] flex min-h-dvh items-center justify-center overflow-hidden text-[#fff8e8] ${
        phase === "exiting" ? "preloader-is-exiting pointer-events-none" : ""
      }`}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="preloader-full-scene absolute inset-0" aria-hidden />

      <div className="preloader-panels absolute inset-0" aria-hidden>
        <div className="preloader-panel preloader-panel-tl">
          <div className="preloader-scene-piece" />
        </div>
        <div className="preloader-panel preloader-panel-tr">
          <div className="preloader-scene-piece" />
        </div>
        <div className="preloader-panel preloader-panel-bl">
          <div className="preloader-scene-piece" />
        </div>
        <div className="preloader-panel preloader-panel-br">
          <div className="preloader-scene-piece" />
        </div>
      </div>

      <div className="preloader-float-layer absolute inset-0 z-10 transition-[opacity,transform,filter] duration-500 ease-out" aria-hidden>
        <Dove className="left-[7%] top-[11%] h-16 w-24 [--dove-rotate:-18deg] opacity-90 sm:h-20 sm:w-28" />
        <Dove className="right-[12%] top-[8%] h-20 w-28 [--dove-rotate:10deg] opacity-95 sm:h-24 sm:w-36" />
        <Dove className="left-[14%] top-[43%] h-14 w-20 [--dove-rotate:18deg] opacity-85 sm:h-20 sm:w-28" />
        <Dove className="right-[10%] top-[47%] h-16 w-24 [--dove-rotate:-24deg] opacity-80 sm:h-20 sm:w-28" />
        <Dove className="bottom-[16%] left-[8%] h-14 w-20 [--dove-rotate:-28deg] opacity-75 sm:h-16 sm:w-24" />
        <Dove className="bottom-[12%] right-[36%] h-14 w-20 [--dove-rotate:12deg] opacity-75 sm:h-16 sm:w-24" />
      </div>

      <div className="preloader-load-content relative z-20 flex w-[min(84vw,360px)] flex-col items-center text-center transition-[opacity,transform,filter] duration-500 ease-out">
        <div className="flex w-full items-center gap-3 font-hero-serif text-xs text-[#fff8e8]/90 sm:text-sm">
          <span className="min-w-7 text-right tabular-nums">{progress}</span>
          <div className="h-px flex-1 overflow-hidden bg-[#fff8e8]/38">
            <div className="h-full bg-[#fff8e8] transition-[width] duration-200 ease-linear" style={{ width: `${progress}%` }} />
          </div>
          <span>100</span>
        </div>
        <p className="mt-4 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[#fff8e8] sm:text-xs">Loading...</p>
      </div>
    </div>
  );
}
