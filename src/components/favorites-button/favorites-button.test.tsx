import { withStore } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';
import { makeFakeFilmById, makeFakeFilms, makeFakeStore } from '../../utils/mocks';
import FavoritesButton from './favorites-button';

describe('Component: FavoritesButton', () => {
  const id = makeFakeFilmById().id;
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
    const expectedText = 'My list';
    const expectedCount = 5;
    const {withStoreComponent} = withStore(<FavoritesButton id={id} />, fakeStore);

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(favorites.length).toBe(expectedCount);
  });
});
