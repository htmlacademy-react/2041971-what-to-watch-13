import SmallFilmCard from '../../components/small-film-card/small-film-card';
import { useAppSelector } from '../../hooks';
import { getCheckedGenre, getFilms, getFilmsCount } from '../../store/films-process/films-process.selector';
import { getCurrentFilmsList } from '../../utils';

function FilmsList(): JSX.Element {
  const films = useAppSelector(getFilms);
  const genre = useAppSelector(getCheckedGenre);
  const filmsCount = useAppSelector(getFilmsCount);

  const currentFilmsList = getCurrentFilmsList(films, genre).slice(0, filmsCount);

  return (
    <div className="catalog__films-list">
      {currentFilmsList.map((film) => <SmallFilmCard key={film.id} film={film} />)}
    </div>
  );
}

export default FilmsList;
