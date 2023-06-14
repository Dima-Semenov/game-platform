import classNames from 'classnames';
import { IoArrowBack } from 'react-icons/io5';

type GoBackProps = {
  goBack: () => void;
  className?: string;
  classNameIcon?: string;
};

export const GoBack = ({
  goBack,
  className = '',
  classNameIcon = '',
}: GoBackProps) => (
  <div
    className={classNames(
      'p-1 absolute top-2/4 left-0 -translate-y-1/2 -translate-x-1',
      className
    )}
    onClick={goBack}
  >
    <IoArrowBack
      className={classNames(
        'w-6 h-6 text-blue-500 hover:text-blue-700 hover:scale-125 duration-300 cursor-pointer',
        classNameIcon
      )}
    />
  </div>
);
