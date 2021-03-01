<template>
  <FluidCardTemplate>
    <template #header> Your Settings </template>
    <template v-if="userSettings" #body>
      <validation-observer ref="observer" v-slot="{}">
        <form @submit.prevent="submit">
          <validation-provider v-slot="{ errors }" name="User image">
            <v-text-field
              v-model="userSettings.image"
              :error-messages="errors"
              label="URL of profile image"
            ></v-text-field>
          </validation-provider>
          <validation-provider v-slot="{ errors }" name="User name" rules="required">
            <v-text-field
              v-model="userSettings.username"
              :error-messages="errors"
              label="User name"
              required
            ></v-text-field>
          </validation-provider>
          <validation-provider v-slot="{ errors }" name="User bio" rules="required">
            <v-textarea
              v-model="userSettings.bio"
              label="Short bio about you"
              :error-messages="errors"
            />
          </validation-provider>
          <validation-provider v-slot="{ errors }" name="User email" rules="required">
            <v-text-field
              v-model="userSettings.email"
              :error-messages="errors"
              label="User email"
              required
            ></v-text-field>
          </validation-provider>
          <validation-provider v-slot="{ errors }" name="Password" rules="required|min:8">
            <v-text-field
              v-model="userSettings.password"
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
      <v-btn class="mx-4" type="submit" color="primary" @click="submit"> Update Settings </v-btn>
    </template>
  </FluidCardTemplate>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { setInteractionMode, ValidationObserver, ValidationProvider } from 'vee-validate';
import { UserSettings } from '~/models/user/user-settings';
import { notifyErrors, notifySuccess } from '~/utils/notify';
import { userModule } from '~/utils/store-accessor';
setInteractionMode('eager');

@Component({
  components: { ValidationProvider, ValidationObserver },
  auth: true,
})
export default class Settings extends Vue {
  userSettings: UserSettings | null = null;
  async asyncData() {
    const user = await userModule.whoami();
    return {
      userSettings: new UserSettings(user),
    };
  }

  async submit() {
    const observer = this.$refs.observer as InstanceType<typeof ValidationObserver>;
    const validation = await observer.validate();
    if (validation && this.userSettings) {
      try {
        await userModule.updateUser(this.userSettings.payload);
        await userModule.whoami();
        await this.$router.push('/');
        notifySuccess('Update success!');
      } catch (error) {
        notifyErrors(error.message);
      }
    }
  }
}
</script>
