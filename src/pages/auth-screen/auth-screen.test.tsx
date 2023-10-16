import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import AuthScreen from './auth-screen';
import userEvent from '@testing-library/user-event';
import { AuthorizationStatus } from '../../const';

describe('Component: AuthScreen', () => {
  const loginTestIdText = 'loginElement';
  const passwordTestIdText = 'passwordElement';
  const initialState = {
    USER: {
      authorizationStatus: AuthorizationStatus.Unknown,
      avatarUrl: '',
    },
  };

  it('should render correctly', () => {
    const {withStoreComponent} = withStore(<AuthScreen />, initialState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(loginTestIdText)).toBeInTheDocument();
    expect(screen.getByTestId(passwordTestIdText)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should render correctly when user enter login and password', async () => {
    const expectedLoginValue = 'keks';
    const expectedPasswordValue = '1234';
    const {withStoreComponent} = withStore(<AuthScreen />, initialState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    await userEvent.type(
      screen.getByTestId(loginTestIdText),
      expectedLoginValue,
    );

    await userEvent.type(
      screen.getByTestId(passwordTestIdText),
      expectedPasswordValue,
    );

    expect(screen.getByDisplayValue(expectedLoginValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPasswordValue)).toBeInTheDocument();
  });
});
