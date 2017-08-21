module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactVRComponent',
      externals: {
        react: 'React'
      }
    }
  }
}
