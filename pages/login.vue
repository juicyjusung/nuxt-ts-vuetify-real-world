<template>
  <FluidCardTemplate>
    <template #header> Login </template>
    <template #body>
      <validation-observer ref="observer" v-slot="{}">
        <form @submit.prevent="login">
          <validation-provider v-slot="{ errors }" name="email" rules="required|email">
            <v-text-field
              v-model="user.email"
              :error-messages="errors"
              label="E-mail"
              required
              @keypress.enter="login"
            ></v-text-field>
          </validation-provider>
          <!-- password -->
          <validation-provider v-slot="{ errors }" name="Password" rules="required|min:8">
            <v-text-field
              v-model="user.password"
              :error-messages="errors"
              label="Password"
              required
              type="password"
              @keypress.enter="login"
            ></v-text-field>
          </validation-provider>
        </form>
      </validation-observer>
    </template>
    <template #actions>
      <juicy-btn class="mx-4" type="submit" label="login" @click="login" />
    </template>
  </FluidCardTemplate>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { setInteractionMode, ValidationObserver, ValidationProvider } from 'vee-validate';
import { UserLoginForm } from '~/models/user/user-login';
import { notifySuccess } from '~/utils/notify';
setInteractionMode('eager');

@Component({
  components: { ValidationProvider, ValidationObserver },
  auth: 'guest',
})
export default class login extends Vue {
  user = new UserLoginForm();

  async login() {
    const observer = this.$refs.observer as InstanceType<typeof ValidationObserver>;
    const validation = await observer.validate();
    if (validation) {
      const res = await this.$auth.loginWith('jwtStrategy', { data: { user: this.user } });
      if (res) {
        notifySuccess('Logged In!');
        return await this.$router.push('/');
      }
    }
  }
}
</script>
