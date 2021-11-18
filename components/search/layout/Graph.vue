<template>
  <div class="mt-5" :class="loadingSearch ? 'loading' : ''">
    <v-card flat class="mb-10" v-for="(item, key) in items" :key="key">
      <v-card-title class="grey lighten-2">
        {{ item.label }}
      </v-card-title>

      <v-card-text class="py-5">
        <BarChart :labels="item.labels" :datasets="item.datasets"> </BarChart>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Prop, Vue, Component, Watch } from 'nuxt-property-decorator'

@Component({
  components: {},
})
export default class FullTextSearch extends Vue {
  /*
  @Prop({})
  aggs!: any[]
  */

  loadingSearch: boolean = false

  /*
  @Watch('aggs', { deep: true })
  watchTmp() {
    this.init()
  }
  */

  @Watch('$route') //, { deep: true }
  watchTmp(newValue: any, oldValue: any) {
    const n = newValue.query
    const o = oldValue.query
    delete n.layout
    delete n.page
    delete n.max

    delete o.layout
    delete o.page
    delete o.max

    if (JSON.stringify(n) != JSON.stringify(o)) {
      this.init('watch')
    }
  }

  items: any[] = []

  created() {
    this.init('created')
  }

  async init(debug = '') {
    this.items = []

    const map: any[] = await this.init2(/*aggs*/)

    this.items = map
  }

  async init2(/*aggs: any*/) {
    const map: any[] = []

    const query: any = JSON.parse(JSON.stringify(this.$route.query))
    query.max = -1

    const { data } = await this.$localEs.search(null, query, null)

    const aggs = data.aggregations

    for (let key in aggs) {
      const items = []

      const buckets = aggs[key].buckets

      if (buckets.length === 0) {
        continue
      }

      for (const obj of buckets) {
        items.push({
          label: obj.key,
          value: obj.doc_count,
        })
      }

      items.sort(function (a, b) {
        if (a.value < b.value) return 1
        if (a.value > b.value) return -1
        return 0
      })

      const labels = []
      const data = []

      for (const obj of items) {
        labels.push(obj.label)
        data.push(obj.value)
      }

      map.push({
        label: key, //aggs[key].label,
        labels,
        datasets: [
          {
            data,
            label: 'item', //$t("item")
          },
        ],
      })
    }

    return map
  }
}
</script>
