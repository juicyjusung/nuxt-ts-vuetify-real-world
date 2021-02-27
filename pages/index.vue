<template>
  <v-container>
    <HomeContentTemplate>
      <template #main>
        <v-tabs v-model="tab" align-with-title class="mb-2">
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tab v-for="(item, i) in tabs" :key="i" nuxt :to="item.to">{{ item.label }}</v-tab>
          <v-tab v-if="selectedTag" ref="tagTab" nuxt :to="`/tag/${selectedTag}`">
            #{{ selectedTag }}
          </v-tab>
        </v-tabs>
        <nuxt-child />
      </template>
      <template #sider>
        <TagsCard :tags="tags" @click="onClickTag" />
      </template>
    </HomeContentTemplate>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

import { Tag } from '~/models/tag/tag.types';
import { tagModule } from '~/utils/store-accessor';

interface Tab {
  label: string;
  to: string;
}

@Component({
  components: {},
  auth: false,
})
export default class Home extends Vue {
  tags = [];
  tabs: Tab[] = [
    { label: 'Your Feed', to: '/myfeed' },
    { label: 'Global Feed', to: '/' },
  ];

  tab = '/';
  selectedTag = '';

  async asyncData(): Promise<void | object> {
    return {
      tags: await tagModule.getTags(),
    };
  }

  created() {
    const { tag } = this.$nuxt.context.params;
    this.selectedTag = tag ?? '';
  }

  onClickTag(tag: Tag) {
    this.selectedTag = tag;
    this.$router.push({
      path: `/tag/${tag}`,
      params: tag,
    });
  }
}
</script>
