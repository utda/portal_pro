<template>
  <v-card
    no-body
    :class="horizontal ? '' : 'mb-4'"
    :style="horizontal ? 'width: ' + width + 'px;' : ''"
    flat
    outlined
  >
    <nuxt-link
      v-if="item.thumbnail"
      :to="
        localePath({
          name: 'item-id',
          params: { id: item.objectID },
        })
      "
    >
      <v-img
        :src="item.thumbnail"
        contain
        style="height: 150px"
        width="100%"
        class="grey lighten-2"
      ></v-img>
    </nuxt-link>
    <div
      class="pa-4"
      :style="
        horizontal
          ? 'width: ' +
            width +
            'px; height: ' +
            height +
            'px; overflow-y: auto;'
          : ''
      "
    >
      <nuxt-link
        :to="
          localePath({
            name: 'item-id',
            params: { id: item.objectID },
          })
        "
      >
        <!-- eslint-disable-next-line vue/no-v-html -->
        <h4 v-html="item.label"></h4>
      </nuxt-link>

      <!--
      <p v-if="item._source.description" class="mt-2 mb-0">
        {{ item._source.description }}
      </p>
      -->

      <template>
        <div class="mt-2" v-html="item.attribution"></div>
      </template>
    </div>

    <template v-if="!item.share_hide">
      <v-divider />

      <v-card-actions>
        <v-spacer></v-spacer>
        <ResultOption
          :item="{
            label: item.label,
            url: 'aaa',
          }"
        />
      </v-card-actions>
    </template>
  </v-card>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator'
import ResultOption from '~/components/display/ResultOption.vue'

@Component({
  components: {
    ResultOption,
  },
})
export default class CardItem extends Vue {
  @Prop({ required: true })
  item!: any

  @Prop({
    default: 300,
  })
  width!: number

  @Prop({
    default: 300,
  })
  height!: number

  @Prop({
    default: false,
  })
  horizontal!: boolean
}
</script>
<style>
a {
  text-decoration: none;
}
</style>
