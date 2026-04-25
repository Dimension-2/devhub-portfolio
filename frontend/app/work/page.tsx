"use client";
import { useEffect, useState, useRef, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowUpRight, Plus, Terminal, Activity, WifiOff } from "lucide-react";

// --- 3D IMPORTS ---
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere } from "@react-three/drei";
import * as THREE from "three";

interface Project {
  _id: string;
  title: string;
  category: string;
  description: string;
  year: string;
}

// --- REFINED KINETIC GEODESIC SPHERE ---
const KineticSphere = () => {
  const mainRef = useRef<THREE.Mesh>(null!);
  const pointsRef = useRef<THREE.Points>(null!);

  // Increasing detail to 3 or 4 makes it a "perfect" sphere
  // Higher than 4 might impact performance; 3 is the sweet spot for this look
  const detail = 3;

  // Store original positions to calculate vibrations correctly
  const originalPositions = useMemo(() => {
    const tempGeo = new THREE.IcosahedronGeometry(1, detail);
    return tempGeo.getAttribute("position").array.slice();
  }, [detail]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Smooth, high-end rotation
    const rotationSpeed = t * 0.12;
    mainRef.current.rotation.y = rotationSpeed;
    mainRef.current.rotation.x = Math.sin(t * 0.2) * 0.1; // Subtle tilt
    pointsRef.current.rotation.y = rotationSpeed;
    pointsRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;

    const positionAttribute = mainRef.current.geometry.getAttribute("position");

    for (let i = 0; i < positionAttribute.count; i++) {
      // Get original vertex position
      const x = originalPositions[i * 3];
      const y = originalPositions[i * 3 + 1];
      const z = originalPositions[i * 3 + 2];

      const v = new THREE.Vector3(x, y, z);

      // Proper Spherical Vibration Logic
      // We use sine waves based on the vertex's spatial coordinates to create "ripples"
      const noise =
        Math.sin(v.x * 3 + t * 1.5) * Math.cos(v.y * 3 + t * 1.5) * 0.06;

      // Apply noise along the normal (which for a sphere is just the direction from center)
      v.normalize().multiplyScalar(1 + noise);

      positionAttribute.setXYZ(i, v.x, v.y, v.z);
    }

    positionAttribute.needsUpdate = true;
    // Sync points with the mesh geometry
    pointsRef.current.geometry.getAttribute("position").needsUpdate = true;
  });

  return (
    <group scale={1.8}>
      {/* The Copper Wireframe Structure */}
      <mesh ref={mainRef}>
        <icosahedronGeometry args={[1, detail]} />
        <meshBasicMaterial
          color="#b87333"
          wireframe
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* The Kinetic Nodes (Dots) */}
      <points ref={pointsRef}>
        <icosahedronGeometry args={[1, detail]} />
        <pointsMaterial
          color="#b87333"
          size={0.05}
          sizeAttenuation={true}
          transparent
          opacity={0.9}
        />
      </points>

      {/* Subtle Core Ambient Glow */}
      <Sphere args={[0.95, 32, 32]}>
        <meshBasicMaterial color="#b87333" transparent opacity={0.03} />
      </Sphere>
    </group>
  );
};

