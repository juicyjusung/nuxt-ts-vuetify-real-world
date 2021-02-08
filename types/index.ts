export interface User {
  id: string;
  name: string;
  email: string;
  createdOn: string;
  updatedOn: string;
}

export interface Todo {
  title: string;
  desc: string;
  author: string;
  id: string;
  status: boolean;
  createdOn?: string;
  updatedOn?: string;
}

export interface NotificationOption {
  title?: string;
  text?: string;
  type?: string;
  group?: string;
  duration?: number;
  speed?: number;
  data?: object;
  clean?: boolean;
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
