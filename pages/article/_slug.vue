<template>
  <ArticleDetailTemplate :article="article">
    <template #title>
      <span class="headline font-weight-bold">{{ article.title }}</span>
    </template>
    <template #articleMeta>
      <UserMeta :article="article" />
      <FollowBtn :author="article.author" />
      <FavoriteHeart :article="article" @onClickFavorite="$nuxt.refresh()" />
    </template>
    <template #articleBody>
      <div class="text--primary pa-4" style="min-height: 500px; background-color: #e2dfd8">
        {{ article.body }}
      </div>
    </template>
    <template #commentSection>
      <v-list>
        <CommentEditor
          v-if="$accessor.userModule.user"
          v-model="commentBody"
          :user="$accessor.userModule.user"
          @addComment="addComment"
        />
        <CommentList :comments="comments" @deleteComment="deleteComment" />
      </v-list>
    </template>
  </ArticleDetailTemplate>
</template>

<script lang="ts">
import { Context } from '@nuxt/types';
import { Component, Vue } from 'nuxt-property-decorator';
import { Article } from '~/models/article';
import { Comment } from '~/models/comment';
import { articleModule, commentModule } from '~/utils/store-accessor';

@Component({
  components: {},
  auth: false,
})
export default class ArticlePage extends Vue {
  article: Article | null = null;
  comments: Comment[] = [];
  commentBody = '';

  async asyncData({ params }: Context) {
    const { slug } = params;
    const article = await articleModule.getArticle(slug);
    return {
      article,
    };
  }

  async fetch() {
    this.comments = await commentModule.getComments(this.article!.slug);
  }

  async addComment() {
    const comment = await commentModule.createComment({
      body: this.commentBody,
      slug: this.article!.slug,
    });
    if (comment) {
      this.commentBody = '';
      this.$fetch();
    }
  }

  async deleteComment(comment: Comment) {
    const success = await commentModule.deleteComment({ slug: this.article!.slug, id: comment.id });
    if (success) {
      this.$fetch();
    }
  }
}
</script>

<!--<style lang="scss" scoped></style>-->
