import classNames from 'classnames';
import { useAppSelector } from '../../hooks';
import { getGenresList } from '../../store/films-process/films-process.selector';

type GenresListProps = {
  checkedGenre: string;
  setCheckedGenre: (genre: string) => void;
}

function GenresList({checkedGenre, setCheckedGenre}: GenresListProps): JSX.Element {
  const genresList = useAppSelector(getGenresList);

  return (
    <ul className="catalog__genres-list" data-testid="catalogGenresCatalog">
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

export default GenresList;
