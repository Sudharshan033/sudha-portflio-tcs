"use client";
import React from "react";

/* ── SVG icon definitions ────────────────────────────────── */
const ICONS: { name: string; bg: string; svg: React.ReactNode }[] = [
  {
    name: "React",
    bg: "#20232A",
    svg: (
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="3.2" fill="#61DAFB" />
        <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#61DAFB" strokeWidth="1.4" />
        <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#61DAFB" strokeWidth="1.4" transform="rotate(60 16 16)" />
        <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#61DAFB" strokeWidth="1.4" transform="rotate(-60 16 16)" />
      </svg>
    ),
  },
  {
    name: "Figma",
    bg: "#1A1A1A",
    svg: (
      <svg width="20" height="30" viewBox="0 0 38 57" fill="none">
        <path d="M19 28.5C19 33.75 14.75 38 9.5 38C4.25 38 0 33.75 0 28.5C0 23.25 4.25 19 9.5 19C14.75 19 19 23.25 19 28.5Z" fill="#0ACF83" />
        <path d="M0 28.5C0 23.25 4.25 19 9.5 19H19V38H9.5C4.25 38 0 33.75 0 28.5Z" fill="#A259FF" />
        <path d="M0 9.5C0 4.25 4.25 0 9.5 0H19V19H9.5C4.25 19 0 14.75 0 9.5Z" fill="#F24E1E" />
        <path d="M19 0H28.5C33.75 0 38 4.25 38 9.5C38 14.75 33.75 19 28.5 19H19V0Z" fill="#FF7262" />
        <path d="M38 28.5C38 33.75 33.75 38 28.5 38C23.25 38 19 33.75 19 28.5C19 23.25 23.25 19 28.5 19C33.75 19 38 23.25 38 28.5Z" fill="#1ABCFE" />
      </svg>
    ),
  },
  {
    name: "VS Code",
    bg: "#1A1A1A",
    svg: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <path d="M22.5 2L12.5 12.5L5.5 7L2 9L10 16L2 23L5.5 25L12.5 19.5L22.5 30L30 26V6L22.5 2Z" fill="#0078D7" />
        <path d="M22.5 8.5L14.5 16L22.5 23.5V8.5Z" fill="rgba(255,255,255,0.3)" />
      </svg>
    ),
  },
  {
    name: "Supabase",
    bg: "#1C1C1C",
    svg: (
      <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
        <path d="M13.5 0.5L0.5 16H12L10.5 27.5L23.5 12H12L13.5 0.5Z" fill="#3ECF8E" />
      </svg>
    ),
  },
  {
    name: "Node.js",
    bg: "#1A2A1A",
    svg: (
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
        <path d="M16 2L4 8.5V23.5L16 30L28 23.5V8.5L16 2Z" fill="#339933" />
        <path d="M16 2L4 8.5V23.5L16 30L28 23.5V8.5L16 2Z" fill="url(#nodeGrad)" />
        <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle"
          fontFamily="monospace" fontWeight="bold" fontSize="7" fill="#fff">NODE</text>
        <defs>
          <linearGradient id="nodeGrad" x1="4" y1="2" x2="28" y2="30">
            <stop offset="0%" stopColor="#3c873a" />
            <stop offset="100%" stopColor="#215732" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: "Electron",
    bg: "#1A2030",
    svg: (
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="3" fill="#9FEAF9" />
        <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#9FEAF9" strokeWidth="1.3" />
        <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#9FEAF9" strokeWidth="1.3" transform="rotate(60 16 16)" />
      </svg>
    ),
  },
  {
    name: "Git",
    bg: "#2A1A1A",
    svg: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <rect x="13" y="1" width="6" height="6" rx="3" fill="#F05032" />
        <rect x="13" y="13" width="6" height="6" rx="3" fill="#F05032" />
        <rect x="1"  y="13" width="6" height="6" rx="3" fill="#F05032" />
        <rect x="13" y="25" width="6" height="6" rx="3" fill="#F05032" />
        <line x1="16" y1="7"  x2="16" y2="13" stroke="#F05032" strokeWidth="2" />
        <line x1="16" y1="19" x2="16" y2="25" stroke="#F05032" strokeWidth="2" />
        <line x1="7"  y1="16" x2="13" y2="16" stroke="#F05032" strokeWidth="2" />
        <line x1="7"  y1="16" x2="7"  y2="10" stroke="#F05032" strokeWidth="2" />
        <line x1="7"  y1="10" x2="13" y2="10" stroke="#F05032" strokeWidth="2" />
      </svg>
    ),
  },
  {
    name: "Vercel",
    bg: "#111111",
    svg: (
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
        <path d="M16 3L30 28H2L16 3Z" fill="#FFFFFF" />
      </svg>
    ),
  },
];

/* ── Component ─────────────────────────────────────────── */
export function ToolsMarquee({ paused = false }: { paused?: boolean }) {
  // Duplicate icons once so the loop is seamless
  const doubled = [...ICONS, ...ICONS];

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        /* Fade both edges */
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "16px",
          width: "max-content",
          animation: "marquee-scroll 30s linear infinite",
          animationPlayState: paused ? "paused" : "running",
          paddingBottom: "2px", // avoid clipping shadow
        }}
      >
        {doubled.map((icon, i) => (
          <div
            key={i}
            title={icon.name}
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: icon.bg,
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "transform 0.2s ease",
            }}
          >
            {icon.svg}
          </div>
        ))}
      </div>
    </div>
  );
}
