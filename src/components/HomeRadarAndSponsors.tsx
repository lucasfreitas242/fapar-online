// src/components/HomeRadarAndSponsors.tsx
import React from 'react';
import { Calendar, MapPin, Compass, Building2, Award, Sparkles, ExternalLink } from 'lucide-react';
import { InstagramIcon } from './ui/SocialIcons';
import { MOCK_LOCAL_EVENTS, MOCK_SPONSORS } from '../data/mock';

export const HomeRadarAndSponsors: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">

        {/* 1. Radar de Rolês da Região */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 px-3 py-1 text-xs font-semibold text-cyan-300 mb-3">
                <Compass className="h-3.5 w-3.5" />
                Radar de Rolês Geek & Otaku
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Encontros & Comunidade em Araras
              </h2>
              <p className="mt-1 text-sm text-zinc-400">
                A cultura pop não para entre os festivais. Participe dos encontros oficiais e de parceiros.
              </p>
            </div>
            <span className="text-xs text-zinc-400 font-mono self-start md:self-end">
              Atualizado semanalmente pela curadoria FAPAR
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_LOCAL_EVENTS.map((event) => (
              <div
                key={event.id}
                className="group rounded-2xl border border-white/10 bg-zinc-950/70 p-6 backdrop-blur-md hover:border-cyan-500/40 hover:shadow-[0_0_25px_-5px_rgba(6,182,212,0.2)] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-cyan-500/15 px-2.5 py-0.5 text-[11px] font-bold text-cyan-300 border border-cyan-500/30">
                      {event.tag}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-semibold text-violet-300">
                      <Calendar className="h-3.5 w-3.5" />
                      {event.date_label.split('•')[0]}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition">
                    {event.title}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {event.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-zinc-400">
                  <MapPin className="h-3.5 w-3.5 text-rose-400 shrink-0" />
                  <span className="truncate">{event.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Patrocinadores & Parceiros Locais */}
        <div className="space-y-8 pt-8 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-violet-500/15 border border-violet-500/30 px-3 py-1 text-xs font-semibold text-violet-300">
              <Building2 className="h-3.5 w-3.5" />
              Comércio Local Fortalecendo a Cena
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">
              Patrocinadores do Circuito FAPAR
            </h2>
            <p className="text-sm text-zinc-400">
              Apresente seu Passaporte Digital nos estabelecimentos credenciados para garantir benefícios exclusivos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {MOCK_SPONSORS.map((sponsor) => {
              const isMaster = sponsor.tier === 'master';
              return (
                <div
                  key={sponsor.id}
                  className={`rounded-2xl border p-5 backdrop-blur-md transition-all duration-300 flex flex-col justify-between ${
                    isMaster
                      ? 'border-violet-500/40 bg-zinc-950/80 shadow-[0_0_20px_-5px_rgba(139,92,246,0.2)]'
                      : 'border-white/10 bg-zinc-950/50 hover:border-white/20'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                          isMaster
                            ? 'bg-violet-500/20 text-violet-300 border border-violet-500/40'
                            : 'bg-zinc-800 text-zinc-400 border border-white/10'
                        }`}
                      >
                        {isMaster ? '★ Patrocinador Master' : 'Apoio Cultural'}
                      </span>
                      <span className="text-[11px] text-zinc-400 font-medium">{sponsor.segment}</span>
                    </div>

                    <h4 className="text-lg font-bold text-white">
                      {sponsor.name}
                    </h4>

                    {/* Vantagem do Passaporte */}
                    <div className="rounded-xl bg-zinc-900/80 p-3 border border-white/5">
                      <span className="text-[10px] uppercase font-bold text-cyan-400 block mb-0.5">
                        Benefício Passaporte FAPAR
                      </span>
                      <p className="text-xs text-zinc-300 font-medium">
                        {sponsor.perk_description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5">
                    <a
                      href={`https://instagram.com/${sponsor.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-pink-400 transition"
                    >
                      <InstagramIcon className="h-3.5 w-3.5" />
                      <span>{sponsor.instagram}</span>
                      <ExternalLink className="h-3 w-3 ml-0.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
