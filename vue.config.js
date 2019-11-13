const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const nodeExternals = require('webpack-node-externals')
const merge = require('lodash.merge')
const TARGET_NODE = process.env.WEBPACK_TARGET === "node"
const target = TARGET_NODE ? 'server' : 'client'

module.exports = {
  css: {
    extract: false
  },
  outputDir: './dist/' + target,
  configureWebpack: () => ({
    entry: `./src/entry/entry-${target}.js`,
    devtool: 'source-map',
    target: TARGET_NODE ? "node" : "web",
    node: target ? undefined : false,
    output: {
      libraryTarget: TARGET_NODE ? "commonjs2" : undefined
    },
    externals: TARGET_NODE ? nodeExternals({
      whitelist: [/\.css$/]
    }) : undefined,
    optimization: {
      splitChunks: undefined
    },
    plugins: [TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin()]
  }),
  chainWebpack: config => {
    config.module.rule('vue').use('vue-loader').tap(options => {
      merge(options, {
        optimizeSSR: false
      })
    })
  }
}