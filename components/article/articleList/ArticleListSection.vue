<template>
  <section>
    <ArticleList :article-list="articleList" @fetch="onFetch" />
    <ArticleLoading v-if="loading" />
    <ArticleLoading v-if="!loading && articleList.length === 0" no-data @click="$nuxt.refresh()" />
  </section>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator';
import { Article } from '~/models/article';

@Component({
  components: {},
})
export default class ArticleListSection extends Vue {
  @Prop(Boolean) loading!: boolean;
  @Prop(Array) articleList!: Article[];
  @Emit('fetch') onFetch() {}
}
</script>

<style lang="scss">
.v-skeleton-loader__actions {
  text-align: left;
}
</style>
