import { withHistory } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';
import { makeFakeFilmById } from '../../utils/mocks';
import FilmDetails from './film-details';

describe('Component: FilmDetails', () => {
  const film = makeFakeFilmById();
  it('should render correctly', () => {
    const expectedDirectorText = 'Director';
    const expectedStarringText = 'Starring';
    const expectedRunTimeText = 'Run Time';
    const expectedGenreText = 'Genre';
    const expectedReleasedText = 'Released';

    const preparedComponent = withHistory(<FilmDetails film={film} />);

    render(preparedComponent);

    expect(screen.getByText(expectedDirectorText)).toBeInTheDocument();
    expect(screen.getByText(expectedStarringText)).toBeInTheDocument();
    expect(screen.getByText(expectedRunTimeText)).toBeInTheDocument();
    expect(screen.getByText(expectedGenreText)).toBeInTheDocument();
    expect(screen.getByText(expectedReleasedText)).toBeInTheDocument();
  });
});
