import { motion } from 'framer-motion';
import { State } from '../hooks/useEngine';
import { formatPercentage } from '../utils/helpers';
import { Modal } from './Modal';
import { RestartButton } from './RestartButton';

export const Result = ({
  errors,
  accuracyPercentage,
  total,
  className,
  state,
  restart,
}: {
  state: State;
  errors: number;
  accuracyPercentage: number;
  total: number;
  className?: string;
  restart: () => void
}) => {
  const initial = { opacity: 0 };
  const animate = { opacity: 1 };
  const duration = { duration: 0.3 };

  if (state !== 'finish') {
    return null;
  }

  return (
    <Modal closeWindow={() => {}}>
      <div className='bg-slate-700 p-4 rounded'>
        <motion.ul
          className={`flex flex-col items-center text-primary-400 space-y-3 ${className}`}
        >
          <motion.li
            initial={initial}
            animate={animate}
            transition={{ ...duration, delay: 0 }}
            className='text-xl font-semibold'
          >
            Results:
          </motion.li>
          <motion.li
            initial={initial}
            animate={animate}
            transition={{ ...duration, delay: 0.5 }}
          >
            Accuracy: {formatPercentage(accuracyPercentage)}
          </motion.li>
          <motion.li
            initial={initial}
            animate={animate}
            transition={{ ...duration, delay: 1 }}
            className='text-red-500'
          >
            Errors: {errors}
          </motion.li>
          <motion.li
            initial={initial}
            animate={animate}
            transition={{ ...duration, delay: 1.5 }}
          >
            Typed: {total}
          </motion.li>
        </motion.ul>

        <RestartButton
          className='mx-auto mt-10 text-slate-500'
          onRestart={restart}
        />
        
      </div>
    </Modal>
  );
};
