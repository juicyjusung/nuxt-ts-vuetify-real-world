export interface User {
  bio: string;
  createdAt: string;
  email: string;
  id: number;
  image: string;
  token: string;
  updatedAt: string;
  username: string;
}

export function isUser(obj: unknown): obj is User {
  return obj != null && typeof (obj as User).id === 'number';
}
