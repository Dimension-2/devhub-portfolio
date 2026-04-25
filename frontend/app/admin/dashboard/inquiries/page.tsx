"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Database, Mail, Activity } from "lucide-react";

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- FETCH INQUIRIES ---
  const fetchInquiries = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/inquiries");
      setInquiries(res.data);
    } catch (err) {
      console.error("Fetch_Inquiry_Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Confirm protocol: Permanent deletion?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/inquiries/${id}`);
      setInquiries((prev) => prev.filter((iq: any) => iq._id !== id));
    } catch (err) {
      console.error("Delete_Error:", err);
      alert("System Error: Unable to purge record.");
    }
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
                Incoming_Inquiries_Log
              </h2>
            </div>
            <h1 className="text-6xl font-extralight text-white uppercase tracking-tighter">
              Review{" "}
              <span className="italic font-serif text-[#b87333] lowercase">
                messages
              </span>
            </h1>
            <p className="text-[10px] text-gray-600 font-mono mt-4 uppercase tracking-[0.2em]">
              Total_Records: {inquiries.length}
            </p>
          </div>
          <div className="hidden md:block h-[1px] flex-grow mx-12 bg-[#1a1a1a]" />
        </div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="h-64 flex flex-col items-center justify-center border border-[#222] border-dashed">
            <Activity className="animate-spin text-[#b87333] mb-4" />
            <span className="text-[10px] tracking-[1em] text-gray-500 uppercase">
              Syncing_Database
            </span>
          </div>
        ) : inquiries.length === 0 ? (
          <div className="text-center py-32 border border-[#222] border-dashed flex flex-col items-center justify-center">
            <Mail size={40} className="text-[#222] mb-4" />
            <p className="text-gray-600 font-mono text-[10px] uppercase tracking-[0.5em]">
              No_Inquiries_Found
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {inquiries.map((iq: any) => (
              <div
                key={iq._id}
                className="group relative bg-[#111] border border-[#222] p-8 transition-all duration-500 hover:border-[#b87333]/50 hover:shadow-[0_0_30px_rgba(184,115,51,0.05)]"
              >
                {/* Visual Hover Accent (Bronze border animation) */}
                <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#b87333] transition-all duration-500 group-hover:w-full" />

                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
                  <div>
                    <h3 className="font-light text-2xl tracking-tight text-white uppercase group-hover:text-[#b87333] transition-colors duration-300">
                      {iq.name}
                    </h3>
                    <p className="text-[#b87333] text-[11px] font-mono mt-1 opacity-70">
                      {iq.email}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-[9px] font-bold bg-white text-black px-4 py-2 uppercase tracking-widest">
                      {iq.projectType || "General"}
                    </span>
                    <span className="text-[10px] font-mono text-gray-700 uppercase">
                      #{iq._id.substring(iq._id.length - 4)}
                    </span>

                    <button
                      onClick={() => handleDelete(iq._id)}
                      className="ml-4 p-2 text-gray-700 hover:text-red-500 transition-colors"
                      title="Purge Record"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="relative mb-8 pl-6 border-l border-[#222] group-hover:border-[#b87333]/30 transition-colors duration-500">
                  <p className="text-gray-400 text-sm leading-relaxed italic font-serif">
                    "{iq.message}"
                  </p>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-[#1a1a1a]">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#b87333] shadow-[0_0_8px_#b87333]" />
                    <span className="text-[9px] font-mono text-gray-600 uppercase tracking-[0.2em]">
                      Secure_Transmission_Logged
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-gray-500 bg-[#1a1a1a] px-3 py-1 uppercase">
                    {new Date(iq.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}