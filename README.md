# Vue ICU

Vue plugin wrapping around `messageformat` package to handle ICU format translations, the same manner as `vue-i18n` handle theirs.

## Installation

```bash
npm install @chronotruck/vue-icu
```

## Usage

```js
import VueICU from '@chronotruck/vue-icu'

Vue.use(VueICU)
```

## API

### $trans method

#### Example

```js
this.$trans('app.titles.welcome', {
  name: 'Jon Snow'
})
```

### Icu component

#### Example

```html
<template>
  <div>
    <Icu
      path="app.titles.welcome"
      :variables="{
        name: 'Jon Snow'
      }"
    />
  </div>
</template>
```
