import { FilmCard } from '../../types/film';
import { getTextRating } from '../../utils';

type FilmOverviewType = {
  film: FilmCard;
}

function FilmOverview({film}: FilmOverviewType): JSX.Element {
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{film.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getTextRating(film?.rating)}</span>
          <span className="film-rating__count">{film?.scoresCount} ratings</span>
        </p>
      </div>
      <div className="film-card__text">
        {film?.description}
        <p className="film-card__director"><strong>{`Director: ${film.director}`}</strong></p>
        <p className="film-card__starring"><strong>{`Starring: ${film.starring.map((actor) => actor).join(', ')} ${film.starring.length > 4 ? 'and other' : ''}`}</strong></p>
      </div>
    </>
  );
}

export default FilmOverview;
