import { withHistory, withStore } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';
import { makeFakeFilms, makeFakeStore } from '../../utils/mocks';
import GenresList from './genres-list';

describe('Component: GenresList', () => {
  const films = makeFakeFilms();
  const genre = 'All';
  function setGenre(data: string) {
    return data;
  }
  const fakeStore = makeFakeStore({
    FILMS: {
      films,
      filmsByGenreCount: 0,
      isFilmsLoading: false,
      hasFilmsError: false,
    }
  });
  it('should render correctly', () => {
    const expectedTestId = 'catalogGenresCatalog';

    const {withStoreComponent} = withStore(<GenresList checkedGenre={genre} setCheckedGenre={setGenre}/>, fakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
