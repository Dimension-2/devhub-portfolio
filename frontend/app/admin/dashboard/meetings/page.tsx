"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Calendar, 
  Clock, 
  User, 
  MapPin, 
  Briefcase, 
  Trash2, 
  Activity, 
  Database 
} from 'lucide-react';

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // --- FETCH MEETINGS ---
  const fetchMeetings = async () => {
    try {
      const res = await axios.get("https://devhub-portfolio-gtu4.vercel.app/api/meetings");
      setMeetings(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Fetch_Meetings_Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  // --- DELETE MEETING ---
  const handleDelete = async (id: string) => {
    if (!window.confirm("PROTOCOL_CONFIRMATION: Purge this meeting record from the archive?")) return;

    try {
      await axios.delete(`https://devhub-portfolio-gtu4.vercel.app/api/meetings/${id}`);
      setMeetings((prev) => prev.filter((m: any) => m._id !== id));
    } catch (err) {
      console.error("Purge_Error:", err);
      alert("System Error: Unable to clear meeting record.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans p-8 animate-in fade-in duration-700">
      {/* HEADER SECTION */}
      <header className="mb-20">
        <div className="flex items-center gap-4 mb-4">
          <Database size={16} className="text-[#b87333]" />
          <h2 className="text-[10px] font-black tracking-[0.8em] uppercase text-[#b87333]">
            Sync_Timeline_v4.0
          </h2>
        </div>
        <h1 className="text-6xl font-thin tracking-tighter uppercase leading-none">
          Scheduled <br />
          <span className="italic font-serif text-[#b87333] lowercase">meetings</span>
        </h1>
        <p className="text-[10px] text-gray-600 font-mono mt-6 uppercase tracking-[0.3em]">
          Active_Sessions: {meetings.length}
        </p>
      </header>

      {/* CONTENT GRID */}
      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <div className="h-64 flex flex-col items-center justify-center border border-white/5 border-dashed">
            <Activity className="animate-spin text-[#b87333] mb-4" />
            <span className="text-[10px] tracking-[1em] text-gray-500 uppercase">Indexing_Meetings</span>
          </div>
        ) : meetings.length === 0 ? (
          <div className="border border-white/5 bg-[#0a0a0a] p-24 text-center group hover:border-[#b87333]/30 transition-all duration-500">
            <Calendar className="mx-auto text-white/5 mb-6 group-hover:text-[#b87333]/20 transition-colors" size={48} />
            <p className="text-[10px] uppercase tracking-[0.5em] text-gray-600">No confirmed sessions in the queue.</p>
          </div>
        ) : (
          meetings.map((meeting: any) => (
            <div
              key={meeting._id}
              className="group relative bg-[#0d0d0d] border border-white/5 p-8 flex flex-col md:flex-row justify-between items-start md:items-center transition-all duration-500 hover:border-[#b87333]/40 hover:shadow-[0_0_40px_rgba(184,115,51,0.03)]"
            >
              {/* Bronze Top Glow Line */}
              <div className="absolute top-0 left-0 w-0 h-[1px] bg-[#b87333] transition-all duration-700 group-hover:w-full" />

              <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-12 flex-grow">
                {/* Time & Date Module */}
                <div className="flex flex-col items-start min-w-[140px]">
                  <div className="flex items-center gap-2 text-[#b87333] mb-1">
                    <Calendar size={12} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      {new Date(meeting.meetingDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-white/40">
                    <Clock size={12} />
                    <span className="text-[10px] font-mono">
                      {new Date(meeting.meetingDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>

                {/* Client Info */}
                <div className="max-w-xs">
                  <h3 className="text-xl font-light uppercase tracking-tight group-hover:text-[#b87333] transition-colors">
                    {meeting.fullName}
                  </h3>
                  <p className="text-[10px] text-gray-500 font-mono mt-1 lowercase">{meeting.email}</p>
                </div>

                {/* Project Details */}
                <div className="hidden lg:flex flex-col gap-2">
                   <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-gray-400">
                      <Briefcase size={10} className="text-[#b87333]" />
                      {meeting.projectType}
                   </div>
                   <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-gray-400">
                      <MapPin size={10} className="text-[#b87333]" />
                      {meeting.location}
                   </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 md:mt-0 flex items-center gap-6">
                <div className="flex flex-col items-end mr-4">
                   <span className="text-[8px] text-gray-600 uppercase tracking-widest mb-1">Status</span>
                   <span className="text-[9px] font-black uppercase text-green-500/80 bg-green-500/5 px-2 py-1 border border-green-500/20">
                     {meeting.status || 'Pending'}
                   </span>
                </div>
                
                <button
                  onClick={() => handleDelete(meeting._id)}
                  className="w-12 h-12 flex items-center justify-center rounded-full border border-white/5 text-gray-600 hover:text-red-500 hover:border-red-500/20 hover:bg-red-500/5 transition-all duration-300"
                  title="Purge Record"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}