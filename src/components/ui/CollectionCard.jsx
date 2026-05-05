import React, { useState } from 'react';
import Icon from './Icon';

export default function CollectionCard({ objectId, label, imageSrc, emoji, isUnlocked }) {
  const [imageFailed, setImageFailed] = useState(false);

  if (isUnlocked) {
    return (
      <div className="bg-white rounded-2xl p-3 flex flex-col items-center gap-2 h-full">
        <div className="w-full flex-1 min-h-[3rem] flex items-center justify-center">
          {!imageFailed && imageSrc && imageSrc !== '/assets/placeholder.png' ? (
            <img
              src={imageSrc}
              alt={label}
              className="w-full h-full object-contain pointer-events-none"
              onError={() => setImageFailed(true)}
              draggable={false}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              {emoji
                ? <span style={{ fontSize: 'clamp(2rem, 6vw, 3rem)' }}>{emoji}</span>
                : <div className="w-full h-full bg-gray-200 rounded-lg" />
              }
            </div>
          )}
        </div>
        <span className="font-body text-xs text-darkbrown text-center font-medium w-full truncate">
          {label}
        </span>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 rounded-2xl p-3 flex flex-col items-center justify-center aspect-square">
      <Icon name="lock" size={24} className="text-gray-300 fill-current" />
    </div>
  );
}
