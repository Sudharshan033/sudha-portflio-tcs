"use client";
import React from "react";

/* ── SVG icon definitions ────────────────────────────────── */
const ICONS: { name: string; bg: string; svg: React.ReactNode }[] = [
  {
    name: "Workday",
    bg: "#005CB9",
    svg: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <path d="M4 6 L12 26 L16 16 L20 26 L28 6" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "SAP",
    bg: "#008FD3",
    svg: (
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold" fontSize="14" fill="#fff">SAP</text>
      </svg>
    ),
  },
  {
    name: "LinkedIn Recruiter",
    bg: "#0A66C2",
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFFFFF">
        <path d="M20.45 20.45h-3.56v-5.37c0-1.28-.02-2.93-1.78-2.93-1.78 0-2.05 1.39-2.05 2.84v5.46H9.5V9h3.42v1.56h.05c.48-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45z"/>
      </svg>
    ),
  },
  {
    name: "Jira",
    bg: "#0052CC",
    svg: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <path d="M16 2L2 16L16 30L30 16L16 2Z" fill="#FFFFFF" fillOpacity="0.8"/>
        <path d="M16 8L8 16L16 24L24 16L16 8Z" fill="#FFFFFF"/>
      </svg>
    ),
  },
  {
    name: "Tableau",
    bg: "#1C1C1C",
    svg: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="5" fill="#E97627" />
        <circle cx="26" cy="16" r="3" fill="#5C88BA" />
        <circle cx="6" cy="16" r="3" fill="#5C88BA" />
        <circle cx="16" cy="6" r="3" fill="#A83226" />
        <circle cx="16" cy="26" r="3" fill="#A83226" />
      </svg>
    ),
  },
  {
    name: "Excel",
    bg: "#217346",
    svg: (
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
        <rect x="2" y="2" width="28" height="28" rx="4" fill="#217346" />
        <path d="M10 8 L14 16 L10 24 M22 8 L18 16 L22 24 M14 16 L18 16" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Power BI",
    bg: "#F2C811",
    svg: (
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
        <rect x="6" y="18" width="5" height="10" fill="#333" />
        <rect x="13.5" y="10" width="5" height="18" fill="#333" />
        <rect x="21" y="4" width="5" height="24" fill="#333" />
      </svg>
    ),
  },
  {
    name: "MS Teams",
    bg: "#4A4CC3",
    svg: (
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
        <path d="M18 16 C20 16 22 14 22 12 C22 10 20 8 18 8 C16 8 14 10 14 12 C14 14 16 16 18 16 Z" fill="#FFFFFF" />
        <path d="M12 24 L12 22 C12 19 15 17 18 17 C21 17 24 19 24 22 L24 24 Z" fill="#FFFFFF" />
        <path d="M12 14 C14 14 15 12.5 15 11 C15 9.5 14 8 12 8 C10 8 9 9.5 9 11 C9 12.5 10 14 12 14 Z" fill="#FFFFFF" fillOpacity="0.7" />
        <path d="M7 22 L7 20 C7 18 9 16 11 16 L12.5 16 C11.5 17 11 18.5 11 20 L11 22 Z" fill="#FFFFFF" fillOpacity="0.7" />
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
