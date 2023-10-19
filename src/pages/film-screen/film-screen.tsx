import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchFilmByIdAction, fetchSimilarFilmsAction } from '../../store/api-actions';
import { getFilmById, getFilmCardErrorStatus, getFilmCardLoadingStatus } from '../../store/film-card-process/film-card-process.selector';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selector';
import { Helmet } from 'react-helmet-async';
import { getChangeStatusError } from '../../store/favorite-process/favorite-process.selector';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Tabs from '../../components/tabs/tabs';
import LoadingScreen from '../loading-screen/loading-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import PlayButton from '../../components/play-button/play-button';
import FavoritesButton from '../../components/favorites-button/favorites-button';
import ErrorMessage from '../../components/error-message/error-message';
import SimilarList from '../../components/similar-list/similar-list';

function FilmScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const filmById = useAppSelector(getFilmById);
  const isLoading = useAppSelector(getFilmCardLoadingStatus);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const hasChangeStatusError = useAppSelector(getChangeStatusError);
  const hasFilmCardError = useAppSelector(getFilmCardErrorStatus);
  const {id} = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchFilmByIdAction(id));
      dispatch(fetchSimilarFilmsAction(id));
    }
  }, [id, dispatch]);

  if (isLoading && !hasFilmCardError) {
    return <LoadingScreen />;
  }

  if (!filmById) {
    return <NotFoundScreen />;
  }

  const {name, genre, released, posterImage} = filmById;

  return (
    <>
      <section className="film-card film-card--full">
        <Helmet>
          <title>{`WTW. ${name}`}</title>
        </Helmet>
        <div className="film-card__hero">
          <Header isFilmCard >
            <h1 className="visually-hidden">WTW</h1>
          </Header>
          <div className="film-card__wrap" data-testid="filmCardWrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>
              <div className="film-card__buttons">
                {id && <PlayButton id={id} />}
                {authorizationStatus === AuthorizationStatus.Auth && id &&
                <>
                  <FavoritesButton id={id} />
                  <Link
                    to={AppRoute.AddReview.replace(':id', id)}
                    className="btn film-card__button"
                  >Add review
                  </Link>
                </>}
              </div>
              {hasChangeStatusError && <ErrorMessage />}
            </div>
          </div>
        </div>
        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info" data-testid="filmCardInfo">
            <div className="film-card__poster film-card__poster--big">
              <img src={posterImage} alt={name} width="218" height="327" />
            </div>
            <Tabs filmById={filmById} />
          </div>
        </div>
      </section>
      <div className="page-content">
        <SimilarList />
        <Footer />
      </div>
    </>
  );
}

export default FilmScreen;
