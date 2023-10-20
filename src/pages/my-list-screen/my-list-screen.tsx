import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import FavoritesList from '../../components/favorites-list/favorites-list';
import UserBlock from '../../components/user-block/user-block';
import { useAppSelector } from '../../hooks';
import { getFavorites, getFavoritesErrorStatus, getFavoritesLength, getFavoritesLoadingStatus } from '../../store/favorite-process/favorite-process.selector';
import { Helmet } from 'react-helmet-async';
import LoadingScreen from '../loading-screen/loading-screen';
import ErrorMessage from '../../components/error-message/error-message';

function MyListScreen(): JSX.Element {
  const favorites = useAppSelector(getFavorites);
  const favoritesCount = useAppSelector(getFavoritesLength);
  const isLoading = useAppSelector(getFavoritesLoadingStatus);
  const hasError = useAppSelector(getFavoritesErrorStatus);

  if(hasError) {
    return <ErrorMessage />;
  }

  return (
    <div className="user-page">
      <Helmet>
        <title>WTW. My list</title>
      </Helmet>
      <header className="page-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{favoritesCount}</span></h1>
        <UserBlock />
      </header>
      {isLoading ? <LoadingScreen /> : <FavoritesList favorites={favorites} />}
      <Footer />
    </div>
  );
}

export default MyListScreen;
