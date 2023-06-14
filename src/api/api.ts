import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { dispatch } from '../store';
import { setLoading } from '../store/slice/loadingSlice';

const apiWrapper = async (callback: any) => {
  try {
    dispatch(setLoading({ loading: true }));
    const data = await callback();

    dispatch(setLoading({ loading: false }));
    return data;
  } catch (err: any) {
    dispatch(setLoading({ loading: false }));

    throw new Error(err.code);
  }
};

export const logInToAccoutn = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const auth = getAuth();

  return apiWrapper(() => signInWithEmailAndPassword(auth, email, password));
};

export const createUser = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const auth = getAuth();

  return apiWrapper(() => createUserWithEmailAndPassword(auth, email, password));
};

