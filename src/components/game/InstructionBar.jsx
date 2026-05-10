import React from 'react';

export default function InstructionBar({ instructionText, timerPercent = 100 }) {
  // Pastikan timerPercent tetap di range 0-100
  const clampedPercent = Math.max(0, Math.min(100, timerPercent));
  
  // Logika warna bar (>30% ungu, <=30% merah)
  const isDanger = clampedPercent <= 30;
  
  // Style fill dan shadow
  const barColor = isDanger ? 'bg-[#FF3B30]' : 'bg-[#8071E3]';
  const shadowStyle = isDanger 
    ? 'shadow-[0_0_1px_rgba(255,59,48,1),inset_0_-1px_0_rgba(0,0,0,0.25)]' 
    : 'shadow-[0_0_1px_#6253C5,inset_0_-1px_0_rgba(0,0,0,0.25)]';

  return (
    <div className="bg-white rounded-[20px] p-2 w-full flex flex-col gap-1 shadow-sm">
      <div lang="en" translate="no" className="text-xl font-heading font-bold text-center text-black py-1">
        {instructionText}
      </div>
      
      <div className="px-2 pb-2">
        {/* Track */}
        <div className="w-full h-4 bg-gray-200 rounded-full relative">
          {/* Fill */}
          <div 
            className={`absolute top-0 left-0 h-full rounded-full transition-all duration-100 ease-out ${
              clampedPercent > 30
                ? 'bg-[#8071E3]'
                : 'bg-[#FF3B30] animate-pulse'
            } ${shadowStyle}`}
            style={{ width: `${clampedPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
