// src/data/mock.ts

export type UserRole = 'user' | 'artist' | 'judge' | 'admin';
export type ArtistCategory = 'illustrator' | 'cosmaker' | 'accessories' | 'geek_store' | 'photographer';
export type ContestCategory = 'cosplay_desfile' | 'kpop' | 'closet_cosplay';
export type XpSourceType = 'qr_scan' | 'arya_game' | 'vote' | 'contest_entry' | 'reward_redeem';

export interface UserProfile {
  id: string;
  username: string;
  display_name: string;
  avatar_url: string;
  instagram_handle: string;
  total_xp: number;
  role: UserRole;
  created_at: string;
}

export interface Badge {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon_name: string; // Nome do ícone Lucide para renderização dinâmica
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface UserBadge {
  user_id: string;
  badge_id: string;
  awarded_at: string;
}

export interface XpTransaction {
  id: string;
  user_id: string;
  amount: number;
  source_type: XpSourceType;
  description: string;
  reference_id?: string;
  created_at: string;
}

export interface ArtistPortfolioItem {
  id: string;
  artist_id: string;
  image_url: string;
  title: string;
  price_range?: string;
}

export interface Artist {
  id: string;
  user_id: string;
  brand_name: string;
  category: ArtistCategory;
  bio: string;
  city: string;
  commissions_open: boolean;
  social_links: {
    instagram?: string;
    shopee?: string;
    whatsapp?: string;
  };
  avatar_url: string;
  is_approved: boolean;
  portfolio: ArtistPortfolioItem[];
}

export interface ContestEntry {
  id: string;
  contest_id: string;
  category: ContestCategory;
  user_id: string;
  participant_name: string;
  character_or_song: string;
  fandom_or_group: string;
  avatar_url: string;
  reference_image_url: string;
  criteria_scores: {
    label: string;
    score: number;
  }[];
  judges_final_score: number;
  popular_votes: number;
  rank_position: number;
}

export interface FlashbackPhoto {
  id: string;
  edition: 'FAPAR 2026 - Etapa Final' | 'FAPAR 2026 - Etapa 1' | 'FAPAR 2025';
  category: 'Cosplay' | 'Palco K-pop' | 'Arena Games' | 'Público';
  image_url: string;
  photographer_handle: string;
  tagged_handles: string[];
  likes_count: number;
  taken_at: string;
}

export interface AryaSeason {
  id: string;
  title: string;
  starts_at: string;
  ends_at: string;
  prize_description: string;
  sponsor_name: string;
  is_active: boolean;
}

export interface AryaScore {
  id: string;
  season_id: string;
  user_id: string;
  username: string;
  display_name: string;
  avatar_url: string;
  high_score: number;
  attempts_count: number;
  updated_at: string;
}

export interface LocalEventRadar {
  id: string;
  title: string;
  date_label: string;
  location: string;
  tag: string;
  description: string;
}

export interface Sponsor {
  id: string;
  name: string;
  tier: 'master' | 'apoio';
  segment: string;
  instagram: string;
  perk_description: string;
}

// ============================================================================
// 1. PERFIL DO USUÁRIO LOGADO (SIMULAÇÃO) & GAMIFICAÇÃO
// ============================================================================

export const MOCK_CURRENT_USER: UserProfile = {
  id: 'usr_fapar_001',
  username: '@lucas_araras',
  display_name: 'Lucas Freitas',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
  instagram_handle: '@lucas.dev.araras',
  total_xp: 650,
  role: 'user',
  created_at: '2026-03-10T14:00:00Z',
};

export const MOCK_BADGES: Badge[] = [
  {
    id: 'bdg_01',
    slug: 'veterano-2026',
    name: 'Veterano Circuito 2026',
    description: 'Participou presencialmente do encerramento do Circuito FAPAR 2026.',
    icon_name: 'Award',
    rarity: 'rare',
  },
  {
    id: 'bdg_02',
    slug: 'rei-do-mupy',
    name: 'Rei do Mupy',
    description: 'Resgatou o combo clássico de alimentação durante o evento.',
    icon_name: 'CupSoda',
    rarity: 'common',
  },
  {
    id: 'bdg_03',
    slug: 'cacador-qr',
    name: 'Explorador de Araras',
    description: 'Escaneou QR Codes secretos espalhados pelo evento presencial.',
    icon_name: 'QrCode',
    rarity: 'epic',
  },
  {
    id: 'bdg_04',
    slug: 'guardiao-arya',
    name: 'Guardião da Arya',
    description: 'Atingiu o Top 10 mensal no mini-game oficial Arya Verse.',
    icon_name: 'Gamepad2',
    rarity: 'legendary',
  },
  {
    id: 'bdg_05',
    slug: 'apoiador-alley',
    name: 'Mecena do Artist\'s Alley',
    description: 'Apoiou artistas locais visitando os estandes independentes.',
    icon_name: 'Palette',
    rarity: 'rare',
  },
];

export const MOCK_INITIAL_USER_BADGES: UserBadge[] = [
  { user_id: 'usr_fapar_001', badge_id: 'bdg_01', awarded_at: '2026-11-05T18:30:00Z' },
  { user_id: 'usr_fapar_001', badge_id: 'bdg_02', awarded_at: '2026-11-05T15:10:00Z' },
];

export const MOCK_INITIAL_XP_TRANSACTIONS: XpTransaction[] = [
  {
    id: 'tx_01',
    user_id: 'usr_fapar_001',
    amount: 300,
    source_type: 'qr_scan',
    description: 'Check-in Presencial — Circuito FAPAR 2026',
    created_at: '2026-11-05T13:00:00Z',
  },
  {
    id: 'tx_02',
    user_id: 'usr_fapar_001',
    amount: 200,
    source_type: 'arya_game',
    description: 'Recorde Pessoal no Arya Verse (14.200 pts)',
    created_at: '2026-11-08T21:15:00Z',
  },
  {
    id: 'tx_03',
    user_id: 'usr_fapar_001',
    amount: 150,
    source_type: 'vote',
    description: 'Voto Popular — Final Cosplay & K-pop 2026',
    created_at: '2026-11-05T17:45:00Z',
  },
];

// ============================================================================
// 2. CONCURSOS, RANKINGS & VOTAÇÃO POPULAR
// ============================================================================

export const MOCK_CONTEST_ENTRIES: ContestEntry[] = [
  // Cosplay Desfile
  {
    id: 'ent_cos_01',
    contest_id: 'cnt_2026_cosplay',
    category: 'cosplay_desfile',
    user_id: 'usr_101',
    participant_name: 'Mariana "Mikan" Alves',
    character_or_song: 'Malenia, Blade of Miquella',
    fandom_or_group: 'Elden Ring',
    avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
    reference_image_url: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=600&auto=format&fit=crop&q=80',
    criteria_scores: [
      { label: 'Acabamento & Armadura', score: 9.8 },
      { label: 'Fidelidade Visual', score: 9.7 },
      { label: 'Interpretação de Palco', score: 9.6 },
    ],
    judges_final_score: 9.7,
    popular_votes: 342,
    rank_position: 1,
  },
  {
    id: 'ent_cos_02',
    contest_id: 'cnt_2026_cosplay',
    category: 'cosplay_desfile',
    user_id: 'usr_102',
    participant_name: 'Gabriel "Kuro" Henrique',
    character_or_song: 'Toji Fushiguro',
    fandom_or_group: 'Jujutsu Kaisen',
    avatar_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80',
    reference_image_url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
    criteria_scores: [
      { label: 'Acabamento & Props', score: 9.3 },
      { label: 'Fidelidade Visual', score: 9.6 },
      { label: 'Interpretação de Palco', score: 9.4 },
    ],
    judges_final_score: 9.43,
    popular_votes: 289,
    rank_position: 2,
  },
  {
    id: 'ent_cos_03',
    contest_id: 'cnt_2026_cosplay',
    category: 'cosplay_desfile',
    user_id: 'usr_103',
    participant_name: 'Beatriz "Nami" Costa',
    character_or_song: 'Jinx (Arcane)',
    fandom_or_group: 'League of Legends',
    avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
    reference_image_url: 'https://images.unsplash.com/photo-1560972550-aba3456b5564?w=600&auto=format&fit=crop&q=80',
    criteria_scores: [
      { label: 'Acabamento & Peruca', score: 9.4 },
      { label: 'Fidelidade Visual', score: 9.1 },
      { label: 'Interpretação de Palco', score: 9.2 },
    ],
    judges_final_score: 9.23,
    popular_votes: 254,
    rank_position: 3,
  },

  // K-pop Solo / Grupo
  {
    id: 'ent_kpop_01',
    contest_id: 'cnt_2026_kpop',
    category: 'kpop',
    user_id: 'usr_201',
    participant_name: 'ECLIPSE DC (Grupo)',
    character_or_song: 'Supernova',
    fandom_or_group: 'aespa',
    avatar_url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&auto=format&fit=crop&q=80',
    reference_image_url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80',
    criteria_scores: [
      { label: 'Sincronia & Limpeza', score: 9.8 },
      { label: 'Expressão Facial', score: 9.5 },
      { label: 'Figurino & Presença', score: 9.6 },
    ],
    judges_final_score: 9.63,
    popular_votes: 418,
    rank_position: 1,
  },
  {
    id: 'ent_kpop_02',
    contest_id: 'cnt_2026_kpop',
    category: 'kpop',
    user_id: 'usr_202',
    participant_name: 'Camila "Yuna" Oliveira (Solo)',
    character_or_song: 'Mantra',
    fandom_or_group: 'JENNIE',
    avatar_url: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&auto=format&fit=crop&q=80',
    reference_image_url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&auto=format&fit=crop&q=80',
    criteria_scores: [
      { label: 'Técnica & Energia', score: 9.4 },
      { label: 'Expressão Facial', score: 9.6 },
      { label: 'Figurino & Presença', score: 9.2 },
    ],
    judges_final_score: 9.4,
    popular_votes: 310,
    rank_position: 2,
  },

  // Desafio Online Entressafra (Closet Cosplay)
  {
    id: 'ent_onl_01',
    contest_id: 'cnt_offseason_01',
    category: 'closet_cosplay',
    user_id: 'usr_301',
    participant_name: 'Rafael "Zoro" Mendes',
    character_or_song: 'L (Lawliet) — Versão Caseira',
    fandom_or_group: 'Death Note',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    reference_image_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    criteria_scores: [
      { label: 'Criatividade de Improviso', score: 9.5 },
      { label: 'Enquadramento & Foto', score: 9.2 },
    ],
    judges_final_score: 9.35,
    popular_votes: 176,
    rank_position: 1,
  },
];

// ============================================================================
// 3. VITRINE CONTÍNUA — ARTIST'S ALLEY & COSMAKERS (ENTRESSAFRA)
// ============================================================================

export const MOCK_ARTISTS: Artist[] = [
  {
    id: 'art_01',
    user_id: 'usr_art_01',
    brand_name: 'Kitsune Ink Studio',
    category: 'illustrator',
    bio: 'Ilustrações autorais, fanarts em aquarela digital, prints A4/A3 holográficos e adesivos resistentes à água.',
    city: 'Araras - SP',
    commissions_open: true,
    social_links: {
      instagram: 'https://instagram.com',
      shopee: 'https://shopee.com.br',
      whatsapp: 'https://wa.me/5519999990001',
    },
    avatar_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80',
    is_approved: true,
    portfolio: [
      {
        id: 'pf_01',
        artist_id: 'art_01',
        image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80',
        title: 'Print Cyberpunk Spirit',
        price_range: 'R$ 25 - R$ 45',
      },
      {
        id: 'pf_02',
        artist_id: 'art_01',
        image_url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&auto=format&fit=crop&q=80',
        title: 'Cartela Adesivos Chibi',
        price_range: 'R$ 15',
      },
      {
        id: 'pf_03',
        artist_id: 'art_01',
        image_url: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=500&auto=format&fit=crop&q=80',
        title: 'Comissão Ícone Avatar',
        price_range: 'R$ 60',
      },
    ],
  },
  {
    id: 'art_02',
    user_id: 'usr_art_02',
    brand_name: 'Forja Interior Props 3D',
    category: 'cosmaker',
    bio: 'Fabricação de armas, capacetes, acessórios em impressão 3D e acabamento automotivo para cosplayers da região.',
    city: 'Araras - SP',
    commissions_open: true,
    social_links: {
      instagram: 'https://instagram.com',
      whatsapp: 'https://wa.me/5519999990002',
    },
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    is_approved: true,
    portfolio: [
      {
        id: 'pf_04',
        artist_id: 'art_02',
        image_url: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=500&auto=format&fit=crop&q=80',
        title: 'Capacete Samurai Neon',
        price_range: 'Sob consulta',
      },
      {
        id: 'pf_05',
        artist_id: 'art_02',
        image_url: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=500&auto=format&fit=crop&q=80',
        title: 'Espada Nichirin Escala 1:1',
        price_range: 'R$ 180 - R$ 260',
      },
      {
        id: 'pf_06',
        artist_id: 'art_02',
        image_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop&q=80',
        title: 'Manopla Mecha Articulada',
        price_range: 'R$ 220',
      },
    ],
  },
  {
    id: 'art_03',
    user_id: 'usr_art_03',
    brand_name: 'Neko Crochet & Amigurumi',
    category: 'accessories',
    bio: 'Amigurumis personalizados de personagens de anime, toucas temáticas e chaveiros feitos à mão.',
    city: 'Limeira - SP',
    commissions_open: false,
    social_links: {
      instagram: 'https://instagram.com',
      shopee: 'https://shopee.com.br',
    },
    avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&auto=format&fit=crop&q=80',
    is_approved: true,
    portfolio: [
      {
        id: 'pf_07',
        artist_id: 'art_03',
        image_url: 'https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=500&auto=format&fit=crop&q=80',
        title: 'Chaveiro Pochita Crochê',
        price_range: 'R$ 35',
      },
      {
        id: 'pf_08',
        artist_id: 'art_03',
        image_url: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=500&auto=format&fit=crop&q=80',
        title: 'Boneco Colecionável 20cm',
        price_range: 'R$ 95',
      },
      {
        id: 'pf_09',
        artist_id: 'art_03',
        image_url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&auto=format&fit=crop&q=80',
        title: 'Touca Orelhas de Gato',
        price_range: 'R$ 55',
      },
    ],
  },
  {
    id: 'art_04',
    user_id: 'usr_art_04',
    brand_name: 'Lente Otaku Fotografia',
    category: 'photographer',
    bio: 'Ensaios externos em parques de Araras, cobertura de palco com edição cinematográfica e color grading.',
    city: 'Araras - SP',
    commissions_open: true,
    social_links: {
      instagram: 'https://instagram.com',
      whatsapp: 'https://wa.me/5519999990004',
    },
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80',
    is_approved: true,
    portfolio: [
      {
        id: 'pf_10',
        artist_id: 'art_04',
        image_url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=80',
        title: 'Ensaio Noturno Neon',
        price_range: 'R$ 120 (15 fotos)',
      },
      {
        id: 'pf_11',
        artist_id: 'art_04',
        image_url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&auto=format&fit=crop&q=80',
        title: 'Cobertura Palco K-pop',
        price_range: 'Pacote Grupo',
      },
      {
        id: 'pf_12',
        artist_id: 'art_04',
        image_url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&auto=format&fit=crop&q=80',
        title: 'Book Lago Municipal',
        price_range: 'R$ 100',
      },
    ],
  },
];

// ============================================================================
// 4. GALERIA FLASHBACK (FOTOS + GERADOR DE CARD PARA STORIES)
// ============================================================================

export const MOCK_FLASHBACK_PHOTOS: FlashbackPhoto[] = [
  {
    id: 'fb_01',
    edition: 'FAPAR 2026 - Etapa Final',
    category: 'Cosplay',
    image_url: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=900&auto=format&fit=crop&q=80',
    photographer_handle: '@lenteotaku.araras',
    tagged_handles: ['@mikan.cos', '@fapar.online'],
    likes_count: 148,
    taken_at: '2026-11-05',
  },
  {
    id: 'fb_02',
    edition: 'FAPAR 2026 - Etapa Final',
    category: 'Palco K-pop',
    image_url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=900&auto=format&fit=crop&q=80',
    photographer_handle: '@lenteotaku.araras',
    tagged_handles: ['@eclipsedc.oficial', '@yuna.dance'],
    likes_count: 212,
    taken_at: '2026-11-05',
  },
  {
    id: 'fb_03',
    edition: 'FAPAR 2026 - Etapa Final',
    category: 'Arena Games',
    image_url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=900&auto=format&fit=crop&q=80',
    photographer_handle: '@clicks.geek',
    tagged_handles: ['@arena.fapar'],
    likes_count: 95,
    taken_at: '2026-11-05',
  },
  {
    id: 'fb_04',
    edition: 'FAPAR 2026 - Etapa 1',
    category: 'Público',
    image_url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&auto=format&fit=crop&q=80',
    photographer_handle: '@clicks.geek',
    tagged_handles: ['@galera_araras', '@kuro.cos'],
    likes_count: 134,
    taken_at: '2026-06-14',
  },
];

// ============================================================================
// 5. ARYA VERSE — RANKING MENSAL & TEMPORADA ATIVA
// ============================================================================

export const MOCK_ACTIVE_ARYA_SEASON: AryaSeason = {
  id: 'season_2026_11',
  title: 'Temporada Novembro — Desafio Laser',
  starts_at: '2026-11-01T00:00:00Z',
  ends_at: '2026-11-30T23:59:59Z',
  prize_description: '1 Combo Burger Artesanal + Ingresso VIP Etapa 1 FAPAR 2027',
  sponsor_name: 'Pixel Burger Araras',
  is_active: true,
};

export const MOCK_ARYA_LEADERBOARD: AryaScore[] = [
  {
    id: 'scr_01',
    season_id: 'season_2026_11',
    user_id: 'usr_901',
    username: '@kaio_speedrun',
    display_name: 'Kaio Silva',
    avatar_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    high_score: 28450,
    attempts_count: 19,
    updated_at: '2026-11-14T15:20:00Z',
  },
  {
    id: 'scr_02',
    season_id: 'season_2026_11',
    user_id: 'usr_902',
    username: '@nina_star',
    display_name: 'Marina Souza',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    high_score: 24900,
    attempts_count: 14,
    updated_at: '2026-11-13T22:10:00Z',
  },
  {
    id: 'scr_03',
    season_id: 'season_2026_11',
    user_id: 'usr_903',
    username: '@pedro_otaku',
    display_name: 'Pedro Henrique',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    high_score: 19800,
    attempts_count: 11,
    updated_at: '2026-11-12T19:05:00Z',
  },
  {
    id: 'scr_04',
    season_id: 'season_2026_11',
    user_id: 'usr_fapar_001',
    username: '@lucas_araras',
    display_name: 'Lucas Freitas',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    high_score: 14200,
    attempts_count: 6,
    updated_at: '2026-11-08T21:15:00Z',
  },
  {
    id: 'scr_05',
    season_id: 'season_2026_11',
    user_id: 'usr_905',
    username: '@lara_kpop',
    display_name: 'Lara Martins',
    avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    high_score: 11500,
    attempts_count: 8,
    updated_at: '2026-11-10T16:40:00Z',
  },
];

// ============================================================================
// 6. RADAR DE ROLÊS & PATROCINADORES LOCAIS (ENTRESSAFRA)
// ============================================================================

export const MOCK_LOCAL_EVENTS: LocalEventRadar[] = [
  {
    id: 'rad_01',
    title: 'Random Play Dance & Encontro K-pop',
    date_label: 'Dom, 22 Nov • 15h00',
    location: 'Lago Municipal de Araras (Próximo ao Pedalinho)',
    tag: 'Comunidade K-pop',
    description: 'Encontro aberto para treinar coreografias e gravar reels com a galera antes da abertura da temporada 2027.',
  },
  {
    id: 'rad_02',
    title: 'Torneio Semanal Pokémon TCG & Commander',
    date_label: 'Sáb, 28 Nov • 14h00',
    location: 'Dungeon Cards Araras — Centro',
    tag: 'Card Games',
    description: 'Inscrição acessível com premiação em boosters e pontos extras para membros cadastrados no FAPAR Online.',
  },
  {
    id: 'rad_03',
    title: 'Noite Quiz Anime & Trilha Sonora',
    date_label: 'Sex, 04 Dez • 20h00',
    location: 'Pixel Burger — Jd. Belvedere',
    tag: 'Rolê Parceiro',
    description: 'Equipes de até 4 pessoas disputando vales-lanche respondendo aberturas de animes clássicos e atuais.',
  },
];

export const MOCK_SPONSORS: Sponsor[] = [
  {
    id: 'spn_01',
    name: 'Pixel Burger Araras',
    tier: 'master',
    segment: 'Hamburgueria Temática',
    instagram: '@pixelburger.araras',
    perk_description: '10% OFF apresentando o Passaporte Digital FAPAR',
  },
  {
    id: 'spn_02',
    name: 'Dungeon Cards & Boardgames',
    tier: 'master',
    segment: 'Loja Geek & TCG',
    instagram: '@dungeoncards.sp',
    perk_description: 'Patrocinador oficial da Arena Freeplay',
  },
  {
    id: 'spn_03',
    name: 'Akiba Mangás & Colecionáveis',
    tier: 'apoio',
    segment: 'Livraria & Figures',
    instagram: '@akibamangas',
    perk_description: 'Brindes oficiais para o ranking do Arya Verse',
  },
  {
    id: 'spn_04',
    name: 'Estúdio Nuvem Impressão',
    tier: 'apoio',
    segment: 'Gráfica & Adesivos',
    instagram: '@estudionuvem.araras',
    perk_description: 'Apoio oficial aos expositores do Artist\'s Alley',
  },
];