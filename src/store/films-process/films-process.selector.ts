import { State } from '../../types/state';
import { FilmShortCard } from '../../types/film';
import { NameSpace } from '../../const';

export const getFilms = (state: State): FilmShortCard[] => state[NameSpace.Films].films;
export const getCheckedGenre = (state: State): string => state[NameSpace.Films].checkedGenre;
export const getFilmsCount = (state: State): number => state[NameSpace.Films].filmsCount;
export const getFilmsCountByGenre = (state: State): number => state[NameSpace.Films].filmsByGenreCount;
