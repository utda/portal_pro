<template>
  <div>
    <Breadcrumbs :items="bh" />
    <v-container class="pa-10">
      <SearchAdvanced></SearchAdvanced>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import Breadcrumbs from '~/components/common/Breadcrumbs.vue'

export default {
  components: {
    Breadcrumbs,
  },
  data() {
    return {
      aggs: process.env.aggs,

      bh: [
        {
          text: this.$t('top'),
          disabled: false,
          to: this.localePath({ name: 'index' }),
          exact: true,
        },
        {
          text: this.$t('detail'),
        },
      ],
    }
  },

  head() {
    return {
      title: this.$t('detail'),
    }
  },
}
</script>
