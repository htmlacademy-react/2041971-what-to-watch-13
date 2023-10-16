import {Link} from 'react-router-dom';
import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';
import { Helmet } from 'react-helmet-async';

function NotFoundScreen(): JSX.Element {
  return (
    <div className="user-page">
      <Helmet>
        <title>WTW. Page not found</title>
      </Helmet>
      <header className="page-header user-page__head">
        <Logo />
      </header>
      <div className="sign-in user-page__content">
        <div className="sign-in__message">
          <p>404. Page not found</p>
        </div>
        <div className="sign-in__submit">
          <Link className="sign-in__btn" to="/">Вернуться на главную</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NotFoundScreen;
