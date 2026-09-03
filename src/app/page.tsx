"use client";
import React, { useEffect, useRef } from "react";
import { Plasma } from "@/components/Plasma";
import { ToolsMarquee } from "@/components/ToolsMarquee";
import { ArrowUpRight, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import Link from "next/link";
import gsap from "gsap";

/* ─────────────────────────────────────────────────────────────
   Type helpers — clamp() so text shrinks gracefully on short
   viewports instead of overflowing.
───────────────────────────────────────────────────────────── */
const T = {
  /** IBM Plex Mono Light (300) — labels, body, social, toggle */
  light: (
    min: number, vw: number, max: number,
    extra: React.CSSProperties = {}
  ): React.CSSProperties => ({
    fontFamily: "var(--font-light)",
    fontWeight: 300,
    fontSize: `clamp(${min}px, ${vw}vw, ${max}px)`,
    ...extra,
  }),
  /** IBM Plex Mono Regular (400) — headlines, prominent values */
  regular: (
    min: number, vw: number, max: number,
    extra: React.CSSProperties = {}
  ): React.CSSProperties => ({
    fontFamily: "var(--font-regular)",
    fontWeight: 400,
    fontSize: `clamp(${min}px, ${vw}vw, ${max}px)`,
    ...extra,
  }),
};

/* Shared card inner wrapper — flex col, no overflow push */
const CARD_INNER: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  overflow: "hidden",
};

