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

  // Inisialisasi GameState
  const gameState = useGameState({
    instructions: instructions,
    objects: level?.objectsToFind || [],
    onFinished: (stars) => {
      setStarsEarned(stars);
      localStorage.setItem(`stars_m${missionId}_l${levelId}`, String(stars));
    },
    onGameOver: () => {}
  });

  const livesRef = useRef(4);
  useEffect(() => {
    livesRef.current = gameState.lives;
  }, [gameState.lives]);

  const handleRetry = () => {
    gameState.resetState();
    timer.reset();
    timer.start();
  };

  // Inisialisasi Timer
  const timer = useTimer({
    duration: 20,
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
    if (gameState.gameStatus === 'playing' && !isTutorialOpen && !isPaused) {
      timer.start();
    } else {
      timer.pause();
    }
  }, [gameState.gameStatus, isTutorialOpen, isPaused]);

  // Reset timer tiap kali pindah instruksi (barusan menjawab benar)
  useEffect(() => {
    if (gameState.gameStatus === 'playing' && !isTutorialOpen && !isPaused) {
      timer.reset();
      timer.start();
    }
  }, [gameState.currentInstructionIndex]);
  
  // Guard
  if (!mission || !level) return <div className="p-8">Misi atau Level tidak ditemukan</div>;

  // Render Logic Effective Card States
  const effectiveCardStates = {
    ...gameState.cardStates,
    ...(spotlight.hoveredCardId &&
        (!gameState.cardStates[spotlight.hoveredCardId] || gameState.cardStates[spotlight.hoveredCardId] === 'default')
      ? { [spotlight.hoveredCardId]: 'selected' } : {})
  };

  const currentInst = instructions[gameState.currentInstructionIndex];
  const instructionText = currentInst ? `Find the ${currentInst.name}` : 'Good Job!';

  const currentLevelIdx = mission.levels.findIndex(l => l.id === levelId);
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
        lives={gameState.lives} 
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
          alt="Scene Game" 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
          draggable="false"
        />

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
            backgroundColor: gameState.gameStatus === 'correct' ? 'rgba(200, 214, 42, 0.95)' : gameState.gameStatus === 'wrong' ? 'rgba(255, 59, 48, 0.95)' : 'rgba(0, 0, 0, 0.96)',
            maskImage: `radial-gradient(circle ${spotlight.spotR} at ${spotlight.spotX} ${spotlight.spotY}, transparent 100%, black 120%)`,
            WebkitMaskImage: `radial-gradient(circle ${spotlight.spotR} at ${spotlight.spotX} ${spotlight.spotY}, transparent 100%, black 120%)`
          }}
        />

        {/* Visual Cues Cepat */}
        {gameState.gameStatus === 'correct' && (
          <div className="absolute inset-x-0 top-[20%] flex justify-center z-30 pointer-events-none animate-bounce drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
             <div className="bg-lime text-darkbrown font-heading font-black text-2xl px-6 py-3 rounded-full border-4 border-white">
                Bagus Sekali! ✅
             </div>
          </div>
        )}
        
        {gameState.gameStatus === 'wrong' && (
          <div className="absolute inset-x-0 top-[20%] flex justify-center z-30 pointer-events-none animate-bounce drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
             <div className="bg-[#FF3B30] text-white font-heading font-black text-2xl px-6 py-3 rounded-full border-4 border-white">
                Coba Lagi! ❌
             </div>
          </div>
        )}



        {/* Floating Soal Progress Counter */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center font-body text-sm font-bold text-white bg-darkbrown/70 px-5 py-2.5 rounded-[1.25rem] shadow-lg backdrop-blur-sm border border-white/10 tracking-[0.2em] uppercase">
           {Math.min(gameState.currentInstructionIndex, instructions.length)} / {instructions.length}
        </div>

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
