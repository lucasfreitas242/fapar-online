// src/lib/store.ts
import {
  MOCK_CURRENT_USER,
  MOCK_BADGES,
  MOCK_INITIAL_USER_BADGES,
  MOCK_INITIAL_XP_TRANSACTIONS,
  MOCK_CONTEST_ENTRIES,
  MOCK_FLASHBACK_PHOTOS,
  MOCK_ARYA_LEADERBOARD,
  type UserProfile,
  type UserBadge,
  type XpTransaction,
  type XpSourceType,
  type ContestEntry,
  type AryaScore,
  type Badge,
} from '../data/mock';

export interface ToastMessage {
  id: string;
  title: string;
  description: string;
  type: 'success' | 'xp' | 'badge' | 'info';
  xpAmount?: number;
  badgeName?: string;
}

export interface FaparStoreState {
  isEventLive: boolean;
  currentUser: UserProfile;
  userBadges: UserBadge[];
  xpTransactions: XpTransaction[];
  votedCategoryMap: Record<string, string>; // category -> entry_id voted
  contestVotes: Record<string, number>; // entry_id -> votes count
  likedPhotos: Record<string, boolean>; // photo_id -> boolean
  photoLikesCount: Record<string, number>; // photo_id -> number
  aryaLeaderboard: AryaScore[];
  userAryaScore: number;
}

const STORAGE_KEY = 'fapar_online_v1_state';
const EVENT_NAME = 'fapar:state_change';
const TOAST_EVENT_NAME = 'fapar:toast';

const getDefaultContestVotes = (): Record<string, number> => {
  const map: Record<string, number> = {};
  MOCK_CONTEST_ENTRIES.forEach((entry) => {
    map[entry.id] = entry.popular_votes;
  });
  return map;
};

const getDefaultPhotoLikes = (): Record<string, number> => {
  const map: Record<string, number> = {};
  MOCK_FLASHBACK_PHOTOS.forEach((photo) => {
    map[photo.id] = photo.likes_count;
  });
  return map;
};

export const getInitialState = (): FaparStoreState => {
  return {
    isEventLive: false, // Inicia em Entressafra
    currentUser: { ...MOCK_CURRENT_USER },
    userBadges: [...MOCK_INITIAL_USER_BADGES],
    xpTransactions: [...MOCK_INITIAL_XP_TRANSACTIONS],
    votedCategoryMap: {},
    contestVotes: getDefaultContestVotes(),
    likedPhotos: {},
    photoLikesCount: getDefaultPhotoLikes(),
    aryaLeaderboard: [...MOCK_ARYA_LEADERBOARD],
    userAryaScore: 14200,
  };
};

let currentState: FaparStoreState = getInitialState();
let isInitialized = false;

// Inicializa no cliente
const initClientState = () => {
  if (typeof window === 'undefined' || isInitialized) return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      currentState = {
        ...getInitialState(),
        ...parsed,
        currentUser: {
          ...MOCK_CURRENT_USER,
          ...(parsed.currentUser || {}),
        },
      };
    } else {
      currentState = getInitialState();
    }
  } catch (e) {
    console.error('Failed to load FAPAR state from localStorage:', e);
    currentState = getInitialState();
  }
  isInitialized = true;
};

// Listeners para reatividade
const listeners = new Set<() => void>();

const saveAndNotify = () => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentState));
      window.dispatchEvent(new CustomEvent(EVENT_NAME));
    } catch (e) {
      console.error('Failed to save FAPAR state to localStorage:', e);
    }
  }
  listeners.forEach((listener) => listener());
};

