import { withHistory } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';
import { makeFakeFilmById } from '../../utils/mocks';
import FilmOverview from './film-overview';

describe('Component: FilmOverview', () => {
  const film = makeFakeFilmById();
  it('should render correctly', () => {
    const expectedText = /ratings/i;

    const preparedComponent = withHistory(<FilmOverview film={film}/>);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
