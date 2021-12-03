import path from 'path';

module.exports = {
  module: {
    rules: [
      {
        test: /\.worker\.ts$/,
        use: { loader: 'worker-loader' }
      },
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'node_modules/webworkify/index.js'),
        loader: 'worker'
      },
      { test: /mapbox-gl.+\.js$/, loader: 'transform/cacheable?brfs' }
    ],
    resolve: {
      extensions: ['', '.ts', '.tsx'],

      alias: {
        webworkify: 'webworkify-webpack'
      }
    }
  }
};
