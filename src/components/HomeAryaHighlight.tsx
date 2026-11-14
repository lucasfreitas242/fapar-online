// src/components/HomeAryaHighlight.tsx
import React from 'react';
import { Gamepad2, Trophy, Sparkles, ArrowRight, Gift, Flame } from 'lucide-react';
import { MOCK_ACTIVE_ARYA_SEASON } from '../data/mock';
import { useFaparState } from '../lib/useFaparState';

export const HomeAryaHighlight: React.FC = () => {
  const { aryaLeaderboard, currentUser } = useFaparState();
  const top3 = aryaLeaderboard.slice(0, 3);
  const userRank = aryaLeaderboard.findIndex((i) => i.user_id === currentUser.id) + 1;

  return (
    <section className="py-16 md:py-24 border-b border-white/10 relative overflow-hidden bg-gradient-to-b from-zinc-950 via-violet-950/20 to-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-violet-500/30 bg-zinc-950/80 p-6 sm:p-10 shadow-[0_0_50px_-15px_rgba(139,92,246,0.3)] backdrop-blur-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Lado Esquerdo: Lore da Mascote & Prêmio Patrocinado */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-violet-500/20 border border-violet-500/40 px-3 py-1 text-xs font-bold text-violet-300">
              <Gamepad2 className="h-4 w-4 text-cyan-400" />
              <span>Mini-Game Oficial da Comunidade • Arya Verse</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Arya Verse: A Guardiã Cibernética de Araras
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              Mantenha o ritmo entre as edições! A cada mês, dispute a liderança do placar oficial da mascote <strong>Arya</strong>. Os melhores jogadores do mês ganham prêmios reais oferecidos pelo comércio geek e gastronômico de Araras.
            </p>

            {/* Card do Prêmio Patrocinado */}
            <div className="rounded-2xl border border-cyan-500/30 bg-cyan-950/30 p-4 sm:p-5 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                <Gift className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                  Prêmio da Temporada Atual • Oferecido por {MOCK_ACTIVE_ARYA_SEASON.sponsor_name}
                </span>
                <h4 className="text-base font-bold text-white">
                  {MOCK_ACTIVE_ARYA_SEASON.prize_description}
                </h4>
                <p className="text-xs text-zinc-400">
                  Temporada encerra dia 30/11 às 23:59. Pontuação auditada via Passaporte Digital FAPAR.
                </p>
              </div>
            </div>

            {/* Status do Usuário no Leaderboard */}
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <div className="rounded-xl bg-zinc-900/90 border border-white/10 px-4 py-2.5">
                <span className="text-zinc-400 block">Sua Posição no Mês:</span>
                <span className="text-base font-black text-white">
                  {userRank > 0 ? `#${userRank} Lugar` : 'Ainda não ranqueado'}
                </span>
              </div>
              <div className="rounded-xl bg-zinc-900/90 border border-white/10 px-4 py-2.5">
                <span className="text-zinc-400 block">Seu Recorde:</span>
                <span className="text-base font-black text-cyan-400">14.200 pts</span>
              </div>
              <a
                href="/perfil#arya"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-3 text-xs font-bold text-white hover:opacity-95 shadow-lg shadow-violet-600/25 transition ml-auto"
              >
                <span>Jogar & Subir no Placar</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Lado Direito: Preview Top 3 do Placar Mensal */}
          <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-zinc-900/80 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-bold text-white">Top 3 do Mês</span>
              </div>
              <span className="text-[11px] text-zinc-400 font-mono">Novembro 2026</span>
            </div>

            <div className="space-y-2.5">
              {top3.map((score, index) => (
                <div
                  key={score.id}
                  className={`flex items-center justify-between rounded-xl p-3 border transition ${
                    index === 0
                      ? 'border-yellow-500/30 bg-yellow-500/10'
                      : 'border-white/5 bg-zinc-950/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-lg text-xs font-black ${
                        index === 0
                          ? 'bg-yellow-500 text-yellow-950'
                          : index === 1
                          ? 'bg-zinc-400 text-zinc-950'
                          : 'bg-amber-700 text-amber-100'
                      }`}
                    >
                      {index + 1}
                    </span>
                    <img
                      src={score.avatar_url}
                      alt={score.display_name}
                      className="h-8 w-8 rounded-full object-cover border border-white/10"
                    />
                    <div>
                      <div className="text-xs font-bold text-white">{score.display_name}</div>
                      <div className="text-[10px] text-zinc-400">{score.username}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-black text-cyan-400 font-mono">
                      {score.high_score.toLocaleString('pt-BR')}
                    </span>
                    <span className="text-[10px] text-zinc-500 block">pts</span>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="/perfil#arya"
              className="block text-center text-xs font-bold text-cyan-400 hover:text-cyan-300 pt-2 transition"
            >
              Ver Tabela Completa e Jogar Simulador →
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
