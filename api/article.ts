import { Article } from '~/models/article';
import { Author } from '~/models/author';
import { Comment } from '~/models/comment';
import { Tag } from '~/models/tag/tag.types';
import { OptionalPick, ResponseType } from '~/types';
import { $axios } from '~/utils/axios';

/**
 * Article
 */
export type ReqCreateArticle = Pick<Article, 'title' | 'description' | 'body'> &
  OptionalPick<Article, 'tagList'>;

/**
 * ArticleList
 */
export type ArticleListParam = { limit?: number; offset?: number };
export interface ReqArticleList extends ArticleListParam {
  tag?: Tag;
  author?: Author['username'];
  favorited?: Author['username'];
}
export type ReqFeedArticleList = ArticleListParam;

export type ResArticleList = Promise<{
  articles: Article[];
  articlesCount: number;
}>;

export type ReqCreateComment = Pick<Comment, 'body'> & Pick<Article, 'slug'>;
export type ReqDeleteComment = Pick<Comment, 'id'> & Pick<Article, 'slug'>;

type Slug = Article['slug'];

export type ResArticle = ResponseType<'article', Article>;

export type ResComments = ResponseType<'comments', Comment[]>;
export type ResComment = ResponseType<'comment', Comment>;

export const ApiArticle = {
  /**
   * Article
   */
  createArticle(payload: ReqCreateArticle): ResArticle {
    return $axios.post('/articles', { article: payload });
  },

  getArticle(slug: Slug): ResArticle {
    return $axios.get(`/articles/${slug}`);
  },

  updateArticle() {},

  deleteArticle() {},

  favoriteArticle(slug: Slug): ResArticle {
    return $axios.post(`/articles/${slug}/favorite`);
  },

  cancelFavoriteArticle(slug: Slug): ResArticle {
    return $axios.delete(`/articles/${slug}/favorite`);
  },

  /**
   * Article List
   */
  getArticleList(params: ReqArticleList): ResArticleList {
    return $axios.get('/articles', { params });
  },

  getFeedArticleList(params: ReqFeedArticleList): ResArticleList {
    return $axios.get('/articles/feed', { params });
  },

  getComments(slug: Slug): ResComments {
    return $axios.get(`/articles/${slug}/comments`);
  },

  createComment({ slug, body }: ReqCreateComment): ResComment {
    return $axios.post(`/articles/${slug}/comments`, {
      comment: { body },
    });
  },

  deleteComment({ slug, id }: ReqDeleteComment): Promise<{}> {
    return $axios.delete(`/articles/${slug}/comments/${id}`);
  },
};
