import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selector';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Navigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { AuthData } from '../../types/auth-data';
import { validateEmail, validatePassword } from '../../utils';
import { loginAction } from '../../store/api-actions';

function AuthScreen(): JSX.Element {
  const authorizationStaus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);

  if (authorizationStaus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Main} />;
  }

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const form = evt.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData) as AuthData;
    setIsPasswordValid(validatePassword(data.password));
    setIsEmailValid(validateEmail(data.email));

    if (data !== null && isPasswordValid && isEmailValid) {
      dispatch(loginAction(data));
    }
  };

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form
          action="#"
          className="sign-in__form"
          onSubmit={handleSubmit}
        >
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input className="sign-in__input" type="email" placeholder="Email address" name="email" id="user-email" />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            {!isEmailValid && <div className="sign-in__message"><p>Please enter a valid email address</p></div>}
            <div className="sign-in__field">
              <input className="sign-in__input" type="password" placeholder="Password" name="password" id="user-password" />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
            {!isPasswordValid && <div className="sign-in__message"><p>Please enter a valid password</p></div>}
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default AuthScreen;
