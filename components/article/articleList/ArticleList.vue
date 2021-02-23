<template>
  <v-row>
    <article-item v-for="(article, i) in articleList" :key="i" :article="article" />
    <div id="scroll-observer" ref="scrollObserver" />
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

  scrollObserver: Element | null = null;

  mounted() {
    this.scrollObserver = this.$refs.scrollObserver as Element;
    this.initIntersectionObserver(this.scrollObserver);
  }

  initIntersectionObserver(observer: Element) {
    const io = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.$emit('fetch');
          }
        });
      },
      {
        rootMargin: '0px 0px 400px 0px',
      }
    );
    io.observe(observer);
  }
}
</script>
