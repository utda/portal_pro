<template>
  <v-menu bottom offset-y nudge-bottom="20" v-model="menu">
    <template v-slot:activator="{ on, attrs }">
      <!--
          :label="$t('search')"
          label2="検索キーワードを入力"
        -->
      <v-text-field
        autocomplete="off"
        v-model="q"
        light
        single-line
        filled
        rounded
        dense
        hide-details
        :clearable="true /*head ? false : true*/"
        :clear-icon="mdiClose"
        :append-icon="mdiMagnify"
        :background-color="backgroundColor"
        @click:append="search"
        @keydown.enter="trigger"
        v-bind="attrs"
        v-on="head ? on : false"
        :placeholder="$t('inputSearchKeyword')"
      ></v-text-field>
    </template>

    <v-card>
      <v-list>
        <v-subheader
          ><small>{{ $t('recentSearches') }}</small></v-subheader
        >

        <v-list-item
          exact
          :to="localePath({ name: 'search', query: item.q })"
          v-for="(item, key) in items.slice(0, 5)"
          :key="key"
        >
          <v-list-item-title v-html="getText(item.q)"> </v-list-item-title>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text :to="localePath({ name: 'history' })">
          {{ $t('history') }}
        </v-btn>
      </v-card-actions>

      <template v-if="advanced">
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            :to="localePath({ name: 'advanced' })"
            @click="menu = false"
          >
            {{ $t('detail') }}
          </v-btn>
        </v-card-actions>
      </template>
    </v-card>
  </v-menu>
</template>

<!-- <div>
  </div> -->

<script lang="ts">
import { Prop, Vue, Component, Watch } from 'nuxt-property-decorator'
import { mdiMagnify, mdiClose } from '@mdi/js'

let key: string = 'search-suikeichuzu-history'

@Component({})
export default class FullTextSearch extends Vue {
  q: any = ''

  mdiMagnify: string = mdiMagnify
  mdiClose: string = mdiClose

  menu: boolean = false

  advanced: boolean = false

  @Prop({ default: 'white' })
  backgroundColor!: string

  @Prop({ default: false })
  head!: boolean

  get page() {
    return Number(this.$store.getters.getPage)
  }

  set page(value) {
    this.$store.commit('setPage', value)
  }

  @Watch('$route')
  watchRoute() {
    const query = this.$route.query
    /*
    if (query['main[query]']) {
      this.q = query['main[query]']
    } else {
      this.q = ''
    }
    */

    if (query.keyword) {
      let q = query.keyword
      if (typeof q !== 'string') {
        q = q.join(' ')
      }
      this.q = q
    } else {
      this.q = ''
    }

    this.init()
  }

  trigger(event: any) {
    // 日本語入力中のEnterキー操作は無効にする
    if (event.keyCode !== 13) return
    this.menu = false
    this.search()
  }

  created() {
    const query = this.$route.query
    /*
    if (query['main[query]']) {
      this.q = query['main[query]']
    }
    */
    if (query.keyword) {
      let q = query.keyword
      if (typeof q !== 'string') {
        q = q.join(' ')
      }
      this.q = q
    } else {
      this.q = ''
    }
  }

  items: any[] = []

  init() {
    /*
    if (this.head) {
      this.q = ''
    }
    */

    if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
      const items = JSON.parse((localStorage as any).getItem(key))
      this.items = items
    } else {
      this.items = []
    }
  }

  mounted() {
    this.init()
  }

  search() {
    let keywordStr = this.q

    if (!keywordStr) {
      keywordStr = ''
    } else {
      keywordStr = keywordStr.trim()
    }

    const keywords = this.$utils.splitKeyword(keywordStr)

    // push 処理
    const query: any = Object.assign({}, this.$route.query)
    const values: string[] = []
    for (let i = 0; i < keywords.length; i++) {
      const keyword: any = keywords[i]
      if (keyword.label === 'keyword') {
        values.push(keyword.value)
      }
    }

    if (keywordStr) {
      query.keyword = values //keywordStr
    } else {
      delete query.keyword
    }

    query.page = 1

    //過去のクエリのリスト
    const items = this.items

    //過去
    const queries = []
    for (const item of items) {
      const text = this.getText(item.q)
      queries.push(text)
    }

    keywordStr = this.getText(query)

    if (queries.includes(keywordStr)) {
      items.splice(queries.indexOf(keywordStr), 1)
    }

    items.unshift({
      label: keywordStr,
      q: query,
    })

    localStorage.setItem(key, JSON.stringify(items.slice(0, 20)))

    this.$router.push(
      this.localePath({
        name: 'search',
        query,
      }),
      () => {},
      () => {}
    )

    //this.page = 1
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
