import { MemoryHistory, createMemoryHistory } from 'history';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeStore, makeFakeFilmById } from '../../utils/mocks';
import App from './app';
import { AppRoute, AuthorizationStatus } from '../../const';
import { render, screen} from '@testing-library/react';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "MainScreen" when user navigate to "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    expect(screen.getByTestId('pageContentElement')).toBeInTheDocument();
  });

  it('should render "AuthScreen" when user navigate to "/login"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.SignIn);

    render(withStoreComponent);

    expect(screen.getByTestId(/loginElement/i)).toBeInTheDocument();
    expect(screen.getByTestId(/passwordElement/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('should render "MyListScreen" when user navigate to "/mylist"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth, avatarUrl: ''}
    }));
    mockHistory.push(AppRoute.MyList);

    render(withStoreComponent);

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
  });

  it('should render "AddReviewScreen" when user navigate to "/films/:id/review"', () => {
    const film = makeFakeFilmById();
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore({
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
    }));

    mockHistory.push(AppRoute.AddReview);

    render(withStoreComponent);

    expect(screen.getByTestId('filmCardAddReview')).toBeInTheDocument();
    expect(screen.getByText('Add review')).toBeInTheDocument();
  });

  it('should render "FilmScreen" when user navigate to "/films/:id', () => {
    const film = makeFakeFilmById();
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore({
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
    }));

    mockHistory.push(`${AppRoute.Film}${film.id}`);

    render(withStoreComponent);

    expect(screen.getByTestId('filmCardWrap')).toBeInTheDocument();
    expect(screen.getByTestId('filmCardInfo')).toBeInTheDocument();
  });

  it('should render "PlayerScreen" when user navigate to "/player/:id', () => {
    const film = makeFakeFilmById();
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore({
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
    }));

    mockHistory.push(AppRoute.Player);

    render(withStoreComponent);

    expect(screen.getByText('Toggler')).toBeInTheDocument();
    expect(screen.getByText('Full screen')).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to none-existent route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore());
    const unknownRoute = '/unknown-route';

    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
