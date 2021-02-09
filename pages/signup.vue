<template>
  <v-container fluid class="fill-height">
    <v-row justify="center" align="center">
      <v-card elevation="2" outlined class="pa-3" min-width="400">
        <v-card-title> signup </v-card-title>
        <v-card-text>
          <signup-form />
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import SignupForm from '~/components/user/signupForm.vue';

@Component({
  components: { SignupForm },
  auth: 'guest',
})
export default class signup extends Vue {
  @Prop({ type: String, default: '' }) value!: string;
}
</script>

<!--<style lang="scss" scoped></style>-->
