import { getFavorites, getFavoritesLength, getFavoritesLoadingStatus } from '../../store/favorite-process/favorite-process.selector';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchChangeFavoriteStatusAction } from '../../store/api-actions';
import LoadingScreen from '../../pages/loading-screen/loading-screen';

type FavoritesButtonProps = {
    id: string;
}

function FavoritesButton({id}: FavoritesButtonProps):JSX.Element {
  const dispatch = useAppDispatch();
  const favoritesCount = useAppSelector(getFavoritesLength);
  const favorites = useAppSelector(getFavorites);
  const isLoading = useAppSelector(getFavoritesLoadingStatus);
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
      {isLoading ? <LoadingScreen /> : <span className="film-card__count">{favoritesCount}</span>}
    </button>
  );
}

export default FavoritesButton;
