import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import ArticleModule from '~/store/articleModule';
import UserModule from '~/store/userModule';

/* eslint-disable */
let userModule: UserModule;
let articleModule: ArticleModule;

function initialiseStores(store: Store<any>): void {
  userModule = getModule(UserModule, store);
  articleModule = getModule(ArticleModule, store);
}

export { initialiseStores, userModule, articleModule };
