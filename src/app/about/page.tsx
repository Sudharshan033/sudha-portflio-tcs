"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { CheckCircle2, Award, Star, Activity, Users } from "lucide-react";
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

export default function About() {
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
            About Me
          </span>
        </div>

        <div className="stagger-enter mb-12">
          <h1 style={T.regular(32, 4, 56, { lineHeight: 1.1, textTransform: "uppercase", maxWidth: "800px" })}>
            STRATEGIC HR LEADER &amp; WORKFORCE TRANSFORMATION EXPERT.
          </h1>
        </div>

        {/* Main Content Layout */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Experience */}
          <div className="bento-card p-8 flex flex-col stagger-enter md:col-span-2">
            <span style={T.light(12, 1, 14, { color: "var(--muted-1)", textTransform: "uppercase", marginBottom: "24px" })}>Experience</span>
            <div className="flex flex-col gap-8 border-l border-[var(--outline)] ml-2 pl-6 relative">
              <div className="relative">
                <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-[var(--primary)] ring-4 ring-[var(--background)]"></div>
                <h4 style={T.regular(20, 1.5, 24, { color: "var(--on-background)", marginBottom: "4px" })}>Tata Consultancy Services</h4>
                <p style={T.light(14, 1, 16, { color: "var(--muted-1)" })}>Strategic HR Leader / Currently working</p>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="bento-card p-8 flex flex-col stagger-enter">
            <span style={T.light(12, 1, 14, { color: "var(--muted-1)", textTransform: "uppercase", marginBottom: "24px" })}>Education</span>
            <div className="flex flex-col gap-6">
              <div>
                <h4 style={T.regular(18, 1.2, 20, { color: "var(--on-background)", marginBottom: "2px" })}>B-Tech IT, MBA</h4>
                <p style={T.light(14, 1, 16, { color: "var(--muted-1)" })}>IIM Raipur</p>
              </div>
              <div>
                <h4 style={T.regular(18, 1.2, 20, { color: "var(--on-background)", marginBottom: "2px" })}>PG Cert in CHRO Program</h4>
                <p style={T.light(14, 1, 16, { color: "var(--muted-1)" })}>IIM Ranchi</p>
              </div>
              <div>
                <h4 style={T.regular(18, 1.2, 20, { color: "var(--on-background)", marginBottom: "2px" })}>PG Cert in Buiz Analytics and AI</h4>
                <p style={T.light(14, 1, 16, { color: "var(--muted-1)" })}>IIM Trichy</p>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bento-card p-8 flex flex-col stagger-enter bg-gradient-to-br from-[var(--background)] to-[#1a1510] border-amber-900/30">
            <span style={T.light(12, 1, 14, { color: "#d97706", textTransform: "uppercase", marginBottom: "16px" })}>Achievements</span>
            <h4 style={T.regular(22, 1.5, 26, { color: "var(--on-background)", lineHeight: 1.2, marginBottom: "16px", textTransform: "uppercase" })}>
              GLOBAL CHRO PROGRAM CERTIFIED
            </h4>
            <div className="flex items-center gap-3 mt-auto pt-4">
              <Award className="w-5 h-5 text-amber-600" />
              <span style={T.light(14, 1, 16, { color: "var(--muted-1)" })}>Advanced NLP Practitioner - HIPE Canada</span>
            </div>
          </div>

          {/* Beyond Code */}
          <div className="bento-card p-8 flex flex-col stagger-enter">
            <span style={T.light(12, 1, 14, { color: "var(--muted-1)", textTransform: "uppercase", marginBottom: "24px" })}>Beyond HR</span>
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-3">
                <Star className="w-5 h-5 text-[var(--muted-1)]" />
                <span style={T.regular(16, 1.2, 18, { color: "var(--on-background)" })}>Psychologist</span>
              </li>
              <li className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-[var(--muted-1)]" />
                <span style={T.regular(16, 1.2, 18, { color: "var(--on-background)" })}>Hypnotherapist</span>
              </li>
            </ul>
          </div>
          
          {/* Certifications */}
          <div className="bento-card p-8 flex flex-col stagger-enter">
            <span style={T.light(12, 1, 14, { color: "var(--muted-1)", textTransform: "uppercase", marginBottom: "24px" })}>Certifications</span>
            <ul className="flex flex-col gap-4">
              {["PSM II", "SAFe5", "Lean", "Six Sigma", "Green Belt Certified"].map((cert, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[var(--primary)] mt-0.5 flex-shrink-0" />
                  <span style={T.regular(16, 1.2, 18, { color: "var(--on-background)", lineHeight: 1.4 })}>{cert}</span>
                </li>
              ))}
            </ul>
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
