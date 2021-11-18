<template>
  <div>
    <v-navigation-drawer v-model="drawer" app :temporary="true">
      <v-list>
        <v-list-item
          v-for="(item, key) in menu"
          :key="key"
          :to="item.to"
          :href="item.href"
          @click="item.type ? (dialog = true) : ''"
          link
        >
          <v-list-item-action v-if="item.icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <span>{{ $t(item.label) }}</span>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar dark app flat id="bar">
      <v-toolbar-title v-if="!isMobile">
        <nuxt-link
          :to="
            localePath({
              name: 'index',
            })
          "
          style="color: inherit; text-decoration: inherit"
        >
          {{ title }}
        </nuxt-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <FullTextSearch :head="true" />

      <v-spacer></v-spacer>

      <template v-if="!isMobile">
        <v-btn
          v-if="item.top"
          v-for="(item, key) in menu"
          :key="key"
          class="ma-1"
          text
          depressed
          :to="item.to"
          :href="item.href"
          @click="item.type ? (dialog = true) : ''"
          exact
        >
          <v-icon v-if="item.icon" class="mr-1">{{ item.icon }}</v-icon>
          {{ $t(item.label) }}
        </v-btn>
      </template>

      <v-menu offset-y>
        <template #activator="{ on }">
          <v-btn depressed icon v-on="on">
            <v-icon>mdi-translate</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item :to="switchLocalePath('ja')">
            <v-list-item-title>日本語</v-list-item-title>
          </v-list-item>
          <v-list-item :to="switchLocalePath('en')">
            <v-list-item-title>English</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- dialog -->
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          <span class="text-h5">{{ $t('detail') }}</span>
        </v-card-title>
        <v-card-text class="py-5">
          <SearchAdvanced
            @close="dialog = $event"
            :showCloseBtn="true"
          ></SearchAdvanced>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'nuxt-property-decorator'
import FullTextSearch from '~/components/search/FullTextSearch.vue'
import { mdiTranslate } from '@mdi/js'

@Component({
  components: {
    FullTextSearch,
  },
})
export default class License extends Vue {
  drawer: boolean = false
  baseUrl: string = process.env.BASE_URL || ''

  mdiTranslate: string = mdiTranslate

  dialog: boolean = false

  get title(): any {
    return this.$t(process.env.siteName as any)
  }

  get menu(): any[] {
    return [
      {
        label: 'category',
        to: this.localePath({ name: 'category' }),
      },
    ]
  }

  get isMobile() {
    if (['xs', 'sm'].includes((this as any).$vuetify.breakpoint.name)) {
      return true
    } else {
      return false
    }
  }

  id: any = process.env.BASE_URL + '-' + process.env.siteName
}
</script>
