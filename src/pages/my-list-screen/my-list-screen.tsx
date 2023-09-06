import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import FavoritesList from '../../components/favorites-list/favorites-list';
import UserBlock from '../../components/user-block/user-block';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFavoriteAction } from '../../store/api-actions';
import { getFavorites, getFavoritesLength } from '../../store/favorite-process/favorite-process.selector';
import { useEffect } from 'react';

function MyListScreen(): JSX.Element {
  const favorites = useAppSelector(getFavorites);
  const favoritesCount = useAppSelector(getFavoritesLength);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteAction());
  }, [dispatch]);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{favoritesCount}</span></h1>
        <UserBlock />
      </header>
      <FavoritesList favorites={favorites} />
      <Footer />
    </div>
  );
}

export default MyListScreen;
