import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import HeadGuest from './head-guest';

describe('Component: Head Guest', () => {
  it('should render correctly', () => {
    const expectedLinkText = /Sign in/i;

    const preparedComponent = withHistory(<HeadGuest />);

    render(preparedComponent);

    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });
});
