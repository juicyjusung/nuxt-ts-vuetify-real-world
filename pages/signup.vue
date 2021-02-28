<template>
  <FluidCardTemplate>
    <template #header> signup </template>
    <template #body>
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
        </form>
      </validation-observer>
    </template>
    <template #actions>
      <v-btn class="mx-4" type="submit" color="primary" @click="submit"> submit </v-btn>
      <v-btn class="mx-4" nuxt to="/"> cancel </v-btn>
    </template>
  </FluidCardTemplate>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { setInteractionMode, ValidationObserver, ValidationProvider } from 'vee-validate';
import { UserSignupForm } from '~/models/user/user-signup';
import { notifySuccess } from '~/utils/notify';
import { userModule } from '~/utils/store-accessor';
setInteractionMode('eager');

@Component({
  components: { ValidationProvider, ValidationObserver },
  auth: 'guest',
})
export default class signup extends Vue {
  @Prop({ type: String, default: '' }) value!: string;
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
