import { GENRES } from '../../const';

function GenresList(): JSX.Element {
  return (
    <ul className="catalog__genres-list">
      {GENRES.map((genre) => <li key={genre} className="catalog__genres-item catalog__genres-item--active"><a href="#" className="catalog__genres-link">{genre}</a></li>
      )}
    </ul>
  );
}

export default GenresList;
