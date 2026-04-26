import React from 'react';
import Icon from './Icon';

export default function StarDisplay({ count = 0, size = 'md', animated = false }) {
  let pixelSize;
  switch (size) {
    case 'sm':
      pixelSize = 24;
      break;
    case 'lg':
      pixelSize = 64;
      break;
    case 'md':
    default:
      pixelSize = 48;
      break;
  }

  const delays = [0, 300, 600];

  return (
    <div className="flex items-center justify-center gap-1">
      {[0, 1, 2].map((index) => {
        const isActive = index < count;
        
        // If animated, we apply the animation to the active stars so they "pop" in sequentially.
        const style = (animated && isActive)
          ? {
              animation: `popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${delays[index]}ms forwards`,
              opacity: 0,
              transform: 'scale(0)'
            }
          : {};

        return (
          <div key={index} style={style}>
            <Icon 
              name={isActive ? 'star-active' : 'star-inactive'} 
              size={pixelSize} 
            />
          </div>
        );
      })}
    </div>
  );
}
