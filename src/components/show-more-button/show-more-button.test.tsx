import { render, screen } from '@testing-library/react';
import ShowMoreButton from './show-more-button';

describe('Component: ShowMoreButton', () => {
  it('should render correctly', () => {
    const count = 5;
    function setCount(data: number) {
      return data;
    }
    const expectedText = /Show more/i;

    render(<ShowMoreButton filmsCount={count} setFilmsCount={setCount}/>);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
