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
  auth: true,
})
export default class Myfeed extends Vue {
  async fetch() {
    try {
      await articleModule.getFeedArticleList();
    } catch (e) {
      notifyErrors(e.message);
    }
  }

  destroyed() {
    articleModule.initArticleList();
  }
}
</script>
