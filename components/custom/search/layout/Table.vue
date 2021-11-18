<template>
  <v-simple-table class="mt-5">
    <template v-slot:default>
      <thead>
        <tr>
          <th></th>
          <th class="text-left">{{ $t('地名') }}</th>
          <th class="text-left">{{ $t('legend') }}</th>

          <th class="text-left">{{ $t('拡大図') }}</th>
          <!-- <th></th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in items.hits" :key="key">
          <td class="py-2">
            <nuxt-link
              :to="
                localePath({
                  name: 'item-id',
                  params: { id: item._id },
                })
              "
            >
              <!-- query, -->
              <v-img
                contain
                max-height="90"
                max-width="90"
                style="height: 90px"
                width="100%"
                class="grey lighten-2"
                :src="item._source.thumbnail"
              />
            </nuxt-link>
          </td>

          <td>
            <nuxt-link
              :to="
                localePath({
                  name: 'item-id',
                  params: { id: item._id },
                })
              "
              >{{ item._source.label }}</nuxt-link
            >
            <!--
                <nuxt-link
                  :to="localePath({ name: 'list-id', params: { id: item.id } })"
                  >{{ item.label }}</nuxt-link
                >
                -->
          </td>

          <td>
            <img
              class="mx-2 mt-2"
              :src="getImage(item._source.記号)"
              width="30px"
            />
            {{ getLegend(item._source.記号) }}
          </td>

          <td>
            <!--
                <a
                  :href="`http://codh.rois.ac.jp/software/iiif-curation-viewer/demo/?curation=${item.curation}&mode=annotation&lang=ja`"
                  >全体図</a
                >
                -->
            <v-btn text color="primary" target="_blank" :href="getUrl(item)"
              >{{ item._source.図[0] }}
              <v-icon class="ml-1">mdi-exit-to-app</v-icon></v-btn
            >
          </td>
          <td v-if="false">
            TODO
            <template v-if="false">
              <a
                :href="`http://codh.rois.ac.jp/software/iiif-curation-viewer/demo/?curation=${item.curation}&mode=annotation&lang=ja`"
                >グリッド</a
              >
            </template>
          </td>
          <td v-if="false">
            <ResultOption
              :item="{
                label: item._source.label,
                url: localePath({
                  name: 'item-id',
                  params: { id: item._id },
                }),
              }"
            />
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script lang="ts">
import { Prop, Vue, Component, Watch } from 'nuxt-property-decorator'
import ResultOption from '~/components/display/ResultOption.vue'

@Component({
  components: {
    ResultOption,
  },
})
export default class FullTextSearch extends Vue {
  baseUrl: any = process.env.BASE_URL
  @Prop({})
  items!: any[]

  getImage(list: any) {
    const index = '' + list[0]
    const markers = (process as any).env.legend
    if (markers[index] && index !== '0' && index !== '35') {
      return this.baseUrl + '/img/markers/' + index + '.png'
    } else {
      return ''
    }
  }

  getLegend(list: any) {
    const index = '' + list[0]
    const markers = (process as any).env.legend
    if (markers[index]) {
      const marker: any = markers[index]
      return marker.分類 + (marker.記号説明 ? ': ' : '') + marker.記号説明
    } else {
      return index
    }
  }

  getUrl(item: any) {
    const curation = item._source.curation
    if (curation.includes('main')) {
      return `http://codh.rois.ac.jp/software/iiif-curation-viewer/demo/?manifest=${
        item._source.manifest
      }&xywh=${item._source.member.split('#xywh=')[1]}&xywh_highlight=border`
    } else {
      return `http://codh.rois.ac.jp/software/iiif-curation-viewer/demo/?curation=${
        item._source.curation
      }&xywh=${item._source.member.split('#xywh=')[1]}&mode=annotation&lang=ja`
    }
  }
}
</script>
