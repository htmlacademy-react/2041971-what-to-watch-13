import { State } from '../../types/state';
import { NameSpace } from '../../const';
import { FilmCard } from '../../types/film';

export const getCheckedTab = (state: State): string => state[NameSpace.FilmCard].checkedTab;
export const getFilmById = (state: State): FilmCard => state[NameSpace.FilmCard].film;
