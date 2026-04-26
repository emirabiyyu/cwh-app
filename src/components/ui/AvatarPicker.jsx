import React from 'react';
import Avatar1 from '@/assets/avatar/avatar_1.png';
import Avatar2 from '@/assets/avatar/avatar_2.png';
import Avatar3 from '@/assets/avatar/avatar_3.png';
import Avatar4 from '@/assets/avatar/avatar_4.png';
import Avatar5 from '@/assets/avatar/avatar_5.png';

const avatarOptions = [
  { id: 'avatar_1', src: Avatar1 },
  { id: 'avatar_2', src: Avatar2 },
  { id: 'avatar_3', src: Avatar3 },
  { id: 'avatar_4', src: Avatar4 },
  { id: 'avatar_5', src: Avatar5 },
];

export default function AvatarPicker({ selectedAvatar = null, onSelect }) {
  return (
    <div className="flex flex-row items-center gap-4 overflow-x-auto w-full pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {avatarOptions.map((avatar) => {
        const isSelected = selectedAvatar === avatar.id;
        return (
          <button
            key={avatar.id}
            onClick={() => onSelect?.(avatar.id)}
            type="button"
            className={`
              relative flex-shrink-0 w-16 h-16 rounded-full overflow-hidden transition-all
              ${isSelected 
                ? 'border-2 border-[#8071E3]' 
                : 'border-2 border-transparent opacity-80 hover:opacity-100'
              }
            `}
          >
            {/* Background color untuk avatar jika ada celah transparan */}
            <div className="w-full h-full bg-[#FFF3E7] flex items-center justify-center">
              <img 
                src={avatar.src} 
                alt={`Avatar ${avatar.id}`} 
                className="w-full h-full object-cover"
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}
