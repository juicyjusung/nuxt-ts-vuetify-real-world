import { plainToClass } from 'class-transformer';

export class Profile {
  username: string = '';
  bio: string = '';
  image: string = '';
  following: boolean = false;

  constructor(init?: Partial<Profile>) {
    if (init) {
      Object.assign(this, plainToClass(Profile, init));
    }
  }
}
