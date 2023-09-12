import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilmsProcess } from '../../types/state';
import { DEFAULT_FILMS_COUNT, NameSpace, DEFAULT_GENRE } from '../../const';
import { fetchFilmsAction } from '../api-actions';

const initialState: FilmsProcess = {
  films: [],
  filmsCount: DEFAULT_FILMS_COUNT,
  checkedGenre: DEFAULT_GENRE,
};

export const filmsProcess = createSlice({
  name: NameSpace.Films,
  initialState,
  reducers: {
    changeGenre: (state, action: PayloadAction<string>) => {
      state.checkedGenre = action.payload;
    },
    changeFilmsCount: (state) => {
      state.filmsCount += DEFAULT_FILMS_COUNT;
    },
    resetFilmsCount: (state) => {
      state.filmsCount = DEFAULT_FILMS_COUNT;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.films = action.payload;
      });
  }
});

export const {changeGenre, changeFilmsCount, resetFilmsCount} = filmsProcess.actions;
