"use client";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#050505] border-t border-white/10 pt-16 pb-8 overflow-hidden font-sans">
      {/* SHARP AMBIENCE: Subtle corner glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#b87333] opacity-[0.07] blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10">
        
        {/* SMART GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start pb-16">
          
          {/* BRAND: PURE WHITE & COPPER */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="group flex items-center gap-5">
              <div className="relative w-10 h-10 flex items-center justify-center">
                {/* Spin Logo */}
                <div className="absolute inset-0 border border-[#b87333] rotate-45 transition-all duration-700 group-hover:rotate-[405deg] group-hover:bg-[#b87333]" />
                <span className="relative z-10 text-[#FFFFFF] font-light text-lg group-hover:text-black transition-colors">D</span>
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl tracking-[0.4em] font-light text-[#FFFFFF] uppercase leading-none">
                  DEV<span className="font-bold text-[#b87333]">HUB</span>
                </h2>
                <span className="text-[7px] tracking-[0.6em] text-white/40 uppercase mt-1">Studio_Wah_Cantt</span>
              </div>
            </Link>
            <p className="text-[11px] text-gray-400 uppercase tracking-[0.3em] font-light leading-relaxed max-w-xs">
              Precision engineering for high-performance <br /> digital infrastructure. 
            </p>
          </div>

          {/* SMART NAV: WITH HOVER EFFECTS */}
          <div className="md:col-span-3 space-y-5">
            <p className="text-[9px] font-bold uppercase tracking-[0.6em] text-[#b87333]">/Registry</p>
            <nav className="flex flex-col gap-4">
              {["Home", "Services", "Work", "Contact"].map((item) => (
                <Link 
                  key={item} 
                  href={`/${item.toLowerCase()}`} 
                  className="group relative flex items-center gap-3 w-fit"
                >
                  {/* Hover Indicator: Copper Dash */}
                  <span className="w-0 h-[1px] bg-[#b87333] transition-all duration-300 group-hover:w-4" />
                  
                  {/* BRIGHT WHITE TEXT with Glow on Hover */}
                  <span className="text-[10px] text-[#FFFFFF] uppercase tracking-[0.4em] font-light transition-all duration-300 group-hover:text-[#FFFFFF] group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                    {item}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* SYSTEM METRICS */}
          <div className="md:col-span-4 space-y-5">
            <p className="text-[9px] font-bold uppercase tracking-[0.6em] text-[#b87333]">/Node_Info</p>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex justify-between border-b border-white/10 pb-1">
                <span className="text-[9px] text-white/30 uppercase tracking-widest font-mono">Location</span>
                <span className="text-[10px] text-[#FFFFFF] uppercase tracking-widest font-light">33.77° N, 72.75° E</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-1">
                <span className="text-[9px] text-white/30 uppercase tracking-widest font-mono">Status</span>
                <span className="text-[10px] text-[#FFFFFF] uppercase tracking-widest font-light flex items-center gap-2">
                  Active <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* UTILITY BAR */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] uppercase tracking-[0.5em] text-white/30 font-light">
            © {currentYear} // DEVHUB_STUDIO_ALPHA
          </p>

          {/* SOCIALS with Hover Effect */}
          <div className="flex gap-8">
            {["Instagram", "LinkedIn", "GitHub"].map((social) => (
              <Link 
                key={social} 
                href="#" 
                className="text-[9px] font-light text-gray-400 hover:text-[#FFFFFF] hover:tracking-[0.5em] tracking-[0.4em] uppercase transition-all duration-300"
              >
                {social}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* FINAL SHARP ACCENT */}
      <div className="absolute bottom-0 left-0 w-full flex h-[2px]">
        <div className="w-1/4 bg-[#b87333]" />
        <div className="flex-grow bg-transparent" />
        <div className="w-12 bg-[#FFFFFF]" />
      </div>
    </footer>
  );
}