"use client";
import { useEffect, useState } from "react";
import { Plus, Trash2, X, Activity, Database } from "lucide-react";

interface WorkItem {
  _id: string;
  title: string;
  category: string;
  description: string;
  year: string;
}

export default function AdminWork() {
  const [workEntries, setWorkEntries] = useState<WorkItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    year: "2026",
  });

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/portfolio");
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      setWorkEntries(data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsAdding(false);
        setFormData({ title: "", category: "", description: "", year: "2026" });
        fetchPortfolio();
      } else {
        alert("Submission failed. Check backend console.");
      }
    } catch (err) {
      alert("System Offline: Backend not responding.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/portfolio/${id}`, {
        method: "DELETE",
      });
      if (res.ok) fetchPortfolio();
    } catch (err) {
      alert("Delete failed.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans px-6 py-16">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Database size={16} className="text-[#b87333]" />
              <h2 className="text-[#b87333] text-[10px] font-bold tracking-[0.8em] uppercase">
                System_Archive
              </h2>
            </div>
            <h1 className="text-6xl font-extralight text-white uppercase tracking-tighter">
              Manage{" "}
              <span className="italic font-serif text-[#b87333] lowercase">
                portfolio
              </span>
            </h1>
          </div>
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-4 px-8 py-4 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-[#b87333] hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(184,115,51,0.2)]"
          >
            <Plus size={16} /> Add New Project
          </button>
        </div>

        {/* MODAL FORM */}
        {isAdding && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <div className="bg-[#121212] w-full max-w-md border border-[#b87333]/30 shadow-2xl relative">
              <button
                onClick={() => setIsAdding(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <form onSubmit={handleSubmit} className="p-8">
                <div className="mb-8">
                  <h3 className="text-lg font-bold uppercase tracking-tighter text-white">
                    New Entry
                  </h3>
                  <p className="text-[10px] text-[#b87333] tracking-[0.3em]">
                    DATABASE_UPLOAD
                  </p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="text-[9px] font-bold text-gray-400 uppercase block mb-1">
                      Project Title
                    </label>
                    <input
                      className="w-full bg-[#1a1a1a] border border-[#333] p-3 text-sm text-white outline-none focus:border-[#b87333] transition-all"
                      placeholder="PROJECT_ID_01"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] font-bold text-gray-400 uppercase block mb-1">
                        Category
                      </label>
                      <input
                        className="w-full bg-[#1a1a1a] border border-[#333] p-3 text-sm text-white outline-none focus:border-[#b87333] transition-all"
                        placeholder="UX_CORE"
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-bold text-gray-400 uppercase block mb-1">
                        Year
                      </label>
                      <input
                        className="w-full bg-[#1a1a1a] border border-[#333] p-3 text-sm text-white outline-none focus:border-[#b87333] transition-all"
                        value={formData.year}
                        onChange={(e) =>
                          setFormData({ ...formData, year: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-gray-400 uppercase block mb-1">
                      Description
                    </label>
                    <textarea
                      className="w-full bg-[#1a1a1a] border border-[#333] p-3 text-sm text-white min-h-[100px] resize-none outline-none focus:border-[#b87333] transition-all"
                      placeholder="Brief system logs..."
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-8 py-4 bg-[#b87333] text-white text-[10px] font-bold tracking-[0.5em] uppercase hover:bg-white hover:text-black transition-all duration-300"
                >
                  Sync to Archive
                </button>
              </form>
            </div>
          </div>
        )}

        {/* LIST GRID */}
        {loading ? (
          <div className="h-64 flex flex-col items-center justify-center border border-[#333] border-dashed">
            <Activity className="animate-spin text-[#b87333] mb-2" />
            <span className="text-[10px] tracking-widest text-gray-500 uppercase">
              Connecting_To_Stream...
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {workEntries.map((item) => (
              <div
                key={item._id}
                className="group relative bg-[#111] border border-[#222] p-8 flex justify-between items-start transition-all duration-500 hover:border-[#b87333]/50 hover:shadow-[0_0_30px_rgba(184,115,51,0.05)] hover:-translate-y-1"
              >
                {/* Visual Hover accent */}
                <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#b87333] transition-all duration-500 group-hover:w-full" />

                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[9px] text-[#b87333] font-bold tracking-widest uppercase">
                      {item.category}
                    </span>
                    <div className="w-1 h-1 rounded-full bg-[#333]" />
                    <span className="text-[9px] text-gray-500 font-mono">
                      {item.year}
                    </span>
                  </div>
                  <h3 className="text-xl font-light text-white uppercase mb-3 transition-colors duration-300 group-hover:text-[#b87333]">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-gray-500 leading-relaxed italic border-l border-[#222] pl-4">
                    "{item.description}"
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="ml-4 p-2 text-[#333] hover:text-red-500 transition-colors"
                  title="Remove Entry"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}

        {workEntries.length === 0 && !loading && (
          <div className="text-center py-20 border border-[#222] border-dashed rounded-lg">
            <p className="text-gray-600 text-[10px] uppercase tracking-[0.5em]">
              No_Archives_Found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
