<template>
  <ArticleListSection
    :loading="$fetchState.pending"
    :article-list="$accessor.articleModule.articleList"
    @fetch="$fetch"
  />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { notifyErrors } from '~/utils/notify';
import { articleModule } from '~/utils/store-accessor';

@Component({
  components: {},
  auth: false,
})
export default class GlobalFeed extends Vue {
  async fetch() {
    try {
      await articleModule.getArticleList();
    } catch (e) {
      notifyErrors(e.message);
    }
  }

  destroyed() {
    articleModule.initArticleList();
  }
}
</script>
