import { useState, useCallback, useEffect } from 'react';
import {
  EMAIL_REGEXP,
  ERROR_TEXT_BY_EMAIL,
  ERROR_TEXT_BY_PASSWORD,
  TYPE_OF_LOG_IN,
} from '../../../constants/constants';
import { TypeOfLogIn } from '../../../constants/types';

type useInputsValueProps = {
  typeOfLogIn: TypeOfLogIn;
};

const useInputsValue = ({ typeOfLogIn }: useInputsValueProps) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isUserNameError, setIsUserNameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [emailErrorText, setEmailErrorText] = useState(
    ERROR_TEXT_BY_EMAIL.DEFAULT
  );
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [passwordErrorText, setPasswordErrorText] = useState(
    ERROR_TEXT_BY_PASSWORD.DEFAULT
  );

  const checkAreInputsIsValid = useCallback(() => {
    const isErrorUserName = userName.length < 4;
    const isErrorEmail = !EMAIL_REGEXP.test(email);
    const isErrorPassword = password.length < 6;
    setEmailErrorText(ERROR_TEXT_BY_EMAIL.DEFAULT);
    setPasswordErrorText(ERROR_TEXT_BY_PASSWORD.DEFAULT);

    if (typeOfLogIn === TYPE_OF_LOG_IN.FORGOT_PASSWORD) {
      setIsEmailError(isErrorEmail);
      return isErrorEmail;
    }

    if (typeOfLogIn === TYPE_OF_LOG_IN.LOG_IN) {
      setIsEmailError(isErrorEmail);
      setIsPasswordError(isErrorPassword);
      return isErrorEmail || isErrorPassword;
    }

    setIsUserNameError(isErrorUserName);
    setIsEmailError(isErrorEmail);
    setIsPasswordError(isErrorPassword);

    return isErrorUserName || isErrorEmail || isErrorPassword;
  }, [userName, email, password, typeOfLogIn]);

  const resetErrors = useCallback((name: string) => {
    if (name === 'username') {
      setIsUserNameError(false);
    } else if (name === 'email') {
      setIsEmailError(false);
    } else {
      setIsPasswordError(false);
    }
  }, []);

  useEffect(() => {
    setIsUserNameError(false);
    setIsEmailError(false);
    setIsPasswordError(false);
    setUserName('');
    setEmail('');
    setPassword('');
    setEmailErrorText(ERROR_TEXT_BY_EMAIL.DEFAULT);
    setPasswordErrorText(ERROR_TEXT_BY_PASSWORD.DEFAULT);
  }, [typeOfLogIn]);

  return {
    userName,
    email,
    password,
    setUserName,
    setEmail,
    setPassword,
    isUserNameError,
    isEmailError,
    emailErrorText,
    setIsUserNameError,
    setIsEmailError,
    setEmailErrorText,
    isPasswordError,
    passwordErrorText,
    setIsPasswordError,
    setPasswordErrorText,
    checkAreInputsIsValid,
    resetErrors,
  };
};

export default useInputsValue;
