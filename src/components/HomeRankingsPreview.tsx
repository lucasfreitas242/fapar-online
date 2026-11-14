// src/components/HomeRankingsPreview.tsx
import React, { useState } from 'react';
import { Trophy, Star, ArrowRight, Flame, CheckCircle, Radio } from 'lucide-react';
import { MOCK_CONTEST_ENTRIES, type ContestCategory, type ContestEntry } from '../data/mock';
import { useFaparState } from '../lib/useFaparState';
import { faparStore } from '../lib/store';
import { Button } from './ui/Button';

export const HomeRankingsPreview: React.FC = () => {
  const { isEventLive, contestVotes, votedCategoryMap } = useFaparState();
  const [activeTab, setActiveTab] = useState<'cosplay' | 'kpop'>('cosplay');

  const cosplayTop3 = MOCK_CONTEST_ENTRIES.filter((e) => e.category === 'cosplay_desfile').slice(0, 3);
  const kpopTop3 = MOCK_CONTEST_ENTRIES.filter((e) => e.category === 'kpop').slice(0, 3);

  const currentList = activeTab === 'cosplay' ? cosplayTop3 : kpopTop3;

  const handleQuickVote = (entry: ContestEntry) => {
    faparStore.voteContestEntry(entry);
  };

  return (
    <section className="py-16 md:py-24 border-b border-white/10 bg-zinc-950/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-yellow-500/15 border border-yellow-500/30 px-3 py-1 text-xs font-semibold text-yellow-300 mb-3">
              <Trophy className="h-3.5 w-3.5" />
              Circuito Oficial FAPAR
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Ranking Geral dos Palcos
            </h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-400 max-w-2xl">
              Confira os competidores que dominaram o palco com figurinos de alto nível e performances marcantes.
            </p>
          </div>

          {/* Seletor de Categoria */}
          <div className="flex items-center gap-2 rounded-xl bg-zinc-900 p-1.5 border border-white/10 self-start">
            <button
              onClick={() => setActiveTab('cosplay')}
              className={`rounded-lg px-4 py-2 text-xs font-bold transition cursor-pointer ${
                activeTab === 'cosplay'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Top 3 Cosplay Desfile
            </button>
            <button
              onClick={() => setActiveTab('kpop')}
              className={`rounded-lg px-4 py-2 text-xs font-bold transition cursor-pointer ${
                activeTab === 'kpop'
                  ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/30'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Top 3 K-pop Palco
            </button>
          </div>
        </div>

        {/* Grid do Pódio (Top 3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentList.map((entry, idx) => {
            const votes = contestVotes[entry.id] ?? entry.popular_votes;
            const hasVotedThisCategory = votedCategoryMap[entry.category] === entry.id;
            const isFirst = idx === 0;

            const medalColor =
              idx === 0
                ? 'from-amber-400 to-yellow-600 text-amber-950'
                : idx === 1
                ? 'from-zinc-300 to-zinc-500 text-zinc-950'
                : 'from-amber-700 to-amber-900 text-amber-100';

            return (
              <div
                key={entry.id}
                className={`relative rounded-2xl border bg-zinc-900/60 p-5 backdrop-blur-md transition-all duration-300 flex flex-col justify-between ${
                  isFirst
                    ? 'border-yellow-500/40 shadow-[0_0_30px_-5px_rgba(234,179,8,0.2)] md:-translate-y-2'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {/* Badge de Posição */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br ${medalColor} font-black text-sm shadow-md`}
                  >
                    #{idx + 1}
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-zinc-800/80 px-2.5 py-1 text-xs font-semibold text-zinc-300 border border-white/5">
                    <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                    <span>Nota Juri: <strong className="text-white">{entry.judges_final_score.toFixed(2)}</strong></span>
                  </div>
                </div>

                {/* Foto e Detalhes do Participante */}
                <div className="space-y-4">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 group">
                    <img
                      src={entry.reference_image_url}
                      alt={entry.character_or_song}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="rounded bg-black/60 backdrop-blur-md px-2 py-0.5 text-[11px] font-semibold text-cyan-300 border border-white/10">
                        {entry.fandom_or_group}
                      </span>
                      <span className="text-xs font-mono font-bold text-zinc-200">
                        {votes} votos
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {entry.character_or_song}
                    </h3>
                    <p className="text-xs text-zinc-400">
                      por <strong className="text-zinc-200">{entry.participant_name}</strong>
                    </p>
                  </div>

                  {/* Critérios resumidos */}
                  <div className="space-y-1.5 pt-2 border-t border-white/5 text-xs text-zinc-400">
                    {entry.criteria_scores.slice(0, 2).map((crit) => (
                      <div key={crit.label} className="flex justify-between items-center">
                        <span className="truncate pr-2">{crit.label}:</span>
                        <span className="font-semibold text-zinc-200">{crit.score.toFixed(1)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Votação Popular Rápida (quando Ao Vivo) */}
                <div className="mt-5 pt-3 border-t border-white/10">
                  {isEventLive ? (
                    hasVotedThisCategory ? (
                      <div className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 p-2.5 text-xs font-bold text-emerald-400">
                        <CheckCircle className="h-4 w-4" />
                        <span>Seu Voto Foi Computado</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleQuickVote(entry)}
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 p-2.5 text-xs font-bold text-white hover:opacity-95 shadow-md shadow-violet-600/20 transition cursor-pointer"
                      >
                        <Flame className="h-4 w-4 text-yellow-300" />
                        <span>Votar no Palco (+50 XP)</span>
                      </button>
                    )
                  ) : (
                    <a
                      href="/concursos"
                      className="block text-center text-xs font-semibold text-zinc-400 hover:text-cyan-400 transition"
                    >
                      Ver detalhes do júri →
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Link para página completa de concursos */}
        <div className="mt-10 text-center">
          <a
            href="/concursos"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-zinc-900 px-6 py-3 text-sm font-bold text-white hover:border-cyan-400 hover:text-cyan-300 transition"
          >
            <span>Ver Tabela Completa de Concursos & Critérios</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
