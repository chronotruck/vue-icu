import { customMount } from './shared'

describe('Component', () => {
  it('should mount the component', () => {
    const component = {
      template: `
        <div>
          <Icu
            path="app.titles.helloworld"
            tag="p"
          />
        </div>
      `
    }

    const wrapper = customMount(component, 'fr', {
      fr: {
        'app.titles.helloworld': 'Bonjour le monde',
      }
    })

    expect(wrapper.exists()).toBeTruthy()
    const paragraph = wrapper.find('p')
    expect(paragraph.text()).toBe('Bonjour le monde')
  })

  it('should be able to make var interpolation', () => {
    const component = {
      template: `
        <div>
          <Icu
            path="app.values.username"
            tag="span"
            :variables="{
              username: 'Jon Snow'
            }"
          />
        </div>
      `
    }

    const wrapper = customMount(component, 'fr', {
      fr: {
        'app.values.username': 'Le pseudo est : {username}',
      }
    })

    expect(wrapper.exists()).toBeTruthy()
    const text = wrapper.find('span')
    expect(text.text()).toBe('Le pseudo est : Jon Snow')
  })

  it('should be able to make component interpolation through slots for vars', () => {
    const component = {
      template: `
        <div>
          <Icu
            path="app.values.username"
            tag="span"
            :variables="{
              username: 'Arya Stark'
            }"
          >
            <template
              #username="{ value }"
            >
              <span>
                {{ value }}
              </span>
            </template>
          </Icu>
        </div>
      `
    }

    const wrapper = customMount(component, 'fr', {
      fr: {
        'app.values.username': 'Le pseudo est : {username}',
      }
    })

    expect(wrapper.exists()).toBeTruthy()
    const text = wrapper.find('span')
    expect(text.text()).toBe('Le pseudo est : Arya Stark')
  })
})
