const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    'content/content': './src/content/content.ts',
    'content/overlay': './src/content/overlay.ts',
    'background/service-worker': './src/background/service-worker.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  // Don't bundle node_modules for service worker (if needed)
  externals: {
    // Add any packages you don't want bundled here
  },
};