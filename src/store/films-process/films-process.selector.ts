import { createSelector } from '@reduxjs/toolkit';
import { State } from '../../types/state';
import { FilmShortCard } from '../../types/film';
import { NameSpace } from '../../const';

export const getFilms = createSelector(
  (state: Pick<State, NameSpace.Films>) => state[NameSpace.Films],
  (state): FilmShortCard[] => state.films,
);
export const getFilmsCountByGenre = (state: Pick<State, NameSpace.Films>): number => state[NameSpace.Films].filmsByGenreCount;
export const getFilmsLoadingStatus = (state: Pick<State, NameSpace.Films>): boolean => state[NameSpace.Films].isFilmsLoading;
export const getFilmsErrorStatus = (state: Pick<State, NameSpace.Films>): boolean => state[NameSpace.Films].hasFilmsError;
