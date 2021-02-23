import { Tag } from '~/models/tag/tag.types';
import { ResponseType } from '~/types';
import { $axios } from '~/utils/axios';

type ResTags = ResponseType<Tag, 'tags'>;

export const ApiTag = {
  getTags(): ResTags {
    return $axios.get('/tags');
  },
};
