import { customMount } from './shared'

describe('Trans', () => {
  beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => { /* noop */})
    jest.spyOn(console, 'error').mockImplementation(() => { /* noop */})
  })

  it('should show the translated content', () => {
    const component = {
      template: `<div>{{ $trans('hello') }}</div>`
    }

    const wrapper = customMount(component, 'fr', {
      fr: {
        hello: 'Salut'
      }
    })

    expect(wrapper.text()).toMatch('Salut')
  })

  it('should render the path if the translation is not found', () => {
    const component = {
      template: `<div>{{ $trans('hello') }}</div>`
    }

    const wrapper = customMount(component, 'en', {
      fr: {
        hello: 'Salut'
      }
    })

    expect(wrapper.text()).toEqual('hello')
  })

  afterAll(() => {
    jest.clearAllMocks()
  })
})
