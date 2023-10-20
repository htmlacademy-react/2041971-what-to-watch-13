import { withHistory, withStore } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';
import { makeFakeFilmById, makeFakePromo, makeFakeStore } from '../../utils/mocks';
import { AuthorizationStatus } from '../../const';
import FilmCard from './film-card';

describe('Component: AddReviewScreen', () => {
  const film = makeFakeFilmById();
  const promoFilm = makeFakePromo();
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
    },
    PROMO: {
      promoFilm
    }
  });
  it('should render correctly', () => {
    const expectedTestIt = 'filmCardContainer';
    const {withStoreComponent} = withStore(<FilmCard />, fakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedTestIt)).toBeInTheDocument();
  });
});
