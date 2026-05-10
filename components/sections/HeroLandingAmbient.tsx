"use client";

/** Hand-tuned ellipse nest — evokes loose circular scribbles, scales cleanly on any DPR */
const SCRIBBLE_ELLIPSES: { rx: number; ry: number; rot: number }[] = [
  { rx: 44, ry: 40, rot: 0 },
  { rx: 48, ry: 36, rot: -11 },
  { rx: 38, ry: 44, rot: 19 },
  { rx: 51, ry: 39, rot: -23 },
  { rx: 41, ry: 47, rot: 33 },
  { rx: 46, ry: 35, rot: -7 },
  { rx: 36, ry: 48, rot: 14 },
  { rx: 49, ry: 42, rot: -31 },
  { rx: 42, ry: 37, rot: 41 },
  { rx: 45, ry: 45, rot: -17 },
  { rx: 39, ry: 41, rot: 27 },
  { rx: 47, ry: 38, rot: -44 },
  { rx: 43, ry: 46, rot: 8 },
  { rx: 40, ry: 40, rot: -52 },
  { rx: 50, ry: 41, rot: 22 },
  { rx: 37, ry: 45, rot: -36 },
  { rx: 44, ry: 36, rot: 15 },
  { rx: 46, ry: 43, rot: -58 },
  { rx: 41, ry: 39, rot: 48 },
  { rx: 48, ry: 37, rot: -3 },
  { rx: 39, ry: 46, rot: -25 },
  { rx: 45, ry: 44, rot: 36 },
  { rx: 42, ry: 35, rot: -12 },
];

function EditorialScribbleRing({ className }: { className?: string }) {
  const cx = 100;
  const cy = 100;
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <g stroke="#0a0a0a" strokeLinecap="round" strokeWidth={0.55} opacity={0.92}>
        {SCRIBBLE_ELLIPSES.map((e, i) => (
          <ellipse
            key={`s-${i}`}
            cx={cx}
            cy={cy}
            rx={e.rx}
            ry={e.ry}
            transform={`rotate(${e.rot} ${cx} ${cy})`}
            opacity={1 - (i % 4) * 0.035}
          />
        ))}
      </g>
      <g stroke="#0a0a0a" strokeLinecap="round" strokeWidth={0.42} opacity={0.55}>
        {SCRIBBLE_ELLIPSES.map((e, i) => (
          <ellipse
            key={`t-${i}`}
            cx={cx + ((i % 3) - 1) * 0.85}
            cy={cy + ((i % 5) - 2) * 0.65}
            rx={e.rx * 1.045}
            ry={e.ry * 1.03}
            transform={`rotate(${e.rot + (i % 2 === 0 ? 4 : -4)} ${cx} ${cy})`}
          />
        ))}
      </g>
    </svg>
  );
}

/**
 * Truth Labs–inspired opener: saturated red canvas, scribble circle nest, centered brand badge.
 */
export function HeroLandingAmbient() {
  return (
    <>
      <div className="absolute inset-0 bg-[#E32119]" aria-hidden />

      <div className="pointer-events-none absolute left-1/2 top-[max(12%,env(safe-area-inset-top))] flex -translate-x-1/2 flex-col items-center sm:top-[max(10%,env(safe-area-inset-top))]" aria-hidden>
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-none sm:h-14 sm:w-14">
          <span className="text-lg font-semibold italic leading-none tracking-[-0.08em] text-[#E32119] sm:text-xl">
            PD
          </span>
        </div>
        <p className="mt-2.5 text-center font-sans text-[0.5625rem] font-medium uppercase tracking-[0.62em] text-white/92 sm:text-[0.625rem] sm:tracking-[0.72em]">
          Predeep
        </p>
      </div>

      <div
        className="pointer-events-none absolute left-1/2 top-[48%] w-[min(118vw,_640px)] -translate-x-1/2 -translate-y-1/2 sm:w-[min(92vw,_720px)] md:w-[min(88vw,_820px)]"
        aria-hidden
      >
        <EditorialScribbleRing className="h-auto w-full text-black drop-shadow-none" />
      </div>
    </>
  );
}
