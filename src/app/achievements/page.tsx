"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowUpRight, Trophy, Star, Medal } from "lucide-react";
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

export default function Achievements() {
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
              Milestones
            </span>
          </div>

          {/* Main Content Layout */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            
            <div className="stagger-enter md:col-span-3 mb-8">
              <h1 style={T.regular(32, 4, 56, { lineHeight: 1.1, textTransform: "uppercase", maxWidth: "800px" })}>
                MILESTONES, AWARDS &<br />
                RECOGNITION.
              </h1>
            </div>

            {/* Achievement 1 */}
            <div className="bento-card p-6 flex flex-col stagger-enter min-h-[300px] group overflow-hidden relative cursor-pointer md:col-span-2" style={{ backgroundColor: "#121212" }}>
              <div className="absolute inset-0 bg-gradient-to-tr from-yellow-600/30 to-amber-900/20 mix-blend-overlay z-0 transition-transform duration-700 group-hover:scale-105"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent z-10 pointer-events-none"></div>
              
              <div className="relative z-20 flex justify-between items-start">
                <span className="font-label-mono text-[12px] text-white/70 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10 uppercase">Sports</span>
                <div className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                </div>
              </div>
              
              <div className="relative z-20 mt-auto pt-20">
                <h3 style={T.regular(24, 2, 32, { color: "white", marginBottom: "8px", textTransform: "uppercase" })}>National Boxing Gold</h3>
                <p style={T.light(14, 1, 16, { color: "rgba(255,255,255,0.7)" })}>National Level Boxing Gold Medal – Young Sports of India.</p>
              </div>
            </div>

            {/* Achievement 2 */}
            <div className="bento-card p-6 flex flex-col stagger-enter min-h-[300px] group overflow-hidden relative cursor-pointer" style={{ backgroundColor: "#121212" }}>
              <img src="/army.jpg" alt="Army Contingent" className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-105 opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/60 to-indigo-900/40 mix-blend-overlay z-0 transition-transform duration-700 group-hover:scale-105"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent z-10 pointer-events-none"></div>
              
              <div className="relative z-20 flex justify-between items-start">
                <span className="font-label-mono text-[12px] text-white/70 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10 uppercase">Leadership</span>
                <div className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full flex items-center justify-center">
                  <Medal className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              
              <div className="relative z-20 mt-auto pt-20">
                <h3 style={T.regular(20, 1.5, 24, { color: "white", marginBottom: "8px", textTransform: "uppercase" })}>Contingent Commander</h3>
                <p style={T.light(14, 1, 16, { color: "rgba(255,255,255,0.7)" })}>Medal for Leading Army Contingent as Contingent Commander.</p>
              </div>
            </div>

            {/* Achievement 3 */}
            <div className="bento-card p-6 flex flex-col stagger-enter min-h-[300px] group overflow-hidden relative cursor-pointer" style={{ backgroundColor: "#121212" }}>
               <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 to-fuchsia-900/20 mix-blend-overlay z-0 transition-transform duration-700 group-hover:scale-105"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent z-10 pointer-events-none"></div>
              
              <div className="relative z-20 flex justify-between items-start">
                <span className="font-label-mono text-[12px] text-white/70 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10 uppercase">Fitness</span>
                <div className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-purple-400" />
                </div>
              </div>
              
              <div className="relative z-20 mt-auto pt-20">
                <h3 style={T.regular(20, 1.5, 24, { color: "white", marginBottom: "8px", textTransform: "uppercase" })}>Best in Physical</h3>
                <p style={T.light(14, 1, 16, { color: "rgba(255,255,255,0.7)" })}>Awarded Medal for Best in Physical.</p>
              </div>
            </div>

            <div className="stagger-enter flex flex-col gap-4 md:col-span-2 justify-center">
              <div className="bento-card p-5 flex justify-between items-center group cursor-pointer hover:bg-white/5 transition-colors">
                <div>
                  <h4 style={T.regular(18, 1.5, 20, { color: "var(--on-background)", marginBottom: "4px", textTransform: "uppercase" })}>Deadlifting Bronze Medal</h4>
                  <p style={T.light(12, 1, 14, { color: "var(--muted-1)" })}>State Level</p>
                </div>
                <div className="w-10 h-10 rounded-full border border-[var(--outline)] flex items-center justify-center group-hover:bg-[var(--on-background)] group-hover:text-[var(--background)] transition-colors">
                  <Trophy className="w-5 h-5" />
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}
