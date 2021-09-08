import { VueConstructor } from 'vue'

import component from './component'
import extend from './extend'
import mixin from './mixin'

export default (Vue: VueConstructor): void => {
  Vue.component('Icu', component)

  extend(Vue)
  Vue.mixin(mixin)
}
