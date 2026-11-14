// src/lib/useFaparState.ts
import { useSyncExternalStore } from 'react';
import { faparStore, type FaparStoreState } from './store';

export function useFaparState(): FaparStoreState {
  return useSyncExternalStore(
    faparStore.subscribe,
    faparStore.getState,
    faparStore.getServerSnapshot
  );
}

// Helpers úteis de cálculo de nível e progresso
export function calculateUserLevel(totalXp: number): {
  level: number;
  currentLevelXp: number;
  xpNeededForNextLevel: number;
  progressPercent: number;
  title: string;
} {
  const XP_PER_LEVEL = 200;
  const level = Math.floor(totalXp / XP_PER_LEVEL) + 1;
  const currentLevelXp = totalXp % XP_PER_LEVEL;
  const xpNeededForNextLevel = XP_PER_LEVEL;
  const progressPercent = Math.min(100, Math.round((currentLevelXp / XP_PER_LEVEL) * 100));

  let title = 'Iniciante do Vale';
  if (level >= 8) title = 'Lenda do Palco Central';
  else if (level >= 6) title = 'Mestre Cosmaker';
  else if (level >= 4) title = 'Veterano de Araras';
  else if (level >= 2) title = 'Explorador Geek';

  return {
    level,
    currentLevelXp,
    xpNeededForNextLevel,
    progressPercent,
    title,
  };
}
