// src/components/DemoControlBar.tsx
import React, { useState } from 'react';
import {
  SlidersHorizontal,
  Radio,
  Moon,
  QrCode,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useFaparState } from '../lib/useFaparState';
import { faparStore } from '../lib/store';

export const DemoControlBar: React.FC = () => {
  const { isEventLive, currentUser } = useFaparState();
  const [isMinimized, setIsMinimized] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  const handleToggleMode = () => {
    faparStore.toggleEventMode();
  };

  const handleScanQr = () => {
    faparStore.scanQrCode();
    setIsQrModalOpen(true);
  };

  const handleReset = () => {
    if (window.confirm('Tem certeza que deseja resetar os dados da demonstração?')) {
      faparStore.resetDemoData();
    }
  };

  return (
    <>
      {/* Floating Demo Bar */}
      <aside
        aria-label="Controle de Demonstração"
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-4xl transition-all duration-300 pointer-events-auto"
      >
        <div className="overflow-hidden rounded-2xl border border-violet-500/30 bg-zinc-950/90 shadow-[0_0_35px_-5px_rgba(139,92,246,0.3)] backdrop-blur-xl">
          {/* Top Bar / Header */}
          <div className="flex items-center justify-between border-b border-white/10 bg-zinc-900/60 px-4 py-2 text-xs">
            <div className="flex items-center gap-2 font-bold tracking-wider text-violet-300 uppercase">
              <SlidersHorizontal className="h-3.5 w-3.5 text-cyan-400" />
              <span>Painel de Apresentação • Modo Demo</span>
              <span className="hidden sm:inline-block rounded bg-cyan-500/20 px-1.5 py-0.2 text-[10px] text-cyan-300 border border-cyan-500/40">
                Apresentação Organizadores
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-[11px] text-zinc-300">
                <span className="text-zinc-500">Status Atual:</span>
                {isEventLive ? (
                  <span className="inline-flex items-center gap-1 font-bold text-rose-400">
                    <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
                    Dia de Evento (Ao Vivo)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 font-bold text-violet-300">
                    <Moon className="h-3 w-3 text-violet-400" />
                    Entressafra (Comunidade)
                  </span>
                )}
              </div>

              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="rounded-lg p-1 text-zinc-400 hover:bg-white/10 hover:text-white transition"
                title={isMinimized ? 'Expandir painel' : 'Minimizar painel'}
              >
                {isMinimized ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Action Buttons Body */}
          {!isMinimized && (
            <div className="p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 bg-zinc-950/70">
              {/* Botão 1: Alternar Modo */}
              <button
                type="button"
                onClick={handleToggleMode}
                className={`group flex items-center justify-center gap-2.5 rounded-xl border p-2.5 sm:p-3 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  isEventLive
                    ? 'border-rose-500/40 bg-rose-500/15 text-rose-200 hover:bg-rose-500/25 shadow-lg shadow-rose-500/10'
                    : 'border-violet-500/40 bg-violet-500/15 text-violet-200 hover:bg-violet-500/25 shadow-lg shadow-violet-500/10'
                }`}
              >
                {isEventLive ? (
                  <>
                    <Radio className="h-4 w-4 text-rose-400 animate-pulse group-hover:scale-110 transition" />
                    <span>Mudar p/ Entressafra</span>
                  </>
                ) : (
                  <>
                    <Radio className="h-4 w-4 text-cyan-400 group-hover:scale-110 transition" />
                    <span>Mudar p/ Dia de Evento</span>
                  </>
                )}
              </button>

              {/* Botão 2: Scan QR Code */}
              <button
                type="button"
                onClick={handleScanQr}
                className="group flex items-center justify-center gap-2.5 rounded-xl border border-cyan-500/40 bg-cyan-500/15 p-2.5 sm:p-3 text-xs sm:text-sm font-bold text-cyan-200 hover:bg-cyan-500/25 transition-all duration-200 shadow-lg shadow-cyan-500/10 cursor-pointer"
              >
                <QrCode className="h-4 w-4 text-cyan-400 group-hover:scale-110 transition" />
                <span>Simular Scan QR (+100 XP)</span>
              </button>

              {/* Botão 3: Resetar Dados */}
              <button
                type="button"
                onClick={handleReset}
                className="group flex items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-zinc-900/90 p-2.5 sm:p-3 text-xs sm:text-sm font-bold text-zinc-300 hover:border-white/20 hover:bg-zinc-800 hover:text-white transition-all duration-200 cursor-pointer"
              >
                <RotateCcw className="h-4 w-4 text-zinc-400 group-hover:-rotate-90 transition duration-300" />
                <span>Resetar Dados Demo</span>
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Modal Comemorativo de Scan QR Code */}
      {isQrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-2xl border border-cyan-500/40 bg-zinc-950 p-6 shadow-2xl text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.4)]">
              <QrCode className="h-8 w-8 animate-pulse" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 px-3 py-1 text-xs font-semibold text-cyan-300">
                <Sparkles className="h-3.5 w-3.5" />
                Check-in de Totem Realizado
              </div>
              <h3 className="mt-2 text-2xl font-black text-white">
                Ponto Secreto FAPAR!
              </h3>
              <p className="mt-1 text-sm text-zinc-300 leading-relaxed">
                Você escaneou com sucesso o totem interativo espalhado pelo evento em Araras.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-zinc-900/80 p-4 flex items-center justify-around">
              <div>
                <span className="text-[11px] text-zinc-400 uppercase tracking-wider block">Recompensa</span>
                <span className="text-xl font-black text-cyan-400 flex items-center justify-center gap-1">
                  <Zap className="h-4 w-4" /> +100 XP
                </span>
              </div>
              <div className="h-8 w-[1px] bg-white/10" />
              <div>
                <span className="text-[11px] text-zinc-400 uppercase tracking-wider block">XP Atual</span>
                <span className="text-xl font-black text-white">
                  {currentUser.total_xp} XP
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsQrModalOpen(false)}
              className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 hover:opacity-95 transition cursor-pointer"
            >
              Continuar Explorando
            </button>
          </div>
        </div>
      )}
    </>
  );
};
