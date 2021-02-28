<template>
  <v-container class="pa-0" style="height: 100%">
    <v-col cols="12">
      <v-card>
        <v-card-title class="px-1 px-sm-4">
          <slot name="title" />
        </v-card-title>
        <v-card-subtitle class="px-1 px-sm-4 d-flex align-center flex-column flex-sm-row">
          <slot name="articleMeta" />
        </v-card-subtitle>
        <v-card-text>
          <slot name="articleBody" />
        </v-card-text>
        <v-card-text>
          <slot name="commentSection" />
        </v-card-text>
      </v-card>
    </v-col>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { Article } from '~/models/article';

@Component({
  components: {},
})
export default class ArticleCard extends Vue {
  @Prop(Object) article!: Article;
}
</script>
