"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export function AuroraBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const blobs = containerRef.current.querySelectorAll(".aurora-blob");
    
    blobs.forEach((blob) => {
      // Randomize initial positions slightly
      gsap.set(blob, {
        x: () => gsap.utils.random(-10, 10) + "vw",
        y: () => gsap.utils.random(-10, 10) + "vh",
        scale: () => gsap.utils.random(1, 1.2),
        opacity: () => gsap.utils.random(0.4, 0.7),
        rotation: () => gsap.utils.random(0, 360),
      });

      // Animate blobs continuously in a smooth "flow"
      gsap.to(blob, {
        x: () => gsap.utils.random(-30, 30) + "vw",
        y: () => gsap.utils.random(-30, 30) + "vh",
        scale: () => gsap.utils.random(0.8, 1.5),
        rotation: () => gsap.utils.random(-180, 180),
        duration: () => gsap.utils.random(20, 35),
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        repeatRefresh: true, // Recalculate random values on each repeat for organic flow
      });
    });
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[var(--background)] pointer-events-none transition-colors duration-300 opacity-50" ref={containerRef}>
      <div className="absolute inset-0 bg-[var(--background)] z-10 transition-colors duration-300 dark:mix-blend-overlay"></div>
      <div className="aurora-blob absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05)_0,transparent_50%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0,transparent_50%)] rounded-full dark:mix-blend-screen blur-[100px]" />
      <div className="aurora-blob absolute top-1/2 left-1/2 w-[50vw] h-[50vw] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05)_0,transparent_50%)] dark:bg-[radial-gradient(circle_at_center,rgba(200,200,200,0.6)_0,transparent_50%)] rounded-full dark:mix-blend-screen blur-[120px]" />
      <div className="aurora-blob absolute top-3/4 left-1/3 w-[60vw] h-[60vw] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_0,transparent_50%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4)_0,transparent_50%)] rounded-full dark:mix-blend-screen blur-[150px]" />
      <div className="aurora-blob absolute top-1/4 left-3/4 w-[45vw] h-[45vw] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.04)_0,transparent_50%)] dark:bg-[radial-gradient(circle_at_center,rgba(220,220,220,0.5)_0,transparent_50%)] rounded-full dark:mix-blend-screen blur-[110px]" />
      {/* Vignette layer */}
      <div className="absolute inset-0 dark:bg-[radial-gradient(ellipse_at_center,transparent_0%,black_100%)] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(255,255,255,1)_100%)] z-20 pointer-events-none"></div>
    </div>
  );
}
