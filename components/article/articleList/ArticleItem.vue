<template>
  <ArticleLayout>
    <template #article-header>
      <UserMeta :article="article" />
      <favorite-heart :article="article" />
    </template>
    <template #article-title>
      <span class="pt-2 headline">{{ article.title }}</span>
    </template>
    <template #article-body>
      <span class="article__body">{{ article.body }}</span>
    </template>
    <template #article-actions>
      <nuxt-link :to="`/article/${article.slug}`">
        <v-btn text>read more</v-btn>
      </nuxt-link>
      <v-spacer />
      <v-chip v-for="(tag, i) in article.tagList" :key="i" class="mx-1">{{ tag }}</v-chip>
    </template>
  </ArticleLayout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { Article } from '~/models/article';

@Component({
  components: {},
})
export default class ArticleItem extends Vue {
  @Prop(Object) article!: Article;
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
