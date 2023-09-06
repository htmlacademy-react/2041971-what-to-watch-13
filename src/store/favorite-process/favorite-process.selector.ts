import { State } from '../../types/state';
import { FilmShortCard } from '../../types/film';
import { NameSpace } from '../../const';

export const getFavorites = (state: State): FilmShortCard[] => state[NameSpace.Favorite].favorite;
export const getFavoritesLength = (state: State): number => state[NameSpace.Favorite].favorite.length;
