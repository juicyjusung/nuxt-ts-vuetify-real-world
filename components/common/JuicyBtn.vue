<template>
  <v-btn
    :color="color || 'primary'"
    class="mx-2"
    :x-small="xSmall || false"
    :small="small || false"
    :large="large || false"
    :x-large="xLarge || false"
    @click="$emit('click')"
  >
    <v-icon v-if="(icon && !iconPos) || iconPos === 'left'" left>{{ icon }}</v-icon>
    {{ label }}
    <v-icon v-if="iconPos === 'right'" right>{{ icon }}</v-icon>
  </v-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component({
  name: 'JuicyBtn',
  components: {},
})
export default class JuicyBtn extends Vue {
  @Prop(String) color!: string;
  @Prop(String) iconPos!: 'left' | 'right';
  @Prop(String) icon!: string;
  @Prop(String) label!: string;
  @Prop(Boolean) xSmall!: boolean;
  @Prop(Boolean) small!: boolean;
  @Prop(Boolean) large!: boolean;
  @Prop(Boolean) xLarge!: boolean;
}
</script>
