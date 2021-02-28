<template>
  <ArticleListSection
    :loading="$fetchState.pending"
    :article-list="$accessor.articleModule.articleList"
    @fetch="$fetch"
  />
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator';
import { notifyErrors } from '~/utils/notify';
import { articleModule } from '~/utils/store-accessor';

@Component({
  components: {},
  auth: false,
})
export default class TagArticleList extends Vue {
  @Watch('$route.params.tag') tagWatcher(tag: string, prev: string) {
    if (tag !== prev) {
      articleModule.initArticleList();
    }
    this.$fetch();
  }

  async fetch() {
    const { tag } = this.$nuxt.context.params;
    try {
      await articleModule.getArticleList({ tag });
    } catch (e) {
      notifyErrors(e.message);
    }
  }

  destroyed() {
    articleModule.initArticleList();
  }
}
</script>
