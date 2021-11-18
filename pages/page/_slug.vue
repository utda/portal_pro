<template>
  <div>
    <Breadcrumbs :items="bh" />
    <v-container class="my-5 mb-10">
      <h1 class="mb-5">{{ page.title }}</h1>
      <nuxt-content :document="page" />
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Breadcrumbs from '~/components/common/Breadcrumbs.vue'

@Component({
  components: {
    Breadcrumbs,
  },
})
export default class Item extends Vue {
  baseUrl: any = process.env.BASE_URL

  async asyncData({ app, $content, params }: any): Promise<any> {
    let lang = app.i18n.locale
    if (lang === 'ja') {
      lang = ''
    } else {
      lang = lang + '/'
    }
    const page = await $content(lang + 'page/' + params.slug).fetch()

    return {
      page,
    }
  }

  get title() {
    return (this as any).page.title
  }

  head() {
    const title = this.title
    return {
      title,
    }
  }

  get bh() {
    return [
      {
        text: this.$t('top'),
        disabled: false,
        to: this.localePath({ name: 'index' }),
        exact: true,
      },
      {
        text: this.title,
      },
    ]
  }
}
</script>
<style>
.nuxt-content h2 {
  margin-top: 12px;
  margin-bottom: 8px;
}

.nuxt-content h3 {
  margin-top: 12px;
  margin-bottom: 8px;
}

.nuxt-content h4 {
  margin-top: 12px;
  margin-bottom: 8px;
}
</style>
