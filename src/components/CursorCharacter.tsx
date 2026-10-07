"use client";

import React, { useEffect, useState } from "react";

export function CursorCharacter() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate relative position based on center of screen
      // range roughly -1 to 1
      const x = (e.clientX / window.innerWidth - 0.5) * 2; 
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Calculate eye and pupil movement
  // Eye bounds
  const eyeLimitX = 12;
  const eyeLimitY = 12;
  
  // Constrain movement within an elliptical boundary roughly
  const eyeX = Math.min(Math.max(mousePos.x * eyeLimitX * 2, -eyeLimitX), eyeLimitX);
  const eyeY = Math.min(Math.max(mousePos.y * eyeLimitY * 2, -eyeLimitY), eyeLimitY);

  // Face subtly tracks mouse
  const faceX = mousePos.x * 6;
  const faceY = mousePos.y * 6;

  // Mouth shifts to smile more when cursor is high or hovered
  const smileCurve = isHovering ? 25 : (mousePos.y < -0.2 ? 20 : 10);

  return (
    <div 
      className="w-full h-full flex flex-col items-center justify-center relative cursor-pointer"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        background: "radial-gradient(circle at center, var(--btn-bg) 0%, transparent 70%)"
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: `translate(${faceX}px, ${faceY}px) scale(${isHovering ? 1.05 : 1})`,
          transition: "transform 0.15s cubic-bezier(0.2, 0, 0.2, 1)",
          maxWidth: "200px",
          maxHeight: "200px"
        }}
      >
        {/* Face Outline */}
        <circle cx="100" cy="100" r="80" fill="var(--bg-solid)" stroke="var(--outline)" strokeWidth="4" />
        
        {/* Left Eye */}
        <g>
          <circle cx="65" cy="85" r="22" fill="var(--btn-bg)" stroke="var(--outline)" strokeWidth="3" />
          {/* Left Pupil */}
          <circle 
            cx={65 + eyeX} 
            cy={85 + eyeY} 
            r="10" 
            fill="var(--on-background)" 
            style={{ transition: "cx 0.1s ease-out, cy 0.1s ease-out" }}
          />
          {/* Pupil Catchlight */}
          <circle 
            cx={65 + eyeX - 3} 
            cy={85 + eyeY - 3} 
            r="3" 
            fill="var(--bg-solid)" 
            style={{ transition: "cx 0.1s ease-out, cy 0.1s ease-out" }}
          />
        </g>

        {/* Right Eye */}
        <g>
          <circle cx="135" cy="85" r="22" fill="var(--btn-bg)" stroke="var(--outline)" strokeWidth="3" />
          {/* Right Pupil */}
          <circle 
            cx={135 + eyeX} 
            cy={85 + eyeY} 
            r="10" 
            fill="var(--on-background)"
            style={{ transition: "cx 0.1s ease-out, cy 0.1s ease-out" }}
          />
          {/* Pupil Catchlight */}
          <circle 
            cx={135 + eyeX - 3} 
            cy={85 + eyeY - 3} 
            r="3" 
            fill="var(--bg-solid)" 
            style={{ transition: "cx 0.1s ease-out, cy 0.1s ease-out" }}
          />
        </g>

        {/* Blushes (appear on hover) */}
        <circle cx="45" cy="115" r="12" fill="#ff7979" opacity={isHovering ? 0.4 : 0} style={{ transition: "opacity 0.3s ease" }} />
        <circle cx="155" cy="115" r="12" fill="#ff7979" opacity={isHovering ? 0.4 : 0} style={{ transition: "opacity 0.3s ease" }} />

        {/* Mouth */}
        <path
          d={`M 75 130 Q 100 ${130 + smileCurve} 125 130`}
          stroke="var(--on-background)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="transparent"
          style={{ transition: "d 0.2s ease-out" }}
        />
      </svg>
      
      {/* Optional decorative hint */}
      <span className="absolute bottom-4 text-[10px] uppercase tracking-widest text-muted-2 font-mono opacity-50" style={{ color: "var(--muted-2)" }}>
        Interactive
      </span>
    </div>
  );
}
