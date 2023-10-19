import { makeFakeComments, makeFakeFilmById, makeFakeFilms, makeFakeReview } from '../../utils/mocks';
import { fetchCommentsAction, fetchFilmByIdAction, fetchSendReviewAction, fetchSimilarFilmsAction } from '../api-actions';
import { filmCardProcess } from './film-card-process.slice';

describe('FilmCardProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      film: null,
      similarFilms: [],
      comments: [],
      comment: null,
      isFilmCardLoading: false,
      hasFilmCardError: false,
      isCommentsLoading: false,
      hasCommentsError: false,
      isSimilarError: false,
      isCommentSending: false,
      hasCommentSendingError: false,
    };

    const result = filmCardProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      film: null,
      similarFilms: [],
      comments: [],
      comment: null,
      isFilmCardLoading: false,
      hasFilmCardError: false,
      isCommentsLoading: false,
      hasCommentsError: false,
      isSimilarError: false,
      isCommentSending: false,
      hasCommentSendingError: false,
    };

    const result = filmCardProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "isFilmCardLoading" to true, "hasFilmCardError" to false with "fetchFilmByIdAction.pending"', () => {
    const expectedState = {
      film: null,
      similarFilms: [],
      comments: [],
      comment: null,
      isFilmCardLoading: true,
      hasFilmCardError: false,
      isCommentsLoading: false,
      hasCommentsError: false,
      isSimilarError: false,
      isCommentSending: false,
      hasCommentSendingError: false,
    };

    const result = filmCardProcess.reducer(undefined, fetchFilmByIdAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "film" to film, "isFilmCardLoading" to false, "hasFilmCardError" to false with "fetchFilmByIdAction.fulfilled"', () => {
    const film = makeFakeFilmById();
    const expectedState = {
      film,
      similarFilms: [],
      comments: [],
      comment: null,
      isFilmCardLoading: false,
      hasFilmCardError: false,
      isCommentsLoading: false,
      hasCommentsError: false,
      isSimilarError: false,
      isCommentSending: false,
      hasCommentSendingError: false,
    };

    const result = filmCardProcess.reducer(undefined, fetchFilmByIdAction.fulfilled(film, '', film.id));

    expect(result).toEqual(expectedState);
  });

  it('should set "isFilmCardLoading" to false, "hasFilmCardError" to true with "fetchFilmByIdAction.rejected"', () => {
    const expectedState = {
      film: null,
      similarFilms: [],
      comments: [],
      comment: null,
      isFilmCardLoading: false,
      hasFilmCardError: true,
      isCommentsLoading: false,
      hasCommentsError: false,
      isSimilarError: false,
      isCommentSending: false,
      hasCommentSendingError: false,
    };

    const result = filmCardProcess.reducer(undefined, fetchFilmByIdAction.rejected);

    expect(result).toEqual(expectedState);
  });


  it('should set "similarFilms" to array with similar films, "isSimilarError" to false with "fetchSimilarFilmsAction.fulfilled"', () => {
    const similarFilms = makeFakeFilms();
    const film = makeFakeFilmById();
    const expectedState = {
      film: null,
      similarFilms,
      comments: [],
      comment: null,
      isFilmCardLoading: false,
      hasFilmCardError: false,
      isCommentsLoading: false,
      hasCommentsError: false,
      isSimilarError: false,
      isCommentSending: false,
      hasCommentSendingError: false,
    };

    const result = filmCardProcess.reducer(undefined, fetchSimilarFilmsAction.fulfilled(similarFilms, '', film.id));

    expect(result).toEqual(expectedState);
  });

  it('should set "isSimilarError" to true with "fetchSimilarFilmsAction.rejected"', () => {
    const expectedState = {
      film: null,
      similarFilms: [],
      comments: [],
      comment: null,
      isFilmCardLoading: false,
      hasFilmCardError: false,
      isCommentsLoading: false,
      hasCommentsError: false,
      isSimilarError: true,
      isCommentSending: false,
      hasCommentSendingError: false,
    };

    const result = filmCardProcess.reducer(undefined, fetchSimilarFilmsAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "isCommentsLoading" to true, "hasCommentsError" to false with "fetchCommentsAction.pending"', () => {
    const expectedState = {
      film: null,
      similarFilms: [],
      comments: [],
      comment: null,
      isFilmCardLoading: false,
      hasFilmCardError: false,
      isCommentsLoading: true,
      hasCommentsError: false,
      isSimilarError: false,
      isCommentSending: false,
      hasCommentSendingError: false,
    };

    const result = filmCardProcess.reducer(undefined, fetchCommentsAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "comments" to array with comments, "isCommentsLoading" to false, "hasCommentsError" to false with "fetchCommentsAction.fulfilled"', () => {
    const comments = makeFakeComments();
    const film = makeFakeFilmById();
    const expectedState = {
      film: null,
      similarFilms: [],
      comments,
      comment: null,
      isFilmCardLoading: false,
      hasFilmCardError: false,
      isCommentsLoading: false,
      hasCommentsError: false,
      isSimilarError: false,
      isCommentSending: false,
      hasCommentSendingError: false,
    };

    const result = filmCardProcess.reducer(undefined, fetchCommentsAction.fulfilled(comments, '', film.id));

    expect(result).toEqual(expectedState);
  });

  it('should set "isCommentsLoading" to false, "hasCommentsError" to true with "fetchCommentsAction.rejected"', () => {
    const expectedState = {
      film: null,
      similarFilms: [],
      comments: [],
      comment: null,
      isFilmCardLoading: false,
      hasFilmCardError: false,
      isCommentsLoading: false,
      hasCommentsError: true,
      isSimilarError: false,
      isCommentSending: false,
      hasCommentSendingError: false,
    };

    const result = filmCardProcess.reducer(undefined, fetchCommentsAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "isCommentSending" to true, "hasCommentSendingError" to false with "fetchSendReviewAction.pending"', () => {
    const expectedState = {
      film: null,
      similarFilms: [],
      comments: [],
      comment: null,
      isFilmCardLoading: false,
      hasFilmCardError: false,
      isCommentsLoading: false,
      hasCommentsError: false,
      isSimilarError: false,
      isCommentSending: true,
      hasCommentSendingError: false,
    };

    const result = filmCardProcess.reducer(undefined, fetchSendReviewAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "isCommentSending" to false, "hasCommentSendingError" to false with "fetchSendReviewAction.fulfilled"', () => {
    const comment = makeFakeReview();
    const film = makeFakeFilmById();
    const expectedState = {
      film: null,
      similarFilms: [],
      comments: [],
      comment: null,
      isFilmCardLoading: false,
      hasFilmCardError: false,
      isCommentsLoading: false,
      hasCommentsError: false,
      isSimilarError: false,
      isCommentSending: false,
      hasCommentSendingError: false,
    };

    const result = filmCardProcess.reducer(undefined, fetchSendReviewAction.fulfilled(undefined, '', {id: film.id, rating: comment.rating, comment: comment.comment}));

    expect(result).toEqual(expectedState);
  });

  it('should set "isCommentSending" to false, "hasCommentSendingError" to true with "fetchSendReviewAction.rejected"', () => {
    const expectedState = {
      film: null,
      similarFilms: [],
      comments: [],
      comment: null,
      isFilmCardLoading: false,
      hasFilmCardError: false,
      isCommentsLoading: false,
      hasCommentsError: false,
      isSimilarError: false,
      isCommentSending: false,
      hasCommentSendingError: true,
    };

    const result = filmCardProcess.reducer(undefined, fetchSendReviewAction.rejected);

    expect(result).toEqual(expectedState);
  });
});

