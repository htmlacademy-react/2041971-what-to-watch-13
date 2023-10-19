import { useAppSelector } from '../../hooks';
import { getSimilarErrorStatus, getSimilarFilms } from '../../store/film-card-process/film-card-process.selector';
import { MAX_SIMILAR_COUNT } from '../../const';
import ErrorMessage from '../error-message/error-message';
import SmallFilmCard from '../../components/small-film-card/small-film-card';

function SimilarList(): JSX.Element {
  const similarFilms = useAppSelector(getSimilarFilms).slice(0, MAX_SIMILAR_COUNT);
  const hasSimilarError = useAppSelector(getSimilarErrorStatus);

  return (
    <section className="catalog catalog--like-this">
      <h2 className="catalog__title">More like this</h2>
      {hasSimilarError ? <ErrorMessage /> :
        <div className="catalog__films-list">
          {similarFilms.map((similarFilm) => <SmallFilmCard key={similarFilm.id} film={similarFilm} />)}
        </div>}
    </section>
  );
}

export default SimilarList;
