<template>
  <div :class="items.length > 0 ? 'mb-4' : ''">
    <v-chip
      v-for="(filter, key) in items"
      :key="key"
      class="mr-2 my-1"
      close
      label
      :dark="filter.value.substring(0, 1) !== '-'"
      :class="filter.value.substring(0, 1) === '-' ? '' : 'primary'"
      @click:close="faceted(filter.label, filter.value)"
    >
      <template v-if="isMinus(filter.value)">
        <v-icon class="mr-1">{{ mdiMinusBox }}</v-icon>
      </template>

      <span class="mr-1">{{ getLabel(filter.label) }}:</span>
      <!-- <c-render :value="filter.value" /> -->
      {{ custom(getValue(filter.value), filter.label) }}
    </v-chip>

    <v-btn
      v-if="items.length > 0"
      depressed
      text
      small
      class="my-1"
      color="error darken-1"
      @click="init()"
    >
      {{ $t('Clear all') }}
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Prop, Vue, Component, Watch } from 'nuxt-property-decorator'

import { mdiMinusBox } from '@mdi/js'

@Component({
  components: {},
})
export default class FullTextSearch extends Vue {
  mdiMinusBox: string = mdiMinusBox
  get items(): any[] {
    const query = this.$route.query
    const filters: any[] = []
    for (const key in query) {
      if (key.includes('fc-') || key.includes('q-')) {
        let values = query[key]
        if (typeof values === 'string') {
          values = [values]
        }
        for (const value of values) {
          filters.push({
            label: key,
            value,
          })
        }
      }
    }
    return filters
  }

  faceted(field: string, selectedValues: any, type = 'default') {
    const query = JSON.parse(JSON.stringify(this.$route.query))

    if (typeof selectedValues === 'string') {
      selectedValues = [selectedValues]
    }

    let values = []
    for (const queryField in query) {
      if (queryField === field) {
        let vs = query[queryField]
        if (typeof vs === 'string') {
          vs = [vs]
        }
        for (const v of vs) {
          values.push(v)
        }
      }
    }

    if (selectedValues.length !== 0) {
      for (const value of selectedValues) {
        if (values.includes(value)) {
          values = values.filter((n) => n !== value)
        } else {
          values.push(value)
        }
      }
    }

    //新しいリストで置き換え
    query[field] = values

    query.page /*['main[page]']*/ = 1

    const to: any = {
      name: 'search',
    }
    to.query = query
    this.$router.push(this.localePath(to))
  }

  init() {
    const query = JSON.parse(JSON.stringify(this.$route.query))
    for (const key in query) {
      if (
        key.includes(/*'[refinementList]'*/ 'fc-') ||
        key.includes(/*'[refinementList]'*/ 'q-')
      ) {
        delete query[key]
      }
    }

    // ページは先頭へ
    delete query.page /*['main[page]']*/

    this.$router.push(
      this.localePath({
        name: 'search',
        query,
      })
    )
  }

  isMinus(value: string) {
    return value.substring(0, 1) === '-'
  }

  getValue(value: string) {
    if (value.substring(0, 1) === '-') {
      return value.substring(1)
    } else {
      return value
    }
  }

  getLabel(value: string) {
    value = value
      .replace('fc-', this.$t('facet') + '-')
      .replace('q-', this.$t('detail') + '-')
    const spl = value.split('-')
    return spl[0] + '-' + this.$t(spl[1])
  }

  customMap: any = {}

  created() {
    const advanced: any = process.env.advanced
    const customMap: any = {}
    for (const obj of advanced) {
      if (obj.label === '記号') {
        const values = obj.values
        for (const value of values) {
          customMap[value.value] = value.text
        }
        break
      }
    }
    this.customMap = customMap
  }

  custom(value: string, field: string) {
    if (field === 'q-記号') {
      return this.customMap[value]
    }
    return this.$t(value)
  }
}
</script>
