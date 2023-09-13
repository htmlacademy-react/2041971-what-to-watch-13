import { useEffect } from 'react';
import SmallFilmCard from '../../components/small-film-card/small-film-card';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getCheckedGenre, getFilms, getFilmsCount } from '../../store/films-process/films-process.selector';
import { getCurrentFilmsList } from '../../utils';
import { setFilmsCountByGenre } from '../../store/films-process/films-process.slice';

function FilmsList(): JSX.Element {
  const films = useAppSelector(getFilms);
  const genre = useAppSelector(getCheckedGenre);
  const filmsCount = useAppSelector(getFilmsCount);
  const dispatch = useAppDispatch();
  const filmsByGenre = getCurrentFilmsList(films, genre);

  useEffect(() => {
    dispatch(setFilmsCountByGenre(filmsByGenre.length));
  }, [filmsByGenre, dispatch]);

  const currentFilmsList = filmsByGenre.slice(0, filmsCount);

  return (
    <div className="catalog__films-list">
      {currentFilmsList.map((film) => <SmallFilmCard key={film.id} film={film} />)}
    </div>
  );
}

export default FilmsList;
