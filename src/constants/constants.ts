import { Levels, TypeOfLogIn } from './types';

export const TIME_INTERVAL = [15, 30, 60];
export const LEVELS: Levels[] = ['Easy', 'Medium', 'Hard'];

export const EMAIL_REGEXP =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
export const TYPE_OF_LOG_IN = {
  LOG_IN: 'Log In' as TypeOfLogIn,
  CREATE_ACCOUNT: 'Create an account' as TypeOfLogIn,
  FORGOT_PASSWORD: 'Forgot password' as TypeOfLogIn,
};

export const ERROR_TEXT_BY_EMAIL = {
  DEFAULT: 'The email is incorrect.',
  NOT_EXIST: 'User with this email does not exist.',
  USER_EXIST: 'A user with this email address already exists',
};

export const ERROR_TEXT_BY_PASSWORD = {
  INCORRECT: 'You have entered an incorrect password!',
  DEFAULT: 'The password is incorrect. Must be more than 5 characters.',
};
