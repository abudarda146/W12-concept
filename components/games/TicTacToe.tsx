import React, { useState, useEffect } from 'react';
import { RefreshCw, X, Circle } from 'lucide-react';

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  const checkWinner = (squares: any[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    
    const win = checkWinner(newBoard);
    if (win) {
      setWinner(win);
    } else if (!newBoard.includes(null)) {
      setWinner('Draw');
    } else {
      setIsXNext(!isXNext);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-black/80 backdrop-blur-md p-4">
      <h2 className="text-3xl font-futuristic text-cyan-400 mb-8 tracking-wider">NEON TIC-TAC-TOE</h2>
      
      <div className="grid grid-cols-3 gap-3 mb-8">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={`w-20 h-20 md:w-24 md:h-24 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-4xl transition-all duration-300 ${
              !cell && !winner ? 'hover:bg-white/10 hover:scale-105' : ''
            } ${
               cell === 'X' ? 'text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]' : 
               cell === 'O' ? 'text-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.3)]' : ''
            }`}
          >
            {cell === 'X' && <X className="w-12 h-12" />}
            {cell === 'O' && <Circle className="w-10 h-10" />}
          </button>
        ))}
      </div>

      <div className="h-16 flex items-center justify-center w-full">
        {winner ? (
          <div className="flex flex-col items-center animate-in zoom-in duration-300">
            <span className="text-2xl font-bold text-white mb-2">
              {winner === 'Draw' ? 'GAME DRAW' : `${winner} WINS!`}
            </span>
            <button 
              onClick={resetGame}
              className="flex items-center gap-2 px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-full transition-colors"
            >
              <RefreshCw className="w-4 h-4" /> Play Again
            </button>
          </div>
        ) : (
          <div className="text-white/60 font-futuristic text-xl">
            Player {isXNext ? 'X' : 'O'}'s Turn
          </div>
        )}
      </div>
    </div>
  );
};

export default TicTacToe;