<template>
  <v-row align="center" justify="center" dense>
    <v-col cols="4">
      <v-text-field
        v-model="inputPage"
        @change="updatePage"
        dense
        hide-details
        outlined
      >
      </v-text-field>
    </v-col>
    <v-col cols="8">
      <small>/ {{ length }}</small>
      <v-btn
        class2="ml-2"
        class="ml-1"
        icon
        depressed
        @click="page = page - 1"
        color="primary"
        :disabled="page === 1"
        ><v-icon>{{ mdiChevronLeft }}</v-icon></v-btn
      >
      <v-btn
        class2="ml-1"
        class=""
        depressed
        icon
        color="primary"
        @click="page = page + 1"
        :disabled="page === length"
        ><v-icon>{{ mdiChevronRight }}</v-icon></v-btn
      >
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Prop, Vue, Component, Watch } from 'nuxt-property-decorator'
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js'

@Component({
  components: {},
})
export default class FullTextSearch extends Vue {
  mdiChevronLeft: string = mdiChevronLeft
  mdiChevronRight: string = mdiChevronRight

  @Prop({})
  length!: number

  get page() {
    return Number(this.$store.getters.getPage)
  }

  set page(value) {
    this.$store.commit('setPage', value)
  }

  @Watch('page')
  watchPage(val: any) {
    this.inputPage = val
  }

  @Watch('$route')
  watchRoute(val: any) {
    const page = this.$route.query.page
    if (page) {
      this.page = Number(page)
    }
  }

  inputPage: number = 1

  updatePage() {
    let page = Number(this.inputPage) || 1
    if (page < 1) {
      page = 1
    }
    let length = this.length
    if (page > length) {
      page = length
    }
    this.page = page
  }
}
</script>
