import { VueConstructor } from 'vue'

import VueICU from './vue-icu'

export default (Vue: VueConstructor): void => {
  if (('$icu' in Vue.prototype)) {
    const icu = Vue.prototype.$icu
    Object.defineProperty(Vue.prototype, '$icu', {
      get () {
        return icu
      }
    })
  }

  Vue.prototype.$trans = function (key: string, variables: { [key: string]: string } = {}): string {
    return (this.$icu as VueICU).trans(key, variables)
  }
}
