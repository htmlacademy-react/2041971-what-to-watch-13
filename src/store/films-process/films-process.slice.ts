import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilmsProcess } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchFilmsAction } from '../api-actions';

const initialState: FilmsProcess = {
  films: [],
  filmsByGenreCount: 0,
  isFilmsLoading: false,
  hasFilmsError: false,
};

export const filmsProcess = createSlice({
  name: NameSpace.Films,
  initialState,
  reducers: {
    setFilmsCountByGenre: (state, action: PayloadAction<number>) => {
      state.filmsByGenreCount = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.pending, (state) => {
        state.hasFilmsError = false;
        state.isFilmsLoading = true;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.films = action.payload;
        state.isFilmsLoading = false;
        state.hasFilmsError = false;
      })
      .addCase(fetchFilmsAction.rejected, (state) => {
        state.hasFilmsError = true;
        state.isFilmsLoading = false;
      });
  }
});

export const { setFilmsCountByGenre } = filmsProcess.actions;
