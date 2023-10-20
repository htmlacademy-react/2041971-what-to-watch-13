import { render, screen } from '@testing-library/react';
import { makeFakeFilm } from '../../utils/mocks';
import { withHistory } from '../../utils/mock-component';
import SmallFilmCard from './small-film-card';

describe('Component: SmallFilmCard', () => {
  it('should render correctly', () => {
    const film = makeFakeFilm();

    const prepearedComponent = withHistory(<SmallFilmCard film={film} />);

    render(prepearedComponent);

    expect(screen.getByRole('article')).toBeInTheDocument();
  });
});
