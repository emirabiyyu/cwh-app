import { useState, useCallback } from 'react';

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function useGameState({ instructions = [], objects = [], onFinished, onGameOver }) {
  const [currentInstructionIndex, setCurrentInstructionIndex] = useState(0);
  const [lives, setLives] = useState(4);
  const [wrongCount, setWrongCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [gameStatus, setGameStatus] = useState('playing'); 
  const [cardStates, setCardStates] = useState({});
  const [shuffledObjects, setShuffledObjects] = useState(() => shuffle(objects));

  const checkAnswer = useCallback((clientX, clientY, cardRefs) => {
    // Hanya proses jika status masih playing
    if (gameStatus !== 'playing') return;

    let clickedId = null;
    for (const [id, ref] of Object.entries(cardRefs)) {
      if (!ref) continue;
      const rect = ref.getBoundingClientRect();
      if (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      ) {
        clickedId = id;
        break;
      }
    }

    if (!clickedId) return;

    const currentInstruction = instructions[currentInstructionIndex];
    if (!currentInstruction) return;

    // Anggap id instruksi cocok dengan id objek pada object list (cardRefs)
    const isCorrect = clickedId === currentInstruction.id;

    if (isCorrect) {
      setGameStatus('correct');
      setCardStates(prev => ({ ...prev, [clickedId]: 'correct' }));
      setStreak(prev => prev + 1);

      setTimeout(() => {
        const nextIndex = currentInstructionIndex + 1;
        setCardStates({});
        setShuffledObjects(shuffle(objects));
        
        if (nextIndex >= instructions.length) {
          // Hitung bintang
          let stars = 1;
          if (wrongCount === 0) stars = 3;
          else if (wrongCount <= 2) stars = 2;
          
          setGameStatus('finished');
          if (onFinished) onFinished(stars);
        } else {
          setCurrentInstructionIndex(nextIndex);
          setGameStatus('playing');
        }
      }, 800);
    } else {
      setGameStatus('wrong');
      setCardStates(prev => ({ ...prev, [clickedId]: 'wrong' }));
      setLives(prev => prev - 1);
      setStreak(0);
      setWrongCount(prev => prev + 1);
      
      const nextLives = lives - 1;

      setTimeout(() => {
        setCardStates(prev => ({ ...prev, [clickedId]: 'default' }));
        if (nextLives <= 0) {
          setGameStatus('gameover');
          if (onGameOver) onGameOver();
        } else {
          setGameStatus('playing');
        }
      }, 800);
    }
  }, [currentInstructionIndex, instructions, objects, gameStatus, lives, wrongCount, onFinished, onGameOver]);

  const handleMissed = useCallback(() => {
    if (gameStatus !== 'playing') return;
    
    setLives(prev => prev - 1);
    setStreak(0);
    setWrongCount(prev => prev + 1);
    
    const nextLives = lives - 1;
    if (nextLives <= 0) {
      setGameStatus('gameover');
      if (onGameOver) onGameOver();
    } else {
      setGameStatus('playing');
    }
  }, [lives, gameStatus, onGameOver]);

  const resetState = useCallback(() => {
    setCurrentInstructionIndex(0);
    setLives(4);
    setWrongCount(0);
    setStreak(0);
    setGameStatus('playing');
    setCardStates({});
    setShuffledObjects(shuffle(objects));
  }, [objects]);

  return {
    currentInstructionIndex,
    lives,
    wrongCount,
    streak,
    gameStatus,
    setGameStatus,
    cardStates,
    shuffledObjects,
    checkAnswer,
    handleMissed,
    resetState
  };
}
