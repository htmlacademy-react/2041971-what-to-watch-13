import { USER_AVATAR_KEY_NAME } from '../const';

export const saveAvatarUrl = (avatarUrl: string) => {
  localStorage.setItem(USER_AVATAR_KEY_NAME, avatarUrl);
};

export const dropAvatarUrl = (): void => {
  localStorage.removeItem(USER_AVATAR_KEY_NAME);
};
