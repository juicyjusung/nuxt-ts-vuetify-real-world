<template>
  <v-app dark class="hi">
    <client-only>
      <notifications position="bottom center" />
    </client-only>
    <Nuxt />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  components: {},
})
export default class Blank extends Vue {}
</script>
