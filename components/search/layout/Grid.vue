<template>
  <div class="mt-5">
    <v-row>
      <v-col cols="6" md="3" v-for="(item, key) in items.hits" :key="key">
        <v-card flat no-body class="mb-4">
          <a
            target="_blank"
            :href="'https://da.dl.itc.u-tokyo.ac.jp/portal/assets/' + item._id"
          >
            <!-- query, -->
            <v-img
              contain
              max-height="150"
              style="height: 150px"
              width="100%"
              class="grey lighten-2"
              :src="item._source.thumbnail"
            />
          </a>
          <div class="pa-4">
            <a
              target="_blank"
              :href="
                'https://da.dl.itc.u-tokyo.ac.jp/portal/assets/' + item._id
              "
            >
              <h4>{{ item._source.label }}</h4>
            </a>

            <div class="mt-2">
              <small
                ><div>
                  <span class="grey--text text--darken-1"
                    ><!-- {{ $t('access') }}:--><v-icon small>{{
                      mdiBank
                    }}</v-icon></span
                  >
                  {{ $t(item._source.department) }}
                </div>
                <div>
                  <span class="grey--text text--darken-1"
                    ><!-- {{ $t('source') }}: --><v-icon small>{{
                      mdiDatabase
                    }}</v-icon></span
                  >
                  {{ $t(item._source.collection) }}
                </div></small
              >
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Prop, Vue, Component, Watch } from 'nuxt-property-decorator'
import { mdiDatabase, mdiBank } from '@mdi/js'

@Component({})
export default class FullTextSearch extends Vue {
  @Prop({})
  items!: any[]

  mdiBank: string = mdiBank
  mdiDatabase: string = mdiDatabase
}
</script>
