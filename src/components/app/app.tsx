import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import { useAppDispatch } from '../../hooks';
import { useEffect } from 'react';
import { fetchFilmsAction } from '../../store/api-actions';
import MainScreen from '../../pages/main-screen/main-screen';
import AuthScreen from '../../pages/auth-screen/auth-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import FilmScreen from '../../pages/film-screen/film-screen';
import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-rout/private-rout';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFilmsAction());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainScreen />} />
        <Route path={AppRoute.SignIn} element={<AuthScreen />} />
        <Route element={<PrivateRoute authorizationStatus={AuthorizationStatus.Auth} />}>
          <Route
            element={<MyListScreen />}
            path={AppRoute.MyList}
          />
        </Route>
        <Route path={AppRoute.Film} element={<FilmScreen />} />
        <Route path={AppRoute.AddReview} element={<AddReviewScreen />} />
        <Route path={AppRoute.Player} element={<PlayerScreen />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
