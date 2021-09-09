import dts from 'rollup-plugin-dts'
import typescript from '@rollup/plugin-typescript'

const config = [
  {
    input: './lib/index.ts',
    external: [
      'vue',
      '@vue/composition-api',
      'messageformat',
      '@messageformat/parser'
    ],
    output: {
      dir: 'dist',
      format: 'es'
    },
    plugins: [typescript()]
  },
  {
    input: './dist/index.d.ts',
    output: { file: 'dist/vue-icu.d.ts', format: 'es' },
    plugins: [dts()]
  }
]

export default config
