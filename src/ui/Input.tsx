import { useEffect } from 'react';
import cn from 'classnames';
import { onErrorHandler } from '../utils/toasts';

type InputProps = {
  value: string;
  name: string;
  placeholder: string;
  type: string;
  label: string;
  error: boolean;
  onChange: (value: string) => void;
  errorText: string;
  onFocus: (value: string) => void;
  labelClassName?: string;
};

export const Input = ({
  value,
  name,
  placeholder,
  type,
  label,
  error,
  onChange,
  errorText,
  onFocus,
  labelClassName = '',
}: InputProps) => {
  useEffect(() => {
    if (error) {
      onErrorHandler(errorText);
    }
  }, [error, errorText]);

  return (
    <>
      <label
        className={cn(
          {
            'text-red-500': error,
            'text-gray-700': !error && !labelClassName,
          },
          'block text-sm font-bold mb-2',
          labelClassName
        )}
        htmlFor={name}
      >
        {label}
      </label>
      <div className='w-full'>
        <input
          className={cn(
            {
              'border-red-500': error,
            },
            'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          )}
          id={name}
          type={type}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => onFocus(name)}
          value={value}
        />
        {error && (
          <p className='text-red-500 text-xs italic pt-2'>{errorText}</p>
        )}
      </div>
    </>
  );
};
