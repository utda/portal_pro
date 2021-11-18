<template>
  <div>
    <Menu />
    <v-main>
      <template v-if="isMobile">
        <!-- 全体 -->
        <div :class="loadingSearch ? 'loading' : ''">
          <div class="pa-4">
            <FilterOption />
            <v-row dense align="center">
              <v-col cols="12" md="3">
                <v-tooltip bottom v-if="!isMobile">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      fab
                      depressed
                      :color="isFacetOpen ? 'primary' : 'grey lighten-2'"
                      x-small
                      class="mr-2"
                      @click="isFacetOpen = !isFacetOpen"
                      v-on="on"
                      ><v-icon>{{ mdiMenu }}</v-icon></v-btn
                    >
                  </template>
                  <span>{{
                    isFacetOpen ? $t('close_facets') : $t('open_facets')
                  }}</span>
                </v-tooltip>

                {{ $t('search_result') }}: {{ totalAll.toLocaleString() }}
                <!-- {{ $t('hits') }} -->
              </v-col>

              <v-col cols="12" md="3">
                <Pagination v-if="isPage" :length="length" />
              </v-col>

              <v-col cols="6" md="2">
                <ResultPerPage v-if="isPage" />
              </v-col>
              <v-col cols="6" md="2">
                <Sort v-if="isPage" />
              </v-col>

              <v-col cols="12" md="2" class="text-right">
                <LayoutOption />
              </v-col>
            </v-row>
          </div>

          <v-sheet color="grey lighten-2">
            <div class="text-center py-2">
              <v-btn
                rounded
                depressed
                color="primary"
                @click="isNarrowOpen = true"
                ><v-icon class="mr-1">{{ mdiFilterVariant }}</v-icon>
                {{ $t('Narrow search result') }}</v-btn
              >
            </div>
          </v-sheet>

          <div class="pa-5">
            <component
              v-if="results.hits"
              :is="searchLayout"
              :items="results.hits"
              :aggs="results.aggs"
              :col="isFacetOpen ? 3 : 2"
            ></component>

            <div class="text-center my-10" v-if="isPage">
              <v-pagination
                v-model="page"
                :length="length"
                :total-visible="7"
              ></v-pagination>
            </div>
          </div>
        </div>

        <FooterMenu />
      </template>

      <template v-else>
        <v-row
          dense
          :style="
            loadingSearch
              ? 'pointer-events: none; background-color: white; opacity: 0.5;'
              : ''
          "
        >
          <v-col
            v-if="!isMobile && isFacetOpen"
            cols="12"
            md="3"
            :style="'height: ' + (height - barHeight) + 'px'"
            class="overflow-y-auto pa-4"
          >
            <Facets :aggs="aggs" :confMap="aggs" />
          </v-col>
          <v-col
            id="right"
            cols="12"
            :md="isFacetOpen ? 9 : 12"
            :style="'height: ' + (height - barHeight) + 'px'"
            class="overflow-y-auto pa-0"
          >
            <div class="pa-4">
              <FilterOption />
              <v-row dense align="center">
                <v-col cols="12" md="3">
                  <v-tooltip bottom v-if="!isMobile">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        fab
                        depressed
                        :color="isFacetOpen ? 'primary' : 'grey lighten-2'"
                        x-small
                        class="mr-2"
                        @click="isFacetOpen = !isFacetOpen"
                        v-on="on"
                        ><v-icon>{{ mdiMenu }}</v-icon></v-btn
                      >
                    </template>
                    <span>{{
                      isFacetOpen ? $t('close_facets') : $t('open_facets')
                    }}</span>
                  </v-tooltip>

                  {{ $t('search_result') }}: {{ totalAll.toLocaleString() }}
                  <!-- {{ $t('hits') }} -->
                </v-col>

                <v-col cols="12" md="3">
                  <Pagination v-if="isPage" :length="length" />
                </v-col>

                <v-col cols="6" md="2">
                  <ResultPerPage v-if="isPage" />
                </v-col>
                <v-col cols="6" md="2">
                  <Sort v-if="isPage" />
                </v-col>

                <v-col cols="12" md="2" class="text-right">
                  <LayoutOption />
                </v-col>
              </v-row>

              <component
                v-if="results.hits"
                :is="searchLayout"
                :items="results.hits"
                :aggs="aggs"
                :col="isFacetOpen ? 3 : 2"
                :itemsAll="itemsAll"
              ></component>

              <v-row class="my-10" align="center" v-if="isPage">
                <v-col cols="12" md="12" class="text-center">
                  <v-pagination
                    v-model="page"
                    :length="length"
                    :total-visible="7"
                  ></v-pagination>
                </v-col>
              </v-row>
            </div>

            <!-- <FooterMenu /> -->

            <v-btn
              v-show="fab"
              fab
              dark
              fixed
              bottom
              right
              large
              color="error"
              @click="toTop"
            >
              <v-icon>mdi-arrow-up</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </template>
    </v-main>

    <!-- dialog -->
    <v-dialog v-model="isNarrowOpen">
      <v-btn fab dark fixed class="ma-1" x-small @click="isNarrowOpen = false">
        <v-icon>{{ mdiClose }}</v-icon>
      </v-btn>
      <v-card>
        <div class="pa-5">
          <Facets :aggs="aggs" :confMap="aggs" />
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Prop, Vue, Component, Watch } from 'nuxt-property-decorator'
import axios from 'axios'
import Facets from '~/components/search/Facets.vue'
import SearchLayoutGrid from '~/components/search/layout/Grid.vue'

