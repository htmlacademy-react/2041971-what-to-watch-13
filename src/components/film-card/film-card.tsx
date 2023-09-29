import Header from '../header/header';
import PlayButton from '../play-button/play-button';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { getPromoFilm } from '../../store/promo-film-process/promo-film-process.selector';
import { fetchPromoFilmAction } from '../../store/api-actions';
import { getFavoritesLength } from '../../store/favorite-process/favorite-process.selector';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selector';
import { AuthorizationStatus } from '../../const';
import LoadingScreen from '../../pages/loading-screen/loading-screen';

function FilmCard():JSX.Element {
  const promo = useAppSelector(getPromoFilm);
  const favoritesCount = useAppSelector(getFavoritesLength);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPromoFilmAction());
  }, [dispatch]);

  if (!promo) {
    return <LoadingScreen />;
  }

  return (
    <section className="film-card">
      <Header />
      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__poster">
            <img src={promo?.posterImage} alt={promo.name} width={218} height={327} />
          </div>

          <div className="film-card__desc">
            <h2 className="film-card__title">{promo.name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{promo.genre}</span>
              <span className="film-card__year">{promo.released}</span>
            </p>

            <div className="film-card__buttons">
              <PlayButton id={promo.id} />
              {authorizationStatus === AuthorizationStatus.Auth &&
              <button className="btn btn--list film-card__button" type="button">
                <svg viewBox="0 0 19 20" width={19} height={19}>
                  <use xlinkHref="#add"></use>
                </svg>
                <span>My list</span>
                <span className="film-card__count">{favoritesCount}</span>
              </button>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FilmCard;
