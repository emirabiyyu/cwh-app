import React from 'react';
import Icon from '../ui/Icon';
import Button from '../ui/Button';

export default function HudBar({ levelLabel, onPause }) {
  return (
    <div className="flex items-center justify-between w-full p-4">
      {/* Kiri: Level Label */}
      <div className="font-heading font-bold text-2xl text-darkbrown text-left">
        {levelLabel}
      </div>

      {/* Kanan: Pause Button */}
      <div className="flex justify-end">
        <Button variant="primary" onClick={onPause} className="!px-4 !py-4">
          <Icon name="pause" size={24} className="text-darkbrown fill-current" />
        </Button>
      </div>
    </div>
  );
}