import FilterOption from '~/components/search/FilterOption.vue'
import Sort from '~/components/search/Sort.vue'
import ResultPerPage from '~/components/search/ResultPerPage.vue'
import LayoutOption from '~/components/search/LayoutOption.vue'
import Pagination from '~/components/search/Pagination.vue'

import FooterMenu from '~/components/layout/FooterMenu.vue'

import Menu from '~/components/layout/Menu.vue'

const { scroller } = require('vue-scrollto/src/scrollTo')

import { mdiMenu, mdiFilterVariant, mdiClose } from '@mdi/js'

@Component({
  layout: 'search',
  components: {
    SearchLayoutGrid,
    Facets,

    FooterMenu,

    FilterOption,
    Sort,
    ResultPerPage,
    LayoutOption,
    Pagination,

    Menu,
  },
})
export default class FullTextSearch extends Vue {
  get fab(): boolean {
    return this.rightPosition > 20
  }

  get isPage() {
    return ['table', 'grid', 'list'].includes(this.layout_)
  }

  toTop(): void {
    const options = {
      container: '#right',
      y: true,
    }

    const scrollTo = scroller()
    scrollTo('#right', 500, options)
  }

  mdiMenu: string = mdiMenu
  mdiFilterVariant: string = mdiFilterVariant
  mdiClose: string = mdiClose

  itemsAll: any = []

  bh: any[] = [
    {
      text: this.$t('top'),
      disabled: false,
      to: this.localePath({ name: 'index' }),
      exact: true,
    },
    {
      text: this.$t('search'),
    },
  ]

  loading: boolean = false
  loadingSearch: boolean = false

  totalAll: number = 0
  total: number = 0
  //size: number = 24
  //page: number = 1
  inputPage: number = 1

  results: any = {}

  aggs: any = {}

  /*
  get height() {
    return window.innerHeight
  }
  */

  height: number = window.innerHeight

  isNarrowOpen: boolean = false

  get barHeight() {
    //console.log(document.getElementById('bar'))
    return 64 //document.getElementById('bar').innerHeight
  }

  get searchLayout() {
    const layout_ = this.layout_
    const layouts: any = process.env.layout
    for (const item of layouts) {
      if (item.value === layout_) {
        return item.component
      }
    }
    return 'search-layout-grid'
  }

