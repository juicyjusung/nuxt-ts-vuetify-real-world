import { User } from '~/models/user';
import { ReqSignup } from '~/store/userModule';
import { $axios } from '~/utils/axios';
import { ResponseType } from '~/types';

type ResUser = ResponseType<'user', User>;

export const ApiUser = {
  signup(payload: ReqSignup): ResUser {
    return $axios.post('/users', { user: payload });
  },
};
