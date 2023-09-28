import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selector';
import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';
import HeadGuest from '../head-guest/head-guest';
import { AuthorizationStatus } from '../../const';
import { getPromoFilm } from '../../store/promo-film-process/promo-film-process.selector';
import { getFilmById } from '../../store/film-card-process/film-card-process.selector';

type HeaderProps = {
    children?: React.ReactNode;
    isFilmCard?: boolean;
}

function Header({children, isFilmCard}: HeaderProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const promoFilm = useAppSelector(getPromoFilm);
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;
  const film = useAppSelector(getFilmById);

  function getBackground(isFullCard: boolean | undefined, hasAuth: boolean) {
    if (isFullCard) {
      return <img src={film?.backgroundImage} alt={film?.name} />;
    }

    if (hasAuth) {
      return <img src={promoFilm?.backgroundImage} alt={promoFilm?.name} />;
    } else {
      return <img src="img/bg-header.jpg" />;
    }
  }

  return (
    <>
      <div className="film-card__bg">
        {getBackground(isFilmCard, isAuth)}
      </div>
      <h1 className="visually-hidden">WTW</h1>
      <header className="page-header film-card__head">
        <Logo />
        {children}
        {isAuth ? <UserBlock /> : <HeadGuest />}
      </header>
    </>
  );
}

export default Header;
