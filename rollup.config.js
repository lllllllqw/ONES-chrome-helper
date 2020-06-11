import copy from 'rollup-plugin-copy';
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { babel } from '@rollup/plugin-babel'
import postcss from 'rollup-plugin-postcss'
import sass from 'node-sass'

const replace = require('@rollup/plugin-replace');

const babelOptions = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react'
  ],
  exclude: 'node_modules/**',
}

const isProductionEnv = process.env.NODE_ENV === 'production'

const processSass = function(context, payload) {
  return new Promise(( resolve, reject ) => {
    sass.render({
      file: context
    }, function(err, result) {
      if( !err ) {
        resolve(result);
      } else {
        reject(err)
      }
    });
  })
}

const getCommonPlugins = () => {
  return [
    nodeResolve(),
    commonjs(),
    babel(babelOptions),
    replace({
      'process.env.NODE_ENV': `'production'`
    })
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
    input: 'src/popup/index.jsx',
    output: {
      file: 'dist/popup.js',
      format: 'cjs'
    },
    plugins: [
      postcss({
        extract: true,
        minimize: isProductionEnv,
        extensions:['css', 'scss'],
        process: processSass,
      }),
      ...getCommonPlugins()
    ]
  }
]