import { useEffect, useState } from 'react';
import { Button } from '../../ui';
import CreateOrJoinModal from './components/CreateOrJoinModal';
import Board from './components/Board';
import { messageObserver, setupSocket } from '../../api/socket';
import { onErrorHandler } from '../../utils/toasts';

export const TYPE_OF_EVENTS = {
  CREATE_ROOM_ID: 'CREATE_ROOM_ID',
  JOIN_TO_ROOM: 'JOIN_TO_ROOM',
  START_GAME: 'START_GAME',
  UPDATE_GAME: 'UPDATE_GAME',
  PLAY_AGAIN: 'PLAY_AGAIN',
  EXIT_GAME: 'EXIT_GAME',
  DISCONNECT_OPPONENT: 'DISCONNECT_OPPONENT',
};

const TicTac = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isCreateBoard, setIsCreateBoard] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isCanPlay, setIsCanPlay] = useState(false);
  const [youRole, setYouRole] = useState(null);
  const [roomID, setRoomID] = useState(null);

  const closeWindow = () => {
    setIsOpenModal(false);
    setIsCreateBoard(false);
  };

  const socketFunction = (message: any) => {
    if (message.event === TYPE_OF_EVENTS.CREATE_ROOM_ID) {
      setIsWaiting(true);
      setYouRole(message.yourRole);
      setRoomID(message.roomId);
    }

    if (message.event === TYPE_OF_EVENTS.JOIN_TO_ROOM) {
      setYouRole(message.yourRole);
    }

    if (message.event === TYPE_OF_EVENTS.START_GAME) {
      setIsWaiting(false);
      setIsCanPlay(true);
    }

    if (message.event === TYPE_OF_EVENTS.DISCONNECT_OPPONENT) {
      setIsWaiting(false);
      setIsCanPlay(false);
      setIsOpenModal(false);
      setIsCreateBoard(false);
      setYouRole(null);
    }

    if (message.event === TYPE_OF_EVENTS.EXIT_GAME) {
      setIsWaiting(false);
      setIsCanPlay(false);
      setIsOpenModal(false);
      setIsCreateBoard(false);
      setYouRole(null);
      onErrorHandler(message.isYouExit ? 'You have left the board' : 'Your opponent has left the board');
    }
  };

  useEffect(() => {
    setupSocket();
    messageObserver.subscribe(socketFunction);

    return () => {
      messageObserver.unsubscribe(socketFunction);
    };
  }, []);

  if (isWaiting) {
    return (
      <div className='flex items-center flex-col justify-center'>
        <h3 className='text-primary-500 text-4xl font-extrabold pb-4'>
          We are waiting for the opponent to connect to you
        </h3>
        <p className='text-white text-xl'>
          The ID of this room is:{' '}
          <span className='text-primary-500 text-3xl font-extrabold pb-4'>
            {roomID}
          </span>
        </p>
      </div>
    );
  }

  if (isCanPlay) {
    return (
      <Board youRole={youRole} />
    );
  }

  return (
    <div className='flex items-center flex-col justify-center'>
      <h1 className='text-primary-500 text-6xl font-extrabold pb-4'>
        This is a tic-tac-toe game
      </h1>
      <p className='text-white text-xl'>
        You can create a new board or join an existing board
      </p>

      <div className='flex gap-12 w-full pt-20'>
        <Button
          onClick={() => {
            setIsOpenModal(true);
            setIsCreateBoard(true);
          }}
          className='w-full'
        >
          Create board
        </Button>
        <Button onClick={() => setIsOpenModal(true)} className='w-full'>
          Join to board
        </Button>
      </div>

      {isOpenModal && (
        <CreateOrJoinModal
          closeWindow={closeWindow}
          isCreateBoard={isCreateBoard}
        />
      )}
    </div>
  );
};

export default TicTac;
