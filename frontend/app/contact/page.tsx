"use client";
import { useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    type: "Web System", // Matched with one of the button options
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Added full localhost URL
      await axios.post("https://devhub-portfolio-gtu4.vercel.app/api/inquiry", form);
      setStatus("Transmission_Successful.");
      setForm({ name: "", email: "", message: "", type: "Web System" });
    } catch (err) {
      setStatus("Error: Connection_Refused.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen text-black font-sans selection:bg-[#b87333] selection:text-white overflow-x-hidden">
      <Navbar />

      <main className="pt-48 pb-32 px-8 md:px-24 relative">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.02] pointer-events-none select-none overflow-hidden">
          <span className="text-[20vw] font-black leading-none uppercase translate-x-20 rotate-90 inline-block">
            Contact
          </span>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* HEADER SECTION */}
          <div className="flex flex-col lg:flex-row justify-between items-start mb-40 gap-12 lg:gap-20">
            {/* LEFT SIDE: BRAND STATEMENT */}
            <div className="w-full lg:max-w-[60%] xl:max-w-[55%]">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-[2px] bg-[#b87333]" />
                <span className="text-[#b87333] text-[10px] font-black tracking-[0.6em] uppercase">
                  Portal_Initialised
                </span>
              </div>

              <h1 className="text-6xl md:text-7xl xl:text-8xl font-light tracking-tighter mb-10 leading-[0.9] text-black">
                LET'S <br />
                <span className="italic font-serif text-[#b87333] block mt-1">
                  Collaborate.
                </span>
              </h1>

              <div className="relative pl-8 py-2">
                <div className="absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-[#b87333] to-transparent" />
                <p className="text-black text-xl font-medium leading-tight tracking-tight mb-4">
                  Engineering the next generation of{" "}
                  <br className="hidden md:block" /> digital infrastructure.
                </p>
                <p className="text-gray-400 leading-relaxed text-[11px] uppercase tracking-[0.3em] font-bold">
                  Based in Wah Cantt // 33.77°N <br />
                  Operating globally at the intersection of logic and aesthetic.
                </p>
              </div>
            </div>

            {/* RIGHT SIDE: DATA CREDENTIALS */}
            <div className="w-full lg:w-auto lg:min-w-[350px] lg:pt-24">
              <div className="space-y-12 border-t lg:border-t-0 lg:border-l border-gray-100 pt-10 lg:pt-0 lg:pl-16 relative">
                <div className="group">
                  <p className="text-[9px] uppercase tracking-[0.5em] text-[#b87333] font-black mb-3">
                    Electronic_Protocol
                  </p>
                  <a
                    href="mailto:armaghanali304@gmail.com"
                    className="text-lg xl:text-xl font-light tracking-tight hover:text-[#b87333] transition-all duration-500 block break-all text-black border-b border-transparent hover:border-[#b87333]/30 pb-1"
                  >
                    armaghanali304@gmail.com
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-12">
                  <div className="group">
                    <p className="text-[9px] uppercase tracking-[0.5em] text-[#b87333] font-black mb-3">
                      Voice_Comm
                    </p>
                    <p className="text-lg font-bold tracking-widest text-black">
                      +92 301 5256387
                    </p>
                  </div>

                  <div className="group">
                    <p className="text-[9px] uppercase tracking-[0.5em] text-[#b87333] font-black mb-3">
                      Grid_Location
                    </p>
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] leading-relaxed">
                      Wah Cantt, Punjab <br />
                      Industrial Zone // P1
                    </p>
                  </div>
                </div>

                <div className="pt-6 flex items-center gap-3 border-t border-gray-50">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                  <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">
                    Local_Time:{" "}
                    {new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    GMT+5
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* SIDEBAR MODULES */}
            <div className="lg:col-span-4 py-20 pr-12 hidden lg:block border-r border-gray-100">
              <div className="sticky top-48 space-y-20">
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-[3px] h-12 bg-[#b87333]" />
                  <div className="flex justify-between items-center mb-10">
                    <h4 className="text-[11px] font-black uppercase tracking-[0.6em] text-black">
                      System_Manifest
                    </h4>
                    <span className="text-[8px] font-mono text-[#b87333] animate-pulse">
                      REC ●
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {[
                      { label: "Web Systems", code: "MOD_01" },
                      { label: "Enterprise UI", code: "MOD_02" },
                      { label: "Cloud Infrastructure", code: "MOD_03" },
                      { label: "Neural Logic", code: "MOD_04" },
                    ].map((item) => (
                      <li
                        key={item.label}
                        className="group relative py-4 px-2 overflow-hidden transition-all duration-500 hover:pl-6"
                      >
                        <div className="absolute inset-0 bg-[#b87333]/[0.03] -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />
                        <div className="relative z-10 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <span className="text-[10px] font-mono text-[#b87333] opacity-0 group-hover:opacity-100 transition-opacity">
                              {item.code}
                            </span>
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 group-hover:text-black transition-colors">
                              {item.label}
                            </span>
                          </div>
                          <div className="w-12 h-[1px] bg-gray-100 group-hover:bg-[#b87333] transition-colors" />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b87333] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#b87333]"></span>
                      </span>
                      <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">
                        Node_Status: Active
                      </span>
                    </div>
                  </div>

                  <div className="relative group cursor-crosshair">
                    <div className="relative p-8 bg-[#111] border border-gray-900 overflow-hidden">
                      <div className="absolute inset-0 w-full h-[2px] bg-[#b87333]/20 animate-scan z-20 pointer-events-none" />
                      <div className="relative z-10 space-y-4">
                        <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                          <div className="w-1 h-1 bg-[#b87333] rounded-full" />
                          <p className="text-[9px] font-mono text-[#b87333] tracking-[0.2em]">
                            ENCRYPTION_PROTOCOL
                          </p>
                        </div>
                        <p className="text-[10px] font-mono text-gray-400 leading-relaxed uppercase tracking-tighter">
                          Secure transmission tunnel established via
                          <span className="text-white"> SHA-256</span>. Sub-zero
                          latency processing engaged.
                        </p>
                        <div className="pt-2 flex justify-between items-end">
                          <div>
                            <p className="text-[8px] font-mono text-gray-600">
                              TIMESTAMP
                            </p>
                            <p className="text-[10px] font-mono text-white tracking-widest">
                              {new Date().getFullYear()}_INT_ALPHA
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-[8px] font-mono text-gray-600">
                              RESPONSE_VAL
                            </p>
                            <p className="text-[10px] font-mono text-[#b87333] font-bold">
                              14.2H_SYNC
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-[#b87333]" />
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-[#b87333]" />
                  </div>
                </div>
              </div>
            </div>

            {/* CONTACT FORM */}
            <form
              onSubmit={handleSubmit}
              className="lg:col-span-8 py-20 lg:pl-20 space-y-16"
            >
              <div className="space-y-6">
                <label className="text-[11px] uppercase tracking-[0.4em] font-extrabold text-[#b87333]">
                  00. Project Classification
                </label>
                <div className="flex flex-wrap gap-4">
                  {[
                    "Web System",
                    "Mobile App",
                    "Infrastructure",
                    "Branding",
                  ].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setForm({ ...form, type })}
                      className={`px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest border-2 transition-all duration-500 ${
                        form.type === type
                          ? "border-[#b87333] bg-[#b87333] text-white shadow-lg shadow-[#b87333]/20"
                          : "border-gray-200 text-gray-500 hover:border-gray-900 hover:text-black"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                <div className="group relative">
                  <div className="absolute -left-6 top-0 h-full w-[2px] bg-gray-200 group-focus-within:bg-[#b87333] transition-colors duration-500" />
                  <label className="text-[11px] uppercase tracking-[0.4em] font-extrabold text-black/60 group-focus-within:text-[#b87333] transition-colors">
                    01. Identity
                  </label>
                  <input
                    className="w-full bg-transparent border-b-2 border-gray-200 py-6 outline-none focus:border-[#b87333] transition-all text-xl font-medium placeholder:text-gray-400"
                    placeholder="Name / Organization"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    value={form.name}
                    required
                  />
                  <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#b87333] group-focus-within:w-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]" />
                </div>

                <div className="group relative">
                  <div className="absolute -left-6 top-0 h-full w-[2px] bg-gray-200 group-focus-within:bg-[#b87333] transition-colors duration-500" />
                  <label className="text-[11px] uppercase tracking-[0.4em] font-extrabold text-black/60 group-focus-within:text-[#b87333] transition-colors">
                    02. Digital Address
                  </label>
                  <input
                    className="w-full bg-transparent border-b-2 border-gray-200 py-6 outline-none focus:border-[#b87333] transition-all text-xl font-medium placeholder:text-gray-400"
                    placeholder="email@provider.com"
                    type="email"
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    value={form.email}
                    required
                  />
                  <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#b87333] group-focus-within:w-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]" />
                </div>
              </div>

              <div className="group relative">
                <div className="absolute -left-6 top-0 h-full w-[2px] bg-gray-200 group-focus-within:bg-[#b87333] transition-colors duration-500" />
                <div className="flex justify-between items-end">
                  <label className="text-[11px] uppercase tracking-[0.4em] font-extrabold text-black/60 group-focus-within:text-[#b87333] transition-colors">
                    03. Technical Requirements
                  </label>
                  <span className="text-[10px] font-mono font-bold text-gray-400 group-focus-within:text-[#b87333] transition-colors">
                    {form.message.length} / 1000
                  </span>
                </div>
                <textarea
                  className="w-full bg-transparent border-b-2 border-gray-200 py-8 h-40 outline-none focus:border-[#b87333] transition-all text-xl font-medium placeholder:text-gray-400 resize-none leading-relaxed"
                  placeholder="Synthesize your vision into words..."
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  value={form.message}
                  required
                />
                <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#b87333] group-focus-within:w-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]" />
              </div>

              <div className="flex flex-col lg:flex-row items-center justify-between gap-10 pt-10">
                <div className="flex items-center gap-6">
                  <div className="relative flex items-center justify-center">
                    <div
                      className={`absolute w-14 h-14 rounded-full border-2 border-[#b87333]/30 ${loading ? "animate-ping" : ""}`}
                    />
                    <div
                      className={`w-4 h-4 rounded-full shadow-sm ${status.includes("Error") ? "bg-red-500" : "bg-[#b87333]"}`}
                    />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">
                      System_Status
                    </p>
                    <p className="font-mono text-[12px] font-bold uppercase tracking-[0.1em] text-black">
                      {status || "Ready_For_Transmission"}
                    </p>
                  </div>
                </div>

                <button
                  className="group relative w-full lg:w-80 h-24 overflow-hidden bg-black text-white rounded-full transition-all duration-500 hover:shadow-[0_25px_50px_-12px_rgba(184,115,51,0.4)]"
                  type="submit"
                  disabled={loading}
                >
                  <div className="absolute inset-0 w-0 bg-[#b87333] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-full" />
                  <div className="relative flex items-center justify-center gap-4 group-hover:gap-8 transition-all duration-500">
                    <span className="text-[11px] font-black uppercase tracking-[0.6em]">
                      {loading ? "Transmitting" : "Initiate Contact"}
                    </span>
                    <svg
                      className="w-6 h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx global>{`
        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(400%);
          }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
      `}</style>
    </div>
  );
}
