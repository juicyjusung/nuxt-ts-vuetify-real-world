import { Action, Module, Mutation, MutationAction, VuexModule } from 'vuex-module-decorators';
import { Article } from '~/models/article/article';
import { Tag } from '~/models/article/tag';
import { Author } from '~/models/user/author';
import { OptionalPick, ResponseType } from '~/types/index';
import { $axios } from '~/utils/axios';
import { articleModule } from '~/utils/store-accessor';

export type CreateArticleRequest = Pick<Article, 'title' | 'description' | 'body'> &
  OptionalPick<Article, 'tagList'>;
type Slug = Article['slug'];
export type UpdateArticlePayload = Partial<CreateArticleRequest>;
export type UpdateArticleRequest = {
  payload: UpdateArticlePayload;
  slug: Slug;
};
export type GetArticleRequest = {
  slug: Slug;
};
export interface ArticleListRequest {
  tag?: Tag;
  author?: Author['username'];
  favorited?: Author['username'];
  limit?: number;
  offset?: number;
}

type ArticleResponse = ResponseType<'article', Article>;

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
  async createArticle(payload: CreateArticleRequest): Promise<Article | boolean> {
    const res = await $axios.post('/articles', { article: payload });
    const article: Article = res?.data?.article && new Article(res?.data?.article);
    if (!article) {
      return false;
    }
    this.unshiftArticle(article);
    return article;
  }

  @Action({ rawError: true })
  async updateArticle(request: UpdateArticleRequest): Promise<void> {
    const res = await $axios.$put(`/articles/${request.slug}`, { article: request.payload });
    console.log('%c [JL] createArticle - res', 'font-size: 16px; color:  red;', res);
  }

  @Action({ rawError: true })
  async getArticle(request: GetArticleRequest): Promise<Article> {
    const res = await $axios.get(`/articles/${request.slug}`);
    return res?.data?.article && new Article(res?.data?.article);
  }

  @MutationAction({ mutate: ['articleList', 'articleCount', 'articleOffset'] })
  async getArticleList(request?: ArticleListRequest) {
    const {
      articleList: prevArticleList,
      articleCount: prevArticleCount,
      articleOffset: prevArticleOffset,
    } = articleModule;

    const res = await $axios.get('/articles/', {
      params: {
        offset: prevArticleOffset || 0,
        limit: 20,
        ...request,
      },
    });

    const prevSlugs = prevArticleList.map(article => article.slug);
    const list: Article[] = res?.data?.articles.map((a: Article) => new Article(a));
    const filtered = list.filter(article => !prevSlugs.includes(article.slug));

    const articleList: Article[] = [...prevArticleList, ...filtered];
    const articleCount = res?.data?.articlesCount;

    return {
      articleList,
      articleCount,
      articleOffset: articleList.length,
    };
  }

  @Action({ rawError: true })
  async favoriteArticle(slug: string): Promise<void> {
    const res = await $axios.post(`/articles/${slug}/favorite`);
    if (res?.data?.article) {
      this.updateArticleInArticleList(new Article(res.data.article));
    }
  }

  @Action({ rawError: true })
  async cancelFavoriteArticle(slug: string): Promise<void> {
    const res = await $axios.delete(`/articles/${slug}/favorite`);
    if (res?.data?.article) {
      this.updateArticleInArticleList(new Article(res.data.article));
    }
  }
}
