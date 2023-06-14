import cn from 'classnames';

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  transparent?: boolean;
};

const CLASS = {
  FOR_DISABLED: 'bg-slate-400 text-white cursor-not-allowed',
  FOR_TRANSPARENT: 'bg-transparent hover:bg-transparent text-blue-500',
  FOR_TRANSPARENT_DISABLED: 'text-slate-400 cursor-not-allowed',
  FOR_STANDART: 'bg-blue-500 hover:bg-blue-700 text-white',
  DEFAULT: 'font-bold py-2 px-4 rounded hover:scale-110 duration-300 outline-none',
};

export const Button = ({
  children,
  className = '',
  onClick,
  disabled = false,
  transparent = false,
}: ButtonProps) => {
  return (
    <button
      className={cn(
        {
          [`${CLASS.FOR_STANDART}`]: !disabled && !transparent,
          [`${CLASS.FOR_DISABLED}`]: disabled && !transparent,
          [`${CLASS.FOR_TRANSPARENT}`]: transparent,
          [`${CLASS.FOR_TRANSPARENT_DISABLED}`]: disabled && transparent,
        },
        CLASS.DEFAULT,
        className
      )}
      type='button'
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
