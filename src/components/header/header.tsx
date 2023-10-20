import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selector';
import { AuthorizationStatus } from '../../const';
import { getPromoFilm } from '../../store/promo-film-process/promo-film-process.selector';
import { getFilmById } from '../../store/film-card-process/film-card-process.selector';
import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';
import HeadGuest from '../head-guest/head-guest';

type HeaderProps = {
    children?: React.ReactNode;
    isFilmCard?: boolean;
    isMain?: boolean;
}

function Header({children, isFilmCard, isMain}: HeaderProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const promoFilm = useAppSelector(getPromoFilm);
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;
  const film = useAppSelector(getFilmById);

  return (
    <>
      <div className="film-card__bg">
        {isFilmCard && <img src={film?.backgroundImage} alt={film?.name} />}
        {isMain && <img src={promoFilm?.backgroundImage} alt={promoFilm?.name} /> }
      </div>
      <h1 className="visually-hidden">WTW</h1>
      <header className="page-header film-card__head">
        <Logo isMain={isMain} />
        {children}
        {isAuth ? <UserBlock /> : <HeadGuest />}
      </header>
    </>
  );
}

export default Header;
