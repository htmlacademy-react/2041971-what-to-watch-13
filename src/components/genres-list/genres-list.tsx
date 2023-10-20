import classNames from 'classnames';
import { useAppSelector } from '../../hooks';
import { getFilms } from '../../store/films-process/films-process.selector';
import { getCurrentGenresList } from '../../utils/utils';
import { memo } from 'react';

type GenresListProps = {
  checkedGenre: string;
  setCheckedGenre: (genre: string) => void;
}

function Genres({checkedGenre, setCheckedGenre}: GenresListProps): JSX.Element {
  const films = useAppSelector(getFilms);
  const genresList = getCurrentGenresList(films);

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
                setCheckedGenre(genre);
              }}
            >{genre}
            </a>
          </li>
        ))}
    </ul>
  );
}

const GenresList = memo(Genres);

export default GenresList;
