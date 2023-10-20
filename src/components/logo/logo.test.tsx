import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import Logo from './logo';

describe('Component: Logo', () => {
  it('should render correctly', () => {
    const expectedTestId = 'logoContainer';

    const prepearedComponent = withHistory(<Logo />);

    render(prepearedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
