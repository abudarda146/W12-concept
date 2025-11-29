import React, { useState, useEffect, useRef } from 'react';
import { Play, RefreshCw, Crosshair } from 'lucide-react';

const SpaceShooter: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  // Game State Refs (to avoid re-renders during loop)
  const shipPos = useRef({ x: 50 }); // Percentage 0-100
  const enemies = useRef<{ x: number; y: number; speed: number; id: number }[]>([]);
  const bullets = useRef<{ x: number; y: number; id: number }[]>([]);
  const animationFrameId = useRef<number>(0);
  const lastTime = useRef<number>(0);
  const spawnTimer = useRef<number>(0);

  const startGame = () => {
    shipPos.current = { x: 50 };
    enemies.current = [];
    bullets.current = [];
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    lastTime.current = performance.now();
    requestAnimationFrame(gameLoop);
  };

  const fireBullet = () => {
    if (!isPlaying || gameOver) return;
    bullets.current.push({ x: shipPos.current.x, y: 80, id: Date.now() });
  };

  const gameLoop = (time: number) => {
    if (!isPlaying || gameOver) return;
    const deltaTime = time - lastTime.current;
    lastTime.current = time;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear Screen
    ctx.fillStyle = '#050510';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Stars Background
    ctx.fillStyle = '#ffffff';
    for(let i=0; i<10; i++) {
        if(Math.random() > 0.9) ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 1, 1);
    }

    // Spawn Enemies
    spawnTimer.current += deltaTime;
    if (spawnTimer.current > 1000) { // Spawn every second
      enemies.current.push({
        x: Math.random() * 100, // 0-100%
        y: -10, // Start above screen
        speed: 0.2 + (Math.random() * 0.2), // Speed
        id: Date.now()
      });
      spawnTimer.current = 0;
    }

    // Update & Draw Ship
    const shipX = (shipPos.current.x / 100) * canvas.width;
    const shipY = canvas.height - 50;
    
    ctx.fillStyle = '#00ffff';
    ctx.beginPath();
    ctx.moveTo(shipX, shipY);
    ctx.lineTo(shipX - 15, shipY + 30);
    ctx.lineTo(shipX + 15, shipY + 30);
    ctx.fill();

    // Update Bullets
    ctx.fillStyle = '#ff0055';
    bullets.current.forEach((b, i) => {
      b.y -= 5; // Bullet speed
      // Draw Bullet
      ctx.fillRect((b.x / 100) * canvas.width - 2, (b.y / 100) * canvas.height, 4, 10);
      
      // Remove off-screen
      if(b.y < -10) bullets.current.splice(i, 1);
    });

    // Update Enemies
    ctx.fillStyle = '#888888';
    enemies.current.forEach((e, ei) => {
       e.y += e.speed * (deltaTime / 10); // Move down

       const ex = (e.x / 100) * canvas.width;
       const ey = (e.y / 100) * canvas.height;

       // Draw Enemy (Asteroid)
       ctx.beginPath();
       ctx.arc(ex, ey, 15, 0, Math.PI * 2);
       ctx.fill();

       // Collision with Ship
       if(ey > canvas.height - 60 && Math.abs(ex - shipX) < 30) {
           setGameOver(true);
           setIsPlaying(false);
       }

       // Collision with Bullets
       bullets.current.forEach((b, bi) => {
           const bx = (b.x / 100) * canvas.width;
           const by = (b.y / 100) * canvas.height;
           // Simple distance check
           const dist = Math.sqrt(Math.pow(ex - bx, 2) + Math.pow(ey - by, 2));
           if(dist < 20) {
               // Hit!
               enemies.current.splice(ei, 1);
               bullets.current.splice(bi, 1);
               setScore(s => s + 100);
           }
       });

       // Remove off-screen
       if(e.y > 110) {
           enemies.current.splice(ei, 1);
           // Penalty for missing? Optional.
       }
    });

    if(!gameOver) {
        animationFrameId.current = requestAnimationFrame(gameLoop);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if(!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    shipPos.current.x = percentage;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if(!canvasRef.current || !isPlaying) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    shipPos.current.x = percentage;
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-black/80 backdrop-blur-md p-4 overflow-hidden">
      <div className="flex justify-between w-full max-w-md mb-4 px-2">
         <h2 className="text-xl font-futuristic text-cyan-400">SPACE DEFENDER</h2>
         <span className="text-white font-mono">SCORE: {score}</span>
      </div>

      <div className="relative border-2 border-cyan-500/30 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.2)]">
        <canvas
            ref={canvasRef}
            width={350}
            height={500}
            className="bg-black cursor-crosshair touch-none"
            onTouchMove={handleTouchMove}
            onMouseMove={handleMouseMove}
            onClick={fireBullet} // Click to shoot
        />

        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70">
             <button onClick={startGame} className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-8 rounded-full flex items-center gap-2 transition-transform hover:scale-105">
               <Play className="w-5 h-5 fill-current" /> LAUNCH MISSION
             </button>
             <p className="text-white/50 text-xs mt-4">Drag to Move • Tap/Click to Shoot</p>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/60 backdrop-blur-sm">
             <h3 className="text-3xl font-bold text-white mb-2">MISSION FAILED</h3>
             <p className="text-white/70 mb-6">Final Score: {score}</p>
             <button onClick={startGame} className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-6 rounded-full flex items-center gap-2">
               <RefreshCw className="w-4 h-4" /> RESTART
             </button>
          </div>
        )}
        
        {/* Fire Button for Mobile Overlay */}
        {isPlaying && (
            <button 
                className="absolute bottom-4 right-4 w-16 h-16 bg-red-500/50 rounded-full flex items-center justify-center border border-red-400 md:hidden active:bg-red-500/80"
                onTouchStart={(e) => { e.preventDefault(); fireBullet(); }}
            >
                <Crosshair className="w-8 h-8 text-white" />
            </button>
        )}
      </div>
    </div>
  );
};

export default SpaceShooter;