import { userModule, articleModule, tagModule, commentModule, profileModule } from '~/store';

interface Store {
  userModule: typeof userModule;
  articleModule: typeof articleModule;
  tagModule: typeof tagModule;
  commentModule: typeof commentModule;
  profileModule: typeof profileModule;
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
