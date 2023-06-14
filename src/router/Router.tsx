import { lazy, Suspense } from 'react';
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';
import Header from '../components/Header';
import { useAppSelector } from '../hooks/useRedux';
import { Loading } from '../pages';
import { isUserLogIn } from '../store/selectors/userSelector';
import ProtectedRoute from './ProtectedRoute';

const Home = lazy(() =>
  import('../pages').then(({ Home }) => ({ default: Home }))
);
const Login = lazy(() =>
  import('../pages').then(({ Login }) => ({ default: Login }))
);
const SpeedTyping = lazy(() =>
  import('../pages').then(({ SpeedTyping }) => ({ default: SpeedTyping }))
);
const TicTac = lazy(() =>
  import('../pages').then(({ TicTac }) => ({ default: TicTac }))
);
const Todos = lazy(() =>
  import('../pages').then(({ Todos }) => ({ default: Todos }))
);
const Profile = lazy(() =>
  import('../pages').then(({ Profile }) => ({ default: Profile }))
);

export const PAGE_PATH = {
  HOME: '/',
  LOGIN: '/login',
  TODO_LIST: '/todo-list',
  SPEED_TYPING: '/speed-typing',
  TIC_TAC: '/tic-tac',
  PROFILE: '/profile',
  ALL: '*',
};

const Router = () => {
  const isLoginUser = useAppSelector(isUserLogIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={PAGE_PATH.HOME} element={<HeaderWrapper />}>
          <Route
            path={PAGE_PATH.HOME}
            element={
              <ProtectedRoute isAllowed={isLoginUser} component={Home} />
            }
          />
          <Route
            path={PAGE_PATH.LOGIN}
            element={
              <ProtectedRoute
                isAllowed={!isLoginUser}
                component={Login}
                redirectPath={PAGE_PATH.HOME}
              />
            }
          />
          <Route
            path={PAGE_PATH.TODO_LIST}
            element={
              <ProtectedRoute isAllowed={isLoginUser} component={Todos} />
            }
          />
          <Route
            path={PAGE_PATH.SPEED_TYPING}
            element={
              <ProtectedRoute isAllowed={isLoginUser} component={SpeedTyping} />
            }
          />
          <Route
            path={PAGE_PATH.TIC_TAC}
            element={
              <ProtectedRoute isAllowed={isLoginUser} component={TicTac} />
            }
          />
          <Route
            path={PAGE_PATH.PROFILE}
            element={
              <ProtectedRoute isAllowed={isLoginUser} component={Profile} />
            }
          />
        </Route>
        <Route
          path={PAGE_PATH.ALL}
          element={<Navigate to={PAGE_PATH.LOGIN} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

const HeaderWrapper = () => (
  <>
    <Header />
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  </>
);

export default Router;
