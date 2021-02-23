<template>
  <v-card>
    <v-card-title>tags</v-card-title>
    <v-card-text>
      <v-chip v-for="(item, i) in tags" :key="i" class="ma-1" small>{{ item }}</v-chip>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { Tag } from '~/models/tag/tag.types';

@Component({
  components: {},
})
export default class TagsCard extends Vue {
  @Prop(Array) tags!: Tag[];
}
</script>
