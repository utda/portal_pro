<template>
  <div>
    <v-row>
      <v-col cols="6" md="3" v-for="item in items" :key="item.id">
        <v-card flat no-body class="mb-4">
          <template v-if="item.href">
            <a :href="item.href" target="_blank">
              <!-- query, -->
              <v-img
                contain
                max-height="150"
                style="height: 150px"
                width="100%"
                class="grey lighten-2"
                :src="item.image"
              />
            </a>
          </template>
          <template v-else>
            <nuxt-link :to="item.to">
              <!-- query, -->
              <v-img
                contain
                max-height="150"
                style="height: 150px"
                width="100%"
                class="grey lighten-2"
                :src="item.image"
              />
            </nuxt-link>
          </template>

          <div class="pa-4">
            <template v-if="item.href">
              <a :href="item.href" target="_blank">
                <h4>{{ item.label }}</h4>
              </a>
            </template>
            <template v-else>
              <nuxt-link :to="item.to">
                <h4>{{ item.label }}</h4>
              </nuxt-link>
            </template>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Prop, Vue, Component, Watch } from 'nuxt-property-decorator'

@Component({})
export default class FullTextSearch extends Vue {
  @Prop({})
  items!: any[]
}
</script>
