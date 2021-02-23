export interface Profile {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}
export function isProfile(obj: unknown): obj is Profile {
  return obj != null && typeof (obj as Profile).username === 'string';
}
