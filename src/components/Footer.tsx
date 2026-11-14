// src/components/Footer.tsx
import React from 'react';
import { Sparkles, MapPin, MessageCircle, Heart, Trophy, Palette, Camera } from 'lucide-react';
import { InstagramIcon } from './ui/SocialIcons';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-zinc-950 pt-16 pb-32 text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Coluna 1: Info e Marca */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-400 p-[1px]">
                <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-zinc-950 font-black text-cyan-400">
                  FP
                </div>
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                FAPAR <span className="text-cyan-400">2027</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-zinc-400">
              Festival de Cultura Pop, Cosplay, K-pop e Games de Araras - SP. Conectando a comunidade geek regional no evento presencial e mantendo a chama acesa na entressafra.
            </p>
            <div className="flex items-center gap-2 text-xs text-zinc-300">
              <MapPin className="h-4 w-4 text-rose-400 shrink-0" />
              <span>Araras • Interior de São Paulo</span>
            </div>
          </div>

          {/* Coluna 2: Navegação Rápida */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Navegação
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-cyan-400 transition flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-violet-400" />
                  Início
                </a>
              </li>
              <li>
                <a href="/concursos" className="hover:text-cyan-400 transition flex items-center gap-2">
                  <Trophy className="h-3.5 w-3.5 text-yellow-400" />
                  Concursos & Ranking
                </a>
              </li>
              <li>
                <a href="/artistas" className="hover:text-cyan-400 transition flex items-center gap-2">
                  <Palette className="h-3.5 w-3.5 text-pink-400" />
                  Artist's Alley
                </a>
              </li>
              <li>
                <a href="/flashback" className="hover:text-cyan-400 transition flex items-center gap-2">
                  <Camera className="h-3.5 w-3.5 text-cyan-400" />
                  Flashback & Stories
                </a>
              </li>
              <li>
                <a href="/perfil" className="hover:text-cyan-400 transition flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                  Passaporte & Arya Verse
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Comunidade & Parcerias */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Comunidade & Rolês
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Encontros mensais de K-pop no Lago Municipal, torneios de card games na Dungeon Cards e encontros cosplay organizados pelo FAPAR Online.
            </p>
            <div className="pt-1">
              <span className="inline-block rounded-lg bg-zinc-900 border border-white/10 px-3 py-1.5 text-xs text-zinc-300">
                hashtag oficial: <strong className="text-cyan-400">#FAPAR2027</strong>
              </span>
            </div>
          </div>

          {/* Coluna 4: Redes & Contato */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Canais Oficiais
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-zinc-900/60 p-2.5 text-xs font-semibold text-zinc-300 hover:border-pink-500/40 hover:text-pink-400 transition"
              >
                <InstagramIcon className="h-4 w-4 text-pink-400" />
                <span>@fapar.online no Instagram</span>
              </a>
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-zinc-900/60 p-2.5 text-xs font-semibold text-zinc-300 hover:border-emerald-500/40 hover:text-emerald-400 transition"
              >
                <MessageCircle className="h-4 w-4 text-emerald-400" />
                <span>Comunidade WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-4">
          <p>© 2026-2027 FAPAR — Feito com paixão pela comunidade geek e otaku de Araras - SP.</p>
          <p className="flex items-center gap-1">
            Desenvolvido para o Circuito 2027 com <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
