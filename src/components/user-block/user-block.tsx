import { Link } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';

type UserBlockProps = {
  authorizationStatus: AuthorizationStatus;
}

function UserBlock({authorizationStatus}: UserBlockProps): JSX.Element {
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  return (
    <div>
      {isAuth ?
        <ul className="user-block">
          <li className="user-block__item">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </li>
          <li className="user-block__item">
            <Link to='/' className="user-block__link">Sign out</Link>
          </li>
        </ul> :
        <div className="user-block">
          <a href="sign-in.html" className="user-block__link">Sign in</a>
        </div>}
    </div>
  );
}

export default UserBlock;
