import React, { useState, useEffect } from 'react';
import Taskbar from './Taskbar';
import StartMenu from './StartMenu';
import AIAssistant from './AIAssistant';
import MobileGamingHub from './MobileGamingHub';
import { SystemMode } from '../types';
import { WALLPAPERS } from '../constants';

const Desktop: React.FC = () => {
  const [currentMode, setCurrentMode] = useState<SystemMode>(SystemMode.PRODUCTIVITY);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isMobileGamingOpen, setIsMobileGamingOpen] = useState(false);
  const [wallpaper, setWallpaper] = useState(WALLPAPERS[SystemMode.PRODUCTIVITY]);

  useEffect(() => {
    // Smooth transition for wallpaper
    const img = new Image();
    img.src = WALLPAPERS[currentMode];
    img.onload = () => {
        setWallpaper(WALLPAPERS[currentMode]);
    }
  }, [currentMode]);

  const toggleStart = () => {
    setIsStartOpen(!isStartOpen);
    if (isAIOpen) setIsAIOpen(false);
  };

  const toggleAI = () => {
    setIsAIOpen(!isAIOpen);
    if (isStartOpen) setIsStartOpen(false);
  };

  const handleDesktopClick = () => {
    if (isStartOpen) setIsStartOpen(false);
    // Keep AI open unless explicitly closed usually, but close for clean feel here if clicking empty space?
    // Let's keep AI open as user might want to drag windows.
  };

  return (
    <div 
      className="relative w-full h-full overflow-hidden transition-all duration-1000 ease-in-out bg-cover bg-center"
      style={{ backgroundImage: `url(${wallpaper})` }}
      onClick={handleDesktopClick}
    >
      {/* Darken overlay for better contrast */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>

      {/* Desktop Icons Grid (Mock) */}
      <div className="absolute top-8 left-8 grid gap-6 grid-flow-row auto-rows-max pointer-events-none md:pointer-events-auto">
         {['My PC', 'Recycle Bin', 'File Explorer', 'Browser'].map((name) => (
             <div key={name} className="flex flex-col items-center gap-1 group w-24 p-2 rounded hover:bg-white/10 cursor-pointer transition-colors">
                 <div className="w-12 h-12 bg-blue-500/80 rounded-xl shadow-lg group-hover:scale-105 transition-transform flex items-center justify-center text-white font-bold text-xs">
                    {name.substring(0,2).toUpperCase()}
                 </div>
                 <span className="text-xs text-white shadow-black drop-shadow-md text-center">{name}</span>
             </div>
         ))}
      </div>

      {/* Main UI Layer */}
      <StartMenu 
        isOpen={isStartOpen} 
        onClose={() => setIsStartOpen(false)} 
        setSystemMode={(mode) => {
            setCurrentMode(mode);
            // If they click gaming, maybe auto open gaming hub if on mobile
            if(window.innerWidth < 768 && mode === SystemMode.GAMING) {
                setIsMobileGamingOpen(true);
            }
        }}
        currentMode={currentMode}
      />
      
      <AIAssistant 
        isOpen={isAIOpen} 
        onClose={() => setIsAIOpen(false)} 
        currentMode={currentMode}
      />

      {isMobileGamingOpen && (
        <MobileGamingHub onClose={() => setIsMobileGamingOpen(false)} />
      )}

      <Taskbar 
        onStartClick={toggleStart} 
        onAIClick={toggleAI}
        currentMode={currentMode}
        onMobileGamingClick={() => setIsMobileGamingOpen(true)}
      />
    </div>
  );
};

export default Desktop;
