import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { filmsProcess } from './films-process/films-process.slice';
import { favoriteProcess } from './favorite-process/favorite-process.slice';
import { promoFilmProcess } from './promo-film-process/promo-film-process.slice';

export const rootReducer = combineReducers({
  [NameSpace.Films]: filmsProcess.reducer,
  [NameSpace.Favorite]: favoriteProcess.reducer,
  [NameSpace.Promo]: promoFilmProcess.reducer,
});
