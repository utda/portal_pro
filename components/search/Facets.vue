<template>
  <div v-if="aggs">
    <template v-for="(conf, key) of confMap">
      <Facet
        v-if="!conf.hide && !conf.key.includes('car-') && aggs[conf.key]"
        :agg="aggs[conf.key]"
        :label="conf.label"
        :key="key"
        :isOpen="conf.open || query['fc-' + conf.key] ? 0 : 1"
        :total="aggs['car-' + key] ? aggs['car-' + key].value : -1"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { Prop, Vue, Component, Watch } from 'nuxt-property-decorator'
import Facet from '~/components/search/Facet.vue'

@Component({
  components: {
    Facet,
  },
})
export default class FullTextSearch extends Vue {
  @Prop({})
  aggs!: any

  get query() {
    const query = this.$route.query
    return query
  }

  /*
  @Prop({})
  confMap!: any
  */

  confMap: any = process.env.aggs
}
</script>
