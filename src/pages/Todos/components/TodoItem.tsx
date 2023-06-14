import { useState } from 'react';
import TodoModal from './TodoModal';
import { MdDelete, MdEdit } from 'react-icons/md';
import { dispatch } from '../../../store';
import {
  deleteTodo,
  Todos,
  toggleStatus,
} from '../../../store/slice/todoSlice';
import cn from 'classnames';
import { ClarifyWindow } from '../../../components/ClarifyWindow';
import { useAppSelector } from '../../../hooks/useRedux';
import {
  removeTodoFromFirabase,
  updateTodoOnFirabase,
} from '../../../firabase';
import { getUserId } from '../../../store/selectors/userSelector';

const TodoItem = ({ todo }: { todo: Todos }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenClarifyModal, setIsOpenClarifyModal] = useState(false);
  const { id, completed, date, title } = todo;
  const userId = useAppSelector(getUserId);
  const a = useAppSelector((state) => state.todo.objectWithIdAndKey);

  const handleDeleteItem = () => {
    if (userId) {
      dispatch(deleteTodo(id));
      removeTodoFromFirabase({ userId, childKey: a[id] });
    }
  };

  const handleToggleStatus = () => {
    dispatch(toggleStatus(id));
    if (userId) {
      updateTodoOnFirabase({
        userId,
        childKey: a[id],
        updatedTodo: { ...todo, completed: !todo.completed },
      });
    }
  };

  return (
    <div className='rounded-md w-full flex justify-between gap-4 p-2 bg-slate-300'>
      <div className='flex gap-4 items-center'>
        <div className='flex items-center'>
          <input
            type='checkbox'
            checked={completed}
            onChange={handleToggleStatus}
            className='w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 cursor-pointer'
          />
        </div>
        <div>
          <p
            className={cn(
              {
                'line-through text-slate-500': completed,
                'text-slate-700': !completed,
              },
              'text-base font-bold'
            )}
          >
            {title}
          </p>
          <p className='text-xs'>{date}</p>
        </div>
      </div>

      <div className='flex gap-2 items-center'>
        <div
          onClick={() => setIsOpenClarifyModal(true)}
          className='p-2 rounded-md bg-slate-400 hover:bg-slate-500 cursor-pointer hover:text-red-800'
        >
          <MdDelete className='text-gray-800/70 w-5 h-5' />
        </div>
        <div
          onClick={() => setIsOpenModal(true)}
          className='p-2 rounded-md bg-slate-400 hover:bg-slate-500 cursor-pointer'
        >
          <MdEdit className='text-gray-800/70 w-5 h-5' />
        </div>
      </div>

      {isOpenModal && (
        <TodoModal
          closeModal={() => setIsOpenModal(false)}
          isEditMode
          todo={todo}
        />
      )}

      {isOpenClarifyModal && (
        <ClarifyWindow
          title='Are you sure you want to delete?'
          closeWindow={() => setIsOpenClarifyModal(false)}
          onSucces={handleDeleteItem}
        />
      )}
    </div>
  );
};

export default TodoItem;
