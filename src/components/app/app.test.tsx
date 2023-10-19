import { MemoryHistory, createMemoryHistory } from 'history';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeFilmById, makeFakeStore } from '../../utils/mocks';
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
      USER: {authorizationStatus: AuthorizationStatus.Auth, avatarUrl: ''}
    }));
    mockHistory.push(`${AppRoute.Film}/:${film.id}/reviews`);

    render(withStoreComponent);

    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
  });
});
