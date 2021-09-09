import { ComponentOptions } from 'vue'

import VueICU from './vue-icu'

export default {
  beforeCreate (): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this as Vue & {
      _icu?: VueICU
      $root: Vue & {
        $icu?: VueICU
      }
      $options: ComponentOptions<Vue> & {
        __icu?: VueICU
        icu?: VueICU
        parent: {
          $icu?: VueICU
        }
      }
    }

    const options = self.$options
    options.icu = options.icu || options.__icu

    if (options.icu) {
      if (options.icu instanceof VueICU) {
        self._icu = options.icu
      }
    } else if (self.$root && self.$root.$icu && self.$root.$icu instanceof VueICU) {
      // root icu
      self._icu = self.$root.$icu
    } else if (options.parent && options.parent.$icu && options.parent.$icu instanceof VueICU) {
      // parent icu
      self._icu = options.parent.$icu
    }
  },
  beforeDestroy (): void {
    if (!this._icu) { return }

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this
    this.$nextTick(() => {
      if (self._icu) {
        self._icu.destroyVM()
      }

      self._icu = null
    })
  }
}
