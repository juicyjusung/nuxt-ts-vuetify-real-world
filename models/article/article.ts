import { plainToClass, Transform, Type } from 'class-transformer';
import { Tag } from '~/models/article/tag';
import { Author } from '~/models/user/author';
import { CreateArticleRequest } from '~/store/articleModule';

export class Article {
  slug: string = '';
  title: string = '';
  description: string = '';
  body: string = '';
  tagList: Tag[] = [];

  @Transform(({ value }) => new Date(value))
  createdAt: Date = new Date();

  @Transform(({ value }) => new Date(value))
  updatedAt: Date = new Date();

  favorited: boolean = false;
  favoritesCount: number = 0;

  @Transform(({ value }) => new Author(value))
  author: Author = new Author();

  constructor(init?: Partial<Article>) {
    if (init) {
      Object.assign(this, plainToClass(Article, init));
    }
  }

  getCreateArticleRequest(): CreateArticleRequest {
    return {
      title: this.title,
      body: this.body,
      description: this.description,
      ...(this.tagList?.length && { tagList: this.tagList }),
    };
  }
}
