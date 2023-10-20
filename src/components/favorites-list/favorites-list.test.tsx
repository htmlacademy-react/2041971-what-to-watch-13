import { render, screen } from '@testing-library/react';
import FavoritesList from './favorites-list';
import { makeFakeFilms } from '../../utils/mocks';
import { withHistory } from '../../utils/mock-component';

describe('Component: FavoritesList', () => {
  it('should render correctly', () => {
    const expectedText = /Catalog/i;
    const favorites = makeFakeFilms();

    const prepearedComponent = withHistory(<FavoritesList favorites={favorites} />);

    render(prepearedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
