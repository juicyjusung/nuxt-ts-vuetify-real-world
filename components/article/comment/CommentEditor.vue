<template>
  <v-list-item class="px-0">
    <v-list-item-avatar class="align-self-start">
      <v-img :src="user.image"></v-img>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>{{ user.username }}</v-list-item-title>
      <v-list-item-subtitle style="white-space: pre-wrap; overflow: auto" class="mt-2">
        <v-textarea
          flat
          outlined
          hide-details
          placeholder="Wrie a comment..."
          :value="value"
          @input="inputValue"
        ></v-textarea>
      </v-list-item-subtitle>
      <v-list-item-subtitle class="d-flex ma-2">
        <v-spacer />
        <JuicyBtn label="Add Comment" small @click="addComment"></JuicyBtn>
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator';

import { User } from '~/models/user';

@Component({
  components: {},
})
export default class CommentEditor extends Vue {
  @Prop(Object) user!: User;
  @Prop({ type: String, default: '' }) value!: string;
  @Emit('input') inputValue(val: string) {
    return val;
  }

  @Emit('addComment') addComment() {}
}
</script>
