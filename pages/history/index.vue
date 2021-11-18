<template>
  <div>
    <Breadcrumbs :items="bh" />
    <v-container class="my-5 mb-10">
      <h2 class="mb-5">{{ title }}</h2>

      <v-list>
        <template v-for="(item, key) in items">
          <v-list-item
            :key="key"
            exact
            :to="localePath({ name: 'search', query: item.q })"
          >
            <v-list-item-title v-html="getText(item.q)"> </v-list-item-title>
          </v-list-item>

          <v-divider
            v-if="key < items.length - 1"
            :key="'d-' + key"
          ></v-divider>
        </template>
      </v-list>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import axios from 'axios'
import Breadcrumbs from '~/components/common/Breadcrumbs.vue'

let key: string = 'search-suikeichuzu-history'

@Component({
  components: {
    Breadcrumbs,
  },
})
export default class Item extends Vue {
  items: any = []

  created() {
    if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
      const items = JSON.parse((localStorage as any).getItem(key))
      this.items = items
    } else {
      this.items = []
    }
  }

  title: any = this.$t('history')

  bh: any[] = [
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

  head() {
    return {
      title: this.title,
    }
  }

  getText(query: any) {
    let text = ''
    if (query.keyword) {
      let keyword = query.keyword
      if (typeof keyword === 'string') {
        keyword = [keyword]
      }
      text += keyword.join(' ')
    }
    for (let key in query) {
      if (key.includes('fc-') || key.includes('q-')) {
        let values = query[key]
        if (typeof values === 'string') {
          values = [values]
        }
        text +=
          ' ' +
          `<span style="color: #4caf50">${key
            .replace('fc-', this.$t('facet') + '-')
            .replace('q-', this.$t('detail') + '-')}</span>` +
          ': ' +
          values.join(', ')
      }
    }
    text = text.trim()

    if (!text) {
      text += `<span style="color: #4caf50">${this.$t('全件表示')}</span>`
    }
    return text
  }
}
</script>
