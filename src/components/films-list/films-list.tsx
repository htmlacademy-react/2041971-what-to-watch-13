import { useEffect, useMemo, memo } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getFilms} from '../../store/films-process/films-process.selector';
import { getCurrentFilmsList } from '../../utils/utils';
import { setFilmsCountByGenre } from '../../store/films-process/films-process.slice';
import SmallFilmCard from '../../components/small-film-card/small-film-card';

type FilmsListProps = {
  genre: string;
  filmsCount: number;
}

function FilmsListRaw({genre, filmsCount}: FilmsListProps): JSX.Element {
  const films = useAppSelector(getFilms);
  const dispatch = useAppDispatch();
  const filmsByGenre = getCurrentFilmsList(films, genre);

  useEffect(() => {
    dispatch(setFilmsCountByGenre(filmsByGenre.length));
  }, [filmsByGenre, dispatch]);

  const currentFilmsList = useMemo(() => filmsByGenre.slice(0, filmsCount), [filmsByGenre, filmsCount]) ;

  return (
    <div className="catalog__films-list" data-testid="catalogFilmsContainer">
      {currentFilmsList.map((film) => <SmallFilmCard key={film.id} film={film} />)}
    </div>
  );
}

const FilmsList = memo(FilmsListRaw);

export default FilmsList;
