/* eslint-disable @typescript-eslint/no-unused-vars */
import i18n from 'nuxt-i18n'

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Utils } from '@/plugins/utils'

/* eslint-disable @typescript-eslint/no-unused-vars */
import { es } from '@/plugins/es'

/* eslint-disable @typescript-eslint/no-unused-vars */
import { localEs } from '@/plugins/localEs'

// vueインスタンス用
declare module 'vue/types/vue' {
  interface Vue {
    readonly $utils: Utils
    readonly $es: es
    readonly $localEs: localEs
  }
}
