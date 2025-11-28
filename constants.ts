import { SystemMode, Game } from './types';

export const WALLPAPERS = {
  [SystemMode.GAMING]: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop', // Gaming abstract
  [SystemMode.PRODUCTIVITY]: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2670&auto=format&fit=crop', // Clean office
  [SystemMode.CREATION]: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop', // Artistic
  [SystemMode.AI]: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2665&auto=format&fit=crop', // AI Network
  [SystemMode.SOCIAL]: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2832&auto=format&fit=crop', // People/Connection
};

export const MOCK_GAMES: Game[] = [
  { id: '1', title: 'Cyber Odyssey 2077', coverUrl: 'https://picsum.photos/300/400?random=1', rating: 4.8 },
  { id: '2', title: 'Starfield Horizons', coverUrl: 'https://picsum.photos/300/400?random=2', rating: 4.5 },
  { id: '3', title: 'Elden Ring: Shattered', coverUrl: 'https://picsum.photos/300/400?random=3', rating: 4.9 },
  { id: '4', title: 'Apex Legends Mobile', coverUrl: 'https://picsum.photos/300/400?random=4', rating: 4.2 },
  { id: '5', title: 'Forza Street', coverUrl: 'https://picsum.photos/300/400?random=5', rating: 4.0 },
  { id: '6', title: 'Valorant Go', coverUrl: 'https://picsum.photos/300/400?random=6', rating: 4.6 },
];
