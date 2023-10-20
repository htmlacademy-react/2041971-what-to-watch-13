import { withHistory, withStore } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';
import { makeFakeFilms, makeFakeStore } from '../../utils/mocks';
import MyListScreen from './my-list-screen';

describe('Component: MyListScreen', () => {
  const favorites = makeFakeFilms();
  const fakeStore = makeFakeStore({
    FAVORITE: {
      favorites,
      isFavoritesLoading: false,
      hasFavoritesError: false,
      hasChangeStatusError: false,
    }
  });
  it('should render correctly', () => {
    const expectedText = /My list/i;
    const {withStoreComponent} = withStore(<MyListScreen />, fakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
