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
        <juicy-btn
          label="Log out"
          icon="mdi-account-arrow-right"
          @click="onClickLogout"
        ></juicy-btn>
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
