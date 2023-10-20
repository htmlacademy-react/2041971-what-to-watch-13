import { render, screen } from '@testing-library/react';
import { makeFakeFilmById } from '../../utils/mocks';
import { withHistory } from '../../utils/mock-component';
import Tabs from './tabs';

describe('Component: SmallFilmCard', () => {
  it('should render correctly', () => {
    const film = makeFakeFilmById();

    const prepearedComponent = withHistory(<Tabs filmById={film} />);

    render(prepearedComponent);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
