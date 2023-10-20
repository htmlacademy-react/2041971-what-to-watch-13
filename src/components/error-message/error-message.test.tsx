import { render, screen } from '@testing-library/react';
import ErrorMessage from './error-message';

describe('Component: ErrorMessage', () => {
  it('should render correctly', () => {
    const expectedLinkText = /Something went wrong, try agai/i;

    render(<ErrorMessage />);

    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });
});
