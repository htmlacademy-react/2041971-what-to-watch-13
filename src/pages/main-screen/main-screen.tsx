import FilmCard from '../../components/film-card/film-card';
import GenresList from '../../components/genres-list/genres-list';
import FilmsList from '../../components/films-list/films-list';
import Footer from '../../components/footer/footer';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import LoadingScreen from '../loading-screen/loading-screen';
import { useAppSelector } from '../../hooks';
import { getFilmsCount, getFilmsCountByGenre, getFilmsLoadingStatus } from '../../store/films-process/films-process.selector';

function MainScreen(): JSX.Element {
  const shownFilmsCount = useAppSelector(getFilmsCount);
  const setFilmsCountByGenre = useAppSelector(getFilmsCountByGenre);
  const isLoading = useAppSelector(getFilmsLoadingStatus);

  return(
    <>
      <FilmCard />
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresList />
          {isLoading ? <LoadingScreen /> : <FilmsList />}
          <div className="catalog__more">
            {shownFilmsCount < setFilmsCountByGenre && <ShowMoreButton />}
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default MainScreen;
