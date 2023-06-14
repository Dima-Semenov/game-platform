import classNames from 'classnames';
import { useState, useEffect } from 'react';
import { v4 } from 'uuid';
import { Modal } from '../../../components/Modal';
import { addNewTodoToFirabase, updateTodoOnFirabase } from '../../../firabase';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { dispatch } from '../../../store';
import { addTodo, Todos, updateTodoById } from '../../../store/slice/todoSlice';
import { Button, Input } from '../../../ui';
import { getCurrentDate } from '../../../utils/helpers';
import { onSuccesHandler } from '../../../utils/toasts';

const SELECTED_VALUE = {
  ACTIVE: 'Active',
  COMPLETED: 'Completed',
};

const GET_CURRENT_VALUE = {
  [SELECTED_VALUE.ACTIVE]: false,
  [SELECTED_VALUE.COMPLETED]: true,
};

const TodoModal = ({
  closeModal,
  isEditMode = false,
  todo = null,
}: {
  closeModal: () => void;
  isEditMode?: boolean;
  todo?: Todos | null;
}) => {
  const [todoTitle, setTodoTitle] = useState('');
  const [isError, setIsError] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState('Active');
  const userId = useAppSelector((state) => state.user.id);
  const a = useAppSelector((state) => state.todo.objectWithIdAndKey);

  useEffect(() => {
    if (isEditMode && todo) {
      setTodoTitle(todo.title);
      setSelectedTodo(
        todo.completed ? SELECTED_VALUE.COMPLETED : SELECTED_VALUE.ACTIVE
      );
    }
  }, [isEditMode, todo]);

  const handleAddTodo = () => {
    const newTodo = {
      title: todoTitle,
      completed: GET_CURRENT_VALUE[selectedTodo],
      id: v4(),
      date: getCurrentDate(),
    };

    dispatch(addTodo(newTodo));

    if (userId) {
      addNewTodoToFirabase({
        userId,
        todo: newTodo,
      });
    }
  };

  const handleUpdateTodo = () => {
    if (todo) {
      const updatedTodo = {
        id: todo.id,
        title: todoTitle,
        date: getCurrentDate(),
        completed: GET_CURRENT_VALUE[selectedTodo],
      };
      dispatch(updateTodoById(updatedTodo));

      if (userId) {
        updateTodoOnFirabase({ userId, childKey: a[todo.id], updatedTodo });
      }
    }
  };

  const onClick = () => {
    const checkIsValidData = todoTitle.length > 3;

    if (checkIsValidData) {
      if (isEditMode) {
        handleUpdateTodo();
        onSuccesHandler('Todo was updated successfully');
      } else {
        handleAddTodo();
        onSuccesHandler('The todo was created successfully');
      }

      setTodoTitle('');
      closeModal();
    } else {
      setIsError(true);
    }
  };

  return (
    <Modal closeWindow={closeModal}>
      <div className='bg-slate-700 rounded-md p-3 py-5 max-w-md w-full'>
        <p className='text-3xl uppercase text-primary-400 font-bold pb-3 text-center'>
          {isEditMode ? 'Update task' : 'Add task'}
        </p>

        <Input
          value={todoTitle}
          name='task'
          placeholder='Add task'
          type='text'
          label='Title'
          error={isError}
          onChange={setTodoTitle}
          errorText='The length of the word must be more than 3 characters'
          onFocus={() => setIsError(false)}
          labelClassName='text-white'
        />

        <div className='pt-4'>
          <p className='text-sm font-bold mb-2 text-white'>Status</p>
          <div className='flex bg-slate-500/50 p-1 rounded-full w-max'>
            {['Active', 'Completed'].map((item) => (
              <div
                key={item}
                onClick={() => setSelectedTodo(item)}
                className={classNames(
                  {
                    'bg-black/60': item === selectedTodo,
                    'hover:bg-black/20': item !== selectedTodo,
                  },
                  'text-primary-400 p-2 px-4 rounded-full cursor-pointer'
                )}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className='pt-8 w-full flex gap-3'>
          <Button
            disabled={
              isError ||
              (todoTitle === todo?.title &&
                GET_CURRENT_VALUE[selectedTodo] === todo?.completed)
            }
            onClick={onClick}
          >
            {isEditMode ? 'Update task' : 'Add task'}
          </Button>
          <Button
            onClick={closeModal}
            className='!bg-red-500 !hover:bg-red-700'
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TodoModal;
