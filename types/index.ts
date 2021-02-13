export interface User {
  id: string;
  name: string;
  email: string;
  createdOn: string;
  updatedOn: string;
}

export interface AriticleOptions {
  tag?: string;
  author?: string;
  favorited?: string;
  limit?: number;
  offset?: number;
}

export type ResponseType<K extends string, V> = Promise<{ [P in K]: V }>;

export type ResponseTypes<T> = Promise<T>;

export type OptionalPick<T, K extends keyof T> = Pick<Partial<T>, K>;

export type Optional<T, K extends keyof T> = OptionalPick<T, K> & Omit<T, K>;

export type CustomErrors = {
  errors: {
    errorName: string[];
  };
};
