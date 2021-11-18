<template>
  <div>
    <v-row v-for="(config, key) in configs" :key="key" dense>
      <v-col cols="3">
        <v-subheader>{{ config.label }}</v-subheader>
      </v-col>
      <v-col cols="9">
        <template v-if="config.type === 'select'">
          <v-select
            v-model="config.value"
            :items="config.values"
            filled
            rounded
            dense
            multiple
            hide-details
          ></v-select>
        </template>
        <template v-else>
          <v-text-field
            @click:append="search"
            @keydown.enter="trigger"
            hide-details
            v-model="config.value"
            filled
            rounded
            dense
          ></v-text-field>
        </template>
      </v-col>
    </v-row>

    <div class="text-center mt-2">
      <v-btn
        class="ma-1"
        v-if="showCloseBtn"
        rounded
        depressed
        color="grey lighten-2"
        @click="close()"
      >
        {{ $t('close') }}
      </v-btn>
      <v-btn
        class="ma-1"
        rounded
        depressed
        color="grey lighten-2"
        @click="reset()"
        >{{ $t('reset') }}</v-btn
      >
      <v-btn class="ma-1" rounded depressed color="primary" @click="search()">{{
        $t('search')
      }}</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'nuxt-property-decorator'

@Component({})
export default class FullTextSearch extends Vue {
  @Prop({ default: false })
  showCloseBtn!: boolean

  @Watch('$route')
  watchRoute() {
    this.reset()
    this.updateQuery()
  }

  //@Emit()
  close() {
    this.$emit('close', false)
  }

  updateQuery() {
    const query = this.$route.query

    const configs = this.configs

    const queryMap: any = {}

    for (const queryField in query) {
      if (queryField.includes('q-')) {
        const key = queryField.split('q-')[1]

        if (!queryMap[key]) {
          queryMap[key] = []
        }

        let values = query[queryField]

        if (typeof values === 'string') {
          values = [values]
        }

        for (const v of values) {
          queryMap[key].push(v)
        }
      }
    }

    for (const option of configs) {
      if (queryMap[option.key]) {
        option.value = queryMap[option.key]
      }
    }

    this.configs = configs
  }

  configs: any = process.env.advanced

  created() {
    this.updateQuery()
  }

  trigger(event: any) {
    // 日本語入力中のEnterキー操作は無効にする
    if (event.keyCode !== 13) return
    this.search()
  }

  search() {
    const query = JSON.parse(JSON.stringify(this.$route.query))

    for (const config of this.configs) {
      const field = config.key

      for (const queryField in query) {
        if (queryField.includes('q-' + field)) {
          delete query[queryField]
        }
      }

      const value = config.value

      if (value === '') {
        continue
      }

      let values = value

      if (typeof values === 'string') {
        values = [values]
      }

      query['q-' + field] = values

      /*
      for (let i = 0; i < values.length; i++) {
        query['main[advanced][' + field + '][' + i + ']'] = values[i]
      }
      */
    }

    this.$router.push(
      this.localePath({
        name: 'search',
        query,
      })
    )

    this.$emit('close', false)
  }

  reset() {
    for (const config of this.configs) {
      config.value = ''
    }
  }
}
</script>
