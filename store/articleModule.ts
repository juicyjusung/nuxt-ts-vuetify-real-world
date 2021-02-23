import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { ApiArticle, ReqArticleList } from '~/api/article';
import { Article, isArticle } from '~/models/article';
import { isArrayOf, OptionalPick } from '~/types/index';
import { $axios } from '~/utils/axios';
import { notifyErrors } from '~/utils/notify';
import { articleModule } from '~/utils/store-accessor';

export type ReqCreateArticle = Pick<Article, 'title' | 'description' | 'body'> &
  OptionalPick<Article, 'tagList'>;

export type Slug = Article['slug'];
export type UpdateArticlePayload = Partial<ReqCreateArticle>;
export type UpdateArticleRequest = {
  payload: UpdateArticlePayload;
  slug: Slug;
};
export type GetArticleRequest = {
  slug: Slug;
};

@Module({
  name: 'articleModule',
  namespaced: true,
  stateFactory: true,
})
export default class ArticleModule extends VuexModule {
  articleList: Article[] = [];
  articleOffset: number = 0;
  articleCount: number = 0;

  @Mutation
  setArticleList(articleList: Article[]) {
    this.articleList = articleList;
  }

  @Mutation
  unshiftArticle(article: Article) {
    this.articleList.unshift(article);
  }

  @Mutation
  updateArticleInArticleList(updatedArticle: Article) {
    const index = this.articleList.findIndex(article => article.slug === updatedArticle.slug);
    this.articleList = [
      ...this.articleList.slice(0, index),
      updatedArticle,
      ...this.articleList.slice(index + 1, articleModule.articleList.length),
    ];
  }

  @Action({ rawError: true })
  async getArticleList(request?: ReqArticleList) {
    const prevSlugs = this.articleList.map(article => article.slug);
    const { articles } = await ApiArticle.getArticleList({
      offset: this.articleOffset || 0,
      limit: 20,
      ...request,
    });
    if (isArrayOf<Article>(articles, isArticle)) {
      const filtered = articles.filter(article => !prevSlugs.includes(article.slug));
      this.setArticleList([...this.articleList, ...filtered]);
      return;
    }
    throw new Error('no articles');
  }

  @Action({ rawError: true })
  async createArticle(payload: ReqCreateArticle): Promise<Article | boolean> {
    const { article } = await ApiArticle.createArticle(payload);
    if (isArticle(article)) {
      this.unshiftArticle(article);
      return article;
    }
    return false;
  }

  @Action({ rawError: true })
  async getArticle(slug: Slug): Promise<Article | null> {
    const { article } = await ApiArticle.getArticle(slug);
    if (isArticle(article)) {
      return article;
    }
    notifyErrors('error');
    return null;
  }

  @Action({ rawError: true })
  async updateArticle(request: UpdateArticleRequest): Promise<void> {
    const res = await $axios.$put(`/articles/${request.slug}`, { article: request.payload });
    console.log('%c [JL] createArticle - res', 'font-size: 16px; color:  red;', res);
  }

  @Action({ rawError: true })
  async favoriteArticle(slug: string): Promise<void> {
    const { article } = await ApiArticle.favoriteArticle(slug);
    if (isArticle(article)) {
      this.updateArticleInArticleList(article);
      return;
    }
    throw new Error('error');
  }

  @Action({ rawError: true })
  async cancelFavoriteArticle(slug: Slug): Promise<void> {
    const { article } = await ApiArticle.cancelFavoriteArticle(slug);
    if (isArticle(article)) {
      this.updateArticleInArticleList(article);
      return;
    }
    throw new Error('error');
  }
}
