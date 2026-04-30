"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLCanvasElement[]>([]);

  useGSAP(
    () => {
      if (!sectionRef.current || !canvasRef.current || !headlineRef.current) return;

      const isDev = process.env.NODE_ENV !== "production";
      const width = isDev ? 960 : 1280;
      const height = isDev ? 540 : 720;
      const frameCount = isDev ? 30 : 72;
      const generated: HTMLCanvasElement[] = new Array(frameCount);
      let buildIndex = 0;
      let rafId = 0;
      let cancelled = false;

      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (!context) return;
      canvas.width = width;
      canvas.height = height;

      const drawProceduralFrame = (ctx: CanvasRenderingContext2D, progress: number) => {
        const focalX = width * (0.5 + Math.sin(progress * Math.PI * 2) * 0.08);
        const focalY = height * (0.5 + Math.cos(progress * Math.PI * 2) * 0.06);
        const radius = Math.max(width, height) * (0.2 + progress * 1.1);

        const bg = ctx.createRadialGradient(focalX, focalY, 20, focalX, focalY, radius);
        bg.addColorStop(0, "rgba(84, 135, 255, 0.26)");
        bg.addColorStop(0.4, "rgba(16, 24, 52, 0.75)");
        bg.addColorStop(1, "rgba(3, 3, 3, 1)");
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, width, height);

        ctx.save();
        ctx.translate(width / 2, height / 2);
        ctx.scale(0.65 + progress * 0.55, 0.65 + progress * 0.55);
        ctx.rotate(progress * Math.PI * 0.45);
        ctx.strokeStyle = "rgba(220,230,255,0.14)";
        ctx.lineWidth = 1.4;
        for (let ring = 0; ring < 8; ring += 1) {
          ctx.beginPath();
          ctx.arc(0, 0, 120 + ring * 48, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();

        ctx.fillStyle = "rgba(255,255,255,0.08)";
        for (let p = 0; p < 90; p += 1) {
          const px = (Math.sin(p * 0.17 + progress * 8) * 0.5 + 0.5) * width;
          const py = (Math.cos(p * 0.23 + progress * 6.2) * 0.5 + 0.5) * height;
          ctx.fillRect(px, py, 2, 2);
        }
      };

      const drawFrame = (index: number) => {
        const bounded = Math.max(0, Math.min(frameCount - 1, index));
        const frame = framesRef.current[bounded];
        if (!frame) return;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(frame, 0, 0, canvas.width, canvas.height);
      };

      const initTimeline = () => {
        if (cancelled) return;
        framesRef.current = generated;

        const state = { frame: 0 };
        let lastFrame = -1;
        drawFrame(0);
        gsap.set(headlineRef.current, { opacity: 0, y: 38 });
        if (loadingRef.current) {
          gsap.to(loadingRef.current, { opacity: 0, duration: 0.25, onComplete: () => loadingRef.current?.remove() });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=300%",
            pin: true,
            pinSpacing: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(state, {
          frame: frameCount - 1,
          duration: 1,
          ease: "none",
          onUpdate: () => {
            const index = Math.round(state.frame);
            if (index !== lastFrame) {
              lastFrame = index;
              drawFrame(index);
            }
          },
        }).to(
          headlineRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.28,
            ease: "power3.out",
          },
          0.7,
        );
      };

      const buildFramesChunked = () => {
        if (cancelled) return;

        const batchSize = isDev ? 2 : 3;
        for (let step = 0; step < batchSize && buildIndex < frameCount; step += 1) {
          const frame = document.createElement("canvas");
          frame.width = width;
          frame.height = height;
          const ctx = frame.getContext("2d");
          if (ctx) {
            const progress = buildIndex / (frameCount - 1);
            drawProceduralFrame(ctx, progress);
            generated[buildIndex] = frame;
          }
          buildIndex += 1;
        }

        if (loadingRef.current) {
          loadingRef.current.textContent = `Loading Intro... ${Math.round((buildIndex / frameCount) * 100)}%`;
        }

        if (buildIndex < frameCount) {
          rafId = window.requestAnimationFrame(buildFramesChunked);
          return;
        }

        initTimeline();
      };

      buildFramesChunked();

      return () => {
        cancelled = true;
        if (rafId) window.cancelAnimationFrame(rafId);
      };
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden border-b border-white/10 bg-[#050505]">
      <div className="relative h-screen w-full">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-[#050505]/70" />

        <div className="absolute inset-0 z-20 flex items-center justify-center px-6 sm:px-10 lg:px-16">
          <div className="relative w-full max-w-6xl overflow-hidden rounded-[2.4rem] border border-white/25 bg-[#0b0d15]/55 will-change-transform">
            <div
              ref={loadingRef}
              className="absolute inset-0 z-10 flex h-[62vh] items-center justify-center bg-[#0b0d15]/95 text-sm uppercase tracking-[0.2em] text-white/60"
            >
              Loading Intro...
            </div>
            <canvas ref={canvasRef} width={1600} height={900} className="h-[62vh] w-full object-cover" />
          </div>
        </div>

        <div ref={headlineRef} className="absolute inset-x-0 bottom-[12vh] z-30 px-6 sm:px-10 lg:px-16">
          <div className="max-w-6xl">
            <p className="mb-5 text-xs uppercase tracking-[0.2em] text-white/65">
              Predeep Chaudary - Full-Stack Developer, Data Analyst, ML Engineer
            </p>
            <h1 className="max-w-[16ch] text-balance text-[clamp(2.45rem,7vw,7.8rem)] font-semibold leading-[0.95] tracking-[-0.012em]">
              Engineering Scalable Digital Products Through Full-Stack Innovation.
            </h1>
            <p className="mt-6 max-w-2xl text-[clamp(1rem,1.45vw,1.32rem)] leading-relaxed text-white/72">
              High-performance systems, user-centric storytelling, and product architecture designed to convert intent
              into measurable outcomes.
            </p>
          </div>
        </div>
      </div>

      <div className="sr-only">
        <h2>Intro Sequence</h2>
        <p>Scroll-driven opening credits sequence with pinned playhead timeline.</p>
      </div>
    </section>
  );
}
