<template>
  <v-container class="pa-0 py-4" style="height: 100%">
    <v-card style="height: 100%" class="rounded-0">
      <template #progress>
        <v-progress-linear color="deep-purple" height="5" indeterminate></v-progress-linear>
      </template>
      <v-card-title class="white--text py-8 align-center justify-center flex-column">
        <v-avatar size="64" class="flex">
          <img alt="user" :src="profile.image" />
        </v-avatar>
        <span class="my-4 text--primary">{{ profile.username }}</span>
        <span class="caption text--primary">{{ profile.bio }}</span>
        <JuicyBtn
          v-if="
            $accessor.userModule.isLoggedIn &&
            profile.username === $accessor.userModule.user.username
          "
          label="Edit Profile Settings"
          small
          class="align-self-end"
          icon="mdi-account-settings"
          @click="$router.push('/settings')"
        />
      </v-card-title>
      <v-tabs v-model="tab" align-with-title class="mb-4">
        <v-tabs-slider color="accent"></v-tabs-slider>
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
