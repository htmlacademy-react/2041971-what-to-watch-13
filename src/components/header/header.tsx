import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selector';
import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';

type HeaderProps = {
    children?: React.ReactNode;
}

function Header({children}: HeaderProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    <>
      <div className="film-card__bg">
        <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
      </div>
      <h1 className="visually-hidden">WTW</h1>
      <header className="page-header film-card__head">
        <Logo />
        {children}
        <UserBlock authorizationStatus={authorizationStatus} />
      </header>
    </>
  );
}

export default Header;
