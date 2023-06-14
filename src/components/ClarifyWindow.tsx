import { Button } from '../ui';
import { Modal } from './Modal';

type ClarifyWindowProps = {
  closeWindow: () => void;
  onSucces: () => void;
  title: string;
};

export const ClarifyWindow = ({
  closeWindow,
  onSucces,
  title,
}: ClarifyWindowProps) => (
  <Modal closeWindow={closeWindow}>
    <div className='bg-slate-700 p-4 rounded'>
      <h3 className='text-primary-400 font-medium text-xl'>{title}</h3>
      <div className='flex justify-center pt-6 gap-8'>
        <Button onClick={onSucces} className='!bg-red-500 !hover:bg-red-700'>
          Yes
        </Button>
        <Button onClick={closeWindow}>No</Button>
      </div>
    </div>
  </Modal>
);
