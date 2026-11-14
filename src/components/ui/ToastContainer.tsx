// src/components/ui/ToastContainer.tsx
import React, { useEffect, useState } from 'react';
import { Sparkles, Trophy, CheckCircle2, Info, X, Zap } from 'lucide-react';
import type { ToastMessage } from '../../lib/store';

export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const handleToastEvent = (e: Event) => {
      const customEvent = e as CustomEvent<ToastMessage>;
      if (!customEvent.detail) return;
      const newToast = customEvent.detail;

      setToasts((prev) => [...prev, newToast]);

      // Auto dismiss after 4.5 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, 4500);
    };

    window.addEventListener('fapar:toast', handleToastEvent);
    return () => window.removeEventListener('fapar:toast', handleToastEvent);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 rounded-xl border border-white/15 bg-zinc-950/95 p-4 shadow-2xl backdrop-blur-xl transition-all duration-300 animate-in slide-in-from-top-4 fade-in"
          style={{
            borderColor:
              toast.type === 'badge'
                ? '#ec4899'
                : toast.type === 'xp'
                ? '#06b6d4'
                : 'rgba(139, 92, 246, 0.4)',
            boxShadow:
              toast.type === 'badge'
                ? '0 0 25px -4px rgba(236, 72, 153, 0.35)'
                : toast.type === 'xp'
                ? '0 0 25px -4px rgba(6, 182, 212, 0.35)'
                : '0 0 20px -4px rgba(139, 92, 246, 0.25)',
          }}
        >
          {/* Ícone */}
          <div className="flex-shrink-0 pt-0.5">
            {toast.type === 'badge' ? (
              <div className="rounded-lg bg-pink-500/20 p-2 text-pink-400">
                <Trophy className="h-5 w-5 animate-bounce" />
              </div>
            ) : toast.type === 'xp' ? (
              <div className="rounded-lg bg-cyan-500/20 p-2 text-cyan-400">
                <Zap className="h-5 w-5" />
              </div>
            ) : toast.type === 'success' ? (
              <div className="rounded-lg bg-emerald-500/20 p-2 text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            ) : (
              <div className="rounded-lg bg-violet-500/20 p-2 text-violet-400">
                <Info className="h-5 w-5" />
              </div>
            )}
          </div>

          {/* Conteúdo */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 font-bold text-white text-sm">
              <span>{toast.title}</span>
              {toast.xpAmount && (
                <span className="inline-flex items-center rounded-full bg-cyan-500/20 px-2 py-0.5 text-[10px] font-extrabold text-cyan-300 border border-cyan-500/30">
                  +{toast.xpAmount} XP
                </span>
              )}
            </div>
            <p className="mt-1 text-xs text-zinc-300 leading-relaxed">
              {toast.description}
            </p>
            {toast.badgeName && (
              <div className="mt-2 inline-flex items-center gap-1 rounded bg-pink-500/20 border border-pink-500/30 px-2 py-0.5 text-[11px] font-semibold text-pink-300">
                <Sparkles className="h-3 w-3" />
                Badge Desbloqueada: {toast.badgeName}
              </div>
            )}
          </div>

          {/* Botão Fechar */}
          <button
            onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
            className="flex-shrink-0 text-zinc-400 hover:text-white transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
