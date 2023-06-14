import { useAppSelector } from './hooks/useRedux';
import { Loading } from './pages';
import Router from './router/Router';
import { getLoadingValue } from './store/slice/loadingSlice';

const App = () => {
  const isLoading = useAppSelector(getLoadingValue);

  return (
    <>
      <Router />
      {isLoading && <Loading />}
    </>
  );
};

export default App;
