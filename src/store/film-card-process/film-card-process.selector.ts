import { State } from '../../types/state';
import { NameSpace } from '../../const';
import { FilmCard, FilmShortCard } from '../../types/film';
import { Comment } from '../../types/comment';

export const getCheckedTab = (state: State): string => state[NameSpace.FilmCard].checkedTab;
export const getFilmById = (state: State): FilmCard => state[NameSpace.FilmCard].film;
export const getSimilarFilms = (state: State): FilmShortCard[] => state[NameSpace.FilmCard].similarFilms;
export const getComments = (state: State): Comment[] => state[NameSpace.FilmCard].comments;
