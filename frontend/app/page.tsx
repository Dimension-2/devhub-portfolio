"use client";

import { useEffect, useState } from "react";
import axios from "axios";
// Assuming Navbar and Footer exist in your project
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const DEFAULT_SERVICES = [
  {
    title: "Software Infrastructure",
    description: "Engineering high-performance back-end systems for scale.",
  },
  {
    title: "Digital Architecture",
    description: "Bespoke UI/UX built on architectural design principles.",
  },
  {
    title: "System Integration",
    description: "Seamless full-stack capabilities for global enterprises.",
  },
  {
    title: "Data Strategy",
    description:
      "Visualizing complex data through interactive digital environments.",
  },
];

export default function Home() {
  const [services, setServices] = useState<
    { title: string; description: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/services");
        setServices(res.data.length > 0 ? res.data : DEFAULT_SERVICES);
      } catch (error) {
        setServices(DEFAULT_SERVICES);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="bg-[#FFFFFF] min-h-screen font-sans text-black selection:bg-[#b87333] selection:text-white overflow-x-hidden">
      <Navbar />

      <main className="relative pt-32">
        {/* HERO SECTION */}
        <section className="px-8 md:px-16 lg:px-24 py-10 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 border border-gray-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] bg-white min-h-[700px] overflow-hidden">
            {/* LEFT: TEXT CONTENT */}
            {/* Removed border-r to eliminate the central dim line */}
            <div className="p-12 md:p-20 flex flex-col justify-center space-y-12 bg-white z-10">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-[1px] bg-[#b87333]" />
                  <span className="text-[#b87333] text-[10px] font-bold tracking-[0.5em] uppercase">
                    Established 2026
                  </span>
                </div>
                <h1 className="text-6xl md:text-8xl font-light leading-[0.85] tracking-tighter uppercase text-black">
                  Engineering <br />
                  <span className="text-[#b87333] italic font-serif normal-case">
                    Digital
                  </span>{" "}
                  <br />
                  Excellence
                </h1>
              </div>

              <p className="text-lg text-gray-500 max-w-md leading-relaxed border-l border-gray-200 pl-8">
                DevelopersHub Corporation delivers high-end software
                infrastructure. Based in Wah Cantt, we build products for those
                who value technical precision.
              </p>

              <div>
                <button className="group relative px-12 py-6 bg-black text-white text-[10px] font-bold uppercase tracking-[0.4em] overflow-hidden transition-all shadow-xl">
                  <span className="relative z-10">Explore Projects</span>
                  <div className="absolute inset-0 bg-[#b87333] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
              </div>
            </div>

            {/* RIGHT: PERFECTED MINIMALIST DIAMOND */}
            {/* Set background to pure white to match the left side perfectly */}
            <div className="relative flex items-center justify-center bg-white group">
              {/* Central Focal Unit */}
              <div className="relative">
                {/* Refined Halo Ring (Slightly smaller and thinner) */}
                <div className="absolute inset-0 border border-[#b87333]/10 scale-[1.6] rotate-45 group-hover:rotate-90 transition-transform duration-[3000ms]" />

                {/* The Precision Copper Diamond (Reduced Size: w-28 h-28) */}
                <div className="relative w-28 h-28 bg-[#b87333] rotate-45 shadow-[25px_25px_60px_rgba(184,115,51,0.15)] flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                  {/* Core Point (Refined for smaller scale) */}
                  <div className="w-2.5 h-2.5 bg-white/20 rounded-full blur-[1px]" />

                  {/* High-Precision Corner Markers */}
                  <div className="absolute -top-1 -left-1 w-2 h-2 bg-black shadow-sm" />
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-black shadow-sm" />
                </div>
              </div>

              {/* Subtle Technical Footer */}
              <div className="absolute bottom-10 right-10 flex items-center gap-3 opacity-30">
                <span className="text-[8px] font-mono text-black tracking-[0.5em] uppercase">
                  Architecture_v1.0.4
                </span>
                <div className="w-8 h-[1px] bg-black" />
              </div>
            </div>
          </div>
        </section>
        {/* SECTION 1: CORE FOCUS BAR (Replaces 500+ Stats) */}
        <section className="px-8 md:px-16 lg:px-24 bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 bg-white border border-gray-100 shadow-sm">
            {/* CARD 01 */}
            <div className="relative p-16 text-center group cursor-pointer overflow-hidden bg-white transition-all duration-700">
              {/* Sliding Copper Background */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#b87333] to-[#d4af37] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]" />

              {/* Content Layer */}
              <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-2">
                <div className="text-[10px] font-bold tracking-[0.6em] text-[#b87333] group-hover:text-white uppercase mb-6 transition-colors duration-500">
                  Focus_01
                </div>
                <div className="text-3xl font-light tracking-tighter uppercase text-black group-hover:text-white transition-colors duration-500 leading-tight">
                  Strategic <br />
                  <span className="group-hover:italic transition-all">
                    Architecture
                  </span>
                </div>

                {/* Floating Detail Line */}
                <div className="w-0 group-hover:w-12 h-[1px] bg-white/50 mx-auto mt-6 transition-all duration-700 delay-100" />
              </div>
            </div>

            {/* CARD 02 */}
            <div className="relative p-16 text-center group cursor-pointer overflow-hidden bg-white transition-all duration-700">
              {/* Sliding Copper Background */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#b87333] to-[#d4af37] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]" />

              {/* Content Layer */}
              <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-2">
                <div className="text-[10px] font-bold tracking-[0.6em] text-[#b87333] group-hover:text-white uppercase mb-6 transition-colors duration-500">
                  Focus_02
                </div>
                <div className="text-3xl font-light tracking-tighter uppercase text-black group-hover:text-white transition-colors duration-500 leading-tight">
                  Enterprise <br />
                  <span className="group-hover:italic transition-all">
                    Infrastructure
                  </span>
                </div>

                <div className="w-0 group-hover:w-12 h-[1px] bg-white/50 mx-auto mt-6 transition-all duration-700 delay-100" />
              </div>
            </div>

            {/* CARD 03 */}
            <div className="relative p-16 text-center group cursor-pointer overflow-hidden bg-white transition-all duration-700">
              {/* Sliding Copper Background */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#b87333] to-[#d4af37] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]" />

              {/* Content Layer */}
              <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-2">
                <div className="text-[10px] font-bold tracking-[0.6em] text-[#b87333] group-hover:text-white uppercase mb-6 transition-colors duration-500">
                  Focus_03
                </div>
                <div className="text-3xl font-light tracking-tighter uppercase text-black group-hover:text-white transition-colors duration-500 leading-tight">
                  Technical <br />
                  <span className="group-hover:italic transition-all">
                    Scalability
                  </span>
                </div>

                <div className="w-0 group-hover:w-12 h-[1px] bg-white/50 mx-auto mt-6 transition-all duration-700 delay-100" />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: ARCHITECTURAL PRINCIPLES (Obsidian & Copper) */}
        <section className="pt-20 pb-40 px-8 md:px-24 bg-[#050505] text-white relative overflow-hidden group/master">
          {/* Depth Elements: Floating particles */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-[#b87333]/40 rounded-full animate-ping" />
            <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-[#b87333]/20 rounded-full animate-pulse" />
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative z-10">
              {/* Animated Label */}
              <div className="flex items-center gap-4 mb-8 group">
                <div className="w-12 h-[1px] bg-[#b87333] group-hover:w-20 transition-all duration-700" />
                <h2 className="text-[#b87333] text-xs font-bold tracking-[0.6em] uppercase">
                  Engineering Core
                </h2>
              </div>

              {/* Kinetic Heading */}
              <p className="text-5xl md:text-7xl font-light tracking-tighter leading-[0.9] mb-16 uppercase">
                Built on <br />
                <span className="relative inline-block italic font-serif text-[#b87333] normal-case mt-2 group/text">
                  Technical Precision
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#b87333] to-transparent group-hover/master:w-full transition-all duration-1000" />
                </span>
              </p>

              {/* Principles */}
              <div className="grid grid-cols-1 gap-12">
                {[
                  {
                    title: "Modular Systems",
                    desc: "Interlocking code structures for seamless growth.",
                    tag: "STRUCT_v4",
                  },
                  {
                    title: "Scalable Infrastructure",
                    desc: "Systems designed to handle global-tier traffic.",
                    tag: "SCALE_OPT",
                  },
                  {
                    title: "Minimalist Logic",
                    desc: "Removing noise to prioritize pure performance.",
                    tag: "ZERO_VOID",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="group cursor-default border-l border-white/5 pl-8 hover:border-[#b87333] transition-all duration-500 relative"
                  >
                    <span className="absolute right-0 top-0 text-[8px] font-mono text-[#b87333] opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                      {item.tag}
                    </span>

                    <div className="flex items-baseline gap-4 mb-3">
                      <span className="text-sm font-serif italic text-[#b87333] opacity-50 group-hover:opacity-100 transition-opacity">
                        0{idx + 1}
                      </span>
                      <h3 className="text-xl tracking-[0.2em] uppercase font-light group-hover:tracking-[0.3em] transition-all duration-500">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-gray-500 text-sm tracking-wide max-w-sm group-hover:text-gray-300 transition-colors">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side: Multi-Layered Orbital Core */}
            <div className="relative aspect-square flex items-center justify-center">
              {/* Outer Glow Path */}
              <div className="absolute w-[110%] h-[110%] border border-white/[0.03] rounded-full scale-90 group-hover/master:scale-100 transition-transform duration-1000" />

              {/* Main Visual Box */}
              <div className="relative w-4/5 h-4/5 bg-gradient-to-br from-[#0D0D0D] to-[#000] border border-white/10 flex items-center justify-center group/core overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)]">
                {/* Scanning Light */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#b87333]/5 to-transparent -translate-y-full group-hover/master:translate-y-full transition-transform duration-[2500ms] ease-in-out" />

                {/* HUD Overlay */}
                <div className="absolute top-6 left-6 flex flex-col gap-1">
                  <div className="w-8 h-[1px] bg-[#b87333]/40" />
                  <span className="text-[7px] font-mono text-white/30 uppercase tracking-[0.5em]">
                    System_Verified
                  </span>
                </div>

                {/* The Central Engine */}
                <div className="relative flex items-center justify-center">
                  {/* Ring 1: Slow Orbital */}
                  <div className="absolute w-56 h-56 border-[0.5px] border-[#b87333]/10 rounded-full animate-[spin_20s_linear_infinite]" />

                  {/* Ring 2: Fast Counter-Orbital */}
                  <div className="absolute w-44 h-44 border-[0.5px] border-white/5 rounded-full animate-[spin_10s_linear_infinite_reverse]" />

                  {/* The Pulsing Frame: AUTO-SPIN LOGIC
              By default: animate-[spin_10s_linear_infinite]
              On hover: group-hover/master:animate-[spin_2s_linear_infinite]
          */}
                  <div className="w-32 h-32 border border-[#b87333]/40 flex items-center justify-center rotate-45 animate-[spin_12s_linear_infinite] group-hover/master:animate-[spin_3s_linear_infinite] transition-all duration-700">
                    {/* The Heart: Floating Copper Diamond */}
                    <div className="w-10 h-10 bg-[#b87333] shadow-[0_0_50px_rgba(184,115,51,0.4)] flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Bottom Metadata */}
                <div className="absolute bottom-6 right-6 text-right">
                  <span className="text-[7px] font-mono text-white/30 uppercase tracking-[0.5em] block mb-1">
                    DevHub_v.2026
                  </span>
                  <div className="flex justify-end gap-1">
                    <div className="w-1 h-1 bg-[#b87333] rounded-full" />
                    <div className="w-4 h-1 bg-white/10" />
                  </div>
                </div>
              </div>

              {/* Floating Corner Accents */}
              <div className="absolute -bottom-5 -left-5 w-20 h-20 border-b border-l border-[#b87333]/30" />
              <div className="absolute -top-5 -right-5 w-20 h-20 border-t border-r border-[#b87333]/30" />
            </div>
          </div>
        </section>
        {/* SERVICES CATALOG */}
        <section className="py-40 px-8 md:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-10 border-b border-gray-100 pb-16 relative group">
              {/* Left Section: Branding & Main Title */}
              <div className="space-y-6 relative z-10">
                <div className="flex items-center gap-4">
                  {/* Active Pulse Indicator */}
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b87333] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#b87333]"></span>
                  </div>
                  <h2 className="text-[#b87333] text-xs font-bold tracking-[0.6em] uppercase">
                    Service Modules
                  </h2>
                </div>

                <p className="text-6xl md:text-7xl font-light text-black tracking-tighter uppercase leading-[0.85]">
                  Gateway to <br />
                  <span className="italic font-serif text-[#b87333] normal-case bg-gradient-to-r from-[#b87333] via-[#d4af37] to-[#b87333] bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent">
                    Modern Systems
                  </span>
                </p>
              </div>

              {/* Right Section: Technical Description & Meta */}
              <div className="flex flex-col items-end gap-4">
                {/* Module Counter Label */}
                <div className="text-[10px] font-mono text-gray-300 tracking-[0.5em] uppercase mb-2">
                  System_Registry // 2026
                </div>

                <p className="text-gray-400 text-[10px] md:text-xs max-w-[240px] text-right leading-relaxed uppercase tracking-[0.25em] font-medium border-r-2 border-[#b87333] pr-6 transition-all group-hover:pr-8">
                  Standardizing excellence through{" "}
                  <span className="text-black">modular engineering</span> and
                  technical logic modules.
                </p>
              </div>

              {/* Bottom Decorative Progress Bar (Animated on section load/hover) */}
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-100 overflow-hidden">
                <div className="w-full h-full bg-[#b87333] -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-l border-t border-gray-100">
              {loading ? (
                <div className="col-span-full text-center py-20 text-gray-400 animate-pulse font-mono tracking-widest uppercase text-sm">
                  LOADING_MODULES...
                </div>
              ) : (
                services.map((s, i) => (
                  <div
                    key={i}
                    className="p-12 border-r border-b border-gray-100 hover:bg-black group transition-all duration-700 cursor-default relative"
                  >
                    <div className="text-[#b87333] font-mono text-[10px] mb-12 tracking-[0.3em]">
                      0{i + 1} // MODULE
                    </div>
                    <h3 className="text-xl font-bold mb-6 uppercase tracking-tighter group-hover:text-white transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-sm text-gray-500 group-hover:text-gray-400 leading-loose">
                      {s.description}
                    </p>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-[#b87333] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx global>{`
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
      `}</style>
    </div>
  );
}

function StatCard({
  count,
  label,
  isMiddle,
}: {
  count: string;
  label: string;
  isMiddle?: boolean;
}) {
  return (
    <div
      className={`p-16 ${isMiddle ? "md:border-x border-gray-100" : ""} text-center group hover:bg-gray-50 transition-all duration-500`}
    >
      <div className="text-6xl font-light text-[#b87333] mb-4 tracking-tighter group-hover:scale-110 transition-transform">
        {count}
      </div>
      <div className="text-gray-400 uppercase tracking-[0.4em] text-[9px] font-black">
        {label}
      </div>
    </div>
  );
}
