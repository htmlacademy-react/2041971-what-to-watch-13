import { State } from '../../types/state';
import { FilmShortCard } from '../../types/film';
import { NameSpace } from '../../const';

export const getFilms = (state: State): FilmShortCard[] => state[NameSpace.Films].films;
