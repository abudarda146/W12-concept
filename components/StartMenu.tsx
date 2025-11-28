import React, { useState } from 'react';
import { LayoutGrid, Briefcase, Palette, Cpu, Users, Search, ChevronRight } from 'lucide-react';
import { SystemMode } from '../types';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  setSystemMode: (mode: SystemMode) => void;
  currentMode: SystemMode;
}

const StartMenu: React.FC<StartMenuProps> = ({ isOpen, onClose, setSystemMode, currentMode }) => {
  if (!isOpen) return null;

  const categories = [
    { id: SystemMode.GAMING, icon: <LayoutGrid className="w-5 h-5" />, label: 'Gaming' },
    { id: SystemMode.PRODUCTIVITY, icon: <Briefcase className="w-5 h-5" />, label: 'Productivity' },
    { id: SystemMode.CREATION, icon: <Palette className="w-5 h-5" />, label: 'Creation' },
    { id: SystemMode.AI, icon: <Cpu className="w-5 h-5" />, label: 'AI Core' },
    { id: SystemMode.SOCIAL, icon: <Users className="w-5 h-5" />, label: 'Social' },
  ];

  return (
    <div 
      className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[600px] h-[500px] holographic rounded-3xl p-6 flex flex-col z-50 animate-in fade-in zoom-in-95 duration-200"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-3 w-5 h-5 text-white/50" />
        <input 
          type="text" 
          placeholder="Ask Laptop-Five AI or Search..." 
          className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:bg-white/10 transition-all font-futuristic"
        />
      </div>

      {/* Categories Tabs */}
      <div className="flex justify-between mb-6 px-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSystemMode(cat.id)}
            className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all min-w-[80px] ${
              currentMode === cat.id 
                ? 'bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.2)]' 
                : 'hover:bg-white/10 text-white/60 hover:text-white'
            }`}
          >
            <div className={`p-2 rounded-full ${currentMode === cat.id ? 'bg-cyan-500/20 text-cyan-300' : ''}`}>
              {cat.icon}
            </div>
            <span className="text-xs font-medium tracking-wide">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Widgets Area - Dynamic content based on mode */}
      <div className="flex-1 overflow-y-auto pr-2 grid grid-cols-2 gap-4">
        {/* Weather Widget */}
        <div className="col-span-1 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl p-4 border border-white/10 flex flex-col justify-between hover:scale-[1.02] transition-transform cursor-pointer">
          <div className="flex justify-between items-start">
            <span className="text-white/70 text-sm font-futuristic">WEATHER</span>
            <div className="w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]"></div>
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-light text-white">72°</h3>
            <p className="text-white/60 text-xs">San Francisco, Clear</p>
          </div>
        </div>

        {/* Calendar/Task Widget */}
        <div className="col-span-1 bg-white/5 rounded-2xl p-4 border border-white/10 flex flex-col gap-3 hover:scale-[1.02] transition-transform cursor-pointer">
           <span className="text-white/70 text-sm font-futuristic">NEXT UP</span>
           <div className="flex items-center gap-3">
             <div className="w-1 h-8 bg-cyan-500 rounded-full"></div>
             <div>
               <p className="text-white text-sm font-medium">Design Review</p>
               <p className="text-white/50 text-xs">10:00 AM - Teams</p>
             </div>
           </div>
        </div>

        {/* Recommended Apps */}
        <div className="col-span-2 bg-white/5 rounded-2xl p-4 border border-white/10">
           <div className="flex justify-between items-center mb-3">
             <span className="text-white/70 text-sm font-futuristic">RECOMMENDED</span>
             <ChevronRight className="w-4 h-4 text-white/50" />
           </div>
           <div className="flex gap-4">
             {[1,2,3,4].map(i => (
               <div key={i} className="w-12 h-12 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-colors">
                  <div className="w-6 h-6 rounded bg-gradient-to-tr from-cyan-400 to-blue-600"></div>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default StartMenu;