  get isMobile() {
    if (['xs', 'sm'].includes((this as any).$vuetify.breakpoint.name)) {
      return true
    } else {
      return false
    }
  }

  get sort(): number {
    return this.$store.getters.getSort
  }

  set sort(value: number) {
    this.$store.commit('setSort', value)
  }

  get size() {
    return this.$store.getters.getSize
  }

  set size(value) {
    this.$store.commit('setSize', value)
  }

  get rightPosition() {
    return this.$store.getters.getId
  }

  set rightPosition(value) {
    this.$store.commit('setId', value)
  }

  get page() {
    return this.$store.getters.getPage
  }

  set page(value) {
    this.$store.commit('setPage', value)
  }

  get layout_() {
    return this.$store.getters.getLayout
  }

  set layout_(value) {
    this.$store.commit('setLayout', value)
  }

  get isFacetOpen() {
    return this.$store.getters.getIsFacetOpen
  }

  set isFacetOpen(value) {
    this.$store.commit('setIsFacetOpen', value)
  }

  get history() {
    return this.$store.getters.getHistory
  }

  set history(value) {
    this.$store.commit('setHistory', value)
  }

  get index() {
    return this.$store.getters.getIndex
  }

  set index(value) {
    this.$store.commit('setIndex', value)
  }

  get length() {
    //es由来
    return Math.ceil(this.total / this.size) - (this.total === 10000 ? 1 : 0)
    //return Math.ceil(this.total / this.size)
  }

  @Watch('page')
  watchPage(val: any) {
    //console.log('watch', 'page')
    this.inputPage = val

    const query = JSON.parse(JSON.stringify(this.$route.query))
    query.page /*['main[page]']*/ = val

    this.$router.push(
      this.localePath({
        name: 'search',
        query,
      })
    )
  }

  @Watch('$route')
  watchRoute(newValue: any, oldValue: any) {
    //console.log('watch', '$route')

    //重要。jsonをdeep copyしないと不具合が生じた。
    const newQuery = JSON.parse(JSON.stringify(newValue.query))
    const oldQuery = JSON.parse(JSON.stringify(oldValue.query))

    //再検索が不要な項目
    const keys2 = [/*'main[page]'*/ 'layout']
    for (let key of keys2) {
      delete newQuery[key]
      delete oldQuery[key]
    }

    if (JSON.stringify(newQuery) === JSON.stringify(oldQuery)) {
      return
    }

    //フィルタに依存しない項目
    const keys = [/*'main[page]'*/ 'page']
    for (let key of keys) {
      delete newQuery[key]
      delete oldQuery[key]
    }

    const filterFlag = JSON.stringify(newQuery) !== JSON.stringify(oldQuery)
    this.search(filterFlag)
  }

  handleResize() {
    this.height = window.innerHeight
  }

  getRightPosition() {
    this.rightPosition = (document as any).getElementById('right').scrollTop
  }

  async mounted() {
    let sort: any = this.sort
    if (!sort) {
      const defaultSort: any = process.env.defaultSort
      this.sort = defaultSort
    }

    window.addEventListener('resize', this.handleResize)

    const e: any = document
    if (e.getElementById('right')) {
      e.getElementById('right').addEventListener(
        'scroll',
        this.getRightPosition
      )
    }

    const history = this.history

    const fullPath = this.$route.fullPath
    let results: any = {}
    if (history[fullPath]) {
      //console.log('cache')
      const e: any = history[fullPath]
      results = e.results
      this.total = results.hits.total.value
      this.results = results
      this.loadingSearch = false
      this.aggs = e.aggs
      this.totalAll = e.totalAll

      if (!this.isMobile) {
        //アイテム詳細ページからの戻りの場合
        const self = this
        setTimeout(() => {
          const options = {
            container: '#right',
            y: true,
            offset: self.rightPosition, //ポイント
          }
          const scrollTo = scroller()
          scrollTo('#right', 500, options)

          //先頭に戻す
          self.rightPosition = 0
        }, 1)
      }
    } else {
      // ここから検索
      results = await this.search(true, true)
    }

    // クエリの処理
    const query = this.$route.query

    // ページの初期化
    const page = Number(query.page /*['main[page]']*/) || 1
    this.page = page

    // hitsPerPage
    const size = Number(query.size) || 24
    this.size = size

    // レイアウト
    this.layout_ = query.layout || this.layout_
  }

