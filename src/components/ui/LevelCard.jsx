import React from 'react';
import Icon from './Icon';
import StarDisplay from './StarDisplay';

export default function LevelCard({ levelNumber, isLocked = false, earnedStars = 0, onClick }) {
  const displayNumber = String(levelNumber).padStart(2, '0');

  return (
    <button
      onClick={isLocked ? undefined : onClick}
      disabled={isLocked}
      className={`
        bg-cream border border-[#EBE4DA] rounded-[20px] w-full flex flex-col items-center gap-3
        px-[38px] py-5 transition-all
        ${isLocked ? 'cursor-not-allowed opacity-80' : 'cursor-pointer active:scale-[0.97]'}
      `}
    >
      {/* Number badge — Figma: 60x60 rounded-xl, lavender or gray */}
      <div
        className={`
          w-[60px] h-[60px] rounded-xl flex items-center justify-center
          ${isLocked
            ? 'bg-[#E9E9E9] shadow-[0_0_0_0.5px_#6253C5]'
            : 'bg-[#8071E3] shadow-[0_0_0_0.5px_#6253C5,inset_0_-1px_0_rgba(0,0,0,0.25)]'
          }
        `}
      >
        {isLocked ? (
          <Icon name="lock" size={24} className="text-darkbrown" />
        ) : (
          <span className="font-heading font-medium text-2xl text-white">
            {displayNumber}
          </span>
        )}
      </div>

      {/* Level label */}
      <span className="font-body font-medium text-base text-black text-center">
        Level {levelNumber}
      </span>

      {/* Stars */}
      <StarDisplay count={earnedStars} size="sm" />
    </button>
  );
}
