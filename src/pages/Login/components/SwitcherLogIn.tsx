import { TYPE_OF_LOG_IN } from '../../../constants/constants';
import { TypeOfLogIn } from '../../../constants/types';
import { Button } from '../../../ui';

export const SwitcherLogIn = ({
  changeTypeOfLogIn,
}: {
  changeTypeOfLogIn: (type: TypeOfLogIn) => void;
}) => (
  <div className='flex flex-col gap-6'>
    <Button
      className='uppercase'
      onClick={() => changeTypeOfLogIn(TYPE_OF_LOG_IN.LOG_IN)}
    >
      LOG IN
    </Button>
    <Button
      className='uppercase'
      onClick={() => changeTypeOfLogIn(TYPE_OF_LOG_IN.CREATE_ACCOUNT)}
    >
      Create an account
    </Button>
  </div>
);
