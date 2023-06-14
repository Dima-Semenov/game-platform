import { useEffect, useState } from 'react';
import { Modal } from '../../../components/Modal';
import { Button, Input } from '../../../ui';
import { getSocket, messageObserver } from '../../../api/socket';

export const TYPE_OF_ERROR = {
  ROOM_EXIST: 'ROOM_EXIST',
  ROOM_DO_NOT_EXIST: 'ROOM_DO_NOT_EXIST',
  ROOM_IS_FULL: 'ROOM_IS_FULL',
};

type CreateOrJoinModalArgs = {
  closeWindow: () => void;
  isCreateBoard: boolean;
};

const INITIAL_ERROR = 'The length of the ID must be more than 3 characters';

const CreateOrJoinModal = ({
  closeWindow,
  isCreateBoard,
}: CreateOrJoinModalArgs) => {
  const [boardID, setBoardID] = useState('');
  const [boardIdError, setBoardIdError] = useState(false);
  const [boardIdErrorMessage, setBoardIdErrorMessage] = useState(INITIAL_ERROR);
  const socket = getSocket();
  console.log('socket: ', socket);

  const errorHandler = (message: any) => {
    if (message?.error) {
      setBoardIdError(true);
      setBoardIdErrorMessage(message.error);
    }
  };

  useEffect(() => {
    messageObserver.subscribe(errorHandler);

    return () => {
      messageObserver.unsubscribe(errorHandler);
    };
  });

  const handleCloseWindow = () => {
    closeWindow();
    setBoardID('');
    setBoardIdError(false);
    setBoardIdErrorMessage(INITIAL_ERROR);
  };

  const handleBoardClick = () => {
    if (boardID.length < 3) {
      setBoardIdError(true);
      return;
    }

    if (isCreateBoard) {
      socket.send(JSON.stringify({ event: 'CREATE_ROOM_ID', roomID: boardID }));
    } else {
      socket.send(JSON.stringify({ event: 'JOIN_TO_ROOM', roomID: boardID }));
    }
  };

  return (
    <Modal closeWindow={handleCloseWindow}>
      <div className='bg-slate-700 rounded-md p-3 py-5 max-w-md w-full'>
        <h3 className='text-primary-500 text-3xl font-extrabold text-center'>
          {isCreateBoard ? 'Create board ID' : 'Goin to board'}
        </h3>

        <div className='py-6 pb-10'>
          <Input
            value={boardID}
            name='boardID'
            placeholder={isCreateBoard ? 'Create board ID' : 'Enter ID to join'}
            type='text'
            label={isCreateBoard ? 'Create board' : 'Goin to board'}
            error={boardIdError}
            onChange={setBoardID}
            errorText={boardIdErrorMessage}
            onFocus={() => setBoardIdError(false)}
            labelClassName='text-white'
          />
        </div>

        <div className='flex justify-center gap-6'>
          <Button onClick={handleBoardClick}>
            {isCreateBoard ? 'Create board' : 'Goin to board'}
          </Button>
          <Button
            onClick={handleCloseWindow}
            className='!bg-red-500 !hover:bg-red-700'
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateOrJoinModal;
