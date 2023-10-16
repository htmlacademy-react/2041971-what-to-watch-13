import { State } from '../../types/state';
import { NameSpace } from '../../const';
import { FilmCard, FilmShortCard } from '../../types/film';
import { Comment } from '../../types/comment';

export const getFilmById = (state: State): FilmCard | null => state[NameSpace.FilmCard].film;
export const getSimilarFilms = (state: State): FilmShortCard[] => state[NameSpace.FilmCard].similarFilms;
export const getComments = (state: State): Comment[] => state[NameSpace.FilmCard].comments;
export const getFilmCardLoadingStatus = (state: State): boolean => state[NameSpace.FilmCard].isFilmCardLoading;
export const getCommentsLoadingStatus = (state: State): boolean => state[NameSpace.FilmCard].isCommentsLoading;
export const getCommentsErrorStatus = (state: State): boolean => state[NameSpace.FilmCard].hasCommentsError;
export const getSimilarErrorStatus = (state: State): boolean => state[NameSpace.FilmCard].isSimilarError;
export const getCommentSendingStatus = (state: State): boolean => state[NameSpace.FilmCard].isCommentSending;
export const getCommentSendingErrorStatus = (state: State): boolean => state[NameSpace.FilmCard].hasCommentSendingError;
