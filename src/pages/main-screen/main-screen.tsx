import { Helmet } from 'react-helmet-async';
import FilmCard from '../../components/film-card/film-card';
import Footer from '../../components/footer/footer';
import FilmsCatalog from '../../components/films-catalog/films-catalog';

function MainScreen(): JSX.Element {
  return(
    <>
      <Helmet>
        <title>{'WTW. Catalog'}</title>
      </Helmet>
      <FilmCard />
      <div className="page-content">
        <FilmsCatalog />
        <Footer />
      </div>
    </>
  );
}

export default MainScreen;
