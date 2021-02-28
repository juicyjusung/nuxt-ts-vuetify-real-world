<template>
  <v-row>
    <v-col
      v-for="(article, i) in articleList"
      :key="i"
      v-intersect="onIntersect"
      :data-user="i"
      :data-last="i === articleList.length - 1"
      cols="12"
    >
      <ArticleItem :key="article.slug" :article="article" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'nuxt-property-decorator';
import { ValidationObserver } from 'vee-validate';
import { Article } from '~/models/article';

@Component({
  components: {},
})
export default class ArticleList extends Vue {
  @Prop(Array) articleList!: Article[];
  @Emit('fetch') onFetch() {}
  page = 0;
  lastPage = 0;
  lastTarget: HTMLElement | null = null;

  onIntersect(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
    const entry = entries[0];
    const target = entry.target as HTMLElement;
    if (entry.isIntersecting && target.dataset.last) {
      if (this.lastTarget !== target) {
        this.onFetch();
        this.lastTarget = target;
      }
    }
  }
}
</script>
