import { useCallback, useEffect, useState } from 'react';
import { countErrors } from '../utils/helpers';
import useCountdownTimer from './useCountdownTimer';
import useTypings from './useTypings';
import useWords from './useWords';

export type State = 'start' | 'run' | 'finish';

const NUMBER_OF_WORDS = 20;
const DEFAULT_SECONDS = 30;
const DEFAULT_LEVEL = 'Easy';

const useEngine = () => {
  const [state, setState] = useState<State>('start');
  const { timerLeft, startCountdown, resetCountdown, changeTimeInterval } =
    useCountdownTimer(DEFAULT_SECONDS);
  const { words, updateWords, selectedLevel, changeLevelWords } = useWords(NUMBER_OF_WORDS, DEFAULT_LEVEL);
  const { cursor, typed, clearTyped, totalTyped, resetTotalTyped } = useTypings(
    state !== 'finish'
  );
  const [errors, setErrors] = useState(0);

  const isStarting = state === 'start' && cursor > 0;
  const areWordsFinished = cursor === words.length;

  const restart = useCallback(() => {
    resetCountdown();
    resetTotalTyped();
    setState('start');
    setErrors(0);
    updateWords();
    clearTyped();
    changeLevelWords(DEFAULT_LEVEL);
  }, [clearTyped, updateWords, resetCountdown, resetTotalTyped]);

  const sumErrors = useCallback(() => {
    const wordsReached = words.substring(0, Math.min(cursor, words.length));
    setErrors((prevErrors) => prevErrors + countErrors(typed, wordsReached));
  }, [typed, words, cursor]);

  // as soon the user starts typing the first letter, we start
  useEffect(() => {
    if (isStarting) {
      setState('run');
      startCountdown();
    }
  }, [isStarting, startCountdown]);

  // when the time is up, we've finished
  useEffect(() => {
    if (!timerLeft && state === 'run') {
      setState('finish');
      sumErrors();
    }
  }, [timerLeft, state, sumErrors]);

  /**
   * when the current words are all filled up,
   * we generate and show another set of words
   */
  useEffect(() => {
    if (areWordsFinished) {
      sumErrors();
      updateWords();
      clearTyped();
    }
  }, [clearTyped, areWordsFinished, updateWords, sumErrors]);

  return { state, words, typed, errors, restart, timerLeft, totalTyped, changeTimeInterval, selectedLevel, changeLevelWords };
};

export default useEngine;
