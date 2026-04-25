"use client";
import { useEffect, useState, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowUpRight, Terminal, Hash, MessageCircle } from "lucide-react";
import Link from "next/link";

// 3D Rendering Imports
import { Canvas, useFrame } from "@react-three/fiber";
import {
  PerspectiveCamera,
  Float,
  Environment,
  ContactShadows,
  Text,
} from "@react-three/drei";
import * as THREE from "three";

interface PostItem {
  _id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
}

// ---------------------------------------------------------
// Component: The EXACT Double-Pointed Quartz (V15.2)
// ---------------------------------------------------------
const ExactQuartzCrystal = () => {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      // Elegant, steady rotation
      groupRef.current.rotation.y += 0.005;
      // Gentle floating animation
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime / 1.5) * 0.15;
    }
  });

  // Balanced 4-sided double-pointed geometry (Obelisk Style)
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const vertices = new Float32Array([
      0.0,
      3.5,
      0.0, // 0: TOP POINT
      1.0,
      1.5,
      1.0, // 1: Top-Front-Right
      -1.0,
      1.5,
      1.0, // 2: Top-Front-Left
      -1.0,
      1.5,
      -1.0, // 3: Top-Back-Left
      1.0,
      1.5,
      -1.0, // 4: Top-Back-Right
      1.0,
      -1.5,
      1.0, // 5: Bottom-Front-Right
      -1.0,
      -1.5,
      1.0, // 6: Bottom-Front-Left
      -1.0,
      -1.5,
      -1.0, // 7: Bottom-Back-Left
      1.0,
      -1.5,
      -1.0, // 8: Bottom-Back-Right
      0.0,
      -3.5,
      0.0, // 9: BOTTOM POINT
    ]);

    const indices = [
      0,
      1,
      2,
      0,
      2,
      3,
      0,
      3,
      4,
      0,
      4,
      1, // Top Pyramid
      1,
      2,
      6,
      1,
      6,
      5, // Front Face
      2,
      3,
      7,
      2,
      7,
      6, // Left Face
      3,
      4,
      8,
      3,
      8,
      7, // Back Face
      4,
      1,
      5,
      4,
      5,
      8, // Right Face
      9,
      6,
      5,
      9,
      7,
      6,
      9,
      8,
      7,
      9,
      5,
      8, // Bottom Pyramid
    ];

    geo.setIndex(indices);
    geo.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <group ref={groupRef}>
      {/* THE MAIN CRYSTAL - Low Reflectivity Copper */}
      <mesh geometry={geometry} scale={[0.9, 0.9, 0.9]} castShadow>
        <meshStandardMaterial
          color="#b87333"
          metalness={0.8}
          roughness={0.25} // Matte/Brushed look as requested
          emissive="#b87333"
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* THE CARVED TEXT - Clear White "BLOGS" */}
      <Text
        position={[0, 0, 1.0]}
        fontSize={0.35}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineColor="#b87333"
        outlineWidth={0.01}
      >
        BLOGS
      </Text>
    </group>
  );
};

// ---------------------------------------------------------
// Component: 3D Scene Wrapper
// ---------------------------------------------------------
function Scene3D() {
  return (
    <div className="w-full h-[500px] relative pointer-events-none">
      <Canvas
        shadows
        camera={{ position: [0, 0, 10], fov: 40 }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#b87333" />

        <ExactQuartzCrystal />

        {/* Softened Shadow to prevent "straight box" edges */}
        <ContactShadows
          position={[0, -4.5, 0]}
          opacity={0.25}
          scale={15}
          blur={3}
          far={5}
        />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}

// ---------------------------------------------------------
// Component: Main Blog Page
// ---------------------------------------------------------
export default function BlogPage() {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-[#b87333] selection:text-white text-[#121212] overflow-x-hidden">
      <Navbar />

      <main className="max-w-[1440px] mx-auto px-6 md:px-24 pt-48 pb-32">
        {/* HERO SECTION */}
        <header className="mb-32 relative flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="z-10 md:w-1/2">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-[1px] w-12 bg-[#b87333]"></div>
              <span className="text-[10px] font-black tracking-[0.8em] text-[#b87333] uppercase">
                Archives_V15.2_Alpha
              </span>
            </div>

            <h1 className="text-[10vw] md:text-[140px] font-extralight tracking-[-0.07em] leading-[0.8] uppercase text-[#121212]">
              FEATURED <br />
              <span className="italic font-serif text-[#b87333] lowercase ml-[-10px]">
                BLOGS
              </span>
              
            </h1>

            <div className="mt-16 max-w-md">
              <p className="text-gray-400 text-[11px] leading-[2.2] uppercase tracking-[0.4em] font-medium italic">
                "Technical documentations of high-fidelity digital
                infrastructure. Our logs explore the boundary of code and
                design."
              </p>
            </div>
          </div>

          <div className="relative w-full md:w-1/2 h-[500px]">
            <Scene3D />
          </div>
        </header>

        {loading ? (
          <div className="h-64 flex items-center justify-center font-mono text-[9px] tracking-[1.5em] text-gray-300 uppercase">
            Fetching_Stored_Logic
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-gray-100 ml-0 md:ml-12">
            {posts.map((post, index) => (
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                key={post._id}
                className="group relative border-r border-b border-gray-100 p-10 h-[520px] flex flex-col justify-between bg-white overflow-hidden"
              >
                {/* DARK HOVER OVERLAY */}
                <div className="absolute inset-0 bg-[#0c0c0c] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-12">
                    <div className="w-10 h-10 border border-gray-100 group-hover:border-white/10 flex items-center justify-center transition-colors">
                      <Terminal
                        size={18}
                        className="text-[#b87333] group-hover:text-white transition-colors"
                      />
                    </div>
                    <ArrowUpRight
                      size={16}
                      className="text-gray-200 group-hover:text-white transition-colors"
                    />
                  </div>

                  <div className="flex-grow overflow-hidden">
                    <div className="flex items-center gap-2 mb-4">
                      <Hash size={8} className="text-[#b87333]" />
                      <span className="text-[8px] font-black text-[#b87333] tracking-[0.4em] uppercase">
                        {post.category}
                      </span>
                    </div>
                    <h2 className="text-3xl font-light uppercase tracking-tighter leading-tight group-hover:text-white mb-6">
                      {post.title}
                    </h2>
                    <p className="text-[13px] text-gray-400 leading-relaxed font-light italic line-clamp-4 group-hover:text-gray-500 transition-colors">
                      "{post.content}"
                    </p>
                  </div>

                  <div className="mt-8 pt-8 border-t border-gray-50 group-hover:border-white/5 flex justify-between items-end gap-1">
                    <div className="flex flex-col gap-1">
                      <span className="text-[7px] font-mono text-gray-300 uppercase tracking-widest">
                        System_Reference
                      </span>
                      <span className="text-[9px] text-gray-900 font-mono group-hover:text-white">
                        ID_{post._id.slice(-5)}
                      </span>
                    </div>
                    <Link href="/contact" className="flex-shrink-0">
                      <button className="bg-[#121212] group-hover:bg-[#b87333] text-white px-6 py-3 text-[8px] font-bold uppercase tracking-[0.3em] transition-all">
                        Initiate
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
