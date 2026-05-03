import React from 'react';
import Icon from '../ui/Icon';

export default function ObjectCard({ id, label, imageSrc, emoji, state = 'default', cardRef, onClick }) {
  const [imageFailed, setImageFailed] = React.useState(false);

  // Base styles shared across all states — from Figma: rounded-[20px], padding 8px, vertical layout
  const baseStyles = "relative flex flex-col items-center justify-center gap-1 rounded-[20px] p-2 bg-white transition-all w-full aspect-[1.2/1] overflow-hidden cursor-pointer select-none";

  // Per-state border styles from Figma specs
  let stateStyles = '';
  let badgeEl = null;

  switch (state) {
    case 'selected':
      // Figma: 3px solid #8071E3 (lavender/purple)
      stateStyles = 'border-[3px] border-[#8071E3] scale-[0.97]';
      break;

    case 'correct':
      // Figma: 3px solid #57D76A (green), green gradient badge with check icon
      stateStyles = 'border-[3px] border-[#57D76A]';
      badgeEl = (
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 z-10 w-8 h-8 rounded-full bg-gradient-to-b from-[#77ED4F] to-[#49D32E] flex items-center justify-center shadow-[0_6px_14px_rgba(73,211,46,0.25),0_4px_4px_rgba(73,211,46,0.15)]">
          <Icon name="check" size={16} className="text-white fill-current" />
        </div>
      );
      break;

    case 'wrong':
      // Figma: 3px solid #FE3B30 (red), red gradient badge with x-mark icon, animate-shake
      stateStyles = 'border-[3px] border-[#FE3B30] animate-shake';
      badgeEl = (
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 z-10 w-8 h-8 rounded-full bg-gradient-to-b from-[#ED644F] to-[#D33B2E] flex items-center justify-center shadow-[0_6px_14px_rgba(210,59,46,0.25),0_4px_4px_rgba(210,59,46,0.15)]">
          <Icon name="x-mark" size={16} className="text-white fill-current" />
        </div>
      );
      break;

    case 'default':
    default:
      // Figma: no border
      stateStyles = 'border border-transparent';
      break;
  }

  return (
    <div
      data-id={id}
      ref={cardRef}
      onClick={onClick}
      className={`${baseStyles} ${stateStyles}`}
    >
      {/* Object image or Emoji fallback */}
      {!imageFailed && imageSrc && imageSrc !== '/assets/placeholder.png' ? (
        <img
          src={imageSrc}
          alt={label}
          className="w-full h-3/4 object-contain pointer-events-none"
          onError={() => setImageFailed(true)}
          draggable={false}
        />
      ) : (
        <div className="w-full h-3/4 flex items-center justify-center">
          {emoji
            ? <span style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)' }}>{emoji}</span>
            : <div className="w-full h-full bg-gray-200 rounded-lg" />
          }
        </div>
      )}

      {/* Label */}
      <span className="font-body text-xs text-darkbrown/80 text-center truncate w-full">
        {label}
      </span>

      {/* Badge overlay for correct/wrong */}
      {badgeEl}
    </div>
  );
}
