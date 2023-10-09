import { State } from '../../types/state';
import { FilmShortCard } from '../../types/film';
import { NameSpace } from '../../const';

export const getFilms = (state: State): FilmShortCard[] => state[NameSpace.Films].films;
export const getFilmsCountByGenre = (state: State): number => state[NameSpace.Films].filmsByGenreCount;
export const getFilmsLoadingStatus = (state: State): boolean => state[NameSpace.Films].isFilmsLoading;
export const getFilmsErrorStatus = (state: State): boolean => state[NameSpace.Films].hasFilmsError;
