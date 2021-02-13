import { userModule, articleModule } from '~/store';

interface Store {
  userModule: typeof userModule;
  articleModule: typeof articleModule;
}

declare module 'vue/types/vue' {
  interface Vue {
    $accessor: Store;
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $accessor: Store;
  }
}
