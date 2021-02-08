<template>
  <validation-observer ref="observer" v-slot="{}">
    <form @submit.prevent="login">
      <validation-provider v-slot="{ errors }" name="email" rules="required|email">
        <v-text-field
          v-model="userLoginObj.email"
          :error-messages="errors"
          label="E-mail"
          required
        ></v-text-field>
      </validation-provider>
      <!-- password -->
      <validation-provider v-slot="{ errors }" name="Password" rules="required|min:8">
        <v-text-field
          v-model="userLoginObj.password"
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
import { UserRegisterForm } from '~/entity/user';
import { UserLoginForm } from '~/models/user/user';
import { notifySuccess } from '~/utils/notify';
setInteractionMode('eager');

@Component({
  components: { ValidationProvider, ValidationObserver },
  layout: 'empty',
})
export default class LoginForm extends Vue {
  userLoginObj = new UserLoginForm();
  observer: any = null;

  /*********************************************************************************
   * Life Cycles
   * ******************************************************************************/
  mounted() {
    this.observer = this.$refs.observer as object;
    this.userLoginObj.email = 'juicyjusung2@gmail.com';
    this.userLoginObj.password = 'juicyjusung2';
  }

  /*********************************************************************************
   * Methods
   * ******************************************************************************/
  async login() {
    const validation = await this.observer.validate();
    if (validation) {
      const res = await this.$auth.loginWith('jwtStrategy', { data: { user: this.userLoginObj } });
      if (res) {
        notifySuccess('Logged In!');
        return await this.$router.push('/');
      }
    }
  }

  clear() {
    this.userLoginObj = new UserRegisterForm();
    this.observer.reset();
  }
}
</script>

<!--<style lang="scss" scoped></style>-->
