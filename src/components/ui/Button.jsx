import React from 'react';

export default function Button({
  variant = 'primary',
  children,
  onClick,
  fullWidth = false,
  className = '',
  ...props
}) {
  // Base styling for all standard 'lg' buttons per Figma
  const baseStyles = "inline-flex items-center justify-center font-heading gap-2 font-bold transition-all text-center rounded-xl px-5 py-4 text-base";
  const widthStyles = fullWidth ? "w-full" : "";

  let variantStyles = "";
  if (variant === 'primary') {
    variantStyles = "bg-lime border border-[#B9BE1A] text-darkbrown shadow-[inset_0_-4px_0_0_#B9BE1A] hover:brightness-105 active:brightness-95 active:shadow-[inset_0_0px_0_0_#B9BE1A] active:translate-y-1 [text-shadow:0px_1px_14.5px_rgba(0,0,0,0.25)]";
  } else if (variant === 'secondary') {
    variantStyles = "bg-cream border border-[#E0D9CF] text-darkbrown shadow-[inset_0_-4px_0_0_#E0D9CF] hover:brightness-105 active:brightness-95 active:shadow-[inset_0_0px_0_0_#E0D9CF] active:translate-y-1 [text-shadow:0px_1px_14.5px_rgba(0,0,0,0.25)]";
  } else if (variant === 'danger') {
    variantStyles = "bg-[#FF3B30] border border-[#D71308] text-white shadow-[inset_0_-4px_0_0_#D71308] hover:brightness-105 active:brightness-95 active:shadow-[inset_0_0px_0_0_#D71308] active:translate-y-1 [text-shadow:0px_1px_14.5px_rgba(0,0,0,0.25)]";
  } else if (variant === 'disabled') {
    variantStyles = "bg-[#E8E8E8] border border-[#D4D4D4] text-[#ACACAC] pointer-events-none opacity-80 cursor-not-allowed";
  }

  // Jika parent juga mengoper properti disabled HTML asli, pastikan tidak bisa di-klik
  const isDisabled = variant === 'disabled' || props.disabled;

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${widthStyles} ${className}`}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      {...props}
    >
      {children}
    </button>
  );
}
