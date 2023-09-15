import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selector';
import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';
import HeadGuest from '../head-guest/head-guest';
import { AuthorizationStatus } from '../../const';
import { getPromoFilm } from '../../store/promo-film-process/promo-film-process.selector';

type HeaderProps = {
    children?: React.ReactNode;
}

function Header({children}: HeaderProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const promoFilm = useAppSelector(getPromoFilm);
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  return (
    <>
      <div className="film-card__bg">
        {isAuth ? <img src={promoFilm?.backgroundImage} alt={promoFilm?.name} /> : <img src="img/bg-header.jpg" /> }
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
