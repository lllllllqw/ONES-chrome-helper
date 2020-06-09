export default [
  {
    input: 'src/content_scripts/index.js',
    output: {
      file: 'dist/content_scripts.js',
      format: 'cjs'
    }
  },
  {
    input: 'src/popup/index.js',
    output: {
      file: 'dist/popup.js',
      format: 'cjs'
    }
  }
]