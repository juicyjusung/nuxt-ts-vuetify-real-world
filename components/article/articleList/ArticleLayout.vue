<template>
  <v-col cols="12">
    <v-hover v-slot="{ hover }">
      <v-card :elevation="hover ? 12 : 2">
        <v-card-title class="pa-1">
          <v-list-item class="grow">
            <slot name="article-header" />
          </v-list-item>
        </v-card-title>
        <v-card-subtitle class="py-2">
          <slot name="article-title" />
        </v-card-subtitle>
        <v-card-text>
          <slot name="article-body" />
        </v-card-text>
        <v-card-actions class="justify-center">
          <slot name="article-actions" />
        </v-card-actions>
      </v-card>
    </v-hover>
  </v-col>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { Article } from '~/models/article';

@Component({
  components: {},
})
export default class ArticleLayout extends Vue {
  @Prop(Object) article!: Article;
}
</script>
