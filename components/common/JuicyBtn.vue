<template>
  <v-btn :color="color || 'primary'" class="mx-2" @click="$emit('click')">
    <v-icon v-if="(icon && !iconPos) || iconPos === 'left'" left>{{ icon }}</v-icon>
    {{ label }}
    <v-icon v-if="iconPos === 'right'" right>{{ icon }}</v-icon>
  </v-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component({
  components: {},
})
export default class Home extends Vue {
  @Prop(String) color!: string;
  @Prop(String) iconPos!: 'left' | 'right';
  @Prop(String) icon!: string;
  @Prop(String) label!: string;
}
</script>
