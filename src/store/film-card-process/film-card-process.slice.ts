import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilmCardProcess } from '../../types/state';
import { NameSpace, DEFAULT_TAB } from '../../const';
import { fetchCommentsAction, fetchFilmByIdAction, fetchSimilarFilmsAction } from '../api-actions';

const initialState: FilmCardProcess = {
  film: null,
  similarFilms: [],
  comments: [],
  checkedTab: DEFAULT_TAB,
  isFilmCardLoading: false,
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
      .addCase(fetchFilmByIdAction.pending, (state) => {
        state.isFilmCardLoading = true;
      })
      .addCase(fetchFilmByIdAction.fulfilled, (state, action) => {
        state.film = action.payload;
        state.isFilmCardLoading = false;
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
