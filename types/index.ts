export function isArrayOf<T>(obj: unknown, is: (...args: any) => boolean): obj is T[] {
  return Array.isArray(obj) && obj.every(is);
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
