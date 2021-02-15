<template>
  <v-row>
    <article-card v-for="(article, i) in articleList" :key="i" :article="article" />
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { Article } from '~/models/article/article';

@Component({
  components: {},
})
export default class ArticleList extends Vue {
  @Prop(Array) articleList!: Article[];
}
</script>
