// src/components/ui/DynamicBadgeIcon.tsx
import React from 'react';
import { Award, CupSoda, QrCode, Gamepad2, Palette, Trophy } from 'lucide-react';

interface DynamicBadgeIconProps {
  name: string;
  className?: string;
}

export const DynamicBadgeIcon: React.FC<DynamicBadgeIconProps> = ({ name, className = 'h-5 w-5' }) => {
  switch (name) {
    case 'Award':
      return <Award className={className} />;
    case 'CupSoda':
      return <CupSoda className={className} />;
    case 'QrCode':
      return <QrCode className={className} />;
    case 'Gamepad2':
      return <Gamepad2 className={className} />;
    case 'Palette':
      return <Palette className={className} />;
    default:
      return <Trophy className={className} />;
  }
};
