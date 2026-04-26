import React from 'react';

export default function Modal({ isOpen, children }) {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Card */}
      <div className="relative z-10 bg-white rounded-[20px] p-6 mx-4 w-full max-w-sm shadow-[0_8px_32px_rgba(0,0,0,0.2)] animate-fadeIn">
        {children}
      </div>
    </div>
  );
}
