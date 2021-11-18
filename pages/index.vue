<template>
  <div>
    <section class="mb-5">
      <v-parallax :src="top" height="300">
        <v-layout column align-center justify-center class="white--text">
          <h1 class="white--text mb-2 display-1 text-center">
            <b>{{ siteName }}</b>
          </h1>
          <v-btn
            large
            class="mt-5"
            :to="localePath({ name: 'search' })"
            color="primary"
            >{{ $t('try_out') }}</v-btn
          >
        </v-layout>
      </v-parallax>
    </section>

    <v-container class="mt-10">
      <div class="mb-5 pb-5 text-center">
        <!-- <h1>{{ $t(siteName) }}</h1> -->
        <p class="py-5" v-html="$t(siteDesc)"></p>

        <p class="py-5">{{ $t('最終更新日') }}: 2021-11-18</p>
      </div>

      <br />
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({})
export default class about extends Vue {
  baseUrl: any = process.env.BASE_URL
  siteName: any = (this as any).$t(process.env.siteName)
  siteDesc: any = process.env.siteDesc
  top: any = process.env.top
  visualization: any = process.env.visualization

  items: any = [
    {
      label: this.$t('about_'),
      path: {
        name: 'page-slug',
        params: {
          slug: 'about',
        },
      },
      description: '',
      icon: 'mdi-information',
    },
    {
      label: this.$t('list_'),
      path: {
        name: 'collection',
      },
      description: '',
      icon: 'mdi-view-list',
    },
    {
      label: this.$t('search'),
      path: {
        name: 'search',
      },
      description: '',
      icon: 'mdi-magnify',
    },

    {
      label: this.$t('rivers'),
      path: {
        name: 'river',
      },
      description: '',
      icon: 'mdi-water',
    },
    {
      label: this.$t('category'),
      path: {
        name: 'category',
      },
      description: '',
      icon: 'mdi-tag',
    },
    {
      label: this.$t('冊子画像'),
      path: {
        name: 'book',
      },
      description: '',
      icon: 'mdi-book',
    },

    /*
    {
      label: "提供機能",
      href: "https://docs.google.com/document/d/1MpB4CfebygZE2C4VGUemjI0Pa7242go1Q_5tfMHxyCE/edit?usp=sharing",
      description: '',
      icon: 'mdi-cog',
    },
    */
    /*
    {
      label: '画像を一覧する', //'画像を一覧する（' + this.$t('iiif_collection') + '）',
      //href: "https://www.kanzaki.com/works/2016/pub/image-annotator?u=https://static.toyobunko-lab.jp/suikeichuzu_data/iiif/collection/top.json",
      path: {
        name: 'image',
      },
      description: '',
      icon: 'mdi-image',
    },
    */
    /*
    {
      label: this.$t('NYPL可視化'),
      href: this.visualization+ '/pd/',
      description: '',
      img: this.baseUrl + "/img/pd_banner_magnified.png"
    },
    {
      label: this.$t('PixPlot'),
      href: this.visualization+ '/pp/',
      description: '',
      img: this.baseUrl + "/img/pixplot.png"
    },
    */
    {
      label: this.$t('data_set'), //'画像を一覧する（' + this.$t('iiif_collection') + '）',
      //href: "https://www.kanzaki.com/works/2016/pub/image-annotator?u=https://static.toyobunko-lab.jp/suikeichuzu_data/iiif/collection/top.json",
      path: {
        name: 'dataset',
      },
      description: '',
      icon: 'mdi-database',
    },
  ]

  head() {
    const title = this.siteName
    return {
      titleTemplate: null,
      title,
    }
  }
}
</script>
