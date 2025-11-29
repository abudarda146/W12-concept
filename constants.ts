import { SystemMode, Game } from './types';

export const WALLPAPERS = {
  [SystemMode.GAMING]: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop', // Gaming abstract
  [SystemMode.PRODUCTIVITY]: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2670&auto=format&fit=crop', // Clean office
  [SystemMode.CREATION]: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop', // Artistic
  [SystemMode.AI]: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2665&auto=format&fit=crop', // AI Network
  [SystemMode.SOCIAL]: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2832&auto=format&fit=crop', // People/Connection
};

export const BROWSER_GAMES: Game[] = [
  { 
    id: 'tictactoe', 
    title: 'Neon Tic-Tac-Toe', 
    description: 'Classic strategy with a cyberpunk twist.',
    coverUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop', 
    rating: 4.5,
    type: 'internal'
  },
  { 
    id: 'memory', 
    title: 'Cyber Memory Matrix', 
    description: 'Test your cognitive recall in the grid.',
    coverUrl: 'https://images.unsplash.com/photo-1620912189868-30778f281e01?q=80&w=1000&auto=format&fit=crop', 
    rating: 4.8,
    type: 'internal'
  },
  { 
    id: 'snake', 
    title: 'Holo Snake', 
    description: 'Navigate the grid, collect energy, grow longer.',
    coverUrl: 'https://images.unsplash.com/photo-1628277613967-6ab5814525b9?q=80&w=1000&auto=format&fit=crop', 
    rating: 4.7,
    type: 'internal'
  },
  { 
    id: 'shooter', 
    title: 'Space Defender', 
    description: 'Defend your sector from incoming debris.',
    coverUrl: 'https://images.unsplash.com/photo-1614726365206-3f140656a956?q=80&w=1000&auto=format&fit=crop', 
    rating: 4.6,
    type: 'internal'
  }
];