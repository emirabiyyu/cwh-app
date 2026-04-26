import React from 'react';
import ObjectCard from './ObjectCard';

export default function ObjectGrid({ objects = [], cardStates = {}, onCardRef }) {
  return (
    <div className="grid grid-cols-2 grid-rows-4 gap-x-4 gap-y-3 w-full h-[90%] p-5 overflow-hidden place-items-stretch">
      {objects.map((obj) => (
        <ObjectCard
          key={obj.id}
          id={obj.id}
          label={obj.name || obj.label}
          imageSrc={obj.image || obj.imageSrc}
          state={cardStates[obj.id] || 'default'}
          cardRef={(el) => onCardRef?.(obj.id, el)}
        />
      ))}
    </div>
  );
}
