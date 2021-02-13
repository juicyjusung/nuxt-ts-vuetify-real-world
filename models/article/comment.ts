import { plainToClass } from 'class-transformer';
import { Author } from '~/models/user/author';

export class Comment {
  id: number = 0;
  createdAt: string = '';
  updatedAt: string = '';
  body: string = '';
  author: Author = new Author();

  constructor(init?: Partial<Comment>) {
    if (init) {
      Object.assign(this, plainToClass(Comment, init));
    }
  }
}
