import { ReqCreateArticle } from '~/api/article';
import { Article } from '~/models/article/index';
import { OptionalPick } from '~/types';

export type EditorState = Pick<Article, 'title' | 'description' | 'body'> &
  OptionalPick<Article, 'tagList'>;

export class ArticleEditorData implements EditorState {
  body: string = '';
  description: string = '';
  tagList: string[] = [];
  title: string = '';
  constructor(init?: ReqCreateArticle) {
    Object.assign(this, init);
  }
}
