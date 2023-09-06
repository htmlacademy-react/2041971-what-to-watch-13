import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FilmShortCard, PromoFilmCard } from '../types/film';
import { State } from '../types/state';
import { AppDispatch } from '../types/state';
import { APIRoute } from '../const';

export const fetchFilmsAction = createAsyncThunk<FilmShortCard[], undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'fetchFilms',
  async(_arg, {extra: api}) => {
    const {data} = await api.get<FilmShortCard[]>(APIRoute.Films);
    return data;
  }
);

export const fetchFavoriteAction = createAsyncThunk<FilmShortCard[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchFavorite',
  async(_arg, {extra: api}) => {
    const {data} = await api.get<FilmShortCard[]>(APIRoute.Favorite);
    return data;
  }
);

export const fetchPromoFilmAction = createAsyncThunk<PromoFilmCard, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchPromoFilm',
  async(_arg, {extra: api}) => {
    const {data} = await api.get<PromoFilmCard>(APIRoute.Promo);
    return data;
  }
);
