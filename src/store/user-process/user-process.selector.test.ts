import { AuthorizationStatus, NameSpace } from '../../const';
import { getAuthCheckedStatus, getAuthorizationStatus, getAvatarUrl } from './user-process.selector';

describe('user-process selectors', () => {
  const state = {
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Unknown,
      avatarUrl: 'https://13.design.pages.academy/static/avatar/8.jpg',
    }
  };

  it('should return authorization status from state', () => {
    const {authorizationStatus} = state[NameSpace.User];
    const result = getAuthorizationStatus(state);
    expect(result).toBe(authorizationStatus);
  });

  it('should return "false" because auth status is "Unknown"', () => {
    const result = getAuthCheckedStatus(state);
    expect(result).toBe(false);
  });

  it('should return avatar url from state', () => {
    const {avatarUrl} = state[NameSpace.User];
    const result = getAvatarUrl(state);
    expect(result).toBe(avatarUrl);
  });

});
