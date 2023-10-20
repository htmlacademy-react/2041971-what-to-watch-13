import { withHistory, withStore } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';
import { makeFakeComments, makeFakeFilmById, makeFakeStore } from '../../utils/mocks';
import FilmReviews from './film-reviews';

describe('Component: AddReviewScreen', () => {
  const film = makeFakeFilmById();
  const comments = makeFakeComments();
  const fakeStore = makeFakeStore({
    FILM_CARD: {
      film,
      similarFilms: [],
      comments,
      comment: null,
      isFilmCardLoading: false,
      hasFilmCardError: false,
      isCommentsLoading: false,
      hasCommentsError: false,
      isSimilarError: false,
      isCommentSending: false,
      hasCommentSendingError: false
    }
  });
  it('should render correctly', () => {
    const expectedTestId = 'filmReviewsContainer';
    const {withStoreComponent} = withStore(<FilmReviews id={film.id} />, fakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
