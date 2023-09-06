import SmallFilmCard from '../../components/small-film-card/small-film-card';
import { FilmShortCard } from '../../types/film';

type FavoritesListProps = {
    favorites: FilmShortCard[];
}

function FavoritesList({favorites}: FavoritesListProps): JSX.Element {
  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <div className="catalog__films-list">
        {favorites.map((favorite) => <SmallFilmCard key={favorite.id} film={favorite} />)}
      </div>
    </section>
  );
}

export default FavoritesList;
