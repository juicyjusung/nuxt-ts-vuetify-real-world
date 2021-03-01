import { ReqUpdateUser } from '~/api/user';
import { User } from '~/models/user/index';

export class UserSettings implements ReqUpdateUser {
  image = '';
  username = '';
  bio = '';
  email = '';
  password = '';

  constructor(init?: User) {
    if (init) {
      Object.assign(this, init);
    }
  }

  get payload(): ReqUpdateUser {
    return {
      image: this.image,
      username: this.username,
      bio: this.bio,
      email: this.email,
      password: this.password,
    };
  }
}
