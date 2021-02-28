<template>
  <v-list-item class="px-0">
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
      <v-list-item-title>
        <nuxt-link :to="`/profile/${article.author.username}`" class="white--text">
          {{ article.author.username }}
        </nuxt-link>
      </v-list-item-title>
      <v-list-item-title>{{ article.createdAt | timeFormat }}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { Article } from '~/models/article';

@Component({
  components: {},
})
export default class UserMeta extends Vue {
  @Prop(Object) article!: Article;
}
</script>
