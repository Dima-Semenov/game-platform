import { Caret } from './Caret';
import cn from 'classnames';

export const UserTyping = ({
  userInput,
  words,
  className,
}: {
  userInput: string;
  words: string;
  className?: string;
}) => {
  const typedCharacters = userInput.split('');

  return (
    <div className={className}>
      {typedCharacters.map((char, index) => {
        return (
          <Character
            key={`${char}-${index}`}
            actual={char}
            expected={words[index]}
          />
        );
      })}
      <Caret />
    </div>
  );
};

const Character = ({
  actual,
  expected,
}: {
  actual: string;
  expected: string;
}) => {
  const isCorrect = actual === expected;
  const isWhiteSpace = expected === ' ';

  return (
    <span
      className={cn({
        'text-red-500': !isCorrect && !isWhiteSpace,
        'text-primary-400': isCorrect && !isWhiteSpace,
        'bg-red-500/50': !isCorrect && isWhiteSpace,
      })}
    >
      {expected}
    </span>
  );
};
