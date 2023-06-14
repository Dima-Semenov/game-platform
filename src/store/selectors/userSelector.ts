import { RootState } from '..';

export const isUserLogIn = (state: RootState) => Boolean(state.user.id);
export const getUser = (state: RootState) => state.user;
export const getUserId = (state: RootState) => state.user.id;
