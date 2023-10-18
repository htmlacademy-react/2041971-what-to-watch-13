import { State } from '../../types/state';
import { FilmShortCard } from '../../types/film';
import { NameSpace } from '../../const';

export const getFavorites = (state: Pick<State, NameSpace.Favorite>): FilmShortCard[] => state[NameSpace.Favorite].favorites;
export const getFavoritesLength = (state: Pick<State, NameSpace.Favorite>): number => state[NameSpace.Favorite].favorites.length;
export const getFavoritesLoadingStatus = (state: Pick<State, NameSpace.Favorite>) => state[NameSpace.Favorite].isFavoritesLoading;
export const getFavoritesErrorStatus = (state: Pick<State, NameSpace.Favorite>) => state[NameSpace.Favorite].hasFavoritesError;
export const getChangeStatusError = (state: Pick<State, NameSpace.Favorite>) => state[NameSpace.Favorite].hasChangeStatusError;
