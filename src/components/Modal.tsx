import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

const modalRootElement = document.getElementById('modal');

export const Modal = ({
  children,
  closeWindow,
}: {
  children: React.ReactNode;
  closeWindow: () => void;
}) => {
  const keydownHandler = useCallback(({ key, code }: KeyboardEvent) => {
    if (code === 'Escape') {
      closeWindow();
    }
  }, [closeWindow]);

  useEffect(() => {
    window.addEventListener('keydown', keydownHandler);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', keydownHandler);
      document.body.style.overflow = 'auto';
    };
  }, [keydownHandler]);

  if (modalRootElement) {
    return createPortal(
      <>
        <div
          onClick={closeWindow}
          className='fixed inset-0 cursor-pointer bg-black/40 z-10'
        />
        <div className='fixed z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center w-full'>
          {children}
        </div>
      </>,
      modalRootElement
    );
  }

  return null;
};
