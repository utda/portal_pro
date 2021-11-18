<template>
  <div>
    <template v-if="uri === 'http://creativecommons.org/licenses/by/4.0/'">
      <template v-if="$i18n.locale == 'ja'">
        <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"
          ><img
            alt="クリエイティブ・コモンズ・ライセンス"
            style="border-width: 0"
            src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a
        ><br />この作品は<a
          rel="license"
          href="http://creativecommons.org/licenses/by/4.0/"
          >クリエイティブ・コモンズ 表示 4.0 国際 ライセンス</a
        >の下に提供されています。
      </template>
      <template v-else>
        <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"
          ><img
            alt="Creative Commons License"
            style="border-width: 0"
            src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a
        ><br />This work is licensed under a
        <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"
          >Creative Commons Attribution 4.0 International License</a
        >.
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Watch, Vue } from 'nuxt-property-decorator'
import axios from 'axios'

@Component({
  components: {
  },
})
export default class License extends Vue {
  @Prop({
    required: true,
  })
  uri!: string
}
</script>
