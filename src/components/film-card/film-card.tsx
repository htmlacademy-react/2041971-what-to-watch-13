import { useEffect } from 'react';
import { getPromoFilm } from '../../store/promo-film-process/promo-film-process.selector';
import { fetchPromoFilmAction } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selector';
import { AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getChangeStatusError } from '../../store/favorite-process/favorite-process.selector';
import Header from '../header/header';
import PlayButton from '../play-button/play-button';
import FavoritesButton from '../favorites-button/favorites-button';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import ErrorMessage from '../error-message/error-message';

function FilmCard():JSX.Element {
  const promo = useAppSelector(getPromoFilm);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const hasChangeStatusError = useAppSelector(getChangeStatusError);

  useEffect(() => {
    dispatch(fetchPromoFilmAction());
  }, [dispatch]);

  if (!promo) {
    return <LoadingScreen />;
  }

  const {posterImage, name, genre, released, id} = promo;

  return (
    <section className="film-card">
      <Header isMain/>
      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__poster">
            <img src={posterImage} alt={name} width={218} height={327} />
          </div>

          <div className="film-card__desc">
            <h2 className="film-card__title">{name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{genre}</span>
              <span className="film-card__year">{released}</span>
            </p>

            <div className="film-card__buttons">
              <PlayButton id={id} />
              {authorizationStatus === AuthorizationStatus.Auth && <FavoritesButton id={id} />}
            </div>
            {hasChangeStatusError && <ErrorMessage />}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FilmCard;
