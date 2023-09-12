import SmallFilmCard from '../../components/small-film-card/small-film-card';
import { useAppSelector } from '../../hooks';
import { getCheckedGenre, getFilms } from '../../store/films-process/films-process.selector';
import { getCurrentFilmsList } from '../../utils';

function FilmsList(): JSX.Element {
  const films = useAppSelector(getFilms);
  const genre = useAppSelector(getCheckedGenre);
  const currentFilmsList = getCurrentFilmsList(films, genre);

  return (
    <div className="catalog__films-list">
      {currentFilmsList.map((film) => <SmallFilmCard key={film.id} film={film} />)}
    </div>
  );
}

export default FilmsList;
