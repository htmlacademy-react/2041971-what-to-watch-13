import FilmCard from '../../components/film-card/film-card';
import GenresList from '../../components/genres-list/genres-list';
import FilmsList from '../../components/films-list/films-list';
import Footer from '../../components/footer/footer';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import LoadingScreen from '../loading-screen/loading-screen';
import { useAppSelector } from '../../hooks';
import { getFilmsCountByGenre, getFilmsErrorStatus, getFilmsLoadingStatus } from '../../store/films-process/films-process.selector';
import { DEFAULT_FILMS_COUNT, DEFAULT_GENRE } from '../../const';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import ErrorMessage from '../../components/error-message/error-message';

function MainScreen(): JSX.Element {
  const filmsCountByGenre = useAppSelector(getFilmsCountByGenre);
  const isLoading = useAppSelector(getFilmsLoadingStatus);
  const hasError = useAppSelector(getFilmsErrorStatus);

  const [checkedGenre, setCheckedGenre] = useState(DEFAULT_GENRE);
  const [filmsCount, setFilmsCount] = useState(DEFAULT_FILMS_COUNT);

  useEffect(() => {
    setFilmsCount(DEFAULT_FILMS_COUNT);
  }, [checkedGenre]);

  return(
    <>
      <Helmet>
        <title>{`WTW. Catalog - ${checkedGenre}`}</title>
      </Helmet>
      <FilmCard />
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresList checkedGenre={checkedGenre} setCheckedGenre={setCheckedGenre} />
          {isLoading && !hasError ? <LoadingScreen /> : <FilmsList genre={checkedGenre} filmsCount={filmsCount} />}
          {hasError && <ErrorMessage />}
          <div className="catalog__more">
            {filmsCount < filmsCountByGenre && <ShowMoreButton filmsCount={filmsCount} setFilmsCount={setFilmsCount} />}
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default MainScreen;
