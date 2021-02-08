import { plainToClass } from 'class-transformer';
import { ReqSignup, ReqUserLogin } from '~/store/userModule';

export interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export class UserModel implements User {
  email: string = '';
  token: string = '';
  username: string = '';
  bio: string = '';
  image: string = '';
  createdAt: string = '';
  updatedAt: string = '';

  constructor(init?: Partial<User>) {
    if (init) {
      Object.assign(this, plainToClass(UserModel, init));
    }
  }
}

export class UserLoginForm implements ReqUserLogin {
  email = '';
  password = '';
  constructor(init?: Partial<UserLoginForm>) {
    if (init) {
      Object.assign(this, plainToClass(UserLoginForm, init));
    }
  }
}

export class UserSignupForm implements ReqSignup {
  email = '';
  username = '';
  password = '';
  constructor(init?: Partial<UserLoginForm>) {
    if (init) {
      Object.assign(this, plainToClass(UserLoginForm, init));
    }
  }
}
