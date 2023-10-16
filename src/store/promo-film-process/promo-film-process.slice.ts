import { createSlice } from '@reduxjs/toolkit';
import { PromoFilmProcess } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchPromoFilmAction } from '../api-actions';

const initialState: PromoFilmProcess = {
  promoFilm: null,
};

export const promoFilmProcess = createSlice({
  name: NameSpace.Promo,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPromoFilmAction.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
      });
  }
});
