import { NameSpace } from '../../const';
import { makeFakeComments, makeFakeFilmById, makeFakeFilms, makeFakeReview } from '../../utils/mocks';
import { getCommentSendingErrorStatus, getCommentSendingStatus, getComments, getCommentsErrorStatus, getCommentsLoadingStatus, getFilmById, getFilmCardErrorStatus, getFilmCardLoadingStatus, getSimilarErrorStatus, getSimilarFilms } from './film-card-process.selector';

describe('favorite-process selectors', () => {
  const state = {
    [NameSpace.FilmCard]: {
      film: makeFakeFilmById(),
      similarFilms: makeFakeFilms(),
      comments: makeFakeComments(),
      comment: makeFakeReview(),
      isFilmCardLoading: true,
      hasFilmCardError: true,
      isCommentsLoading: true,
      hasCommentsError: false,
      isSimilarError: false,
      isCommentSending: true,
      hasCommentSendingError: false,
    }
  };

  it('should return film from state', () => {
    const {film} = state[NameSpace.FilmCard];
    const result = getFilmById(state);
    expect(result).toEqual(film);
  });

  it('should return similar films from state', () => {
    const {similarFilms} = state[NameSpace.FilmCard];
    const result = getSimilarFilms(state);
    expect(result).toEqual(similarFilms);
  });

  it('should return comments from state', () => {
    const {comments} = state[NameSpace.FilmCard];
    const result = getComments(state);
    expect(result).toEqual(comments);
  });

  it('should return film data loading status', () => {
    const {isFilmCardLoading} = state[NameSpace.FilmCard];
    const result = getFilmCardLoadingStatus(state);
    expect(result).toBe(isFilmCardLoading);
  });

  it('should return film data error status', () => {
    const {hasFilmCardError} = state[NameSpace.FilmCard];
    const result = getFilmCardErrorStatus(state);
    expect(result).toBe(hasFilmCardError);
  });

  it('should return comments data loading status', () => {
    const {isCommentsLoading} = state[NameSpace.FilmCard];
    const result = getCommentsLoadingStatus(state);
    expect(result).toBe(isCommentsLoading);
  });

  it('should return comments data error status from state', () => {
    const {hasCommentsError} = state[NameSpace.FilmCard];
    const result = getCommentsErrorStatus(state);
    expect(result).toBe(hasCommentsError);
  });

  it('should return similar films data error status from state', () => {
    const {isSimilarError} = state[NameSpace.FilmCard];
    const result = getSimilarErrorStatus(state);
    expect(result).toBe(isSimilarError);
  });

  it('should return comment data sending status', () => {
    const {isCommentSending} = state[NameSpace.FilmCard];
    const result = getCommentSendingStatus(state);
    expect(result).toBe(isCommentSending);
  });

  it('should return sending comment data error status from state', () => {
    const {hasCommentSendingError} = state[NameSpace.FilmCard];
    const result = getCommentSendingErrorStatus(state);
    expect(result).toBe(hasCommentSendingError);
  });
});
