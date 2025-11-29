import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Play, RefreshCw } from 'lucide-react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const SPEED = 150;

const Snake: React.FC = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 15, y: 5 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const boardRef = useRef<HTMLDivElement>(null);

  const generateFood = () => {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  };

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood());
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isPlaying) return;
    
    switch (e.key) {
      case 'ArrowUp': if (direction.y !== 1) setDirection({ x: 0, y: -1 }); break;
      case 'ArrowDown': if (direction.y !== -1) setDirection({ x: 0, y: 1 }); break;
      case 'ArrowLeft': if (direction.x !== 1) setDirection({ x: -1, y: 0 }); break;
      case 'ArrowRight': if (direction.x !== -1) setDirection({ x: 1, y: 0 }); break;
    }
  }, [direction, isPlaying]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const gameLoop = setInterval(() => {
      setSnake(prevSnake => {
        const newHead = {
          x: prevSnake[0].x + direction.x,
          y: prevSnake[0].y + direction.y
        };

        // Check Wall Collision
        if (
          newHead.x < 0 || newHead.x >= GRID_SIZE ||
          newHead.y < 0 || newHead.y >= GRID_SIZE
        ) {
          setGameOver(true);
          return prevSnake;
        }

        // Check Self Collision
        if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Check Food Collision
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(s => s + 10);
          setFood(generateFood());
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, SPEED);

    return () => clearInterval(gameLoop);
  }, [isPlaying, gameOver, direction, food]);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-black/80 backdrop-blur-md p-4 touch-none">
      <div className="flex justify-between w-full max-w-md mb-4 px-2">
         <h2 className="text-xl font-futuristic text-green-400">HOLO SNAKE</h2>
         <span className="text-white font-mono">SCORE: {score}</span>
      </div>

      <div 
        ref={boardRef}
        className="relative bg-gray-900 border-2 border-green-500/30 rounded-lg shadow-[0_0_20px_rgba(34,197,94,0.1)] overflow-hidden"
        style={{ 
          width: 'min(90vw, 400px)', 
          height: 'min(90vw, 400px)',
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
        }}
      >
        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
             <button onClick={resetGame} className="bg-green-500 hover:bg-green-400 text-black font-bold py-3 px-8 rounded-full flex items-center gap-2 transition-transform hover:scale-105">
               <Play className="w-5 h-5 fill-current" /> START GAME
             </button>
             <p className="text-white/50 text-xs mt-4">Use Arrow Keys or Buttons</p>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-red-900/40 backdrop-blur-sm">
             <h3 className="text-3xl font-bold text-white mb-2">GAME OVER</h3>
             <p className="text-white/70 mb-6">Final Score: {score}</p>
             <button onClick={resetGame} className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-6 rounded-full flex items-center gap-2">
               <RefreshCw className="w-4 h-4" /> RETRY
             </button>
          </div>
        )}

        {/* Render Snake */}
        {snake.map((segment, i) => (
          <div 
            key={`${segment.x}-${segment.y}-${i}`}
            className={`${i === 0 ? 'bg-green-400' : 'bg-green-600'} rounded-sm`}
            style={{ 
              gridColumnStart: segment.x + 1, 
              gridRowStart: segment.y + 1,
              boxShadow: i === 0 ? '0 0 10px rgba(74, 222, 128, 0.8)' : 'none'
            }}
          />
        ))}

        {/* Render Food */}
        <div 
          className="bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]"
          style={{ 
            gridColumnStart: food.x + 1, 
            gridRowStart: food.y + 1 
          }}
        />
      </div>

      {/* Mobile Controls */}
      <div className="grid grid-cols-3 gap-2 mt-8 md:hidden">
        <div />
        <button className="p-4 bg-white/10 rounded-xl active:bg-green-500/40" onClick={() => direction.y !== 1 && setDirection({ x: 0, y: -1 })}><ArrowUp className="w-6 h-6" /></button>
        <div />
        <button className="p-4 bg-white/10 rounded-xl active:bg-green-500/40" onClick={() => direction.x !== 1 && setDirection({ x: -1, y: 0 })}><ArrowLeft className="w-6 h-6" /></button>
        <button className="p-4 bg-white/10 rounded-xl active:bg-green-500/40" onClick={() => direction.y !== -1 && setDirection({ x: 0, y: 1 })}><ArrowDown className="w-6 h-6" /></button>
        <button className="p-4 bg-white/10 rounded-xl active:bg-green-500/40" onClick={() => direction.x !== -1 && setDirection({ x: 1, y: 0 })}><ArrowRight className="w-6 h-6" /></button>
      </div>
      
      {/* Desktop Hints */}
      <div className="hidden md:flex gap-4 mt-6 text-white/30 text-sm">
         <span className="flex items-center gap-1"><span className="border border-white/20 px-1 rounded">↑</span> Up</span>
         <span className="flex items-center gap-1"><span className="border border-white/20 px-1 rounded">↓</span> Down</span>
         <span className="flex items-center gap-1"><span className="border border-white/20 px-1 rounded">←</span> Left</span>
         <span className="flex items-center gap-1"><span className="border border-white/20 px-1 rounded">→</span> Right</span>
      </div>
    </div>
  );
};

export default Snake;