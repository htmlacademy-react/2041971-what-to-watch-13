import { withHistory, withStore } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';
import { makeFakeStore } from '../../utils/mocks';
import { AuthorizationStatus } from '../../const';
import UserBlock from './user-block';

describe('Component: UserBlock', () => {
  const fakeStore = makeFakeStore({
    USER: {authorizationStatus: AuthorizationStatus.Auth, avatarUrl: ''}
  });
  it('should render correctly', () => {
    const expectedText = 'Sign out';
    const {withStoreComponent} = withStore(<UserBlock />, fakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
