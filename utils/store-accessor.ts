import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import UserModule from '~/store/userModule';

/* eslint-disable */
let userModule: UserModule;

function initialiseStores(store: Store<any>): void {
  userModule = getModule(UserModule, store);
}

export { initialiseStores, userModule };
