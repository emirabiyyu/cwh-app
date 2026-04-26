import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import levelsData from '../data/levels.json';

export default function ListLevelPage() {
  const { missionId } = useParams();
  const navigate = useNavigate();
  const [levelsWithProgress, setLevelsWithProgress] = useState([]);

  // Cari mission berdasarkan missionId di URL parameter
  const mission = levelsData.find(m => m.id === missionId);

  useEffect(() => {
    if (!mission) return;

    const parsedLevels = mission.levels.map((level, index) => {
      // Dapatkan perolehan stars dari level saat ini (default 0)
      const stars = parseInt(localStorage.getItem(`stars_m${missionId}_l${level.id}`) || '0', 10);
      
      // LOGIC KUNCI:
      // Level pertama (index 0) selalu terbuka secara default.
      // Level N+1 (index > 0) akan tertinggal terkunci jika stars Level N (sebelumnya) === 0.
      let isLocked = false;
      if (index > 0) {
        const prevLevelId = mission.levels[index - 1].id;
        const prevStars = parseInt(localStorage.getItem(`stars_m${missionId}_l${prevLevelId}`) || '0', 10);
        isLocked = prevStars === 0;
      }

      return { ...level, stars, isLocked, index };
    });
    
    setLevelsWithProgress(parsedLevels);
  }, [mission, missionId]);

  if (!mission) return <div className="p-8 text-center font-heading text-xl">Mission not found!</div>;

  return (
    <div className="min-h-screen bg-sand p-6 sm:p-8 flex flex-col items-center relative overflow-hidden animate-fadeIn">
      
      {/* Decorative Ornaments Background */}
      <div className="absolute top-1/4 left-[-10%] w-64 h-64 bg-lime/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header dengan tombol kembali & Judul yang memakai class font-heading */}
      <div className="w-full max-w-md flex items-center mb-8 relative z-10">
        <button 
          onClick={() => navigate('/home')}
          className="w-14 h-14 rounded-[1.25rem] bg-white border border-brown/10 shadow-sm flex items-center justify-center hover:bg-cream transition-all active:scale-95"
        >
          <span className="text-2xl drop-shadow-sm" role="img" aria-label="back">⬅️</span>
        </button>
        <div className="flex-1 text-center pr-14 flex flex-col justify-center h-14">
          <p className="font-body text-brown text-xs sm:text-sm font-bold uppercase tracking-[0.2em] mb-1 opacity-80">
            Daftar Level
          </p>
          <h1 className="font-heading text-2xl sm:text-3xl text-darkbrown font-black leading-none uppercase tracking-wide">
            {mission.title}
          </h1>
        </div>
      </div>

      {/* Komponen Card List */}
      <div className="w-full max-w-md flex flex-col gap-4 relative z-10">
        {levelsWithProgress.map((level) => (
          <button
            key={level.id}
            disabled={level.isLocked}
            onClick={() => navigate(`/game/${missionId}/${level.id}`)}
            className={`
              relative w-full rounded-[1.5rem] p-5 border flex items-center justify-between text-left transition-all outline-none
              ${level.isLocked 
                ? 'bg-[#EFELE8] border-brown/5 opacity-60 cursor-not-allowed' 
                : 'bg-white border-transparent shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:border-lime/50 hover:shadow-[0_4px_24px_rgba(185,190,26,0.15)] active:scale-[0.98] active:shadow-none'
              }
            `}
          >
            <div className="flex items-center gap-5">
              
              {/* Left indicator bubble */}
              <div className={`
                w-[3.5rem] h-[3.5rem] rounded-[1rem] flex items-center justify-center font-heading font-black text-2xl
                ${level.isLocked 
                  ? 'bg-brown/10 text-brown/50' 
                  : 'bg-lime text-darkbrown shadow-inner border border-[#B9BE1A]/30'
                }
              `}>
                {level.index + 1}
              </div>
              
              <div className="flex flex-col gap-1">
                <span className={`font-heading text-xl font-bold capitalize ${level.isLocked ? 'text-brown/50' : 'text-darkbrown'}`}>
                  Level {level.index + 1}
                </span>
                
                {/* Tampilan jumlah stars */}
                {!level.isLocked && (
                  <div className="flex gap-1.5">
                    {[1, 2, 3].map((starIdx) => (
                      <span 
                        key={starIdx} 
                        className={`text-[1.1rem] drop-shadow-sm transition-all ${starIdx <= level.stars ? 'scale-110 drop-shadow-md' : 'grayscale opacity-30 drop-shadow-none'}`} 
                        role="img" 
                        aria-label="star"
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                )}

                {/* Tampilan info terkeren saat Level Terkunci */}
                {level.isLocked && (
                  <span className="font-body text-xs font-bold text-brown/50 uppercase tracking-widest flex items-center gap-1.5">
                    <span role="img" aria-label="lock">🔒</span> Terkunci
                  </span>
                )}
              </div>
              
            </div>
            
            {!level.isLocked && (
               <div className="w-10 h-10 rounded-full bg-cream/50 flex items-center justify-center text-brown font-black">
                 ➔
               </div>
            )}
          </button>
        ))}
      </div>

    </div>
  );
}
