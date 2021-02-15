<template>
  <v-card-actions class="justify-center">
    <v-btn text>read more</v-btn>
    <v-spacer />
    <v-chip v-for="(tag, i) in article.tagList" :key="i" class="mx-1">{{ tag }}</v-chip>
  </v-card-actions>
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
