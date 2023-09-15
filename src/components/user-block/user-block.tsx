import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { AppRoute } from '../../const';

function UserBlock(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <ul className="user-block">
      <li
        className="user-block__item"
        onClick={() => navigate(AppRoute.MyList)}
      >
        <div className="user-block__avatar">
          <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
        </div>
      </li>
      <li className="user-block__item">
        <Link to='/'
          className="user-block__link"
          onClick={(evt) => {
            evt.preventDefault();
            dispatch(logoutAction());
          }}
        >Sign out
        </Link>
      </li>
    </ul>
  );
}

export default UserBlock;
