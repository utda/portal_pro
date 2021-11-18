<template>
  <v-select
    v-model="sort"
    hide-details
    class="mb-0"
    outlined
    rounded
    :items="sortItems"
    dense
    @change="changeSort()"
    :label2="'並び順'"
  ></v-select>
</template>

<script lang="ts">
import { Prop, Vue, Component, Watch } from 'nuxt-property-decorator'

@Component({
  components: {},
})
export default class FullTextSearch extends Vue {
  get sort(): number {
    return this.$store.getters.getSort
  }

  set sort(value: number) {
    this.$store.commit('setSort', value)
  }

  @Watch('$route')
  watchRoute(val: any) {
    const query: any = this.$route.query
    if (query.sort) {
      this.sort = query.sort
    }
  }

  get sortItems(): any[] {
    const keys = ['asc', 'desc']
    const items = []

    const sortList: any = process.env.sort

    for (const obj of sortList) {
      for (const key of keys) {
        items.push({
          text: this.$t(obj.label) + ' ' + this.$t(key),
          value: obj.value + ':' + key,
        })
      }
    }
    return items
  }

  changeSort() {
    const query = JSON.parse(JSON.stringify(this.$route.query))
    query.sort = this.sort
    this.$router.push(
      this.localePath({
        name: 'search',
        query,
      })
    )
  }
}
</script>
