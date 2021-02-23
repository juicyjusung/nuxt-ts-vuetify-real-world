<template>
  <v-app dark>
    <client-only>
      <notifications position="bottom center" />
    </client-only>
    <v-app-bar app class="px-1 px-sm-5 justify-center align-center">
      <nuxt-link to="/">
        <v-btn text small class="px-0">conduit</v-btn>
      </nuxt-link>
      <v-spacer />
      <div v-if="!$accessor.userModule.user">
        <nuxt-link to="/login">
          <juicy-btn label="Sign in" icon="mdi-account-arrow-left" small />
        </nuxt-link>
        <nuxt-link to="/signup">
          <juicy-btn label="Sign up" icon="mdi-account-plus-outline" small />
        </nuxt-link>
      </div>
      <div v-else class="d-flex">
        <juicy-btn
          label="new article"
          icon="mdi-pencil-plus"
          icon-pos="left"
          small
          @click="newArticleDialog = true"
        ></juicy-btn>
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
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
    <editor-dialog :activate="newArticleDialog" @close="newArticleDialog = false" />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { notifySuccess } from '~/utils/notify';

@Component({
  components: {},
})
export default class DefaultLayout extends Vue {
  newArticleDialog = false;

  items = [
    { title: 'settings', icon: 'mdi-account-settings', onClick: this.onClickSettings },
    { title: 'logout', icon: 'mdi-logout', onClick: this.onClickLogout },
  ];

  async onClickSettings() {}

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
