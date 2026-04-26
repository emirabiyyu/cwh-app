import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoadingPage() {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  // Animasi progress bar berjalan otomatis
  useEffect(() => {
    const duration = 2500; // total 2.5 detik
    const intervalTime = 50;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // Navigate ke /home saat 100%
  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        navigate('/home', { replace: true });
      }, 300); // 300ms jeda agar user bisa menyadari 100%
      return () => clearTimeout(timeout);
    }
  }, [progress, navigate]);

  return (
    <div className="min-h-screen bg-sand flex flex-col items-center justify-center p-6 sm:p-8 relative overflow-hidden animate-fadeIn">
      
      {/* Decorative Ornaments Background */}
      <div className="absolute top-[-5%] left-[-10%] w-64 h-64 bg-lime/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-72 h-72 bg-[#5AC8FA]/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-sm flex flex-col items-center z-10">
        
        {/* Animated Icon */}
        <div className="w-24 h-24 sm:w-32 sm:h-32 mb-8 bg-cream border-4 border-white rounded-[2rem] shadow-sm flex items-center justify-center animate-pulse">
          <span className="text-[4rem] sm:text-[5rem]" role="img" aria-label="loading">⏳</span>
        </div>

        {/* Heading menggunakan font-heading */}
        <h1 className="font-heading text-3xl sm:text-4xl text-darkbrown font-black mb-8 tracking-tight drop-shadow-sm text-center">
          Menyiapkan Permainan...
        </h1>

        {/* Progress Bar Container */}
        <div className="w-full h-6 bg-white rounded-full p-[3px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] border border-brown/10 overflow-hidden">
          {/* Progress fill menggunakan bg-lime */}
          <div 
            className="h-full bg-lime rounded-full transition-all duration-75 ease-linear shadow-[inset_0_-2px_0_0_#B9BE1A] relative"
            style={{ width: `${Math.min(progress, 100)}%` }}
          >
            {/* Shimmer effect (opsional jika ditaruh di CSS nanti, untuk sekarang kita biarkan styling inline/kosong atau pakai background bawaan) */}
          </div>
        </div>

        <p className="font-body text-brown text-sm font-bold mt-4 uppercase tracking-widest opacity-80">
          {Math.floor(progress)}%
        </p>

      </div>
    </div>
  );
}
