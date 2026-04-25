"use client";
import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  X,
  Activity,
  BookOpen,
  ChevronLeft,
  Database,
} from "lucide-react";

interface PostItem {
  _id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
}

export default function AdminPosts() {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "Technology",
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/posts");
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsAdding(false);
        setFormData({ title: "", content: "", category: "Technology" });
        fetchPosts();
      } else {
        alert("Failed to save post.");
      }
    } catch (err) {
      alert("Backend Offline");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await fetch(`http://localhost:5000/api/posts/${id}`, { method: "DELETE" });
    fetchPosts();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans px-6 py-16 selection:bg-[#b87333] selection:text-white">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Database size={16} className="text-[#b87333]" />
              <h2 className="text-[#b87333] text-[10px] font-bold tracking-[0.8em] uppercase">
                Proprietary_Admin_v15.5
              </h2>
            </div>
            <h1 className="text-6xl md:text-7xl font-extralight text-white uppercase tracking-tighter leading-none">
              Manage <br />
              <span className="italic font-serif text-[#b87333] lowercase">
                BLOGS
              </span>
            </h1>
          </div>
          <button
            onClick={() => setIsAdding(true)}
            className="px-10 py-5 bg-white text-black text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#b87333] hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(184,115,51,0.2)] flex items-center gap-3"
          >
            <Plus size={16} /> Write New Entry
          </button>
        </div>

        {/* MODAL FORM */}
        {isAdding && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <div className="bg-[#121212] w-full max-w-2xl border border-[#b87333]/30 shadow-2xl relative p-10">
              {/* CLOSE BUTTON */}
              <button
                onClick={() => setIsAdding(false)}
                className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
              >
                <X size={28} />
              </button>

              <div className="mb-10">
                <h3 className="text-xl font-bold uppercase tracking-widest text-white">
                  Create New Archive Entry
                </h3>
                <p className="text-[10px] text-[#b87333] tracking-[0.3em] uppercase mt-2">
                  Database_Inject
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase block mb-2 tracking-widest">
                    Article Title
                  </label>
                  <input
                    className="w-full bg-[#1a1a1a] border border-[#333] p-4 text-sm text-white outline-none focus:border-[#b87333] transition-all placeholder:text-gray-600"
                    placeholder="Logic System v14..."
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase block mb-2 tracking-widest">
                    Category Segment
                  </label>
                  <select
                    className="w-full bg-[#1a1a1a] border border-[#333] p-4 text-sm text-white outline-none focus:border-[#b87333] cursor-pointer appearance-none"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  >
                    <option value="Technology">Technology</option>
                    <option value="Design">Design</option>
                    <option value="Blockchain">Blockchain</option>
                    <option value="AI">Artificial Intelligence</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Development">Development</option>
                    <option value="Infrastructure">Infrastructure</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase block mb-2 tracking-widest">
                    Technical Content
                  </label>
                  <textarea
                    className="w-full bg-[#1a1a1a] border border-[#333] p-4 text-sm text-white min-h-[180px] resize-none outline-none focus:border-[#b87333] placeholder:text-gray-600"
                    placeholder="Document the technical logic here..."
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 py-5 bg-[#b87333] text-white text-[10px] font-black tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all duration-300"
                  >
                    Publish to Site
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="px-8 py-5 border border-[#333] text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:bg-[#1a1a1a] hover:text-white transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* LIST GRID */}
        {loading ? (
          <div className="h-96 flex flex-col items-center justify-center grayscale opacity-50 border border-[#222] border-dashed">
            <Activity className="animate-spin text-[#b87333] mb-4" size={32} />
            <span className="text-[10px] font-mono tracking-[1em] uppercase">
              Syncing_Database
            </span>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((item) => (
              <div
                key={item._id}
                className="group relative bg-[#111] border border-[#222] p-8 flex justify-between items-center transition-all duration-500 hover:border-[#b87333]/50 hover:shadow-[0_0_30px_rgba(184,115,51,0.05)]"
              >
                {/* Visual Hover Accent Line */}
                <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#b87333] transition-all duration-500 group-hover:w-full" />

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-[#b87333] animate-pulse shadow-[0_0_8px_#b87333]"></div>
                    <span className="text-[10px] text-[#b87333] font-black uppercase tracking-[0.3em]">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-light text-white uppercase tracking-tight group-hover:text-[#b87333] transition-all duration-300">
                    {item.title}
                  </h3>
                  <div className="flex gap-6 mt-3">
                    <p className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">
                      ID: {item._id.slice(-6)}
                    </p>
                    <p className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">
                      TS: {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="w-12 h-12 flex items-center justify-center rounded-full border border-[#222] text-gray-600 hover:text-red-500 hover:border-red-500/20 hover:bg-red-500/5 transition-all duration-300"
                  title="Delete Entry"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}

            {posts.length === 0 && (
              <div className="py-32 border border-dashed border-[#222] flex flex-col items-center justify-center">
                <X size={40} className="mb-4 text-gray-800" />
                <p className="text-center text-gray-600 text-[10px] uppercase tracking-[1em]">
                  Zero_Entries_Found
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
