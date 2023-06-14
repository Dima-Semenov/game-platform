import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { setKeyToStore } from '../../firabase';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { getUserId } from '../../store/selectors/userSelector';
import { getTodoByUserId } from '../../store/slice/todo.actions';
import {
  getSelectedTodosType,
  setSelectedTodosType,
} from '../../store/slice/todoSlice';
import { Button } from '../../ui';
import TodosList from './components/TodoList';
import TodoModal from './components/TodoModal';

const Todos = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const selectedValue = useAppSelector(getSelectedTodosType);
  const userId = useAppSelector(getUserId);
  const dispatch = useAppDispatch();


  useEffect(() => {
    if (userId) {
      dispatch(getTodoByUserId({ userId }));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (userId) {
      setKeyToStore({ userId });
    }
  }, [userId]);

  const closeModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  return (
    <section className='pt-8 max-w-2xl w-full'>
      <h2 className='text-4xl uppercase text-primary-400 font-bold text-center'>
        Todo List
      </h2>

      <div className='flex justify-between py-4'>
        <Button onClick={() => setIsOpenModal(true)}>Add Task</Button>

        {/* <Button onClick={() => {}}>component</Button> */}
        <div className='flex bg-slate-500/50 p-1 rounded-full w-max'>
          {['All', 'Active', 'Completed'].map((item) => (
            <div
              key={item}
              onClick={() => dispatch(setSelectedTodosType(item))}
              className={classNames(
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
      </div>

      <div className='bg-slate-700 p-4 rounded-md flex flex-col items-center gap-4'>
        <TodosList />
      </div>

      {isOpenModal && <TodoModal closeModal={closeModal} />}
    </section>
  );
};

export default Todos;
