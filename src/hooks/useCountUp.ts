'use client';

import { useRef, useState, useEffect, useCallback } from 'react';

interface UseCountUpOptions {
  /** Target number to count to */
  end: number;
  /** Starting number (default 0) */
  start?: number;
  /** Duration in milliseconds (default 1800) */
  duration?: number;
  /** Decimal places to show (default 0) */
  decimals?: number;
  /** Easing: 'linear' | 'easeOut' (default 'easeOut') */
  easing?: 'linear' | 'easeOut';
  /** Delay before counting starts in ms (default 0) */
  delay?: number;
}

interface UseCountUpResult {
  /** Ref to attach to the element you want to observe */
  ref: React.RefObject<HTMLElement | null>;
  /** Current animated value as a string (respects decimals) */
  value: string;
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function useCountUp({
  end,
  start = 0,
  duration = 1800,
  decimals = 0,
  easing = 'easeOut',
  delay = 0,
}: UseCountUpOptions): UseCountUpResult {
  const ref = useRef<HTMLElement | null>(null);
  const [value, setValue] = useState(start.toFixed(decimals));
  const hasRun = useRef(false);
  const rafRef = useRef<number | null>(null);

  const runAnimation = useCallback(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const startTime = performance.now() + delay;

    const tick = (now: number) => {
      const elapsed = Math.max(0, now - startTime);
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easing === 'easeOut' ? easeOutExpo(progress) : progress;
      const current = start + (end - start) * easedProgress;
      setValue(current.toFixed(decimals));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setValue(end.toFixed(decimals));
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [end, start, duration, decimals, easing, delay]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          runAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [runAnimation]);

  return { ref, value };
}
