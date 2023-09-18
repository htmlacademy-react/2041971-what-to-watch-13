import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilmCardProcess } from '../../types/state';
import { NameSpace, DEFAULT_TAB } from '../../const';
import { fetchCommentsAction, fetchFilmByIdAction, fetchSimilarFilmsAction } from '../api-actions';

const initialState: FilmCardProcess = {
  film: null,
  similarFilms: [],
  comments: [],
  checkedTab: DEFAULT_TAB,
};

export const filmCardProcess = createSlice({
  name: NameSpace.FilmCard,
  initialState,
  reducers: {
    changeTab: (state, action: PayloadAction<string>) => {
      state.checkedTab = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmByIdAction.fulfilled, (state, action) => {
        state.film = action.payload;
      })
      .addCase(fetchSimilarFilmsAction.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
      });
  }
});

export const {changeTab} = filmCardProcess.actions;
