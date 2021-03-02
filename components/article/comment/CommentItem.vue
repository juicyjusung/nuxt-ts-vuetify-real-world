<template>
  <v-list-item :key="comment.id" class="px-0">
    <v-list-item-avatar class="align-self-start">
      <v-img :src="comment.author.image"></v-img>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title class="flex-row d-flex align-center">
        <div class="flex-column flex-sm-row d-flex grow">
          <nuxt-link
            :to="`/profile/${comment.author.username}`"
            class="font-weight-medium text--primary"
          >
            {{ comment.author.username }}
          </nuxt-link>

          <span class="ml-0 ml-sm-2 caption">
            {{ comment.createdAt | timeFormat }}
          </span>
        </div>
        <v-btn v-if="isMyComment" icon x-small @click="deleteComment(comment)">
          <v-icon>mdi-trash-can-outline</v-icon>
        </v-btn>
      </v-list-item-title>
      <v-list-item-title> </v-list-item-title>
      <v-list-item-subtitle
        class="my-2"
        style="white-space: pre-wrap; overflow: auto"
        v-text="comment.body"
      ></v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator';
import { Comment } from '~/models/comment';
import { userModule } from '~/utils/store-accessor';

@Component({
  components: {},
})
export default class CommentItem extends Vue {
  @Prop(Object) comment!: Comment;
  get isMyComment() {
    return userModule?.user && userModule.user.username === this.comment.author.username;
  }

  @Emit('deleteComment') deleteComment(comment: Comment) {
    return comment;
  }

  onClickDelete() {}
}
</script>
