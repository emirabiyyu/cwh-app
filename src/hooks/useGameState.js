import { useState, useCallback } from 'react';

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function useGameState({ instructions = [], objects = [], missionId, onFinished, onGameOver, onWrongAnswer }) {
  const [currentInstructionIndex, setCurrentInstructionIndex] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [gameStatus, setGameStatus] = useState('playing');
  const [cardStates, setCardStates] = useState({});
  const [shuffledObjects, setShuffledObjects] = useState(() => shuffle(objects));

  const checkAnswer = useCallback((clientX, clientY, cardRefs) => {
    if (gameStatus !== 'playing') return;

    let clickedId = null;
    for (const [id, ref] of Object.entries(cardRefs)) {
      if (!ref) continue;
      const rect = ref.getBoundingClientRect();
      if (clientX >= rect.left && clientX <= rect.right &&
          clientY >= rect.top && clientY <= rect.bottom) {
        clickedId = id;
        break;
      }
    }

    if (!clickedId) return;
    const currentInstruction = instructions[currentInstructionIndex];
    if (!currentInstruction) return;

    const isCorrect = clickedId === currentInstruction.id;

    if (isCorrect) {
      setGameStatus('correct');
      setCardStates(prev => ({ ...prev, [clickedId]: 'correct' }));
      setStreak(prev => prev + 1);

      if (missionId) {
        localStorage.setItem(`collected_m${missionId}_${clickedId}`, 'true');
      }

      setTimeout(() => {
        const nextIndex = currentInstructionIndex + 1;
        setCardStates({});
        setShuffledObjects(shuffle(objects));

        if (nextIndex >= instructions.length) {
          let stars = 1;
          if (wrongCount === 0) stars = 3;
          else if (wrongCount <= 2) stars = 2;
          setGameStatus('finished');
          if (onFinished) onFinished(stars);
        } else {
          setCurrentInstructionIndex(nextIndex);
          setGameStatus('transitioning');
          setTimeout(() => setGameStatus('playing'), 1200);
        }
      }, 800);

    } else {
      setGameStatus('wrong');
      setCardStates(prev => ({ ...prev, [clickedId]: 'wrong' }));
      setStreak(0);
      setWrongCount(prev => prev + 1);
      if (onWrongAnswer) onWrongAnswer(); // trigger timer penalti

      setTimeout(() => {
        setCardStates(prev => ({ ...prev, [clickedId]: 'default' }));
        setGameStatus('playing');
      }, 800);
    }
  }, [currentInstructionIndex, instructions, objects, gameStatus, wrongCount, missionId, onFinished, onGameOver, onWrongAnswer]);

  const handleMissed = useCallback(() => {
    if (gameStatus !== 'playing') return;
    setGameStatus('gameover');
    if (onGameOver) onGameOver();
  }, [gameStatus, onGameOver]);

  const resetState = useCallback(() => {
    setCurrentInstructionIndex(0);
    setWrongCount(0);
    setStreak(0);
    setGameStatus('playing');
    setCardStates({});
    setShuffledObjects(shuffle(objects));
  }, [objects]);

  return {
    currentInstructionIndex,
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
