import React from 'react';
import Icon from '../ui/Icon';
import Button from '../ui/Button';

export default function HudBar({ levelLabel, lives = 4, onPause }) {
  return (
    <div className="flex items-center justify-between w-full p-4">
      {/* Kiri: Level Label */}
      <div className="font-heading font-bold text-2xl text-darkbrown w-1/3 text-left">
        {levelLabel}
      </div>

      {/* Tengah: 4 Hearts */}
      <div className="flex items-center justify-center w-1/3">
        <div className="flex items-center gap-1 bg-[#F4EDE3] border border-[#EBE4DA] rounded-full px-3 py-2">
          {[0, 1, 2, 3].map((index) => {
            const isAlive = index < lives;
            return (
              <Icon 
                key={index} 
                name={isAlive ? 'heart-active' : 'heart-lost'} 
                size={24} 
                // Color matches the specific Figma properties for active and lost variants
                className={isAlive ? "text-[#FF3B30] fill-current" : "text-white fill-current"} 
              />
            );
          })}
        </div>
      </div>

      {/* Kanan: Pause Button */}
      <div className="flex justify-end w-1/3">
        <Button variant="primary" onClick={onPause} className="!px-4 !py-4">
          <Icon name="pause" size={24} className="text-darkbrown fill-current" />
        </Button>
      </div>
    </div>
  );
}
