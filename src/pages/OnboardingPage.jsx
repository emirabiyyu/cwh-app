import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function OnboardingPage() {
  const navigate = useNavigate();

  const handleStart = () => {
    localStorage.setItem('onboarding_done', 'true');
    navigate('/profiling');
  };

  return (
    <div className="min-h-screen bg-sand flex flex-col justify-between items-center p-6 sm:p-8 overflow-hidden relative animate-fadeIn">
      
      {/* Decorative Ornaments Background */}
      <div className="absolute top-[-5%] left-[-10%] w-64 h-64 bg-lime/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-72 h-72 bg-[#5AC8FA]/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Graphic / Logo Area */}
      <div className="w-full flex-1 flex flex-col items-center justify-center mt-8 z-10">
        <div className="w-48 h-48 sm:w-56 sm:h-56 bg-cream rounded-[2.5rem] shadow-[inset_0_-8px_16px_rgba(0,0,0,0.05),_0_16px_32px_rgba(0,0,0,0.1)] flex items-center justify-center mb-10 border-[6px] border-white relative overflow-hidden">
          <span className="text-[5rem] sm:text-[6rem]" role="img" aria-label="mangifying glass">🕵️‍♂️</span>
        </div>
        
        <h1 className="font-heading text-[2.5rem] sm:text-5xl text-darkbrown font-black text-center leading-[1.1] mb-5 tracking-tight text-shadow-sm">
          Color Word <br/><span className="text-lime mt-1 block">Hunt</span>
        </h1>
        
        <p className="font-body text-base xl:text-lg text-brown text-center max-w-xs sm:max-w-sm font-medium leading-relaxed px-2">
          Temukan benda asyik dan cocokan kata beserta warnanya di sekitarmu!
        </p>
      </div>

      {/* Bottom Actions Area */}
      <div className="w-full max-w-md pb-8 z-10">
        <Button 
          fullWidth 
          variant="primary" 
          onClick={handleStart}
          className="text-lg sm:text-xl py-5"
        >
          Mulai Bermain!
        </Button>
      </div>

    </div>
  );
}
