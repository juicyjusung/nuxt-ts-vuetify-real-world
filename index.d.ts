import { userModule } from '~/store';

interface Store {
  userModule: typeof userModule;
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
