import { VueConstructor } from 'vue'

import VueICU from './index'

export default (Vue: VueConstructor): void => {
  if (('$icu' in Vue.prototype)) {
    Object.defineProperty(Vue.prototype, '$icu', {
      get () {
        return this._icu
      }
    })
  }

  Vue.prototype.$trans = function (key: string, variables: { [key: string]: string } = {}): string {
    return (this.$icu as VueICU).trans(key, variables)
  }
}
