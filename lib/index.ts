import Vue, { VueConstructor } from 'vue'
import MessageFormat from 'messageformat'

import install from './install'

export type VueICUMessages = {
  [locale: string]: {
    [key: string]: string
  }
}

export type VueICUCustomFormatter = {
  [key: string]: (value: string, locale: string, arg: string | null) => string
}

export type VueICUOptions = {
  messages: VueICUMessages
  locale: string
  fallbackLocale?: string
  silentTranslationWarn?: boolean
  customFormatters?: VueICUCustomFormatter
}

export default class VueICU {
  _locale: string
  fallbackLocale: string
  silentTranslationWarn: boolean
  vm: Vue & {
    locale: string
    messages: VueICUMessages
  }
  messages: VueICUMessages
  customFormatters: VueICUCustomFormatter

  install: (vue: VueConstructor, options: VueICUOptions) => void

  constructor (options: VueICUOptions) {
    this._locale = options.locale || 'en'
    this.fallbackLocale = options.fallbackLocale || 'en'

    this.silentTranslationWarn = options.silentTranslationWarn || false
    this.messages = options.messages || {}
    this.customFormatters = options.customFormatters || {}

    /**
     * We create a new instance of Vue to handle the locale & messages
     * update dynamically.
     */
    this.vm = new Vue({
      data: {
        locale: this._locale,
        messages: this.messages
      }
    })
  }

  get locale (): string {
    return this.vm.locale
  }

  set locale (newLocale: string) {
    this.vm.$set(this.vm, 'locale', newLocale)
  }

  destroyVM (): void {
    this.vm.$destroy()
  }

  /**
   * Return the messages given a locale.
   */
  getMessages (locale: string): { [key: string]: string } {
    if (!(locale in this.vm.messages)) {
      return {}
    }

    return this.vm.messages[locale]
  }

  /**
   * Set the messages for a given locale.
   */
  setMessages (locale: string, messages: { [key: string]: string }): void {
    this.vm.$set(this.vm.messages, locale, messages)
  }

  /**
   * @deprecated Use `setMessages` instead.
   */
  setLocaleMessage (locale: string, messages: { [key: string]: string }): void {
    this.setMessages(locale, messages)
  }

  hasPath (path: string): boolean {
    return !!this.getMessage(path)
  }

  /**
   * Returns the message value for a given key with the current locale.
   */
  getMessage (path: string): string {
    let messages = this.getMessages(this.locale)
    let locale = this.locale

    if (!(path in messages)) {
      if (!this.silentTranslationWarn) console.warn(`Could not find the translation key "${path}" in "${locale}", fallbacking to "${this.fallbackLocale}".`)

      locale = this.fallbackLocale
      messages = this.getMessages(locale)

      // Checking for the fallback case
      if (!(path in messages)) {
        if (!this.silentTranslationWarn) {
          console.error(`Could not find the translation key "${path}" for locale "${locale}". Returning untranslated key.`)
        }

        return path
      }

      return messages[path]
    }

    return messages[path]
  }

  trans (path: string, variables: { [key: string]: string } = {}): string {
    const options = {
      returnType: 'string',
      customFormatters: this.customFormatters
    }

    const formatter = new MessageFormat(this.locale, options)
    const message = this.getMessage(path)

    const fn = formatter.compile(message, this.locale)
    return fn(variables)
  }
}

VueICU.prototype.install = install
