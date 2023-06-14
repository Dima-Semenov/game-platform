import { Navigate } from 'react-router-dom';
import { PAGE_PATH } from './Router';

type ProtectedRouteProps = {
  isAllowed: boolean;
  redirectPath?: string;
  component: React.FC;
};

const ProtectedRoute = ({
  isAllowed,
  redirectPath = PAGE_PATH.LOGIN,
  component: Component,
}: ProtectedRouteProps) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Component />;
};

export default ProtectedRoute;
