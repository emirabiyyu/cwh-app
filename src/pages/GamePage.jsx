import React, { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import levelsData from '../data/levels.json';
import { useGameState } from '../hooks/useGameState';
import { useTimer } from '../hooks/useTimer';
import { useSpotlight } from '../hooks/useSpotlight';

import HudBar from '../components/game/HudBar';
import InstructionBar from '../components/game/InstructionBar';
import ObjectGrid from '../components/game/ObjectGrid';

import TutorialModal from '../components/modals/TutorialModal';
import PauseModal from '../components/modals/PauseModal';
import FinishedModal from '../components/modals/FinishedModal';
import GameOverModal from '../components/modals/GameOverModal';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';

// ============ GAME CONFIG — adjust di sini ============
const TIMER_DURATION = 20;       // durasi timer per level (detik)
const WRONG_PENALTY  = 4;        // pengurangan waktu saat salah jawab (detik)
// ======================================================

export default function GamePage() {
  const { missionId, levelId } = useParams();
  const navigate = useNavigate();
  
  const sceneRef = useRef(null);
  const cardRefs = useRef({});
  
  const mission = levelsData.find(m => m.id === missionId);
  const level = mission?.levels.find(l => l.id === levelId);

  const [isPaused, setIsPaused] = useState(false);
  const [starsEarned, setStarsEarned] = useState(0);

  // Tutorial logic: show only on mission_1 level_1 if never shown
  const showTutorialInit = !localStorage.getItem('tutorial_shown') && missionId === 'mission_1' && levelId === 'level_1';
  const [isTutorialOpen, setIsTutorialOpen] = useState(showTutorialInit);
  const [isTimeoutOpen, setIsTimeoutOpen] = useState(false);

  // Loading preparing state — preload aset + minimum durasi tampil
  const [isPreparing, setIsPreparing] = useState(true);
  const [prepareProgress, setPrepareProgress] = useState(0);
  const [assetsReady, setAssetsReady] = useState(false);
  const [minTimeReady, setMinTimeReady] = useState(false);

  // Minimum durasi loading screen (1.5 detik) dengan animasi progress
  useEffect(() => {
    const duration = 1500;
    const intervalTime = 50;
    const increment = 100 / (duration / intervalTime);

    const timerInterval = setInterval(() => {
      setPrepareProgress(prev => {
        if (prev >= 100) {
          clearInterval(timerInterval);
          return 100;
        }
        return prev + increment;
      });
    }, intervalTime);

    const minTimer = setTimeout(() => {
      setMinTimeReady(true);
    }, duration);

    return () => {
      clearInterval(timerInterval);
      clearTimeout(minTimer);
    };
  }, []);

  // Preload semua gambar (scene + objects) selama loading
  useEffect(() => {
    if (!mission || !level) { setAssetsReady(true); return; }

    const imageUrls = [
      mission.sceneImage,
      ...level.objectsToFind.map(obj => obj.image).filter(Boolean)
    ].filter(Boolean);

    if (imageUrls.length === 0) { setAssetsReady(true); return; }

    let loaded = 0;
    const total = imageUrls.length;

    imageUrls.forEach(url => {
      const img = new Image();
      img.onload = img.onerror = () => {
        loaded++;
        if (loaded >= total) setAssetsReady(true);
      };
      img.src = url;
    });

    // Fallback — maks 5 detik tunggu aset
    const fallback = setTimeout(() => setAssetsReady(true), 5000);
    return () => clearTimeout(fallback);
  }, [mission, level]);

  // Selesai saat DUA-DUANYA siap: minimum waktu + aset ter-load
  useEffect(() => {
    if (assetsReady && minTimeReady) {
      const timeout = setTimeout(() => setIsPreparing(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [assetsReady, minTimeReady]);

  // Acak instruksi: ambil maksimal 6 pertanyaan dari total objek di dalam level
  const instructions = React.useMemo(() => {
    if (!level) return [];
    const arr = [...level.objectsToFind];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, 6);
  }, [missionId, levelId, level]);

  // handleWrongAnswer — callback penalti timer
  const handleWrongAnswer = () => {
    timer.penalize(WRONG_PENALTY);
  };

  // Inisialisasi GameState
  const gameState = useGameState({
    instructions: instructions,
    objects: level?.objectsToFind || [],
    missionId: missionId,
    onFinished: (stars) => {
      setStarsEarned(stars);
      localStorage.setItem(`stars_m${missionId}_l${levelId}`, String(stars));
      // Simpan semua objek level ini ke koleksi
      (level?.objectsToFind || []).forEach(obj => {
        localStorage.setItem(`collected_m${missionId}_${obj.id}`, 'true');
      });
    },
    onGameOver: () => {},
    onWrongAnswer: handleWrongAnswer
  });

  const handleRetry = () => {
    gameState.resetState();
    timer.reset();
    timer.start();
  };

  // Inisialisasi Timer
  const timer = useTimer({
    duration: TIMER_DURATION,
    onExpire: () => {
      gameState.handleMissed();
      timer.pause();
      setIsTimeoutOpen(true);
    }
  });

  const handleTimeoutRetry = () => {
    setIsTimeoutOpen(false);
    gameState.resetState();
    timer.reset();
    timer.start();
  };

  // Inisialisasi Spotlight
  const spotlight = useSpotlight(sceneRef);

  // --- Efek dan Siklus Timer ---
  
  // Pause / Resume otomatis berdasarkan status
  useEffect(() => {
    if (gameState.gameStatus === 'playing' && !isTutorialOpen && !isPaused && !isPreparing) {
      timer.start();
    } else {
      timer.pause();
    }
  }, [gameState.gameStatus, isTutorialOpen, isPaused, isPreparing]);

  // Reset timer tiap kali pindah instruksi (barusan menjawab benar)
  useEffect(() => {
    timer.reset();
    if (gameState.gameStatus === 'playing' && !isTutorialOpen && !isPaused && !isPreparing) {
      timer.start();
    }
  }, [gameState.currentInstructionIndex]);
  
  // Guard
  if (!mission || !level) return <div className="p-8">Misi atau Level tidak ditemukan</div>;

  const currentLevelIdx = mission.levels.findIndex(l => l.id === levelId);

  // Tampilan Preparing/Loading
  if (isPreparing) {
    return (
      <div className="min-h-screen bg-sand flex flex-col items-center justify-center p-6 sm:p-8 relative overflow-hidden animate-fadeIn" style={{ height: '100dvh', width: '100vw' }}>
        <div className="absolute top-[-5%] left-[-10%] w-64 h-64 bg-lime/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-72 h-72 bg-[#5AC8FA]/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-sm flex flex-col items-center z-10">
          <div className="w-24 h-24 sm:w-32 sm:h-32 mb-8 bg-cream border-4 border-white rounded-[2rem] shadow-sm flex items-center justify-center animate-pulse">
            <span className="text-[4rem] sm:text-[5rem]" role="img" aria-label="loading">⏳</span>
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl text-darkbrown font-black mb-8 tracking-tight drop-shadow-sm text-center">
            Masuk ke Level {currentLevelIdx + 1}...
          </h1>

          <div className="w-full h-6 bg-white rounded-full p-[3px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] border border-brown/10 overflow-hidden">
            <div 
              className="h-full bg-lime rounded-full transition-all duration-75 ease-linear shadow-[inset_0_-2px_0_0_#B9BE1A] relative"
              style={{ width: `${Math.min(prepareProgress, 100)}%` }}
            >
            </div>
          </div>
          <p className="font-body text-brown text-sm font-bold mt-4 uppercase tracking-widest opacity-80">
            {Math.floor(prepareProgress)}%
          </p>
        </div>
      </div>
    );
  }

  // Render Logic Effective Card States
  const effectiveCardStates = {
    ...gameState.cardStates,
    ...(spotlight.hoveredCardId &&
        (!gameState.cardStates[spotlight.hoveredCardId] || gameState.cardStates[spotlight.hoveredCardId] === 'default')
      ? { [spotlight.hoveredCardId]: 'selected' } : {})
  };

  const currentInst = instructions[gameState.currentInstructionIndex];
  const instructionText = currentInst ? `Find the ${currentInst.name}` : 'Good Job!';

  const isLastLevel = currentLevelIdx === mission.levels.length - 1;

  const handleNextLevel = () => {
    if (!isLastLevel) {
      const nextLevel = mission.levels[currentLevelIdx + 1];
      window.location.href = `/game/${missionId}/${nextLevel.id}`;
    }
  };

  return (
    <div
      className="bg-cream overflow-hidden touch-none select-none animate-fadeIn"
      style={{
        width: '100vw',
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          maxWidth: 'min(100vw, calc(100dvh * 0.65))',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
      
      {/* 1. HudBar */}
      <HudBar 
        levelLabel={`Level ${(mission?.levels.findIndex(l => l.id === levelId) ?? 0) + 1}`}
        onPause={() => {
          timer.pause();
          setIsPaused(true);
        }} 
      />

      {/* 2. InstructionBar */}
      <InstructionBar 
        instructionText={instructionText} 
        timerPercent={timer.timePercent} 
      />

      {/* 3. SceneArea */}
      <div 
        ref={sceneRef} 
        className="flex-1 relative overflow-hidden"
        style={{ 
          paddingBottom: '16px'
        }}
        onPointerDown={(e) => spotlight.handlers.onPointerDown(e)}
        onPointerMove={(e) => spotlight.handlers.onPointerMove(e, cardRefs.current)}
        onPointerUp={(e) => spotlight.handlers.onPointerUp(e, (x, y) => {
          gameState.checkAnswer(x, y, cardRefs.current);
        })}
        onPointerLeave={() => spotlight.handlers.onPointerLeave()}
      >
        {/* Latar Belakang Scene */}
        <img
          src={mission.sceneImage}
          alt="Scene background"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none brightness-[0.55]"
          draggable="false"
          onError={(e) => { e.target.style.display = 'none' }}
        />

        {/* Floating Soal Progress Counter (Top Inside Scene) */}
        <div className="absolute top-3 inset-x-0 z-30 flex items-center justify-center pointer-events-none">
          <div className="font-body text-sm font-bold text-darkbrown bg-white/95 px-5 py-1.5 rounded-[1.25rem] shadow-md border border-brown/5 tracking-[0.2em] uppercase pointer-events-auto backdrop-blur-sm">
            {Math.min(gameState.currentInstructionIndex + 1, instructions.length)} / {instructions.length}
          </div>
        </div>

        {/* Kotak Objek Grid */}
        <ObjectGrid 
          objects={gameState.shuffledObjects} 
          cardStates={effectiveCardStates} 
          onCardRef={(id, el) => { cardRefs.current[id] = el; }} 
        />

        {/* Mask/Gelap Spotlight yang bergantung pada state Spotlight */}
        <div 
          className="absolute inset-0 z-20 pointer-events-none transition-colors duration-300"
          style={{
            backgroundColor: gameState.gameStatus === 'correct' ? 'rgba(200, 214, 42, 0.95)' : gameState.gameStatus === 'wrong' ? 'rgba(255, 59, 48, 0.95)' : 'rgba(0, 0, 0, 100)',
            WebkitMaskImage: `radial-gradient(circle ${spotlight.spotR} at ${spotlight.spotX} ${spotlight.spotY}, transparent 0%, transparent 55%, black 100%)`,
            maskImage: `radial-gradient(circle ${spotlight.spotR} at ${spotlight.spotX} ${spotlight.spotY}, transparent 0%, transparent 55%, black 100%)`,
          }}
        />

        {/* Visual Cues Cepat */}
        {gameState.gameStatus === 'correct' && (
          <div className="absolute inset-x-0 top-[20%] flex justify-center z-30 pointer-events-none animate-bounce drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
             <div lang="en" translate="no" className="bg-lime text-darkbrown font-heading font-black text-2xl px-6 py-3 rounded-full border-4 border-white">
                Tepat Sekali! ✅
             </div>
          </div>
        )}
        
        {gameState.gameStatus === 'wrong' && (
          <div className="absolute inset-x-0 top-[20%] flex justify-center z-30 pointer-events-none animate-bounce drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
             <div lang="en" translate="no" className="bg-[#FF3B30] text-white font-heading font-black text-2xl px-6 py-3 rounded-full border-4 border-white">
                Coba Lagi! ❌
             </div>
          </div>
        )}

      </div>



      {/* 4. Semua Modal (memakai isOpen) */}
      <TutorialModal 
        isOpen={isTutorialOpen} 
        onComplete={() => {
          localStorage.setItem('tutorial_shown', 'true');
          setIsTutorialOpen(false);
          timer.start();
        }} 
      />

      <PauseModal 
        isOpen={isPaused}
        onResume={() => {
          setIsPaused(false);
          timer.start();
        }}
        onQuit={() => navigate(`/mission/${missionId}`)}
      />

      <FinishedModal 
        isOpen={gameState.gameStatus === 'finished'}
        stars={starsEarned}
        isLastLevel={isLastLevel}
        onNext={handleNextLevel}
        onRetry={handleRetry}
        onHome={() => navigate(`/mission/${missionId}`)}
      />

      <GameOverModal 
        isOpen={gameState.gameStatus === 'gameover'}
        onRetry={handleRetry}
        onHome={() => navigate(`/mission/${missionId}`)}
      />

      {/* Modal Timeout — muncul saat timer habis */}
      <Modal isOpen={isTimeoutOpen}>
        <div className="flex flex-col items-center gap-5 bg-[#FFF3E7] rounded-[40px] p-7 -m-6">
          <div className="w-[88px] h-[88px] rounded-full bg-[#FF9500]/20 flex items-center justify-center">
            <span className="text-4xl">⏰</span>
          </div>
          <div className="flex flex-col items-center gap-2 w-full">
            <h3 className="font-heading font-bold text-xl text-[#1B1B1B] text-center">
              Timer Habis
            </h3>
            <p className="font-body text-sm text-[#1B1B1B]/70 text-center">
              Ulangi permainan ini
            </p>
          </div>
          <Button variant="primary" onClick={handleTimeoutRetry}>
            Ulangi
          </Button>
        </div>
      </Modal>

      </div>
    </div>
  );
}
