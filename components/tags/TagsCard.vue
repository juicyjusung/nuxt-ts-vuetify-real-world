<template>
  <v-hover v-slot="{ hover }">
    <v-card :elevation="hover ? 2 : 0" flat outlined>
      <v-card-title class="justify-center">tags</v-card-title>
      <v-card-text>
        <v-chip v-for="(item, i) in tags" :key="i" class="ma-1" small @click="onClickTag(item)">
          {{ item }}
        </v-chip>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator';
import { Tag } from '~/models/tag/tag.types';

@Component({
  components: {},
})
export default class TagsCard extends Vue {
  @Prop(Array) tags!: Tag[];
  @Emit('click') onClickTag(tag: string): Tag {
    return tag;
  }
}
</script>
