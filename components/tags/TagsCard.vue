<template>
  <v-card>
    <v-card-title>tags</v-card-title>
    <v-card-text>
      <v-chip v-for="(item, i) in tags" :key="i" class="ma-1" small @click="onClickTag(item)">
        {{ item }}
      </v-chip>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator';
import { Tag } from '~/models/tag/tag.types';

@Component({
  components: {},
})
export default class TagsCard extends Vue {
  @Prop(Array) tags!: Tag[];
  @Emit('click') onClickTag(tag): Tag {
    return tag;
  }
}
</script>
