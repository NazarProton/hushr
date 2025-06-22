import { getAssetPath } from './paths';

export const getAvatarForUser = (userId: string | number): string => {
  const userIdStr = userId.toString();
  let hash = 0;
  for (let i = 0; i < userIdStr.length; i++) {
    const char = userIdStr.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  const avatarNumber = Math.abs(hash % 16) + 1;

  return getAssetPath(`/avatars/${avatarNumber}.webp`);
};

export const getAvatarForWallet = (walletAddress: string): string => {
  const suffix = walletAddress.slice(-8);
  return getAvatarForUser(suffix);
};
