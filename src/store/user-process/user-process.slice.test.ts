import { AuthorizationStatus } from '../../const';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { userProcess } from './user-process.slice';

describe('UserProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      avatarUrl: '',
    };

    const result = userProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      avatarUrl: '',
    };

    const result = userProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set avatarUrl and "Auth" with "checkAuthAction.fulfilled" action', () => {
    const url = 'https://13.design.pages.academy/static/avatar/8.jpg';
    const userData = {
      id: 0,
      avatarUrl: url,
      token: '',
    };
    const initialState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      avatarUrl: '',
    };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      avatarUrl: url,
    };

    const result = userProcess.reducer(initialState, checkAuthAction.fulfilled(userData, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth" with "checkAuthAction.rejected" action', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Auth,
      avatarUrl: '',
    };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      avatarUrl: '',
    };

    const result = userProcess.reducer(initialState, checkAuthAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set avatarUrl and "Auth" with "loginAction.fulfilled" action', () => {
    const url = 'https://13.design.pages.academy/static/avatar/8.jpg';
    const userData = {
      id: 0,
      avatarUrl: url,
      token: '',
    };
    const AuthData = {
      email: '',
      password: '',
    };
    const initialState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      avatarUrl: '',
    };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      avatarUrl: url,
    };

    const result = userProcess.reducer(initialState, loginAction.fulfilled(userData, '', AuthData));

    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth" with "loginAction.rejected" action', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Auth,
      avatarUrl: '',
    };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      avatarUrl: '',
    };

    const result = userProcess.reducer(initialState, loginAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth", with "logoutAction.fulfilled" action', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Auth,
      avatarUrl: '',
    };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      avatarUrl: '',
    };

    const result = userProcess.reducer(initialState, logoutAction.fulfilled);

    expect(result).toEqual(expectedState);
  });

});
