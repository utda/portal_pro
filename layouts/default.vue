<template>
  <v-app>
    <div>
      <Menu />

      <v-main>
        <nuxt />
      </v-main>

      <FooterMenu />
    </div>

    <v-btn
      v-show="fab"
      v-scroll="onScroll"
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
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Menu from '~/components/layout/Menu.vue'
import FooterMenu from '~/components/layout/FooterMenu.vue'
import FullTextSearch from '~/components/search/FullTextSearch.vue'

@Component({
  components: {
    Menu,
    FooterMenu,
    FullTextSearch,
  },
})
export default class search extends Vue {
  fab: boolean = false

  onScroll(e: any): void {
    if (typeof window === 'undefined') return
    const top = window.pageYOffset || e.target.scrollTop || 0
    this.fab = top > 20
  }

  toTop(): void {
    // @ts-ignore
    this.$vuetify.goTo(0)
  }
}
</script>