export default function WorkPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/portfolio");
        if (!response.ok)
          throw new Error(`Server responded with ${response.status}`);
        const data = await response.json();
        setProjects(data);
        setError(false);
      } catch (err) {
        console.error("Archive Protocol Error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <main className="bg-[#fcfcfc] min-h-screen font-sans selection:bg-[#b87333] selection:text-white overflow-x-hidden">
      <Navbar />

      <section className="pt-60 pb-20 px-8 md:px-24 bg-white border-b border-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* HEADER SECTION */}
          <div className="flex flex-col gap-6 mb-24">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-[#b87333] rounded-full animate-pulse" />
              <h2 className="text-[#b87333] text-[10px] font-bold tracking-[0.8em] uppercase">
                Archive_Index_v2.6
              </h2>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-8">
              <h1 className="text-7xl md:text-[140px] font-thin tracking-[-0.05em] text-[#121212] uppercase leading-[0.8]">
                Digital <br />{" "}
                <span className="italic font-serif text-[#b87333] normal-case tracking-tight">
                  Artifacts
                </span>
              </h1>

              {/* REFINED KINETIC SPHERE CANVAS */}
              <div className="w-full md:w-[480px] h-[380px] mt-4 md:mt-0 flex items-center justify-center">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                  <ambientLight intensity={0.4} />
                  <pointLight
                    position={[5, 5, 5]}
                    intensity={1}
                    color="#b87333"
                  />
                  <Float
                    speed={1.8}
                    rotationIntensity={0.2}
                    floatIntensity={0.4}
                  >
                    <KineticSphere />
                  </Float>
                </Canvas>
              </div>
            </div>

            <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <p className="max-w-md text-gray-400 text-[11px] tracking-[0.2em] uppercase leading-loose font-light">
                A curated collection of high-performance deployments managed via
                Central Command.
              </p>
              <div className="flex items-center gap-4 text-gray-400">
                <Terminal size={16} />
                <span className="text-[10px] font-mono tracking-widest uppercase">
                  Data_Stream:{" "}
                  {loading ? "Syncing..." : error ? "Offline" : "Online"}
                </span>
              </div>
            </div>
          </div>

          {/* DYNAMIC PROJECT GRID */}
          {loading ? (
            <div className="h-96 flex items-center justify-center border border-dashed border-gray-100">
              <Activity
                className="animate-spin text-[#b87333]"
                size={32}
                strokeWidth={1}
              />
            </div>
          ) : error ? (
            <div className="h-96 flex flex-col items-center justify-center border border-dashed border-gray-200 bg-gray-50/50">
              <WifiOff
                className="text-gray-300 mb-4"
                size={48}
                strokeWidth={1}
              />
              <p className="text-[10px] tracking-[0.4em] uppercase text-gray-400 font-bold">
                Server_Connection_Refused
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 border border-gray-200 shadow-2xl shadow-gray-200/40">
              {projects.map((project, idx) => (
                <div
                  key={project._id}
                  className="group relative bg-white h-[550px] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                >
                  <div className="absolute inset-0 p-14 flex flex-col justify-between z-10 transition-all duration-1000 group-hover:opacity-0 group-hover:-translate-y-20">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-mono text-gray-400 tracking-widest uppercase">
                        NO_0{idx + 1}
                      </span>
                      <Plus
                        size={18}
                        strokeWidth={1}
                        className="text-gray-300 transition-transform duration-700"
                      />
                    </div>
                    <div>
                      <p className="text-[#b87333] text-[9px] font-bold tracking-[0.4em] uppercase mb-4">
                        {project.category}
                      </p>
                      <h3 className="text-4xl text-[#121212] font-thin uppercase tracking-tighter italic font-serif leading-none">
                        {project.title.replace("_", " ")}
                      </h3>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-[#0d0d0d] p-14 flex flex-col justify-center opacity-0 translate-y-[20%] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] z-20">
                    <div className="mb-10 flex items-center gap-4">
                      <div className="w-8 h-[1px] bg-[#b87333]" />
                      <span className="text-[#b87333] text-[10px] font-bold tracking-[0.5em] uppercase">
                        DEPLOYMENT_INTEL
                      </span>
                    </div>
                    <p className="text-xl text-gray-300 font-extralight leading-relaxed mb-16 tracking-wide italic font-serif">
                      "{project.description}"
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <Link
                        href={`/work/${project._id}`}
                        className="text-[10px] text-white font-bold tracking-[0.6em] uppercase flex items-center gap-4 group/btn"
                      >
                        <span>Explore Project</span>
                        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover/btn:border-[#b87333] group-hover/btn:bg-[#b87333]/5 transition-all">
                          <ArrowUpRight size={16} className="text-[#b87333]" />
                        </div>
                      </Link>
                      <span className="text-[10px] font-mono text-white/20 tracking-widest italic">
                        {project.year || "2026"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* FOOTER CTA */}
          <div className="mt-40 text-center border-t border-gray-100 pt-32 pb-20">
            <h2 className="text-5xl md:text-8xl font-thin text-[#121212] uppercase tracking-tighter mb-16 leading-none">
              Let's craft your <br />{" "}
              <span className="text-[#b87333] italic font-serif normal-case tracking-normal">
                Digital Legacy
              </span>
            </h2>
            <Link href="/contact">
              <button className="group relative px-24 py-8 overflow-hidden border border-[#121212] text-[11px] uppercase tracking-[0.6em] text-[#121212] transition-all duration-700">
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                  Establish Contact
                </span>
                <div className="absolute inset-0 bg-[#121212] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
