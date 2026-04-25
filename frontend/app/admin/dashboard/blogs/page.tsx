"use client";
import React from 'react';
import { PenTool, Plus, Edit3, Trash2 } from 'lucide-react';

export default function BlogManager() {
  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-[10px] font-black tracking-[0.8em] uppercase text-[#b87333] mb-4">Content_Studio</h2>
          <h1 className="text-5xl font-thin tracking-tighter uppercase">Journal <span className="italic font-serif text-[#b87333]">Entries</span></h1>
        </div>
        
        <button className="px-8 py-4 border border-[#b87333] text-[10px] font-black uppercase tracking-[0.3em] text-[#b87333] hover:bg-[#b87333] hover:text-white transition-all">
          Draft_New_Post +
        </button>
      </header>

      {/* Blog List Table */}
      <div className="bg-[#0a0a0a] border border-white/5 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="border-b border-white/5 bg-white/[0.02]">
            <tr>
              <th className="p-6 text-[10px] uppercase tracking-[0.2em] text-gray-500">Post_Title</th>
              <th className="p-6 text-[10px] uppercase tracking-[0.2em] text-gray-500">Date</th>
              <th className="p-6 text-[10px] uppercase tracking-[0.2em] text-gray-500">Status</th>
              <th className="p-6 text-[10px] uppercase tracking-[0.2em] text-gray-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr className="hover:bg-white/[0.01] transition-colors group">
              <td className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-[#b87333]/50 transition-colors">
                    <PenTool size={14} className="text-gray-600 group-hover:text-[#b87333]" />
                  </div>
                  <span className="text-sm font-light tracking-tight">The Future of Minimalist Architecture</span>
                </div>
              </td>
              <td className="p-6 text-[10px] font-mono text-gray-500 uppercase tracking-widest">Oct_24_2023</td>
              <td className="p-6">
                <span className="text-[8px] px-3 py-1 border border-emerald-500/30 text-emerald-500 uppercase font-black">Published</span>
              </td>
              <td className="p-6 text-right">
                <div className="flex justify-end gap-2">
                  <button className="p-3 border border-white/5 text-gray-500 hover:text-white transition-all"><Edit3 size={14} /></button>
                  <button className="p-3 border border-white/5 text-gray-500 hover:text-red-500 transition-all"><Trash2 size={14} /></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}