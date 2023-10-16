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
  isCommentsLoading: false,
  hasCommentsError: false,
  isSimilarError: false,
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
        state.isSimilarError = false;
        state.similarFilms = action.payload;
      })
      .addCase(fetchSimilarFilmsAction.rejected, (state) => {
        state.isSimilarError = true;
      })
      .addCase(fetchCommentsAction.pending, (state) => {
        state.hasCommentsError = false;
        state.isCommentsLoading = true;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.hasCommentsError = false;
        state.isCommentsLoading = false;
        state.comments = action.payload;
      })
      .addCase(fetchCommentsAction.rejected, (state) => {
        state.hasCommentsError = true;
        state.isCommentsLoading = false;
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
