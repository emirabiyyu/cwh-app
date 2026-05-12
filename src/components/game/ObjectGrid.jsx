import React from 'react';
import ObjectCard from './ObjectCard';

export default function ObjectGrid({ objects = [], cardStates = {}, onCardRef, isHintActive }) {
  return (
    <div className="grid grid-cols-2 grid-rows-4 w-full h-[90%] p-5 overflow-hidden place-items-stretch" style={{ gap: 'clamp(8px, 2vw, 12px)' }}>
      {objects.map((obj) => (
        <ObjectCard
          key={obj.id}
          id={obj.id}
          label={obj.name || obj.label}
          imageSrc={obj.image || obj.imageSrc}
          emoji={obj.emoji}
          state={cardStates[obj.id] || 'default'}
          cardRef={(el) => onCardRef?.(obj.id, el)}
          isHintActive={isHintActive}
        />
      ))}
    </div>
  );
}
