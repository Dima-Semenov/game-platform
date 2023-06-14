import { useState, useCallback } from 'react';
import { SwitcherLogIn } from './SwitcherLogIn';
import {
  ERROR_TEXT_BY_EMAIL,
  ERROR_TEXT_BY_PASSWORD,
  TYPE_OF_LOG_IN,
} from '../../../constants/constants';
import { TypeOfLogIn } from '../../../constants/types';
import { Button, Input } from '../../../ui';
import { onErrorHandler, onSuccesHandler } from '../../../utils/toasts';
import { useAppDispatch } from '../../../hooks/useRedux';
import { GoBack } from '../../../components/GoBack';
import useInputsValue from '../hooks/useInputsValue';
import {
  createAccountUser,
  logInUser,
  resetPassword as resetPasswordAction,
} from '../../../store/slice/user.actions';

const Form = () => {
  const [typeOfLogIn, setTypeOfLogIn] = useState<TypeOfLogIn>(null);
  const {
    userName,
    email,
    password,
    setUserName,
    setEmail,
    setPassword,
    isUserNameError,
    isEmailError,
    emailErrorText,
    setIsEmailError,
    setEmailErrorText,
    isPasswordError,
    passwordErrorText,
    setIsPasswordError,
    setPasswordErrorText,
    checkAreInputsIsValid,
    resetErrors,
  } = useInputsValue({ typeOfLogIn });
  const dispatch = useAppDispatch();

  const changeTypeOfLogIn = useCallback((type: TypeOfLogIn) => {
    setTypeOfLogIn(type);
  }, []);

  const goBack = useCallback(() => {
    if (typeOfLogIn === TYPE_OF_LOG_IN.FORGOT_PASSWORD) {
      setTypeOfLogIn(TYPE_OF_LOG_IN.LOG_IN);
    } else {
      setTypeOfLogIn(null);
    }
  }, [typeOfLogIn]);

  const onErrorHandler2 = (errorCode: string) => {
    if (errorCode === 'auth/user-not-found') {
      setIsEmailError(true);
      setEmailErrorText(ERROR_TEXT_BY_EMAIL.NOT_EXIST);
      return;
    }

    if (errorCode === 'auth/wrong-password') {
      setIsPasswordError(true);
      setPasswordErrorText(ERROR_TEXT_BY_PASSWORD.INCORRECT);
      return;
    }

    if (errorCode === 'auth/email-already-in-use') {
      setIsEmailError(true);
      setEmailErrorText(ERROR_TEXT_BY_EMAIL.USER_EXIST);
      return;
    }

    if (errorCode === 'auth/user-not-found') {
      setIsEmailError(true);
      setEmailErrorText(ERROR_TEXT_BY_EMAIL.NOT_EXIST);
      return;
    }

    onErrorHandler('Unexpected error. Please try again later');
  };

  const handleLogIn = () => {
    const isCorrectData = !checkAreInputsIsValid();

    if (isCorrectData) {
      dispatch(logInUser({ email, password }))
        .unwrap()
        .then(() => {
          onSuccesHandler('You have successfully log In into your account!');
        })
        .catch((error) => {
          onErrorHandler2(error.code);
        });
    }
  };

  const createAccount = () => {
    const isCorrectData = !checkAreInputsIsValid();

    if (isCorrectData) {
      dispatch(createAccountUser({ email, password, userName }))
        .unwrap()
        .then(() => {
          onSuccesHandler('You have successfully created your account!');
        })
        .catch((error) => {
          onErrorHandler2(error.code);
        });
    }
  };

  const resetPassword = () => {
    const isCorrectData = !checkAreInputsIsValid();

    if (isCorrectData) {
      dispatch(resetPasswordAction({ email }))
        .unwrap()
        .then(() => {
          onSuccesHandler(
            'An email has been sent to your email to reset your password. Please check your mail)'
          );
          setTypeOfLogIn(null);
        })
        .catch((error) => {
          onErrorHandler2(error.code);
        });
    }
  };

  const getActualButtons = () => {
    switch (typeOfLogIn) {
      case TYPE_OF_LOG_IN.CREATE_ACCOUNT: {
        return (
          <Button
            className='mx-auto'
            onClick={createAccount}
            disabled={isUserNameError || isEmailError || isPasswordError}
          >
            Create
          </Button>
        );
      }
      case TYPE_OF_LOG_IN.FORGOT_PASSWORD: {
        return (
          <Button
            className='mx-auto'
            onClick={resetPassword}
            disabled={isEmailError}
          >
            Reset
          </Button>
        );
      }
      default: {
        return (
          <>
            <Button
              onClick={handleLogIn}
              disabled={isEmailError || isPasswordError}
            >
              LOG IN
            </Button>
            <Button
              onClick={() => changeTypeOfLogIn(TYPE_OF_LOG_IN.FORGOT_PASSWORD)}
              className='inline-block align-baseline text-sm text-blue-500 hover:text-blue-800'
              transparent
            >
              Forgot Password?
            </Button>
          </>
        );
      }
    }
  };

  const getActualInputs = () => (
    <>
      {typeOfLogIn === TYPE_OF_LOG_IN.CREATE_ACCOUNT && (
        <div className='mb-4'>
          <Input
            value={userName}
            name='username'
            placeholder='Username'
            type='text'
            label='Username'
            error={isUserNameError}
            onChange={setUserName}
            errorText='Username is incorrect. Must be more than 3 characters'
            onFocus={resetErrors}
          />
        </div>
      )}
      <div className='mb-4'>
        <Input
          value={email}
          name='email'
          placeholder='Email'
          type='email'
          label='Email'
          error={isEmailError}
          onChange={setEmail}
          errorText={emailErrorText}
          onFocus={resetErrors}
        />
      </div>
      {typeOfLogIn !== TYPE_OF_LOG_IN.FORGOT_PASSWORD && (
        <div className='mb-6'>
          <Input
            value={password}
            name='password'
            placeholder='Password'
            type='password'
            label='Password'
            error={isPasswordError}
            onChange={setPassword}
            errorText={passwordErrorText}
            onFocus={resetErrors}
          />
        </div>
      )}
    </>
  );

  return (
    <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
      {typeOfLogIn ? (
        <>
          <div className='mb-4 flex justify-center relative py-1'>
            <GoBack goBack={goBack} />
            <p className='text-gray-700 font-bold text-xl'>{typeOfLogIn}</p>
          </div>
          {getActualInputs()}
          <div className='flex items-center justify-between'>
            {getActualButtons()}
          </div>
        </>
      ) : (
        <SwitcherLogIn changeTypeOfLogIn={changeTypeOfLogIn} />
      )}
    </form>
  );
};

export default Form;
