<template>
  <v-row class="flex-column-reverse flex-sm-row">
    <v-col class="col-12 col-sm-9" order-xs="1" order-sm="0">
      <slot name="main" />
    </v-col>
    <v-col class="col-12 col-sm-3" order-xs="0" order-sm="1">
      <v-row>
        <v-col>
          <slot v-col name="sider" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  components: {},
})
export default class HomeContentTemplate extends Vue {}
</script>
