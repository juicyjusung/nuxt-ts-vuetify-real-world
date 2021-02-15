<template>
  <v-row>
    <v-col v-for="i in 20" :key="i" cols="12">
      <v-skeleton-loader
        class="mx-auto"
        type="list-item-avatar, card-heading, list-item-two-line, actions@1"
      ></v-skeleton-loader>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  components: {},
})
export default class ArticleCard extends Vue {}
</script>
