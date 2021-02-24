<template>
  <div class="d-flex align-center">
    <v-btn
      class="ma-2"
      :color="article.favorited ? 'red' : 'grey'"
      text
      icon
      :disabled="!$auth.loggedIn"
      @click="onClickFavorite({ favorited: article.favorited, slug: article.slug })"
    >
      <v-icon> mdi-heart </v-icon>
    </v-btn>
    <span class="subheading mr-2">{{ article.favoritesCount }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator';
import { Article } from '~/models/article';
import { notifyErrors } from '~/utils/notify';
import { articleModule } from '~/utils/store-accessor';

@Component({
  components: {},
})
export default class FavoriteHeart extends Vue {
  @Prop(Object) article!: Article;

  async onClickFavorite(options: { favorited: boolean; slug: string }): Promise<void> {
    try {
      switch (options.favorited) {
        case true:
          await articleModule.cancelFavoriteArticle(options.slug);
          break;
        case false:
          await articleModule.favoriteArticle(options.slug);
          break;
      }
      await this.$nuxt.refresh();
    } catch (e) {
      notifyErrors(e.message);
    }
  }
}
</script>
