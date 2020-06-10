import copy from 'rollup-plugin-copy'

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
      })
    ]
  
  },
  {
    input: 'src/popup/index.js',
    output: {
      file: 'dist/popup.js',
      format: 'cjs'
    }
  }
]