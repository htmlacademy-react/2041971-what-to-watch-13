import SmallFilmCard from '../../components/small-film-card/small-film-card';
import { useAppSelector } from '../../hooks';
import { getFilms } from '../../store/films-process/films-process.selector';

function FilmsList(): JSX.Element {
  const films = useAppSelector(getFilms);

  return (
    <div className="catalog__films-list">
      {films.map((film) => <SmallFilmCard key={film.id} film={film} />)}
    </div>
  );
}

export default FilmsList;
