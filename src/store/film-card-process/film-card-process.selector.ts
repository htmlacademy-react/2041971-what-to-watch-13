import { State } from '../../types/state';
import { NameSpace } from '../../const';
import { FilmCard, FilmShortCard } from '../../types/film';
import { Comment } from '../../types/comment';

export const getFilmById = (state: Pick<State, NameSpace.FilmCard>): FilmCard | null => state[NameSpace.FilmCard].film;
export const getSimilarFilms = (state: Pick<State, NameSpace.FilmCard>): FilmShortCard[] => state[NameSpace.FilmCard].similarFilms;
export const getComments = (state: Pick<State, NameSpace.FilmCard>): Comment[] => state[NameSpace.FilmCard].comments;
export const getFilmCardLoadingStatus = (state: Pick<State, NameSpace.FilmCard>): boolean => state[NameSpace.FilmCard].isFilmCardLoading;
export const getFilmCardErrorStatus = (state: Pick<State, NameSpace.FilmCard>): boolean => state[NameSpace.FilmCard].hasFilmCardError;
export const getCommentsLoadingStatus = (state: Pick<State, NameSpace.FilmCard>): boolean => state[NameSpace.FilmCard].isCommentsLoading;
export const getCommentsErrorStatus = (state: Pick<State, NameSpace.FilmCard>): boolean => state[NameSpace.FilmCard].hasCommentsError;
export const getSimilarErrorStatus = (state: Pick<State, NameSpace.FilmCard>): boolean => state[NameSpace.FilmCard].isSimilarError;
export const getCommentSendingStatus = (state: Pick<State, NameSpace.FilmCard>): boolean => state[NameSpace.FilmCard].isCommentSending;
export const getCommentSendingErrorStatus = (state: Pick<State, NameSpace.FilmCard>): boolean => state[NameSpace.FilmCard].hasCommentSendingError;