export const triggerToast = (toast: Omit<ToastMessage, 'id'>) => {
  if (typeof window === 'undefined') return;
  const fullToast: ToastMessage = {
    ...toast,
    id: `toast_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
  };
  window.dispatchEvent(new CustomEvent(TOAST_EVENT_NAME, { detail: fullToast }));
};

export const faparStore = {
  getState(): FaparStoreState {
    if (typeof window !== 'undefined' && !isInitialized) {
      initClientState();
    }
    return currentState;
  },

  getServerSnapshot(): FaparStoreState {
    return getInitialState();
  },

  subscribe(listener: () => void): () => void {
    if (typeof window !== 'undefined' && !isInitialized) {
      initClientState();
    }
    listeners.add(listener);

    const handleCustomEvent = () => listener();
    const handleStorageEvent = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          currentState = JSON.parse(e.newValue);
          listener();
        } catch {
          // ignore
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener(EVENT_NAME, handleCustomEvent);
      window.addEventListener('storage', handleStorageEvent);
    }

    return () => {
      listeners.delete(listener);
      if (typeof window !== 'undefined') {
        window.removeEventListener(EVENT_NAME, handleCustomEvent);
        window.removeEventListener('storage', handleStorageEvent);
      }
    };
  },

  // 1. Alternar Modo: Dia de Evento vs Entressafra
  toggleEventMode(): boolean {
    const nextMode = !currentState.isEventLive;
    currentState = {
      ...currentState,
      isEventLive: nextMode,
    };
    saveAndNotify();
    triggerToast({
      title: nextMode ? '⚡ Modo Ao Vivo Ativado!' : '🌙 Modo Entressafra Ativado!',
      description: nextMode
        ? 'O portal agora exibe banners de dia de evento e liberou a Votação Popular ao vivo no palco!'
        : 'O portal agora foca nos destaques da comunidade, radar de encontros e desafios mensais.',
      type: 'info',
    });
    return nextMode;
  },

  // 2. Adicionar XP
  addXp(amount: number, sourceType: XpSourceType, description: string, referenceId?: string) {
    const newTx: XpTransaction = {
      id: `tx_${Date.now()}`,
      user_id: currentState.currentUser.id,
      amount,
      source_type: sourceType,
      description,
      reference_id: referenceId,
      created_at: new Date().toISOString(),
    };

    currentState = {
      ...currentState,
      currentUser: {
        ...currentState.currentUser,
        total_xp: currentState.currentUser.total_xp + amount,
      },
      xpTransactions: [newTx, ...currentState.xpTransactions],
    };

    saveAndNotify();
    return currentState.currentUser.total_xp;
  },

  // 3. Simular Scan de QR Code (+100 XP + badge Explorador de Araras)
  scanQrCode() {
    const badgeSlug = 'cacador-qr';
    const targetBadge = MOCK_BADGES.find((b) => b.slug === badgeSlug);
    const alreadyHasBadge = currentState.userBadges.some(
      (b) => b.badge_id === targetBadge?.id
    );

    let updatedBadges = [...currentState.userBadges];
    let unlockedNewBadge = false;

    if (targetBadge && !alreadyHasBadge) {
      updatedBadges.push({
        user_id: currentState.currentUser.id,
        badge_id: targetBadge.id,
        awarded_at: new Date().toISOString(),
      });
      unlockedNewBadge = true;
    }

    const newTx: XpTransaction = {
      id: `tx_${Date.now()}`,
      user_id: currentState.currentUser.id,
      amount: 100,
      source_type: 'qr_scan',
      description: 'Scan de Totem Presencial — Ponto Secreto em Araras',
      created_at: new Date().toISOString(),
    };

    currentState = {
      ...currentState,
      currentUser: {
        ...currentState.currentUser,
        total_xp: currentState.currentUser.total_xp + 100,
      },
      userBadges: updatedBadges,
      xpTransactions: [newTx, ...currentState.xpTransactions],
    };

    saveAndNotify();

    triggerToast({
      title: '🎯 Totem FAPAR Escaneado!',
      description: unlockedNewBadge
        ? 'Você ganhou +100 XP e desbloqueou a Conquista Épica "Explorador de Araras"!'
        : 'Você encontrou outro Totem e garantiu +100 XP para subir de nível!',
      type: 'badge',
      xpAmount: 100,
      badgeName: unlockedNewBadge ? targetBadge?.name : undefined,
    });
  },

  // 4. Votar no Favorito do Público (+50 XP)
  voteContestEntry(entry: ContestEntry): { success: boolean; message: string } {
    if (!currentState.isEventLive) {
      triggerToast({
        title: '🔒 Votação Fechada',
        description: 'A votação popular abre apenas durante o Dia de Evento (Ao Vivo). Alterne no controle demo no rodapé!',
        type: 'info',
      });
      return { success: false, message: 'Votação fechada na Entressafra' };
    }

    if (currentState.votedCategoryMap[entry.category]) {
      triggerToast({
        title: '⚠️ Voto já Registrado',
        description: `Você já votou nesta categoria (${entry.category.replace('_', ' ')}). Cada participante tem direito a 1 voto por modalidade.`,
        type: 'info',
      });
      return { success: false, message: 'Já votou nesta categoria' };
    }

    const currentEntryVotes = currentState.contestVotes[entry.id] ?? entry.popular_votes;
    const updatedVotes = {
      ...currentState.contestVotes,
      [entry.id]: currentEntryVotes + 1,
    };

    const newCategoryMap = {
      ...currentState.votedCategoryMap,
      [entry.category]: entry.id,
    };

    const newTx: XpTransaction = {
      id: `tx_${Date.now()}`,
      user_id: currentState.currentUser.id,
      amount: 50,
      source_type: 'vote',
      description: `Voto Popular em ${entry.participant_name} (${entry.character_or_song})`,
      reference_id: entry.id,
      created_at: new Date().toISOString(),
    };

    currentState = {
      ...currentState,
      contestVotes: updatedVotes,
      votedCategoryMap: newCategoryMap,
      currentUser: {
        ...currentState.currentUser,
        total_xp: currentState.currentUser.total_xp + 50,
      },
      xpTransactions: [newTx, ...currentState.xpTransactions],
    };

    saveAndNotify();

    triggerToast({
      title: '⭐ Voto Popular Confirmado!',
      description: `Seu voto para ${entry.participant_name} foi computado! Você ganhou +50 XP.`,
      type: 'xp',
      xpAmount: 50,
    });

    return { success: true, message: 'Voto registrado com sucesso!' };
  },

  // 5. Curtir Foto no Flashback
  toggleLikePhoto(photoId: string) {
    const isLiked = !!currentState.likedPhotos[photoId];
    const currentLikes = currentState.photoLikesCount[photoId] || 0;
    const newLikes = isLiked ? Math.max(0, currentLikes - 1) : currentLikes + 1;

    currentState = {
      ...currentState,
      likedPhotos: {
        ...currentState.likedPhotos,
        [photoId]: !isLiked,
      },
      photoLikesCount: {
        ...currentState.photoLikesCount,
        [photoId]: newLikes,
      },
    };

    saveAndNotify();
  },

  // 6. Download de Card para Stories (+25 XP)
  rewardStoryDownload(photoId: string) {
    const newTx: XpTransaction = {
      id: `tx_${Date.now()}`,
      user_id: currentState.currentUser.id,
      amount: 25,
      source_type: 'reward_redeem',
      description: 'Gerou Card Oficial para Stories',
      reference_id: photoId,
      created_at: new Date().toISOString(),
    };

    currentState = {
      ...currentState,
      currentUser: {
        ...currentState.currentUser,
        total_xp: currentState.currentUser.total_xp + 25,
      },
      xpTransactions: [newTx, ...currentState.xpTransactions],
    };

    saveAndNotify();

    triggerToast({
      title: '📸 Card Oficial Baixado!',
      description: 'Você ganhou +25 XP! Compartilhe nos Stories marcando @fapar.online!',
      type: 'xp',
      xpAmount: 25,
    });
  },

  // 7. Simular Partida Arya Verse (+Pontos no Leaderboard + XP)
  playAryaGame(newScore: number) {
    const user = currentState.currentUser;
    const userAryaScore = Math.max(currentState.userAryaScore, newScore);

    // Atualiza ou insere o score na lista
    let updatedLeaderboard = currentState.aryaLeaderboard.map((item) => {
      if (item.user_id === user.id) {
        return {
          ...item,
          high_score: Math.max(item.high_score, newScore),
          attempts_count: item.attempts_count + 1,
          updated_at: new Date().toISOString(),
        };
      }
      return item;
    });

    // Se o usuário não estava na lista, adiciona
    if (!updatedLeaderboard.some((item) => item.user_id === user.id)) {
      updatedLeaderboard.push({
        id: `scr_${Date.now()}`,
        season_id: 'season_2026_11',
        user_id: user.id,
        username: user.username,
        display_name: user.display_name,
        avatar_url: user.avatar_url,
        high_score: newScore,
        attempts_count: 1,
        updated_at: new Date().toISOString(),
      });
    }

    // Reordena o placar pelo high_score descendente
    updatedLeaderboard.sort((a, b) => b.high_score - a.high_score);

    // Conquista Guardião da Arya se chegar ao Top 3
    const userRank = updatedLeaderboard.findIndex((i) => i.user_id === user.id) + 1;
    let updatedBadges = [...currentState.userBadges];
    let unlockedLegendary = false;

    if (userRank <= 3) {
      const aryaBadge = MOCK_BADGES.find((b) => b.slug === 'guardiao-arya');
      if (aryaBadge && !updatedBadges.some((b) => b.badge_id === aryaBadge.id)) {
        updatedBadges.push({
          user_id: user.id,
          badge_id: aryaBadge.id,
          awarded_at: new Date().toISOString(),
        });
        unlockedLegendary = true;
      }
    }

    const xpGained = 75;
    const newTx: XpTransaction = {
      id: `tx_${Date.now()}`,
      user_id: user.id,
      amount: xpGained,
      source_type: 'arya_game',
      description: `Partida Arya Verse — ${newScore.toLocaleString('pt-BR')} pts (Top ${userRank})`,
      created_at: new Date().toISOString(),
    };

    currentState = {
      ...currentState,
      aryaLeaderboard: updatedLeaderboard,
      userAryaScore,
      userBadges: updatedBadges,
      currentUser: {
        ...user,
        total_xp: user.total_xp + xpGained,
      },
      xpTransactions: [newTx, ...currentState.xpTransactions],
    };

    saveAndNotify();

    triggerToast({
      title: `👾 Nova Pontuação: ${newScore.toLocaleString('pt-BR')} pts!`,
      description: unlockedLegendary
        ? `Incrível! Você alcançou o Top ${userRank} mensal, ganhou +75 XP e desbloqueou a Badge Lendária "Guardião da Arya"!`
        : `Você alcançou a posição #${userRank} no ranking mensal e garantiu +75 XP!`,
      type: unlockedLegendary ? 'badge' : 'xp',
      xpAmount: xpGained,
      badgeName: unlockedLegendary ? 'Guardião da Arya' : undefined,
    });
  },

  // 8. Resetar Dados Demo
  resetDemoData() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    currentState = getInitialState();
    saveAndNotify();

    triggerToast({
      title: '🔄 Dados Demo Restaurados!',
      description: 'O portal foi resetado para os valores iniciais da apresentação.',
      type: 'info',
    });
  },
};
