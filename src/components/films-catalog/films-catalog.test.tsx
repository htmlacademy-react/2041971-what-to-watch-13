import { withHistory, withStore } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';
import { makeFakeFilms, makeFakeStore } from '../../utils/mocks';
import FilmsCatalog from './films-catalog';

describe('Component: FilmsCatalog', () => {
  const films = makeFakeFilms();
  const fakeStore = makeFakeStore({
    FILMS: {
      films,
      filmsByGenreCount: 0,
      isFilmsLoading: false,
      hasFilmsError: false,
    }
  });
  it('should render correctly', () => {
    const expctedText = 'Catalog';
    const {withStoreComponent} = withStore(<FilmsCatalog />, fakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expctedText)).toBeInTheDocument();
  });
});
