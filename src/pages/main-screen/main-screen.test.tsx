import { withHistory, withStore } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';
import { makeFakePromo, makeFakeStore } from '../../utils/mocks';
import { AuthorizationStatus } from '../../const';
import MainScreen from './main-screen';

describe('Component: MainScreen', () => {
  const promoFilm = makeFakePromo();
  const fakeStore = makeFakeStore({
    USER: {authorizationStatus: AuthorizationStatus.Auth, avatarUrl: ''},
    PROMO: {
      promoFilm
    }
  });
  it('should render correctly', () => {
    const expectedTestId = 'pageContentElement';
    const {withStoreComponent} = withStore(<MainScreen/>, fakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
