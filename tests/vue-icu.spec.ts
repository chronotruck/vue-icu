import VueICU from '@Lib/vue-icu'

describe('Vue ICU', () => {
  describe('locale', () => {
    it('should return the locale', () => {
      const icu = new VueICU({
        locale: 'en',
        messages: {}
      })

      expect(icu.locale).toEqual('en')
    })

    it('should be able to change the locale', () => {
      const icu = new VueICU({
        locale: 'en',
        messages: {}
      })

      expect(icu.locale).toEqual('en')

      icu.locale = 'fr'

      expect(icu.locale).toEqual('fr')
    })
  })

  describe('messages', () => {
    it('should be able to provide default messages', () => {
      const icu = new VueICU({
        locale: 'en',
        messages: {
          en: {
            hello: 'World'
          },
          fr: {
            bonjour: 'Monde'
          }
        }
      })

      expect(icu.getMessages('en')).toEqual({
        hello: 'World'
      })
    })

    describe('getMessages', () => {
      it('should return the messages list for a given locale', () => {
        const icu = new VueICU({
          locale: 'en',
          messages: {
            en: {
              hello: 'World'
            },
            fr: {
              bonjour: 'Monde'
            }
          }
        })

        expect(icu.getMessages('en')).toEqual({
          hello: 'World'
        })
      })

      it('should not return the other messages except the given locale', () => {
        const icu = new VueICU({
          locale: 'en',
          messages: {
            en: {
              hello: 'World'
            },
            fr: {
              bonjour: 'Monde'
            }
          }
        })

        expect(icu.getMessages('fr')).toEqual({
          bonjour: 'Monde'
        })
      })

      it('should return an empty dictionnary if the locale provided does not exists', () => {
        const icu = new VueICU({
          locale: 'en',
          messages: {
            en: {
              hello: 'World'
            },
            fr: {
              bonjour: 'Monde'
            }
          }
        })

        expect(icu.getMessages('es')).toEqual({})
      })
    })

    describe('getMessage', () => {
      it('should return the translation for a given path', () => {
        const icu = new VueICU({
          locale: 'en',
          messages: {
            en: {
              hello: 'World'
            },
            fr: {
              bonjour: 'Monde'
            }
          }
        })

        expect(icu.getMessage('hello')).toEqual('World')
      })

      it('should return the fallback translation for a given path if the translation cannot be found', () => {
        const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => { /* noop */})

        const icu = new VueICU({
          locale: 'fr',
          messages: {
            en: {
              hello: 'World'
            }
          }
        })

        expect(icu.getMessage('hello')).toEqual('World')
        expect(consoleSpy).toHaveBeenCalledWith('Could not find the translation key "hello" in "fr", fallbacking to "en".')
      })

      it('should return the path for a given path if the key does not exists', () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { /* noop */})

        const icu = new VueICU({
          locale: 'en',
          messages: {
            en: {
              hello: 'World'
            }
          }
        })

        expect(icu.getMessage('bonjour')).toEqual('bonjour')
        expect(consoleSpy).toHaveBeenCalledWith('Could not find the translation key "bonjour" for locale "en". Returning untranslated key.')
      })

      it('should not print any console warn for fallback if silent warn is enabled', () => {
        const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => { /* noop */})

        const icu = new VueICU({
          locale: 'fr',
          messages: {
            en: {
              hello: 'World'
            }
          },
          silentTranslationWarn: true
        })

        expect(icu.getMessage('hello')).toEqual('World')
        expect(consoleSpy).not.toHaveBeenCalled()
      })

      it('should not print any console error for fallback if silent error is enabled', () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { /* noop */})

        const icu = new VueICU({
          locale: 'en',
          messages: {
            en: {
              hello: 'World'
            }
          },
          silentTranslationWarn: true
        })

        expect(icu.getMessage('bonjour')).toEqual('bonjour')
        expect(consoleSpy).not.toHaveBeenCalled()
      })
    })

    describe('setMessages', () => {
      it('should be able to override the messages at runtime for a given locale', () => {
        const icu = new VueICU({
          locale: 'en',
          messages: {
            en: {
              hello: 'World'
            },
            fr: {
              bonjour: 'Monde'
            }
          }
        })

        expect(icu.getMessages('en')).toEqual({
          hello: 'World'
        })

        icu.setMessages('en', {
          lorem: 'ipsum'
        })

        expect(icu.getMessages('en')).toEqual({
          lorem: 'ipsum'
        })
      })
    })
  })

  describe('trans', () => {
    it('should be able to translate a simple key', () => {
      const icu = new VueICU({
        locale: 'en',
        messages: {
          en: {
            'app.title': 'Vue ICU plugin'
          }
        }
      })

      expect(icu.trans('app.title')).toEqual('Vue ICU plugin')
    })

    it('should be able to translate with an interpolation', () => {
      const icu = new VueICU({
        locale: 'en',
        messages: {
          en: {
            'app.title': 'The title of the app is "{title}"'
          }
        }
      })

      expect(icu.trans('app.title', { title: 'Vue ICU' })).toEqual('The title of the app is "Vue ICU"')
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
})
