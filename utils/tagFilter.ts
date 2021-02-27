import { Tag } from '~/models/tag/tag.types';

export const tagFilter = (tags: Tag[]) => {
  return tags.map(tag => tag.replace(/[\u200B-\u200D\uFEFF]/g, '')).filter(tag => /\S/.test(tag));
};
