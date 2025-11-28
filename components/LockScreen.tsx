import React, { useState, useEffect } from 'react';
import { Fingerprint, Lock, ChevronUp } from 'lucide-react';

interface LockScreenProps {
  onUnlock: () => void;
}

const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [time, setTime] = useState(new Date());
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleInteraction = () => {
    setIsSliding(true);
    setTimeout(onUnlock, 400);
  };

  return (
    <div 
      className={`absolute inset-0 z-[100] bg-cover bg-center transition-transform duration-500 ease-in-out ${isSliding ? '-translate-y-full' : 'translate-y-0'}`}
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')` }}
      onClick={handleInteraction}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex flex-col items-center justify-between py-20 text-white">
        
        {/* Top: Date */}
        <div className="text-center animate-in fade-in slide-in-from-top duration-700">
           <h2 className="text-xl font-light tracking-[0.2em] uppercase">{time.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</h2>
        </div>

        {/* Center: Time */}
        <div className="text-center font-futuristic">
           <h1 className="text-9xl font-bold tracking-tighter drop-shadow-2xl">{time.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false })}</h1>
        </div>

        {/* Bottom: Unlock CTA */}
        <div className="flex flex-col items-center gap-4 animate-bounce">
           <div className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors cursor-pointer" onClick={handleInteraction}>
             <Fingerprint className="w-8 h-8 text-cyan-400" />
           </div>
           <div className="flex items-center gap-2 text-sm text-white/60 tracking-widest uppercase">
             <ChevronUp className="w-4 h-4" />
             Swipe or Click to Unlock
           </div>
        </div>

      </div>
    </div>
  );
};

export default LockScreen;
