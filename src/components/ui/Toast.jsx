import React from 'react';
import Icon from './Icon';

export default function Toast({ message, type = 'correct', visible = false }) {
  // Icon + badge gradient per type from Figma
  let iconName = 'check';
  let badgeGradient = 'bg-gradient-to-b from-[#77ED4F] to-[#49D32E]';
  let badgeShadow = 'shadow-[0_6px_14px_rgba(73,211,46,0.25),0_4px_4px_rgba(73,211,46,0.15)]';

  if (type === 'wrong' || type === 'timer') {
    iconName = 'x-mark';
    badgeGradient = 'bg-gradient-to-b from-[#ED644F] to-[#D33B2E]';
    badgeShadow = 'shadow-[0_6px_14px_rgba(210,59,46,0.25),0_4px_4px_rgba(210,59,46,0.15)]';
  }

  return (
    <div
      className={`
        absolute bottom-4 left-1/2 -translate-x-1/2 z-30
        transition-all duration-300 ease-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}
    >
      {/* Pill container — Figma: bg white, rounded-full, padding 4/12/4/4, gap 8, drop-shadow */}
      <div className="flex items-center gap-2 bg-white rounded-full pl-1 pr-3 py-1 shadow-[0_8px_28px_rgba(0,0,0,0.15)]">
        {/* Badge circle with icon */}
        <div className={`w-8 h-8 rounded-full ${badgeGradient} ${badgeShadow} flex items-center justify-center flex-shrink-0`}>
          <Icon name={iconName} size={16} className="text-white fill-current" />
        </div>

        {/* Message text — Figma: Inter Tight Medium 14px */}
        <span className="font-body text-sm font-medium text-black whitespace-nowrap">
          {message}
        </span>
      </div>
    </div>
  );
}
