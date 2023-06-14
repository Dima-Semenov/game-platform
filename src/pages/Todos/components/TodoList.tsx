import { useAppSelector } from '../../../hooks/useRedux';
import { getTodos } from '../../../store/slice/todoSlice';
import EmptyList from './EmptyList';
import TodoItem from './TodoItem';

const TodosList = () => {
  const todos = useAppSelector(getTodos);

  if (!todos.length) {
    return <EmptyList />;
  }

  return (
    <>
      {todos.map((todo) => (
        <TodoItem {...todo} key={todo.id} todo={todo} />
      ))}
    </>
  );
};

export default TodosList;
