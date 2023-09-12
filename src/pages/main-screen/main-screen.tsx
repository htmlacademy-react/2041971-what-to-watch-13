import FilmCard from '../../components/film-card/film-card';
import GenresList from '../../components/genres-list/genres-list';
import FilmsList from '../../components/films-list/films-list';
import Footer from '../../components/footer/footer';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
// import { useAppSelector } from '../../hooks';
// import { getFilmsCount } from '../../store/films-process/films-process.selector';

function MainScreen(): JSX.Element {

  return(
    <>
      <FilmCard />
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresList />
          <FilmsList />
          <div className="catalog__more">
            <ShowMoreButton />
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default MainScreen;
