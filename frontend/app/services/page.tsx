"use client";
import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, ShieldCheck, Activity } from "lucide-react";
import Link from "next/link";

// --- 1. IMPORT THE 3D LIBRARIES ---
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Torus } from "@react-three/drei";
import * as THREE from "three";

interface Service {
  _id: string;
  title: string;
  description: string;
  category?: string;
}

// --- 2. DEFINE THE 3D GYROSCOPE COMPONENT ---
// This component sits inside the Canvas.
const GyroscopeModel = () => {
  // Create references to individual rings to animate them
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  const ring3Ref = useRef<THREE.Mesh>(null!);
  const ring4Ref = useRef<THREE.Mesh>(null!);

  // Defines the "Metallic Copper" look
  const copperMaterial = (
    <meshStandardMaterial
      color="#b87333" // Base copper color
      metalness={1} // Makes it reflect light like metal
      roughness={0.1} // Makes it shiny/smooth
    />
  );

  // useFrame runs logic on every single frame (the animation loop)
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Ring 1 (Outer): Slow rotation on Y axis
    if (ring1Ref.current) {
      ring1Ref.current.rotation.y = t * 0.2;
    }
    // Ring 2: Faster rotation on X axis
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = t * 0.5;
    }
    // Ring 3: Counter-rotation on Z axis
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = -t * 0.8;
    }
    // Ring 4 (Inner): Very fast complex rotation
    if (ring4Ref.current) {
      ring4Ref.current.rotation.x = t * 1.5;
      ring4Ref.current.rotation.y = t * 1.0;
    }
  });

  return (
    <group rotation={[Math.PI / 6, Math.PI / 8, 0]}>
      {" "}
      {/* Initial tilt */}
      {/* Torus args: [radius, tubeRadius, radialSegments, tubularSegments] */}
      {/* Outer Ring */}
      <Torus ref={ring1Ref} args={[3.0, 0.06, 16, 100]}>
        {copperMaterial}
      </Torus>
      {/* Middle Ring 1 */}
      <Torus ref={ring2Ref} args={[2.4, 0.05, 16, 100]}>
        {copperMaterial}
      </Torus>
      {/* Middle Ring 2 */}
      <Torus ref={ring3Ref} args={[1.8, 0.04, 16, 100]}>
        {copperMaterial}
      </Torus>
      {/* Inner Ring */}
      <Torus ref={ring4Ref} args={[1.2, 0.03, 16, 100]}>
        {copperMaterial}
      </Torus>
      {/* Small central core sphere */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#ffd1a9"
          emissive="#b87333"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const AbstractLogo = () => (
    <div className="relative w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full animate-[spin_8s_linear_infinite] opacity-20"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="4 8"
        />
      </svg>
      <svg
        viewBox="0 0 100 100"
        className="w-10 h-10 transition-transform duration-1000 ease-in-out group-hover:rotate-[360deg]"
      >
        <path
          d="M50 5L95 50L50 95L5 50L50 5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          className="group-hover:fill-[#b87333]/10 transition-colors"
        />
        <rect
          x="30"
          y="30"
          width="40"
          height="40"
          stroke="currentColor"
          strokeWidth="0.8"
          className="rotate-45 origin-center scale-75"
        />
        <circle
          cx="50"
          cy="50"
          r="3"
          fill="currentColor"
          className="animate-pulse"
        />
      </svg>
    </div>
  );

  useEffect(() => {
    fetch("http://localhost:5000/api/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Link Protocol Failure", err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="bg-[#fcfcfc] min-h-screen font-sans selection:bg-[#b87333] selection:text-white overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-64 pb-32 px-8 md:px-24 bg-white border-b border-gray-100 overflow-hidden">
        {/* Background Grid Pattern */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.02] pointer-events-none">
          <svg width="100%" height="100%" fill="none">
            <pattern
              id="copperGrid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path d="M40 0H0v40" stroke="#b87333" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#copperGrid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="flex-1">
            <div className="flex flex-col gap-3 mb-16">
              <div className="flex items-center gap-4">
                <span className="w-12 h-px bg-[#b87333]" />
                <h2 className="text-[#b87333] text-[10px] font-medium tracking-[0.8em] uppercase">
                  Structural_Integrity
                </h2>
              </div>
            </div>

            <h1 className="text-7xl md:text-[120px] font-extralight tracking-tighter text-[#121212] uppercase leading-[0.8] mb-12">
              Design <br />
              <span className="italic font-serif text-[#b87333] normal-case tracking-normal font-normal">
                Frameworks
              </span>
            </h1>

            <p className="max-w-xl text-gray-400 text-xs tracking-[0.4em] uppercase font-light leading-loose">
              Engineering high-fidelity digital infrastructure through
              minimalist aesthetics and proprietary logic modules.
            </p>
          </div>

          {/* --- 3. REPLACED CSS SQUARES WITH 3D CANVAS --- */}
          <div className="flex-1 flex justify-center lg:justify-end items-center py-10 lg:pr-12">
            {/* The Container controls the size of the 3D scene */}
            <div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] relative">
              {/* Canvas is the "window" into the 3D world */}
              <Canvas
                camera={{ position: [0, 0, 10], fov: 50 }}
                dpr={[1, 2]}
                gl={{ alpha: true }}
              >
                {/* Lights make the copper look realistic */}
                <ambientLight intensity={0.5} />
                <directionalLight
                  position={[10, 10, 5]}
                  intensity={1.5}
                  color="#ffd1a9"
                />
                <pointLight
                  position={[-10, -10, -5]}
                  intensity={1}
                  color="#ffffff"
                />

                {/* Renders our custom Gyroscope */}
                <GyroscopeModel />

                {/* Adds a pre-defined environment map for realistic copper reflections */}
                <Environment preset="city" />

                {/* Optional: Allows user to rotate the object with the mouse */}
                <OrbitControls
                  enableZoom={false}
                  autoRotate
                  autoRotateSpeed={0.5}
                />
              </Canvas>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE GRID */}
      <section className="py-24 px-8 md:px-24 relative bg-[#fcfcfc]">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="h-96 flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-t-2 border-[#b87333] rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200 border border-gray-200 shadow-inner">
              {services.map((service, idx) => (
                <div
                  key={service._id}
                  className="group relative bg-white p-16 md:p-20 overflow-hidden transition-all duration-700 hover:z-20 shadow-none hover:shadow-[0_0_80px_rgba(0,0,0,0.04)]"
                >
                  {/* INVERTED BLACK SLIDER (BOTTOM TO TOP) */}
                  <div className="absolute inset-0 bg-[#0d0d0d] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />

                  {/* COPPER BORDER LINES */}
                  <span className="absolute top-0 left-0 w-0 h-[2px] bg-[#b87333] transition-all duration-700 group-hover:w-full z-30" />
                  <span className="absolute bottom-0 right-0 w-0 h-[2px] bg-[#b87333] transition-all duration-700 group-hover:w-full z-30" />

                  <div className="relative z-10 flex flex-col h-full transition-colors duration-500">
                    {/* META INFO */}
                    <div className="flex justify-between items-center mb-16 opacity-50 group-hover:opacity-100 transition-opacity">
                      <span className="text-[9px] font-mono text-gray-400 group-hover:text-[#b87333] tracking-widest">
                        MOD_0{idx + 1} // ACTIVE
                      </span>
                      <Activity
                        size={12}
                        className="text-gray-200 group-hover:text-[#b87333] animate-pulse"
                      />
                    </div>

                    {/* ANIMATED LOGO */}
                    <div className="mb-14 text-[#121212] group-hover:text-[#b87333] transition-colors">
                      <AbstractLogo />
                    </div>

                    {/* SERVICE TITLE (COPPER, NO BOLD) */}
                    <h3 className="text-2xl text-[#b87333] tracking-tight font-light mb-6 group-hover:text-white transition-all duration-500 group-hover:translate-x-2">
                      {service.title}
                    </h3>

                    {/* DESCRIPTION */}
                    <p className="text-gray-400 text-sm leading-relaxed mb-16 font-light tracking-wide group-hover:text-gray-500 transition-colors duration-700 flex-grow">
                      {service.description}
                    </p>

                    {/* INQUIRE INTERACTION */}
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-6 group/btn"
                    >
                      <div className="w-10 h-10 border border-gray-100 group-hover:border-[#b87333] flex items-center justify-center rounded-full transition-all duration-700 group-hover:bg-[#b87333]/5">
                        <ArrowRight
                          size={16}
                          className="text-[#b87333] group-hover:translate-x-1 transition-transform duration-500"
                        />
                      </div>
                      <span className="text-[10px] font-medium uppercase tracking-[0.6em] text-[#121212] group-hover:text-white transition-colors">
                        INQUIRE
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-white py-48 px-8 border-t border-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-12">
            <ShieldCheck
              size={48}
              strokeWidth={0.5}
              className="text-[#b87333]"
            />
          </div>

          <p className="text-[10px] tracking-[1.2em] uppercase text-gray-300 mb-8 font-medium">
            Proprietary_Consulting
          </p>

          <h2 className="text-5xl md:text-7xl font-extralight text-[#121212] uppercase tracking-tighter leading-[0.9] mb-16">
            Architecting your <br />
            <span className="italic font-serif text-[#b87333] normal-case tracking-normal">
              vision
            </span>
          </h2>

          <Link href="/contact">
            <button className="group relative px-16 py-7 border border-[#121212] overflow-hidden transition-all duration-700">
              <span className="relative z-10 text-[10px] uppercase tracking-[0.8em] text-[#121212] group-hover:text-white transition-colors duration-500 font-medium">
                Establish Contact
              </span>
              <div className="absolute inset-0 bg-[#121212] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out" />
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
