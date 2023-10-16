import { render, screen } from '@testing-library/react';
import Footer from './footer';
import { withHistory } from '../../utils/mock-component';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const expectedText = /What to watch Ltd/i;
    const preparedComponent = withHistory(<Footer />);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
