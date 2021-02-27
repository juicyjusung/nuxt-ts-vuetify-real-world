<template>
  <div class="align-center col-auto">
    <v-btn
      class="mx-1"
      :color="article.favorited ? 'red' : 'grey'"
      text
      icon
      :disabled="!$accessor.userModule.user"
      @click="onClickFavorite({ favorited: article.favorited, slug: article.slug })"
    >
      <v-icon> mdi-heart </v-icon>
    </v-btn>
    <span class="subheading" style="overflow: auto">{{ article.favoritesCount }}</span>
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

  @Emit('onClickFavorite')
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
    } catch (e) {
      notifyErrors(e.message);
    }
  }
}
</script>
