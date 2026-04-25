"use client";
import { useEffect, useState } from "react";
import { Plus, Trash2, X, Check, Database } from "lucide-react";

interface Service {
  _id: string;
  title: string;
  description: string;
  category: string;
}

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch("https://devhub-portfolio-gtu4.vercel.app/api/services");
      if (!res.ok) return;
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("https://devhub-portfolio-gtu4.vercel.app/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("adminToken") || "",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("New Service Added Successfully!");
        setFormData({ title: "", description: "", category: "" });
        setIsAdding(false);
        fetchServices();
      } else {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await res.json();
          alert("Error: " + (errorData.message || "Action failed"));
        } else {
          alert(`Server Error: ${res.status}. Check backend logs.`);
        }
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Connection Error: Is the backend server running?");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Confirm protocol: Permanent deletion?")) {
      try {
        const res = await fetch(`https://devhub-portfolio-gtu4.vercel.app/api/services/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: localStorage.getItem("adminToken") || "",
          },
        });
        if (res.ok) {
          fetchServices();
        } else {
          alert("Delete failed.");
        }
      } catch (err) {
        alert("Server connection error during deletion.");
      }
    }
  };

  const closeForm = () => {
    setIsAdding(false);
    setFormData({ title: "", description: "", category: "" });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans px-6 py-16">
      <div className="max-w-6xl mx-auto">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Database size={16} className="text-[#b87333]" />
              <h2 className="text-[#b87333] text-[10px] font-black tracking-[0.8em] uppercase">
                Service_Module
              </h2>
            </div>
            <h1 className="text-6xl font-extralight text-white uppercase tracking-tighter">
              Manage{" "}
              <span className="italic font-serif text-[#b87333] lowercase">
                services
              </span>
            </h1>
          </div>
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-3 px-8 py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-[#b87333] hover:text-white transition-all duration-700 shadow-[0_0_15px_rgba(184,115,51,0.2)]"
          >
            <Plus size={16} /> New_Entry
          </button>
        </div>

        {/* CREATE FORM MODAL */}
        {isAdding && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-8">
            <form
              onSubmit={handleAdd}
              className="bg-[#121212] p-12 max-w-xl w-full border border-[#b87333]/30 shadow-2xl relative"
            >
              <div className="flex justify-between items-center mb-12">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black tracking-[0.5em] uppercase text-[#b87333]">
                    Creation_Protocol
                  </span>
                  <h3 className="text-2xl font-light text-white uppercase tracking-tight">
                    Service{" "}
                    <span className="italic font-serif text-[#b87333]">
                      Details
                    </span>
                  </h3>
                </div>
                <button type="button" onClick={closeForm}>
                  <X
                    size={20}
                    className="text-gray-500 hover:text-white transition-colors"
                  />
                </button>
              </div>

              <div className="space-y-8">
                <div>
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-2">
                    01. Service_Title
                  </label>
                  <input
                    placeholder="Service name..."
                    className="w-full bg-transparent border-b border-[#333] py-3 text-sm text-white outline-none focus:border-[#b87333] transition-colors"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-2">
                    02. Functional_Category
                  </label>
                  <input
                    placeholder="Category..."
                    className="w-full bg-transparent border-b border-[#333] py-3 text-sm text-white outline-none focus:border-[#b87333] transition-colors"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-2">
                    03. Description_Manifesto
                  </label>
                  <textarea
                    placeholder="Details..."
                    className="w-full bg-transparent border-b border-[#333] py-3 text-sm text-white outline-none focus:border-[#b87333] min-h-[100px] resize-none transition-colors"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-12 py-6 bg-[#b87333] text-white text-[10px] font-black uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all duration-500 flex items-center justify-center gap-3"
              >
                <Check size={14} />
                Commit_to_Database
              </button>
            </form>
          </div>
        )}

        {/* DATA TABLE */}
        <div className="bg-[#111] border border-[#222] shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#222] text-[9px] font-black uppercase tracking-[0.4em] text-gray-500">
                <th className="px-8 py-6">ID</th>
                <th className="px-8 py-6">Title / Category</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a1a1a]">
              {services.map((service, idx) => (
                <tr
                  key={service._id}
                  className="group relative hover:bg-[#161616] transition-all duration-500"
                >
                  <td className="px-8 py-6 text-[10px] font-mono text-gray-600">
                    0{idx + 1}
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-bold text-white uppercase tracking-tighter group-hover:text-[#b87333] transition-colors duration-300">
                      {service.title}
                    </p>
                    <p className="text-[9px] text-[#b87333] uppercase tracking-widest opacity-70">
                      {service.category}
                    </p>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="text-[#333] hover:text-red-500 transition-colors"
                      title="Delete Entry"
                    >
                      <Trash2 size={18} strokeWidth={1.5} />
                    </button>
                  </td>
                </tr>
              ))}
              {services.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-8 py-20 text-center text-gray-600 text-xs uppercase tracking-widest border-dashed border border-[#222]"
                  >
                    No data found in current repository.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
