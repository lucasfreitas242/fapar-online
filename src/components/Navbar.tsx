// src/components/Navbar.tsx
import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  Menu,
  X,
  Trophy,
  Palette,
  Camera,
  User,
  Radio,
  Gamepad2,
  ChevronRight,
} from 'lucide-react';
import { useFaparState, calculateUserLevel } from '../lib/useFaparState';

interface NavbarProps {
  currentPath?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath = '/' }) => {
  const { currentUser, isEventLive } = useFaparState();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const levelInfo = calculateUserLevel(currentUser.total_xp);

  const navLinks = [
    { label: 'Início', href: '/', icon: Sparkles },
    { label: 'Concursos & Ranking', href: '/concursos', icon: Trophy },
    { label: "Artist's Alley", href: '/artistas', icon: Palette },
    { label: 'Flashback', href: '/flashback', icon: Camera },
    { label: 'Arya Verse', href: '/perfil#arya', icon: Gamepad2 },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-zinc-950/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo & Status Badge */}
        <div className="flex items-center gap-4">
          <a href="/" className="group flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-cyan-400 p-[1.5px] shadow-lg shadow-violet-600/30 group-hover:scale-105 transition duration-300">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-zinc-950">
                <span className="font-black text-transparent bg-clip-text bg-gradient-to-tr from-cyan-400 to-violet-400 text-lg tracking-tighter">
                  FP
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-black tracking-tight text-xl text-white">
                  FAPAR
                </span>
                <span className="rounded bg-cyan-500/20 px-1.5 py-0.5 text-[11px] font-extrabold text-cyan-400 border border-cyan-500/40">
                  2027
                </span>
              </div>
              <span className="text-[10px] text-zinc-400 font-medium tracking-wider uppercase">
                Araras • SP • Geek Fest
              </span>
            </div>
          </a>

          {/* Event Status Live Pill */}
          <div className="hidden sm:flex items-center">
            {isEventLive ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/15 border border-rose-500/40 px-2.5 py-0.5 text-[11px] font-bold text-rose-300 animate-pulse">
                <Radio className="h-3 w-3 text-rose-400" />
                AO VIVO NO PARQUE
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-500/15 border border-violet-500/30 px-2.5 py-0.5 text-[11px] font-medium text-violet-300">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-ping" />
                TEMPORADA ENTRESSAFRA
              </span>
            )}
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive =
              currentPath === link.href ||
              (link.href !== '/' && currentPath.startsWith(link.href));
            const Icon = link.icon;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/25 shadow-[0_0_15px_-3px_rgba(6,182,212,0.2)]'
                    : 'text-zinc-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-cyan-400' : 'text-zinc-400'}`} />
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* User Gamified Badge & Profile Link */}
        <div className="flex items-center gap-3">
          <a
            href="/perfil"
            className="group flex items-center gap-3 rounded-xl border border-white/10 bg-zinc-900/80 p-1.5 pr-3 hover:border-violet-500/40 hover:bg-zinc-800/80 transition-all duration-200"
            title="Acessar Perfil & Passaporte Digital"
          >
            {/* Avatar with glowing ring */}
            <div className="relative">
              <img
                src={currentUser.avatar_url}
                alt={currentUser.display_name}
                className="h-9 w-9 rounded-lg object-cover ring-2 ring-violet-500/50 group-hover:ring-cyan-400 transition"
              />
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-violet-600 text-[9px] font-black text-white shadow">
                {levelInfo.level}
              </span>
            </div>

            {/* User XP stats */}
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition">
                  {currentUser.display_name.split(' ')[0]}
                </span>
                <span className="text-[10px] font-bold text-violet-400">
                  Nv. {levelInfo.level}
                </span>
              </div>

              {/* XP Progress Bar */}
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="h-1.5 w-16 sm:w-20 rounded-full bg-zinc-800 overflow-hidden border border-white/5">
                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-500"
                    style={{ width: `${levelInfo.progressPercent}%` }}
                  />
                </div>
                <span className="text-[10px] font-semibold text-cyan-400 flex items-center">
                  <Zap className="h-2.5 w-2.5 mr-0.5 text-cyan-400" />
                  {currentUser.total_xp}
                </span>
              </div>
            </div>
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg border border-white/10 bg-zinc-900 p-2 text-zinc-300 hover:text-white lg:hidden"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-white/10 bg-zinc-950 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          <div className="mb-3 px-2 py-1 text-xs text-zinc-400 font-semibold uppercase tracking-wider">
            Navegação do Portal
          </div>
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              currentPath === link.href ||
              (link.href !== '/' && currentPath.startsWith(link.href));
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between rounded-xl p-3 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                    : 'text-zinc-200 hover:bg-zinc-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-violet-400" />
                  <span>{link.label}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-zinc-500" />
              </a>
            );
          })}

          <div className="pt-3 border-t border-white/10 flex items-center justify-between px-2 text-xs text-zinc-400">
            <span>Circuito FAPAR Araras 2027</span>
            <span>{isEventLive ? '🔴 Modo Ao Vivo' : '🌙 Modo Entressafra'}</span>
          </div>
        </div>
      )}
    </header>
  );
};
