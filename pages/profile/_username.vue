<template>
  <v-container class="pa-0" style="height: 100%">
    <v-card style="height: 100%; background-color: #7f7f7f" class="rounded-0">
      <template #progress>
        <v-progress-linear color="deep-purple" height="5" indeterminate></v-progress-linear>
      </template>
      <v-card-title class="white--text py-8">
        <v-avatar size="56">
          <img alt="user" :src="profile.image" />
        </v-avatar>
        <p class="ml-3">{{ profile.username }}</p>
      </v-card-title>
      <v-tabs v-model="tab" align-with-title>
        <v-tabs-slider color="yellow"></v-tabs-slider>
        <v-tab nuxt :to="`/profile/${username}`">My Posts</v-tab>
        <v-tab nuxt :to="`/profile/${username}/favorites`">Favorited Posts</v-tab>
      </v-tabs>
      <v-card-text class="pa-1">
        <nuxt />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Context } from '@nuxt/types';
import { Component, Vue } from 'nuxt-property-decorator';
import { Profile } from '~/models/profile';
import { profileModule } from '~/utils/store-accessor';

@Component({
  components: {},
  auth: false,
})
export default class ProfilePage extends Vue {
  tab = '';
  username = '';
  profile: Profile | null = null;

  async asyncData(ctx: Context) {
    const { username } = ctx.params;
    const profile = await profileModule.getProfile(username);
    return {
      username,
      profile,
    };
  }
}
</script>

<!--<style lang="scss" scoped></style>-->
