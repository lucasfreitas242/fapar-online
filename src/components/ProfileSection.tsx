// src/components/ProfileSection.tsx
import React, { useState } from 'react';
import {
  User,
  Shield,
  Zap,
  Award,
  Trophy,
  History,
  QrCode,
  Lock,
  CheckCircle2,
  Gift,
  Gamepad2,
  Flame,
  Sparkles,
  ExternalLink,
  Play,
  RotateCw,
} from 'lucide-react';
import {
  MOCK_BADGES,
  MOCK_ACTIVE_ARYA_SEASON,
  type Badge,
  type XpTransaction,
} from '../data/mock';
import { useFaparState, calculateUserLevel } from '../lib/useFaparState';
import { faparStore } from '../lib/store';
import { DynamicBadgeIcon } from './ui/DynamicBadgeIcon';

export const ProfileSection: React.FC = () => {
  const { currentUser, userBadges, xpTransactions, aryaLeaderboard } = useFaparState();
  const [isPlayingGame, setIsPlayingGame] = useState(false);
  const [gameScoreResult, setGameScoreResult] = useState<number | null>(null);

  const levelInfo = calculateUserLevel(currentUser.total_xp);

  // Mapeamento de badges desbloqueadas pelo ID
  const unlockedBadgesMap = new Map<string, string>();
  userBadges.forEach((ub) => {
    unlockedBadgesMap.set(ub.badge_id, ub.awarded_at);
  });

  const userLeaderboardItem = aryaLeaderboard.find((i) => i.user_id === currentUser.id);
  const userRank = aryaLeaderboard.findIndex((i) => i.user_id === currentUser.id) + 1;

  // Simular Partida do Arya Verse
  const handleSimulateGame = () => {
    setIsPlayingGame(true);
    setTimeout(() => {
      // Gera score entre 18.000 e 31.000 pts
      const generatedScore = Math.floor(Math.random() * 13000) + 18500;
      setGameScoreResult(generatedScore);
      faparStore.playAryaGame(generatedScore);
      setIsPlayingGame(false);
    }, 700);
  };

  const getSourceBadge = (source: XpTransaction['source_type']) => {
    switch (source) {
      case 'qr_scan':
        return { label: 'QR Scan Totem', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' };
      case 'vote':
        return { label: 'Voto no Palco', color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' };
      case 'arya_game':
        return { label: 'Arya Verse', color: 'bg-violet-500/20 text-violet-300 border-violet-500/30' };
      case 'contest_entry':
        return { label: 'Inscrição', color: 'bg-pink-500/20 text-pink-300 border-pink-500/30' };
      case 'reward_redeem':
        return { label: 'Compartilhamento', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' };
      default:
        return { label: 'Atividade', color: 'bg-zinc-800 text-zinc-300 border-white/10' };
    }
  };

  return (
    <div className="py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">

        {/* =========================================================================
            1. CARTÃO DE PASSAPORTE DIGITAL FAPAR (Holographic Cyberpunk Pass)
           ========================================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-violet-500/15 border border-violet-500/30 px-3 py-1 text-xs font-semibold text-violet-300 mb-2">
                <Shield className="h-3.5 w-3.5" />
                Credencial Digital Oficial do Participante
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Passaporte Digital FAPAR
              </h1>
            </div>
            <div className="text-xs text-zinc-400 font-mono">
              Temporada 2026-2027 • Araras - SP
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-violet-500/40 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 p-6 sm:p-8 shadow-[0_0_50px_-10px_rgba(139,92,246,0.25)]">
            {/* Efeito de brilho holográfico */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-violet-600/15 blur-3xl pointer-events-none" />

            <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Lado Esquerdo: Identidade do Usuário e Nível */}
              <div className="md:col-span-8 space-y-6">
                <div className="flex items-start gap-5">
                  <div className="relative">
                    <img
                      src={currentUser.avatar_url}
                      alt={currentUser.display_name}
                      className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl object-cover ring-4 ring-violet-500/40 shadow-xl"
                    />
                    <span className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 text-xs font-black text-white shadow-lg border border-white/20">
                      Nv.{levelInfo.level}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                        {currentUser.display_name}
                      </h2>
                      <span className="rounded-full bg-cyan-500/20 px-2 py-0.5 text-[10px] font-bold text-cyan-300 border border-cyan-500/40">
                        {currentUser.role.toUpperCase()}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400">
                      <span>{currentUser.username}</span>
                      <span>•</span>
                      <span className="text-pink-400 font-semibold">{currentUser.instagram_handle}</span>
                      <span>•</span>
                      <span className="text-violet-300 font-bold">{levelInfo.title}</span>
                    </div>
                  </div>
                </div>

                {/* Barra de Progresso de XP */}
                <div className="space-y-2 rounded-2xl bg-zinc-950/70 border border-white/10 p-4">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-zinc-300 flex items-center gap-1.5">
                      <Zap className="h-4 w-4 text-cyan-400" />
                      XP Acumulado no Circuito:
                      <strong className="text-cyan-300 text-sm font-mono ml-1">
                        {currentUser.total_xp} XP
                      </strong>
                    </span>
                    <span className="text-violet-300 font-mono">
                      {levelInfo.currentLevelXp} / {levelInfo.xpNeededForNextLevel} XP para Nv. {levelInfo.level + 1}
                    </span>
                  </div>

                  <div className="h-3 w-full rounded-full bg-zinc-900 overflow-hidden border border-white/5">
                    <div
                      className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 transition-all duration-500"
                      style={{ width: `${levelInfo.progressPercent}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-zinc-400">
                    Suba de nível escaneando QR Codes nos totens em Araras, votando no palco ao vivo e participando do Arya Verse.
                  </p>
                </div>
              </div>

              {/* Lado Direito: QR Code Digital de Check-in */}
              <div className="md:col-span-4 flex flex-col items-center justify-center p-4 rounded-2xl bg-zinc-950/90 border border-white/10 text-center space-y-3">
                <div className="p-3 rounded-xl bg-white text-zinc-950 shadow-inner">
                  {/* QR Code Procedural SVG */}
                  <svg className="h-28 w-28 sm:h-32 sm:w-32" viewBox="0 0 100 100" fill="currentColor">
                    {/* Top-left corner */}
                    <rect x="10" y="10" width="24" height="24" fill="currentColor" />
                    <rect x="14" y="14" width="16" height="16" fill="white" />
                    <rect x="18" y="18" width="8" height="8" fill="currentColor" />
                    {/* Top-right corner */}
                    <rect x="66" y="10" width="24" height="24" fill="currentColor" />
                    <rect x="70" y="14" width="16" height="16" fill="white" />
                    <rect x="74" y="18" width="8" height="8" fill="currentColor" />
                    {/* Bottom-left corner */}
                    <rect x="10" y="66" width="24" height="24" fill="currentColor" />
                    <rect x="14" y="70" width="16" height="16" fill="white" />
                    <rect x="18" y="74" width="8" height="8" fill="currentColor" />
                    {/* Decorative matrix patterns */}
                    <rect x="42" y="14" width="6" height="6" fill="currentColor" />
                    <rect x="52" y="24" width="8" height="6" fill="currentColor" />
                    <rect x="42" y="38" width="16" height="8" fill="currentColor" />
                    <rect x="14" y="44" width="8" height="8" fill="currentColor" />
                    <rect x="68" y="46" width="18" height="6" fill="currentColor" />
                    <rect x="42" y="56" width="10" height="14" fill="currentColor" />
                    <rect x="58" y="68" width="14" height="6" fill="currentColor" />
                    <rect x="78" y="78" width="12" height="12" fill="currentColor" />
                  </svg>
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 block">
                    Passe FAPAR ID: #{currentUser.id}
                  </span>
                  <span className="text-[10px] text-zinc-400">
                    Apresente na entrada ou nos estandes patrocinados
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. GRID DE CONQUISTAS & BADGES
           ========================================================================= */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 px-3 py-1 text-xs font-semibold text-pink-300">
                <Trophy className="h-3.5 w-3.5" />
                Mural de Conquistas
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Badges do Circuito ({unlockedBadgesMap.size} de {MOCK_BADGES.length} Desbloqueadas)
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {MOCK_BADGES.map((badge) => {
              const isUnlocked = unlockedBadgesMap.has(badge.id);
              const awardedAt = unlockedBadgesMap.get(badge.id);

              const rarityStyles = {
                common: 'border-zinc-700 bg-zinc-900/60 text-zinc-300',
                rare: 'border-cyan-500/30 bg-cyan-950/20 text-cyan-300',
                epic: 'border-violet-500/30 bg-violet-950/20 text-violet-300',
                legendary: 'border-amber-500/40 bg-amber-950/25 text-amber-300 shadow-[0_0_20px_-5px_rgba(245,158,11,0.2)]',
              };

              return (
                <div
                  key={badge.id}
                  className={`rounded-2xl border p-5 backdrop-blur-md transition-all duration-300 flex items-start gap-4 ${
                    isUnlocked
                      ? rarityStyles[badge.rarity]
                      : 'border-white/5 bg-zinc-950/50 opacity-60'
                  }`}
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${
                      isUnlocked
                        ? 'border-white/20 bg-white/10 shadow-md'
                        : 'border-white/5 bg-zinc-900 text-zinc-600'
                    }`}
                  >
                    {isUnlocked ? (
                      <DynamicBadgeIcon name={badge.icon_name} className="h-6 w-6" />
                    ) : (
                      <Lock className="h-5 w-5" />
                    )}
                  </div>

                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-black tracking-wider opacity-75">
                        Raridade: {badge.rarity.toUpperCase()}
                      </span>
                      {isUnlocked ? (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                          <CheckCircle2 className="h-3 w-3" /> Conquistada
                        </span>
                      ) : (
                        <span className="text-[10px] text-zinc-400 font-mono">Bloqueada</span>
                      )}
                    </div>

                    <h4 className="text-base font-bold text-white tracking-tight truncate">
                      {badge.name}
                    </h4>

                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {badge.description}
                    </p>

                    {awardedAt && (
                      <span className="text-[10px] text-zinc-400 block pt-1">
                        Desbloqueado em {new Date(awardedAt).toLocaleDateString('pt-BR')}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            3. ARYA VERSE — LEADERBOARD MENSAL & SIMULADOR DE PARTIDA
           ========================================================================= */}
        <section id="arya" className="space-y-6 pt-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 px-3 py-1 text-xs font-semibold text-cyan-300">
                <Gamepad2 className="h-3.5 w-3.5" />
                Mini-Game Mensal da Mascote
              </div>
              <h2 className="text-3xl font-black text-white tracking-tight">
                {MOCK_ACTIVE_ARYA_SEASON.title}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400">
                Patrocinador: <strong className="text-zinc-200">{MOCK_ACTIVE_ARYA_SEASON.sponsor_name}</strong> • Prêmio: <span className="text-cyan-300">{MOCK_ACTIVE_ARYA_SEASON.prize_description}</span>
              </p>
            </div>

            {/* Botão de Simulação / Jogar Partida */}
            <button
              onClick={handleSimulateGame}
              disabled={isPlayingGame}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-600/30 hover:opacity-95 disabled:opacity-50 transition cursor-pointer self-start sm:self-auto"
            >
              {isPlayingGame ? (
                <>
                  <RotateCw className="h-4 w-4 animate-spin" />
                  <span>Calculando Partida...</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 fill-white" />
                  <span>Simular Partida (+Pontos & +75 XP)</span>
                </>
              )}
            </button>
          </div>

          {gameScoreResult && (
            <div className="rounded-2xl border border-cyan-500/40 bg-cyan-950/20 p-4 text-xs sm:text-sm text-cyan-200 flex items-center justify-between">
              <span>
                Última partida registrada: <strong className="font-mono text-white text-base">{gameScoreResult.toLocaleString('pt-BR')} pts</strong>! Seu placar foi atualizado.
              </span>
              <span className="text-cyan-400 font-bold">+75 XP Adicionado</span>
            </div>
          )}

          {/* Tabela do Leaderboard */}
          <div className="rounded-2xl border border-white/10 bg-zinc-950/80 overflow-hidden backdrop-blur-md">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-zinc-900/60 text-zinc-400 font-semibold uppercase text-[11px] tracking-wider">
                    <th className="py-3.5 px-4 sm:px-6">Posição</th>
                    <th className="py-3.5 px-4 sm:px-6">Jogador</th>
                    <th className="py-3.5 px-4 sm:px-6 text-center">Tentativas</th>
                    <th className="py-3.5 px-4 sm:px-6 text-right">Maior Pontuação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {aryaLeaderboard.map((item, index) => {
                    const isCurrentUser = item.user_id === currentUser.id;
                    const rankMedal =
                      index === 0
                        ? 'bg-yellow-500 text-yellow-950'
                        : index === 1
                        ? 'bg-zinc-300 text-zinc-950'
                        : index === 2
                        ? 'bg-amber-700 text-amber-100'
                        : 'bg-zinc-800 text-zinc-400';

                    return (
                      <tr
                        key={item.id}
                        className={`transition ${
                          isCurrentUser
                            ? 'bg-violet-950/30 border-l-4 border-l-cyan-400 font-semibold'
                            : 'hover:bg-zinc-900/40'
                        }`}
                      >
                        <td className="py-3.5 px-4 sm:px-6">
                          <span
                            className={`inline-flex h-6 w-6 items-center justify-center rounded-lg text-xs font-black ${rankMedal}`}
                          >
                            {index + 1}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 sm:px-6">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.avatar_url}
                              alt={item.display_name}
                              className="h-8 w-8 rounded-full object-cover border border-white/10"
                            />
                            <div>
                              <div className="text-white font-bold flex items-center gap-1.5">
                                <span>{item.display_name}</span>
                                {isCurrentUser && (
                                  <span className="rounded bg-cyan-500/20 px-1.5 py-0.2 text-[10px] text-cyan-300">
                                    Você
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-zinc-400 font-mono">
                                {item.username}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-center text-zinc-400 font-mono">
                          {item.attempts_count} runs
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-right">
                          <span className="font-mono font-black text-cyan-400 text-base">
                            {item.high_score.toLocaleString('pt-BR')}
                          </span>
                          <span className="text-[10px] text-zinc-400 block">pontos</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. HISTÓRICO DE TRANSAÇÕES DE XP
           ========================================================================= */}
        <section className="space-y-6 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 px-3 py-1 text-xs font-semibold text-cyan-300">
                <History className="h-3.5 w-3.5" />
                Auditoria & Gamificação
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Extrato Recente de XP ({xpTransactions.length} Registros)
              </h2>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-950/80 divide-y divide-white/5 overflow-hidden backdrop-blur-md">
            {xpTransactions.map((tx) => {
              const badgeInfo = getSourceBadge(tx.source_type);
              return (
                <div
                  key={tx.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-zinc-900/40 transition"
                >
                  <div className="flex items-start sm:items-center gap-3.5">
                    <span
                      className={`inline-block rounded-lg border px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider shrink-0 ${badgeInfo.color}`}
                    >
                      {badgeInfo.label}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        {tx.description}
                      </h4>
                      <span className="text-[11px] text-zinc-400">
                        {new Date(tx.created_at).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="sm:text-right shrink-0">
                    <span className="text-base font-black text-cyan-400 font-mono flex items-center sm:justify-end gap-1">
                      <Zap className="h-4 w-4" />+{tx.amount} XP
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
};
