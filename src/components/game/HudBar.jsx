import React from 'react';
import Icon from '../ui/Icon';
import Button from '../ui/Button';

export default function HudBar({ levelLabel, onPause, onInfo }) {
  return (
    <div className="flex items-center justify-between w-full p-4">
      {/* Kiri: Level Label */}
      <div className="font-heading font-bold text-2xl text-darkbrown text-left">
        {levelLabel}
      </div>

      {/* Kanan: Info + Pause Buttons */}
      <div className="flex items-center gap-2">
        <Button variant="primary" onClick={onInfo} className="!px-4 !py-4">
          <Icon name="info" size={24} className="text-darkbrown fill-current" />
        </Button>
        <Button variant="primary" onClick={onPause} className="!px-4 !py-4">
          <Icon name="pause" size={24} className="text-darkbrown fill-current" />
        </Button>
      </div>
    </div>
  );
}
