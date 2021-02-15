<template>
  <v-dialog :value="activate" persistent max-width="500" @input="$emit('input')">
    <v-card>
      <v-card-title class="headline"> New article </v-card-title>
      <v-card-text class="mt-10">
        <validation-observer ref="observer" v-slot="{}">
          <form @submit.prevent="onPublishArticle">
            <validate-text-field v-model="article.title" label="Article Title" name="title" />
            <validate-text-field
              v-model="article.description"
              label="What's this article about?"
              name="description"
            />
            <validate-text-area v-model="article.body" label="Write your article" name="body" />
            <v-combobox
              v-model="article.tagList"
              clearable
              hide-selected
              outlined
              deletable-chips
              persistent-hint
              multiple
              append-icon=""
              label="Enter tags"
            >
              <template #selection="{ attrs, item, select, selected }">
                <v-chip
                  small
                  small-chips
                  v-bind="attrs"
                  :input-value="selected"
                  close
                  @click="select"
                  @click:close="removeKeyword(item)"
                >
                  <strong>{{ item }}</strong>
                </v-chip>
              </template>
            </v-combobox>
          </form>
        </validation-observer>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <juicy-btn label="cancel" color="secondary" @click="onCancel"></juicy-btn>
        <juicy-btn label="Publish Article" @click="onPublishArticle"></juicy-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { Article } from '~/models/article/article';
import { notifySuccess } from '~/utils/notify';
import { articleModule } from '~/utils/store-accessor';

@Component({
  components: { ValidationProvider, ValidationObserver },
  transition: {
    name: 'page',
    mode: 'out-in',
  },
})
export default class EditorDialog extends Vue {
  @Prop(Boolean) activate!: boolean;

  article = new Article();

  async onPublishArticle() {
    const observer = this.$refs.observer as InstanceType<typeof ValidationObserver>;
    const validation = await observer.validate();
    if (validation) {
      const article = await articleModule.createArticle(this.article.getCreateArticleRequest());
      if (article instanceof Article) {
        notifySuccess('success');
        this.closeDialog();
      }
    }
  }

  removeKeyword(item: string) {
    this.article.tagList.splice(this.article.tagList.indexOf(item), 1);
    this.article.tagList = [...this.article.tagList];
  }

  onCancel() {
    this.article = new Article();
    const observer = this.$refs.observer as InstanceType<typeof ValidationObserver>;
    observer.reset();
    this.closeDialog();
  }

  closeDialog() {
    this.$emit('close');
  }
}
</script>
