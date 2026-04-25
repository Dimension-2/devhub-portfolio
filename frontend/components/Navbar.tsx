"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Work", href: "/work" },
    { name: "Blogs", href: "/journal" },
    { name: "Meeting", href: "/meeting" }, // Added Meeting here
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 px-8 md:px-16 h-24 flex items-center transition-all duration-500">
      {/* FIXED BACKGROUND */}
      <div
        className={`absolute inset-0 transition-all duration-700 ease-in-out ${
          scrolled
            ? "bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm opacity-100"
            : "bg-transparent opacity-0"
        }`}
      />

      <div className="relative max-w-7xl mx-auto w-full flex justify-between items-center z-10">
        {/* 1. LOGO MODULE */}
        <Link href="/" className="flex items-center gap-5 group">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <div className="absolute inset-0 bg-black rotate-45 border border-[#b87333] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:rotate-[405deg] group-hover:bg-[#b87333]" />
            <span className="relative z-10 text-white font-light text-xl tracking-tighter">
              D
            </span>
          </div>
          <div className="flex flex-col">
            <span
              className={`text-xl tracking-[0.4em] uppercase font-light leading-none transition-colors duration-500 ${
                scrolled ? "text-black" : "text-Black"
              }`}
            >
              DEV
              <span className="font-medium text-[#b87333]">HUB</span>
            </span>
            <span className="text-[7px] tracking-[0.8em] text-gray-400 uppercase font-light mt-1">
              Studio_Wah_Cantt
            </span>
          </div>
        </Link>

        {/* 2. SLIM & BIG NAVIGATION */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative text-[13px] uppercase tracking-[0.6em] font-light transition-all duration-500 group ${
                pathname === link.href
                  ? "text-[#b87333]"
                  : scrolled
                    ? "text-gray-500 hover:text-black"
                    : "text-gray-400 hover:text-white"
              }`}
            >
              <span className="relative z-10">{link.name}</span>

              {/* Ultra-thin underline indicator */}
              <span
                className={`absolute -bottom-2 left-0 h-[1px] bg-[#b87333] transition-all duration-500 ease-in-out ${
                  pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
