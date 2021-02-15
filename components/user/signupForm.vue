<template>
  <validation-observer ref="observer" v-slot="{}">
    <form @submit.prevent="submit">
      <validation-provider v-slot="{ errors }" name="username" rules="required">
        <v-text-field
          v-model="user.username"
          :error-messages="errors"
          label="Username"
          required
        ></v-text-field>
      </validation-provider>
      <validation-provider v-slot="{ errors }" name="email" rules="required|email">
        <v-text-field
          v-model="user.email"
          :error-messages="errors"
          label="Email"
          required
        ></v-text-field>
      </validation-provider>
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
        <v-btn class="mx-4" type="submit" color="primary"> submit </v-btn>
        <v-btn class="mx-4" to="/"> cancel </v-btn>
      </v-row>
    </form>
  </validation-observer>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate';
import { UserSignupForm } from '~/models/user/user';
import { notifySuccess } from '~/utils/notify';
import { userModule } from '~/utils/store-accessor';
setInteractionMode('eager');

@Component({
  components: { ValidationProvider, ValidationObserver },
  layout: 'empty',
})
export default class SignupForm extends Vue {
  user = new UserSignupForm();

  async submit() {
    const observer = this.$refs.observer as InstanceType<typeof ValidationObserver>;
    const validation = await observer.validate();
    if (validation) {
      const user = await userModule.signup(this.user);
      if (user) {
        await this.$router.push('/login');
        notifySuccess('Signup success!');
      }
    }
  }
}
</script>

<!--<style lang="scss" scoped></style>-->
