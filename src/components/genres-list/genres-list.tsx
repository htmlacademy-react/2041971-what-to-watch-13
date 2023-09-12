import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCheckedGenre } from '../../store/films-process/films-process.selector';
import { changeGenre, resetFilmsCount } from '../../store/films-process/films-process.slice';
import { getFilms } from '../../store/films-process/films-process.selector';
import { getCurrentGenresList } from '../../utils';

function GenresList(): JSX.Element {
  const films = useAppSelector(getFilms);
  const genresList = getCurrentGenresList(films);

  const checkedGenre = useAppSelector(getCheckedGenre);
  const dispatch = useAppDispatch();

  const handleGenreClick = (genre: string) => {
    dispatch(changeGenre(genre));
    dispatch(resetFilmsCount());
  };

  return (
    <ul className="catalog__genres-list">
      {genresList.map((genre) =>
        (
          <li
            key={genre}
            className={classNames('catalog__genres-item',
              {'catalog__genres-item--active': genre === checkedGenre})}
          >
            <a href="#"
              className="catalog__genres-link"
              onClick={(evt) => {
                evt.preventDefault();
                handleGenreClick(genre);
              }}
            >{genre}
            </a>
          </li>
        ))}
    </ul>
  );
}

export default GenresList;
