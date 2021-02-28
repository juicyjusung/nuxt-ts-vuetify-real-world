<template>
  <ArticleItemTemplate>
    <template #article-header>
      <UserMeta :article="article" />
      <FavoriteHeart :article="article" />
    </template>
    <template #article-title>
      <span class="pt-2 headline">{{ article.title }}</span>
    </template>
    <template #article-body>
      <span class="article__body">{{ article.body }}</span>
    </template>
    <template #article-tags>
      <v-chip v-for="(tag, i) in filteredTags" :key="i" class="mx-1 my-1" small :to="`/tag/${tag}`">
        {{ tag }}
      </v-chip>
    </template>
    <template #article-actions>
      <v-btn text nuxt :to="`/article/${article.slug}`">read more</v-btn>
    </template>
  </ArticleItemTemplate>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { Article } from '~/models/article';
import { tagFilter } from '~/utils/tagFilter';

@Component({
  components: {},
})
export default class ArticleItem extends Vue {
  @Prop(Object) article!: Article;

  get filteredTags() {
    return tagFilter(this.article.tagList);
  }
}
</script>
<style lang="scss">
.article__body {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
