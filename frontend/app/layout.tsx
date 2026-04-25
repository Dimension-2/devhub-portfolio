import "./globals.css";
import { Rajdhani, Playfair_Display, JetBrains_Mono } from "next/font/google";

// 1. Tech Font (Sans) - Sharp and Modern
const techFont = Rajdhani({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "700"],
  variable: "--font-tech" 
});

// 2. Serif Font - For that "Digital Excellence" italic look
const serifFont = Playfair_Display({
  subsets: ["latin"],
  style: ['italic'],
  weight: ["400"],
  variable: "--font-serif"
});

// 3. Mono Font - For the technical "MOD_01" labels
const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono"
});

export const metadata = {
  title: "DEVHUB | Modern Web Studio",
  description: "High-quality websites and digital products built in Wah Cantt.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body 
        className={`
          ${techFont.variable} 
          ${serifFont.variable} 
          ${monoFont.variable} 
          font-sans antialiased bg-[#fcfcfc] text-black 
          selection:bg-[#b87333] selection:text-white
        `}
      >
        {/* COPPER ACCENT GRADIENT - Subtle light source in the corner */}
        <div className="fixed top-0 right-0 w-full h-full pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-[#b87333]/[0.03] blur-[150px] rounded-full" />
        </div>

        {/* MAIN CONTENT WRAPPER */}
        <div className="relative flex flex-col min-h-screen z-10">
          {children}
        </div>

        {/* CLEAN GRID OVERLAY - Refined for better scannability */}
        <div className="fixed inset-0 z-[-1] opacity-[0.03] pointer-events-none">
          <div 
            className="absolute inset-0" 
            style={{ 
              backgroundImage: `linear-gradient(to right, #808080 1px, transparent 1px), linear-gradient(to bottom, #808080 1px, transparent 1px)`,
              backgroundSize: '80px 80px' 
            }} 
          />
        </div>
      </body>
    </html>
  );
}