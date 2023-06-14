import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { getTodoByUserId } from './todo.actions';

export type Todos = {
  title: string;
  id: string;
  completed: boolean;
  date: string;
};

type InitialState = {
  todos: Todos[];
  selectedTodosType: string;
  objectWithIdAndKey: { [key: string]: string };
};

const initialState: InitialState = {
  todos: [],
  selectedTodosType: 'All',
  objectWithIdAndKey: {},
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action) {
      state.todos.push(action.payload);
    },
    toggleStatus(state, action) {
      const currentTodo = state.todos.find(({ id }) => id === action.payload);

      if (currentTodo) {
        currentTodo.completed = !currentTodo?.completed;
      }
    },
    deleteTodo(state, action) {
      state.todos = state.todos.filter(({ id }) => id !== action.payload);
    },
    updateTodoById(state, action) {
      const currentTodo = state.todos.find(
        ({ id }) => id === action.payload.id
      );

      if (currentTodo) {
        currentTodo.date = action.payload.date;
        currentTodo.title = action.payload.title;
        currentTodo.completed = action.payload.completed;
      }
    },
    setSelectedTodosType(state, action) {
      state.selectedTodosType = action.payload;
    },
    setObjectWithIdAndKey(state, action) {
      state.objectWithIdAndKey = action.payload;
    }
  },
  extraReducers: {
    [getTodoByUserId.fulfilled.type]: (state, action) => {
      state.todos = action.payload;
    },
  },
});

export const {
  addTodo,
  toggleStatus,
  deleteTodo,
  setSelectedTodosType,
  updateTodoById,
  setObjectWithIdAndKey,
} = todoSlice.actions;

export const getSelectedTodosType = (state: RootState) =>
  state.todo.selectedTodosType;

export const getTodoList = (state: RootState) => state.todo.todos;

export const getTodos = createSelector(
  [getSelectedTodosType, getTodoList],
  (type, todos) => {
    if (type === 'Completed') {
      return todos.filter(({ completed }) => Boolean(completed));
    }

    if (type === 'Active') {
      return todos.filter(({ completed }) => !Boolean(completed));
    }

    return todos;
  }
);

export default todoSlice.reducer;
