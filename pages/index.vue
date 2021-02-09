<template>
  <v-layout row wrap justify-center class="pt-10">
    <v-row class="d-flex flex-row justify-center" style="max-width: 500px"> </v-row>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  components: {},
  auth: 'guest',
  async asyncData() {},
})
export default class Home extends Vue {
  created() {}
}
</script>
