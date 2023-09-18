import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCheckedTab, getFilmById, getSimilarFilms } from '../../store/film-card-process/film-card-process.selector';
import { TABS } from '../../const';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import SmallFilmCard from '../../components/small-film-card/small-film-card';
import Tabs from '../../components/tabs/tabs';
import FilmOverview from '../../components/film-overview/film-overview';
import FilmDetails from '../../components/film-details/film-details';
import FilmReviews from '../../components/film-reviews/film-reviews';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchFilmByIdAction, fetchSimilarFilmsAction } from '../../store/api-actions';

function FilmScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const filmById = useAppSelector(getFilmById);
  const checkedTab = useAppSelector(getCheckedTab);
  const similarFilms = useAppSelector(getSimilarFilms).slice(0, 4);
  const {id} = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchFilmByIdAction(id));
      dispatch(fetchSimilarFilmsAction(id));
    }
  }, [id, dispatch]);

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <Header >
            <h1 className="visually-hidden">WTW</h1>
          </Header>
          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{filmById?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{filmById?.genre}</span>
                <span className="film-card__year">{filmById?.released}</span>
              </p>
              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
                <a href="add-review.html" className="btn film-card__button">Add review</a>
              </div>
            </div>
          </div>
        </div>
        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={filmById?.posterImage} alt={filmById?.name} width="218" height="327" />
            </div>
            <div className="film-card__desc">
              <Tabs />
              {checkedTab === TABS[0] && <FilmOverview film={filmById} />}
              {checkedTab === TABS[1] && <FilmDetails film={filmById} />}
              {checkedTab === TABS[2] && <FilmReviews id={filmById?.id} />}
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <div className="catalog__films-list">
            {similarFilms.map((similarFilm) => <SmallFilmCard key={similarFilm.id} film={similarFilm} />)}
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default FilmScreen;
