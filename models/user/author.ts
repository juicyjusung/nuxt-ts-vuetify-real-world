import { plainToClass } from 'class-transformer';

export class Author {
  username: string = '';
  bio: string = '';
  image: string = '';
  following: boolean = false;

  constructor(init?: Partial<Author>) {
    if (init) {
      Object.assign(this, plainToClass(Author, init));
    }
  }
}
