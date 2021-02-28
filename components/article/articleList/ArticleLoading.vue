<template>
  <v-row>
    <v-col>
      <v-hover v-slot="{ hover }">
        <v-card :elevation="hover ? 12 : 2">
          <v-skeleton-loader
            class="mx-auto"
            type="list-item-avatar, card-heading, list-item-two-line, actions@1"
          ></v-skeleton-loader>
          <v-overlay absolute :value="noData">
            <v-btn color="primary" @click="$emit('click')">No data (Refresh on click)</v-btn>
          </v-overlay>
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component({
  components: {},
})
export default class ArticleLoading extends Vue {
  @Prop(Boolean) noData!: boolean;
}
</script>
