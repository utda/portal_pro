<template>
  <div>
    <v-expansion-panels :value="isOpen" flat class="mb-4">
      <v-expansion-panel>
        <v-expansion-panel-header class="grey lighten-2">
          {{ $t(label) }}

          <!--
          <small class="ml-2" v-if="agg.buckets.length < 5"
            >({{ agg.buckets.length.toLocaleString() }}
            {{ $t('results') }})</small
          >
          -->

          <small class="ml-2"
            >({{ agg.total.toLocaleString() }} {{ $t('results') }})</small
          >
        </v-expansion-panel-header>

        <v-expansion-panel-content outlined class="py-2">
          <template v-for="(e, key) in agg.buckets">
            <v-row
              v-if="e.key"
              :key="key"
              align="center"
              justify="center"
              dense
            >
              <v-col
                style="cursor: pointer"
                cols="8"
                @click="refine(e.key)"
                :class2="isChecked(e.key) ? 'primary--text' : ''"
              >
                <template v-if="isChecked(e.key)">
                  <v-icon color="primary"> {{ mdiCheckboxMarked }} </v-icon>
                </template>
                <template v-else>
                  <v-icon> {{ mdiCheckboxBlankOutline }} </v-icon>
                </template>
                {{ $t(e.key) }}
              </v-col>
              <v-col cols="3" class="text-right">
                {{ e.doc_count.toLocaleString() }}
              </v-col>
              <v-col class="text-right" cols="1">
                <v-btn
                  v-if="!isChecked(e.key)"
                  icon
                  x-small
                  @click="refine('-' + e.key)"
                  ><v-icon>{{ mdiCloseCircleOutline }}</v-icon></v-btn
                >
              </v-col>
            </v-row>

            <v-divider :key="'d-' + key" />
          </template>

          <template v-for="(e, key) in getMinusValues()">
            <v-row
              :key="'r_' + key"
              style="cursor: pointer"
              align="center"
              justify="center"
              dense
              @click="refine(e)"
            >
              <v-col cols="12"
                ><v-icon color="error darken-1">{{ mdiMinusBox }}</v-icon>

                {{ e.substring(1) }}</v-col
              >
            </v-row>
            <v-divider :key="'d2-' + key" />
          </template>

          <!-- 表示 -->

          <div class="text-right mt-2">
            <!-- v-if="aggList.value.length > limit" -->
            <v-btn color="primary" small text @click="showAll()"
              >{{ $t('show all') }} <v-icon>{{ mdiMenuRight }}</v-icon></v-btn
            >
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-dialog persistent v-model="isShowAll">
      <v-card
        :style2="
          loading
            ? 'pointer-events: none; background-color: white; opacity: 0.5;'
            : ''
        "
      >
        <v-card-title class="text-h5 grey lighten-2">
          <span class="text-h5">{{ $t(label) }}</span>
        </v-card-title>
        <v-card-text class="py-5">
          <v-text-field
            v-model="facetSearch"
            background-color="grey lighten-3"
            filled
            rounded
            dense
            hide-details
            single-line
            :placeholder="$t('add_a_search_term')"
            :append-icon="mdiMagnify"
            clearable
            :clear-icon="mdiCloseCircle"
            label="Search"
            class="mx-4 mb-5"
          ></v-text-field>

          <v-data-table
            :loading="loading"
            loading-text="Loading... Please wait"
            :class="loading ? 'loading' : ''"
            dense
            v-model="selected"
            :headers="[
              { text: $t('選択'), value: 'plus' },
              { text: $t('除外'), value: 'minus' },
              { text: $t('name'), value: 'key' },
              { text: $t('results'), value: 'doc_count' },
            ]"
            :items="agg2.buckets"
            item-key="key"
            :search="facetSearch"
            :items-per-page="20"
            :footer-props="{
              'items-per-page-options': [10, 50, 100, -1],
            }"
          >
            <!-- show-select -->
            <template #top> </template>

            <template #[`item.doc_count`]="{ item }">
              {{ item.doc_count.toLocaleString() }}
            </template>

            <template #[`item.plus`]="{ item }">
              <v-checkbox
                class="my-0 py-0"
                dense
                hide-details
                @change="exclude(item.key, item.plus, '+')"
                v-model="item.plus"
              ></v-checkbox>
            </template>

            <template #[`item.minus`]="{ item }">
              <v-checkbox
                class="my-0 py-0"
                dense
                hide-details
                color="error darken-1"
                @change="exclude(item.key, item.minus, `-`)"
                v-model="item.minus"
              ></v-checkbox>
            </template>
          </v-data-table>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="primary" text @click="isShowAll = false">
            {{ $t('cancel') }}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            v-if="false"
            color="error darken-1"
            depressed
            rounded
            @click="
              isShowAll = false
              refine(getLabels(selected, true))
            "
          >
            {{ $t('除外') }}
          </v-btn>
          <v-btn
            color="primary"
            depressed
            rounded
            @click="
              isShowAll = false
              refine(getLabels(selected), true)
            "
          >
            {{ $t('refine') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Prop, Vue, Component, Watch } from 'nuxt-property-decorator'
import axios from 'axios'
import {
  mdiCheckboxMarked,
  mdiCheckboxBlankOutline,
  mdiCloseCircleOutline,
  mdiMenuRight,
  mdiMinusBox,
  mdiMagnify,
  mdiCloseCircle,
} from '@mdi/js'

@Component({
  components: {},
})
export default class FullTextSearch extends Vue {
  mdiCheckboxMarked: string = mdiCheckboxMarked
  mdiCheckboxBlankOutline: string = mdiCheckboxBlankOutline
  mdiCloseCircleOutline: string = mdiCloseCircleOutline
  mdiMenuRight: string = mdiMenuRight
  mdiMinusBox: string = mdiMinusBox
  mdiMagnify: string = mdiMagnify
  mdiCloseCircle: string = mdiCloseCircle

  get index() {
    return this.$store.getters.getIndex
  }

  @Prop({})
  agg!: any

  @Prop({})
  label!: string

  @Prop({})
  isOpen!: number

  @Prop({})
  total!: number

  isShowAll: boolean = false

  facetSearch: string = ''

  selected: any[] = []

  loading: boolean = false

  //isOpen: number = 0

  //全件表示におけるデータ
  agg2: any = {}

  async showAll() {
    this.isShowAll = true
    //this.loading = true

    this.facetSearch = ''

    const query = this.$route.query
    const field = this.label

    const agg = this.agg

    this.agg2 = JSON.parse(JSON.stringify(agg)) // 注意

    let currentValues = query['fc-' + field]
    const selected: any[] = []

    const selectedValues: any = {}

    const minusValues = this.getMinusValues()

    //クエリが存在すれば
    if (currentValues) {
      if (typeof currentValues === 'string') {
        currentValues = [currentValues]
      }

      //plusの値
      for (const e of agg.buckets) {
        const value = e.key
        if (currentValues.includes(value)) {
          const select: any = {
            key: value,
            doc_count: e.doc_count,
          }
          if (value.substring(0, 1) === '-') {
            select.minus = true
          } else {
            select.plus = true
          }
          selected.push(select)
          selectedValues[value] = selected.length - 1
        }
      }

      //minusの値
      for (let value of minusValues) {
        value = value.substring(1)

        selected.push({
          key: value,
          doc_count: -1,
          minus: true,
        })

        selectedValues[value] = selected.length - 1
      }
    }

    this.selected = selected

    //追加で検索
    if (agg.buckets.length >= 0 /*5*/) {
      //以下、もう少し綺麗に書きたい。

      const query = JSON.parse(JSON.stringify(this.$route.query))

      delete query['fc-' + field]

      query.field2 = field
      query.max = 2000
      query.lang = this.$i18n.locale
      query.aggs = true

      //let queryString = this.$es.createQueryString(query)

      //let fullPath = process.env.API_URL + '/search?' + queryString

      this.loading = true
      const { data } = await this.$localEs.search({}, query, this.index) //axios.get(fullPath)

      const res = data.aggregations[field]

      const plusValues = this.getPlusValues()
      const minusValues = this.getMinusValues()

      const items: any[] = selected //[]

      for (const item of res.buckets) {
        const value = item.key

        if (!value) {
          continue
        }

        //すでにあった場合。// !==0 の点が重要
        if (selectedValues[value] != null) {
          items[selectedValues[value]].doc_count = item.doc_count
          continue
        }

        if (minusValues.includes('-' + value)) {
          item.minus = true
        }

        if (plusValues.includes(value)) {
          item.plus = true
        }
        items.push(item)
      }

      this.agg2 = /*res*/ { buckets: items }

      this.loading = false
    }
  }

  isChecked(value: string): boolean {
    const query = this.$route.query

    const field = this.label

    let values = []

    let currentValues: any = query['fc-' + field]

    if (!currentValues) {
      return false
    }

    if (typeof currentValues === 'string') {
      currentValues = [currentValues]
    }
    values = currentValues

    if (values.includes(value)) {
      return true
    } else {
      return false
    }
  }

  refine(selectedValues: any, overwrite = false) {
    //console.log('refine', { selectedValues }, { overwrite })

    //

    if (typeof selectedValues === 'string') {
      selectedValues = [selectedValues]
    }

    const field = this.label
    const query = JSON.parse(JSON.stringify(this.$route.query))

    let values = []

    //

    //上書き
    if (overwrite) {
      const agg2 = this.agg2
      selectedValues = []

      for (let agg of agg2.buckets) {
        if (agg.plus) {
          selectedValues.push(agg.key)
        }
      }

      for (let value of selectedValues) {
        values.push(value)
      }

      const minusValues: string[] = []
      if (agg2.buckets) {
        for (let agg of agg2.buckets) {
          if (agg.minus) {
            values.push('-' + agg.key)
          }
        }
      }
    } else {
      //追加
      let currentValues = query['fc-' + field]

      //クエリが存在すれば
      if (currentValues) {
        if (typeof currentValues === 'string') {
          currentValues = [currentValues]
        }

        for (const value of currentValues) {
          if (selectedValues.length !== 0) {
            values.push(value)
          }
        }
      }

      if (selectedValues.length !== 0 /* && !overwrite*/) {
        for (const value of selectedValues) {
          if (values.includes(value)) {
            values = values.filter((n: string) => n !== value)
          } else {
            values.push(value)
          }
        }
      }
    }

    query['fc-' + field] = values

    ////////////

    //ページを先頭に
    query['page'] = 1

    const to: any = {
      name: 'search',
    }
    to.query = query
    this.$router.push(this.localePath(to))

    this.selected = []
  }

  getMinusValues() {
    const field = this.label
    const query = this.$route.query

    const values = []
    for (const queryField in query) {
      if (
        queryField.includes(/*'[refinementList][' + field + ']'*/ 'fc-' + field)
      ) {
        let currentValues: any = query[queryField]
        if (typeof currentValues === 'string') {
          currentValues = [currentValues]
        }
        for (const value of currentValues) {
          if (value.substring(0, 1) === '-') {
            //values.push(value.substring(1))
            values.push(value)
          }
        }
        //values.push(query[queryField] || '')
      }
    }

    return values
  }

  getPlusValues() {
    const field = this.label
    const query = this.$route.query

    const values = []
    for (const queryField in query) {
      if (
        queryField.includes(/*'[refinementList][' + field + ']'*/ 'fc-' + field)
      ) {
        let currentValues: any = query[queryField]
        if (typeof currentValues === 'string') {
          currentValues = [currentValues]
        }
        for (const value of currentValues) {
          if (value.substring(0, 1) !== '-') {
            //values.push(value.substring(1))
            values.push(value)
          }
        }
        //values.push(query[queryField] || '')
      }
    }

    return values
  }

  getLabels(values: any[], isMinus = false) {
    const labels: string[] = []
    for (const item of values) {
      let value = item.key
      if (isMinus) {
        value = '-' + value
      }
      labels.push(value)
    }
    return labels
  }

  exclude(key: string, value: boolean, type: string) {
    const agg = this.agg2
    const buckets = agg.buckets

    for (const bucket of buckets) {
      if (bucket.key === key) {
        if (type === '+' && value) {
          bucket.minus = false
        } else if (type === '-' && value) {
          bucket.plus = false
        }
      }
    }
  }
}
</script>
