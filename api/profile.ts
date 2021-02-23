import { Article } from '~/models/article';
import { Profile } from '~/models/profile';
import { User } from '~/models/user';
import { ResponseType } from '~/types';
import { $axios } from '~/utils/axios';

export type ResArticle = Promise<{ article: Article }>;

export type UserName = User['username'];
export type ProfileResponse = ResponseType<'profile', Profile>;

export const ApiProfile = {
  getProfile(userName: UserName): ProfileResponse {
    return $axios.get(`/profiles/${userName}`);
  },
  followUser(userName: UserName): ProfileResponse {
    return $axios.post(`/profiles/${userName}/follow`);
  },
  unFollowUser(userName: UserName): ProfileResponse {
    return $axios.delete(`/profiles/${userName}/follow`);
  },
};
