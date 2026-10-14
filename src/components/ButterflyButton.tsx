"use client";

import React, { useCallback, useEffect, useRef } from "react";
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
          <span
            className="bfly-stage"
            style={{
              position: "relative",
              width: size,
              height: size * (890 / 947),
              display: "block",
            }}
          >
            {/* Left Wing — flaps horizontally around center body */}
            <span
              className="bfly-wing-left"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "50%",
                height: "100%",
                overflow: "hidden",
                transformOrigin: "100% 50%",
                willChange: "transform",
              }}
            >
              <img
                src="/golden_butterfly.png"
                alt=""
                draggable={false}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: size,
                  height: size * (890 / 947),
                  maxWidth: "none",
                  objectFit: "contain",
                  filter: "drop-shadow(0 0 2.5px rgba(254, 240, 138, 0.45))",
                }}
              />
            </span>

            {/* Right Wing — flaps horizontally around center body */}
            <span
              className="bfly-wing-right"
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                width: "50%",
                height: "100%",
                overflow: "hidden",
                transformOrigin: "0% 50%",
                willChange: "transform",
              }}
            >
              <img
                src="/golden_butterfly.png"
                alt=""
                draggable={false}
                style={{
                  position: "absolute",
                  left: -size * 0.5,
                  top: 0,
                  width: size,
                  height: size * (890 / 947),
                  maxWidth: "none",
                  objectFit: "contain",
                  filter: "drop-shadow(0 0 2.5px rgba(254, 240, 138, 0.45))",
                }}
              />
            </span>

            {/* Central Body & Antennae — stationary foreground to maintain anatomical stability */}
            <span
              style={{
                position: "absolute",
                top: 0,
                left: "38%",
                width: "24%",
                height: "100%",
                overflow: "hidden",
                pointerEvents: "none",
              }}
            >
              <img
                src="/golden_butterfly.png"
                alt=""
                draggable={false}
                style={{
                  position: "absolute",
                  left: -size * 0.38,
                  top: 0,
                  width: size,
                  height: size * (890 / 947),
                  maxWidth: "none",
                  objectFit: "contain",
                  filter: "drop-shadow(0 0 2.5px rgba(254, 240, 138, 0.45))",
                }}
              />
            </span>
          </span>
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
