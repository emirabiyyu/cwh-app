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
      <div className="text-xl font-heading font-bold text-center text-black py-1">
        {instructionText}
      </div>
      
      <div className="px-2 pb-2">
        {/* Track */}
        <div className="w-full h-2 bg-[#C4BBFE]/30 rounded-full relative">
          {/* Fill */}
          <div 
            className={`absolute top-0 left-0 h-full rounded-full transition-all duration-300 ease-out ${barColor} ${shadowStyle}`}
            style={{ width: `${clampedPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
