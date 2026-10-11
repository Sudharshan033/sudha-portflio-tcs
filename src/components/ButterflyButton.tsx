"use client";

import React, { useCallback, useEffect, useId, useRef } from "react";
import { useRouter } from "next/navigation";

/* ─────────────────────────────────────────────────────────────
   ButterflyButton — circular gold-bordered button whose arrow
   is a golden butterfly. Idle: gentle wing flap + float.
   Click: butterfly flies away on a wavy path leaving sparkles,
   then the original action runs and a fresh butterfly fades in.
   Only transform/opacity are animated (compositor-friendly).
   ───────────────────────────────────────────────────────────── */

type Props = {
  /** Route to navigate to after the flight (runs original action) */
  href?: string;
  /** Extra action to run after the flight (e.g. scroll to section) */
  onClick?: () => void;
  /** Butterfly size in px (default 24) */
  size?: number;
  /** Increment this number to trigger the flight from outside —
      lets the whole parent bento card act as the click target */
  flySignal?: number;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
};

/* Sparkle trail: up-right drift offsets + stagger delays */
const SPARKS: Array<{ dx: string; dy: string; d: string }> = [
  { dx: "22px", dy: "-16px", d: "0s" },
  { dx: "34px", dy: "-30px", d: "0.1s" },
  { dx: "14px", dy: "-34px", d: "0.18s" },
  { dx: "30px", dy: "-8px", d: "0.26s" },
  { dx: "42px", dy: "-22px", d: "0.34s" },
  { dx: "10px", dy: "-20px", d: "0.08s" },
];

const FLIGHT_MS = 1400;
const RETURN_MS = 500;

export function ButterflyButton({
  href,
  onClick,
  size = 24,
  flySignal,
  className = "",
  style,
  ariaLabel = "Continue",
}: Props) {
  const router = useRouter();
  const btnRef = useRef<HTMLButtonElement>(null);
  const busyRef = useRef(false);
  /* unique gradient id per instance (multiple buttons on one page) */
  const gradId = `bfly-gold-${useId().replace(/:/g, "")}`;

  const runAction = useCallback(() => {
    if (href) router.push(href);
    onClick?.();
  }, [href, onClick, router]);

  /* Core flight sequence — shared by direct button clicks and
     external triggers (clicking anywhere on the bento card). */
  const fly = useCallback(() => {
    const btn = btnRef.current;
    if (!btn || busyRef.current) return; // double-click guard
    busyRef.current = true;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      /* skip the flight — simple fade out, act, fade back */
      btn.classList.add("bfly-fading");
      window.setTimeout(() => {
        runAction();
        btn.classList.remove("bfly-fading");
        btn.classList.add("bfly-returning");
        window.setTimeout(() => {
          btn.classList.remove("bfly-returning");
          busyRef.current = false;
        }, RETURN_MS);
      }, 280);
      return;
    }

    /* 1. butterfly flies away (CSS: .bfly-flying, ~1.4s) */
    btn.classList.add("bfly-flying");
    window.setTimeout(() => {
      /* 2. run the original action */
      runAction();
      /* 3. fresh butterfly fades in so the button is ready again */
      btn.classList.remove("bfly-flying");
      btn.classList.add("bfly-returning");
      window.setTimeout(() => {
        btn.classList.remove("bfly-returning");
        busyRef.current = false;
      }, RETURN_MS);
    }, FLIGHT_MS);
  }, [runAction]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      /* modifier clicks → let the browser/Link open in a new tab */
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      /* stop the parent <Link> from navigating instantly */
      e.preventDefault();
      e.stopPropagation();
      fly();
    },
    [fly]
  );

  /* External trigger — clicking anywhere on the parent card bumps flySignal */
  const lastSignal = useRef(flySignal);
  useEffect(() => {
    if (flySignal !== undefined && flySignal !== lastSignal.current) {
      lastSignal.current = flySignal;
      fly();
    }
  }, [flySignal, fly]);

  return (
    <button
      ref={btnRef}
      type="button"
      className={`butterfly-btn ${className}`}
      style={{ position: "relative", ...style }}
      aria-label={ariaLabel}
      onClick={handleClick}
    >
      <span className="bfly-fly" aria-hidden="true">
        <span className="bfly-tilt">
          <svg
            className="bfly-svg"
            width={size}
            height={size}
            viewBox="0 0 64 64"
            fill="none"
          >
            <defs>
              <linearGradient
                id={gradId}
                x1="6"
                y1="8"
                x2="58"
                y2="56"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#BF953F" />
                <stop offset="0.25" stopColor="#FCF6BA" />
                <stop offset="0.5" stopColor="#B38728" />
                <stop offset="0.75" stopColor="#FBF5B7" />
                <stop offset="1" stopColor="#AA771C" />
              </linearGradient>
            </defs>

            {/* upper wings */}
            <g className="bfly-wing bfly-wing-ul" fill={`url(#${gradId})`}>
              <path d="M30.8 18 C24 7 7 8 6.5 20 C6 30 20 34 30.8 30 Z" />
            </g>
            <g className="bfly-wing bfly-wing-ur" fill={`url(#${gradId})`}>
              <path d="M33.2 18 C40 7 57 8 57.5 20 C58 30 44 34 33.2 30 Z" />
            </g>
            {/* lower wings */}
            <g className="bfly-wing bfly-wing-ll" fill={`url(#${gradId})`}>
              <path d="M30.8 32 C23 33 13 38 14.5 47 C16 54 27 51 30.8 41 Z" />
            </g>
            <g className="bfly-wing bfly-wing-lr" fill={`url(#${gradId})`}>
              <path d="M33.2 32 C41 33 51 38 49.5 47 C48 54 37 51 33.2 41 Z" />
            </g>

            {/* slim body + head + antennae */}
            <rect x="30.4" y="14" width="3.2" height="35" rx="1.6" fill={`url(#${gradId})`} />
            <circle cx="32" cy="11.5" r="3" fill={`url(#${gradId})`} />
            <path
              d="M30.5 9.5 C28 6.5 25 5.5 23 6"
              stroke={`url(#${gradId})`}
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <path
              d="M33.5 9.5 C36 6.5 39 5.5 41 6"
              stroke={`url(#${gradId})`}
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </span>

      {/* golden sparkle particles left behind during flight */}
      <span className="bfly-sparkles" aria-hidden="true">
        {SPARKS.map((s, i) => (
          <span
            key={i}
            className="bfly-sparkle"
            style={{ "--dx": s.dx, "--dy": s.dy, "--d": s.d } as React.CSSProperties}
          />
        ))}
      </span>
    </button>
  );
}
