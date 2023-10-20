import { withHistory, withStore } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';
import { makeFakeFilms, makeFakeStore } from '../../utils/mocks';
import FilmsList from './films-list';

describe('Component: FilmsList', () => {
  const genre = 'All films';
  const films = makeFakeFilms();
  const filmsCount = films.length;

  const fakeStore = makeFakeStore({
    FILMS: {
      films,
      filmsByGenreCount: 0,
      isFilmsLoading: false,
      hasFilmsError: false,
    }
  });
  it('should render correctly', () => {
    const expctedTestId = 'catalogFilmsContainer';

    const {withStoreComponent} = withStore(<FilmsList genre={genre} filmsCount={filmsCount} />, fakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expctedTestId)).toBeInTheDocument();
  });
});
