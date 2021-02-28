<template>
  <v-container fluid class="fill-height">
    <v-row justify="center" align="center" class="pa-3">
      <v-card elevation="2" outlined class="pa-3 col" max-width="400px">
        <v-card-title>
          <slot name="header" />
        </v-card-title>
        <v-card-text>
          <slot name="body" />
        </v-card-text>
        <v-card-actions class="justify-center">
          <slot name="actions" />
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  components: {},
})
export default class FluidCardTemplate extends Vue {}
</script>
