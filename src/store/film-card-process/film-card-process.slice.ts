import { createSlice } from '@reduxjs/toolkit';
import { FilmCardProcess } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchCommentsAction, fetchFilmByIdAction, fetchSendReviewAction, fetchSimilarFilmsAction } from '../api-actions';

const initialState: FilmCardProcess = {
  film: null,
  similarFilms: [],
  comments: [],
  comment: null,
  isFilmCardLoading: false,
  isCommentSending: false,
  hasCommentSendingError: false,
};

export const filmCardProcess = createSlice({
  name: NameSpace.FilmCard,
  initialState,
  reducers: {},
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
