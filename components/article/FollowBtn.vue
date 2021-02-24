<template>
  <juicy-btn
    :label="isFollowing ? 'UNFOLLOW' : 'FOLLOW'"
    x-small
    :color="isFollowing ? 'red' : 'primary'"
    @click="onClickFollow"
  />
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator';
import { Author } from '~/models/author';
import { profileModule } from '~/utils/store-accessor';

@Component({
  components: {},
})
export default class FollowBtn extends Vue {
  @Prop(Object) author!: Author;

  get isFollowing() {
    return this.author.following;
  }

  async onClickFollow() {
    if (this.isFollowing) {
      await profileModule.unfollowUser(this.author.username);
    } else {
      await profileModule.followUser(this.author.username);
    }
    await this.$nuxt.refresh();
  }
}
</script>
