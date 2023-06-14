import { useEffect, useMemo, useState } from 'react';
import { getSocket, messageObserver } from '../../../api/socket';
import { TYPE_OF_EVENTS } from '../TicTac';
import classNames from 'classnames';
import { Button } from '../../../ui';
import { Modal } from '../../../components/Modal';

const INITIAL_STATE_BOARD = Array(9).fill(null);
const PLAYERS = {
  X: 'X',
  O: 'O',
};

const calculateWinner = (squares: any) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  const isDraw = squares.filter(Boolean).length === 9;

  if (isDraw) {
    return 'Draw';
  } else {
    return null;
  }
};

const Board = ({ youRole }: any) => {
  const [stateBoard, setStateBoard] = useState(INITIAL_STATE_BOARD);
  const [activePlayer, setActivePlayer] = useState(PLAYERS.X);
  const [isPlayAgain, setIsPlayAgain] = useState(false);
  const [isYouWantPlayAgain, setIsYouWantPlayAgain] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [countOfWin, setCountOfWin]: any = useState({ X: 0, O: 0, Draw: 0 });
  const socket = getSocket();

  const updateGame = (message: any) => {
    if (message.event === TYPE_OF_EVENTS.UPDATE_GAME) {
      setStateBoard(message.stateBoard);
      setActivePlayer(message.activePlayer);
    }
  };

  const playAgain = (message: any) => {
    console.log('message: ', message);
    if (message.event === TYPE_OF_EVENTS.PLAY_AGAIN) {
      setIsYouWantPlayAgain(message.isYouInitiator);
      if (!message.isYouInitiator) {
        setOpenModal(true);
      }
    }
  };

  const startPlayAgain = (message: any) => {
    console.log('message: ', message);
    if (message.event === 'START_PLAY_AGAIN') {
      setIsPlayAgain(false);
      setOpenModal(false);
      setStateBoard(INITIAL_STATE_BOARD);
    }
  };

  useEffect(() => {
    messageObserver.subscribe(updateGame);
    messageObserver.subscribe(playAgain);
    messageObserver.subscribe(startPlayAgain);

    return () => {
      messageObserver.unsubscribe(updateGame);
      messageObserver.unsubscribe(playAgain);
      messageObserver.unsubscribe(startPlayAgain);
    };
  }, []);

  const handleClick = (index: number) => {
    if (
      calculateWinner(stateBoard) ||
      stateBoard[index] ||
      activePlayer !== youRole
    ) {
      return;
    }

    const newBoard = [...stateBoard];
    newBoard[index] = activePlayer;

    socket.send(
      JSON.stringify({
        event: 'UPDATE_GAME',
        activePlayer: activePlayer === PLAYERS.X ? PLAYERS.O : PLAYERS.X,
        stateBoard: newBoard,
      })
    );
  };

  const isSomebodyWin = useMemo(() => {
    const winner = calculateWinner(stateBoard);
    console.log('winner: ', winner);
    if (typeof countOfWin[winner] === 'number') {
      setCountOfWin((prev: any) => ({ ...prev, [winner]: prev[winner] + 1 }));
    }

    return winner;
  }, [stateBoard]);

  console.log('countOfWin', countOfWin);

  if (isPlayAgain) {
    return <div>Wait for your opponent to accept the challenge</div>;
  }

  if (isSomebodyWin) {
    return (
      <div className='flex flex-col justify-center items-center gap-4'>
        <h3 className='text-primary-500 text-5xl pb-8'>
          Player {isSomebodyWin} won
        </h3>

        <div className='flex gap-6'>
          <Button
            onClick={() => {
              setStateBoard(INITIAL_STATE_BOARD);
              setIsPlayAgain(true);
              socket.send(
                JSON.stringify({
                  event: 'PLAY_AGAIN',
                })
              );
            }}
          >
            Play again
          </Button>
          <Button
            className='!bg-red-500 !hover:bg-red-700'
            onClick={() => {
              socket.send(
                JSON.stringify({
                  event: 'EXIT_GAME',
                })
              );
            }}
          >
            Exit
          </Button>
        </div>

        {openModal && (
          <Modal closeWindow={() => {}}>
            <div className='bg-slate-700 rounded-md p-3 py-5 max-w-md w-full'>
              <h3>You are offered to play again</h3>
              <h3>Do you agree?</h3>
              <Button
                onClick={() =>
                  socket.send(
                    JSON.stringify({
                      event: 'START_PLAY_AGAIN',
                    })
                  )
                }
              >
                Yes
              </Button>
              <Button
                className='!bg-red-500 !hover:bg-red-700'
                onClick={() =>
                  socket.send(
                    JSON.stringify({
                      event: 'EXIT_GAME',
                    })
                  )
                }
              >
                No
              </Button>
            </div>
          </Modal>
        )}
      </div>
    );
  }

  console.log('activePlayer !== youRole', activePlayer !== youRole);
  console.log('activePlayer: ', activePlayer);
  console.log('youRole: ', youRole);

  return (
    <div className='flex flex-col justify-center items-center gap-10'>
      <div>
        <p className='text-white text-4xl'>
          Now is order:{' '}
          <span className='text-primary-500 text-5xl'>{activePlayer}</span>
        </p>
        <p className='text-white text-3xl'>
          You play as: <span className='text-primary-500'>{youRole}</span>
        </p>
      </div>

      <div>
        <div className='flex'>
          <Square
            isNotAllowed={activePlayer !== youRole}
            value={stateBoard[0]}
            onSquareClick={() => handleClick(0)}
          />
          <Square
            isNotAllowed={activePlayer !== youRole}
            value={stateBoard[1]}
            onSquareClick={() => handleClick(1)}
          />
          <Square
            isNotAllowed={activePlayer !== youRole}
            value={stateBoard[2]}
            onSquareClick={() => handleClick(2)}
          />
        </div>
        <div className='flex'>
          <Square
            isNotAllowed={activePlayer !== youRole}
            value={stateBoard[3]}
            onSquareClick={() => handleClick(3)}
          />
          <Square
            isNotAllowed={activePlayer !== youRole}
            value={stateBoard[4]}
            onSquareClick={() => handleClick(4)}
          />
          <Square
            isNotAllowed={activePlayer !== youRole}
            value={stateBoard[5]}
            onSquareClick={() => handleClick(5)}
          />
        </div>
        <div className='flex'>
          <Square
            isNotAllowed={activePlayer !== youRole}
            value={stateBoard[6]}
            onSquareClick={() => handleClick(6)}
          />
          <Square
            isNotAllowed={activePlayer !== youRole}
            value={stateBoard[7]}
            onSquareClick={() => handleClick(7)}
          />
          <Square
            isNotAllowed={activePlayer !== youRole}
            value={stateBoard[8]}
            onSquareClick={() => handleClick(8)}
          />
        </div>
      </div>

      <div className='text-white text-3xl'>
        X win: {countOfWin.X}
        <br />
        O win: {countOfWin.O}
        <br />
        Draw: {countOfWin.Draw}
      </div>
    </div>
  );
};

export default Board;

const Square = ({
  value,
  onSquareClick,
  isNotAllowed,
}: {
  value: any;
  onSquareClick: any;
  isNotAllowed: boolean;
}) => {
  return (
    <button
      className={classNames(
        {
          'cursor-not-allowed': isNotAllowed,
        },
        'w-28 h-28 border-2 border-white text-white text-6xl'
      )}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
};
