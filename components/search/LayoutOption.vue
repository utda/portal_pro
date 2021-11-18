<template>
  <div>
    <!-- <small>表示スタイル</small> -->
    <v-btn
      v-for="(option, key) in layouts"
      :key="key"
      icon
      @click="changeLayout(option.value)"
      ><v-icon :color="layout_ === option.value ? 'primary' : ''">{{
        getIcon(option.icon)
      }}</v-icon></v-btn
    >
  </div>
</template>

<script lang="ts">
import { Prop, Vue, Component, Watch } from 'nuxt-property-decorator'
// import FacetValueList from '~/components/search/FacetValueList.vue'
import {
  mdiViewGrid,
  mdiViewList,
  mdiChartBar,
  mdiTable,
  mdiMap,
} from '@mdi/js'

@Component({
  components: {
    //FacetValueList,
  },
})
export default class FullTextSearch extends Vue {
  mdiViewGrid: string = mdiViewGrid
  mdiViewList: string = mdiViewList

  mdiChartBar: string = mdiChartBar
  mdiTable: string = mdiTable
  mdiMap: string = mdiMap

  get layout_() {
    return this.$store.getters.getLayout
  }

  set layout_(value) {
    this.$store.commit('setLayout', value)
  }

  layouts: any = process.env.layout

  changeLayout(value: string) {
    const query = JSON.parse(JSON.stringify(this.$route.query))
    const layout = value
    this.layout_ = layout

    if (layout === 'grid') {
      delete query.layout
    } else {
      query.layout = layout
    }

    this.$router.push(
      this.localePath({
        name: 'search',
        query,
      })
    )

    //sessionStorage.setItem('layout_' + this.baseUrl, value)
  }

  getIcon(value: string) {
    if (value === 'mdi-view-grid') {
      return this.mdiViewGrid
    } else if (value === 'mdi-view-list') {
      return this.mdiViewList
    } else if (value === 'mdi-table') {
      return this.mdiTable
    } else if (value === 'mdi-chart-bar') {
      return this.mdiChartBar
    } else if (value === 'mdi-map') {
      return this.mdiMap
    } else {
      return null
    }
  }
}
</script>
