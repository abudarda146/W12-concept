import React from 'react';
import { Gamepad2, Wifi, Battery, Maximize2, Play, Users } from 'lucide-react';
import { Game, SystemMode } from '../types';
import { MOCK_GAMES } from '../constants';

interface MobileGamingHubProps {
  onClose: () => void;
}

const MobileGamingHub: React.FC<MobileGamingHubProps> = ({ onClose }) => {
  return (
    <div className="absolute inset-0 z-40 bg-gray-900 text-white overflow-hidden flex flex-col">
      {/* Background Graphic */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-screen filter blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-600 rounded-full mix-blend-screen filter blur-[100px]"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex justify-between items-center p-6 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/50">
            <Gamepad2 className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h1 className="font-futuristic text-xl font-bold tracking-widest uppercase">Console Mode</h1>
            <span className="text-xs text-green-400 flex items-center gap-1">
              <Wifi className="w-3 h-3" /> 5G Connected • Latency 12ms
            </span>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md"
        >
          <Maximize2 className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Featured Stream */}
      <div className="relative px-6 mb-8 flex-shrink-0">
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/20 shadow-2xl shadow-cyan-900/40 group cursor-pointer">
          <img 
            src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2765&auto=format&fit=crop" 
            alt="Featured Game" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <span className="px-2 py-1 rounded bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider mb-2 inline-block">Resume Session</span>
            <h2 className="text-2xl font-bold font-futuristic">Cyberpunk 2077</h2>
            <div className="flex items-center gap-4 mt-2">
               <button className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-colors">
                 <Play className="w-4 h-4 fill-current" /> Stream Now
               </button>
               <button className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20">
                 <Users className="w-5 h-5" />
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* Library Grid */}
      <div className="flex-1 overflow-y-auto px-6 pb-24">
        <h3 className="font-futuristic text-lg mb-4 text-white/80">Your Library</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {MOCK_GAMES.map((game) => (
            <div key={game.id} className="relative aspect-[3/4] bg-gray-800 rounded-xl overflow-hidden group cursor-pointer border border-transparent hover:border-cyan-500 transition-all">
              <img src={game.coverUrl} alt={game.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                <span className="text-sm font-bold truncate">{game.title}</span>
                <div className="flex items-center gap-1 mt-1">
                   <span className="text-xs text-yellow-400">★ {game.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default MobileGamingHub;
