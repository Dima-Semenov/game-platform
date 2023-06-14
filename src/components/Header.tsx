import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { PAGE_PATH } from '../router/Router';
import { getUser, isUserLogIn } from '../store/selectors/userSelector';
import { removeUser } from '../store/slice/userSlice';
import { Button } from '../ui';
import { ClarifyWindow } from './ClarifyWindow';
import { GoBack } from './GoBack';
import { Modal } from './Modal';
import { MdOutlineManageAccounts } from 'react-icons/md';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const isLogInUser = useAppSelector(isUserLogIn);
  const user = useAppSelector(getUser);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  if (!isLogInUser) {
    return null;
  }

  return (
    <header className='fixed top-0 left-0 p-3 w-full bg-slate-700 flex justify-end'>
      {location.pathname !== PAGE_PATH.HOME && (
        <GoBack
          goBack={() => navigate(-1)}
          className='left-4'
          classNameIcon='w-8 h-8 text-white hover:text-white'
        />
      )}
      <div className='flex items-center gap-2'>
        {/* <div className='w-10 h-10 rounded-full bg-amber-100' onClick={() => navigate('/profile')}></div> */}
        <p className='text-sm text-primary-400'>Hello, {user.userName}</p>
        <div
          onClick={() => navigate('/profile')}
          className='border-2 border-primary-400 rounded-full flex justify-center items-center p-1 hover:scale-110 duration-300 hover:text-primary-500'
        >
          <MdOutlineManageAccounts className='w-7 h-7 text-primary-400 cursor-pointer ' />
        </div>
        <Button
          onClick={toggleModal}
          className='text-sm text-primary-500'
          transparent
        >
          Log out
        </Button>

        {isOpen && (
          <ClarifyWindow
            title='Do you really want to log out?'
            closeWindow={toggleModal}
            onSucces={() => {
              dispatch(removeUser());
              toggleModal();
            }}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
