<template>
  <v-container>
    <juicy-content>
      <template #main>
        <article-list
          :article-list="$accessor.articleModule.articleList"
          @fetch="fetchArticleList"
        />
        <article-loading v-if="loading" />
      </template>
      <template #sider>
        <tags-card :tags="tags" />
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
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { notifyErrors } from '~/utils/notify';
import { articleModule, tagModule } from '~/utils/store-accessor';

@Component({
  components: {},
  auth: 'guest',
})
export default class Home extends Vue {
  observer = null;
  loading = false;
  tags = [];
  async asyncData(): Promise<void | object> {
    return {
      tags: await tagModule.getTags(),
    };
  }

  async created() {
    await this.fetchArticleList();
  }

  async fetchArticleList() {
    this.loading = true;
    try {
      await articleModule.getArticleList();
    } catch (e) {
      notifyErrors(e.message);
    }

    this.loading = false;
  }

  top() {
    window.scrollTo(0, 0);
  }
}
</script>
