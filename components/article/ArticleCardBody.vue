<template>
  <div>
    <v-card-subtitle class="pt-2 headline">{{ article.title }}</v-card-subtitle>
    <v-card-text>
      <span class="article__body">{{ article.body }}</span>
    </v-card-text>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { Article } from '~/models/article/article';

@Component({
  components: {},
})
export default class ArticleCardBody extends Vue {
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
