<template>
  <v-app dark>
    <client-only>
      <notifications position="bottom center" />
    </client-only>
    <v-app-bar app class="px-10 justify-center align-center">
      <nuxt-link to="/"> Home </nuxt-link>
      <v-spacer />
      <div v-if="!$accessor.userModule.user">
        <nuxt-link to="/login">
          <juicy-btn label="Sign in" icon="mdi-account-arrow-left" />
        </nuxt-link>
        <nuxt-link to="/signup">
          <juicy-btn label="Sign up" icon="mdi-account-plus-outline" />
        </nuxt-link>
      </div>
      <div v-else>
        <juicy-btn label="new article" icon="mdi-pencil-plus" icon-pos="left"></juicy-btn>
        <v-menu open-on-hover bottom offset-y>
          <template #activator="{ on, attrs }">
            <v-btn color="primary" v-bind="attrs" v-on="on">
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
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { notifySuccess } from '~/utils/notify';

@Component({
  components: {},
  transition: {
    name: 'page',
    mode: 'out-in',
  },
})
export default class DefaultLayout extends Vue {
  items = [
    { title: 'settings', icon: 'mdi-account-settings', onClick: this.onClickSettings },
    { title: 'logout', icon: 'mdi-logout', onClick: this.onClickLogout },
  ];

  async onClickSettings() {
    console.log('%c [JL] onClickSettings - settings', 'font-size: 13px; color:  orange;');
  }

  async onClickLogout() {
    await this.$auth.logout();
    notifySuccess('Logged Out!');
  }
}
</script>

<style lang="scss">
.notification-title {
  font-size: 16px;
}
</style>
