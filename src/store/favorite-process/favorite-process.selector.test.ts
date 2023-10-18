import { NameSpace } from '../../const';
import { makeFakeFilms } from '../../utils/mocks';
import { getChangeStatusError, getFavorites, getFavoritesErrorStatus, getFavoritesLength, getFavoritesLoadingStatus } from './favorite-process.selector';

describe('favorite-process selectors', () => {
  const state = {
    [NameSpace.Favorite]: {
      favorites: makeFakeFilms(),
      isFavoritesLoading: true,
      hasFavoritesError: false,
      hasChangeStatusError: false,
    }
  };

  it('should return favorites from state', () => {
    const {favorites} = state[NameSpace.Favorite];
    const result = getFavorites(state);
    expect(result).toEqual(favorites);
  });

  it('should return favorites length from state', () => {
    const {favorites} = state[NameSpace.Favorite];
    const result = getFavoritesLength(state);
    expect(result).toBe(favorites.length);
  });

  it('should return favorites data loading status', () => {
    const {isFavoritesLoading} = state[NameSpace.Favorite];
    const result = getFavoritesLoadingStatus(state);
    expect(result).toBe(isFavoritesLoading);
  });

  it('should return favorites data error status from state', () => {
    const {hasFavoritesError} = state[NameSpace.Favorite];
    const result = getFavoritesErrorStatus(state);
    expect(result).toBe(hasFavoritesError);
  });

  it('should return chenge status error status from state', () => {
    const {hasChangeStatusError} = state[NameSpace.Favorite];
    const result = getChangeStatusError(state);
    expect(result).toBe(hasChangeStatusError);
  });
});
