import { User } from '~/models/user';
import { OptionalPick, ResponseType } from '~/types';
import { $axios } from '~/utils/axios';

export type ReqSignup = Pick<User, 'email' | 'username'> & { password: string };
export type ReqUserLogin = Pick<User, 'email'> & { password: string };
export type ReqUpdateUser = OptionalPick<User, 'email' | 'username' | 'bio' | 'image'> & {
  password?: string;
};

type ResUser = ResponseType<'user', User>;

export const ApiUser = {
  whoami(token: User['token']): ResUser {
    return $axios.get('/user', {
      headers: {
        authorization: 'Token ' + token,
      },
    });
  },
  login(payload: ReqUserLogin): ResUser {
    return $axios.post('/users/login', { user: payload });
  },
  signup(payload: ReqSignup): ResUser {
    return $axios.post('/users', { user: payload });
  },
  updateUser(payload: ReqUpdateUser): ResUser {
    return $axios.put('/user', { user: payload });
  },
};
