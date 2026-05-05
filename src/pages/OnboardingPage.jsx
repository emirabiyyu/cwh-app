import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import OnboardingIllustration from '@/assets/illustrations/illustration-onboarding.png';

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
        <img
          src={OnboardingIllustration}
          alt="Ilustrasi berburu kata"
          className="w-full max-w-xs mx-auto object-contain"
        />
        
        <h1 className="font-heading text-[2.5rem] sm:text-5xl text-darkbrown font-black text-center leading-[1.1] mb-5 tracking-tight text-shadow-sm">
          Color Word <br/><span className="text-lime mt-1 block">Hunt</span>
        </h1>
        
        <p className="font-body text-base xl:text-lg text-brown text-center max-w-xs sm:max-w-sm font-medium leading-relaxed px-2">
          Temukan benda dan cocokan kata beserta warnanya sesuai instruksi!
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
