import { withHistory, withStore } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';
import { makeFakeFilmById, makeFakeStore } from '../../utils/mocks';
import { AuthorizationStatus } from '../../const';
import FilmScreen from './film-screen';

describe('Component: AddReviewScreen', () => {
  const film = makeFakeFilmById();
  const fakeStore = makeFakeStore({
    USER: {authorizationStatus: AuthorizationStatus.Auth, avatarUrl: ''},
    FILM_CARD: {
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
      hasCommentSendingError: false
    }
  });
  it('should render correctly', () => {
    const expectedTestId = 'filmCardContainer';
    const {withStoreComponent} = withStore(<FilmScreen />, fakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
