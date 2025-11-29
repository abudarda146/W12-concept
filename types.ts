import { ReactNode } from 'react';

export enum SystemMode {
  GAMING = 'Gaming',
  PRODUCTIVITY = 'Productivity',
  CREATION = 'Creation',
  AI = 'AI/Assistance',
  SOCIAL = 'Social',
}

export interface AppWindow {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  component: ReactNode;
  icon: ReactNode;
  mode: SystemMode;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  rating: number;
  type: 'internal' | 'external';
}