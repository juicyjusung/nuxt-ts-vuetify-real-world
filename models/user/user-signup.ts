import { plainToClass } from 'class-transformer';
import { UserLoginForm } from '~/models/user/user-login';
import { ReqSignup } from '~/store/userModule';

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
