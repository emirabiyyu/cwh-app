import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import levelsData from '../data/levels.json';
import MissionCard from '../components/ui/MissionCard';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';

export default function HomePage() {
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState('Pemain');
  const [playerAvatar, setPlayerAvatar] = useState(null);
  const [totalStars, setTotalStars] = useState(0);
  const [earnedM1, setEarnedM1] = useState(0);
  const [earnedM2, setEarnedM2] = useState(0);

  // Map avatar ID ke path gambar
  const avatarMap = {
    avatar_1: '/src/assets/avatar/avatar_1.png',
    avatar_2: '/src/assets/avatar/avatar_2.png',
    avatar_3: '/src/assets/avatar/avatar_3.png',
    avatar_4: '/src/assets/avatar/avatar_4.png',
    avatar_5: '/src/assets/avatar/avatar_5.png',
  };

  useEffect(() => {
    // Ambil nama dan avatar pemain
    const storedName = localStorage.getItem('player_name');
    if (storedName) setPlayerName(storedName);
    const storedAvatar = localStorage.getItem('player_avatar');
    if (storedAvatar) setPlayerAvatar(storedAvatar);

    // Hitung total stars
    let tStars = 0;
    let m1Stars = 0;
    let m2Stars = 0;

    levelsData.forEach(mission => {
      mission.levels.forEach(level => {
        const key = `stars_m${mission.id}_l${level.id}`;
        const stars = parseInt(localStorage.getItem(key) || '0', 10);
        tStars += stars;
        
        if (mission.id === 'mission_1') {
          m1Stars += stars;
        } else if (mission.id === 'mission_2') {
          m2Stars += stars;
        }
      });
    });

    setTotalStars(tStars);
    setEarnedM1(m1Stars);
    setEarnedM2(m2Stars);
  }, []);

  const handleStartMission = (missionId) => {
    navigate(`/mission/${missionId}`);
  };

  const [isResetOpen, setIsResetOpen] = useState(false);

  const handleResetProgress = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  // Logic: Mission 2 terkunci jika Mission 1 < 4 bintang 
  const isM2Locked = earnedM1 < 4;

  return (
    <div className="min-h-screen bg-sand p-6 sm:p-8 pb-20 relative overflow-hidden animate-fadeIn">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-lime/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-72 h-72 bg-[#5AC8FA]/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header Profile Area */}
      <div className="flex items-center justify-between mb-12 mt-4 relative z-10">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          {playerAvatar && avatarMap[playerAvatar] && (
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-lime shadow-md flex-shrink-0 bg-[#FFF3E7]">
              <img 
                src={avatarMap[playerAvatar]} 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <h1 className="font-heading text-3xl sm:text-4xl text-darkbrown font-black tracking-tight drop-shadow-sm">
            Halo, {playerName}!
          </h1>
        </div>
        
        {/* Total Stars Badge */}
        <div className="bg-cream border border-brown/5 rounded-[20px] px-5 py-4 flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(0,0,0,0.05),inset_0_-4px_0_rgba(235,228,218,1)]">
          <span className="text-2xl drop-shadow-sm" role="img" aria-label="star">⭐</span>
          <span className="font-heading font-black text-2xl text-darkbrown">
            {totalStars}
          </span>
        </div>
      </div>

      <div className="mb-6 relative z-10 flex items-center justify-between">
        <h2 className="font-heading text-[1.75rem] text-darkbrown font-bold tracking-tight">
          Pilih Misi
        </h2>
      </div>

      {/* Mission Cards List */}
      <div className="flex flex-col gap-5 relative z-10">
        
        {/* Render Mission 1 */}
        {levelsData[0] && (
          <MissionCard 
            missionName={levelsData[0].title}
            levelCount={levelsData[0].levels.length}
            requiredStars={0}
            isLocked={false}
            earnedStars={earnedM1}
            onStart={() => handleStartMission(levelsData[0].id)}
          />
        )}

        {/* Render Mission 2 */}
        {levelsData[1] && (
          <MissionCard 
            missionName={levelsData[1].title}
            levelCount={levelsData[1].levels.length}
            requiredStars={4}
            isLocked={isM2Locked}
            earnedStars={earnedM2}
            onStart={() => handleStartMission(levelsData[1].id)}
          />
        )}

      </div>

      {/* Reset Area */}
      <div className="mt-14 text-center relative z-10">
          <button 
           onClick={() => setIsResetOpen(true)} 
           className="font-body text-sm font-bold text-[#FF3B30] opacity-80 hover:opacity-100 underline decoration-2 underline-offset-4 transition-all"
         >
           Reset Progress Permainan
         </button>
      </div>

      {/* Modal Konfirmasi Reset */}
      <Modal isOpen={isResetOpen}>
        <div className="flex flex-col items-center gap-5 bg-[#FFF3E7] rounded-[40px] p-7 -m-6">
          <div className="w-[88px] h-[88px] rounded-full bg-[#FF3B30]/15 flex items-center justify-center">
            <span className="text-4xl">⚠️</span>
          </div>
          <div className="flex flex-col items-center gap-2 w-full">
            <h3 className="font-heading font-bold text-xl text-[#1B1B1B] text-center">
              Reset Progress?
            </h3>
            <p className="font-body text-sm text-[#1B1B1B]/70 text-center">
              Seluruh data permainan akan dihapus dan kamu harus memulai dari awal.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={() => setIsResetOpen(false)}>
              Batal
            </Button>
            <Button variant="danger" onClick={handleResetProgress}>
              Reset
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
