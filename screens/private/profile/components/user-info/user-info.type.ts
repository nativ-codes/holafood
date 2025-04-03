import { UserProfileType } from '../../profile.type';

export type UserInfoPropsType = {
  user: UserProfileType;
  onEditProfile: () => void;
}; 