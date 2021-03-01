import { plainToClass } from 'class-transformer';
import { ReqSignup } from '~/api/user';
import { UserLoginForm } from '~/models/user/user-login';

export class UserSignupForm implements ReqSignup {
  email = '';
  username = '';
  password = '';

  constructor(init?: Partial<ReqSignup>) {
    if (init) {
      Object.assign(this, plainToClass(UserLoginForm, init));
    }
  }
}
