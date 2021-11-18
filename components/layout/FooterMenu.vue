<template>
  <v-footer :dark="true" padless>
    <v-container>
      <p class="text-center my-5">
        {{ $t(footer) }}
      </p>
    </v-container>
  </v-footer>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'nuxt-property-decorator'

@Component({
  components: {},
})
export default class License extends Vue {
  footer: any = process.env.footer
}
</script>
