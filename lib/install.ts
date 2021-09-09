import { VueConstructor } from 'vue'

import VueICU, { VueICUOptions } from './vue-icu'
import component from './component'
import extend from './extend'
import mixin from './mixin'

export default (Vue: VueConstructor, options: VueICUOptions): void => {
  /**
   * Assign a default Vue ICU instance
   */
  Vue.prototype.$icu = new VueICU(options || { messages: {}, locale: 'en'})

  Vue.component('Icu', component)
  extend(Vue)
  Vue.mixin(mixin)
}
