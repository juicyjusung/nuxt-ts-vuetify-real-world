<template>
  <validation-provider v-slot="{ errors }" :name="name" :rules="fieldRules">
    <v-text-field
      :value="value"
      outlined
      :label="label"
      :error-messages="errors"
      @input="v => $emit('input', v)"
    />
  </validation-provider>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { ValidationProvider } from 'vee-validate';

@Component({
  name: 'ValidateTextField',
  components: { ValidationProvider },
})
export default class ValidateTextField extends Vue {
  @Prop([String, Number, Object]) value!: object | string | number;
  @Prop(String) name!: string;
  @Prop(Boolean) optional!: boolean;
  @Prop(String) label!: string;
  @Prop(Array) rules!: string[];

  get fieldRules(): string {
    if (this?.rules?.length) {
      return `${this.rules.join('|')}${this.optional ? '' : '|required'}`;
    } else {
      return this.optional ? '' : 'required';
    }
  }
}
</script>
