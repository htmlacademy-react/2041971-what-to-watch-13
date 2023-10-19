import { makeFakeFavorite, makeFakeFilms } from '../../utils/mocks';
import { fetchChangeFavoriteStatusAction, fetchFavoriteAction } from '../api-actions';
import { favoriteProcess } from './favorite-process.slice';

describe('FavoriteProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      favorites: makeFakeFilms(),
      isFavoritesLoading: true,
      hasFavoritesError: false,
      hasChangeStatusError: true,
    };

    const result = favoriteProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      favorites: [],
      isFavoritesLoading: false,
      hasFavoritesError: false,
      hasChangeStatusError: false,
    };

    const result = favoriteProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "isFavoritesLoading" to true, "hasFavoritesError" to false with "fetchFavoriteAction.pending"', () => {
    const expectedState = {
      favorites: [],
      isFavoritesLoading: true,
      hasFavoritesError: false,
      hasChangeStatusError: false,
    };

    const result = favoriteProcess.reducer(undefined, fetchFavoriteAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "isFavoritesLoading" to false, "hasFavoritesError" to true with "fetchFavoriteAction.rejected"', () => {
    const expectedState = {
      favorites: [],
      isFavoritesLoading: false,
      hasFavoritesError: true,
      hasChangeStatusError: false,
    };

    const result = favoriteProcess.reducer(undefined, fetchFavoriteAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "favorites" to array with favorites, "isFavoritesLoading" to false, "hasFavoritesError" to false with "fetchFavoriteAction.fulfilled"', () => {
    const favorites = makeFakeFilms();
    const expectedState = {
      favorites,
      isFavoritesLoading: false,
      hasFavoritesError: false,
      hasChangeStatusError: false,
    };

    const result = favoriteProcess.reducer(undefined, fetchFavoriteAction.fulfilled(favorites, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "hasChangeStatusError" to true with "fetchChangeFavoriteStatusAction.rejected"', () => {
    const expectedState = {
      favorites: [],
      isFavoritesLoading: false,
      hasFavoritesError: false,
      hasChangeStatusError: true,
    };

    const result = favoriteProcess.reducer(undefined, fetchChangeFavoriteStatusAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "favorites" to array with favorites, "hasChangeStatusError" to false with "fetchChangeFavoriteStatusAction.fulfilled"', () => {
    const favorites = makeFakeFilms();
    const favorite = makeFakeFavorite();
    const {genre, id, name, previewImage, previewVideoLink} = favorite;
    const newFavorites = [
      ...favorites,
      {genre, id, name, previewImage, previewVideoLink}
    ];
    const status = 1;
    const initialState = {
      favorites,
      isFavoritesLoading: false,
      hasFavoritesError: false,
      hasChangeStatusError: false,
    };
    const expectedState = {
      favorites: newFavorites,
      isFavoritesLoading: false,
      hasFavoritesError: false,
      hasChangeStatusError: false,
    };

    const result = favoriteProcess.reducer(initialState, fetchChangeFavoriteStatusAction.fulfilled(favorite, '', {status, id}));

    expect(result).toEqual(expectedState);
  });
});
