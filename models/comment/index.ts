import { Author } from '~/models/author';

export interface Comment {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: Author;
}

export function isComment(obj: unknown): obj is Comment {
  return obj != null && typeof (obj as Comment).id === 'number';
}
