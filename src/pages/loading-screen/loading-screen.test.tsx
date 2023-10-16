import { render, screen } from '@testing-library/react';
import LoadingScreen from './loading-screen';

describe('Component: Loading Screen', () => {
  it('should render correctly', () => {
    const loadingContainerTestId = 'loading-container';

    render(<LoadingScreen />);
    const loadingContainer = screen.getByTestId(loadingContainerTestId);

    expect(loadingContainer).toBeInTheDocument();
  });
});
