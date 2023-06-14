import { createAsyncThunk } from '@reduxjs/toolkit';
import { child, get, ref } from 'firebase/database';
import { db } from '../../firabase';
import { setLoading } from './loadingSlice';

export const getTodoByUserId = createAsyncThunk(
  'todo/getTodoByUserId',
  async ({ userId }: { userId: string }, { dispatch }) => {
    dispatch(setLoading(true));

    try {
      const data = await get(child(ref(db), `/user/${userId}/todo`));

      if (data.exists()) {
        const todos = Object.values(data.val());

        return todos;
      }

      return [];
    } catch (error) {
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);
