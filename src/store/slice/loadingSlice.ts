import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

const initialState = {
  loading: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = loadingSlice.actions;

export const getLoadingValue = (state: RootState) => state.loading.loading;

export default loadingSlice.reducer;
