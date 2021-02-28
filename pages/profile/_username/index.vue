<template>
  <ArticleListSection
    :loading="$fetchState.pending"
    :article-list="$accessor.articleModule.articleList"
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
export default class ProfileMyPosts extends Vue {
  async fetch() {
    const { username } = this.$nuxt.context.params;
    try {
      await articleModule.getArticleList({ author: username });
    } catch (e) {
      notifyErrors(e.message);
    }
  }

  destroyed() {
    articleModule.initArticleList();
  }
}
</script>

<!--<style lang="scss" scoped></style>-->
