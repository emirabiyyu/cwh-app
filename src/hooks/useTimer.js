import { useState, useEffect, useRef, useCallback } from 'react';

export function useTimer({ duration = 20, onExpire }) {
  // duration in seconds, timeLeft in milliseconds
  const [timeLeft, setTimeLeft] = useState(duration * 1000);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const onExpireRef = useRef(onExpire);
  
  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(duration * 1000);
  }, [duration]);

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 100;
        if (newTime <= 0) {
          clearInterval(intervalId);
          intervalRef.current = null;
          setIsRunning(false);
          if (onExpireRef.current) {
            onExpireRef.current();
          }
          return 0;
        }
        return newTime;
      });
    }, 100);

    intervalRef.current = intervalId;

    return () => {
      clearInterval(intervalId);
      intervalRef.current = null;
    };
  }, [isRunning]);

  // timePercent goes from 100 to 0
  const timePercent = Math.max(0, Math.min(100, (timeLeft / (duration * 1000)) * 100));

  const penalize = useCallback((seconds = 4) => {
    setTimeLeft(prev => {
      const penaltyMs = seconds * 1000;
      const newTime = Math.max(0, prev - penaltyMs);
      if (newTime <= 0) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setIsRunning(false);
        if (onExpireRef.current) {
          onExpireRef.current();
        }
      }
      return newTime;
    });
  }, []);

  return {
    timePercent,
    isRunning,
    start,
    pause,
    reset,
    penalize
  };
}
