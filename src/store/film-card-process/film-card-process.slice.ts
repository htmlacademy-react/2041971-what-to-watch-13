import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilmCardProcess } from '../../types/state';
import { NameSpace, DEFAULT_TAB } from '../../const';
import { fetchCommentsAction, fetchFilmByIdAction, fetchSendReviewAction, fetchSimilarFilmsAction } from '../api-actions';

const initialState: FilmCardProcess = {
  film: null,
  similarFilms: [],
  comments: [],
  comment: null,
  checkedTab: DEFAULT_TAB,
  isFilmCardLoading: false,
  isCommentSending: false,
  hasCommentSendingError: false,
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
      })
      .addCase(fetchSendReviewAction.pending, (state)=> {
        state.hasCommentSendingError = false;
        state.isCommentSending = true;
      })
      .addCase(fetchSendReviewAction.fulfilled, (state)=> {
        state.hasCommentSendingError = false;
        state.isCommentSending = false;
      })
      .addCase(fetchSendReviewAction.rejected, (state) => {
        state.hasCommentSendingError = true;
        state.isCommentSending = false;
      });
  }
});

export const {changeTab} = filmCardProcess.actions;
