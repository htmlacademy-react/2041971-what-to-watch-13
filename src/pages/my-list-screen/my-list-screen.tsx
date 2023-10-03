import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import FavoritesList from '../../components/favorites-list/favorites-list';
import UserBlock from '../../components/user-block/user-block';
import { useAppSelector } from '../../hooks';
import { getFavorites, getFavoritesLength } from '../../store/favorite-process/favorite-process.selector';

function MyListScreen(): JSX.Element {
  const favorites = useAppSelector(getFavorites);
  const favoritesCount = useAppSelector(getFavoritesLength);

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
