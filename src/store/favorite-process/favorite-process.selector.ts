import { State } from '../../types/state';
import { FilmShortCard } from '../../types/film';
import { NameSpace } from '../../const';

export const getFavorites = (state: State): FilmShortCard[] => state[NameSpace.Favorite].favorites;
export const getFavoritesLength = (state: State): number => state[NameSpace.Favorite].favorites.length;
export const getFavoritesLoadingStatus = (state: State) => state[NameSpace.Favorite].isFavoritesLoading;
export const getFavoritesErrorStatus = (state: State) => state[NameSpace.Favorite].hasFavoritesError;
export const getChangeStatusError = (state: State) => state[NameSpace.Favorite].hasChangeStatusError;
