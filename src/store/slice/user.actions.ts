import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { type } from 'os';
import { onSuccesHandler } from '../../utils/toasts';
import { setLoading } from './loadingSlice';

type logInUserProps = {
  email: string;
  password: string;
};

export const logInUser = createAsyncThunk(
  'user/logInUser',
  async ({ email, password }: logInUserProps, { dispatch }) => {
    const auth = getAuth();
    dispatch(setLoading(true));

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      dispatch(setLoading(false));

      return {
        email: user.email,
        userName: user.displayName,
        id: user.uid,
      };
    } catch (err) {
      dispatch(setLoading(false));
      throw err;
    }
  }
);

type createAccountUserProps = {
  email: string;
  password: string;
  userName: string;
};

export const createAccountUser = createAsyncThunk(
  'user/createAccountUser',
  async (
    { email, password, userName }: createAccountUserProps,
    { dispatch }
  ) => {
    const auth = getAuth();
    dispatch(setLoading(true));

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: userName,
        });
      }

      dispatch(setLoading(false));

      return {
        email: user.email,
        userName: user.displayName,
        id: user.uid,
      };
    } catch (err) {
      dispatch(setLoading(false));
      throw err;
    }
  }
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async ({ email }: { email: string }, { dispatch }) => {
    const auth = getAuth();
    dispatch(setLoading(true));

    try {
      return await sendPasswordResetEmail(auth, email);
    } catch (err) {
      dispatch(setLoading(false));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  }
);
