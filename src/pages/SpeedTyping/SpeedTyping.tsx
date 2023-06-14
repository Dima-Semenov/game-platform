import cn from "classnames";
import { RestartButton } from "../../components/RestartButton";
import { Result } from "../../components/Result";
import { UserTyping } from "../../components/UserTyping";
import { LEVELS, TIME_INTERVAL } from "../../constants/constants";
import { Levels } from "../../constants/types";
import useEngine, { State } from "../../hooks/useEngine";
import { calculateAccuracyPercentage } from "../../utils/helpers";

const SpeedTyping = () => {
  const {
    state,
    words,
    timerLeft,
    typed,
    errors,
    totalTyped,
    restart,
    changeTimeInterval,
    selectedLevel,
    changeLevelWords,
  } = useEngine();

  return (
    <div className='flex flex-col justify-center mx-auto my-0'>
      <TimerContainer>
        <Block>
          <Title>Time: {timerLeft}</Title>
          <Title>Level: {selectedLevel}</Title>
        </Block>
        <Block className='items-end'>
          <Switcher
            state={state}
            data={TIME_INTERVAL}
            selectedValue={timerLeft}
            toggleHandler={(item) => {
              if (typeof item === 'number') {
                changeTimeInterval(item);
              }
            }}
          />

          <Switcher
            state={state}
            data={LEVELS}
            selectedValue={selectedLevel}
            toggleHandler={(item) => {
              if (typeof item === 'string') {
                changeLevelWords(item);
              }
            }}
          />
        </Block>
      </TimerContainer>
      <WordsContainer>
        <GeneratedWords words={words} />
        <UserTyping
          className='absolute inset-0'
          words={words}
          userInput={typed}
        />
      </WordsContainer>
      <RestartButton
        className='mx-auto mt-10 text-slate-500'
        onRestart={restart}
      />
      <Result
        state={state}
        className='mt-10'
        errors={errors}
        accuracyPercentage={calculateAccuracyPercentage(errors, totalTyped)}
        total={totalTyped}
        restart={restart}
      />
    </div>
  );
};

const WordsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='relative max-w-xl mt-3 text-3xl leading-relaxed break-all'>
      {children}
    </div>
  );
};

const TimerContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className='flex items-end justify-between'>{children}</div>;
};

const Switcher = ({
  state,
  data,
  selectedValue,
  toggleHandler,
}: {
  state: State;
  data: number[] | Levels[];
  selectedValue: number | string;
  toggleHandler: (arg: number | Levels) => void;
}) => {
  if (state !== 'start') {
    return null;
  }

  const handleClick = (item: number | Levels) => {
    if (selectedValue !== item) {
      toggleHandler(item);
    }
  };

  return (
    <div className='flex bg-slate-500/50 p-1 rounded-full w-max'>
      {data.map((item) => (
        <div
          key={item}
          onClick={() => handleClick(item)}
          className={cn(
            {
              'bg-black/60': item === selectedValue,
              'hover:bg-black/20': item !== selectedValue,
            },
            'text-primary-400 p-2 px-4 rounded-full cursor-pointer'
          )}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

const GeneratedWords = ({ words }: { words: string }) => {
  return <div className='text-slate-500'>{words}</div>;
};

const Block = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`flex flex-col gap-1 ${className}`}>{children}</div>;
};

const Title = ({ children }: { children: React.ReactNode }) => {
  return <h2 className='text-primary-400 font-medium'>{children}</h2>;
};


export default SpeedTyping;
