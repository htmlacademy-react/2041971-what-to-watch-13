import { getFavorites, getFavoritesLength } from '../../store/favorite-process/favorite-process.selector';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchChangeFavoriteStatusAction } from '../../store/api-actions';

type FavoritesButtonProps = {
    id: string;
}

function FavoritesButton({id}: FavoritesButtonProps):JSX.Element {
  const dispatch = useAppDispatch();
  const favoritesCount = useAppSelector(getFavoritesLength);
  const favorites = useAppSelector(getFavorites);
  const isFavorite = favorites.some((favorite) => favorite.id === id);
  const status = Number(!isFavorite);

  return (
    <button
      className="btn btn--list film-card__button"
      type="button"
      onClick={() => {
        dispatch(fetchChangeFavoriteStatusAction({status, id}));
      }}
    >
      <svg viewBox="0 0 19 20" width={19} height={19}>
        <use xlinkHref={isFavorite ? '#in-list' : '#add'}></use>
      </svg>
      <span>My list</span>
      <span className="film-card__count">{favoritesCount}</span>
    </button>
  );
}

export default FavoritesButton;
