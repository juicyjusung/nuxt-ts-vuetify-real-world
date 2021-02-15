<template>
  <v-col cols="12">
    <v-hover v-slot="{ hover }">
      <v-card :elevation="hover ? 12 : 2">
        <article-card-header :article="article" />
        <article-card-body :article="article" />
        <article-card-actions :article="article" />
      </v-card>
    </v-hover>
  </v-col>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { Article } from '~/models/article/article';

@Component({
  components: {},
})
export default class ArticleCard extends Vue {
  @Prop(Object) article!: Article;
}
</script>
