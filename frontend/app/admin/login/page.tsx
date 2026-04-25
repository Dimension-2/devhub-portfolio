"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock, Mail, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsConnecting(true);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    try {
      const res = await fetch("https://devhub-portfolio-gtu4.vercel.app/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, password: cleanPassword }),
      });

      const data = await res.json();

      if (res.ok && (data.token || data.success)) {
        localStorage.setItem("adminToken", data.token);
        // Explicitly use window.location for a hard refresh to clear any layout state
        window.location.href = "/admin/dashboard";
      } else {
        setError(data.message || "Access Denied: Invalid Credentials");
      }
    } catch (err) {
      setError("Terminal Connection Failure: Check Backend Server");
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center p-8 selection:bg-[#b87333] font-sans overflow-hidden">
      {/* BACKGROUND GEOMETRY */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-[#b87333]/5 rotate-45 animate-[spin_60s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#b87333]/10 -rotate-45 animate-[spin_40s_linear_infinite_reverse]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 border border-[#b87333] mb-8 rotate-45 group transition-all duration-700">
            <ShieldCheck size={32} className="text-[#b87333] -rotate-45" />
          </div>
          <h2 className="text-[#b87333] text-[10px] font-black tracking-[0.8em] uppercase mb-3">
            Secure_Gateway
          </h2>
          <h1 className="text-4xl font-thin text-white uppercase tracking-tighter">
            Admin{" "}
            <span className="italic font-serif text-[#b87333]">Access</span>
          </h1>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-[#0a0a0a] p-10 border border-white/5 relative shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
          {/* Top accent line */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#b87333]/50 to-transparent" />

          {error && (
            <div className="mb-8 p-4 bg-red-500/5 border border-red-500/20 text-red-500 text-[10px] uppercase tracking-[0.2em] text-center animate-pulse">
              {error}
            </div>
          )}

          <div className="space-y-10">
            <div className="relative group">
              <Mail
                className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#b87333] transition-colors"
                size={16}
              />
              <input
                type="email"
                placeholder="ADMIN_IDENTIFIER"
                className="w-full bg-transparent border-b border-white/10 py-4 pl-10 text-[11px] text-white tracking-[0.3em] outline-none focus:border-[#b87333] transition-all placeholder:text-gray-800 uppercase"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isConnecting}
                required
              />
            </div>

            <div className="relative group">
              <Lock
                className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#b87333] transition-colors"
                size={16}
              />
              <input
                type="password"
                placeholder="ENCRYPTED_KEY"
                className="w-full bg-transparent border-b border-white/10 py-4 pl-10 text-[11px] text-white tracking-[0.3em] outline-none focus:border-[#b87333] transition-all placeholder:text-gray-800"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isConnecting}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isConnecting}
            className="w-full mt-16 py-6 bg-transparent border border-[#b87333] text-[#b87333] text-[10px] font-black uppercase tracking-[0.6em] hover:bg-[#b87333] hover:text-white transition-all duration-700 flex items-center justify-center gap-4 group disabled:opacity-50"
          >
            {isConnecting ? (
              "AUTHORIZING..."
            ) : (
              <>
                Initiate Protocol
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-2 transition-transform"
                />
              </>
            )}
          </button>
        </form>

        <footer className="mt-12 flex justify-between items-center px-2">
          <span className="text-[8px] text-gray-700 tracking-[0.4em] uppercase">
            Auth_v2.0.4
          </span>
          <span className="text-[8px] text-gray-700 tracking-[0.4em] uppercase">
            DevHub_Corp
          </span>
        </footer>
      </div>
    </main>
  );
}
