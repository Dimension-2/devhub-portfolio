"use client";
import React, { useState, useEffect } from "react";

// --- QUANTUM DECRYPTION HOOK ---
const useQuantumTypewriter = (finalText: string, delay: number = 500) => {
  const [text, setText] = useState("");
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*_+=<>?/";

  useEffect(() => {
    let iteration = 0;
    let interval: NodeJS.Timeout;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setText(
          finalText
            .split("")
            .map((char, index) => {
              if (index < iteration) return finalText[index];
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join(""),
        );

        if (iteration >= finalText.length) {
          clearInterval(interval);
        }
        iteration += 1 / 3; // Speed of stabilization
      }, 30);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [finalText, delay]);

  return text;
};

export default function AdminDashboard() {
  const helloText = useQuantumTypewriter("HELLO", 500);
  const adminText = useQuantumTypewriter("ADMIN", 1200);

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col items-center justify-center text-center overflow-hidden">
      <div className="relative">
        {/* QUANTUM TUNNELING BAR */}
        <div className="absolute left-1/2 -translate-x-1/2 w-screen h-[1px] bg-[#b87333] shadow-[0_0_20px_#b87333] animate-tunnel pointer-events-none z-50 opacity-50" />

        <div className="relative z-10 space-y-4">
          {/* SYSTEM TAG */}
          <div className="flex items-center justify-center gap-4 mb-10 overflow-hidden">
            <div className="h-[1px] w-12 bg-white/10" />
            <span className="text-[9px] font-mono tracking-[1.5em] text-[#b87333] uppercase animate-pulse">
              Quantum_State: Stabilizing
            </span>
            <div className="h-[1px] w-12 bg-white/10" />
          </div>

          <h1 className="relative">
            {/* HELLO LAYER */}
            <span className="block text-[120px] md:text-[180px] font-black tracking-[-0.05em] leading-[0.8] text-white relative quantum-flicker">
              {helloText}
              {/* Chromatic Aberration Layers */}
              <span className="absolute inset-0 text-[#ff0000] opacity-10 -translate-x-1 translate-y-1 blur-[1px] mix-blend-screen">
                {helloText}
              </span>
              <span className="absolute inset-0 text-[#00ffff] opacity-10 translate-x-1 -translate-y-1 blur-[1px] mix-blend-screen">
                {helloText}
              </span>
            </span>

            {/* ADMIN LAYER */}
            <span className="block text-[120px] md:text-[180px] font-thin italic font-serif text-[#b87333] leading-[0.8] relative opacity-90 transition-all duration-1000">
              {adminText}
              {/* Digital Shadow */}
              <span className="absolute inset-0 text-white/5 skew-x-12 translate-y-4 -z-10 blur-sm">
                {adminText}
              </span>
            </span>
          </h1>

          {/* REAL-TIME COORDINATES DISPLACEMENT */}
          <div className="mt-20 grid grid-cols-3 gap-12 border-t border-white/5 pt-8 opacity-40">
            <div className="text-left space-y-1">
              <p className="text-[7px] text-gray-500 font-mono">NODE_OS</p>
              <p className="text-[9px] text-white font-mono tracking-tighter">
                VH_HQ_4.0
              </p>
            </div>
            <div className="text-center space-y-1">
              <p className="text-[7px] text-gray-500 font-mono">PKT_LOSS</p>
              <p className="text-[9px] text-green-500 font-mono tracking-tighter">
                0.000%
              </p>
            </div>
            <div className="text-right space-y-1">
              <p className="text-[7px] text-gray-500 font-mono">LATENCY</p>
              <p className="text-[9px] text-white font-mono tracking-tighter">
                1.04ms
              </p>
            </div>
          </div>
        </div>

        {/* BACKGROUND DIGITAL NOISE (SUBTLE) */}
        <div className="absolute inset-0 -z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none scale-150 animate-grain" />
      </div>

      <style jsx>{`
        @keyframes tunnel {
          0% {
            top: -20%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 120%;
            opacity: 0;
          }
        }
        .animate-tunnel {
          animation: tunnel 3s cubic-bezier(0.19, 1, 0.22, 1) infinite;
        }

        @keyframes grain {
          0%,
          100% {
            transform: translate(0, 0);
          }
          10% {
            transform: translate(-5%, -5%);
          }
          30% {
            transform: translate(5%, -10%);
          }
          50% {
            transform: translate(-10%, 5%);
          }
          70% {
            transform: translate(10%, 10%);
          }
          90% {
            transform: translate(-5%, 5%);
          }
        }
        .animate-grain {
          animation: grain 1s steps(10) infinite;
        }

        .quantum-flicker {
          animation: flicker 0.1s infinite secondary;
        }

        @keyframes flicker {
          0% {
            opacity: 0.98;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