  async search(filterFlag = false, isInit = false) {
    //console.log('======')
    //console.log(new Date().toUTCString())
    const startTime = Date.now() // 開始時間

    // init
    if (this.isMobile) {
      this.isNarrowOpen = false
      // @ts-ignore
      this.$vuetify.goTo(0)
    } else {
      const options = {
        container: '#right',
        y: true,
      }

      const scrollTo = scroller()
      scrollTo('#right', 500, options)
    }

    /*

    // query
    let esQuery = this.$es.createQuery(this.$route.query, process.env.fulltext)

    if (filterFlag && !isInit) {
      esQuery += '&aggs=true'
    }

    const apiUrl = process.env.API_URL + '/search'

    */

    this.loadingSearch = true

    //const lang = this.$i18n.locale

    //const url = apiUrl + '?' + esQuery + '&lang=' + lang // + '?keyword=' + keyword + '&page=' + page + '&size=' + size

    let results: any = null

    let index = this.index

    /*
    if (!index) {
      index = await axios.get(process.env.BASE_URL + '/' + process.env.index)
      this.index = index
    }
    */

    let endTime = Date.now() // 終了時間
    //console.log('ダウンロード以前の時間', endTime - startTime)

    const routeQuery: any = this.$route.query
    if (!routeQuery.sort) {
      routeQuery.sort = this.sort
    }

    try {
      const { data, itemsAll } = await this.$localEs.search(
        null,
        routeQuery,
        index
      ) //axios.get(url)
      //console.log({ data })
      //this.itemsAll = itemsAll
      results = data
    } catch (e) {
      //検索終了後に解除
      this.loadingSearch = false
      return {}
    }

    endTime = Date.now() // 終了時間

    //検索終了後に解除
    //this.loadingSearch = false

    this.results = results

    if (results.hits) {
      this.total = results.hits.total.value
    }

    if (results.aggregations) {
      this.aggs = results.aggregations
    }

    this.totalAll = results.hits.total.value

    this.setHistory()

    /*
    if (isInit) {
      this.getAggs(
        process.env.API_URL +
          '/search' +
          '?' +
          esQuery +
          '&lang=' +
          lang +
          '&aggs=true'
      )
    }

    if (filterFlag && results.hits) {
      this.page = 1

      if (results.hits.total.value === 10000) {
        this.getTotalAll(
          process.env.API_URL + '/search' + '?' + esQuery + '&count=true'
        )
      } else {
        this.totalAll = results.hits.total.value
        this.setHistory()
      }
    }
    */

    //console.log('かかった時間', endTime - startTime)

    this.loadingSearch = false
  }

  setHistory() {
    const fullPath = this.$route.fullPath
    const history: any = {}
    history[fullPath] = {
      results: this.results,
      aggs: this.aggs,
      totalAll: this.totalAll,
    }
    this.history = history
  }

  async getTotalAll(url: string) {
    let res: any = await axios.get(url)
    res = res.data

    if (res.count) {
      this.totalAll = res.count
      this.setHistory()
    }
  }

  async getAggs(url: string) {
    let res: any = await axios.get(url)
    res = res.data

    if (res.aggregations) {
      this.aggs = res.aggregations
      this.setHistory()
    }
  }

  head() {
    return {
      title: this.$t('search'),
    }
  }
}
</script>
<style>
mark {
  background-color: #ffc168;
}
</style>
