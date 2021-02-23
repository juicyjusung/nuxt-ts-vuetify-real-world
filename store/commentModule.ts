import { Action, Module, VuexModule } from 'vuex-module-decorators';
import { ApiArticle, ReqCreateComment, ReqDeleteComment } from '~/api/article';
import { Comment, isComment } from '~/models/comment';
import { Slug } from '~/store/articleModule';
import { isArrayOf } from '~/types';

@Module({
  name: 'commentModule',
  namespaced: true,
  stateFactory: true,
})
export default class CommentModule extends VuexModule {
  @Action({ rawError: true })
  async getComments(slug: Slug): Promise<Comment[]> {
    const { comments } = await ApiArticle.getComments(slug);
    if (isArrayOf<Comment>(comments, isComment)) {
      return comments;
    }
    return [];
  }

  @Action({ rawError: true })
  async createComment(payload: ReqCreateComment): Promise<Comment | boolean> {
    const { comment } = await ApiArticle.createComment(payload);
    if (isComment(comment)) {
      return comment;
    }
    return false;
  }

  @Action({ rawError: true })
  async deleteComment(payload: ReqDeleteComment): Promise<Comment[] | boolean> {
    const res = await ApiArticle.deleteComment(payload);
    return !!res;
  }
}
