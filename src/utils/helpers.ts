export const formatPercentage = (percentage: number) => {
  return percentage.toFixed(0) + '%';
};

export const countErrors = (actual: string, expected: string) => {
  const expectedCharacters = expected.split('');

  return expectedCharacters.reduce((errors, expectedChar, i) => {
    const actualChar = actual[i];

    if (actualChar !== expectedChar) {
      errors++;
    }

    return errors;
  }, 0);
};

export const calculateAccuracyPercentage = (errors: number, total: number) => {
  if (total > 0) {
    const corrects = total - errors;
    return (corrects / total) * 100;
  }

  return 0;
};

export const isKeyboardCodeAllowed = (code: string) => {
  return (
    code.startsWith('Key') ||
    code.startsWith('Digit') ||
    code === 'Backspace' ||
    code === 'Space'
  );
};

export const getCurrentDate = () => {
  const timeNow = new Date().toLocaleTimeString().slice(0, -3);
  const dateNow = new Date().toLocaleDateString();

  return `${timeNow}, ${dateNow}`;
};
