import React from 'react';
import { Box, Search, MessageSquare, Layout, Wifi, Battery, Volume2, Gamepad2, Briefcase, Palette, Users, Cpu } from 'lucide-react';
import { SystemMode } from '../types';

interface TaskbarProps {
  onStartClick: () => void;
  onAIClick: () => void;
  currentMode: SystemMode;
  onMobileGamingClick: () => void;
}

const Taskbar: React.FC<TaskbarProps> = ({ onStartClick, onAIClick, currentMode, onMobileGamingClick }) => {
  // Determine mode-specific styles
  const getModeColor = () => {
    switch (currentMode) {
      case SystemMode.GAMING: return 'border-cyan-500/50 shadow-cyan-500/20';
      case SystemMode.PRODUCTIVITY: return 'border-blue-500/50 shadow-blue-500/20';
      case SystemMode.CREATION: return 'border-purple-500/50 shadow-purple-500/20';
      case SystemMode.SOCIAL: return 'border-pink-500/50 shadow-pink-500/20';
      default: return 'border-white/20';
    }
  };

  const ModeIcon = () => {
    switch (currentMode) {
      case SystemMode.GAMING: return <Gamepad2 className="w-5 h-5" />;
      case SystemMode.PRODUCTIVITY: return <Briefcase className="w-5 h-5" />;
      case SystemMode.CREATION: return <Palette className="w-5 h-5" />;
      case SystemMode.SOCIAL: return <Users className="w-5 h-5" />;
      default: return <Cpu className="w-5 h-5" />;
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-auto max-w-[95vw]">
      <div className={`glass-panel rounded-full px-4 py-2 flex items-center gap-4 transition-all duration-500 ${getModeColor()} shadow-lg`}>
        
        {/* Start / System Menu */}
        <button 
          onClick={onStartClick}
          className="p-2.5 rounded-full hover:bg-white/10 transition-colors relative group"
        >
          <Box className="w-6 h-6 text-white transform group-hover:rotate-90 transition-transform duration-300" />
        </button>

        <div className="w-px h-6 bg-white/10 mx-1"></div>

        {/* Pinned Apps Area */}
        <div className="flex items-center gap-2">
           {/* Mode Specific Quick Launch */}
           <button onClick={onMobileGamingClick} className="p-2 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-all hover:scale-110">
             <ModeIcon />
           </button>
           
           <button className="p-2 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-all hover:scale-110">
             <MessageSquare className="w-5 h-5" />
           </button>
           
           <button className="p-2 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-all hover:scale-110">
             <Layout className="w-5 h-5" />
           </button>
        </div>

        {/* Search Pill */}
        <div className="hidden md:flex items-center bg-white/5 rounded-full px-3 py-1.5 border border-white/5 w-48 hover:bg-white/10 transition-colors cursor-text">
          <Search className="w-3 h-3 text-white/50 mr-2" />
          <span className="text-xs text-white/50 font-futuristic">Type to search...</span>
        </div>

        <div className="w-px h-6 bg-white/10 mx-1"></div>

        {/* System Tray */}
        <div className="flex items-center gap-3 pr-2">
          <button onClick={onAIClick} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-purple-500 rounded-full blur opacity-40 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative p-2 rounded-full bg-black/20 border border-white/10 group-hover:scale-105 transition-transform">
              <Cpu className="w-4 h-4 text-white" />
            </div>
          </button>
          
          <div className="flex flex-col items-end mr-2 cursor-default">
            <div className="flex gap-2 text-white/80">
                <Wifi className="w-4 h-4" />
                <Volume2 className="w-4 h-4" />
                <Battery className="w-4 h-4" />
            </div>
            <span className="text-[10px] text-white/50 font-futuristic mt-0.5">12:45 PM</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Taskbar;
