"use client";

import { useEffect, useRef, useState } from "react";

type Tag = "p" | "span" | "div" | "h2" | "h3" | "dt" | "dd";

export type TypewriterTextProps = {
  text: string;
  className?: string;
  /** ms per character */
  charDelayMs?: number;
  /** wait before first character */
  startDelayMs?: number;
  as?: Tag;
  onComplete?: () => void;
  /** Blinking caret while typing */
  cursor?: boolean;
};

/**
 * Character typewriter with reduced-motion fallback (instant full text).
 */
export function TypewriterText({
  text,
  className,
  charDelayMs = 20,
  startDelayMs = 0,
  as: Tag = "span",
  onComplete,
  cursor = true,
}: TypewriterTextProps) {
  const [shown, setShown] = useState("");
  const [complete, setComplete] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setShown(text);
      setComplete(true);
      queueMicrotask(() => onCompleteRef.current?.());
      return;
    }

    setShown("");
    setComplete(false);
    let cancelled = false;
    let i = 0;
    /** Browser timers are numeric IDs; Node typings can widen to `Timeout`. */
    let intervalId: number | undefined;
    const startTimer = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        if (cancelled) return;
        i += 1;
        setShown(text.slice(0, i));
        if (i >= text.length) {
          if (intervalId !== undefined) window.clearInterval(intervalId);
          setComplete(true);
          onCompleteRef.current?.();
        }
      }, charDelayMs) as unknown as number;
    }, startDelayMs);

    return () => {
      cancelled = true;
      window.clearTimeout(startTimer);
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };
  }, [text, charDelayMs, startDelayMs]);

  return (
    <Tag className={className}>
      {shown}
      {cursor && !complete ? (
        <span className="ml-0.5 inline font-light text-neutral-400 motion-reduce:hidden" aria-hidden>
          |
        </span>
      ) : null}
    </Tag>
  );
}
