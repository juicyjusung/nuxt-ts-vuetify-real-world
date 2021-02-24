<template>
  <div>
    <div v-for="(comment, index) in comments" :key="comment.id">
      <v-divider :key="`d-${index}`" inset></v-divider>
      <CommentItem :comment="comment" :index="index" @deleteComment="deleteComment" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator';
import { Comment } from '~/models/comment';

@Component({
  components: {},
})
export default class CommentList extends Vue {
  @Prop(Array) comments!: Comment[];
  @Emit('deleteComment') deleteComment(comment: Comment) {
    return comment;
  }
}
</script>
