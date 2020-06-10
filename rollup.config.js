import copy from 'rollup-plugin-copy';
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { babel } from '@rollup/plugin-babel'

const babelOptions = {
  "presets": [
    '@babel/preset-env',
    '@babel/preset-react'
  ]
}

const getCommonPlugins = () => {
  return [
    nodeResolve(),
    commonjs(),
    babel(babelOptions)
  ]
}

export default [
  {
    input: 'src/content_scripts/index.js',
    output: {
      file: 'dist/content_scripts.js',
      format: 'cjs'
    },
    plugins: [
      copy({
        targets: [
          { src: 'public/**/*', dest: 'dist' }
        ]
      }),
      ...getCommonPlugins()
    ]
  
  },
  {
    input: 'src/popup/index.js',
    output: {
      file: 'dist/popup.js',
      format: 'cjs'
    },
    plugins: [
      ...getCommonPlugins()
    ]
  }
]