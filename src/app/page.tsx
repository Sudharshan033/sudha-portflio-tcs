"use client";
import React, { useEffect, useRef } from "react";
import { LiquidChrome } from "@/components/LiquidChrome";
import { ToolsMarquee } from "@/components/ToolsMarquee";
import { ArrowUpRight, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
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

  const isDark = mounted && theme === "dark";
  const bgColor: [number, number, number] = isDark ? [0.09, 0.09, 0.09] : [0.82, 0.82, 0.82];
  const fg = "var(--on-background)";
  const m1 = "var(--muted-1)";   // #8A8A8A dark — labels, social, toggle
  const m2 = "var(--muted-2)";   // #9A9A9A dark — day label

  return (
    <>
      {/* ── Fixed WebGL background ──────────────────────────── */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <LiquidChrome baseColor={bgColor} speed={0.78} amplitude={0.4} interactive={true} />
      </div>

      {/* ── Dashboard shell ────────────────────────────────────
          Fixed to viewport — no scroll ever. The CSS grid
          fills the available space via fr rows.
      ──────────────────────────────────────────────────────── */}
      <div
        ref={gridRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 10,
          padding: "16px",
          boxSizing: "border-box",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gridTemplateRows: "1fr 1fr 1fr",
          gap: "12px",
          overflow: "hidden",
        }}
      >

        {/* ══ HERO CARD ── col 1-2, row 1-2 ═══════════════════ */}
        <div
          className="bento-card se"
          style={{ gridColumn: "1 / 3", gridRow: "1 / 3", overflow: "hidden" }}
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
                <svg width="52%" height="52%" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 22H6L12 10L18 22H22L12 2Z" fill="currentColor" />
                  <path d="M12 22L17 12L22 22H18L15 16L12 22Z" fill="currentColor" />
                </svg>
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
                FULL STACK + FRONTEND<br />
                DEVELOPER<br />
                &amp; UI/UX DESIGNER ✨ FRESHER.
              </h1>
            </div>

            {/* Social links */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(8px,1vw,16px)", flexShrink: 0 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {["GITHUB", "LINKEDIN"].map((l) => (
                  <a key={l} href="#" className="transition-opacity hover:opacity-60"
                    style={T.light(10, 0.9, 14, { color: m1, textTransform: "uppercase", letterSpacing: "1px" })}>{l}</a>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {["EMAIL", "PORTFOLIO"].map((l) => (
                  <a key={l} href="#" className="transition-opacity hover:opacity-60"
                    style={T.light(10, 0.9, 14, { color: m1, textTransform: "uppercase", letterSpacing: "1px" })}>{l}</a>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ══ PROFILE IMAGE ── col 3, row 1 ════════════════════ */}
        <div
          className="bento-card se overflow-hidden relative group"
          style={{ gridColumn: "3 / 4", gridRow: "1 / 2" }}
        >
          <img
            alt="Sudharshan Portrait"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"
            style={{ filter: "grayscale(100%) contrast(1.1)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* ══ SIDEBAR ── col 4, row 1-2 ════════════════════════ */}
        <div
          className="se"
          style={{ gridColumn: "4 / 5", gridRow: "1 / 3", display: "flex", flexDirection: "column", gap: "12px", overflow: "hidden" }}
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
            <button className="icon-btn" style={{ position: "absolute", top: "clamp(8px,1vw,16px)", right: "clamp(8px,1vw,16px)" }} aria-label="Add">
              <span style={{ fontSize: "16px", lineHeight: 1 }}>+</span>
            </button>
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
          <div className="bento-card group" style={{ flex: 1, overflow: "hidden", position: "relative", cursor: "pointer" }}>
            <div style={{ ...CARD_INNER, padding: "clamp(12px,1.2vw,20px)", justifyContent: "space-between" }}>
              <span style={T.light(10, 0.85, 14, { color: m1 })}>Works</span>
              <h3 style={T.regular(14, 1.3, 22, { color: fg, marginTop: "6px" })}>VIEW MY WORK</h3>
            </div>
            <button className="icon-btn arrow-btn" style={{ position: "absolute", bottom: "clamp(8px,1vw,16px)", right: "clamp(8px,1vw,16px)" }}>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* About */}
          <div className="bento-card group" style={{ flex: 1, overflow: "hidden", position: "relative", cursor: "pointer" }}>
            <div style={{ ...CARD_INNER, padding: "clamp(12px,1.2vw,20px)" }}>
              <span style={T.light(10, 0.85, 14, { color: m1 })}>About</span>
            </div>
            <button className="icon-btn arrow-btn" style={{ position: "absolute", bottom: "clamp(8px,1vw,16px)", right: "clamp(8px,1vw,16px)" }}>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ══ SAY HELLO ── col 3, row 2 ════════════════════════ */}
        <div
          className="bento-card se group"
          style={{ gridColumn: "3 / 4", gridRow: "2 / 3", overflow: "hidden", cursor: "pointer" }}
        >
          <div style={{ ...CARD_INNER, padding: "clamp(16px,1.8vw,32px)", justifyContent: "space-between" }}>
            <span style={T.light(11, 0.9, 14, { color: m1 })}>Say Hello 👋</span>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "auto" }}>
              <h3 style={T.regular(16, 1.5, 24, { color: fg, lineHeight: 1.2 })}>
                LET&rsquo;S WORK<br />TOGETHER
              </h3>
              <button className="icon-btn arrow-btn">
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* ══ JOURNAL ── col 1, row 3 ══════════════════════════ */}
        <div
          className="bento-card se group"
          style={{ gridColumn: "1 / 2", gridRow: "3 / 4", overflow: "hidden", cursor: "pointer" }}
        >
          <div style={{ ...CARD_INNER, padding: "clamp(14px,1.5vw,32px)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px", flexShrink: 0 }}>
              <span style={T.light(10, 0.85, 14, { color: m1 })}>Journal</span>
              <button className="icon-btn arrow-btn"><ArrowUpRight className="w-4 h-4" /></button>
            </div>
            <h3 style={T.regular(14, 1.4, 22, { color: fg, lineHeight: 1.2, flexShrink: 0 })} className="mb-auto">
              THOUGHTS,<br />TUTORIALS &amp; PROCESS.
            </h3>
            {/* Thumbnails — fixed 80px height, never expand the card */}
            <div style={{ display: "flex", gap: "8px", marginTop: "auto", flexShrink: 0 }}>
              {[
                "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=200&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=200&auto=format&fit=crop",
              ].map((src, i) => (
                <div key={i} style={{ flex: 1, height: "80px", borderRadius: "10px", overflow: "hidden", flexShrink: 0 }}>
                  <img src={src} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} alt="" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ RESOURCES ── col 2, row 3 ════════════════════════ */}
        <div
          className="bento-card se group"
          style={{ gridColumn: "2 / 3", gridRow: "3 / 4", overflow: "hidden", cursor: "pointer" }}
        >
          <div style={{ ...CARD_INNER, padding: "clamp(14px,1.5vw,32px)", justifyContent: "space-between" }}>
            <span style={T.light(10, 0.85, 14, { color: m1, marginBottom: "10px" })}>Resources</span>
            <h3 style={T.regular(14, 1.4, 22, { color: fg, lineHeight: 1.2 })}>FREE UI RESOURCES</h3>
            <div style={{ marginTop: "auto", alignSelf: "flex-end" }}>
              <button className="icon-btn arrow-btn"><ArrowUpRight className="w-5 h-5" /></button>
            </div>
          </div>
        </div>

        {/* ══ TOOLS ── col 3-4, row 3 ══════════════════════════ */}
        <div
          className="bento-card se"
          style={{ gridColumn: "3 / 5", gridRow: "3 / 4", overflow: "hidden" }}
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
