import { createLocalVue, mount, Wrapper } from '@vue/test-utils'

import install from '@Lib/install'
import { VueICUMessages } from '@Lib/index'

export function customMount (component: unknown, locale = 'en', messages: VueICUMessages = {}): Wrapper<Vue> {
  const localVue = createLocalVue()
  install(localVue, {
    locale,
    messages
  })

  return mount(component, {
    localVue,
  })
}
