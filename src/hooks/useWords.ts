import { faker } from '@faker-js/faker';
import { useState, useCallback } from 'react';
import { Levels } from '../constants/types';

const getWordsByLevel = {
  get Easy() {
    return faker.random.word().toLocaleLowerCase();
  },
  get Medium() {
    return faker.random.word();
  },
  get Hard() {
    return faker.random.word();
  },
};

const generateWords = (count: number, level: Levels) => {
  let words = '';

  for (let i = 0; i < count; i++) {
    words += getWordsByLevel[level] + ' ';
  }

  return words.trim();
};

const useWords = (count: number, level: Levels) => {
  const [words, setWords] = useState<string>(generateWords(count, level));
  const [selectedLevel, setSelectedLevel] = useState<Levels>(level);

  const updateWords = useCallback(() => {
    setWords(generateWords(count, level));
  }, [count, level]);

  const changeLevelWords = useCallback(
    (level: Levels) => {
      setWords(generateWords(count, level));
      setSelectedLevel(level);
    },
    [count, level]
  );

  return { words, updateWords, selectedLevel, changeLevelWords };
};

export default useWords;
