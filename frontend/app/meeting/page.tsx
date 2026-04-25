"use client";
import React, { useState, useRef, useMemo } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, MapPin, Send, CheckCircle2 } from "lucide-react";

// --- 3D IMPORTS ---
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// --- KINETIC DRAGON FINS COMPONENT ---
const DragonArtifact = () => {
  const groupRef = useRef<THREE.Group>(null!);
  const count = 40; // Number of "fins"

  // Create individual fin properties
  const finData = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      phase: (i / count) * Math.PI * 2,
      offset: i * 0.1,
    }));
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const data = finData[i];

        // Parametric movement mimicking a shuffling Möbius path
        const angle = data.phase + t * 0.5;
        const radius = 1.5 + Math.sin(t * 1.5 + data.offset) * 0.4;

        child.position.x = Math.cos(angle) * radius;
        child.position.y = Math.sin(angle * 2) * 0.5; // Figure-8 shuffle
        child.position.z = Math.sin(angle) * radius;

        // Rotation makes them look like scales/fins
        child.rotation.x = t + data.offset;
        child.rotation.y = angle;
        child.rotation.z = Math.sin(t + data.offset) * 0.5;

        // "Breathing" scale effect
        const s = 0.5 + Math.sin(t * 2 + data.offset) * 0.2;
        child.scale.set(s, s, s);
      });

      groupRef.current.rotation.y = t * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {finData.map((_, i) => (
        <mesh key={i}>
          {/* Sharp, triangular fin shape */}
          <coneGeometry args={[0.2, 0.8, 3]} />
          <meshPhysicalMaterial
            color="#3c9b16"
            metalness={1}
            roughness={0.05}
            reflectivity={1}
            clearcoat={1}
            emissive="#d1a340"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
};

export default function BookMeeting() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    projectType: "Web Development",
    location: "",
    meetingDate: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await axios.post("http://localhost:5000/api/meetings", formData);
      setStatus("success");
      setFormData({
        fullName: "",
        email: "",
        projectType: "Web Development",
        location: "",
        meetingDate: "",
        message: "",
      });
    } catch (err) {
      console.error("Submission_Error:", err);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-between">
        <Navbar />
        <div className="flex-grow flex items-center justify-center px-6">
          <div className="text-center space-y-6 max-w-md">
            <CheckCircle2
              size={64}
              className="text-[#b87333] mx-auto animate-pulse"
            />
            <h2 className="text-4xl font-thin uppercase tracking-tighter text-[#121212]">
              Request Logged
            </h2>
            <p className="text-gray-400 font-mono text-[10px] uppercase tracking-widest leading-relaxed">
              System synchronization successful. Artifacts indexed for review.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="text-[#b87333] text-[10px] font-bold uppercase tracking-[0.5em] border-b border-[#b87333] pb-2"
            >
              Back_To_Protocol
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <main className="bg-white min-h-screen font-sans selection:bg-[#b87333] selection:text-white overflow-x-hidden">
      <Navbar />

      <section className="pt-60 pb-20 px-8 md:px-24">
        <div className="max-w-7xl mx-auto">
          {/* HEADER SECTION */}
          <div className="flex flex-col gap-6 mb-24">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-[#b87333] rounded-full animate-pulse" />
              <h2 className="text-[#b87333] text-[10px] font-bold tracking-[0.8em] uppercase">
                Sync_Protocol_v4.0
              </h2>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-8">
              <h1 className="text-7xl md:text-[140px] font-thin tracking-[-0.05em] text-[#121212] uppercase leading-[0.8]">
                Book <br />{" "}
                <span className="italic font-serif text-[#b87333] normal-case tracking-tight">
                  Meeting
                </span>
              </h1>

              {/* KINETIC DRAGON ARTIFACT */}
              <div className="w-full md:w-[500px] h-[400px] mt-4 md:mt-0">
                <Canvas camera={{ position: [0, 0, 8], fov: 35 }}>
                  <ambientLight intensity={0.6} />
                  <pointLight position={[10, 10, 10]} intensity={2} />
                  <pointLight
                    position={[-10, -10, 10]}
                    color="#b87333"
                    intensity={1}
                  />
                  <spotLight position={[0, 10, 0]} intensity={1.5} />
                  <Float
                    speed={1.5}
                    rotationIntensity={0.2}
                    floatIntensity={0.5}
                  >
                    <DragonArtifact />
                  </Float>
                </Canvas>
              </div>
            </div>
          </div>

          {/* FORM GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-8">
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16"
              >
                <div className="group border-b border-gray-100 focus-within:border-[#b87333] transition-all">
                  <label className="block text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-2">
                    Identity_Handle
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Full Name"
                    className="w-full bg-transparent py-4 text-2xl font-thin text-[#121212] outline-none placeholder:text-gray-100"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                  />
                </div>

                <div className="group border-b border-gray-100 focus-within:border-[#b87333] transition-all">
                  <label className="block text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-2">
                    Comms_Node
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="Email Address"
                    className="w-full bg-transparent py-4 text-2xl font-thin text-[#121212] outline-none placeholder:text-gray-100"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div className="group border-b border-gray-100 focus-within:border-[#b87333] transition-all">
                  <label className="block text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-2">
                    Sector_Type
                  </label>
                  <select
                    className="w-full bg-transparent py-4 text-2xl font-thin text-[#121212] outline-none appearance-none cursor-pointer"
                    value={formData.projectType}
                    onChange={(e) =>
                      setFormData({ ...formData, projectType: e.target.value })
                    }
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="AI Solutions">AI Solutions</option>
                  </select>
                </div>

                <div className="group border-b border-gray-100 focus-within:border-[#b87333] transition-all">
                  <label className="block text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-2 flex items-center gap-2">
                    <MapPin size={10} /> Sync_Point
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Virtual or Physical"
                    className="w-full bg-transparent py-4 text-2xl font-thin text-[#121212] outline-none placeholder:text-gray-100"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                  />
                </div>

                <div className="group border-b border-gray-100 focus-within:border-[#b87333] transition-all">
                  <label className="block text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-2 flex items-center gap-2">
                    <Calendar size={10} /> Chrono_Stamp
                  </label>
                  <input
                    required
                    type="datetime-local"
                    className="w-full bg-transparent py-4 text-2xl font-thin text-[#121212] outline-none [color-scheme:light]"
                    value={formData.meetingDate}
                    onChange={(e) =>
                      setFormData({ ...formData, meetingDate: e.target.value })
                    }
                  />
                </div>

                <div className="group border-b border-gray-100 focus-within:border-[#b87333] transition-all">
                  <label className="block text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-2">
                    Project_Brief
                  </label>
                  <textarea
                    placeholder="Describe your vision..."
                    className="w-full bg-transparent py-4 text-2xl font-thin text-[#121212] outline-none h-16 resize-none placeholder:text-gray-100"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />
                </div>

                <div className="md:col-span-2 pt-12">
                  <button
                    disabled={status === "loading"}
                    type="submit"
                    className="group relative w-full h-24 bg-[#121212] text-white overflow-hidden transition-all duration-700"
                  >
                    <div className="relative z-10 flex items-center justify-center gap-4">
                      <span className="text-[11px] font-bold uppercase tracking-[1em]">
                        {status === "loading"
                          ? "Transmitting..."
                          : "Establish_Link"}
                      </span>
                      <Send
                        size={16}
                        className="group-hover:translate-x-2 transition-transform"
                      />
                    </div>
                    <div className="absolute inset-0 bg-[#b87333] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </button>
                </div>
              </form>
            </div>

            {/* SIDEBAR */}
            <div className="lg:col-span-4 hidden lg:block space-y-16 pl-16 border-l border-gray-50">
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-[#b87333] uppercase tracking-[0.4em]">
                  Availability_Window
                </h4>
                <p className="text-gray-400 text-[11px] font-light leading-loose uppercase tracking-[0.2em]">
                  Mon — Fri <br />
                  09:00 — 18:00 PKT <br />
                </p>
              </div>
              <div className="space-y-4 pt-4">
                <h4 className="text-[10px] font-black text-[#b87333] uppercase tracking-[0.4em]">
                  Direct_Relay
                </h4>
                <p className="text-gray-400 text-[11px] font-light leading-loose uppercase tracking-[0.2em]">
                  studio@devhub.com <br />
                  Central_Administrative_Unit
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
