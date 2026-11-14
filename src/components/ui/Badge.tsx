// src/components/ui/Badge.tsx
import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'violet' | 'cyan' | 'pink' | 'emerald' | 'amber' | 'outline' | 'ghost';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'violet',
  size = 'md',
  className = '',
}) => {
  const variantStyles = {
    violet: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
    cyan: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    pink: 'bg-pink-500/15 text-pink-300 border-pink-500/30',
    emerald: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    amber: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    outline: 'bg-transparent text-zinc-300 border-white/20',
    ghost: 'bg-white/5 text-zinc-400 border-transparent',
  };

  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 font-semibold',
    md: 'text-xs px-2.5 py-1 font-medium',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
};
