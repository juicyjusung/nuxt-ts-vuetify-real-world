<template>
  <validation-observer ref="observer" v-slot="{}">
    <form @submit.prevent="login">
      <validation-provider v-slot="{ errors }" name="email" rules="required|email">
        <v-text-field
          v-model="user.email"
          :error-messages="errors"
          label="E-mail"
          required
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
        ></v-text-field>
      </validation-provider>
      <v-row justify="center" class="mt-5">
        <juicy-btn class="mx-4" type="submit" label="login" />
      </v-row>
    </form>
  </validation-observer>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate';
import { UserLoginForm } from '~/models/user/user';
import { notifySuccess } from '~/utils/notify';
import JuicyBtn from '~/components/common/JuicyBtn.vue';
setInteractionMode('eager');

@Component({
  components: { ValidationProvider, ValidationObserver, JuicyBtn },
  layout: 'empty',
})
export default class LoginForm extends Vue {
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

  clear() {
    this.user = new UserLoginForm();
    (this.$refs.observer as InstanceType<typeof ValidationObserver>).reset();
  }
}
</script>

<!--<style lang="scss" scoped></style>-->
