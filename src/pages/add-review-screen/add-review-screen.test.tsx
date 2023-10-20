import { withHistory, withStore } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';
import { makeFakeFilmById, makeFakeStore, extractActionsTypes } from '../../utils/mocks';
import AddReviewScreen from './add-review-screen';
import { APIRoute, AuthorizationStatus } from '../../const';
import { fetchFilmByIdAction } from '../../store/api-actions';

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
    const expectedText = 'Add review';
    const {withStoreComponent} = withStore(<AddReviewScreen />, fakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should dispatch "fetchFilmByIdAction" when the page load', () => {
    const {withStoreComponent, mockStore, mockAxiosAdapter} = withStore(<AddReviewScreen />, fakeStore);
    mockAxiosAdapter.onGet(`${APIRoute.Films}/${film.id}`, film.id).reply(200, film);
    console.log(withStoreComponent, mockStore, mockAxiosAdapter);
    render(withStoreComponent);

    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      //fetchFilmByIdAction.pending.type,
      fetchFilmByIdAction.fulfilled.type,
    ]);


  });
});
