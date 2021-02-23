import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import ArticleModule from '~/store/articleModule';
import CommentModule from '~/store/commentModule';
import ProfileModule from '~/store/profileModule';
import TagModule from '~/store/tagModule';
import UserModule from '~/store/userModule';

/* eslint-disable */
let userModule: UserModule;
let articleModule: ArticleModule;
let tagModule: TagModule;
let commentModule: CommentModule
let profileModule: ProfileModule

function initialiseStores(store: Store<any>): void {
  userModule = getModule(UserModule, store);
  articleModule = getModule(ArticleModule, store);
  tagModule = getModule(TagModule, store);
  commentModule = getModule(CommentModule, store);
  profileModule = getModule(ProfileModule, store);
}

export { initialiseStores, userModule, articleModule, tagModule, commentModule, profileModule };