export default function Home() {
  const gridRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [toolsPaused, setToolsPaused] = React.useState(false);

  useEffect(() => { setMounted(true); }, []);

  const [time, setTime] = React.useState("");
  const [dayName, setDayName] = React.useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }));
      setDayName(now.toLocaleDateString("en-US", { weekday: "long" }));
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.querySelectorAll(".se"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.07, ease: "power3.out", delay: 0.1 }
      );
    }
  }, []);

  // (theme is undefined pre-mount, which means dark — the correct default)
  const isDark = mounted ? theme !== "light" : true;

  const plasmaColor = isDark ? "#121212" : "#E2D4D5";

  const fg = "var(--on-background)";
  const m1 = "var(--muted-1)";
  const m2 = "var(--muted-2)";

  return (
    <>
      {/* ── Fixed WebGL background ──────────────────────────── */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <Plasma color={plasmaColor} speed={1.9} direction="forward" scale={1.7} opacity={1} mouseInteractive={false} />
      </div>

      {/* ── Dashboard shell ────────────────────────────────────
          Fixed to viewport — no scroll ever. The CSS grid
          fills the available space via fr rows.
      ──────────────────────────────────────────────────────── */}
      <div
        ref={gridRef}
        className="w-full min-h-screen p-4 grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-3 lg:fixed lg:inset-0 lg:overflow-hidden overflow-y-auto"
        style={{
          zIndex: 10,
          boxSizing: "border-box",
        }}
      >

        {/* ══ HERO CARD ── col 1-2, row 1-2 ═══════════════════ */}
        <div
          className="bento-card se lg:col-span-2 lg:row-span-2 overflow-hidden"
        >
          <div style={{ ...CARD_INNER, padding: "clamp(16px,2vw,40px)", justifyContent: "space-between" }}>

            {/* Header row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              {/* Logo */}
              <div
                style={{
                  width: "clamp(36px,3.5vw,56px)", height: "clamp(36px,3.5vw,56px)",
                  borderRadius: "50%", border: "1px solid var(--outline)",
                  background: "var(--btn-bg)", display: "flex",
                  alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}
              >
                <span style={{ fontSize: "clamp(16px,1.8vw,28px)", fontWeight: 700, lineHeight: 1, color: "currentColor", fontFamily: "var(--font-geist-sans, sans-serif)" }}>S</span>
              </div>

              {/* Clock */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "2px" }}>
                <span style={T.light(10, 0.85, 15, { color: m2, letterSpacing: "0.5px", textTransform: "uppercase" })}>
                  {dayName || "Wednesday"}
                </span>
                <span style={T.regular(20, 2.5, 40, { color: fg, lineHeight: 1 })}>
                  {time || "3:59 PM"}
                </span>
              </div>
            </div>

            {/* Headline */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden", paddingBlock: "8px" }}>
              <p style={T.regular(14, 1.5, 26, { color: fg, marginBottom: "6px" })}>
                HELLO: I&rsquo;M SUDHARSHAN 👋
              </p>
              <h1 style={T.regular(18, 2.2, 34, { color: fg, lineHeight: 1.15, overflow: "hidden" })}>
                FULL STACK<br />
                DEVELOPER<br />
                &amp; UI/UX DESIGNER ✨ ANDROID DEVELOPER.<br />
                <span style={{ color: "#3b82f6", whiteSpace: "nowrap", fontSize: "clamp(9px, 2.8vw, 26px)" }}>&quot;THE FOUNDER AND CEO OF THE PLOT INFOTECH&quot;</span>
              </h1>
            </div>

            {/* Social links */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(8px,1vw,16px)", flexShrink: 0 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {[
                  { label: "GITHUB", url: "https://github.com/Sudharshan033" },
                  { label: "LINKEDIN", url: "https://linkedin.com/in/sudharshan-s-2049ab278" }
                ].map((l) => (
                  <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-60"
                    style={T.light(10, 0.9, 14, { color: m1, textTransform: "uppercase", letterSpacing: "1px" })}>{l.label}</a>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {[
                  { label: "EMAIL", url: "mailto:sudharshansakthivel033@gmail.com" },
                  { label: "PORTFOLIO", url: "/" }
                ].map((l) => (
                  <a key={l.label} href={l.url} className="transition-opacity hover:opacity-60"
                    style={T.light(10, 0.9, 14, { color: m1, textTransform: "uppercase", letterSpacing: "1px" })}>{l.label}</a>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ══ PROFILE IMAGE ── col 3, row 1 ════════════════════ */}
        <div
          className="bento-card se overflow-hidden relative group min-h-[300px] lg:min-h-0 lg:col-span-1 lg:row-span-1"
        >
          <img
            alt="Sudharshan Portrait"
            className="absolute inset-0 w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
            src="/profile.jpg.jpg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* ══ SIDEBAR ── col 4, row 1-2 ════════════════════════ */}
        <div
          className="se flex flex-col gap-3 overflow-hidden lg:col-span-1 lg:row-span-2"
        >
          {/* Status */}
          <div className="bento-card" style={{ flex: 1, overflow: "hidden", position: "relative" }}>
            <div style={{ ...CARD_INNER, padding: "clamp(12px,1.2vw,20px)", justifyContent: "space-between" }}>
              <span style={T.light(10, 0.85, 14, { color: m1 })}>Status</span>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "auto" }}>
                <div className="pulse-dot" style={{ width: "10px", height: "10px", borderRadius: "50%", background: "var(--primary)", flexShrink: 0 }} />
                <span style={T.regular(14, 1.3, 22, { color: fg })}>Available</span>
              </div>
            </div>

          </div>

          {/* Theme Toggle */}
          <div
            className="bento-card"
            style={{ flex: "0 0 auto", overflow: "hidden", cursor: "pointer" }}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            role="button"
            aria-label="Toggle theme"
          >
            <div style={{ ...CARD_INNER, padding: "clamp(12px,1.2vw,20px)", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <div
                style={{
                  width: "48px", height: "28px", borderRadius: "999px",
                  padding: "2px", background: "var(--on-background)",
                  display: "flex", alignItems: "center", flexShrink: 0,
                  transition: "background 0.3s",
                }}
              >
                <div
                  style={{
                    width: "24px", height: "24px", borderRadius: "50%",
                    background: "var(--bg-solid)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "transform 0.3s",
                    transform: isDark ? "translateX(0)" : "translateX(20px)",
                  }}
                >
                  {isDark
                    ? <Moon className="w-3.5 h-3.5" style={{ color: "var(--on-background)" }} />
                    : <Sun  className="w-3.5 h-3.5" style={{ color: "var(--on-background)" }} />}
                </div>
              </div>
              <span style={T.light(9, 0.75, 12, { color: m1, letterSpacing: "1px", textTransform: "uppercase", textAlign: "right", lineHeight: 1.4 })}>
                SWITCH TO<br />{isDark ? "LIGHT" : "DARK"} MODE.
              </span>
            </div>
          </div>

          {/* Works */}
          <Link href="/works" className="bento-card group" style={{ flex: 1, overflow: "hidden", position: "relative", cursor: "pointer", display: "block" }}>
            <div style={{ ...CARD_INNER, padding: "clamp(12px,1.2vw,20px)", justifyContent: "space-between" }}>
              <span style={T.light(10, 0.85, 14, { color: m1 })}>Works</span>
              <h3 style={T.regular(14, 1.3, 22, { color: fg, marginTop: "6px" })}>VIEW MY WORK</h3>
            </div>
            <button className="icon-btn arrow-btn" style={{ position: "absolute", bottom: "clamp(8px,1vw,16px)", right: "clamp(8px,1vw,16px)" }}>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </Link>

          {/* About */}
          <Link href="/about" className="bento-card group" style={{ flex: 1, overflow: "hidden", position: "relative", cursor: "pointer", display: "block" }}>
            <div style={{ ...CARD_INNER, padding: "clamp(12px,1.2vw,20px)" }}>
              <span style={T.light(10, 0.85, 14, { color: m1 })}>About</span>
            </div>
            <button className="icon-btn arrow-btn" style={{ position: "absolute", bottom: "clamp(8px,1vw,16px)", right: "clamp(8px,1vw,16px)" }}>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {/* ══ SAY HELLO ── col 3, row 2 ════════════════════════ */}
        <Link
          href="/contact"
          className="bento-card se group block overflow-hidden cursor-pointer min-h-[200px] lg:min-h-0 lg:col-span-1 lg:row-span-1"
        >
          <div style={{ ...CARD_INNER, padding: "clamp(16px,1.8vw,32px)", justifyContent: "space-between" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div
                style={{
                  width: "clamp(36px,3.5vw,56px)", height: "clamp(36px,3.5vw,56px)",
                  borderRadius: "50%", border: "1px solid var(--outline)",
                  background: "var(--btn-bg)", display: "flex",
                  alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}
              >
                <span style={{ fontSize: "clamp(16px,1.8vw,28px)", fontWeight: 700, lineHeight: 1, color: "currentColor", fontFamily: "var(--font-geist-sans, sans-serif)" }}>S</span>
              </div>
              <span style={T.light(11, 0.9, 14, { color: m1 })}>Say Hello 👋</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "auto" }}>
              <h3 style={T.regular(16, 1.5, 24, { color: fg, lineHeight: 1.2 })}>
                LET&rsquo;S WORK<br />TOGETHER
              </h3>
              <button className="icon-btn arrow-btn">
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Link>

        {/* ══ QUOTE ── col 1, row 3 ══════════════════════════ */}
        <div
          className="bento-card se group overflow-hidden min-h-[150px] lg:min-h-0 lg:col-span-1 lg:row-span-1"
        >
          <div style={{ ...CARD_INNER, padding: "clamp(20px,2vw,32px)", justifyContent: "center", alignItems: "center" }}>
            <span style={T.light(10, 0.85, 14, { color: m1, marginBottom: "16px", textTransform: "uppercase", letterSpacing: "1px" })}>Quote</span>
            <h3 style={T.regular(20, 1.8, 28, { color: fg, lineHeight: 1.4, textAlign: "center", fontStyle: "italic" })}>
              "Think like an architect.<br />Execute like a commander."
            </h3>
          </div>
        </div>

        {/* ══ RESOURCES ── col 2, row 3 ════════════════════════ */}
        <Link
          href="/achievements"
          className="bento-card se group block overflow-hidden cursor-pointer flex flex-col min-h-[150px] lg:min-h-0 lg:col-span-1 lg:row-span-1"
        >
          <div style={{ ...CARD_INNER, flex: 1, padding: "clamp(14px,1.5vw,32px)", justifyContent: "space-between" }}>
            <span style={T.light(10, 0.85, 14, { color: m1, marginBottom: "10px" })}>Achievements</span>
            <h3 style={T.regular(14, 1.4, 22, { color: fg, lineHeight: 1.2 })}>MY ACHIEVEMENTS</h3>
            <div style={{ marginTop: "auto", alignSelf: "flex-end" }}>
              <button className="icon-btn arrow-btn"><ArrowUpRight className="w-5 h-5" /></button>
            </div>
          </div>
        </Link>

        {/* ══ TOOLS ── col 3-4, row 3 ══════════════════════════ */}
        <div
          className="bento-card se overflow-hidden min-h-[200px] lg:min-h-0 lg:col-span-2 lg:row-span-1"
          onMouseEnter={() => setToolsPaused(true)}
          onMouseLeave={() => setToolsPaused(false)}
        >
          <div style={{ ...CARD_INNER, padding: "clamp(14px,1.5vw,32px)", justifyContent: "space-between" }}>
            <div style={{ flexShrink: 0 }}>
              <span style={T.light(10, 0.85, 14, { color: m1 })}>Tools I Use</span>
              <h3 style={T.regular(14, 1.4, 22, { color: fg, marginTop: "6px", lineHeight: 1.2 })}>MY DAILY STACK</h3>
            </div>
            {/* Marquee — takes remaining height, vertically centered */}
            <div style={{ flex: 1, display: "flex", alignItems: "center", marginTop: "16px", minHeight: 0 }}>
              <ToolsMarquee paused={toolsPaused} />
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
