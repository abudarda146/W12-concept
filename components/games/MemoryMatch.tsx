import React, { useState, useEffect } from 'react';
import { Cpu, Gamepad2, Wifi, Zap, RefreshCw, Layers, Box, Disc } from 'lucide-react';

const ICONS = [Cpu, Gamepad2, Wifi, Zap, Layers, Box, Disc, RefreshCw];

interface Card {
  id: number;
  iconId: number;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryMatch: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const shuffleCards = () => {
    const doubled = [...ICONS, ...ICONS];
    const shuffled = doubled
      .map((icon, index) => ({ icon, sort: Math.random(), id: index }))
      .sort((a, b) => a.sort - b.sort)
      .map((item, index) => ({
        id: index,
        iconId: ICONS.indexOf(item.icon),
        isFlipped: false,
        isMatched: false
      }));
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setIsCompleted(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched) return;

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped;
      
      if (cards[first].iconId === cards[second].iconId) {
        // Match found
        setTimeout(() => {
          const matchedCards = [...newCards];
          matchedCards[first].isMatched = true;
          matchedCards[second].isMatched = true;
          setCards(matchedCards);
          setFlippedCards([]);
          
          if (matchedCards.every(c => c.isMatched)) {
            setIsCompleted(true);
          }
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          const resetCards = [...newCards];
          resetCards[first].isFlipped = false;
          resetCards[second].isFlipped = false;
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-black/80 backdrop-blur-md p-4">
      <div className="flex justify-between w-full max-w-md mb-6 px-4">
         <h2 className="text-2xl font-futuristic text-purple-400 tracking-wider">MEMORY MATRIX</h2>
         <span className="text-white/60 font-mono">MOVES: {moves}</span>
      </div>

      <div className="grid grid-cols-4 gap-3 md:gap-4 max-w-md w-full aspect-square">
        {cards.map((card) => {
          const Icon = ICONS[card.iconId];
          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`relative w-full h-full rounded-lg transition-all duration-500 transform style-preserve-3d ${
                card.isFlipped || card.isMatched ? 'rotate-y-180 bg-purple-500/20 border-purple-400' : 'bg-white/10 border-white/10 hover:bg-white/20'
              } border`}
              style={{ perspective: '1000px' }}
            >
               <div className={`flex items-center justify-center w-full h-full transition-all duration-300 ${card.isFlipped || card.isMatched ? 'opacity-100' : 'opacity-0'}`}>
                 <Icon className={`w-6 h-6 md:w-8 md:h-8 ${card.isMatched ? 'text-green-400' : 'text-purple-300'}`} />
               </div>
               {/* Card Back Design */}
               <div className={`absolute inset-0 flex items-center justify-center ${card.isFlipped || card.isMatched ? 'opacity-0' : 'opacity-100'}`}>
                 <div className="w-2 h-2 rounded-full bg-white/20"></div>
               </div>
            </button>
          );
        })}
      </div>

      {isCompleted && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-10 animate-in fade-in">
          <div className="text-center">
            <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
              SYSTEM UNLOCKED
            </h3>
            <p className="text-white/60 mb-8">Memory Matrix cleared in {moves} moves.</p>
            <button 
              onClick={shuffleCards}
              className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold transition-colors"
            >
              Reset Simulation
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryMatch;