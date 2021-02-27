import { Action, Module, VuexModule } from 'vuex-module-decorators';
import { ApiTag } from '~/api/tag';
import { isTag, Tag } from '~/models/tag/tag.types';
import { isArrayOf } from '~/types';
import { tagFilter } from '~/utils/tagFilter';

@Module({
  name: 'tagModule',
  namespaced: true,
  stateFactory: true,
})
export default class TagModule extends VuexModule {
  @Action({ rawError: true })
  async getTags(): Promise<Tag[]> {
    const { tags } = await ApiTag.getTags();
    if (isArrayOf<Tag>(tags, isTag)) {
      return tagFilter(tags);
    }
    return [];
  }
}
