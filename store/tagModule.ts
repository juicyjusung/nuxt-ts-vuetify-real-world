import { Action, Module, VuexModule } from 'vuex-module-decorators';
import { ApiTag } from '~/api/tag';
import { isTag, Tag } from '~/models/tag/tag.types';
import { isArrayOf } from '~/types';

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
      return tags
        .map(tag => tag.replace(/[\u200B-\u200D\uFEFF]/g, ''))
        .filter(tag => /\S/.test(tag));
    }
    return [];
  }
}
