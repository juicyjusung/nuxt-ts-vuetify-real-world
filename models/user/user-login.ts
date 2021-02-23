import { plainToClass } from 'class-transformer';
import { ReqUserLogin } from '~/store/userModule';

export class UserLoginForm implements ReqUserLogin {
  email = '';
  password = '';

  constructor(init?: Partial<ReqUserLogin>) {
    if (init) {
      Object.assign(this, plainToClass(UserLoginForm, init));
    }
  }
}
