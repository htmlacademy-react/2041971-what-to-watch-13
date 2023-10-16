import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { checkAuthAction, fetchFilmsAction, fetchFavoriteAction } from '../../store/api-actions';
import { getAuthCheckedStatus, getAuthorizationStatus } from '../../store/user-process/user-process.selector';
import { HelmetProvider } from 'react-helmet-async';
import { getFilmsErrorStatus, getFilmsLoadingStatus } from '../../store/films-process/films-process.selector';
import MainScreen from '../../pages/main-screen/main-screen';
import AuthScreen from '../../pages/auth-screen/auth-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import FilmScreen from '../../pages/film-screen/film-screen';
import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-rout/private-rout';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import ErrorMessage from '../error-message/error-message';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const isFilmsLoading = useAppSelector(getFilmsLoadingStatus);
  const hasError = useAppSelector(getFilmsErrorStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFilmsAction());
    dispatch(checkAuthAction());
    dispatch(fetchFavoriteAction());
  }, [dispatch]);

  if (!isAuthChecked || isFilmsLoading) {
    return (
      <LoadingScreen />
    );
  }

  if (hasError) {
    return (
      <ErrorMessage />
    );
  }

  return (
    <HelmetProvider>
      <Routes>
        <Route path={AppRoute.Main} element={<MainScreen />} />
        <Route path={AppRoute.SignIn} element={<AuthScreen />} />
        <Route element={<PrivateRoute authorizationStatus={authorizationStatus} />}>
          <Route element={<MyListScreen />} path={AppRoute.MyList} />
          <Route element={<AddReviewScreen />} path={AppRoute.AddReview} />
        </Route>
        <Route path={`${AppRoute.Film}:id`} element={<FilmScreen />} />
        <Route path={AppRoute.Player} element={<PlayerScreen />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
