import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { AppRoute } from '../../const';

type LogoProps = {
  isFooter?: boolean;
}

function Logo({isFooter}: LogoProps): JSX.Element {
  return(
    <div className="logo">
      <Link to={AppRoute.Main} className={classNames('logo__link', {'logo__link--light': isFooter})}>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
}

export default Logo;
