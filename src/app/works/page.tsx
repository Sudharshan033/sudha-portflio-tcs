"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { Plasma } from "@/components/Plasma";
import { useTheme } from "@/components/ThemeProvider";

const T = {
  light: (min: number, vw: number, max: number, extra: React.CSSProperties = {}) => ({
    fontFamily: "var(--font-light)", fontWeight: 300, fontSize: `clamp(${min}px, ${vw}vw, ${max}px)`, ...extra,
  }),
  regular: (min: number, vw: number, max: number, extra: React.CSSProperties = {}) => ({
    fontFamily: "var(--font-regular)", fontWeight: 400, fontSize: `clamp(${min}px, ${vw}vw, ${max}px)`, ...extra,
  }),
};

export default function Works() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  
  useEffect(() => {
    setMounted(true);
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.querySelectorAll(".stagger-enter"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.2 }
      );
    }
  }, []);

  const isDark = mounted ? theme !== "light" : true;
  const plasmaColor = isDark ? "#121212" : "#E2D4D5";

  return (
    <>
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <Plasma color={plasmaColor} speed={1.9} direction="forward" scale={1.7} opacity={1} mouseInteractive={false} />
      </div>
      <div ref={containerRef} className="min-h-screen bg-transparent text-[var(--on-background)] w-full flex flex-col p-6 overflow-x-hidden relative z-10">
      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col justify-between">
        {/* Top Header */}
        <div className="w-full flex items-start justify-between mt-4 mb-16 stagger-enter">
          <Link href="/" className="hover:opacity-70 transition-opacity">
            <div style={{
              width: "clamp(36px,3.5vw,56px)", height: "clamp(36px,3.5vw,56px)",
              borderRadius: "50%", border: "1px solid var(--outline)",
              background: "var(--btn-bg)", display: "flex",
              alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <span style={{ fontSize: "clamp(16px,1.8vw,28px)", fontWeight: 700, lineHeight: 1, color: "currentColor", fontFamily: "var(--font-geist-sans, sans-serif)" }}>S</span>
            </div>
          </Link>
          <span style={T.light(12, 1, 14, { color: "var(--muted-1)", textTransform: "uppercase", letterSpacing: "1px" })}>
            Selected Works
          </span>
        </div>

        {/* Main Content Layout */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          <div className="stagger-enter md:col-span-3 mb-8">
            <h1 style={T.regular(32, 4, 56, { lineHeight: 1.1, textTransform: "uppercase", maxWidth: "800px" })}>
              PROJECTS THAT SHOWCASE MY EXPERTISE.
            </h1>
          </div>

          {/* Project 1 */}
          <div className="bento-card p-6 flex flex-col stagger-enter min-h-[300px] group overflow-hidden relative md:col-span-2 block" style={{ backgroundColor: "#121212" }}>
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 to-purple-900/20 mix-blend-overlay z-0 transition-transform duration-700 group-hover:scale-105"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent z-10 pointer-events-none"></div>
            
            <div className="relative z-20 flex justify-between items-start">
              <span className="font-label-mono text-[12px] text-white/70 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10 uppercase">HR Strategy</span>
            </div>
            
            <div className="relative z-20 mt-auto pt-20">
              <h3 style={T.regular(24, 2, 32, { color: "white", marginBottom: "8px", textTransform: "uppercase" })}>Global Workforce Transformation</h3>
              <p style={T.light(14, 1, 16, { color: "rgba(255,255,255,0.7)" })}>Led global initiatives to restructure workforce capabilities and align talent with long-term strategic goals.</p>
            </div>
          </div>

          {/* Project 2 */}
          <div className="bento-card p-6 flex flex-col stagger-enter min-h-[300px] group overflow-hidden relative block" style={{ backgroundColor: "#121212" }}>
            <div className="absolute inset-0 bg-gradient-to-tr from-green-900/40 to-emerald-900/20 mix-blend-overlay z-0 transition-transform duration-700 group-hover:scale-105"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent z-10 pointer-events-none"></div>
            
            <div className="relative z-20 flex justify-between items-start">
              <span className="font-label-mono text-[12px] text-white/70 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10 uppercase">Leadership</span>
            </div>
            
            <div className="relative z-20 mt-auto pt-20">
              <h3 style={T.regular(20, 1.5, 24, { color: "white", marginBottom: "8px", textTransform: "uppercase" })}>Leadership Excellence Program</h3>
              <p style={T.light(14, 1, 16, { color: "rgba(255,255,255,0.7)" })}>Designed and executed development programs for senior executives.</p>
            </div>
          </div>

          {/* Project 3 */}
          <div className="bento-card p-6 flex flex-col stagger-enter min-h-[300px] group overflow-hidden relative block" style={{ backgroundColor: "#121212" }}>
             <div className="absolute inset-0 bg-gradient-to-tr from-gray-800/40 to-gray-600/20 mix-blend-overlay z-0 transition-transform duration-700 group-hover:scale-105"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent z-10 pointer-events-none"></div>
            
            <div className="relative z-20 flex justify-between items-start">
              <span className="font-label-mono text-[12px] text-white/70 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10 uppercase">Agile / Scrum</span>
            </div>
            
            <div className="relative z-20 mt-auto pt-20">
              <h3 style={T.regular(20, 1.5, 24, { color: "white", marginBottom: "8px", textTransform: "uppercase" })}>Agile HR Integration</h3>
              <p style={T.light(14, 1, 16, { color: "rgba(255,255,255,0.7)" })}>Implemented Agile methodologies across HR departments.</p>
            </div>
          </div>

          {/* Other Projects */}
          <div className="stagger-enter flex flex-col gap-4 md:col-span-2 justify-center">
            <div className="bento-card p-5 flex justify-between items-center group block">
              <div>
                <h4 style={T.regular(18, 1.5, 20, { color: "var(--on-background)", marginBottom: "4px", textTransform: "uppercase" })}>NLP for Employee Wellness</h4>
                <p style={T.light(12, 1, 14, { color: "var(--muted-1)" })}>Applied psychology to enhance well-being.</p>
              </div>
            </div>
            
            <div className="bento-card p-5 flex justify-between items-center group block">
              <div>
                <h4 style={T.regular(18, 1.5, 20, { color: "var(--on-background)", marginBottom: "4px", textTransform: "uppercase" })}>Six Sigma Optimization</h4>
                <p style={T.light(12, 1, 14, { color: "var(--muted-1)" })}>Streamlined recruitment workflows.</p>
              </div>
            </div>
            
            <div className="bento-card p-5 flex justify-between items-center group block">
              <div>
                <h4 style={T.regular(18, 1.5, 20, { color: "var(--on-background)", marginBottom: "4px", textTransform: "uppercase" })}>Data-Driven HR Analytics</h4>
                <p style={T.light(12, 1, 14, { color: "var(--muted-1)" })}>Leveraged AI to derive workforce insights.</p>
              </div>
            </div>
          </div>
          
        </div>

        {/* Footer */}
        <footer className="w-full flex flex-col md:flex-row items-center justify-between border-t border-[var(--outline)] pt-8 mt-12 pb-4 stagger-enter">
          <div style={T.light(12, 1, 14, { color: "var(--on-background)", textTransform: "lowercase" })}>
            sudha.vlbit@gmail.com
          </div>
          <div className="flex gap-4 md:gap-8 mt-6 md:mt-0">
            {[
              { label: "LINKEDIN", url: "https://www.linkedin.com/in/sudha-paardevan-60536616a?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
              { label: "EMAIL", url: "mailto:sudha.vlbit@gmail.com" }
            ].map((link) => (
              <a 
                key={link.label} 
                href={link.url} 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-60 transition-opacity"
                style={T.light(11, 0.9, 13, { color: "var(--on-background)", textTransform: "uppercase", letterSpacing: "1px" })}
              >
                {link.label}
              </a>
            ))}
          </div>
        </footer>

      </div>
    </div>
    </>
  );
}
