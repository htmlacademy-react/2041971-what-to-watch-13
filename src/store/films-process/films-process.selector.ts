import { createSelector } from '@reduxjs/toolkit';
import { State } from '../../types/state';
import { FilmShortCard } from '../../types/film';
import { NameSpace } from '../../const';
import { getCurrentGenresList } from '../../utils/utils';

export const getFilms = (state: Pick<State, NameSpace.Films>): FilmShortCard[] => state[NameSpace.Films].films;
export const getFilmsCountByGenre = (state: Pick<State, NameSpace.Films>): number => state[NameSpace.Films].filmsByGenreCount;
export const getFilmsLoadingStatus = (state: Pick<State, NameSpace.Films>): boolean => state[NameSpace.Films].isFilmsLoading;
export const getFilmsErrorStatus = (state: Pick<State, NameSpace.Films>): boolean => state[NameSpace.Films].hasFilmsError;
export const getGenresList = createSelector(
  getFilms,
  (films) => getCurrentGenresList(films)
);
