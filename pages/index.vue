<template>
  <v-container>
    <juicy-content>
      <template #main>
        <article-list :article-list="$accessor.articleModule.articleList" />
        <article-loading v-if="loading" />
      </template>
      <template #sider>
        <v-card>
          <v-card-title>tags</v-card-title>
          <v-card-text>
            <v-chip class="ma-1">hi</v-chip>
            <v-chip class="ma-1">hi</v-chip>
            <v-chip class="ma-1">hi</v-chip>
            <v-chip class="ma-1">hi</v-chip>
          </v-card-text>
        </v-card>
      </template>
    </juicy-content>
    <v-fab-transition>
      <v-btn
        class="md-5 mr-3 elevation-21"
        dark
        fab
        button
        right
        color="indigo darken-3"
        fixed
        bottom
        @click="top"
      >
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
    </v-fab-transition>

    <div id="scroll-observer" ref="scrollObserver" />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { articleModule } from '~/utils/store-accessor';

@Component({
  components: {},
  auth: 'guest',
  async asyncData() {},
})
export default class Home extends Vue {
  loading = false;
  observer = null;
  async created() {
    await this.fetchArticleList();
    // this.initIntersectionObserver();
  }

  mounted() {}

  // initIntersectionObserver() {
  //   const io = new IntersectionObserver(
  //     (entries, observer) => {
  //       entries.forEach(entry => {
  //         if (entry.isIntersecting) {
  //           this.fetchArticleList();
  //         }
  //       });
  //     },
  //     {
  //       rootMargin: '0px 0px 400px 0px',
  //     }
  //   );
  //
  //   io.observe(this.$refs.scrollObserver);
  // }

  async update() {
    await this.fetchArticleList();
  }

  async fetchArticleList() {
    this.loading = true;
    await articleModule.getArticleList();
    this.loading = false;
  }

  top() {
    window.scrollTo(0, 0);
  }
}
</script>
