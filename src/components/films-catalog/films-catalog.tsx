import GenresList from '../../components/genres-list/genres-list';
import FilmsList from '../../components/films-list/films-list';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import ErrorMessage from '../../components/error-message/error-message';
import { useAppSelector } from '../../hooks';
import { getFilmsCountByGenre, getFilmsErrorStatus, getFilmsLoadingStatus } from '../../store/films-process/films-process.selector';
import { DEFAULT_FILMS_COUNT, DEFAULT_GENRE } from '../../const';
import { useEffect, useState } from 'react';

function FilmsCatalog(): JSX.Element {
  const filmsCountByGenre = useAppSelector(getFilmsCountByGenre);
  const isLoading = useAppSelector(getFilmsLoadingStatus);
  const hasError = useAppSelector(getFilmsErrorStatus);
  const [filmsCount, setFilmsCount] = useState(DEFAULT_FILMS_COUNT);
  const [checkedGenre, setCheckedGenre] = useState(DEFAULT_GENRE);

  useEffect(() => {
    setFilmsCount(DEFAULT_FILMS_COUNT);
  }, [checkedGenre]);

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <GenresList checkedGenre={checkedGenre} setCheckedGenre={setCheckedGenre} />
      {isLoading && !hasError ? <LoadingScreen /> : <FilmsList genre={checkedGenre} filmsCount={filmsCount} />}
      {hasError && <ErrorMessage />}
      <div className="catalog__more">
        {filmsCount < filmsCountByGenre && <ShowMoreButton filmsCount={filmsCount} setFilmsCount={setFilmsCount} />}
      </div>
    </section>
  );
}

export default FilmsCatalog;
