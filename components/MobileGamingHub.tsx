import React, { useState } from 'react';
import { Gamepad2, Wifi, Maximize2, Play, ArrowLeft } from 'lucide-react';
import { BROWSER_GAMES } from '../constants';
import TicTacToe from './games/TicTacToe';
import MemoryMatch from './games/MemoryMatch';
import Snake from './games/Snake';
import SpaceShooter from './games/SpaceShooter';

interface MobileGamingHubProps {
  onClose: () => void;
}

const MobileGamingHub: React.FC<MobileGamingHubProps> = ({ onClose }) => {
  const [activeGameId, setActiveGameId] = useState<string | null>(null);

  const getGameComponent = (id: string) => {
    switch (id) {
      case 'tictactoe': return <TicTacToe />;
      case 'memory': return <MemoryMatch />;
      case 'snake': return <Snake />;
      case 'shooter': return <SpaceShooter />;
      default: return (
        <div className="flex flex-col items-center justify-center h-full text-white">
          <Gamepad2 className="w-16 h-16 text-white/20 mb-4" />
          <h3 className="text-xl font-futuristic">Game Module Loading...</h3>
          <p className="text-white/50 mt-2">Connecting to external server.</p>
        </div>
      );
    }
  };

  const activeGame = BROWSER_GAMES.find(g => g.id === activeGameId);

  return (
    <div className="absolute inset-0 z-40 bg-gray-950 text-white overflow-hidden flex flex-col">
      {/* Background Graphic - Persistent */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-screen filter blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-600 rounded-full mix-blend-screen filter blur-[100px]"></div>
      </div>

      {/* Header */}
      <div className="relative z-20 flex justify-between items-center p-4 md:p-6 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
        <div className="flex items-center gap-3">
          {activeGameId ? (
            <button 
              onClick={() => setActiveGameId(null)}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/50">
              <Gamepad2 className="w-6 h-6 text-cyan-400" />
            </div>
          )}
          
          <div>
            <h1 className="font-futuristic text-lg md:text-xl font-bold tracking-widest uppercase">
              {activeGameId ? activeGame?.title : 'Arcade Core'}
            </h1>
            <span className="text-xs text-green-400 flex items-center gap-1">
              <Wifi className="w-3 h-3" /> Online • 12ms
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

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 overflow-hidden flex flex-col">
        {activeGameId ? (
          // Active Game View
          <div className="flex-1 w-full h-full animate-in fade-in zoom-in-95 duration-300">
             {getGameComponent(activeGameId)}
          </div>
        ) : (
          // Hub View
          <div className="flex-1 overflow-y-auto px-4 md:px-6 pb-24">
            
            {/* Featured Hero */}
            <div className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden border border-white/20 shadow-2xl shadow-cyan-900/20 group cursor-pointer mb-8"
               onClick={() => setActiveGameId('snake')}
            >
              <img 
                src={BROWSER_GAMES[2].coverUrl} 
                alt="Featured Game" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="px-2 py-1 rounded bg-cyan-500/80 text-black text-[10px] font-bold uppercase tracking-wider mb-2 inline-block">Featured</span>
                <h2 className="text-2xl md:text-4xl font-bold font-futuristic mb-2">{BROWSER_GAMES[2].title}</h2>
                <p className="text-white/70 text-sm mb-4 max-w-md">{BROWSER_GAMES[2].description}</p>
                <button className="bg-white text-black font-bold py-2 px-6 rounded-lg flex items-center gap-2 hover:scale-105 transition-transform">
                   <Play className="w-4 h-4 fill-current" /> Play Now
                </button>
              </div>
            </div>

            {/* Game Grid */}
            <h3 className="font-futuristic text-lg mb-4 text-white/80 border-b border-white/10 pb-2">Instant Play</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {BROWSER_GAMES.map((game) => (
                <div 
                  key={game.id} 
                  onClick={() => setActiveGameId(game.id)}
                  className="bg-gray-800/50 rounded-xl overflow-hidden group cursor-pointer border border-white/5 hover:border-cyan-500/50 hover:bg-gray-800 transition-all"
                >
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={game.coverUrl} 
                      alt={game.title} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" 
                    />
                  </div>
                  <div className="p-3">
                    <span className="text-sm font-bold truncate block">{game.title}</span>
                    <div className="flex justify-between items-center mt-2">
                       <span className="text-[10px] uppercase text-cyan-400 border border-cyan-500/30 px-1.5 py-0.5 rounded">{game.type}</span>
                       <span className="text-xs text-yellow-400">★ {game.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default MobileGamingHub;