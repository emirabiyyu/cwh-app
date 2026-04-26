import React from 'react';
import Icon from './Icon';

export default function MissionCard({ missionName, levelCount, requiredStars, isLocked = false, earnedStars = 0, onStart }) {
  return (
    <div 
      onClick={isLocked ? undefined : onStart}
      className={`bg-cream border border-[#EBE4DA] rounded-[20px] overflow-hidden w-full transition-all outline-none ${
        isLocked 
          ? 'opacity-80 cursor-not-allowed' 
          : 'cursor-pointer hover:border-lime/60 hover:shadow-lg active:scale-[0.98] active:shadow-sm'
      }`}
    >
      {/* Top area — white image placeholder */}
      <div className="relative w-full h-[132px] bg-white flex items-center justify-center">
        {isLocked && (
          <div className="w-[52px] h-[52px] rounded-full bg-cream/60 border border-cream flex items-center justify-center">
            <Icon name="lock" size={24} className="text-darkbrown" />
          </div>
        )}
      </div>

      {/* Bottom content area */}
      <div className="p-5 flex items-center gap-2">
        {/* Text info */}
        <div className="flex-1 flex flex-col gap-2">
          <h3 className="font-heading font-medium text-xl text-darkbrown leading-tight">
            {missionName}
          </h3>
          <div className="flex items-center gap-2 font-body text-sm text-darkbrown">
            <span>{levelCount} Level</span>
            {isLocked && (
              <>
                <span className="w-[7px] h-[7px] rounded-full bg-darkbrown/10 inline-block" />
                <span>{requiredStars} Bintang dibutuhkan</span>
              </>
            )}
          </div>
        </div>

        {/* Star button */}
        <button
          disabled={isLocked}
          className={`
            w-[52px] h-[52px] rounded-xl flex items-center justify-center gap-1 flex-shrink-0 pointer-events-none transition-all
            ${isLocked
              ? 'bg-[#CCC5BB] shadow-[0_0_0_0.5px_#A49D93,inset_0_-1px_0_#A49D93]'
              : 'bg-[#8071E3] shadow-[0_0_0_0.5px_#6253C5,inset_0_-1px_0_rgba(0,0,0,0.25)]'
            }
          `}
        >
          <Icon name="star-active" size={20} className={isLocked ? 'text-white' : 'text-[#FFAF3B]'} />
          <span className={`font-heading font-bold text-lg text-white [text-shadow:0px_1px_14.5px_rgba(0,0,0,0.25)]`}>
            {earnedStars}
          </span>
        </button>
      </div>
    </div>
  );
}
