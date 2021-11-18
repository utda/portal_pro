<template>
  <div v-if="moreLikeThisData.length > 0">
    <div class="text-center">
      <h3 class="my-5">{{ $t('画像が似ているアイテム') }}</h3>
    </div>
    <HorizontalItems :data="moreLikeThisData" :height="150" />
  </div>
</template>

<script lang="ts">
import { Prop, Component, Watch, Vue } from 'nuxt-property-decorator'
import HorizontalItems from '../display/HorizontalItems.vue'

@Component({
  components: {
    HorizontalItems,
  },
})
export default class morelikethis extends Vue {
  moreLikeThisData: any[] = []
  baseUrl: any = process.env.BASE_URL

  @Prop({
    required: true,
  })
  item: any

  mounted() {
    this.moreLikeThis()
  }

  @Watch('itemId')
  watchId(): void {
    this.moreLikeThis()
  }

  moreLikeThis() {
    if(this.item.images){
      this.moreLikeThisData = this.item.images
    }
  }
}
</script>
