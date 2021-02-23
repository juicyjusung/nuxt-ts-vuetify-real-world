import { Author } from '~/models/author';
import { Tag } from '~/models/tag/tag.types';

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: Tag[];
  createdAt: string | Date;
  updatedAt: string | Date;
  favorited: boolean;
  favoritesCount: number;
  author: Author;
}

export function isArticle(obj: unknown): obj is Article {
  return obj != null && typeof (obj as Article).slug === 'string';
}
