import * as VueICU from './vue-icu'
import * as component from './component'
import * as extend from './extend'
import * as install from './install'
import * as mixin from './mixin'

VueICU.default.prototype.install = install.default

export {
  VueICU,
  component,
  extend,
  install,
  mixin,
}
