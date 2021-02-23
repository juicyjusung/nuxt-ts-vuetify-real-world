export type Tag = string;

export function isTag(tag: unknown): tag is Tag {
  return tag != null && typeof tag === 'string';
}
