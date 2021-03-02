<template>
  <v-app dark :style="{ background: $vuetify.theme.themes[theme].background }">
    <client-only>
      <notifications position="bottom center" />
    </client-only>
    <v-app-bar app class="px-1 px-sm-5 align-center" flat outlined>
      <JuicyBtn class="px-0" text label="conduit" x-large @click="$router.push('/')"></JuicyBtn>
      <v-spacer />
      <div v-if="!$accessor.userModule.user" class="row justify-end">
        <JuicyBtn label="Sign in" icon="mdi-account-arrow-left" small to="/login" />
        <JuicyBtn label="Sign up" icon="mdi-account-plus-outline" small to="/signup" />
      </div>
      <div v-else class="d-flex">
        <JuicyBtn
          :label="$vuetify.breakpoint.mobile ? 'new' : 'new article'"
          icon="mdi-pencil-plus"
          icon-pos="left"
          small
          @click="newArticleDialog = true"
        />
        <v-menu open-on-hover bottom offset-y>
          <template #activator="{ on, attrs }">
            <v-btn color="primary" v-bind="attrs" small v-on="on">
              {{ $accessor.userModule.user.username }}
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index" link @click="item.onClick">
              <v-list-item-icon>
                <v-icon>
                  {{ item.icon }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title> {{ item.title }}</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-switch v-model="$vuetify.theme.dark" label="Dark mode"></v-switch>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
    <v-main>
      <nuxt />
      <v-fab-transition>
        <v-btn
          class="md-5 mr-3 elevation-21"
          dark
          fab
          button
          right
          color="indigo darken-3"
          fixed
          bottom
          @click="goToTop"
        >
          <v-icon>mdi-chevron-up</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-main>
    <EditorDialog :activate="newArticleDialog" @close="newArticleDialog = false" />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { notifySuccess } from '~/utils/notify';
import { userModule } from '~/utils/store-accessor';

@Component({
  components: {},
})
export default class DefaultLayout extends Vue {
  newArticleDialog = false;

  items = [
    { title: 'my profile', icon: 'mdi-account', onClick: this.onClickMyProfile },
    { title: 'settings', icon: 'mdi-account-settings', onClick: this.onClickSettings },
    { title: 'logout', icon: 'mdi-logout', onClick: this.onClickLogout },
  ];

  get theme() {
    return this.$vuetify.theme.dark ? 'dark' : 'light';
  }

  onClickMyProfile() {
    this.$router.push(`/profile/${userModule.user?.username}`);
  }

  onClickSettings() {
    this.$router.push('/settings');
  }

  async onClickLogout() {
    await this.$auth.logout();
    notifySuccess('Logged Out!');
  }

  goToTop() {
    this.$vuetify.goTo(0);
  }
}
</script>

<style lang="scss">
.notification-title {
  font-size: 16px;
}
</style>
