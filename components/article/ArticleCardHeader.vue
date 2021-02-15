<template>
  <v-card-title class="pa-1">
    <v-list-item class="grow">
      <v-list-item-avatar color="grey darken-3">
        <v-img
          v-if="article.author.image"
          class="elevation-6"
          alt=""
          :src="article.author.image"
        ></v-img>
        <span v-else>{{ article.author.username.trim()[0] }}</span>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>{{ article.author.username }}</v-list-item-title>
        <v-list-item-title>{{ article.createdAt.toLocaleString() }}</v-list-item-title>
      </v-list-item-content>

      <v-row align="center" justify="end">
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
      </v-row>
    </v-list-item>
  </v-card-title>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { Article } from '~/models/article/article';
import { articleModule } from '~/utils/store-accessor';

@Component({
  components: {},
})
export default class ArticleCardHeader extends Vue {
  @Prop(Object) article!: Article;

  async onClickFavorite(options: { favorited: boolean; slug: string }): Promise<void> {
    switch (options.favorited) {
      case true:
        await articleModule.cancelFavoriteArticle(options.slug);
        break;
      case false:
        await articleModule.favoriteArticle(options.slug);
        break;
    }
  }
}
</script>
