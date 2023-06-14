import { useState, useEffect, useCallback, useRef } from 'react';

const useCountdownTimer = (seconds: number) => {
  const [timerLeft, setTimerLeft] = useState(seconds);
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  const startCountdown = useCallback(() => {
    console.log('Start');

    intervalRef.current = setInterval(() => {
      setTimerLeft((prev) => prev - 1);
    }, 1000);
  }, []);

  const resetCountdown = useCallback(() => {
    console.log('reset');

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setTimerLeft(seconds);
  }, [seconds]);

  useEffect(() => {
    if (!timerLeft && intervalRef.current) {
      console.log('clear');

      clearInterval(intervalRef.current);
    }
  }, [timerLeft, intervalRef.current]);

  const changeTimeInterval = useCallback((seconds: number) => {
    setTimerLeft(seconds);
  }, []);

  return { timerLeft, startCountdown, resetCountdown, changeTimeInterval };
};

export default useCountdownTimer;
