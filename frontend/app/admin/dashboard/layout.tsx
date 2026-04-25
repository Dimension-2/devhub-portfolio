"use client";
import { useEffect, useState, useRef, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Briefcase,
  Layers,
  PenTool,
  Mail,
  Calendar,
  LogOut,
  Command,
  Activity,
} from "lucide-react";

// --- 3D IMPORTS ---
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

// --- KINETIC WIREFRAME SURFACE COMPONENT ---
const KineticSurface = () => {
  const meshRef = useRef<THREE.Mesh>(null!);

  // Create a plane with high segment density for smooth waves
  const { positions, initialZ } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(15, 15, 40, 40);
    return {
      positions: geo.attributes.position,
      initialZ: geo.attributes.position.array.slice(),
    };
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const posArr = meshRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < posArr.length; i += 3) {
      const x = posArr[i];
      const y = posArr[i + 1];

      // Wave Equation: Sine based on distance from center + time
      const dist = Math.sqrt(x * x + y * y);
      const wave = Math.sin(dist - t * 2) * 0.5;
      const ripple = Math.cos(x * 0.5 + t) * Math.sin(y * 0.5 + t) * 0.3;

      posArr[i + 2] = wave + ripple;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;

    // Rotate the whole surface at a 45 degree tilt
    meshRef.current.rotation.x = -Math.PI / 3;
    meshRef.current.rotation.z = t * 0.05;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[15, 15, 40, 40]} />
      <meshBasicMaterial
        color="#b87333"
        wireframe
        transparent
        opacity={0.15}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return <div className="min-h-screen bg-[#050505]" />;

  const menuItems = [
    {
      name: "Overview",
      icon: <LayoutDashboard size={18} />,
      path: "/admin/dashboard",
    },
    {
      name: "Services",
      icon: <Briefcase size={18} />,
      path: "/admin/dashboard/services",
    },
    {
      name: "Portfolio",
      icon: <Layers size={18} />,
      path: "/admin/dashboard/portfolio",
    },
    {
      name: "Blog Posts",
      icon: <PenTool size={18} />,
      path: "/admin/dashboard/posts",
    },
    {
      name: "Inquiries",
      icon: <Mail size={18} />,
      path: "/admin/dashboard/inquiries",
    },
    {
      name: "Meetings",
      icon: <Calendar size={18} />,
      path: "/admin/dashboard/meetings",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#050505] text-white font-sans selection:bg-[#b87333] overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-72 bg-[#080808] flex flex-col border-r border-white/5 fixed h-full z-30">
        <div className="p-10">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-10 h-10 border border-[#b87333] rotate-45 flex items-center justify-center transition-transform hover:rotate-90 duration-700">
              <Command size={18} className="text-[#b87333] -rotate-45" />
            </div>
            <div className="flex flex-col uppercase tracking-[0.3em] font-black text-[10px]">
              <span className="text-white font-bold">DevHub_HQ</span>
              <span className="text-gray-500 text-[7px]">Data_Surface_v4</span>
            </div>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-5 px-6 py-5 text-[10px] uppercase tracking-[0.25em] transition-all border-l-2 ${
                    isActive
                      ? "bg-[#b87333]/5 border-[#b87333] text-white"
                      : "border-transparent text-gray-500 hover:text-white"
                  }`}
                >
                  <span
                    className={isActive ? "text-[#b87333]" : "text-gray-600"}
                  >
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-10">
          <button
            onClick={() => {
              localStorage.removeItem("adminToken");
              router.push("/admin/login");
            }}
            className="flex items-center gap-4 text-[10px] text-gray-600 uppercase tracking-[0.2em] hover:text-red-500 transition-all group"
          >
            <LogOut
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
            Terminate_Link
          </button>
        </div>
      </aside>

      {/* MAIN VIEWPORT */}
      <main className="flex-1 ml-72 relative flex flex-col">
        {/* Header Information Overlay */}
        <header className="h-24 flex items-center justify-between px-16 z-20 relative border-b border-white/5">
          <div className="flex items-center gap-4 text-[9px] font-bold tracking-[0.5em] text-gray-500 uppercase">
            <div className="w-2 h-2 bg-[#b87333] rounded-full animate-pulse shadow-[0_0_8px_#b87333]" />
            Command_Center_Live
          </div>
          <div className="flex items-center gap-6">
            <div className="text-[9px] font-mono text-gray-500 uppercase tracking-widest border border-white/5 px-4 py-2">
              User: <span className="text-white">Root_Admin</span>
            </div>
          </div>
        </header>

        {/* THE CORE VISUAL: KINETIC WIREFRAME SURFACE */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight
              position={[10, 10, 10]}
              intensity={1.5}
              color="#b87333"
            />

            <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
              <KineticSurface />
            </Float>
          </Canvas>
        </div>

        {/* DYNAMIC PAGE CONTENT OVERLAY */}
        <section className="relative z-10 flex-1 overflow-y-auto px-16 py-12 scrollbar-hide">
          <div className="max-w-5xl mx-auto">
            {/* Page content flows over the wavy surface */}
            {children}
          </div>
        </section>

        {/* Footer System Status */}
        <footer className="h-12 border-t border-white/5 px-16 flex items-center justify-between relative z-20 bg-[#050505]">
          <div className="flex items-center gap-6 text-[8px] text-gray-600 uppercase tracking-[0.3em]">
            <span className="flex items-center gap-2 italic">
              <Activity size={10} /> Mesh_Active
            </span>
            <span>Topography: Synced</span>
          </div>
          <div className="text-[8px] text-gray-700 font-mono tracking-tighter uppercase">
            © DevelopersHub_OS_v4.0
          </div>
        </footer>
      </main>
    </div>
  );
}
