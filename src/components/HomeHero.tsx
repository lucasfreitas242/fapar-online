// src/components/HomeHero.tsx
import React from 'react';
import {
  Sparkles,
  Radio,
  Trophy,
  Palette,
  Calendar,
  MapPin,
  ArrowRight,
  Zap,
  Ticket,
  Flame,
} from 'lucide-react';
import { useFaparState } from '../lib/useFaparState';
import { Button } from './ui/Button';

export const HomeHero: React.FC = () => {
  const { isEventLive, currentUser } = useFaparState();

  return (
    <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 border-b border-white/10 cyber-grid-pattern">
      {/* Luzes decorativas em gradiente neon */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-violet-600/20 via-fuchsia-600/15 to-cyan-400/20 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute -top-10 -right-10 w-96 h-96 bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Banner de status do evento */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {isEventLive ? (
            <div className="inline-flex items-center gap-2 rounded-full bg-rose-500/20 border border-rose-500/40 px-3.5 py-1 text-xs font-black text-rose-300 shadow-lg shadow-rose-500/20 animate-pulse">
              <Radio className="h-4 w-4 text-rose-400" />
              <span>TRANSMISSÃO AO VIVO • PALCO PRINCIPAL EM ARARAS</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 rounded-full bg-violet-500/15 border border-violet-500/30 px-3.5 py-1 text-xs font-semibold text-violet-300 shadow-lg shadow-violet-500/15">
              <Sparkles className="h-4 w-4 text-violet-400" />
              <span>CIRCUITO 2027 • TEMPORADA OFICIAL DE ENTRESSAFRA</span>
            </div>
          )}

          <div className="inline-flex items-center gap-1.5 text-xs text-zinc-400 bg-zinc-900/80 border border-white/10 px-3 py-1 rounded-full">
            <MapPin className="h-3.5 w-3.5 text-cyan-400" />
            <span>Araras - SP</span>
          </div>
        </div>

        {/* Título Principal Dinâmico */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            {isEventLive ? (
              <>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08]">
                  O Palco de Araras <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-400 to-cyan-400 neon-text-glow">
                    Está Pegando Fogo!
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl">
                  As finais do Circuito Cosplay e K-pop estão acontecendo agora! Vote no seu favorito para decidir o troféu do público e acumule XP no seu passaporte digital.
                </p>
              </>
            ) : (
              <>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08]">
                  O Maior Festival Geek <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 neon-text-glow">
                    Nunca Fica Offline.
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl">
                  Bem-vindo ao novo <strong>FAPAR Online</strong>. Descubra cosmakers locais, apoie artistas no Artist's Alley contínuo, dispute o topo do Arya Verse e garanta seu lugar no Circuito 2027.
                </p>
              </>
            )}

            {/* CTAs Dinâmicos */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {isEventLive ? (
                <>
                  <a href="/concursos">
                    <Button variant="cyan" size="lg" className="shadow-cyan-500/30">
                      <Flame className="h-5 w-5 mr-1" />
                      Votar no Favorito do Público (+50 XP)
                    </Button>
                  </a>
                  <a href="/perfil">
                    <Button variant="outline" size="lg">
                      <Ticket className="h-5 w-5 mr-1 text-violet-400" />
                      Meu Passaporte Digital
                    </Button>
                  </a>
                </>
              ) : (
                <>
                  <a href="/concursos">
                    <Button variant="primary" size="lg">
                      <Trophy className="h-5 w-5 mr-1" />
                      Explorar Concursos & Ranking
                    </Button>
                  </a>
                  <a href="/artistas">
                    <Button variant="outline" size="lg">
                      <Palette className="h-5 w-5 mr-1 text-cyan-400" />
                      Visitar Artist's Alley
                    </Button>
                  </a>
                </>
              )}
            </div>

            {/* Badges de Destaque da Comunidade */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-zinc-400 border-t border-white/10">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
                <span>+40 Artistas & Cosmakers Cadastrados</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-cyan-400" />
                <span>Votação Auditada em Tempo Real</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-violet-400" />
                <span>Recompensas Mensais Patrocinadas</span>
              </div>
            </div>
          </div>

          {/* Card Flutuante Interativo do Hero */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl border border-white/15 bg-zinc-950/90 p-6 shadow-2xl backdrop-blur-xl">
              {/* Moldura de brilho sutil */}
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

              {isEventLive ? (
                /* Card Modo Dia de Evento */
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/20 px-2.5 py-1 text-xs font-bold text-rose-300 border border-rose-500/30">
                      <Radio className="h-3.5 w-3.5 text-rose-400 animate-pulse" />
                      Palco 1 • AO VIVO
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">14:00 - 21:00</span>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-white">
                      Desfile Cosplay & K-pop Dance
                    </h2>
                    <p className="text-xs text-zinc-400 mt-1">
                      Parque Ecológico de Araras • Entrada Solidária
                    </p>
                  </div>

                  {/* Programação do Dia */}
                  <div className="space-y-2 rounded-xl bg-zinc-900/70 p-3 border border-white/5 text-xs">
                    <div className="flex items-center justify-between py-1 border-b border-white/5">
                      <span className="text-zinc-400 font-mono">16:30</span>
                      <span className="font-semibold text-white">Abertura Concurso K-pop</span>
                      <span className="text-emerald-400 font-bold">Em breve</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-white/5">
                      <span className="text-zinc-400 font-mono">18:00</span>
                      <span className="font-semibold text-white">Final Cosplay Desfile</span>
                      <span className="text-amber-400 font-bold">Destaque</span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-zinc-400 font-mono">19:45</span>
                      <span className="font-semibold text-white">Premiação & Troféu Público</span>
                      <span className="text-cyan-400 font-bold">Ao Vivo</span>
                    </div>
                  </div>

                  <a
                    href="/concursos"
                    className="flex items-center justify-between rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 p-3.5 text-sm font-bold text-white hover:opacity-95 transition"
                  >
                    <span>Abrir Votação Popular do Palco</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              ) : (
                /* Card Modo Entressafra */
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-500/20 px-2.5 py-1 text-xs font-semibold text-violet-300 border border-violet-500/30">
                      <Sparkles className="h-3.5 w-3.5" />
                      Temporada Mensal Ativa
                    </span>
                    <span className="text-xs text-zinc-400">Novembro 2026</span>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-white">
                      Desafio Laser Arya Verse
                    </h2>
                    <p className="text-xs text-zinc-400 mt-1">
                      Prêmio: 1 Combo Burger Artesanal + Ingresso VIP 2027
                    </p>
                  </div>

                  <div className="rounded-xl bg-zinc-900/70 p-3.5 border border-white/5 space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-400">Seu Recorde Atual:</span>
                      <span className="font-black text-cyan-400">14.200 pts</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-400">Líder do Mês:</span>
                      <span className="font-bold text-white">@kaio_speedrun (28.450 pts)</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 w-1/2" />
                    </div>
                  </div>

                  <a
                    href="/perfil#arya"
                    className="flex items-center justify-between rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 p-3.5 text-sm font-bold text-white hover:opacity-95 transition"
                  >
                    <span>Jogar Agora e Subir no Placar</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
