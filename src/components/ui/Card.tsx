// src/components/ui/Card.tsx
import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: 'violet' | 'cyan' | 'pink' | 'none';
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  glow = 'none',
  interactive = false,
  ...props
}) => {
  const glowStyles = {
    violet: 'hover:border-violet-500/40 hover:shadow-[0_0_25px_-5px_rgba(139,92,246,0.25)]',
    cyan: 'hover:border-cyan-500/40 hover:shadow-[0_0_25px_-5px_rgba(6,182,212,0.25)]',
    pink: 'hover:border-pink-500/40 hover:shadow-[0_0_25px_-5px_rgba(236,72,153,0.25)]',
    none: '',
  };

  return (
    <div
      className={`rounded-2xl border border-white/10 bg-zinc-950/80 backdrop-blur-md transition-all duration-300 ${
        interactive ? 'hover:-translate-y-1 cursor-pointer' : ''
      } ${glowStyles[glow]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
