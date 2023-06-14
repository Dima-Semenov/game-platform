import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
  update,
} from 'firebase/database';
import { dispatch } from './store';
import { setObjectWithIdAndKey } from './store/slice/todoSlice';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

export const addNewTodoToFirabase = ({
  userId,
  todo,
}: {
  userId: string;
  todo: any;
}) => {
  const postListRef = ref(db, `/user/${userId}/todo`);
  const newPostRef = push(postListRef);
  set(newPostRef, todo);
};

export const removeTodoFromFirabase = ({
  userId,
  childKey,
}: {
  userId: string;
  childKey: string;
}) => remove(ref(db, `/user/${userId}/todo/${childKey}`));

export const setKeyToStore = ({ userId }: { userId: string }) => {
  onValue(ref(db, `/user/${userId}/todo`), (snapshot) => {
    const objectWithIdAndKey: { [key: string]: string } = {};

    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childDataId = childSnapshot.val().id;

      if (typeof childKey === 'string') {
        objectWithIdAndKey[childDataId] = childKey;
      }
    });

    dispatch(setObjectWithIdAndKey(objectWithIdAndKey));
  });
};

export const updateTodoOnFirabase = ({
  userId,
  childKey,
  updatedTodo,
}: {
  userId: string;
  childKey: string;
  updatedTodo: any;
}) => {
  update(ref(db, `/user/${userId}/todo/${childKey}`), updatedTodo);
};
