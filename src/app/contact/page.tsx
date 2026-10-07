"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";

/* ─────────────────────────────────────────────────────────────
   Type helpers
───────────────────────────────────────────────────────────── */
const T = {
  light: (
    min: number, vw: number, max: number,
    extra: React.CSSProperties = {}
  ): React.CSSProperties => ({
    fontFamily: "var(--font-light)",
    fontWeight: 300,
    fontSize: `clamp(${min}px, ${vw}vw, ${max}px)`,
    ...extra,
  }),
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

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    projectType: "",
    budget: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const bodyText = `Name: ${formData.name}
Company: ${formData.company || "N/A"}
Email: ${formData.email}
Inquiry Type: ${formData.projectType || "N/A"}
Company Size: ${formData.budget || "N/A"}

Message:
${formData.message}`;

    const mailtoLink = `mailto:sudha.vlbit@gmail.com?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
    
    // Open default email client
    window.location.href = mailtoLink;

    // Reset form
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", company: "", email: "", projectType: "", budget: "", message: "" });
    }, 500);
  };
  
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.querySelectorAll(".stagger-enter"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.2 }
      );
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black text-white w-full flex flex-col p-6 overflow-x-hidden"
    >
      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col justify-between">
        
        {/* Top Header */}
        <div className="w-full flex items-start justify-between mt-4 mb-20 stagger-enter">
          <Link href="/" className="hover:opacity-70 transition-opacity">
            {/* Simple logo mimicking the one in the image */}
            <span style={{ fontSize: "28px", fontWeight: 700, lineHeight: 1, color: "white", fontFamily: "inherit" }}>S</span>
          </Link>
        </div>

        {/* Main Content Layout */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-16 items-start">
          
          {/* Left Column - Headline */}
          <div className="stagger-enter">
            <h1 
              style={T.regular(32, 4, 56, { 
                lineHeight: 1.1, 
                textTransform: "uppercase",
                maxWidth: "600px"
              })}
            >
              LET'S BUILD SOMETHING<br />
              GREAT TOGETHER.
            </h1>
          </div>

          {/* Right Column - Form Card */}
          <div className="stagger-enter rounded-3xl p-8 md:p-12 w-full" style={{ backgroundColor: "#D4D4D4", color: "#111" }}>
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-20">
                <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mb-4">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <h3 style={T.regular(24, 2, 32, { color: "#111", textTransform: "uppercase" })}>Message Sent!</h3>
                <p style={T.light(16, 1.5, 18, { color: "#555" })}>Thanks for reaching out. I'll get back to you soon.</p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="mt-8 border border-[#111] px-6 py-2 rounded-full hover:bg-[#111] hover:text-[#D4D4D4] transition-colors"
                  style={T.regular(14, 1, 16, { textTransform: "uppercase" })}
                >
                  Send Another
                </button>
              </div>
            ) : (
            <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label style={T.regular(16, 1.5, 18, { color: "#111" })}>Name *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Your Name" 
                    className="contact-input" 
                    style={{ borderColor: "#8A8A8A", color: "#111" }}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label style={T.regular(16, 1.5, 18, { color: "#111" })}>COMPANY</label>
                  <input 
                    type="text" 
                    placeholder="Company (Optional)" 
                    className="contact-input"
                    style={{ borderColor: "#8A8A8A", color: "#111" }}
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label style={T.regular(16, 1.5, 18, { color: "#111" })}>Email *</label>
                <input 
                  type="email" 
                  required
                  placeholder="hello@example.com" 
                  className="contact-input"
                  style={{ borderColor: "#8A8A8A", color: "#111" }}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label style={T.regular(16, 1.5, 18, { color: "#111" })}>Inquiry Type</label>
                  <input 
                    type="text"
                    className="contact-input"
                    style={{ borderColor: "#8A8A8A", color: "#111" }}
                    placeholder="e.g. Consulting, Training, Speaking..."
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label style={T.regular(16, 1.5, 18, { color: "#111" })}>Company Size</label>
                  <select 
                    className="contact-input contact-select"
                    style={{ borderColor: "#8A8A8A", color: "#111" }}
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  >
                    <option value="" disabled>Select Company Size</option>
                    <option value="1-50">1 - 50 Employees</option>
                    <option value="51-200">51 - 200 Employees</option>
                    <option value="201-1000">201 - 1000 Employees</option>
                    <option value="1000+">1000+ Employees</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label style={T.regular(16, 1.5, 18, { color: "#111" })}>Message *</label>
                <textarea 
                  required
                  placeholder="Tell me about your organization's needs..." 
                  className="contact-input"
                  style={{ borderColor: "#8A8A8A", color: "#111", minHeight: "100px" }}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              {status === "error" && (
                <div className="text-red-600 font-medium text-sm">
                  Something went wrong. Please check your Web3Forms Access Key or try again later.
                </div>
              )}

              <div className="mt-4">
                <button 
                  type="submit" 
                  disabled={status === "submitting"}
                  className="hover:opacity-60 transition-opacity disabled:opacity-50"
                  style={{
                    ...T.regular(16, 1.5, 18, { color: "#111", textTransform: "uppercase" }),
                    borderBottom: "1px solid #111",
                    paddingBottom: "4px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  {status === "submitting" ? "SENDING..." : "SEND MESSAGE"}
                  {status !== "submitting" && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  )}
                </button>
              </div>

            </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full flex flex-col md:flex-row items-center justify-between border-t border-white/20 pt-8 mt-12 pb-4 stagger-enter">
          <div style={T.light(12, 1, 14, { color: "#fff", textTransform: "lowercase" })}>
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
                style={T.light(11, 0.9, 13, { color: "#fff", textTransform: "uppercase", letterSpacing: "1px" })}
              >
                {link.label}
              </a>
            ))}
          </div>
        </footer>

      </div>
    </div>
  );
}
