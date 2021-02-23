export interface Author {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}
export function isAuthor(obj: unknown): obj is Author {
  return obj != null && typeof (obj as Author).username === 'string';
}
