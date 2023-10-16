import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import NotFoundScreen from './not-found-screen';

describe('Component: Not Found Screen', () => {
  it('should render correctly', () => {
    const expectedHeaderText = /Page not found/i;
    const expectedLinkText = /Вернуться на главную/i;

    const preparedComponent = withHistory(<NotFoundScreen />);

    render(preparedComponent);

    expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();

  });
});
